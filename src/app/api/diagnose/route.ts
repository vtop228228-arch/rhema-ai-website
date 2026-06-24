import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getNvidiaKey, getAnthropicKey, MODELS,
  CLAUDE_DIALOG_MODEL, CLAUDE_MAP_MODEL,
  CHAT_SYSTEM, MAP_SYSTEM, FALLBACK_MAP,
} from '@/lib/anthropic';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const maxDuration = 30;

const msgSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(2000),
});

const bodySchema = z.object({
  history: z.array(msgSchema).min(1).max(24),
  // Клиент выставляет, когда диалог не смог продолжиться (исчерпал ретраи): просим карту
  // принудительно по тому, что уже рассказали, — личную, а не общий шаблон-«чушь».
  forceMap: z.boolean().optional(),
});

type AgentTurn = { reply: string; options: string[]; stage: 'ask' | 'map' };
type Msg = { role: 'user' | 'assistant'; content: string };

// ── Anthropic Claude: основной провайдер. Стабильный, живой диалог. ──
async function callClaude(key: string, model: string, system: string, history: Msg[], timeoutMs: number): Promise<string> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ model, max_tokens: 1500, temperature: 0.6, system, messages: history }),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      console.error('[diagnose] Claude error', res.status, txt.slice(0, 160));
      return '';
    }
    type ClaudeJson = { content?: { type: string; text?: string }[] };
    const json = await res.json() as ClaudeJson;
    const text = json.content?.find(b => b.type === 'text')?.text;
    return typeof text === 'string' ? text.trim() : '';
  } catch {
    return '';
  } finally {
    clearTimeout(timer);
  }
}

// ── NVIDIA NIM: бесплатный аварийный резерв. Один вызов модели с жёстким таймаутом. ──
async function callNim(apiKey: string, model: string, messages: { role: string; content: string }[], timeoutMs: number): Promise<string> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, max_tokens: 1000, temperature: 0.6, messages, stream: false }),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      console.error('[diagnose] NIM error', model, res.status, txt.slice(0, 160));
      return '';
    }
    type NimJson = { choices?: { message?: { content?: string } }[] };
    const json = await res.json() as NimJson;
    return json.choices?.[0]?.message?.content?.trim() ?? '';
  } catch {
    return '';
  } finally {
    clearTimeout(timer);
  }
}

// Единая генерация: Claude (если задан ключ) → при осечке NIM как резерв.
// kind управляет выбором модели Claude и бюджетом времени (Vercel Pro: maxDuration=30):
//   'map'    = Sonnet (богаче). 2 попытки, без NIM-резерва: NIM для карты даёт мусор без маркеров,
//              а на failure-пути лучше быстро отдать шаблон, чем тратить ещё 6с на заведомо плохой ответ.
//   'dialog' = Haiku (быстро/дёшево). 2 попытки → если пусто, один NIM-резерв (кросс-провайдер).
// КЛЮЧЕВОЕ: внутренний ретрай Claude. Главная причина «чуши» в проде — РАЗОВЫЙ transient-блип
// провайдера (Anthropic 529/перегрузка); один повтор ловит почти все такие осечки. Бюджет подобран
// так, чтобы худший случай был < клиентского таймаута 28с.
async function generate(system: string, history: Msg[], kind: 'dialog' | 'map'): Promise<string> {
  const claudeMs = kind === 'map' ? 12000 : 10000; // worst: map 2×12=24с, dialog 2×10+NIM6=26с (<28с)

  const aKey = getAnthropicKey();
  if (aKey) {
    const model = kind === 'map' ? CLAUDE_MAP_MODEL : CLAUDE_DIALOG_MODEL;
    for (let attempt = 0; attempt < 2; attempt++) {
      const out = await callClaude(aKey, model, system, history, claudeMs);
      if (out) return out;
    }
    if (kind === 'map') return ''; // карта: NIM-резерв пропускаем (см. выше) → выше отдадим шаблон
  }
  const nKey = getNvidiaKey();
  if (!nKey) return '';
  const messages = [{ role: 'system', content: system }, ...history];
  // С Claude держим резерв минимальным (1 модель), без Claude — полный каскад.
  const models = aKey ? MODELS.slice(0, 1) : MODELS;
  for (const model of models) {
    const content = await callNim(nKey, model, messages, 6000);
    if (content) return content;
  }
  return '';
}

