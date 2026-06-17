const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

export default function HeroCases() {
  return (
    <section className="hero-cases" style={{ borderBottom: '1px solid var(--line2)' }}>
      <div className="eyebrow" style={{ marginBottom: 22, animation: 'fadeUp 0.5s ease 0.05s both' }}>
        <div className="bar" />
        <span className="text">Проекты Rhema AI</span>
      </div>

      <h1 style={{ fontFamily: bebas, fontSize: 'clamp(28px, 8vw, 72px)', lineHeight: 0.92, letterSpacing: '1.5px', marginBottom: 24, overflowWrap: 'break-word' }}>
        <span style={{ display: 'block', color: 'var(--ink)', animation: 'fadeUp 0.6s ease 0.15s both' }}>РЕАЛЬНЫЕ ПРОЕКТЫ.</span>
        <span style={{ display: 'block', color: 'var(--accent)', animation: 'fadeUp 0.6s ease 0.25s both' }}>РЕАЛЬНЫЕ РЕЗУЛЬТАТЫ.</span>
      </h1>

      <p style={{ fontSize: 15, color: '#AAAAAA', maxWidth: 520, lineHeight: 1.82, animation: 'fadeUp 0.6s ease 0.35s both' }}>
        Не обещания и кейсы «в среднем по больнице» — конкретные бизнесы, конкретные задачи, конкретные цифры.
      </p>

      <style>{`
        .hero-cases { padding: 72px 72px 60px; }
        @media (max-width: 720px) {
          .hero-cases { padding: 48px 22px 40px; }
        }
      `}</style>
    </section>
  );
}
