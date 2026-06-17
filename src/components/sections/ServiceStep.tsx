'use client';

import { useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';

const STEPS = [
  {
    label: 'ШАГ 1',
    title: 'СТРУКТУРНАЯ ДИАГНОСТИКА',
    subtitle: 'Ваша точка входа — без риска',
    does: [
      'Вскрываем ваш бизнес как хирург',
      'Находим ВСЕ точки потерь (даже те, о которых вы не подозревали)',
      'Смотрим, где AI/автоматизация реально окупится, а где — просто модная трата денег',
      'Считаем цену каждой проблемы в рублях',
    ],
    gets: [
      'Рентген-карта вашего бизнеса (видно все процессы и потери)',
      'Список проблем со стоимостью',
      'Roadmap решений с ROI (что внедрять в первую очередь и сколько это принесёт)',
      'Защита от ошибки «сделать не то» (90% клиентов меняют первичное ТЗ после диагностики)',
    ],
    term: '3 дня',
    guarantee: 'не найдём проблем — вернём деньги (за 53 диагностики такого не было)',
    btns: [
      { label: 'Заказать диагностику', href: '#contact', variant: 'blue' as const },
      { label: 'Как это работает', href: '#process', variant: 'dim' as const },
    ],
  },
  {
    label: 'ШАГ 2',
    title: 'ВНЕДРЕНИЕ РЕШЕНИЙ (опционально)',
    subtitle: '87% клиентов заказывают после диагностики',
    intro: ['После диагностики мы ЗНАЕМ:', '• Что вам реально нужно', '• Какой ROI ожидать', '• С чего начать'],
    note: 'Не всем нужен AI — и это нормально.',
    does: [
      'AI-системы (если реально окупятся)',
      'Автоматизация без AI (иногда это лучше и дешевле)',
      'Дашборды и аналитика (видеть цифры в реальном времени)',
      'Простые IT-решения (если хайп не нужен)',
    ],
    accent: 'Мы не впариваем AI всем подряд.\nГлавное — решить вашу проблему, а не продать «модную штуку».',
    term: 'от 5 дней',
    price: 'рассчитываем после диагностики (потому что уже знаем ваш кейс)',
    footnote: 'Стоимость диагностики вычитается из стоимости внедрения.',
    btns: [
      { label: 'Заказать диагностику', href: '#contact', variant: 'blue' as const },
    ],
  },
];

export default function ServiceStep() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          <SectionLabel>Мы делаем так:</SectionLabel>

          {/* Переключатель шагов */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 16,
                  fontWeight: 700,
                  color: active === i ? 'var(--accent)' : 'var(--sub)',
                  textDecoration: active === i ? 'underline' : 'none',
                  textUnderlineOffset: 4,
                  padding: 0,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Контент */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <h2 className="font-bebas text-ink" style={{ fontSize: 32, letterSpacing: '0.03em', margin: '0 0 4px' }}>
                  {step.title}
                </h2>
                <p style={{ fontSize: 14, color: 'var(--sub)', margin: 0 }}>{step.subtitle}</p>
              </div>

              <div style={{ height: 1, background: 'var(--line)' }} />

              {'intro' in step && step.intro && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {step.intro.map((line, i) => (
                    <p key={i} style={{ fontSize: 14, color: 'var(--sub2)', margin: 0 }}>{line}</p>
                  ))}
                </div>
              )}

              {'note' in step && step.note && (
                <p style={{ fontSize: 14, color: 'var(--sub2)', margin: 0 }}>{step.note}</p>
              )}

              {'does' in step && active === 0 && (
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', margin: '0 0 10px' }}>Что делаем:</p>
                  {step.does.map((d, i) => (
                    <p key={i} style={{ fontSize: 14, color: 'var(--sub2)', margin: '0 0 6px' }}>{d}</p>
                  ))}
                </div>
              )}

              {'gets' in step && step.gets && (
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', margin: '0 0 10px' }}>Что получаете:</p>
                  {step.gets.map((g, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 14, color: 'var(--ink)' }}>{g}</span>
                    </div>
                  ))}
                </div>
              )}

              {active === 1 && (
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', margin: '0 0 10px' }}>Мы делаем то, что работает:</p>
                  {step.does.map((d, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 14, color: 'var(--ink)' }}>{d}</span>
                    </div>
                  ))}
                </div>
              )}

              {'accent' in step && step.accent && (
                <p style={{ fontSize: 14, color: 'var(--accent)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                  {step.accent}
                </p>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                <p style={{ fontSize: 13, margin: 0 }}>
                  <strong style={{ color: 'var(--ink)' }}>Срок:</strong>{' '}
                  <span style={{ color: 'var(--sub2)' }}>{step.term}</span>
                </p>
                {'price' in step && step.price && (
                  <p style={{ fontSize: 13, margin: 0 }}>
                    <strong style={{ color: 'var(--ink)' }}>Цена:</strong>{' '}
                    <span style={{ color: 'var(--sub2)' }}>{step.price}</span>
                  </p>
                )}
                {'footnote' in step && step.footnote && (
                  <p style={{ fontSize: 13, color: 'var(--sub)', margin: 0 }}>{step.footnote}</p>
                )}
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                {step.btns.map((btn, i) => (
                  <Button key={i} href={btn.href} variant={btn.variant} size="md">{btn.label}</Button>
                ))}
              </div>
            </div>

            {/* Иллюстрация */}
            <div style={{
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: 0,
              aspectRatio: '3/4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}>
              {active === 0 ? (
                <svg viewBox="0 0 300 400" width="70%" height="70%" style={{ opacity: 0.12 }}>
                  <g stroke="var(--accent)" strokeWidth="1.5" fill="none">
                    <circle cx="150" cy="120" r="70" />
                    <circle cx="150" cy="100" r="35" />
                    <rect x="110" y="160" width="80" height="20" />
                    <circle cx="120" cy="90" r="8" fill="var(--accent)" opacity="0.4" />
                    <circle cx="180" cy="90" r="8" fill="var(--accent)" opacity="0.4" />
                    <circle cx="150" cy="280" r="4" fill="var(--accent)" />
                    <line x1="150" y1="190" x2="150" y2="280" />
                  </g>
                </svg>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: 0.15 }}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <p key={i} style={{ fontSize: 10, color: 'var(--accent)', margin: 0, letterSpacing: 3, fontFamily: 'monospace' }}>
                      {['API', 'AI', 'CRM', 'RAG', 'BOT', 'SQL'][i % 6]} 01 11 00
                    </p>
                  ))}
                </div>
              )}
              <div style={{ position: 'absolute', top: 0, right: 0, width: 3, height: 60, background: 'var(--accent)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
