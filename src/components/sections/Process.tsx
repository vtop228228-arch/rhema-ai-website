import SectionLabel from '@/components/ui/SectionLabel';

const DAYS = [
  { day: 'День 1', title: 'Картируем процессы', desc: 'Фиксируем, как реально работает бизнес: откуда приходят клиенты, кто за что отвечает, где теряется информация. Это основа — без этого агент будет шаблонным.' },
  { day: 'День 2', title: 'Созвон', desc: 'Разговор 1–2 часа: уточняем детали, слушаем боли. Иногда просим записать голосовое про каждый процесс — лучший способ передать знания от людей агентам.' },
  { day: 'День 3', title: 'Архитектура', desc: 'Строим карту: какие агенты нужны, как взаимодействуют, где нужна память, а где — просто автоматизация кодом. Готовим спецификацию для разработки.' },
  { day: 'День 4', title: 'Момент истины', desc: 'Показываем карту потерь и roadmap: где теряете деньги прямо сейчас, что внедрить первым, сколько это окупится. Вы видите рентген бизнеса.' },
];

const AFTER = [
  { option: 'Внедряем с нами', desc: 'Строим агентов, настраиваем память, выстраиваем оркестрацию. Запуск за 3–6 недель — 87% клиентов выбирают этот путь.' },
  { option: 'Делаете сами', desc: 'Отдаём спецификацию, архитектуру и roadmap — можете реализовать своими силами или с другим подрядчиком.' },
  { option: 'Другой подрядчик', desc: 'Наши материалы — это полная документация: любой разработчик поймёт, что и как строить.' },
  { option: 'Пока ничего', desc: 'Roadmap и карта потерь остаются у вас — вернётесь, когда будет готовы.' },
];

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

          {/* Часть 1: По дням */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <SectionLabel>Процесс</SectionLabel>
              <h2 className="font-bebas text-ink" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '0.03em' }}>
                Как это работает
              </h2>
            </div>

            <div className="process-days-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {DAYS.map((d, i) => (
                <div key={i} style={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: 3,
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  position: 'relative',
                }}>
                  {/* Номер дня */}
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    fontSize: 24,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    opacity: 0.3,
                  }}>
                    {i + 1}
                  </div>

                  {/* Содержимое */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {d.day}
                    </div>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                      {d.title}
                    </h4>
                  </div>

                  <p style={{ fontSize: 14, color: 'var(--sub2)', lineHeight: 1.5, margin: 0 }}>
                    {d.desc}
                  </p>

                  {/* Коннектор */}
                  {i < DAYS.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      right: -8,
                      top: '50%',
                      width: 16,
                      height: 1,
                      background: 'var(--line)',
                      transform: 'translateY(-50%)',
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Часть 2: После диагностики */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h3 className="font-bebas text-ink" style={{ fontSize: 28, letterSpacing: '0.03em' }}>
                После диагностики — 4 варианта
              </h3>
            </div>

            <div className="process-after-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {AFTER.map((a, i) => (
                <div
                  key={i}
                  style={{
                    background: i === 0 ? 'color-mix(in srgb, var(--accent) 8%, transparent)' : 'var(--card)',
                    border: i === 0 ? '1px solid color-mix(in srgb, var(--accent) 30%, transparent)' : '1px solid var(--line)',
                    borderRadius: 3,
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}>
                    <span style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: i === 0 ? 'var(--accent)' : 'var(--line)',
                      color: i === 0 ? 'var(--bg)' : 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>
                      {i + 1}
                    </span>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                      {a.option}
                    </h4>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--sub2)', lineHeight: 1.5, marginLeft: 44, margin: 0 }}>
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .process-days-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .process-after-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
