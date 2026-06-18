'use client';

import { useState } from 'react';

const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

const FAQS = [
  {
    q: 'Чем вы отличаетесь от обычного IT-аутсорса или агентства?',
    a: 'Агентства берут деньги за часы и процессы. Мы — за результат. Фиксированная стоимость, чёткий срок, и мы сами заинтересованы сделать быстро и работающим — иначе нет смысла. Плюс 30 дней поддержки после запуска включены в цену.',
  },
  {
    q: 'Сколько стоит и как быстро окупится?',
    a: 'AI-бот — от 30 000 ₽, платформа под ключ — от 90 000 ₽. Срок — 3–6 недель. ROI считаем конкретно под вашу задачу после диагностики: без понимания процессов любая цифра — это угадывание, а не расчёт.',
  },
  {
    q: 'Нам нужно нанимать своих технических людей?',
    a: 'Нет. Мы забираем всё — от проектирования до деплоя и 30 дней поддержки. От вас нужен один человек, который знает бизнес и может ответить на вопросы. Всё остальное — наша работа.',
  },
  {
    q: 'Мы уже пробовали автоматизацию — не взлетело. Почему у вас будет иначе?',
    a: 'Обычно не взлетает по одной причине: инструмент внедряли без диагностики — просто потому что «все делают». Мы начинаем с карты потерь: сначала находим, где реально теряются деньги, потом предлагаем решение. Не наоборот.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number>(-1);

  return (
    <div className="section-pad" style={{ borderTop: '1px solid var(--line)', background: 'transparent' }}>
      <div className="section-head" style={{ marginBottom: 40 }}>
        <div className="dot" />
        <span className="title">ЧАСТЫЕ ВОПРОСЫ</span>
        <div className="rule" />
      </div>

      <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>

        {/* Аккордеон */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  background: isOpen ? 'rgba(20,20,22,0.98)' : 'var(--card)',
                  borderLeft: `2px solid ${isOpen ? 'var(--accent)' : 'transparent'}`,
                  cursor: 'pointer',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onClick={() => setOpen(isOpen ? -1 : i)}
                onMouseEnter={(e) => {
                  if (!isOpen) (e.currentTarget as HTMLElement).style.borderLeftColor = 'rgba(255,106,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent';
                }}
              >
                <div style={{ padding: '20px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, minHeight: 64 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: isOpen ? 'var(--ink)' : 'var(--ink2)', lineHeight: 1.4, flex: 1, transition: 'color 0.2s' }}>
                    {f.q}
                  </span>
                  <div style={{
                    width: 32, height: 32, flexShrink: 0,
                    background: isOpen ? 'var(--accent)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isOpen ? 'var(--accent)' : '#2A2A2E'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.22s, border-color 0.22s',
                  }}>
                    <span style={{
                      color: isOpen ? '#090909' : '#888',
                      fontSize: 20, lineHeight: 1, fontWeight: 300, userSelect: 'none',
                      display: 'block',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.22s, color 0.22s',
                    }}>+</span>
                  </div>
                </div>
                {isOpen && (
                  <div style={{ padding: '0 22px 22px', borderTop: '1px solid var(--line2)', animation: 'fadeUp 0.2s ease' }}>
                    <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.9, paddingTop: 16 }}>{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sticky CTA */}
        <div className="faq-side" style={{ display: 'flex', flexDirection: 'column', gap: 22, paddingTop: 6, position: 'sticky', top: 72 }}>
          <div className="eyebrow">
            <div className="bar" />
            <span className="text">Остались вопросы?</span>
          </div>
          <p style={{ fontFamily: bebas, fontSize: 32, color: 'var(--ink)', lineHeight: 1.0, letterSpacing: '1px' }}>
            ОТВЕТИМ<br /><span style={{ color: 'var(--accent)' }}>ЗА 1 ДЕНЬ</span>
          </p>
          <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.75, maxWidth: 280 }}>
            Напишите — разберём вашу ситуацию и скажем честно, поможет ли AI и что конкретно стоит делать.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="#contact" className="btn btn-blue btn-md" style={{ width: 'fit-content' }}>
              НАПИСАТЬ НАМ →
            </a>
            <span style={{ fontSize: 11, color: '#555' }}>Бесплатно · без обязательств</span>
          </div>
          <div style={{ borderTop: '1px solid var(--line2)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Средняя окупаемость — 1–2 месяца',
              'Запуск от 5 рабочих дней',
              'Бесплатная диагностика за 2 минуты',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .faq-side { position: static !important; }
        }
      `}</style>
    </div>
  );
}
