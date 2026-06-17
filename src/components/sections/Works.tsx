'use client';

import SectionLabel from '@/components/ui/SectionLabel';

const CASES = [
  {
    tag: 'Ритейл, 3 точки',
    thought: '"Всё ок, прибыль растёт"',
    truth: 'Одна точка убыточна, съедает 12% общей прибыли',
    loss: '1.4 млн ₽/год',
  },
  {
    tag: 'Онлайн-школа',
    thought: '"Проблема в маркетинге"',
    truth: '40% учеников не проходят курс из-за плохой платформы. Каждый недосмотр = потеря 45k₽',
    loss: '6.3 млн ₽/год',
  },
  {
    tag: 'Оптовая торговля',
    thought: '"Нужен CRM"',
    truth: 'CRM не поможет, проблема в складской логистике. 23% заказов с опозданием',
    loss: '3.2 млн ₽/год',
  },
];

export default function Works() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          <div>
            <SectionLabel>&apos;Но у меня же всё работает...&apos;</SectionLabel>
            <p style={{ fontSize: 15, color: 'var(--sub2)', marginTop: 10 }}>
              Так думают 80% предпринимателей. Пока не увидят цифры.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {CASES.map((c, i) => (
              <div key={i} style={{
                background: 'linear-gradient(145deg, rgba(24,24,24,0.88), rgba(18,18,18,0.88))',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius)',
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                transition: 'border-color 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,106,0,0.3)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
              >
                {/* Тег */}
                <div style={{
                  display: 'inline-flex',
                  alignSelf: 'flex-start',
                  padding: '4px 12px',
                  border: '1px solid rgba(255,106,0,0.35)',
                  borderRadius: 0,
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--accent)',
                  letterSpacing: '0.04em',
                }}>
                  {c.tag}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <p style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, fontWeight: 600 }}>Думал:</p>
                    <p style={{ fontSize: 14, color: 'var(--ink)', fontStyle: 'italic' }}>{c.thought}</p>
                  </div>
                  <div style={{ height: 1, background: 'var(--line)' }} />
                  <div>
                    <p style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, fontWeight: 600 }}>Правда:</p>
                    <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.55 }}>{c.truth}</p>
                  </div>
                </div>

                {/* Потери */}
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(255,106,0,0.06)',
                  border: '1px solid rgba(255,106,0,0.15)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: 11, color: 'var(--sub)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Потери:</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.04em' }}>{c.loss}</span>
                </div>

                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, var(--accent), transparent)', opacity: 0.3 }} />
              </div>
            ))}
          </div>

          <p style={{ fontSize: 14, color: 'var(--sub)', textAlign: 'center', fontStyle: 'italic' }}>
            Не знать о проблемах — нормально. Отказываться их увидеть — дорого.
          </p>
        </div>
      </div>
    </section>
  );
}
