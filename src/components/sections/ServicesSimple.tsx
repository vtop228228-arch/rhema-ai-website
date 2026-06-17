'use client';

const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

const SERVICES = [
  {
    num: '01',
    title: 'Найдём, где теряются деньги',
    body: 'За 3 дня покажем конкретные дыры в бизнесе с цифрами в рублях. Не гипотезы — точные факты. Бесплатно.',
    tags: ['Бесплатно', '3 дня', '0 риска'],
    href: '#diagnose',
    cta: 'НАЧАТЬ БЕСПЛАТНО',
    accent: true,
  },
  {
    num: '02',
    title: 'Поставим ботов на рутину',
    body: 'Бот принимает заявки, квалифицирует клиентов, пишет отчёты — пока вы занимаетесь важным. Работает 24/7, не болеет и не увольняется.',
    tags: ['5–14 дней', 'от 30 000 ₽'],
    href: '/how-we-work',
    cta: 'ПОСМОТРЕТЬ ПРИМЕРЫ',
    accent: false,
  },
  {
    num: '03',
    title: 'Ваша платформа за 3 недели',
    body: 'CRM, личный кабинет, дашборд — под ключ. В 3–5 раз быстрее обычных студий и без переплат за «процессы».',
    tags: ['от 7 дней', 'от 90 000 ₽'],
    href: '#cases',
    cta: 'СМОТРЕТЬ КЕЙСЫ',
    accent: false,
  },
];

export default function ServicesSimple() {
  return (
    <div className="section-pad" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="section-head">
        <div className="dot" />
        <span className="title">ЧТО МЫ ДЕЛАЕМ</span>
        <div className="rule" />
      </div>

      <div className="svc-simple-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {SERVICES.map((s) => (
          <div
            key={s.num}
            style={{
              background: s.accent ? 'rgba(255,106,0,0.05)' : 'var(--card)',
              border: `1px solid ${s.accent ? 'rgba(255,106,0,0.28)' : 'var(--line)'}`,
              padding: '30px 26px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div style={{ fontFamily: bebas, fontSize: 42, color: s.accent ? 'var(--accent)' : 'rgba(255,106,0,0.15)', lineHeight: 1, letterSpacing: '2px' }}>
              {s.num}
            </div>

            <div style={{ fontFamily: bebas, fontSize: 23, color: 'var(--ink)', letterSpacing: '0.5px', lineHeight: 1.1 }}>
              {s.title.toUpperCase()}
            </div>

            <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.8, flex: 1 }}>
              {s.body}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {s.tags.map((t) => (
                <span
                  key={t}
                  style={{ fontSize: 11, color: '#777', background: 'rgba(255,255,255,0.03)', border: '1px solid #1E1E1E', padding: '3px 9px', letterSpacing: '0.5px' }}
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href={s.href}
              style={{
                display: 'block',
                background: s.accent ? 'var(--accent)' : 'transparent',
                border: `1px solid ${s.accent ? 'transparent' : 'rgba(255,106,0,0.35)'}`,
                color: s.accent ? '#090909' : 'var(--accent)',
                padding: '11px 18px',
                fontFamily: bebas,
                fontSize: 14,
                letterSpacing: '1px',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.82'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
            >
              {s.cta} →
            </a>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .svc-simple-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
