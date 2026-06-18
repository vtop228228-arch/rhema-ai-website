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
          backgroundImage: 'linear-gradient(rgba(255,106,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.04) 1px, transparent 1px)',
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
          <span className="text">Rhema AI · Автоматизация под ключ</span>
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
          <span style={{ display: 'block', color: 'var(--ink)', animation: 'fadeUp 0.6s ease 0.18s both' }}>СТРОИМ AI,</span>
          <span style={{ display: 'block', color: 'var(--ink)', animation: 'fadeUp 0.6s ease 0.28s both' }}>КОТОРЫЙ</span>
          <span style={{ display: 'block', color: 'var(--accent)', animation: 'fadeUp 0.6s ease 0.38s both' }}>ЗАРАБАТЫВАЕТ</span>
          <span className="hero-sub" style={{ display: 'block', color: '#888', fontSize: '0.38em', letterSpacing: '4px', marginTop: 12, animation: 'fadeUp 0.6s ease 0.46s both' }}>ЗА 3–6 НЕДЕЛЬ · БЕСПЛАТНАЯ ДИАГНОСТИКА</span>
        </h1>

        {/* Body */}
        <p style={{ fontSize: 15, color: '#AAAAAA', maxWidth: 400, lineHeight: 1.85, position: 'relative', zIndex: 1, animation: 'fadeUp 0.6s ease 0.52s both' }}>
          Пройдите 2-минутную диагностику прямо здесь — AI покажет карту потерь вашего бизнеса в рублях и что внедрить первым.
        </p>
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
          .hero-sub { letter-spacing: 2px; }
        }
      `}</style>
    </section>
  );
}
