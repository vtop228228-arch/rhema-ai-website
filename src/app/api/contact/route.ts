import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  contact: z.string().min(3).max(255),
  business: z.string().min(10).max(2000),
  consent: z.boolean().refine(v => v === true),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = contactSchema.parse(body);

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: 'Telegram config missing' },
        { status: 500 }
      );
    }

    const message = `
📧 <b>Новая заявка на диагностику</b>

<b>Имя:</b> ${validated.name}
<b>Контакт:</b> ${validated.contact}

<b>О бизнесе:</b>
${validated.business}
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

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
