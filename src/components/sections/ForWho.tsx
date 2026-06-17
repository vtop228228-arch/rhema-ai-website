'use client';

const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

const CARDS = [
  {
    title: 'МАЛЫЙ БИЗНЕС',
    text: '2–50 сотрудников. Рутина съедает время — хотите автоматизировать и освободить команду для роста.',
    tags: ['Онлайн-школы', 'Агентства', 'Сервисный бизнес'],
  },
  {
    title: 'СРЕДНИЙ БИЗНЕС',
    text: '50–500 сотрудников. Нужны системные AI-решения, которые масштабируются вместе с компанией.',
    tags: ['Торговля, e-commerce', 'Медицина, клиники', 'Строительство'],
  },
  {
    title: 'ПРЕДПРИНИМАТЕЛИ',
    text: 'Хотите понять, где теряете деньги сейчас, и с чего начать автоматизацию с измеримым ROI.',
    tags: ['Первый AI-проект', 'Оценка потенциала', 'Быстрый старт'],
  },
];

export default function ForWho() {
  return (
    <div className="section-pad" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="section-head">
        <div className="dot" />
        <span className="title">ДЛЯ КОГО</span>
        <div className="rule" />
      </div>

      <div className="forwho-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {CARDS.map((c) => (
          <div
            key={c.title}
            style={{ background: 'var(--card)', padding: '30px 26px', display: 'flex', flexDirection: 'column', gap: 11, transition: 'background 0.25s, transform 0.25s' }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = 'rgba(17,17,17,0.88)'; el.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = 'var(--card)'; el.style.transform = 'translateY(0)'; }}
          >
            <div style={{ fontFamily: bebas, fontSize: 18, letterSpacing: '1.5px', color: 'var(--accent)' }}>{c.title}</div>
            <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.75 }}>{c.text}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 3 }}>
              {c.tags.map((t) => (
                <span key={t} style={{ fontSize: 13, color: '#AAAAAA', paddingLeft: 9, borderLeft: '2px solid var(--accent)' }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .forwho-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
