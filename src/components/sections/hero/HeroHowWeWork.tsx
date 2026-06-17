const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

const META = [
  ['3 дня', 'Срок'],
  ['Гарантия', 'Результата'],
];

export default function HeroHowWeWork() {
  return (
    <section
      className="hero-hww"
      style={{ padding: '72px 72px 60px', borderBottom: '1px solid var(--line2)' }}
    >
      <div className="eyebrow" style={{ marginBottom: 22, animation: 'fadeUp 0.5s ease 0.05s both' }}>
        <div className="bar" />
        <span className="text">Как мы работаем</span>
      </div>

      <h1 style={{ fontFamily: bebas, fontSize: 'clamp(44px, 5.2vw, 76px)', lineHeight: 0.92, letterSpacing: '1.5px', marginBottom: 28 }}>
        <span style={{ display: 'block', color: 'var(--ink)', animation: 'fadeUp 0.6s ease 0.15s both' }}>Ваш бизнес теряет</span>
        <span style={{ display: 'block', color: 'var(--accent)', animation: 'fadeUp 0.6s ease 0.25s both' }}>20–40% прибыли.</span>
        <span style={{ display: 'block', color: '#666', fontSize: '0.48em', letterSpacing: '4px', marginTop: 8, animation: 'fadeUp 0.6s ease 0.35s both' }}>НО ВЫ НЕ ВИДИТЕ ГДЕ</span>
      </h1>

      <p style={{ fontSize: 15, color: '#AAAAAA', maxWidth: 540, lineHeight: 1.82, marginBottom: 36, animation: 'fadeUp 0.6s ease 0.4s both' }}>
        За 3 дня покажем каждую «дыру» в вашем бизнесе и точно скажем, как её закрыть.
        От диагностики до полного решения — под ключ.
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
        <a href="#contact" className="btn btn-blue btn-md">Получить диагностику</a>
        <a href="#process" className="btn btn-line btn-md">Как это работает</a>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .hero-hww { padding: 48px 22px 40px !important; }
        }
      `}</style>
    </section>
  );
}
