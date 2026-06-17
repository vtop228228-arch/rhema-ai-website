import SectionLabel from '@/components/ui/SectionLabel';

const METHOD_CARDS = [
  {
    title: 'Разработка с помощью AI',
    desc: 'Cursor, Claude, собственные агенты — искусственный интеллект генерирует и проверяет код. Это не будущее, это наш ежедневный процесс.',
  },
  {
    title: 'Проверенный стек технологий',
    desc: 'Supabase даёт 70% серверной инфраструктуры из коробки: авторизация, база данных, уведомления, хранилище. Мы не пишем то, что уже написано.',
  },
  {
    title: 'Разбивка на микрозадачи',
    desc: '100+ мелких задач вместо больших блоков. Пока код генерируется — проектируем следующий компонент.',
  },
  {
    title: 'Готовая к работе архитектура',
    desc: 'Безопасность данных, многопользовательность, соответствие 152-ФЗ — с первого дня, а не «потом допилим».',
  },
];

const COMPARE = [
  { label: 'КОМАНДА', trad: '8 специалистов', ours: 'Команда + AI', tradW: 0.7, oursW: 0.3 },
  { label: 'СРОК MVP', trad: '8-12 месяцев', ours: '4-8 недель', tradW: 0.85, oursW: 0.35 },
  { label: 'БЮДЖЕТ', trad: '$200K-$350K', ours: 'В 5-7× меньше', tradW: 0.8, oursW: 0.2 },
  { label: 'КАЧЕСТВО', trad: 'Среднее', ours: 'Высокое', tradW: 0.5, oursW: 0.85 },
];

export default function MethodCards() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

          {/* Блок 1: Традиционно vs Мы */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <SectionLabel>Почему студии так долго и дорого?</SectionLabel>
              <p style={{ fontSize: 14, color: 'var(--sub)', margin: 0 }}>Они работают по старой модели:</p>
            </div>

            <div className="method-compare-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              {/* Традиционно */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  {['Менеджер продаёт', 'Аналитик пишет ТЗ', 'Дизайнер рисует'].map((s, i) => (
                    <span key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, color: 'var(--sub2)' }}>
                      {s} {i < 2 && <span style={{ color: 'var(--sub)' }}>→</span>}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  {['Разработчик кодит', 'Тестировщик проверяет', 'Менеджер согласовывает'].map((s, i) => (
                    <span key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, color: 'var(--sub2)' }}>
                      {s} {i < 2 && <span style={{ color: 'var(--sub)' }}>→</span>}
                    </span>
                  ))}
                </div>
                <div style={{ height: 1, background: 'var(--line)' }} />
                <p style={{ fontSize: 14, color: 'var(--sub2)', margin: 0 }}>8 человек × 8 месяцев = $200-350K</p>
              </div>

              {/* Мы */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  {['Эксперт проектирует', 'AI генерирует код', 'Готовые инструменты дают 70%'].map((s, i) => (
                    <span key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, color: 'var(--ink)' }}>
                      {s} {i < 2 && <span style={{ color: 'var(--accent)' }}>→</span>}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ color: 'var(--accent)' }}>→</span>
                  <span style={{ fontSize: 13, color: 'var(--ink)' }}>Запуск через недели</span>
                </div>
                <div style={{ height: 1, background: 'var(--line)' }} />
                <p style={{ fontSize: 14, color: 'var(--accent)', margin: 0, fontWeight: 600 }}>
                  Компактная команда + AI = быстрее в 5 раз, дешевле в 3-5 раз
                </p>
              </div>
            </div>
          </div>

          {/* Блок 2: Как мы делаем за 6 недель */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionLabel>Как мы делаем за 6 недель то, что другие — за 12 месяцев?</SectionLabel>

            <div className="method-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {METHOD_CARDS.map((card, i) => (
                <div key={i} style={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: 0,
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>{card.title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--sub2)', margin: 0, lineHeight: 1.6 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Блок 3: Сравнительные полосы */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionLabel>Результат тот же. Путь — короче.</SectionLabel>

            <div className="method-compare-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              {COMPARE.map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--sub)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                    {item.label}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {/* Традиционно */}
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: 'var(--sub)', width: 80, flexShrink: 0 }}>Традиционно</span>
                      <div style={{ flex: 1, height: 6, background: 'var(--line)', borderRadius: 0, overflow: 'hidden' }}>
                        <div style={{ width: `${item.tradW * 100}%`, height: '100%', background: 'var(--sub)', borderRadius: 0 }} />
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--sub2)', minWidth: 100, textAlign: 'right' }}>{item.trad}</span>
                    </div>
                    {/* Мы */}
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: 'var(--accent)', width: 80, flexShrink: 0 }}>Мы</span>
                      <div style={{ flex: 1, height: 6, background: 'var(--line)', borderRadius: 0, overflow: 'hidden' }}>
                        <div style={{ width: `${item.oursW * 100}%`, height: '100%', background: 'var(--accent)', borderRadius: 0 }} />
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--ink)', fontWeight: 700, minWidth: 100, textAlign: 'right' }}>{item.ours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .method-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .method-compare-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .method-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
