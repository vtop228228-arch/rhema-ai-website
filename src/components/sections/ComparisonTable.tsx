import SectionLabel from '@/components/ui/SectionLabel';

const ROWS = [
  { criterion: 'Подход', studio: 'Шаблонный', freelancer: 'Ситуативный', diy: 'Самостоятельно', rhema: 'Под задачу бизнеса' },
  { criterion: 'Сроки', studio: '3–12 месяцев', freelancer: '2–6 месяцев', diy: 'Неограниченно', rhema: '3–6 недель' },
  { criterion: 'Стоимость', studio: 'Высокая', freelancer: 'Средняя', diy: 'Время = деньги', rhema: 'Фикс. стоимость' },
  { criterion: 'ROI до старта', studio: '—', freelancer: '—', diy: '—', rhema: 'Считаем сразу' },
  { criterion: 'Интеграции', studio: 'Платно', freelancer: 'Редко', diy: '«Разберусь»', rhema: 'Включены' },
  { criterion: 'Поддержка', studio: 'По тарифу', freelancer: 'Недоступен', diy: 'Сами', rhema: '30 дней в цене' },
];

export default function ComparisonTable() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SectionLabel>Почему выбирают Rhema AI, а не других</SectionLabel>
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
