import Button from '@/components/ui/Button';

export default function HeroHowWeWork() {
  return (
    <section className="section bg-bg" style={{ paddingTop: 160, paddingBottom: 112 }}>
      <div className="container">
        <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 28 }}>

          <h1 className="font-bebas text-ink" style={{ fontSize: 'clamp(42px, 6vw, 68px)', lineHeight: 1.02, letterSpacing: '0.02em' }}>
            Ваш бизнес теряет{' '}
            <span className="text-accent">20-40% прибыли.</span>
            <br />Но вы не видите где.
          </h1>

          <p style={{ fontSize: 17, color: 'var(--sub2)', lineHeight: 1.7 }}>
            За 3 дня покажем каждую «дыру» в вашем бизнесе
            и точно скажем, как её закрыть.
          </p>

          {/* Гарантия */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            padding: '12px 20px',
            background: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: 3,
            borderLeft: '3px solid var(--accent)',
          }}>
            <span style={{ fontSize: 13, color: 'var(--sub2)' }}>
              От <strong style={{ color: 'var(--ink)' }}>30 000 ₽</strong>
              &nbsp;·&nbsp;
              <strong style={{ color: 'var(--ink)' }}>3 дня</strong>
              &nbsp;·&nbsp;
              <strong style={{ color: 'var(--accent)' }}>Гарантия результата</strong>
            </span>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button href="#contact" variant="blue" size="lg">
              Получить диагностику
            </Button>
            <Button href="#process" variant="dim" size="lg">
              Как это работает
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
