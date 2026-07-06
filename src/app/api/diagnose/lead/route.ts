import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { sendLeadToCRM } from '@/lib/crm';
import { escapeHtml } from '@/lib/escape-html';

export const runtime = 'nodejs';

const leadSchema = z.object({
  sessionId: z.string().min(8).max(64),
  name: z.string().min(2).max(100),
  contact: z.string().min(3).max(255),
  sphere: z.string().max(200).default(''),
  pain: z.string().max(1000).default(''),
  dialog: z.string().max(8000).default(''),   // полный диалог диагностики (вопрос агента → ответ клиента)
  mapText: z.string().max(4000).default(''),
});

type Lead = z.infer<typeof leadSchema>;

// Одно сообщение в Telegram одному получателю. html=false — plain (для диалога клиента: безопасно
// при разбиении на части и не ломается на спецсимволах пользователя).
async function tgSend(botToken: string, chatId: string, text: string, html = true): Promise<void> {
  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      ...(html ? { parse_mode: 'HTML' } : {}),
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) throw new Error(`Telegram API error (${chatId}): ${res.status}`);
}

// Разбить длинный текст на части ≤max (лимит Telegram — 4096); режем по границам строк.
function chunkText(s: string, max = 3800): string[] {
  const out: string[] = [];
  let rest = s;
  while (rest.length > max) {
    let cut = rest.lastIndexOf('\n', max);
    if (cut < max * 0.5) cut = max; // нет удобной границы — режем жёстко
    out.push(rest.slice(0, cut));
    rest = rest.slice(cut).replace(/^\n+/, '');
  }
  if (rest) out.push(rest);
  return out;
}

async function sendTelegram(lead: Lead): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  // Поддержка нескольких получателей: TELEGRAM_CHAT_ID="123,456" (Влад и Тимофей).
  const chatIds = (process.env.TELEGRAM_CHAT_ID ?? '')
    .split(',')
    .map(id => id.trim())
    .filter(Boolean);
  if (!botToken || chatIds.length === 0) return;

  const head = `🤖 <b>Лид с AI-диагностики</b>

<b>Имя:</b> ${escapeHtml(lead.name)}
<b>Контакт:</b> ${escapeHtml(lead.contact)}
<b>Сфера:</b> ${escapeHtml(lead.sphere)}

<b>Карта потерь:</b>
${escapeHtml(lead.mapText.slice(0, 1500))}`;

  // 1) Основное уведомление (определяет успех доставки лида).
  const results = await Promise.allSettled(chatIds.map(id => tgSend(botToken, id, head)));
  if (results.every(r => r.status === 'rejected')) {
    throw new Error('Telegram: не доставлено ни одному получателю');
  }

  // 2) Полный диалог диагностики — отдельными сообщениями (plain, с разбивкой по лимиту).
  //    Best-effort: основное уже доставлено, сбой диалога не должен ронять сток.
  if (lead.dialog.trim()) {
    const chunks = chunkText(`━━ ПОЛНЫЙ ДИАЛОГ ДИАГНОСТИКИ ━━\n\n${lead.dialog}`);
    for (const chatId of chatIds) {
      for (const c of chunks) {
        await tgSend(botToken, chatId, c, false).catch(() => {});
      }
    }
  }
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

  const sessionRes = await fetch(`${url}/rest/v1/diagnostic_sessions`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      session_id: lead.sessionId,
      sphere: lead.sphere,
      // Сохраняем полный диалог (если есть) — вся картина ответов клиента; иначе краткую сводку.
      pain: lead.dialog.trim() || lead.pain,
      result_map: lead.mapText,
    }),
  });
  if (!sessionRes.ok) {
    const detail = await sessionRes.text().catch(() => '');
    throw new Error(`Supabase diagnostic_sessions: ${sessionRes.status} ${detail.slice(0, 200)}`);
  }

  const leadRes = await fetch(`${url}/rest/v1/diagnostic_leads`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      session_id: lead.sessionId,
      name: lead.name,
      contact: lead.contact,
    }),
  });
  if (!leadRes.ok) {
    const detail = await leadRes.text().catch(() => '');
    throw new Error(`Supabase diagnostic_leads: ${leadRes.status} ${detail.slice(0, 200)}`);
  }
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

    // Три независимых стока лида: Telegram, Supabase, JARVIS CRM.
    // Сбой одного не должен ронять остальные — выполняем все и смотрим итог.
    const sinks: { name: string; run: () => Promise<void> }[] = [
      { name: 'telegram', run: () => sendTelegram(lead) },
      { name: 'supabase', run: () => saveToSupabase(lead) },
      {
        name: 'crm',
        run: async () => {
          const crm = await sendLeadToCRM({
            name: lead.name,
            contact: lead.contact,
            niche: lead.sphere || undefined,
            // Полный диалог диагностики + карта потерь — вся картина в карточке лида CRM.
            notes: [lead.dialog.trim() || lead.pain, lead.mapText].filter(Boolean).join('\n\n') || undefined,
            source: 'diagnostic-agent',
          });
          if (!crm.ok && !crm.skipped) throw new Error(crm.error ?? 'CRM save failed');
        },
      },
    ];

    const results = await Promise.allSettled(sinks.map(s => s.run()));

    // Логируем упавшие стоки без персональных данных лида: имя стока + sessionId + сообщение.
    results.forEach((r, i) => {
      if (r.status === 'rejected') {
        const msg = r.reason instanceof Error ? r.reason.message : String(r.reason);
        console.error(`[lead] sink=${sinks[i].name} session=${lead.sessionId} failed:`, msg);
      }
    });

    // 200 — если лид доехал хотя бы до одного стока; 500 — только если упали все три.
    if (results.every(r => r.status === 'rejected')) {
      return NextResponse.json(
        { error: { code: 'INTERNAL_ERROR', message: 'Не удалось отправить заявку' } },
        { status: 500 },
      );
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
