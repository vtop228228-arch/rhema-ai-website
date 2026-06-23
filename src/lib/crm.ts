// Отправка лида в JARVIS CRM (jarvis.leads) через edge-функцию lead-intake.
//
// Сайт НЕ ходит в БД напрямую и не хранит service-role: только URL функции + общий
// секрет (x-lead-secret). Секрет на edge-слое хэшируется и сверяется с зашитым SHA-256.
//
// Пока env LEAD_INTAKE_URL / LEAD_INTAKE_SECRET не заданы — мягко пропускаем (skipped),
// чтобы форма и Telegram-сток никогда не падали из-за CRM.

export interface CrmLead {
  name: string;            // -> jarvis.leads.name
  contact: string;         // как ввёл пользователь (telegram/whatsapp) -> contact.raw
  niche?: string;          // сфера бизнеса -> jarvis.leads.niche
  notes?: string;          // описание/боль -> jarvis.leads.notes
  source?: string;         // 'rhema-ai-website' | 'diagnostic-agent'
}

export interface CrmResult {
  ok: boolean;
  skipped?: boolean;       // CRM не подключена (нет env)
  error?: string;
}

export async function sendLeadToCRM(lead: CrmLead): Promise<CrmResult> {
  const url = process.env.LEAD_INTAKE_URL;
  const secret = process.env.LEAD_INTAKE_SECRET;

  if (!url || !secret) {
    return { ok: false, skipped: true };
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-lead-secret': secret,
      },
      body: JSON.stringify({
        name: lead.name,
        contact: { raw: lead.contact },
        niche: lead.niche ?? null,
        notes: lead.notes ?? null,
        source: lead.source ?? 'rhema-ai-website',
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { ok: false, error: `CRM responded ${res.status}${detail ? `: ${detail}` : ''}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'CRM request failed' };
  }
}
