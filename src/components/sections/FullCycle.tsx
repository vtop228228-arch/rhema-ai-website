const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

const STEPS = [
  { n: '01', title: 'ДИАГНОСТИКА', text: 'AI-агент выявляет узкие места и строит карту потерь в ₽ и часах', bg: 'rgba(0,0,0,0.08)' },
  { n: '02', title: 'ПРОЕКТИРОВАНИЕ', text: 'Разрабатываем архитектуру AI-решений с расчётом ROI под ваш бизнес', bg: 'rgba(0,0,0,0.12)' },
  { n: '03', title: 'ВНЕДРЕНИЕ ПОД КЛЮЧ', text: 'Строим и запускаем AI-агентов. Интегрируем в ваши процессы за 2–6 недель', bg: 'rgba(0,0,0,0.17)' },
  { n: '04', title: 'СОПРОВОЖДЕНИЕ', text: 'Мониторинг, обновления и масштабирование — пока агенты растут вместе с бизнесом', bg: 'rgba(0,0,0,0.22)' },
];

export default function FullCycle() {
  return (
    <div style={{ background: 'var(--accent)', padding: '72px 72px' }} className="fc-pad">
      <div className="fc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 4, height: 4, background: '#090909' }} />
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.45)', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600 }}>Не только диагностика</span>
          </div>
          <h2 style={{ fontFamily: bebas, fontSize: 'clamp(38px, 3.6vw, 58px)', lineHeight: 0.9, color: '#090909', letterSpacing: '-0.5px' }}>
            <span style={{ display: 'block' }}>ДИАГНОСТИКА</span>
            <span style={{ display: 'block', opacity: 0.55 }}>ЭТО ТОЛЬКО</span>
            <span style={{ display: 'block' }}>НАЧАЛО</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(0,0,0,0.7)', lineHeight: 1.8, maxWidth: 380 }}>
            Мы не просто показываем, где теряются деньги. Мы строим AI-агентов, которые эти потери устраняют — под ключ, от архитектуры до запуска и поддержки.
          </p>
          <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#090909', color: 'var(--accent)', padding: '13px 22px', fontFamily: bebas, fontSize: 16, letterSpacing: '1.5px', width: 'fit-content' }}>
            ОБСУДИТЬ ПРОЕКТ
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#FF6A00" strokeWidth="1.8" strokeLinecap="square" /></svg>
          </a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {STEPS.map((s) => (
            <div key={s.n} style={{ background: s.bg, padding: '22px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ fontFamily: bebas, fontSize: 28, color: 'rgba(0,0,0,0.25)', lineHeight: 1, flexShrink: 0, width: 36 }}>{s.n}</div>
              <div>
                <div style={{ fontFamily: bebas, fontSize: 16, color: '#090909', letterSpacing: '1px', marginBottom: 5 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.7)', lineHeight: 1.6 }}>{s.text}</div>
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
