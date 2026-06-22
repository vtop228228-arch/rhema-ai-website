import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const raw = process.env.NVIDIA_API_KEY ?? '';
  const tg = process.env.TELEGRAM_BOT_TOKEN ?? '';
  const chat = process.env.TELEGRAM_CHAT_ID ?? '';
  return NextResponse.json({
    nvidia: {
      present: !!raw,
      length: raw.length,
      looksValid: raw.startsWith('nvapi-'),
      hasBOM: raw.charCodeAt(0) === 65279,
      hasLeadingSpace: /^\s/.test(raw),
      hasTrailingSpace: /\s$/.test(raw),
    },
    telegram: {
      botTokenPresent: !!tg,
      chatIdPresent: !!chat,
    },
  });
}
