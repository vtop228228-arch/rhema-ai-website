const ROWS = [
  { criterion: 'Подход', studio: 'Шаблонный', freelancer: 'Ситуативный', diy: 'Самостоятельно', rhema: 'Документируем → Строим' },
  { criterion: 'Сроки', studio: '3–12 месяцев', freelancer: '2–6 месяцев', diy: 'Неограниченно', rhema: '3–6 недель' },
  { criterion: 'Стоимость', studio: 'Высокая', freelancer: 'Средняя', diy: 'Время = деньги', rhema: 'Фиксированная' },
  { criterion: 'ROI до старта', studio: '—', freelancer: '—', diy: '—', rhema: 'Считаем сразу' },
  { criterion: 'AI-память агентов', studio: '—', freelancer: '—', diy: '—', rhema: 'Помнит каждого клиента' },
  { criterion: 'Интеграции', studio: 'Платно', freelancer: 'Редко', diy: '«Разберусь»', rhema: 'Включены' },
  { criterion: 'Поддержка', studio: 'По тарифу', freelancer: 'Недоступен', diy: 'Сами', rhema: '30 дней в цене' },
];

export default function ComparisonTable() {
  return (
    <div className="section-pad" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="section-head">
        <div className="dot" />
        <span className="title">Почему выбирают Rhema AI</span>
        <div className="rule" />
      </div>

      <div style={{ overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 560 }}>
          <thead>
            <tr>
              {['Критерий', 'Веб-студия', 'Фрилансер', 'Сами', 'Rhema AI'].map((h, i) => (
                <th key={h} style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: 11,
                  fontWeight: 700,
                  color: i === 4 ? 'var(--accent)' : '#555',
                  borderBottom: '1px solid var(--line2)',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '14px 16px', color: 'var(--ink2)', fontSize: 13 }}>{row.criterion}</td>
                <td style={{ padding: '14px 16px', color: '#505050' }}>{row.studio}</td>
                <td style={{ padding: '14px 16px', color: '#505050' }}>{row.freelancer}</td>
                <td style={{ padding: '14px 16px', color: '#505050' }}>{row.diy}</td>
                <td style={{ padding: '14px 16px', color: 'var(--ink)', fontWeight: 700 }}>{row.rhema}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
