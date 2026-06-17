const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

const STEPS = [
  { n: '01', title: 'ЗАПУСКАЕТЕ\nДИАГНОСТИКУ', text: 'Кликаете кнопку «Начать диагностику» на сайте.', filled: true },
  { n: '02', title: 'ОТВЕЧАЕТЕ\nНА 2–3 ВОПРОСА', text: 'AI спрашивает о бизнесе, масштабе и главных болях. Просто и коротко.' },
  { n: '03', title: 'ПОЛУЧАЕТЕ\nКАРТУ ПОТЕРЬ', text: 'Карта показывает где теряются деньги в ₽/мес и какие AI-агенты это исправят.' },
  { n: '04', title: 'ВНЕДРЯЕМ\nПОД КЛЮЧ', text: 'Команда Rhema строит AI-агентов под ваш бизнес. Берём весь цикл на себя.' },
];

function Title({ text }: { text: string }) {
  return (
    <div style={{ fontFamily: bebas, fontSize: 17, letterSpacing: '1px', color: 'var(--ink)', lineHeight: 1.2 }}>
      {text.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <div className="section-pad" style={{ background: 'rgba(10,10,10,0.88)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="section-head" style={{ marginBottom: 48 }}>
        <div className="dot" />
        <span className="title">КАК ЭТО РАБОТАЕТ</span>
        <div className="rule" style={{ background: 'var(--line2)' }} />
      </div>

      <div className="how-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', position: 'relative' }}>
        {/* Соединительная линия */}
        <div className="how-line" style={{ position: 'absolute', top: 26, left: 27, right: 27, height: 1, background: 'linear-gradient(90deg, #FF6A00 0%, rgba(255,106,0,0.5) 50%, rgba(255,106,0,0.1) 100%)', pointerEvents: 'none' }} />
        {STEPS.map((s, i) => (
          <div key={s.n} style={{ padding: i === 0 ? '0 26px 0 0' : '0 26px', borderLeft: i === 0 ? 'none' : '1px solid var(--line2)', display: 'flex', flexDirection: 'column', gap: 13, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: -22, right: -8, fontFamily: bebas, fontSize: 104, lineHeight: 1, color: 'rgba(255,106,0,0.055)', pointerEvents: 'none', zIndex: 0, userSelect: 'none', letterSpacing: '-4px' }}>{s.n}</div>
            <div style={{
              width: 52, height: 52,
              background: s.filled ? 'var(--accent)' : 'rgba(255,106,0,0.1)',
              border: s.filled ? 'none' : '1px solid rgba(255,106,0,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, flexShrink: 0,
            }}>
              <span style={{ fontFamily: bebas, fontSize: 22, color: s.filled ? '#090909' : 'var(--accent)' }}>{s.n}</span>
            </div>
            <Title text={s.title} />
            <p style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.65, position: 'relative', zIndex: 1 }}>{s.text}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .how-grid { grid-template-columns: 1fr 1fr !important; gap: 24px; }
          .how-line { display: none; }
          .how-grid > div { border-left: none !important; padding: 0 !important; }
        }
      `}</style>
    </div>
  );
}
