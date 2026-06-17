import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const leadSchema = z.object({
  sessionId: z.string().min(8).max(64),
  name: z.string().min(2).max(100),
  contact: z.string().min(3).max(255),
  sphere: z.string().max(200).default(''),
  pain: z.string().max(1000).default(''),
  mapText: z.string().max(4000).default(''),
});

type Lead = z.infer<typeof leadSchema>;

async function sendTelegram(lead: Lead): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return;

  const text = `🤖 <b>Лид с AI-диагностики</b>

<b>Имя:</b> ${lead.name}
<b>Контакт:</b> ${lead.contact}
<b>Сфера:</b> ${lead.sphere}
<b>Боль:</b> ${lead.pain}

<b>Карта потерь:</b>
${lead.mapText.slice(0, 1500)}`;

  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
  if (!res.ok) throw new Error(`Telegram API error: ${res.status}`);
}

// Дубль в Supabase — только если заданы креды. Используем REST + service_role.
async function saveToSupabase(lead: Lead): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;

  const headers = {
    'Content-Type': 'application/json',
    apikey: key,
    Authorization: `Bearer ${key}`,
    Prefer: 'resolution=merge-duplicates',
  };

  await fetch(`${url}/rest/v1/diagnostic_sessions`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      session_id: lead.sessionId,
      sphere: lead.sphere,
      pain: lead.pain,
      result_map: lead.mapText,
    }),
  });

  await fetch(`${url}/rest/v1/diagnostic_leads`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      session_id: lead.sessionId,
      name: lead.name,
      contact: lead.contact,
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (!rateLimit(`lead:${ip}`, 20, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMITED', message: 'Слишком много запросов' } },
        { status: 429 },
      );
    }

    const lead = leadSchema.parse(await req.json());

    // Telegram — основной сток лида. Supabase — опциональный дубль.
    await sendTelegram(lead);
    try {
      await saveToSupabase(lead);
    } catch (e) {
      console.error('[lead] supabase save failed', e);
    }

    return NextResponse.json({ data: { ok: true } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: { code: 'INVALID_INPUT', message: 'Проверьте данные формы' } },
        { status: 400 },
      );
    }
    console.error('[POST /api/diagnose/lead]', err);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Не удалось отправить заявку' } },
      { status: 500 },
    );
  }
}
