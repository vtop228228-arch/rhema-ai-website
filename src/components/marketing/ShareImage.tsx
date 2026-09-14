import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE_URL } from '@/lib/site';

export const runtime = 'nodejs';
export const alt = 'Rhema AI — AI-агенты и платформы под ваш бизнес';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PAPER = '#f4f2ec';
const INK = '#18201e';
const ROYAL = '#1649e8';
const LIME = '#d9ef88';

async function font(file: string): Promise<Buffer> {
  return readFile(join(process.cwd(), 'assets', file));
}

function Fish({ width, color, accent }: { width: number; color: string; accent: string }) {
  return (
    <svg width={width} height={width * (34 / 56)} viewBox="0 0 56 34" fill="none">
      <path
        d="M3 17 C 8 7, 26 5, 40 14 C 44 16, 47 20, 52 25"
        stroke={color}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 17 C 8 27, 26 29, 40 20 C 44 18, 47 14, 52 9"
        stroke={accent}
        strokeWidth="3.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function ShareImage({ locale = 'ru' }: { locale?: 'ru' | 'en' }) {
  const en = locale === 'en';
  const [cyr800, lat800, cyr500, lat500] = await Promise.all([
    font('manrope-800-cyrillic.woff'),
    font('manrope-800-latin.woff'),
    font('manrope-500-cyrillic.woff'),
    font('manrope-500-latin.woff'),
  ]);

  const domain = SITE_URL.replace(/^https?:\/\//, '');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: PAPER,
          color: INK,
          padding: '48px 64px',
          fontFamily: 'Manrope',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Fish width={58} color={INK} accent={ROYAL} />
            <div style={{ display: 'flex', fontSize: 33, fontWeight: 800, letterSpacing: -1 }}>
              RHEMA AI
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 17, fontWeight: 500, letterSpacing: 2, color: ROYAL }}>
            {en ? 'FROM TASK TO LAUNCH' : 'ОТ ЗАДАЧИ ДО ВНЕДРЕНИЯ'}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: 728 }}>
            <div style={{ display: 'flex', fontSize: 74, fontWeight: 800, lineHeight: 1.08, letterSpacing: -4 }}>
              {en ? 'AI agents' : 'AI-агенты'}
            </div>
            <div style={{ display: 'flex', fontSize: 74, fontWeight: 800, lineHeight: 1.08, letterSpacing: -4 }}>
              {en ? 'and platforms' : 'и платформы'}
            </div>
            <div style={{ display: 'flex', fontSize: 74, fontWeight: 800, lineHeight: 1.08, letterSpacing: -4, color: ROYAL }}>
              {en ? 'built for you' : 'под ваш бизнес'}
            </div>
            <div style={{ display: 'flex', fontSize: 23, fontWeight: 500, color: '#5c665f', marginTop: 25 }}>
              {en ? 'Connect AI to the way your team works.' : 'Соединяем AI с реальными процессами.'}
            </div>
          </div>

          <div style={{ display: 'flex', padding: 8, borderRadius: 40, background: '#e0e5df' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 300,
                height: 336,
                padding: '28px 20px',
                borderRadius: 32,
                background: ROYAL,
                color: PAPER,
              }}
            >
              <div style={{ display: 'flex', alignSelf: 'flex-start', fontSize: 14, fontWeight: 500, letterSpacing: 3 }}>
                RHEMA / AI
              </div>
              <Fish width={254} color={PAPER} accent={LIME} />
              <div style={{ display: 'flex', padding: '9px 16px', borderRadius: 24, background: LIME, color: INK, fontSize: 16, fontWeight: 500 }}>
                {en ? 'Part of your workflow' : 'Встроено в вашу работу'}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 19, fontWeight: 500 }}>
            <div style={{ display: 'flex', width: 10, height: 10, borderRadius: 5, background: ROYAL }} />
            {en ? 'Discovery · Development · Support' : 'Диагностика · Разработка · Поддержка'}
          </div>
          <div style={{ display: 'flex', fontSize: 19, fontWeight: 500, color: '#5c665f' }}>{domain}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Manrope', data: cyr800, weight: 800, style: 'normal' },
        { name: 'Manrope', data: lat800, weight: 800, style: 'normal' },
        { name: 'Manrope', data: cyr500, weight: 500, style: 'normal' },
        { name: 'Manrope', data: lat500, weight: 500, style: 'normal' },
      ],
    },
  );
}

