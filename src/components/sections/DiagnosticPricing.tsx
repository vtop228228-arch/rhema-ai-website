import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';

const PLANS = [
  {
    name: 'Экспресс',
    subtitle: 'Для быстрой оценки ситуации',
    term: '1 - 2 дня',
    features: [
      'Анализ по вашим материалам',
      '1 созвон (1 час)',
      'Краткий отчёт (10 страниц)',
      'Топ-3 проблемы',
      'Рекомендации',
    ],
    popular: false,
  },
  {
    name: 'Полная',
    subtitle: 'Глубокий анализ всего бизнеса',
    term: '3 - 4 дня',
    features: [
      'Глубинный анализ',
      '2 созвона (2-3 часа)',
      'Детальный отчёт (30-40 стр.)',
      'Карта всех проблем и возможностей',
      'Roadmap решений с ROI',
      'Оценки стоимости + сроков внедрения',
      'Приоритизация действий',
    ],
    popular: true,
  },
  {
    name: 'ENTERPRISE',
    subtitle: 'Для сложных/крупных проектов',
    term: '5 - 7 дней',
    features: [
      'Всё из Полной',
      'Анализ команды и процессов',
      'Финансовое моделирование',
      'Несколько сценариев развития',
      'Презентация для совета директоров',
      '2 недели поддержки после',
    ],
    popular: false,
  },
];

const AFTER = [
  'Стоимость диагностики вычитается из стоимости внедрения',
  'Мы уже знаем вашу ситуацию — работаем быстрее',
  "Риск 'сделать не то' = почти 0",
];

export default function DiagnosticPricing() {
  return (
    <section className="section-alt" id="pricing">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          <SectionLabel>Состав диагностик</SectionLabel>

          {/* 3 карточки */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {PLANS.map((plan, i) => (
              <div key={i} style={{
                background: plan.popular ? 'var(--card)' : 'var(--bg)',
                border: plan.popular ? '1px solid var(--accent)' : '1px solid var(--line)',
                borderRadius: 6,
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}>
                <div>
                  <h3 style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: plan.popular ? 'var(--ink)' : 'var(--sub2)',
                    margin: '0 0 4px',
                  }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--sub)', margin: '0 0 6px' }}>{plan.subtitle}</p>
                  <p style={{ fontSize: 13, color: 'var(--accent)', margin: 0, fontWeight: 600 }}>Срок: {plan.term}</p>
                </div>

                <div style={{ height: 1, background: 'var(--line)' }} />

                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--sub)', fontSize: 12, flexShrink: 0, marginTop: 1 }}>•</span>
                      <span style={{ fontSize: 13, color: plan.popular ? 'var(--ink)' : 'var(--sub2)' }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 'auto' }}>
                  <Button
                    href="#contact"
                    variant={plan.popular ? 'blue' : 'line'}
                    size="md"
                    style={{ width: '100%' }}
                  >
                    Заказать диагностику
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* После диагностики */}
          <div style={{
            background: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: 6,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
              После диагностики при внедрении:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {AFTER.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--accent)' }}>✓</span>
                  <span style={{ fontSize: 14, color: 'var(--sub2)' }}>{a}</span>
                </div>
              ))}
            </div>
            <Button href="#cases" variant="blue" size="md">Посмотреть кейсы</Button>
          </div>

        </div>
      </div>
    </section>
  );
}
