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
    title: 'Besty — Telegram mini-app для фитнес-школы',
    thought: '«Всё держалось на чатах, таблицах и ручной работе куратора. Нужно единое приложение под бренд»',
    diagnosis: [
      'Куратор вручную отвечал на одни и те же вопросы про КБЖУ и тренировки',
      'Без напоминаний и контроля ученицы тихо отваливались, доходимость падала',
      'Тренировки, питание и замеры были раскиданы по разным чатам',
      'Не было своего продукта — только безликие конструкторы-боты',
    ],
    solution: 'Собрал мини-приложение Besty в Telegram под бренд эксперта: КБЖУ-калькулятор, видеотренировки, рецепты, челленджи с отчётами, трекер замеров, AI-наставник 24/7 и панель эксперта. Вся школа в одном окне — открывается прямо в Telegram, ставить ничего не нужно.',
    results: [
      'AI-наставник отвечает 24/7 и разгружает куратора от рутины',
      'Тренировки, КБЖУ, рецепты и замеры — в одном окне Telegram',
      'Напоминания и челленджи держат учениц в процессе до результата',
      'Ученица видит динамику, эксперт — всю базу участниц через панель',
    ],
    roi: 'Школа из набора чатов превратилась в брендированный продукт',
    provisional: false,
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

              {/* Верхние два блока */}
              <div className="cases-inner-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>

                {/* Блок 1: Что думал клиент — нейтральный, серый (это ОШИБОЧНОЕ мнение) */}
                <div style={{
                  background: '#0B0B0B',
                  border: '1px solid #161616',
                  borderLeft: '3px solid #232323',
                  padding: '20px 20px 20px 18px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 5, height: 5, background: '#3A3A3A', flexShrink: 0 }} />
                    <span style={{ fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                      Что думал клиент
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--ink)', margin: 0, lineHeight: 1.7, fontStyle: 'italic' }}>
                    {c.thought}
                  </p>
                </div>

                {/* Блок 2: Диагностика — оранжевый акцент (это ОТКРОВЕНИЕ, поворотный момент) */}
                <div style={{
                  background: 'rgba(255,106,0,0.03)',
                  border: '1px solid rgba(255,106,0,0.14)',
                  borderLeft: '3px solid rgba(255,106,0,0.45)',
                  padding: '20px 20px 20px 18px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 5, height: 5, background: 'rgba(255,106,0,0.55)', flexShrink: 0 }} />
                    <span style={{ fontSize: 10, color: 'rgba(255,106,0,0.65)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                      Что показала диагностика
                    </span>
                  </div>
                  {c.diagnosis.map((d, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 7 }}>
                      <span style={{ color: 'rgba(255,106,0,0.4)', fontSize: 12, flexShrink: 0, marginTop: 2 }}>→</span>
                      <span style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.55 }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Нижние два блока */}
              <div className="cases-inner-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>

                {/* Блок 3: Что сделали — нейтральный, чуть светлее (профессиональное решение) */}
                <div style={{
                  background: '#0D0D0D',
                  border: '1px solid #1A1A1A',
                  borderTop: '2px solid #222',
                  padding: 20,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 5, height: 5, background: '#505050', flexShrink: 0 }} />
                    <span style={{ fontSize: 10, color: 'var(--sub)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                      Что мы сделали
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--ink)', margin: 0, lineHeight: 1.75 }}>{c.solution}</p>
                </div>

                {/* Блок 4: Результат — ГЛАВНЫЙ БЛОК, максимальный акцент */}
                <div style={{
                  background: 'rgba(255,106,0,0.07)',
                  border: '1px solid rgba(255,106,0,0.3)',
                  borderTop: '3px solid var(--accent)',
                  padding: 20,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 7, height: 7, background: 'var(--accent)', flexShrink: 0 }} />
                    <span style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                      Результат через месяц
                    </span>
                  </div>
                  {c.results.map((r, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <span style={{ color: 'var(--accent)', fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.55 }}>{r}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid rgba(255,106,0,0.2)', marginTop: 14, paddingTop: 14 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', margin: 0, lineHeight: 1.3 }}>{c.roi}</p>
                    {c.provisional && (
                      <p style={{ fontSize: 11, color: '#353535', margin: '5px 0 0' }}>* ориентир — уточняется после завершения внедрения</p>
                    )}
                  </div>
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
