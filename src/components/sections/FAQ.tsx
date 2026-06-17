'use client';

import { useState } from 'react';

const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

const FAQS = [
  {
    q: 'СКОЛЬКО ЭТО СТОИТ?',
    a: 'Простой AI-бот — от 30 000 ₽, платформа под ключ — от 90 000 ₽. Точную цифру называем после бесплатной диагностики: только тогда понятно, что именно нужно делать и сколько это принесёт.',
  },
  {
    q: 'КАК БЫСТРО ВЫ ЗАПУСКАЕТЕ?',
    a: 'Бота запускаем за 5–14 дней. Полноценную платформу — за 3–6 недель. Дедлайны фиксируем в договоре — не тянем и не переносим.',
  },
  {
    q: 'НАМ НУЖЕН СВОЙ ТЕХНИЧЕСКИЙ СПЕЦИАЛИСТ?',
    a: 'Нет. Мы берём на себя всё: от проектирования до запуска и поддержки. Вам нужен только один человек, который понимает свой бизнес — мы сами разберёмся в остальном.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number>(-1);

  return (
    <div className="section-pad" style={{ borderTop: '1px solid var(--line)', background: 'transparent' }}>
      <div className="section-head" style={{ marginBottom: 48 }}>
        <div className="dot" />
        <span className="title">ЧАСТЫЕ ВОПРОСЫ</span>
        <div className="rule" />
      </div>

      <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
        {/* Аккордеон */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ background: 'var(--card)', cursor: 'pointer' }} onClick={() => setOpen(isOpen ? -1 : i)}>
                <div style={{ padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontFamily: bebas, fontSize: 17, letterSpacing: '1px', color: isOpen ? 'var(--accent)' : 'var(--ink)', lineHeight: 1.2, flex: 1, transition: 'color 0.2s' }}>{f.q}</span>
                  <div style={{ width: 24, height: 24, border: `1px solid ${isOpen ? 'var(--accent)' : '#1E1E1E'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color 0.2s' }}>
                    <span style={{ color: isOpen ? 'var(--accent)' : '#505050', fontSize: 17, lineHeight: 1, fontWeight: 300, userSelect: 'none' }}>{isOpen ? '−' : '+'}</span>
                  </div>
                </div>
                {isOpen && (
                  <div style={{ padding: '0 22px 20px', borderTop: '1px solid var(--line2)', animation: 'fadeUp 0.18s ease' }}>
                    <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.85, paddingTop: 15 }}>{f.a}</p>
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
            <span className="text">Не нашли ответ?</span>
          </div>
          <p style={{ fontFamily: bebas, fontSize: 28, color: 'var(--ink)', lineHeight: 1.0, letterSpacing: '1px' }}>
            СПРОСИТЕ<br /><span style={{ color: 'var(--accent)' }}>НАПРЯМУЮ</span>
          </p>
          <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.75, maxWidth: 280 }}>Ответим в течение рабочего дня — в Telegram или по телефону.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="#contact" style={{ background: 'var(--accent)', color: '#090909', padding: '12px 20px', fontFamily: bebas, fontSize: 15, letterSpacing: '1px', width: 'fit-content' }}>НАПИСАТЬ НАМ →</a>
            <span style={{ fontSize: 11, color: '#888' }}>Бесплатно · без обязательств</span>
          </div>
          <div style={{ borderTop: '1px solid var(--line2)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['10 клиентов уже работают с нами', 'Средний ROI — 1–2 месяца', 'Бесплатная диагностика за 2 минуты'].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
                <div style={{ width: 3, height: 3, background: 'var(--accent)', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--ink2)' }}>{t}</span>
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
