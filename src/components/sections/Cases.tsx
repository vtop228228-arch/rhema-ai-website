'use client';

import { useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';

// ⚠️ ВРЕМЕННЫЕ цифры в полях results/roi — это проекты Rhema AI в работе.
// Описание проектов и боли — реальные. Метрики результата — ориентировочные,
// ЗАМЕНИТЬ на реальные после завершения внедрений. См. поле `provisional: true`.
const CASES = [
  {
    title: 'JARVIS — SaaS аналитики продаж',
    thought: '«Чтобы вырасти, надо нанять РОПа и ещё менеджеров»',
    diagnosis: [
      'Проблема не в количестве людей',
      'Лиды теряются между мессенджерами и таблицами',
      'Нет аналитики воронки — решения на интуиции',
      'Не видно, на каком этапе застревают сделки',
    ],
    solution: 'Внедрили JARVIS — SaaS-платформу управления продажами: real-time дашборды, AI-скоринг лидов, единая воронка (33 Edge Functions, Next.js 15 + Supabase)',
    results: [
      'Все лиды в одной системе — 0 потерь',
      'Видимость воронки в реальном времени',
      'AI-приоритизация горячих сделок',
      '~−20 часов/мес на ручных отчётах',
    ],
    roi: 'ROI: ориентир 3–5x в первый квартал',
    provisional: true,
  },
  {
    title: 'ISnail Academy — онлайн-школа + AI-куратор',
    thought: '«Чтобы расти, нужно нанимать ещё живых кураторов»',
    diagnosis: [
      'Живые кураторы = потолок масштабирования',
      '40 мин видео = полдня съёмки + неделя монтажа',
      'Выгорание на постоянном контент-маркетинге',
      'Не выстроена воронка продаж',
    ],
    solution: 'Платформа с AI-куратором «Вика»: RAG по материалам курса, проверка фото-ДЗ, оценочная система, 3 тарифа',
    results: [
      'Масштабирование без найма кураторов',
      '~$100/мес операционных на 50 студентов',
      'Проверка ДЗ и ответы 24/7',
      'Освобождённое время основателя',
    ],
    roi: 'ROI: ориентир — окупаемость на первых студентах',
    provisional: true,
  },
  {
    title: 'SigmaUp — образовательная платформа под ключ',
    thought: '«Своя платформа — это полгода и миллионы»',
    diagnosis: [
      'Агентства: 2–4 месяца и 500k–3M ₽',
      'Готовые конструкторы не дают нужной гибкости',
      'Нет ЛК, тарифов, аналитики из коробки',
    ],
    solution: 'Построили платформу под ключ за 3 недели: курсы, личный кабинет, отзывы, тарифы, деплой (Next.js 15 + Supabase, Vercel)',
    results: [
      'Запуск за 3 недели вместо 2–4 месяцев',
      'В ~3× дешевле агентства',
      'Платформа задеплоена и работает',
      'Полный контроль над продуктом',
    ],
    roi: 'ROI: ориентир 3x по сравнению с агентством',
    provisional: true,
  },
  {
    title: 'LifesystemA — AI-коуч в Telegram',
    thought: '«Дисциплины хватает на неделю, потом всё бросаю»',
    diagnosis: [
      'Мотивация держится на силе воли',
      'Нет системы: питание, тренировки, план — врозь',
      'Некому контролировать и напоминать',
    ],
    solution: '3 AI-агента в Telegram: питание, тренировки, планировщик — единая система с напоминаниями',
    results: [
      '+3 кг мышц за месяц',
      '0 пропущенных встреч',
      'Привычки держатся на автопилоте',
    ],
    roi: 'Результат клиента за первый месяц',
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
