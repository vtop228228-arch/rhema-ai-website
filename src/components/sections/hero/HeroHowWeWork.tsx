const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

const META = [
  ['3–6 нед', 'До запуска'],
  ['0 ₽', 'Диагностика'],
];

export default function HeroHowWeWork() {
  return (
    <section
      className="hero-hww"
      style={{ borderBottom: '1px solid var(--line2)' }}
    >
      <div className="eyebrow" style={{ marginBottom: 22, animation: 'fadeUp 0.5s ease 0.05s both' }}>
        <div className="bar" />
        <span className="text">Как мы работаем</span>
      </div>

      <h1 style={{ fontFamily: bebas, fontSize: 'clamp(28px, 8vw, 76px)', lineHeight: 0.92, letterSpacing: '1.5px', marginBottom: 28, overflowWrap: 'break-word' }}>
        <span style={{ display: 'block', color: 'var(--ink)', animation: 'fadeUp 0.6s ease 0.15s both' }}>ДИАГНОСТИКА.</span>
        <span style={{ display: 'block', color: 'var(--ink)', animation: 'fadeUp 0.6s ease 0.22s both' }}>РЕШЕНИЕ.</span>
        <span style={{ display: 'block', color: 'var(--accent)', animation: 'fadeUp 0.6s ease 0.3s both' }}>РЕЗУЛЬТАТ.</span>
        <span className="hero-sub-line" style={{ display: 'block', color: '#666', fontSize: '0.42em', marginTop: 10, animation: 'fadeUp 0.6s ease 0.38s both' }}>ПРОЗРАЧНО · В СРОК · С ИЗМЕРИМЫМ ROI</span>
      </h1>

      <p style={{ fontSize: 15, color: '#AAAAAA', maxWidth: 540, lineHeight: 1.82, marginBottom: 36, animation: 'fadeUp 0.6s ease 0.45s both' }}>
        Находим, где теряются деньги → строим AI-систему → запускаем за 3–6 недель.
        Платите за результат, а не за процесс. Бесплатная диагностика за 2 минуты — прямо сейчас.
      </p>

      {/* Meta strip */}
      <div style={{ display: 'flex', borderTop: '1px solid var(--line2)', borderBottom: '1px solid var(--line2)', marginBottom: 36, width: 'fit-content' }}>
        {META.map(([val, label], i) => (
          <div key={i} style={{ padding: '13px 28px', borderRight: i < META.length - 1 ? '1px solid var(--line2)' : 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontFamily: bebas, fontSize: 19, letterSpacing: 1, color: 'var(--ink)' }}>{val}</span>
            <span style={{ fontSize: 10, color: '#777', textTransform: 'uppercase', letterSpacing: '2px' }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <a href="/#diagnose" className="btn btn-blue btn-md">Пройти диагностику →</a>
        <a href="#process" className="btn btn-line btn-md">Как это работает</a>
      </div>

      <style>{`
        .hero-hww { padding: 72px 72px 60px; }
        .hero-sub-line { letter-spacing: 4px; }
        @media (max-width: 720px) {
          .hero-hww { padding: 48px 22px 40px; }
          .hero-sub-line { letter-spacing: 1.5px; }
        }
      `}</style>
    </section>
  );
}
