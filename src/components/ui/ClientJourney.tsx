const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

const STEPS = [
  { num: '01', label: 'ДИАГНОСТИКА', sub: 'Бесплатно · 2 мин', href: '#diagnose', active: true },
  { num: '02', label: 'КАРТА ПОТЕРЬ', sub: 'Готова за 4 дня', href: '/how-we-work#process', active: false },
  { num: '03', label: 'AI-СИСТЕМА', sub: 'Запуск за 3–6 нед', href: '/how-we-work', active: false },
  { num: '04', label: 'РЕЗУЛЬТАТ', sub: 'ROI за 1–2 мес', href: '/how-we-work#cases', active: false },
];

export default function ClientJourney() {
  return (
    <div
      className="journey-strip"
      style={{
        borderTop: '1px solid #1A1A1A',
        borderBottom: '1px solid #1A1A1A',
        background: '#080808',
      }}
    >
      <div
        className="journey-inner"
        style={{
          display: 'flex',
          alignItems: 'stretch',
          padding: '0 72px',
          overflowX: 'auto',
        }}
      >
        {STEPS.map((s, i) => (
          <div
            key={s.num}
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              minWidth: 140,
              borderLeft: i > 0 ? '1px solid #1A1A1A' : 'none',
            }}
          >
            <a
              href={s.href}
              className="journey-link"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '22px 24px',
                textDecoration: 'none',
                transition: 'background 0.15s',
              }}
            >
              <span style={{
                fontFamily: bebas,
                fontSize: 40,
                color: s.active ? 'var(--accent)' : 'rgba(255,106,0,0.22)',
                lineHeight: 1,
                letterSpacing: '1px',
                flexShrink: 0,
              }}>
                {s.num}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={{
                  fontFamily: bebas,
                  fontSize: 17,
                  color: s.active ? 'var(--ink)' : '#555',
                  letterSpacing: '1.5px',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}>
                  {s.label}
                </span>
                <span style={{
                  fontSize: 12,
                  color: s.active ? '#666' : '#333',
                  whiteSpace: 'nowrap',
                }}>
                  {s.sub}
                </span>
              </div>
            </a>
            {i < STEPS.length - 1 && (
              <span style={{
                color: s.active ? 'rgba(255,106,0,0.35)' : 'rgba(255,106,0,0.12)',
                fontSize: 16,
                flexShrink: 0,
                fontFamily: bebas,
                userSelect: 'none',
                paddingRight: 4,
              }}>
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <style>{`
        .journey-link:hover { background: rgba(255,106,0,0.05) !important; }
        @media (max-width: 720px) {
          .journey-inner { padding: 0 16px !important; }
          .journey-link { padding: 16px 12px !important; gap: 10px !important; }
        }
      `}</style>
    </div>
  );
}
