'use client';

const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

const SERVICES = [
  {
    num: '01',
    title: 'Карта потерь за 2 минуты',
    body: 'Ответьте на 2–3 вопроса — AI покажет, где конкретно уходят деньги и что внедрить первым. Без звонков, без обязательств.',
    tags: ['Бесплатно', '2 минуты', '0 риска'],
    href: '#diagnose',
    cta: 'НАЧАТЬ ДИАГНОСТИКУ',
    accent: true,
  },
  {
    num: '02',
    title: 'AI-боты вместо рутины',
    body: 'Заявки, квалификация, напоминания, отчёты — всё это делает бот. Интеграция в Telegram, CRM или сайт. Работает 24/7, не болеет.',
    tags: ['5–14 дней', 'от 30 000 ₽'],
    href: '/how-we-work',
    cta: 'КАК ЭТО РАБОТАЕТ',
    accent: false,
  },
  {
    num: '03',
    title: 'Платформа под ваши процессы',
    body: 'CRM, личный кабинет, дашборды — под ключ за 3–6 недель. Фиксированная стоимость, без «а давайте ещё добавим» за доп. деньги.',
    tags: ['от 3 недель', 'от 90 000 ₽'],
    href: '/cases',
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
