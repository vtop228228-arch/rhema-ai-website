'use client';

import { useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';

const CASES = [
  {
    title: 'Сеть автосервисов (3 точки)',
    thought: '«Нам нужен сайт для записи клиентов»',
    diagnosis: [
      'Сайт не нужен (звонят и так)',
      'Реальная проблема — нет аналитики по точкам',
      'Одна точка убыточна, но владелец не знал',
      'Мастера распределены неэффективно',
    ],
    solution: 'Вместо сайта → создали BI-дашборд за 5 дней',
    results: [
      '+18% чистой прибыли',
      'Закрыли убыточную точку',
      'Перераспределили мастеров',
      'Экономия 32 часа/мес на отчётах',
    ],
    roi: 'ROI диагностики: 3x за месяц',
  },
  {
    title: 'Онлайн-школа',
    thought: '«Нужно больше рекламы. Проблема — в маркетинге»',
    diagnosis: [
      'Проблема не в трафике',
      '40% учеников не доходят до конца курса',
      'Платформа неудобная — падает досматриваемость',
      'Потери: 6.3 млн ₽/год из-за недосмотров',
      'Клиентка собиралась вложить 500k в рекламу (что ухудшило бы ситуацию)',
    ],
    solution: 'Переделали платформу добавив геймификацию и систему напоминаний',
    results: [
      'Досматриваемость выросла с 60% → 82%',
      'Доп. выручка: +2.1 млн ₽/год',
      'NPS вырос с 35 → 68',
      'Рефералов стало в 2.3 раза больше',
    ],
    roi: 'ROI диагностики: 42× за год',
  },
  {
    title: 'Оптовая торговля',
    thought: '«Менеджеры теряют заявки. Нужна нормальная CRM»',
    diagnosis: [
      'Менеджеры работают нормально',
      'Реальная проблема — склад. Из-за хаоса срываются сроки',
      'Клиенты уходят, менеджеры выгорают',
      'CRM не решит проблему → нужна автоматизация складского учёта',
      '23% заказов доставляются с опозданием, потери: ~3.2 млн ₽/год',
    ],
    solution: 'Автоматизировали склад и интегрировали учётную систему',
    results: [
      'Срывы сократились с 23% → 4%',
      'Вернувшиеся клиенты: +1.8 млн ₽/год',
      'NPS вырос с 42 → 71',
      'Текучка менеджеров снизилась вдвое',
    ],
    roi: 'ROI диагностики: 3x за месяц',
  },
];

export default function Cases() {
  const [active, setActive] = useState(0);
  const c = CASES[active];

  return (
    <section className="section" id="cases">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          <SectionLabel>Примеры диагностики — как находим реальную проблему:</SectionLabel>

          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32 }}>

            {/* Левая колонка — названия кейсов */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {CASES.map((cas, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid var(--line)',
                    padding: '16px 0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: 14,
                    color: active === i ? 'var(--ink)' : 'var(--sub)',
                    fontWeight: active === i ? 600 : 400,
                    borderLeft: active === i ? '2px solid var(--accent)' : '2px solid transparent',
                    paddingLeft: active === i ? 12 : 0,
                    transition: 'all 0.2s',
                  }}
                >
                  {cas.title}
                </button>
              ))}
            </div>

            {/* Правая колонка — детали кейса */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Верхние два блока */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {/* Что думал */}
                <div style={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: 3,
                  padding: 20,
                }}>
                  <p style={{ fontSize: 12, color: 'var(--sub)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px', fontWeight: 700 }}>
                    Что думал клиент:
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--ink)', margin: 0, lineHeight: 1.5 }}>
                    {c.thought}
                  </p>
                </div>

                {/* Что показала */}
                <div style={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: 3,
                  padding: 20,
                }}>
                  <p style={{ fontSize: 12, color: 'var(--sub)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px', fontWeight: 700 }}>
                    Что показала диагностика:
                  </p>
                  {c.diagnosis.map((d, i) => (
                    <p key={i} style={{ fontSize: 13, color: 'var(--sub2)', margin: '0 0 4px' }}>• {d}</p>
                  ))}
                </div>
              </div>

              {/* Нижние два блока */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {/* Что сделали */}
                <div style={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: 3,
                  padding: 20,
                }}>
                  <p style={{ fontSize: 12, color: 'var(--sub)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px', fontWeight: 700 }}>
                    Что мы сделали:
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--ink)', margin: 0 }}>{c.solution}</p>
                </div>

                {/* Результат */}
                <div style={{
                  background: 'var(--card)',
                  border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
                  borderRadius: 3,
                  padding: 20,
                }}>
                  <p style={{ fontSize: 12, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px', fontWeight: 700 }}>
                    Результат через месяц:
                  </p>
                  {c.results.map((r, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                      <span style={{ color: 'var(--accent)', fontSize: 12, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 13, color: 'var(--ink)' }}>{r}</span>
                    </div>
                  ))}
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', margin: '12px 0 0' }}>{c.roi}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
