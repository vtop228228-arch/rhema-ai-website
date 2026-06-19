'use client';

import { useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';

// ⚠️ Описание проектов и боли — реальные. Цифры результата помечены `provisional: true`
// ЗАМЕНИТЬ реальными метриками после завершения внедрений.
const CASES = [
  {
    title: 'JARVIS — SaaS аналитики продаж',
    thought: '«Менеджеры работают — почему продажи не растут? Наверное, нужно ещё людей»',
    diagnosis: [
      'Ни один менеджер не знал свою реальную конверсию',
      'Лиды терялись между WhatsApp, почтой и таблицами',
      'Горячий клиент ждал ответа 2–3 дня и уходил к конкурентам',
      'Руководитель принимал решения на ощущениях — данных не было',
    ],
    solution: 'Создали JARVIS — единую платформу: все лиды в одном месте, AI-скоринг показывает кто готов купить прямо сейчас, real-time дашборд даёт полную картину воронки. 3 недели разработки, 33 интеграции.',
    results: [
      '0 потерянных лидов — все каналы в одной системе',
      'Горячие клиенты получают ответ в течение часа',
      'Руководитель видит узкие места воронки в реальном времени',
      '−20 часов/мес на ручные отчёты',
    ],
    roi: 'Ориентир: +3–5x к выручке в первый квартал',
    provisional: true,
  },
  {
    title: 'ISnail Academy — онлайн-школа + AI-куратор',
    thought: '«Поток вырос — не справляемся. Надо нанимать ещё кураторов, иначе качество упадёт»',
    diagnosis: [
      'Каждый живой куратор тянул максимум 20–30 студентов',
      'Проверка домашних заданий занимала 4–6 часов в день',
      'Студенты писали ночью — ответы только утром, мотивация падала',
      'Основатель сам закрывал часть потоков — работал на износ',
    ],
    solution: 'Разработали AI-куратора «Вика» на базе RAG: знает курс досконально, проверяет фото-ДЗ по критериям, отвечает на вопросы 24/7, ведёт оценочную систему. Запущено на 3 тарифах.',
    results: [
      '1 AI-куратор ведёт 50+ студентов одновременно без потери качества',
      'Ответы на любые вопросы — моментально, в любое время суток',
      '~$100/мес операционных вместо ~$800/мес на живых кураторов',
      'Основатель вернул 20+ часов в неделю',
    ],
    roi: 'Окупаемость — на первом же потоке от 100 студентов',
    provisional: true,
  },
  {
    title: 'SigmaUp — образовательная платформа под ключ',
    thought: '«Нужна своя платформа, но агентство просит полгода и 2 миллиона — это нереально»',
    diagnosis: [
      'Готовые конструкторы (GetCourse, Teachable) не давали нужной гибкости',
      'Агентства: 2–4 месяца ожидания, 500к–3М ₽, и всё равно придётся дорабатывать',
      'Без своего ЛК — нет данных о студентах и нет воронки аналитики',
      'Каждое изменение в чужом инструменте = снова платить подрядчику',
    ],
    solution: 'Построили платформу под ключ за 3 недели: курсы, личный кабинет студента, тарифная сетка, аналитика, отзывы, деплой. Стек: Next.js 15 + Supabase + Vercel. Полный контроль кода — без зависимости от вендоров.',
    results: [
      'Запуск через 3 недели — вместо 3–4 месяцев в агентстве',
      'Стоимость разработки в 3× ниже агентской',
      'Платформа работает, продаёт и приносит деньги',
      'Любые доработки — самостоятельно, без доплат подрядчикам',
    ],
    roi: 'Сэкономлено 1.5–2М ₽ по сравнению с агентством',
    provisional: true,
  },
  {
    title: 'LifesystemA — AI-коуч в Telegram',
    thought: '«Знаю что надо делать — питание, тренировки. Но через неделю всё разваливается»',
    diagnosis: [
      'Питание, тренировки, расписание существовали отдельно — системы не было',
      'Мотивация держалась на силе воли: кончилась — всё рухнуло',
      'Платный личный тренер и диетолог — дорого, не у всех есть возможность',
      'Обычные приложения с напоминаниями игнорировались через 3 дня',
    ],
    solution: '3 AI-агента в Telegram: диетолог, тренер, планировщик — единая система. Знают твой прогресс, адаптируют план под результат, напоминают вовремя и не дают соскочить.',
    results: [
      '+3 кг мышечной массы за первый месяц',
      '0 пропущенных тренировок и запланированных встреч',
      'Привычки встроены в режим — работают на автопилоте',
      'Экономия 15–20к ₽/мес по сравнению с живым тренером',
    ],
    roi: 'Результат реального клиента за первый месяц',
    provisional: false,
  },
];

export default function Cases() {
  const [active, setActive] = useState(0);
  const c = CASES[active];

  return (
    <section className="section" id="cases">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          <SectionLabel>Кейсы — проекты Rhema AI</SectionLabel>

          <div className="cases-layout" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32 }}>

            {/* Левая колонка — кейсы-карточки */}
            <div className="cases-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {CASES.map((cas, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`case-btn${isActive ? ' case-btn-active' : ''}`}
                    style={{
                      background: isActive ? 'rgba(255,106,0,0.07)' : 'var(--card)',
                      border: `1px solid ${isActive ? 'rgba(255,106,0,0.45)' : 'var(--line)'}`,
                      borderLeft: `3px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                      padding: '14px 14px 14px 12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      width: '100%',
                      boxShadow: isActive ? '0 0 18px rgba(255,106,0,0.18), inset 0 0 24px rgba(255,106,0,0.04)' : 'none',
                      transition: 'all 0.22s',
                      minHeight: 52,
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-bebas), Bebas Neue, sans-serif',
                      fontSize: 15,
                      color: isActive ? 'var(--accent)' : '#3a3a3a',
                      lineHeight: 1,
                      flexShrink: 0,
                      transition: 'color 0.22s',
                    }}>0{i + 1}</span>
                    <span style={{
                      fontSize: 13,
                      color: isActive ? 'var(--ink)' : '#666',
                      fontWeight: isActive ? 600 : 400,
                      lineHeight: 1.35,
                      flex: 1,
                      transition: 'color 0.22s',
                    }}>{cas.title}</span>
                    <span style={{
                      color: isActive ? 'var(--accent)' : '#2a2a2a',
                      fontSize: 14,
                      flexShrink: 0,
                      transition: 'color 0.22s, transform 0.22s',
                      transform: isActive ? 'translateX(2px)' : 'none',
                    }}>→</span>
                  </button>
                );
              })}
            </div>

            {/* Правая колонка — детали кейса */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Верхние два блока */}
              <div className="cases-inner-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {/* Что думал */}
                <div style={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: 0,
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
                  borderRadius: 0,
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
              <div className="cases-inner-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {/* Что сделали */}
                <div style={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: 0,
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
                  borderRadius: 0,
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

          <style>{`
            .case-btn:hover:not(.case-btn-active) {
              background: rgba(255,106,0,0.03) !important;
              border-color: rgba(255,106,0,0.2) !important;
            }
            .case-btn:hover:not(.case-btn-active) span:last-child {
              color: #555 !important;
            }
            @media (max-width: 720px) {
              .cases-layout { grid-template-columns: 1fr !important; gap: 16px !important; }
              .cases-sidebar { flex-direction: row !important; overflow-x: auto; gap: 6px !important; padding-bottom: 4px; }
              .cases-sidebar::-webkit-scrollbar { height: 2px; }
              .cases-sidebar::-webkit-scrollbar-track { background: var(--bg); }
              .cases-sidebar::-webkit-scrollbar-thumb { background: rgba(255,106,0,0.3); }
              .case-btn { min-width: 130px !important; white-space: normal !important; flex-shrink: 0 !important; flex-direction: column !important; align-items: flex-start !important; padding: 10px 12px !important; min-height: 60px !important; }
              .case-btn span:last-child { display: none !important; }
              .cases-inner-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
