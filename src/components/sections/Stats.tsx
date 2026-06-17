const STATS = [
  { value: '10+', label: 'диагностик за 1 месяц' },
  { value: '87%', label: 'заказывают внедрение' },
  { value: '3 дня', label: 'средний срок диагностики' },
  { value: '3-5x', label: 'ROI в первый месяц' },
];

export default function Stats() {
  return (
    <section className="section">
      <div className="container">
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`stat-cell stat-cell-${i}`}
              style={{
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                alignItems: 'center',
                textAlign: 'center',
                borderRight: i < STATS.length - 1 ? '1px solid var(--line)' : 'none',
              }}
            >
              <div className="stat-number">{stat.value}</div>
              <p style={{ fontSize: 15, color: 'var(--ink2)', margin: 0, maxWidth: 120 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stat-cell { padding: 28px 20px !important; }
          .stat-cell-1 { border-right: none !important; }
          .stat-cell-2 { border-right: 1px solid var(--line) !important; }
          .stat-cell-0, .stat-cell-1 { border-bottom: 1px solid var(--line); }
        }
      `}</style>
    </section>
  );
}
