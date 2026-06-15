'use client';

import { useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';

const TABS = [
  {
    id: 'diagnostics',
    label: 'ДИАГНОСТИКА',
    content: {
      type: 'diagnostics',
      title: 'ДИАГНОСТИКА БИЗНЕС-ПРОЦЕССОВ',
      subtitle: 'Ваша точка входа — без риска',
      problem: [
        '90% компаний внедряют AI не там, где он нужен.',
        'Покупают модные инструменты, которые не решают реальных проблем.',
      ],
      approach: 'Мы проводим глубокий анализ ваших процессов и находим конкретные точки, где автоматизация принесёт измеримую прибыль — а где не принесёт.',
      gets: [
        'Карта бизнес-процессов с оценкой потенциала',
        'Расчёт ROI для каждой точки внедрения',
        'Приоритизированный roadmap',
        'Оценка сроков и бюджета',
      ],
      term: '3 дня',
      price: 'Бесплатно',
      guarantee: 'не найдём проблем — вернём деньги (за 53 диагностики такого не было)',
      cta: 'Заказать диагностику',
    },
  },
  {
    id: 'agents',
    label: 'AI-АГЕНТЫ',
    content: {
      type: 'agents',
      title: 'AI-АГЕНТЫ ДЛЯ БИЗНЕСА',
      subtitle: 'Не «голые» боты — полноценные системы',
      groups: [
        {
          name: 'Для продаж',
          items: [
            'Нейропродажник — первый контакт, квалификация, передача в CRM',
            'AI-обработка заявок — мгновенные ответы 24/7',
            'WhatsApp/Telegram агент — автоматизация переписки',
            'AI-автодозвон — массовый обзвон с квалификацией',
          ],
        },
        {
          name: 'Для поддержки',
          items: [
            'FAQ-бот 24/7 — ответы без участия человека',
            'Сервис-деск триаж — маршрутизация обращений',
            'Анти-No-Show — напоминания о записях',
          ],
        },
        {
          name: 'Для аналитики:',
          items: [
            'AI-аналитик звонков — проверка 100% разговоров',
            'BI-дашборд с AI — визуализация + рекомендации',
            'Предиктивная аналитика — прогнозы и тренды',
          ],
        },
        {
          name: 'Для HR:',
          items: [
            'AI HR-скрининг — первичное интервьюирование',
            'Онбординг-агент — адаптация новичков',
          ],
        },
      ],
      includes: [
        'Веб-интерфейс для управления',
        'Интеграции с CRM',
        'Дашборд аналитики',
        '30 дней поддержки',
      ],
      term: '5-14 дней',
      price: 'от 60 000 ₽',
      cta: 'Посмотреть каталог',
    },
  },
  {
    id: 'development',
    label: 'РАЗРАБОТКА ПО',
    content: {
      type: 'development',
      title: 'РАЗРАБОТКА ПО ПОД AI',
      subtitle: 'AI-агент без интерфейса — как двигатель без машины.\nРаботает, но пользоваться неудобно.',
      groups: [
        {
          name: 'Веб-приложения',
          items: ['Дашборды и админ-панели', 'Личные кабинеты', 'CRM-интерфейсы'],
        },
        {
          name: 'Мобильная разработка',
          items: ['PWA-приложения', 'Mini app Telegram', 'Нативные приложения'],
        },
        {
          name: 'Интеграции',
          items: ['AmoCRM, Bitrix24, 1С', 'Телефония', 'Платёжные системы', 'Любые API'],
        },
        {
          name: 'BI-аналитика',
          items: ['Realtime-дашборды', 'Автоматические отчёты', 'Экспорт в Excel/PDF'],
        },
      ],
      term: 'от 7 дней',
      price: 'от 150 000 ₽',
      cta: 'Обсудить проект',
    },
  },
  {
    id: 'saas',
    label: 'SAAS-ПЛАТФОРМЫ',
    content: {
      type: 'saas',
      title: 'SAAS-ПЛАТФОРМЫ',
      subtitle: 'Компании, которые хотят масштабировать AI на всю организацию или монетизировать решение.',
      stages: [
        { name: 'Discovery', term: '1-2 недели' },
        { name: 'PoC', term: '3-6 недель' },
        { name: 'Pilot', term: '1-2 месяца' },
        { name: 'Scale', term: '2-3 месяца' },
      ],
      includes: {
        groups: [
          { name: 'Архитектура', items: ['мультитенантность', 'защита данных', 'масштабируемость'] },
          { name: 'Бизнес-логика', items: ['биллинг', 'роли', 'white-label'] },
          { name: 'Поддержка', items: ['3 мес сопровождения', 'документация', 'обучение'] },
          { name: 'Безопасность', items: ['152-ФЗ', 'хэширование', 'rate limit'] },
        ],
        example: 'За 6 недель создали платформу с 33 Edge Functions, 200+ компонентами, интеграцией AmoCRM, двухуровневым AI-анализом. Традиционная оценка: $195K-$335K.',
      },
      term: 'от 4 недель',
      price: 'от 490 000 ₽',
      cta: 'Обсудить проект',
    },
  },
];

export default function ServicesTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  const c = tab.content;

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Метка */}
          <SectionLabel>Мы делаем так:</SectionLabel>

          {/* Табы */}
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--line)' }}>
            {TABS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                style={{
                  padding: '10px 20px',
                  background: 'none',
                  border: 'none',
                  borderBottom: active === i ? '2px solid var(--accent)' : '2px solid transparent',
                  marginBottom: -1,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: active === i ? 'var(--accent)' : 'var(--sub)',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Контент */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'start' }}>

            {/* Левая часть */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <h2 className="font-bebas text-ink" style={{ fontSize: 32, letterSpacing: '0.03em', margin: '0 0 4px' }}>
                  {c.title}
                </h2>
                <p style={{ fontSize: 14, color: 'var(--sub)', margin: 0 }}>{c.subtitle}</p>
              </div>

              <div style={{ height: 1, background: 'var(--line)' }} />

              {/* Диагностика */}
              {'problem' in c && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px' }}>Проблема:</p>
                    {c.problem.map((p, i) => (
                      <p key={i} style={{ fontSize: 14, color: 'var(--sub2)', margin: '0 0 4px' }}>• {p}</p>
                    ))}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', margin: '0 0 8px' }}>Наш подход:</p>
                    <p style={{ fontSize: 14, color: 'var(--sub2)', lineHeight: 1.6, margin: 0 }}>{c.approach}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', margin: '0 0 8px' }}>Что получаете:</p>
                    {c.gets.map((g, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                        <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: 14, color: 'var(--ink)' }}>{g}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI-агенты и Разработка ПО — 2x2 grid карточек */}
              {'groups' in c && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {c.groups.map((g, i) => (
                    <div key={i} style={{
                      background: 'var(--card)',
                      border: '1px solid var(--line)',
                      borderRadius: 3,
                      padding: 16,
                    }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', margin: '0 0 8px' }}>{g.name}</p>
                      {g.items.map((item, j) => (
                        <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                          <span style={{ color: 'var(--accent)', fontSize: 12, flexShrink: 0 }}>✓</span>
                          <span style={{ fontSize: 13, color: 'var(--ink)' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* AI-агенты: "Каждый агент включает:" */}
              {'includes' in c && Array.isArray(c.includes) && (
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', margin: '0 0 10px' }}>Каждый агент включает:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {c.includes.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8 }}>
                        <span style={{ color: 'var(--accent)', fontSize: 12 }}>✓</span>
                        <span style={{ fontSize: 13, color: 'var(--ink)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SaaS — стадии */}
              {'stages' in c && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {c.stages.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: i === 0 ? 'var(--accent)' : 'var(--line)',
                        flexShrink: 0,
                      }} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', minWidth: 80 }}>{s.name}</span>
                      <span style={{ fontSize: 13, color: 'var(--sub)' }}>{s.term}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Срок/цена/гарантия */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                <p style={{ fontSize: 13, margin: 0 }}>
                  <strong style={{ color: 'var(--ink)' }}>СРОК:</strong>{' '}
                  <span style={{ color: 'var(--sub2)' }}>{c.term}</span>
                </p>
                <p style={{ fontSize: 13, margin: 0 }}>
                  <strong style={{ color: 'var(--ink)' }}>СТОИМОСТЬ:</strong>{' '}
                  <span style={{ color: 'var(--sub2)' }}>{c.price}</span>
                </p>
                {'guarantee' in c && (
                  <p style={{ fontSize: 13, margin: 0 }}>
                    <strong style={{ color: 'var(--ink)' }}>ГАРАНТИЯ:</strong>{' '}
                    <span style={{ color: 'var(--sub2)' }}>{c.guarantee}</span>
                  </p>
                )}
              </div>

              <div>
                <Button href="/how-we-work#contact" variant="blue" size="md">{c.cta}</Button>
              </div>
            </div>

            {/* Правая часть — иллюстрация */}
            <div style={{
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: 3,
              aspectRatio: '3/4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* SaaS: блок с инфо */}
              {'stages' in c ? (
                <div style={{ padding: 24, width: '100%' }}>
                  <p style={{ fontSize: 12, color: 'var(--sub)', margin: '0 0 12px' }}>Что входит в результат:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {c.includes.groups.map((g, i) => (
                      <div key={i}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', margin: '0 0 6px' }}>{g.name}</p>
                        {g.items.map((item, j) => (
                          <p key={j} style={{ fontSize: 12, color: 'var(--sub2)', margin: '0 0 2px' }}>• {item}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, padding: 12, background: 'var(--bg)', borderRadius: 3 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', margin: '0 0 6px' }}>Пример: AI Sales Analytics</p>
                    <p style={{ fontSize: 12, color: 'var(--sub2)', margin: 0, lineHeight: 1.5 }}>{c.includes.example}</p>
                  </div>
                </div>
              ) : (
                <svg viewBox="0 0 300 400" width="70%" height="70%" style={{ opacity: 0.12 }}>
                  <g stroke="var(--accent)" strokeWidth="1" fill="none">
                    <circle cx="150" cy="120" r="60" />
                    <circle cx="150" cy="100" r="30" />
                    <line x1="150" y1="180" x2="150" y2="280" />
                    <line x1="150" y1="210" x2="100" y2="250" />
                    <line x1="150" y1="210" x2="200" y2="250" />
                    <circle cx="100" cy="250" r="4" fill="var(--accent)" />
                    <circle cx="200" cy="250" r="4" fill="var(--accent)" />
                    <circle cx="150" cy="280" r="4" fill="var(--accent)" />
                    <circle cx="150" cy="60" r="6" fill="var(--accent)" />
                  </g>
                </svg>
              )}
              <div style={{ position: 'absolute', top: 0, right: 0, width: 3, height: 60, background: 'var(--accent)' }} />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
