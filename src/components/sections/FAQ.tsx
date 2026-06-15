'use client';

import { useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';

const FAQS = [
  {
    q: 'Зачем платить за диагностику если я могу проконсультироваться бесплатно?',
    a: 'Бесплатная консультация даёт поверхностный ответ. Диагностика за 30k за 3 дня вскрывает системные проблемы с расчётами. Потом вы экономите сотни тысяч на неправильных инвестициях.',
  },
  {
    q: 'Что если диагностика ничего не покажет?',
    a: 'За 53 диагностики такого не было. И если вдруг — мы вернём деньги. Гарантия в договоре чёрным по белому.',
  },
  {
    q: 'Обязательно ли внедрять с вами после диагностики?',
    a: 'Нет. 87% клиентов выбирают внедрение с нами, но остальные берут roadmap и делают сами или с другой командой. Roadmap остаётся у вас в любом случае.',
  },
  {
    q: 'Вдруг вы напаете AI ради денег?',
    a: 'Мы не впариваем AI всем подряд. Иногда нужна просто автоматизация, дашборд или реорганизация процессов. AI нужен только когда он даёт ROI.',
  },
  {
    q: 'Сколько времени займёт у меня эта диагностика?',
    a: 'День 2 — созвон 1-2 часа, остальное мы делаем сами. Из вас потребуется данные (которые обычно уже есть в Excel или системе) и час для презентации результатов.',
  },
  {
    q: 'Что нужно предоставить для диагностики?',
    a: 'Зависит от бизнеса. Для ритейла — продажи по дням/товарам, затраты. Для онлайна — метрики платформы, когорты, воронка. Для B2B — историю сделок. Примерно то, что уже есть в вашей системе.',
  },
  {
    q: 'У меня маленький бизнес — это для меня?',
    a: 'Да. Если вы работаете и хотите расти — это для вас. Минимум: 100k выручки/месяц, есть процессы, есть команда или вы сами делаете всё.',
  },
  {
    q: 'Как понять что диагностика была качественной?',
    a: 'Результаты должны быть конкретные: цифры потерь в ₽, карта процессов, список проблем с приоритетом, roadmap с ROI для каждого шага. Если это есть — диагностика была хорошей.',
  },
  {
    q: 'Можно сначала просто созвониться и поговорить?',
    a: 'Конечно. Первый созвон бесплатный — обсудим вашу ситуацию, решим подходит ли вам диагностика. Потом, если да, подписываем договор.',
  },
  {
    q: 'Нет данных — всё только в голове',
    a: 'Частая ситуация. Мы научим вас их собирать. На День 1 обсудим какие данные нужны, потом 2-3 дня вы их собираете, мы анализируем, презентуем результаты на День 4.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-alt">
      <div className="container">
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-bebas text-ink" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '0.03em' }}>
              Часто спрашивают
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {FAQS.map((item, i) => (
              <div key={i} style={{ borderBottom: i === FAQS.length - 1 ? 'none' : '1px solid var(--line)' }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 16,
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--card)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', textAlign: 'left' }}>
                    {item.q}
                  </span>
                  <span style={{
                    fontSize: 20,
                    color: 'var(--accent)',
                    flexShrink: 0,
                    transition: 'transform 0.2s',
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}>
                    ↓
                  </span>
                </button>

                {openIndex === i && (
                  <div style={{
                    padding: '0 20px 20px 20px',
                    color: 'var(--sub2)',
                    fontSize: 14,
                    lineHeight: 1.6,
                    borderTop: '1px solid var(--line)',
                  }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
