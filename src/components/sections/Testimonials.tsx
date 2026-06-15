import SectionLabel from '@/components/ui/SectionLabel';

const REVIEWS = [
  {
    name: 'Алексей К.',
    role: 'Ритейл сеть',
    revenue: '45 млн ₽/год',
    quote: 'Пришёл за сайтом. Ушёл с пониманием, что мне нужна CRM-система. Сэкономил 180k₽ и решил реальную проблему, а не придуманную.',
  },
  {
    name: 'Дмитрий Л.',
    role: 'Оптовая торговля',
    revenue: '120 млн ₽/год',
    quote: 'Я год думал, что проблема в отделе продаж. Диагностика показала — проблема в логистике. Без неё я бы ещё год тратил деньги не на то.',
  },
  {
    name: 'Александр П.',
    role: 'Производство',
    revenue: '80 млн ₽/год',
    quote: 'Я собирался делать сайт за 300k. Диагностика показала, что сайт не нужен — нужна CRM-система. Сэкономили деньги и время.',
  },
];

export default function Testimonials() {
  return (
    <section className="section-alt">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <SectionLabel>Отзывы</SectionLabel>
              <h2 className="font-bebas text-ink" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '0.03em', marginTop: 12 }}>
                Что говорят клиенты
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{
                background: 'linear-gradient(145deg, #181818, #121212)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius)',
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Декоративная полоса сверху */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, var(--accent) 0%, transparent 100%)`,
                  opacity: 0.5,
                }} />

                {/* Кавычка */}
                <div style={{
                  fontSize: 48,
                  lineHeight: 0.8,
                  color: 'var(--accent)',
                  opacity: 0.3,
                  fontFamily: 'Georgia, serif',
                }}>
                  "
                </div>

                {/* Цитата */}
                <p style={{
                  fontSize: 15,
                  color: 'var(--ink)',
                  lineHeight: 1.65,
                  margin: 0,
                  flex: 1,
                }}>
                  {r.quote}
                </p>

                {/* Разделитель */}
                <div style={{ height: 1, background: 'var(--line)' }} />

                {/* Автор */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{r.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--sub)' }}>
                    {r.role} · {r.revenue}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
