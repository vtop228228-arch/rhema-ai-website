import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getNvidiaKey, CHAT_MODEL, CHAT_SYSTEM } from '@/lib/anthropic';
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

    // Принуждение к финалу: первый user-ход — скрытый opener, поэтому реальных ответов = (user-ходы − 1).
    // После 4 содержательных ответов заставляем модель выдать карту, чтобы диалог не тянулся.
    // ВАЖНО: добавляем инструкцию в ЕДИНСТВЕННЫЙ системный промпт (второй system-message в середине NIM отклоняет).
    const realAnswers = history.filter(m => m.role === 'user').length - 1;
    const forceMap = `${CHAT_SYSTEM}

СЕЙЧАС ЗАВЕРШАЙ ДИАГНОСТИКУ. Информации достаточно. НЕ задавай больше ни одного вопроса.
Верни stage:"map", options:[], а в поле reply — ТОЛЬКО карту потерь строго в этом формате (с реальными переносами строк):
ГДЕ ВЫ ТЕРЯЕТЕ
• <первая точка утечки>
• <вторая точка утечки>

ЧТО МОЖНО ВНЕДРИТЬ
→ <решение языком результата>
→ <решение языком результата>

<одна строка-приглашение: оставьте контакт — на бесплатном созвоне покажем точную карту внедрения и посчитаем эффект в деньгах>

В reply НЕ должно быть вопросов. Опирайся на то, что человек уже рассказал.

ПРИМЕР правильного ответа (формат JSON с экранированными переносами):
{"reply":"Давайте подведём итог.\\nГДЕ ВЫ ТЕРЯЕТЕ\\n• Заявки теряются из-за долгого ответа\\n• Менеджеры тонут в ручной рутине\\n\\nЧТО МОЖНО ВНЕДРИТЬ\\n→ Бот, который мгновенно отвечает клиенту, пока менеджер занят\\n→ Система, которая сама ведёт заявки без ошибок\\n\\nОставьте контакт — на бесплатном созвоне покажем точную карту внедрения под ваш бизнес и посчитаем эффект в деньгах.","options":[],"stage":"map"}`;
    const systemContent = realAnswers >= 4 ? forceMap : CHAT_SYSTEM;

    const messages: { role: string; content: string }[] = [{ role: 'system', content: systemContent }, ...history];

    const raw = await callAgent(apiKey, messages);
    let turn = raw ? parseTurn(raw) : null;

    // На форс-ходу карта обязана иметь структуру — маркеры • или → (в вопросах их нет).
    // Если модель снова задала вопрос — повторяем (до 3 попыток всего). В любом случае фиксируем stage:"map".
    const looksLikeMap = (t: AgentTurn) => /[•→]/.test(t.reply);
    if (realAnswers >= 4) {
      let tries = 0;
      while (turn && !looksLikeMap(turn) && tries < 2) {
        const r = await callAgent(apiKey, messages);
        const t2 = r ? parseTurn(r) : null;
        if (t2) turn = t2;
        tries++;
      }
      if (turn) { turn.stage = 'map'; turn.options = []; }
    }

    if (!turn) {
      return NextResponse.json(
        { error: { code: 'AGENT_UNAVAILABLE', message: 'Агент временно недоступен' } },
        { status: 503 },
      );
    }

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
