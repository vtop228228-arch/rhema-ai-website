import Button from '@/components/ui/Button';
import SectionLabel from '@/components/ui/SectionLabel';

const TRUST = [
  { value: 'Бесплатно', label: 'диагностика' },
  { value: '3 дня', label: 'срок' },
  { value: '100%', label: 'гарантия' },
];

export default function HeroMain() {
  return (
    <section style={{ paddingTop: 160, paddingBottom: 112, background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 72, alignItems: 'center' }}>

          {/* Левая колонка */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <SectionLabel>AI-агентство · Rhema AI</SectionLabel>

            <h1
              className="font-bebas text-ink"
              style={{ fontSize: 'clamp(52px, 6.5vw, 76px)', lineHeight: 1.0, letterSpacing: '0.02em' }}
            >
              ОТ ДИАГНОСТИКИ
              <br />
              <span style={{ color: 'var(--accent)' }}>ДО МАСШТАБИРОВАНИЯ</span>
            </h1>

            <p style={{ fontSize: 17, color: 'var(--sub2)', lineHeight: 1.75, maxWidth: 500 }}>
              Полный цикл AI-автоматизации. Находим точки роста —
              создаём решение — помогаем масштабировать.
              Качество корпоративного уровня за сроки стартапа.
            </p>

            {/* Кнопки */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button href="/how-we-work#contact" variant="blue" size="lg">
                Получить диагностику
              </Button>
              <Button href="/how-we-work" variant="dim" size="lg">
                Как мы работаем
              </Button>
            </div>

            {/* Trust-полоска */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0,
              padding: '16px 20px',
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-sm)',
              borderLeft: '3px solid var(--accent)',
              width: 'fit-content',
            }}>
              {TRUST.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  {i > 0 && (
                    <div style={{ width: 1, height: 28, background: 'var(--line)', margin: '0 20px' }} />
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>{item.value}</span>
                    <span style={{ fontSize: 10, color: 'var(--sub)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Правая колонка — визуал */}
          <div style={{
            background: 'linear-gradient(145deg, #181818, #111111)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            aspectRatio: '4/3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)',
          }}>
            {/* Grid bg */}
            <svg viewBox="0 0 420 315" width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.06 }}>
              <defs>
                <pattern id="g" width="42" height="42" patternUnits="userSpaceOnUse">
                  <path d="M 42 0 L 0 0 0 42" fill="none" stroke="var(--accent)" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="420" height="315" fill="url(#g)" />
            </svg>

            {/* Wireframe рука */}
            <svg viewBox="0 0 280 280" width="65%" height="65%" style={{ opacity: 0.25, position: 'relative', zIndex: 1 }}>
              <g stroke="var(--accent)" strokeWidth="1.2" fill="none">
                <ellipse cx="140" cy="155" rx="52" ry="72" />
                <line x1="140" y1="83" x2="140" y2="30" />
                <line x1="140" y1="30" x2="175" y2="12" />
                <line x1="140" y1="44" x2="180" y2="34" />
                <line x1="140" y1="58" x2="182" y2="57" />
                <line x1="140" y1="72" x2="178" y2="78" />
                <line x1="140" y1="83" x2="105" y2="66" />
                <circle cx="175" cy="12" r="3.5" fill="var(--accent)" />
                <circle cx="180" cy="34" r="3.5" fill="var(--accent)" />
                <circle cx="182" cy="57" r="3.5" fill="var(--accent)" />
                <circle cx="178" cy="78" r="3.5" fill="var(--accent)" />
                <circle cx="105" cy="66" r="3.5" fill="var(--accent)" />
              </g>
            </svg>

            {/* Glow */}
            <div style={{
              position: 'absolute',
              bottom: -40,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 160,
              height: 80,
              background: 'var(--accent)',
              opacity: 0.08,
              borderRadius: '50%',
              filter: 'blur(30px)',
            }} />

            {/* Accent strip top */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '40%',
              height: 2,
              background: 'linear-gradient(90deg, var(--accent), transparent)',
            }} />
          </div>

        </div>
      </div>
    </section>
  );
}
