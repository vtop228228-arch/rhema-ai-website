import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE_URL } from '@/lib/site';

// Файл-конвенция Next 16: генерирует og:image (и фолбэк twitter:image) для всего сайта.
export const runtime = 'nodejs';
export const alt = 'Rhema AI — AI-системы под ключ для бизнеса';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Палитра берётся из src/app/globals.css (актуальный «Industrial»-вариант).
// Сейчас на сайте активен синий акцент (#2563EB); в globals.css это помечено как
// TEST-замена оранжевого #FF6A00. Если бренд вернётся к оранжевому — поменяй ACCENT здесь.
const BG = '#0A0A0B';
const ACCENT = '#2563EB';
const INK = '#FFFFFF';
const SUB = '#AAAAAA';

async function font(file: string): Promise<Buffer> {
  return readFile(join(process.cwd(), 'assets', file));
}

export default async function Image() {
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
          background: BG,
          backgroundImage: `radial-gradient(1000px 500px at 100% 0%, rgba(37,99,235,0.22), transparent 60%)`,
          padding: '72px 80px',
          fontFamily: 'Manrope',
        }}
      >
        {/* Eyebrow: акцентный маркер + метка */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 46, height: 8, background: ACCENT, display: 'flex' }} />
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: 6,
              color: SUB,
              textTransform: 'uppercase',
            }}
          >
            AI-агентство
          </div>
        </div>

        {/* Центральный блок: название + слоган */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 150,
              fontWeight: 800,
              letterSpacing: 2,
              lineHeight: 1,
              color: INK,
            }}
          >
            RHEMA AI
          </div>
          <div style={{ display: 'flex', width: 120, height: 6, background: ACCENT, marginTop: 34, marginBottom: 34 }} />
          <div
            style={{
              display: 'flex',
              fontSize: 44,
              fontWeight: 500,
              lineHeight: 1.25,
              color: SUB,
              maxWidth: 940,
            }}
          >
            AI-системы под ключ для бизнеса
          </div>
        </div>

        {/* Низ: короткий оффер + домен */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 500, color: INK }}>
            Находим скрытые потери в бизнесе за 3 дня
          </div>
          <div style={{ display: 'flex', fontSize: 24, fontWeight: 500, color: ACCENT }}>{domain}</div>
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
