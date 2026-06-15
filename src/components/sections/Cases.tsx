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
