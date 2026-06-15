import SectionLabel from '@/components/ui/SectionLabel';

const ROWS = [
  { criterion: 'Понимание AI', studio: 'Подключат ChatGPT', freelancer: 'Скопирует с YouTube', diy: 'Пробы и ошибки', rhema: 'Строим AI-системы' },
  { criterion: 'Сроки', studio: '4-12 месяцев', freelancer: '1-3 месяца', diy: '∞', rhema: '2-8 недель' },
  { criterion: 'Стоимость', studio: '500K-3МР', freelancer: '100-300КР', diy: 'Время = деньги', rhema: '100-500КР' },
  { criterion: 'Качество', studio: 'Среднее', freelancer: 'Лотерея', diy: 'Низкое', rhema: 'Корпоративное' },
  { criterion: 'Интеграции', studio: 'За доп. плату', freelancer: '«Не умею»', diy: '«Разберусь»', rhema: 'Включены' },
  { criterion: 'Поддержка', studio: 'Почасовая', freelancer: 'Пропал', diy: 'Вы сами', rhema: '30 дней бесплатно' },
];

export default function ComparisonTable() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionLabel>Представьте: через 2 недели ваш бизнес работает по-другому</SectionLabel>
            <p style={{ fontSize: 14, color: 'var(--sub)', margin: 0 }}>Таблица трансформации</p>
          </div>

          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr>
                  {['Критерий', 'Веб-студия', 'Фрилансер', 'Сами', 'Мы'].map((h) => (
                    <th key={h} style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--accent)',
                      borderBottom: '1px solid var(--line)',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '16px', color: 'var(--accent)', fontSize: 14 }}>{row.criterion}</td>
                    <td style={{ padding: '16px', color: 'var(--sub2)' }}>{row.studio}</td>
                    <td style={{ padding: '16px', color: 'var(--sub2)' }}>{row.freelancer}</td>
                    <td style={{ padding: '16px', color: 'var(--sub2)' }}>{row.diy}</td>
                    <td style={{ padding: '16px', color: 'var(--ink)', fontWeight: 700 }}>{row.rhema}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>
  );
}
