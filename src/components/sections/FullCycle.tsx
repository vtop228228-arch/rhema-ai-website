const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

const STEPS = [
  { n: '01', title: 'ДИАГНОСТИКА', text: 'AI-агент выявляет узкие места и строит карту потерь в ₽ и часах' },
  { n: '02', title: 'ПРОЕКТИРОВАНИЕ', text: 'Разрабатываем архитектуру AI-решений с расчётом ROI под ваш бизнес' },
  { n: '03', title: 'ВНЕДРЕНИЕ ПОД КЛЮЧ', text: 'Строим и запускаем AI-агентов. Интегрируем в ваши процессы за 2–6 недель' },
  { n: '04', title: 'СОПРОВОЖДЕНИЕ', text: 'Мониторинг, обновления и масштабирование — пока агенты растут вместе с бизнесом' },
];

export default function FullCycle() {
  return (
    <div style={{ background: 'transparent', padding: '72px 72px' }} className="fc-pad">
      <div className="fc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 4, height: 4, background: 'var(--accent)' }} />
            <span style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600 }}>Не только диагностика</span>
          </div>
          <h2 style={{ fontFamily: bebas, fontSize: 'clamp(38px, 3.6vw, 58px)', lineHeight: 0.9, color: 'var(--ink)', letterSpacing: '-0.5px' }}>
            <span style={{ display: 'block' }}>ДИАГНОСТИКА</span>
            <span style={{ display: 'block', color: 'var(--accent)' }}>ЭТО ТОЛЬКО</span>
            <span style={{ display: 'block' }}>НАЧАЛО</span>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--ink2)', lineHeight: 1.8, maxWidth: 380 }}>
            Мы не просто показываем, где теряются деньги. Мы строим AI-агентов, которые эти потери устраняют — под ключ, от архитектуры до запуска и поддержки.
          </p>
          <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--accent)', color: '#090909', padding: '13px 22px', fontFamily: bebas, fontSize: 16, letterSpacing: '1.5px', width: 'fit-content' }}>
            ОБСУДИТЬ ПРОЕКТ
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#090909" strokeWidth="1.8" strokeLinecap="square" /></svg>
          </a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                background: 'linear-gradient(145deg, rgba(24,24,24,0.88), rgba(18,18,18,0.88))',
                border: '1px solid var(--line)',
                padding: '20px 24px',
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
              }}
            >
              <div style={{ fontFamily: bebas, fontSize: 28, color: 'var(--accent)', lineHeight: 1, flexShrink: 0, width: 36 }}>{s.n}</div>
              <div>
                <div style={{ fontFamily: bebas, fontSize: 16, color: 'var(--ink)', letterSpacing: '1px', marginBottom: 5 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: 'var(--sub2)', lineHeight: 1.6 }}>{s.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .fc-pad { padding: 48px 22px !important; }
          .fc-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </div>
  );
}
