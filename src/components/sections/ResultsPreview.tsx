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
    num: '3×',
    label: 'дешевле агентства',
    sub: 'Тот же результат и качество — экономия сотен тысяч ₽ на разработке.',
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

      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <a
          href="/how-we-work#cases"
          style={{ fontFamily: bebas, fontSize: 14, letterSpacing: '1.5px', color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid rgba(255,106,0,0.4)', paddingBottom: 2 }}
        >
          СМОТРЕТЬ ВСЕ КЕЙСЫ →
        </a>
        <span style={{ fontSize: 12, color: '#505050' }}>4 реальных проекта с описанием</span>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
