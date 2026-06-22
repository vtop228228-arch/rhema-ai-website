const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

const PROOFS = [
  {
    num: '3 нед',
    label: 'до первой выручки',
    sub: 'Платформа SigmaUp под ключ — там, где у студий уходит 2–4 месяца.',
  },
  {
    num: '0',
    label: 'потерянных заявок',
    sub: 'AI-агент в LifesystemA обрабатывает каждого клиента 24/7 — ни одной упущенной продажи.',
  },
  {
    num: '70%',
    label: 'экономии на ФОТ',
    sub: 'Исключаем раздутый штат: AI-агент заменяет рутинную работу менеджеров и экономит сотни тысяч ₽ в месяц.',
  },
];

export default function ResultsPreview() {
  return (
    <div className="section-pad" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="section-head">
        <div className="dot" />
        <span className="title">РЕЗУЛЬТАТЫ</span>
        <div className="rule" />
      </div>

      <div className="results-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, marginBottom: 24 }}>
        {PROOFS.map((p, i) => (
          <div
            key={i}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--line)',
              padding: '28px 26px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ fontFamily: bebas, fontSize: 52, color: 'var(--accent)', lineHeight: 1, letterSpacing: '1px' }}>
              {p.num}
            </div>
            <div style={{ fontFamily: bebas, fontSize: 17, color: 'var(--ink)', letterSpacing: '0.5px' }}>
              {p.label.toUpperCase()}
            </div>
            <p style={{ fontSize: 13, color: 'var(--sub2)', lineHeight: 1.6, marginTop: 4 }}>
              {p.sub}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 28 }}>
        <a
          href="/how-we-work#cases"
          style={{ fontFamily: bebas, fontSize: 14, letterSpacing: '1.5px', color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid rgba(37,99,235,0.4)', paddingBottom: 2 }}
        >
          СМОТРЕТЬ ВСЕ КЕЙСЫ →
        </a>
        <span style={{ fontSize: 12, color: '#505050' }}>4 реальных проекта с описанием</span>
      </div>

      {/* Bridge CTA: увидел результаты → следующий шаг */}
      <div className="results-bridge" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        padding: '22px 26px',
        background: 'rgba(37,99,235,0.04)',
        border: '1px solid rgba(37,99,235,0.18)',
      }}>
        <div>
          <div style={{ fontFamily: bebas, fontSize: 18, color: 'var(--ink)', letterSpacing: '0.5px', lineHeight: 1 }}>
            УЗНАЙТЕ, ГДЕ ТЕРЯЕТЕ ДЕНЬГИ
          </div>
          <div style={{ fontSize: 13, color: '#666', marginTop: 5 }}>
            Диагностика бесплатно — ответим в течение 2 часов
          </div>
        </div>
        <a
          href="#diagnose"
          className="results-bridge-btn"
          style={{
            display: 'inline-block',
            background: 'var(--accent)',
            color: '#ffffff',
            fontFamily: bebas,
            fontSize: 13,
            letterSpacing: '1px',
            padding: '10px 20px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'opacity 0.15s',
          }}
        >
          ПОЛУЧИТЬ КАРТУ ПОТЕРЬ →
        </a>
      </div>

      <style>{`
        .results-bridge-btn:hover { opacity: 0.82; }
        @media (max-width: 720px) {
          .results-grid { grid-template-columns: 1fr !important; }
          .results-bridge { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </div>
  );
}
