const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

const STATS = [
  ['4–8 недель', 'Срок MVP'],
  ['24/7', 'Агент работает'],
  ['30 дней', 'Поддержка'],
];

export default function HeroAbout() {
  return (
    <section
      className="hero-about"
      style={{ borderBottom: '1px solid var(--line2)' }}
    >
      <div className="eyebrow" style={{ marginBottom: 22, animation: 'fadeUp 0.5s ease 0.05s both' }}>
        <div className="bar" />
        <span className="text">О компании</span>
      </div>

      <h1 style={{ fontFamily: bebas, fontSize: 'clamp(26px, 7.5vw, 72px)', lineHeight: 0.92, letterSpacing: '1px', marginBottom: 28, overflowWrap: 'break-word' }}>
        <span style={{ display: 'block', color: 'var(--ink)', animation: 'fadeUp 0.6s ease 0.15s both' }}>Rhema AI —</span>
        <span style={{ display: 'block', color: 'var(--ink)', animation: 'fadeUp 0.6s ease 0.22s both' }}>Мы строим среду,</span>
        <span style={{ display: 'block', color: 'var(--accent)', animation: 'fadeUp 0.6s ease 0.3s both' }}>не шаблонного бота</span>
      </h1>

      <p style={{ fontSize: 15, color: '#AAAAAA', maxWidth: 560, lineHeight: 1.82, marginBottom: 48, animation: 'fadeUp 0.6s ease 0.38s both' }}>
        90% автоматизаций не приживаются — шаблонный инструмент не знает, как работает ваш конкретный бизнес.
        Мы сначала документируем процессы, потом строим AI-агентов под них.
        Не наоборот.
      </p>

      {/* Stat strip */}
      <div style={{ display: 'flex', borderTop: '1px solid var(--line2)', borderBottom: '1px solid var(--line2)', width: 'fit-content' }}>
        {STATS.map(([val, label], i) => (
          <div key={i} style={{ padding: '13px 28px', borderRight: i < STATS.length - 1 ? '1px solid var(--line2)' : 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontFamily: bebas, fontSize: 19, letterSpacing: 1, color: 'var(--ink)' }}>{val}</span>
            <span style={{ fontSize: 10, color: '#777', textTransform: 'uppercase', letterSpacing: '2px' }}>{label}</span>
          </div>
        ))}
      </div>

      <style>{`
        .hero-about { padding: 72px 72px 60px; }
        @media (max-width: 720px) {
          .hero-about { padding: 48px 22px 40px; }
        }
      `}</style>
    </section>
  );
}
