import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';

const MYTHS = [
  {
    myth: 'Выручка растёт — значит все ок',
    reality: ['Одна из точек убыточна', 'Маржа просела на 15%', 'Лучший сотрудник «закопан» на худшем участке.', 'Знакомо?'],
  },
  {
    myth: 'AI — это для больших компаний',
    reality: ['Вы тратите 10 часов в неделю на то, что AI сделает за 10 минут', 'Конкуренты уже автоматизировали и обгоняют вас', 'Вы теряете клиентов из-за медленных процессов'],
  },
  {
    myth: 'Мне кажется, проблема в X',
    reality: ['Проблема совсем в другом (Y)', 'Вы год тратите деньги не на то', 'Решаете симптомы, а не причину.', '9 из 10 клиентов меняют первичное ТЗ после нашей диагностики'],
  },
  {
    myth: 'У меня нет данных/аналитики',
    reality: ['Именно поэтому вы принимаете решения вслепую', 'Каждое «интуитивное» решение может стоить 50–200k₽', 'Вы работаете больше, а зарабатываете меньше'],
  },
];

const RESULTS = [
  '200к-500к-миллионы рублей улетают в никуда каждый год',
  'Конкуренты обгоняют, а вы не понимаете почему',
  'Вы работаете 12 часов в день, а бизнес не растёт',
  'Деньги вкладываются не туда, куда нужно',
];

export default function Myths() {
  return (
    <section className="section-alt">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          <div>
            <SectionLabel>Почему предприниматели не видят, где теряют деньги?</SectionLabel>
          </div>

          {/* 4 карточки */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {MYTHS.map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(145deg, rgba(24,24,24,0.88), rgba(18,18,18,0.88))',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius)',
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                boxShadow: 'var(--shadow-card)',
              }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', margin: 0, lineHeight: 1.4 }}>
                  {item.myth}
                </p>
                <div style={{ height: 1, background: 'var(--line)' }} />
                <div>
                  <p style={{ fontSize: 11, color: 'var(--sub)', margin: '0 0 8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>А на самом деле:</p>
                  {item.reality.map((r, j) => (
                    <p key={j} style={{ fontSize: 13, color: 'var(--sub2)', margin: '0 0 4px', lineHeight: 1.5 }}>• {r}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Результат */}
          <div style={{
            background: 'linear-gradient(145deg, #181818, #121212)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius)',
            padding: '32px 36px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            boxShadow: 'var(--shadow-card)',
          }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Результат:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {RESULTS.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--red)', fontSize: 16, flexShrink: 0, marginTop: 1 }}>✕</span>
                  <span style={{ fontSize: 14, color: 'var(--sub2)' }}>{r}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <p style={{ fontSize: 15, color: 'var(--ink)', margin: 0, fontWeight: 500 }}>
                Хватит гадать. Узнайте правду.
              </p>
              <Button href="#contact" variant="blue" size="md">Заказать диагностику</Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
