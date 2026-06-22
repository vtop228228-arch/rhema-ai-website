import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getNvidiaKey,
  DIALOG_MODEL,
  MAP_MODEL,
  QUESTIONS_SYSTEM,
  MAP_SYSTEM,
} from '@/lib/anthropic';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const qaSchema = z.object({ question: z.string().max(500), answer: z.string().max(1000) });

const bodySchema = z.object({
  mode: z.enum(['questions', 'map']),
  sphere: z.string().min(2).max(200),
  pain: z.string().min(2).max(1000),
  qa: z.array(qaSchema).max(5).optional().default([]),
});

function buildUserPrompt(
  mode: 'questions' | 'map',
  sphere: string,
  pain: string,
  qa: { question: string; answer: string }[],
): string {
  const base = `Сфера бизнеса: ${sphere}\nГлавная боль/задача: ${pain}`;
  if (mode === 'questions') return base;

  const dialog = qa
    .filter(p => p.answer.trim())
    .map((p, i) => `Вопрос ${i + 1}: ${p.question}\nОтвет: ${p.answer}`)
    .join('\n\n');
  return `${base}\n\nУточняющий диалог:\n${dialog || '(пользователь не дал доп. ответов)'}`;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (!rateLimit(`diagnose:${ip}`, 10, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMITED', message: 'Слишком много запросов. Попробуйте позже.' } },
        { status: 429 },
      );
    }

    const body = bodySchema.parse(await req.json());

    const apiKey = getNvidiaKey();
    if (!apiKey) {
      return NextResponse.json(
        { error: { code: 'AGENT_UNAVAILABLE', message: 'Агент временно недоступен' } },
        { status: 503 },
      );
    }

    const isMap = body.mode === 'map';
    const model = isMap ? MAP_MODEL : DIALOG_MODEL;
    const system = isMap ? MAP_SYSTEM : QUESTIONS_SYSTEM;
    const userPrompt = buildUserPrompt(body.mode, body.sphere, body.pain, body.qa);

    // ── QUESTIONS: non-streaming, return structured JSON ──────────────────
    if (!isMap) {
      const nvidiaRes = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          max_tokens: 400,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: userPrompt },
          ],
          stream: false,
        }),
      });

      if (!nvidiaRes.ok) {
        const txt = await nvidiaRes.text().catch(() => '');
        console.error('[POST /api/diagnose] NVIDIA questions error', nvidiaRes.status, txt);
        return NextResponse.json(
          { error: { code: 'AGENT_UNAVAILABLE', message: 'Агент временно недоступен' } },
          { status: 503 },
        );
      }

      type NvidiaJson = { choices?: { message?: { content?: string } }[] };
      const json = await nvidiaRes.json() as NvidiaJson;
      const content = json.choices?.[0]?.message?.content ?? '[]';

      try {
        // AI иногда оборачивает JSON в ```json блок — зачищаем.
        const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        const questions = JSON.parse(cleaned) as { q: string; opts: string[] }[];
        return NextResponse.json({ data: { questions } });
      } catch {
        console.error('[POST /api/diagnose] JSON parse failed:', content);
        return NextResponse.json(
          { error: { code: 'PARSE_ERROR', message: 'Не удалось получить вопросы' } },
          { status: 503 },
        );
      }
    }

    // ── MAP: streaming SSE → pipe to client ───────────────────────────────
    const nvidiaRes = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        max_tokens: 450,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!nvidiaRes.ok || !nvidiaRes.body) {
      const txt = await nvidiaRes.text().catch(() => '');
      console.error('[POST /api/diagnose] NVIDIA map error', nvidiaRes.status, txt);
      return NextResponse.json(
        { error: { code: 'AGENT_UNAVAILABLE', message: 'Агент временно недоступен' } },
        { status: 503 },
      );
    }

    const reader = nvidiaRes.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        let buffer = '';
        try {
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';
            for (const line of lines) {
              if (!line.startsWith('data: ')) continue;
              const payload = line.slice(6).trim();
              if (payload === '[DONE]') continue;
              try {
                const chunk = JSON.parse(payload) as { choices?: { delta?: { content?: string } }[] };
                const text = chunk.choices?.[0]?.delta?.content;
                if (text) controller.enqueue(encoder.encode(text));
              } catch { /* skip invalid chunk */ }
            }
          }
        } catch {
          controller.enqueue(encoder.encode('\n\n[Не удалось завершить ответ. Оставьте контакт — пришлём диагностику вручную.]'));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
    });

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
