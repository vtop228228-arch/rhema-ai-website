'use client';

import { useState } from 'react';

const TABS = ['ДИАГНОСТИКА', 'AI-АГЕНТЫ', 'РАЗРАБОТКА ПО', 'SAAS-ПЛАТФОРМЫ'];

const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
      <div style={{ width: 3, height: 3, background: 'var(--accent)', flexShrink: 0, marginTop: 7 }} />
      <span style={{ fontSize: 14, color: 'var(--ink2)' }}>{children}</span>
    </div>
  );
}

function Category({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ background: 'var(--card)', padding: '20px 22px' }}>
      <div style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 10, fontWeight: 700 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((it, i) => <Bullet key={i}>{it}</Bullet>)}
      </div>
    </div>
  );
}

function Meta({ term, price, cta }: { term: string; price: string; cta: string }) {
  return (
    <div style={{ background: 'var(--card2)', padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
      <div style={{ display: 'flex', gap: 32 }}>
        <div>
          <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 2 }}>Срок</div>
          <div style={{ fontFamily: bebas, fontSize: 22, color: 'var(--accent)' }}>{term}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 2 }}>Стоимость</div>
          <div style={{ fontFamily: bebas, fontSize: 22, color: 'var(--accent)' }}>{price}</div>
        </div>
      </div>
      <a href="#contact" style={{ background: 'var(--accent)', color: '#090909', padding: '11px 22px', fontFamily: bebas, fontSize: 15, letterSpacing: '1px' }}>{cta}</a>
    </div>
  );
}

