'use client';

import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';

const ROWS = [
  { service: 'Диагностика бизнеса', term: '3–4 дня', price: 'Бесплатно' },
  { service: 'AI-агент (Telegram-бот)', term: '1–2 недели', price: 'от 40 000 ₽' },
  { service: 'Telegram Mini App', term: '3–5 недель', price: 'от 150 000 ₽' },
  { service: 'SaaS MVP (5–10 модулей)', term: '3–5 недель', price: 'от 250 000 ₽' },
  { service: 'Мультиагентная система', term: '2–4 недели', price: 'от 100 000 ₽' },
  { service: 'Enterprise (под ключ)', term: 'по проекту', price: 'от 500 000 ₽' },
];

export default function PriceTable() {
  return (
    <section className="section-alt">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <SectionLabel>Стоимость</SectionLabel>
              <h2 className="font-bebas text-ink" style={{ fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '0.03em' }}>
                Прозрачное ценообразование
              </h2>
            </div>
            <p style={{ fontSize: 14, color: 'var(--sub)', maxWidth: 360 }}>
              Стоимость диагностики вычитается из стоимости разработки.
            </p>
          </div>

          {/* Таблица */}
          <div style={{ border: '1px solid var(--line)', borderRadius: 3, overflow: 'hidden' }}>
            {/* Заголовок */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 140px 160px',
              background: 'var(--card)',
              borderBottom: '1px solid var(--line)',
              padding: '12px 24px',
            }}>
              {['Услуга', 'Срок', 'Стоимость'].map((h) => (
                <span key={h} style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--sub)' }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Строки */}
            {ROWS.map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 140px 160px',
                  padding: '16px 24px',
                  borderBottom: i < ROWS.length - 1 ? '1px solid var(--line)' : 'none',
                  transition: 'background 0.15s',
                  background: 'var(--bg)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--card)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg)')}
              >
                <span style={{ fontSize: 15, color: 'var(--ink)' }}>{row.service}</span>
                <span style={{ fontSize: 14, color: 'var(--sub2)' }}>{row.term}</span>
                <span style={{ fontSize: 15, color: 'var(--accent)', fontWeight: 600 }}>{row.price}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button href="/how-we-work#contact" variant="blue" size="lg">
              Рассчитать стоимость проекта
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
