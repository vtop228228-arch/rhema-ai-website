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
          <span className="text">AI-диагностика бизнеса</span>
        </div>

        {/* H1 */}
        <h1 style={{
          fontFamily: 'var(--font-bebas), Bebas Neue, sans-serif',
          fontSize: 'clamp(28px, 7.5vw, 76px)',
          lineHeight: 0.87,
          position: 'relative',
          zIndex: 1,
          overflowWrap: 'break-word',
          wordBreak: 'normal',
        }}>
          <span style={{ display: 'block', color: 'var(--ink)', animation: 'fadeUp 0.6s ease 0.18s both' }}>ОТ ДИАГНОСТИКИ</span>
          <span style={{ display: 'block', color: 'var(--accent)', animation: 'fadeUp 0.6s ease 0.3s both' }}>ДО МАСШТАБИРОВАНИЯ</span>
          <span className="hero-sub" style={{ display: 'block', color: '#999', fontSize: '0.43em', letterSpacing: '5px', marginTop: 10, animation: 'fadeUp 0.6s ease 0.4s both' }}>ЗА 2 МИНУТЫ — БЕСПЛАТНО</span>
        </h1>

        {/* Body */}
        <p style={{ fontSize: 15, color: '#AAAAAA', maxWidth: 400, lineHeight: 1.85, position: 'relative', zIndex: 1, animation: 'fadeUp 0.6s ease 0.45s both' }}>
          Задайте 2–3 вопроса о своём бизнесе прямо здесь. AI покажет персональную карту потерь в ₽ и порекомендует, что внедрить.
        </p>
      </div>

      {/* DIVIDER */}
      <div className="hero-divider" style={{ width: 1, background: 'var(--line2)', flexShrink: 0 }} />

      {/* RIGHT: живой AI-агент диагностики */}
      <DiagnosticAgent />

      <style>{`
        .hero-left {
          padding: 60px 40px 60px 72px;
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .hero-wrap { flex-direction: column; min-height: auto; }
          .hero-left { padding: 48px 22px 36px; overflow: visible; }
          .hero-divider { display: none; }
        }
        @media (max-width: 480px) {
          .hero-left { padding: 40px 20px 28px; }
          .hero-sub { letter-spacing: 2px; }
        }
      `}</style>
    </section>
  );
}