// Карта приходит ПЛЕЙН-ТЕКСТОМ. Этот хелпер устойчив и к тексту, и к случайной JSON-обёртке
// (если модель всё же завернула ответ) — без падения JSON.parse, как было раньше.
function extractMapText(raw: string): string {
  const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
  // Если модель вернула валидный JSON с reply — достаём reply; иначе берём текст как есть.
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start !== -1 && end > start) {
    try {
      const obj = JSON.parse(cleaned.slice(start, end + 1)) as { reply?: unknown };
      if (typeof obj.reply === 'string' && obj.reply.trim()) return obj.reply.trim();
    } catch {
      // невалидный JSON (живые переносы) — игнорируем, ниже вернём очищенный текст
    }
  }
  return cleaned;
}

// Достаём JSON-объект из ответа модели (на случай обёрток ```json или текста вокруг).
function parseTurn(raw: string): AgentTurn | null {
  const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) return null;
  try {
    const obj = JSON.parse(cleaned.slice(start, end + 1)) as Partial<AgentTurn>;
    const reply = typeof obj.reply === 'string' ? obj.reply.trim() : '';
    if (!reply) return null;
    const options = Array.isArray(obj.options)
      ? obj.options.filter(o => typeof o === 'string' && o.trim()).slice(0, 4).map(o => o.trim())
      : [];
    const stage = obj.stage === 'map' ? 'map' : 'ask';
    return { reply, options, stage };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (!rateLimit(`diagnose:${ip}`, 30, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMITED', message: 'Слишком много запросов. Попробуйте позже.' } },
        { status: 429 },
      );
    }

    const { history, forceMap } = bodySchema.parse(await req.json());

    if (!getAnthropicKey() && !getNvidiaKey()) {
      return NextResponse.json(
        { error: { code: 'AGENT_UNAVAILABLE', message: 'Агент временно недоступен' } },
        { status: 503 },
      );
    }

    // Первый user-ход — скрытый opener, поэтому реальных ответов = (user-ходы − 1).
    const realAnswers = history.filter(m => m.role === 'user').length - 1;
    const looksLikeMap = (t: AgentTurn) => /[•→]/.test(t.reply);

    // ── ФИНАЛ: после 4 ответов (или forceMap, когда диалог не смог продолжиться) — ──
    // ── отдельный фокусный вызов карты (без разговорной болтливости).                ──
    if (realAnswers >= 4 || forceMap) {
      const transcript = history
        .slice(1) // убираем скрытый opener
        .map(m => `${m.role === 'user' ? 'Клиент' : 'Рема'}: ${m.content}`)
        .join('\n');
      const mapHistory: Msg[] = [
        { role: 'user', content: `Диалог диагностики:\n${transcript}\n\nСоставь карту потерь по этому диалогу.` },
      ];

      const r = await generate(MAP_SYSTEM, mapHistory, 'map');
      const text = r ? extractMapText(r) : '';
      // Если генерация пустая или без маркеров карты (мусор) — отдаём шаблон, а НЕ 503.
      // Клиент после пройденного диалога обязан увидеть карту, иначе это «бот сломался».
      const reply = /[•→]/.test(text) ? text : FALLBACK_MAP;
      return NextResponse.json({ data: { reply, options: [] as string[], stage: 'map' as const } });
    }

    // ── РАЗГОВОР: один ход диалога (повторы — на стороне клиента, чтобы не превысить лимит времени) ──
    const raw = await generate(CHAT_SYSTEM, history, 'dialog');
    const turn = raw ? parseTurn(raw) : null;

    if (!turn) {
      // Диалог не сгенерился — отдаём 503, чтобы КЛИЕНТ повторил тот же ход и беседа продолжилась.
      // Раньше тут сразу возвращался общий шаблон-карта: клиент принимал его как успех, переставал
      // ретраить, и человек получал generic-«чушь» из-за секундного блипа. Теперь при исчерпании
      // ретраев клиент сам попросит ЛИЧНУЮ карту (forceMap) по тому, что уже рассказали.
      return NextResponse.json(
        { error: { code: 'AGENT_UNAVAILABLE', message: 'Агент временно недоступен' } },
        { status: 503 },
      );
    }

    // Разговорная модель не должна сама закрывать карту раньше времени — держим её в режиме вопросов.
    if (turn.stage === 'map' && !looksLikeMap(turn)) turn.stage = 'ask';

    return NextResponse.json({ data: turn });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: { code: 'INVALID_INPUT', message: 'Проверьте введённые данные' } },
        { status: 400 },
      );
    }
    console.error('[POST /api/diagnose]', err);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Внутренняя ошибка' } },
      { status: 500 },
    );
  }
}
