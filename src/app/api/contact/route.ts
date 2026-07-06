import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToCRM } from '@/lib/crm';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { escapeHtml } from '@/lib/escape-html';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  contact: z.string().min(3).max(255),
  business: z.string().min(10).max(2000),
  consent: z.boolean().refine(v => v === true),
});

export async function POST(req: NextRequest) {
  try {
    // Лимит консервативнее соседних роутов (diagnose: 30/ч, lead: 20/ч):
    // форма контакта отправляется человеком 1–2 раза, 5/час/IP хватает с запасом.
    const ip = getClientIp(req);
    if (!rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMITED', message: 'Слишком много запросов. Попробуйте позже.' } },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validated = contactSchema.parse(body);

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('[POST /api/contact] Telegram config missing');
      return NextResponse.json(
        { error: { code: 'INTERNAL_ERROR', message: 'Не удалось отправить заявку' } },
        { status: 500 }
      );
    }

    const message = `
📧 <b>Новая заявка на диагностику</b>

<b>Имя:</b> ${escapeHtml(validated.name)}
<b>Контакт:</b> ${escapeHtml(validated.contact)}

<b>О бизнесе:</b>
${escapeHtml(validated.business)}
`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.statusText}`);
    }

    // Дубль в JARVIS CRM (jarvis.leads). Telegram — основной сток; сбой CRM не валит заявку.
    const crm = await sendLeadToCRM({
      name: validated.name,
      contact: validated.contact,
      notes: validated.business,
      source: 'rhema-ai-website',
    });
    if (!crm.ok && !crm.skipped) {
      console.error('[contact] CRM save failed:', crm.error);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: { code: 'INVALID_INPUT', message: 'Проверьте данные формы' } },
        { status: 400 }
      );
    }

    console.error('[POST /api/contact]', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Не удалось отправить заявку' } },
      { status: 500 }
    );
  }
}
