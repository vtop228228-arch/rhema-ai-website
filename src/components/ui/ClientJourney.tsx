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
        }}
      >
        {STEPS.map((s, i) => (
          <div
            key={s.num}
            className="journey-step"
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
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
              <span
                className="journey-num"
                style={{
                  fontFamily: bebas,
                  fontSize: 40,
                  color: s.active ? 'var(--accent)' : 'rgba(255,106,0,0.22)',
                  lineHeight: 1,
                  letterSpacing: '1px',
                  flexShrink: 0,
                }}
              >
                {s.num}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span
                  className="journey-label"
                  style={{
                    fontFamily: bebas,
                    fontSize: 17,
                    color: s.active ? 'var(--ink)' : '#555',
                    letterSpacing: '1.5px',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {s.label}
                </span>
                <span
                  className="journey-sub"
                  style={{
                    fontSize: 12,
                    color: s.active ? '#666' : '#333',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {s.sub}
                </span>
              </div>
            </a>
            {i < STEPS.length - 1 && (
              <span
                className="journey-arrow"
                style={{
                  color: s.active ? 'rgba(255,106,0,0.35)' : 'rgba(255,106,0,0.12)',
                  fontSize: 16,
                  flexShrink: 0,
                  fontFamily: bebas,
                  userSelect: 'none',
                  paddingRight: 4,
                }}
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .journey-link:hover { background: rgba(255,106,0,0.05) !important; }

        /* Планшет */
        @media (max-width: 900px) {
          .journey-inner { padding: 0 22px !important; }
          .journey-link { padding: 18px 14px !important; gap: 10px !important; }
          .journey-num { font-size: 30px !important; }
          .journey-label { font-size: 14px !important; }
        }

        /* Мобайл — 2×2 сетка */
        @media (max-width: 600px) {
          .journey-inner {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            padding: 0 !important;
          }
          .journey-step {
            flex: unset !important;
            border-left: none !important;
            border-bottom: 1px solid #1A1A1A;
          }
          .journey-step:nth-child(2),
          .journey-step:nth-child(4) { border-left: 1px solid #1A1A1A !important; }
          .journey-step:nth-child(3),
          .journey-step:nth-child(4) { border-bottom: none !important; }
          .journey-arrow { display: none !important; }
          .journey-link { padding: 16px 14px !important; gap: 10px !important; }
          .journey-num { font-size: 28px !important; }
          .journey-label { font-size: 12px !important; letter-spacing: 1px !important; white-space: normal !important; }
          .journey-sub { font-size: 11px !important; white-space: normal !important; }
        }
      `}</style>
    </div>
  );
}
