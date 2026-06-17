import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createAnthropic,
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
    // 10 запросов в час на IP — защита от абьюза.
    if (!rateLimit(`diagnose:${ip}`, 10, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMITED', message: 'Слишком много запросов. Попробуйте позже.' } },
        { status: 429 },
      );
    }

    const body = bodySchema.parse(await req.json());

    const client = createAnthropic();
    if (!client) {
      return NextResponse.json(
        { error: { code: 'AGENT_UNAVAILABLE', message: 'Агент временно недоступен' } },
        { status: 503 },
      );
    }

    const isMap = body.mode === 'map';
    const model = isMap ? MAP_MODEL : DIALOG_MODEL;
    const system = isMap ? MAP_SYSTEM : QUESTIONS_SYSTEM;
    const userPrompt = buildUserPrompt(body.mode, body.sphere, body.pain, body.qa);

    const anthropicStream = client.messages.stream({
      model,
      max_tokens: isMap ? 800 : 400,
      // Стабильный системный префикс кешируем — повторные вызовы дешевле.
      system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: userPrompt }],
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of anthropicStream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
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
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
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
