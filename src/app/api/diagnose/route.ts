import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getNvidiaKey, CHAT_MODEL, CHAT_SYSTEM, MAP_SYSTEM } from '@/lib/anthropic';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const msgSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(2000),
});

const bodySchema = z.object({
  history: z.array(msgSchema).min(1).max(24),
});

type AgentTurn = { reply: string; options: string[]; stage: 'ask' | 'map' };

// Запрос к qwen с одним ретраем — NIM изредка отдаёт пустой content.
async function callAgent(apiKey: string, messages: { role: string; content: string }[]): Promise<string> {
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: CHAT_MODEL,
        max_tokens: 1000,
        temperature: 0.6,
        messages,
        stream: false,
      }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      console.error('[diagnose] NIM error', res.status, txt.slice(0, 200));
      continue;
    }

    type NimJson = { choices?: { message?: { content?: string } }[] };
    const json = await res.json() as NimJson;
    const content = json.choices?.[0]?.message?.content?.trim();
    if (content) return content;
  }
  return '';
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

    const { history } = bodySchema.parse(await req.json());

    const apiKey = getNvidiaKey();
    if (!apiKey) {
      return NextResponse.json(
        { error: { code: 'AGENT_UNAVAILABLE', message: 'Агент временно недоступен' } },
        { status: 503 },
      );
    }

    // Первый user-ход — скрытый opener, поэтому реальных ответов = (user-ходы − 1).
    const realAnswers = history.filter(m => m.role === 'user').length - 1;
    const looksLikeMap = (t: AgentTurn) => /[•→]/.test(t.reply);

    // ── ФИНАЛ: после 4 ответов — отдельный фокусный вызов карты (без разговорной болтливости) ──
    if (realAnswers >= 4) {
      const transcript = history
        .slice(1) // убираем скрытый opener
        .map(m => `${m.role === 'user' ? 'Клиент' : 'Рема'}: ${m.content}`)
        .join('\n');
      const mapMessages = [
        { role: 'system', content: MAP_SYSTEM },
        { role: 'user', content: `Диалог диагностики:\n${transcript}\n\nСоставь карту потерь по этому диалогу.` },
      ];

      let turn: AgentTurn | null = null;
      for (let i = 0; i < 2 && (!turn || !looksLikeMap(turn)); i++) {
        const r = await callAgent(apiKey, mapMessages);
        const t = r ? parseTurn(r) : null;
        if (t) turn = t;
      }

      if (!turn) {
        return NextResponse.json(
          { error: { code: 'AGENT_UNAVAILABLE', message: 'Агент временно недоступен' } },
          { status: 503 },
        );
      }
      turn.stage = 'map';
      turn.options = [];
      return NextResponse.json({ data: turn });
    }

    // ── РАЗГОВОР: обычный ход диалога ──
    const messages = [{ role: 'system', content: CHAT_SYSTEM }, ...history];
    const raw = await callAgent(apiKey, messages);
    const turn = raw ? parseTurn(raw) : null;

    if (!turn) {
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