export default function ServicesTabs() {
  const [tab, setTab] = useState(0);
  const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 };

  return (
    <div className="section-pad" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)' }}>
      <div className="section-head">
        <div className="dot" />
        <span className="title">МЫ ДЕЛАЕМ ТАК</span>
        <div className="rule" />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--line2)', marginBottom: 28, overflowX: 'auto' }}>
        {TABS.map((t, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            style={{
              background: 'none', border: 'none', borderBottom: `2px solid ${tab === i ? 'var(--accent)' : 'transparent'}`,
              padding: '11px 22px', fontFamily: bebas, fontSize: 15, letterSpacing: '1.5px',
              color: tab === i ? 'var(--accent)' : '#999', marginBottom: -1, whiteSpace: 'nowrap',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* TAB 0 — Диагностика */}
      {tab === 0 && (
        <div className="svc-grid" style={{ ...grid2, animation: 'fadeUp 0.2s ease' }}>
          <div style={{ background: 'var(--card)', padding: '30px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: bebas, fontSize: 26, color: 'var(--accent)', letterSpacing: '1px', lineHeight: 1.05 }}>ДИАГНОСТИКА<br />БИЗНЕС-ПРОЦЕССОВ</div>
            <p style={{ fontSize: 15, color: 'var(--ink2)', lineHeight: 1.7 }}>90% компаний внедряют AI не там, где нужно. Мы находим точки, где автоматизация принесёт измеримую прибыль — а где не принесёт.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <Bullet>Карта бизнес-процессов с оценкой потенциала</Bullet>
              <Bullet>Расчёт ROI для каждой точки внедрения</Bullet>
              <Bullet>Приоритизированный roadmap автоматизации</Bullet>
              <Bullet>Оценка сроков и бюджета внедрения</Bullet>
            </div>
            <div style={{ display: 'flex', gap: 24, paddingTop: 12, borderTop: '1px solid #161616' }}>
              <div><div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 3 }}>Срок</div><div style={{ fontFamily: bebas, fontSize: 24, color: 'var(--accent)' }}>3 ДНЯ</div></div>
              <div><div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 3 }}>Стоимость</div><div style={{ fontFamily: bebas, fontSize: 24, color: 'var(--accent)' }}>БЕСПЛАТНО</div></div>
            </div>
          </div>
          <div style={{ background: 'var(--card2)', padding: '30px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 11, color: '#888', letterSpacing: '2px', textTransform: 'uppercase', marginTop: 4 }}>Каждый клиент получает</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['Детальную карту потерь в ₽ и часах', 'Список приоритетных точек автоматизации', 'Предварительный план внедрения с ROI'].map((t, i) => (
                <div key={i} style={{ background: 'rgba(19,19,19,0.88)', padding: '10px 13px', fontSize: 13, color: 'var(--ink2)' }}>{t}</div>
              ))}
            </div>
            <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent)', color: '#090909', padding: '12px 20px', fontFamily: bebas, fontSize: 15, letterSpacing: '1px', marginTop: 'auto' }}>ЗАКАЗАТЬ ДИАГНОСТИКУ</a>
          </div>
        </div>
      )}

      {/* TAB 1 — AI-агенты */}
      {tab === 1 && (
        <div style={{ animation: 'fadeUp 0.2s ease', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div className="svc-grid" style={grid2}>
            <Category title="Для продаж" items={['Нейропродажник — первый контакт, квалификация, передача в CRM', 'AI-обработка заявок — мгновенные ответы 24/7', 'WhatsApp/Telegram агент — автоматизация переписки', 'AI-автодозвон — массовый обзвон с квалификацией']} />
            <Category title="Для поддержки" items={['FAQ-бот 24/7 — ответы без участия человека', 'Сервис-деск триаж — маршрутизация обращений', 'Анти-No-Show — напоминания о записях']} />
          </div>
          <div className="svc-grid" style={grid2}>
            <Category title="Для аналитики" items={['AI-аналитик звонков — проверка 100% разговоров', 'BI-дашборд с AI — визуализация + рекомендации', 'Предиктивная аналитика — прогнозы и тренды']} />
            <Category title="Для HR" items={['AI HR-скрининг — первичное интервьюирование', 'Онбординг-агент — адаптация новичков']} />
          </div>
          <Meta term="5–14 ДНЕЙ" price="ОТ 30 000 ₽" cta="ПОСМОТРЕТЬ КАТАЛОГ" />
        </div>
      )}

      {/* TAB 2 — Разработка ПО */}
      {tab === 2 && (
        <div style={{ animation: 'fadeUp 0.2s ease', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div className="svc-grid" style={grid2}>
            <Category title="Веб-приложения" items={['Дашборды и админ-панели', 'Личные кабинеты', 'CRM-интерфейсы']} />
            <Category title="Мобильная разработка" items={['PWA-приложения', 'Mini app Telegram', 'Нативные приложения']} />
          </div>
          <div className="svc-grid" style={grid2}>
            <Category title="Интеграции" items={['AmoCRM, Bitrix24, 1С', 'Телефония, платёжные системы', 'Любые API']} />
            <Category title="BI-аналитика" items={['Realtime-дашборды', 'Автоматические отчёты', 'Экспорт в Excel/PDF']} />
          </div>
          <Meta term="ОТ 7 ДНЕЙ" price="ОТ 90 000 ₽" cta="ОБСУДИТЬ ПРОЕКТ" />
        </div>
      )}

      {/* TAB 3 — SaaS */}
      {tab === 3 && (
        <div className="svc-grid" style={{ ...grid2, animation: 'fadeUp 0.2s ease' }}>
          <div style={{ background: 'var(--card)', padding: '30px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: bebas, fontSize: 26, color: 'var(--accent)', letterSpacing: '1px', lineHeight: 1.05 }}>SAAS-ПЛАТФОРМЫ</div>
            <p style={{ fontSize: 15, color: 'var(--ink2)', lineHeight: 1.7 }}>Для компаний, которые хотят масштабировать AI на всю организацию или монетизировать решение.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,106,0,0.08)', borderLeft: '2px solid var(--accent)' }}><span style={{ fontFamily: bebas, fontSize: 12, color: 'var(--accent)', letterSpacing: '1px' }}>DISCOVERY</span><span style={{ fontSize: 11, color: '#777' }}>1–2 недели</span></div>
              {[['POC', '3–6 недель'], ['PILOT', '1–2 месяца'], ['SCALE', '2–3 месяца']].map(([s, t], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(17,17,17,0.88)' }}><span style={{ fontFamily: bebas, fontSize: 13, color: '#999', letterSpacing: '1px' }}>{s}</span><span style={{ fontSize: 12, color: '#888' }}>{t}</span></div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 24, paddingTop: 12, borderTop: '1px solid #161616' }}>
              <div><div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 2 }}>Срок</div><div style={{ fontFamily: bebas, fontSize: 24, color: 'var(--accent)' }}>ОТ 4 НЕДЕЛЬ</div></div>
              <div><div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 2 }}>Стоимость</div><div style={{ fontFamily: bebas, fontSize: 24, color: 'var(--accent)' }}>ОТ 250 000 ₽</div></div>
            </div>
          </div>
          <div style={{ background: 'var(--card2)', padding: '30px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 11, color: '#888', letterSpacing: '2px', textTransform: 'uppercase' }}>Что входит в результат</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                ['Архитектура', 'Мультитенантность', 'Защита данных', 'Масштабируемость'],
                ['Бизнес-логика', 'Биллинг', 'Роли', 'White-label'],
                ['Поддержка', '3 мес сопровождения', 'Документация', 'Обучение'],
                ['Безопасность', '152-ФЗ', 'Хэширование', 'Rate limit'],
              ].map(([title, ...rows], i) => (
                <div key={i}>
                  <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>{title}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.7 }}>{rows.map((r, j) => <span key={j}>• {r}<br /></span>)}</div>
                </div>
              ))}
            </div>
            <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent)', color: '#090909', padding: '12px 20px', fontFamily: bebas, fontSize: 15, letterSpacing: '1px', marginTop: 'auto' }}>ОБСУДИТЬ ПРОЕКТ</a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 720px) {
          .svc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
