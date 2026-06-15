import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';

const ITEMS = [
  'Бизнес работает, деньги идут — но вы чувствуете, что можно эффективнее',
  'Слышали про AI, но не понимаете, где конкретно его применить',
  'Подозреваете, что где-то теряете деньги — но не видите где',
  'Хотите автоматизировать — но не знаете, с чего начать',
  'Устали, что все делают всё, и нет чёткой системы',
];

export default function ForWho() {
  return (
    <section className="section-alt">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 72, alignItems: 'center' }}>

          {/* Левая колонка */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <div>
              <SectionLabel>Для кого</SectionLabel>
              <h2 className="font-bebas text-ink" style={{ fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '0.03em', marginTop: 12 }}>
                Наши услуги
              </h2>
            </div>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: 0, listStyle: 'none' }}>
              {ITEMS.map((item, i) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                  padding: '16px 0',
                  borderBottom: i < ITEMS.length - 1 ? '1px solid var(--line)' : 'none',
                }}>
                  <span style={{
                    color: 'var(--accent)',
                    fontSize: 14,
                    lineHeight: '24px',
                    flexShrink: 0,
                    fontWeight: 700,
                    opacity: 0.9,
                  }}>●</span>
                  <span style={{ fontSize: 15, color: 'var(--sub2)', lineHeight: 1.65 }}>{item}</span>
                </li>
              ))}
            </ul>

            <Button href="/how-we-work#contact" variant="blue" size="md">
              Это про меня — хочу диагностику
            </Button>
          </div>

          {/* Правая колонка — wireframe */}
          <div style={{
            background: 'linear-gradient(145deg, #181818, #111111)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            aspectRatio: '3/4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)',
          }}>
            <svg viewBox="0 0 240 320" width="72%" height="72%" style={{ opacity: 0.22 }}>
              <g stroke="var(--accent)" strokeWidth="1.2" fill="none">
                <circle cx="120" cy="72" r="38" />
                <line x1="120" y1="110" x2="120" y2="220" />
                <line x1="120" y1="148" x2="75" y2="188" />
                <line x1="120" y1="148" x2="165" y2="188" />
                <line x1="120" y1="220" x2="86" y2="286" />
                <line x1="120" y1="220" x2="154" y2="286" />
                <circle cx="75" cy="188" r="4" fill="var(--accent)" />
                <circle cx="165" cy="188" r="4" fill="var(--accent)" />
                <circle cx="86" cy="286" r="4" fill="var(--accent)" />
                <circle cx="154" cy="286" r="4" fill="var(--accent)" />
                <circle cx="120" cy="44" r="6" fill="var(--accent)" opacity="0.5" />
              </g>
            </svg>

            <div style={{
              position: 'absolute',
              bottom: -30, left: '50%',
              transform: 'translateX(-50%)',
              width: 120, height: 60,
              background: 'var(--accent)',
              opacity: 0.06,
              borderRadius: '50%',
              filter: 'blur(24px)',
            }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.4 }} />
          </div>

        </div>
      </div>
    </section>
  );
}
