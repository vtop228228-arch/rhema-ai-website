const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

export default function PatternCTA() {
  return (
    <div
      className="pattern-cta"
      style={{ background: 'var(--card)', borderTop: '1px solid var(--line2)', borderBottom: '1px solid var(--line2)', padding: '44px 72px' }}
    >
      <div style={{ display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap', maxWidth: 1120, margin: '0 auto' }}>
        {/* Left */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            <div className="bar" />
            <span className="text">Видите паттерн?</span>
          </div>
          <h2 style={{ fontFamily: bebas, fontSize: 'clamp(26px, 3vw, 40px)', color: 'var(--ink)', letterSpacing: 1, lineHeight: 1.0, margin: 0 }}>
            9 из 10 предпринимателей<br />неверно определяют причину проблем
          </h2>
        </div>

        {/* Right */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{ fontSize: 14, color: '#777', maxWidth: 280, lineHeight: 1.72, margin: 0 }}>
            Хотите узнать, где теряет деньги именно ваш бизнес?
          </p>
          <a href="#contact" className="btn btn-blue btn-md">
            Найти корень проблем
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .pattern-cta { padding: 36px 22px !important; }
        }
      `}</style>
    </div>
  );
}
