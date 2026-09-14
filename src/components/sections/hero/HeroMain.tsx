import DiagnosticAgent from '@/components/sections/DiagnosticAgent';

export default function HeroMain() {
  return (
    <section className="hero-wrap" id="diagnose" style={{ display: 'flex', minHeight: 640 }}>
      {/* LEFT: МОНОЛИТ */}
      <div
        className="hero-left"
        style={{
          flex: 1,
          minWidth: 0,
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 24,
          position: 'relative',
        }}
      >
        {/* Grid texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }} />
        {/* Depth vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 30% 55%, transparent 40%, #090909 82%)',
        }} />

        {/* Eyebrow */}
        <div className="eyebrow" style={{ position: 'relative', zIndex: 1, animation: 'fadeUp 0.5s ease 0.05s both' }}>
          <div className="bar" />
          <span className="text">AI-агенты для малого и среднего бизнеса</span>
        </div>

        {/* H1 */}
        <h1 className="hero-h1" style={{
          fontFamily: 'var(--font-bebas), Bebas Neue, sans-serif',
          lineHeight: 0.9,
          position: 'relative',
          zIndex: 1,
          overflowWrap: 'break-word',
          wordBreak: 'normal',
        }}>
          <span style={{ display: 'block', color: 'var(--ink)', animation: 'fadeUp 0.6s ease 0.18s both' }}>AI ДЛЯ</span>
          <span style={{ display: 'block', color: 'var(--accent)', marginTop: 8, animation: 'fadeUp 0.6s ease 0.3s both' }}>БИЗНЕСА</span>
        </h1>

        {/* Body — для кого */}
        <div style={{ marginTop: 200, position: 'relative', zIndex: 1, animation: 'fadeUp 0.6s ease 0.45s both' }}>
          <div className="section-head" style={{ marginBottom: 20 }}>
            <div className="dot" />
            <span className="title">ДЛЯ КОГО?</span>
            <div className="rule" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Бизнес работает, деньги идут — но вы чувствуете, что можно эффективнее',
              'Слышали про AI, но не понимаете, где конкретно его применить',
              'Подозреваете, что где-то теряете деньги — но не видите где',
            ].map((t) => (
              <div key={t} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', maxWidth: 420 }}>
                <div style={{ width: 4, height: 4, background: 'var(--accent)', flexShrink: 0, marginTop: 9 }} />
                <span style={{ fontSize: 18, color: 'var(--ink)', lineHeight: 1.6, fontStyle: 'italic' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="hero-divider" style={{ width: 1, background: 'var(--line2)', flexShrink: 0 }} />

      {/* RIGHT: живой AI-агент диагностики */}
      <DiagnosticAgent />

      <style>{`
        .hero-h1 { font-size: clamp(28px, 7.5vw, 76px); }
        .hero-left {
          padding: 60px 40px 60px 72px;
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .hero-wrap { flex-direction: column; min-height: auto; }
          .hero-left { padding: 48px 22px 36px; overflow: visible; }
          .hero-divider { display: none; }
        }
        @media (max-width: 600px) {
          .hero-h1 { font-size: 5.5vw; }
        }
        @media (max-width: 480px) {
          .hero-h1 { font-size: 5.2vw; }
          .hero-left { padding: 40px 20px 28px; }
        }
      `}</style>
    </section>
  );
}
