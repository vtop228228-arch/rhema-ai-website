const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

/* ─────────────────────────────────────────────────────────────────
   Shared mock hero content used in every preview
───────────────────────────────────────────────────────────────── */
function MockBody() {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ width: 36, height: 1, background: 'var(--accent-blue)' }} />
        <span style={{ fontSize: 10, color: 'var(--accent-blue)', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600 }}>
          AI-диагностика бизнеса
        </span>
      </div>
      <p style={{ fontSize: 13, color: '#888', maxWidth: 340, lineHeight: 1.75 }}>
        Задайте 2–3 вопроса о своём бизнесе. AI покажет карту потерь и что внедрить первым.
      </p>
      <div style={{ marginTop: 20 }}>
        <a href="#" className="btn btn-blue btn-md" style={{ pointerEvents: 'none' }}>
          НАЧАТЬ ДИАГНОСТИКУ
        </a>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   OPTION A — Gradient text on H1 accent words
───────────────────────────────────────────────────────────────── */
function OptionA() {
  return (
    <div style={{ background: '#0A0A0B', padding: '48px 52px', position: 'relative', overflow: 'hidden' }}>
      {/* Grid texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,106,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.04) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontFamily: bebas, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.92, letterSpacing: '1.5px', marginBottom: 20, overflowWrap: 'break-word' }}>
          <span style={{ display: 'block', color: '#FFFFFF' }}>ОТ ДИАГНОСТИКИ</span>
          {/* Gradient text — оранжевый к янтарному */}
          <span style={{
            display: 'block',
            background: 'linear-gradient(135deg, #FF8A00 0%, #FF6A00 45%, #FFB347 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            ДО МАСШТАБИРОВАНИЯ
          </span>
          <span style={{ display: 'block', color: '#555', fontSize: '0.42em', letterSpacing: '5px', marginTop: 10 }}>
            ЗА 2 МИНУТЫ — БЕСПЛАТНО
          </span>
        </h2>
        <MockBody />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   OPTION B — Blue ambient glow in hero background
───────────────────────────────────────────────────────────────── */
function OptionB() {
  return (
    <div style={{ background: '#0A0A0B', padding: '48px 52px', position: 'relative', overflow: 'hidden' }}>
      {/* Grid texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,106,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.04) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
      {/* Blue ambient glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '65%', height: '85%',
        background: 'radial-gradient(ellipse at 75% 20%, rgba(77,159,255,0.10) 0%, rgba(77,159,255,0.03) 45%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 25% 55%, transparent 40%, #0A0A0B 82%)' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontFamily: bebas, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.92, letterSpacing: '1.5px', marginBottom: 20, overflowWrap: 'break-word' }}>
          <span style={{ display: 'block', color: '#FFFFFF' }}>ОТ ДИАГНОСТИКИ</span>
          <span style={{ display: 'block', color: 'var(--accent)' }}>ДО МАСШТАБИРОВАНИЯ</span>
          <span style={{ display: 'block', color: '#555', fontSize: '0.42em', letterSpacing: '5px', marginTop: 10 }}>
            ЗА 2 МИНУТЫ — БЕСПЛАТНО
          </span>
        </h2>
        <MockBody />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   OPTION C — Gradient section dividers
───────────────────────────────────────────────────────────────── */
function GradientDivider() {
  return (
    <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(77,159,255,0.5) 30%, rgba(255,106,0,0.3) 65%, transparent 100%)' }} />
  );
}

function OptionC() {
  return (
    <div style={{ background: '#0A0A0B' }}>
      {/* Mock section 1 */}
      <div style={{ padding: '36px 52px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 20 }}>
          <div style={{ width: 4, height: 4, background: 'var(--accent-blue)', flexShrink: 0 }} />
          <span style={{ fontFamily: bebas, fontSize: 28, letterSpacing: '2px', color: '#FFF' }}>ЧТО МЫ ДЕЛАЕМ</span>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {['Диагностика', 'AI-агенты', 'Разработка'].map((t, i) => (
            <div key={i} style={{ background: 'var(--card)', padding: '20px 18px', fontSize: 14, color: '#C0BBB2' }}>{t}</div>
          ))}
        </div>
      </div>

      <GradientDivider />

      {/* Mock section 2 */}
      <div style={{ padding: '36px 52px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 20 }}>
          <div style={{ width: 4, height: 4, background: 'var(--accent-blue)', flexShrink: 0 }} />
          <span style={{ fontFamily: bebas, fontSize: 28, letterSpacing: '2px', color: '#FFF' }}>РЕЗУЛЬТАТЫ</span>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {['3 нед', '0', '3×'].map((t, i) => (
            <div key={i} style={{ background: 'var(--card)', padding: '20px 18px' }}>
              <div style={{ fontFamily: bebas, fontSize: 38, color: 'var(--accent)', lineHeight: 1 }}>{t}</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>метрика</div>
            </div>
          ))}
        </div>
      </div>

      <GradientDivider />

      {/* Mock section 3 */}
      <div style={{ padding: '32px 52px' }}>
        <p style={{ fontSize: 13, color: '#555', textAlign: 'center' }}>↑ Gradient-разделители между секциями</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   OPTION D — Combo: Blue glow + Gradient dividers
───────────────────────────────────────────────────────────────── */
function OptionD() {
  return (
    <div style={{ background: '#0A0A0B' }}>
      {/* Hero с blue glow */}
      <div style={{ padding: '48px 52px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,106,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.04) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '65%', height: '90%',
          background: 'radial-gradient(ellipse at 75% 20%, rgba(77,159,255,0.10) 0%, rgba(77,159,255,0.03) 45%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 25% 55%, transparent 40%, #0A0A0B 82%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: bebas, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.92, letterSpacing: '1.5px', marginBottom: 20, overflowWrap: 'break-word' }}>
            <span style={{ display: 'block', color: '#FFFFFF' }}>ОТ ДИАГНОСТИКИ</span>
            <span style={{ display: 'block',
              background: 'linear-gradient(135deg, #FF8A00 0%, #FF6A00 45%, #FFB347 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>ДО МАСШТАБИРОВАНИЯ</span>
            <span style={{ display: 'block', color: '#555', fontSize: '0.42em', letterSpacing: '5px', marginTop: 10 }}>ЗА 2 МИНУТЫ — БЕСПЛАТНО</span>
          </h2>
          <MockBody />
        </div>
      </div>

      {/* Gradient divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(77,159,255,0.5) 30%, rgba(255,106,0,0.3) 65%, transparent 100%)' }} />

      {/* Mock следующей секции */}
      <div style={{ padding: '36px 52px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 20 }}>
          <div style={{ width: 4, height: 4, background: 'var(--accent-blue)' }} />
          <span style={{ fontFamily: bebas, fontSize: 28, letterSpacing: '2px', color: '#FFF' }}>ЧТО МЫ ДЕЛАЕМ</span>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>
        <p style={{ fontSize: 13, color: '#555' }}>↑ A (gradient text) + B (blue glow) + C (gradient divider) — всё вместе</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────── */
export default function DemoPage() {
  const options = [
    { label: 'A', name: 'Gradient text на H1', desc: 'Акцентное слово «МАСШТАБИРОВАНИЯ» получает оранжево-янтарный градиент', component: <OptionA /> },
    { label: 'B', name: 'Blue ambient glow', desc: 'Очень тихое синее свечение в правом верхнем углу героя — ощущение глубины', component: <OptionB /> },
    { label: 'C', name: 'Gradient-разделители', desc: 'Линии между секциями: прозрачный → синий → оранжевый → прозрачный', component: <OptionC /> },
    { label: 'D', name: 'Комбо A + B + C', desc: 'Все три эффекта одновременно — рекомендованный вариант', component: <OptionD /> },
  ];

  return (
    <div style={{ background: '#0A0A0B', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ padding: '32px 52px 24px', borderBottom: '1px solid #1E1E22' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 36, height: 1, background: 'var(--accent-blue)' }} />
          <span style={{ fontSize: 10, color: 'var(--accent-blue)', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600 }}>
            Визуальные варианты
          </span>
        </div>
        <h1 style={{ fontFamily: bebas, fontSize: 40, color: '#FFF', letterSpacing: '2px', lineHeight: 1 }}>
          ПРЕВЬЮ ЦВЕТОВЫХ ОПЦИЙ
        </h1>
        <p style={{ fontSize: 13, color: '#666', marginTop: 8 }}>
          Выберите понравившийся — скажите букву, применим на весь сайт
        </p>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '2px 0' }}>
        {options.map((opt) => (
          <div key={opt.label}>
            {/* Option label */}
            <div style={{ padding: '18px 52px 14px', background: '#080809', display: 'flex', alignItems: 'baseline', gap: 16, borderBottom: '1px solid #1E1E22' }}>
              <span style={{ fontFamily: bebas, fontSize: 42, color: 'var(--accent)', lineHeight: 1 }}>{opt.label}</span>
              <div>
                <div style={{ fontFamily: bebas, fontSize: 18, color: '#FFF', letterSpacing: '1px' }}>{opt.name}</div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{opt.desc}</div>
              </div>
            </div>
            {/* Preview */}
            <div style={{ border: '1px solid #1E1E22' }}>
              {opt.component}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{ padding: '24px 52px', borderTop: '1px solid #1E1E22' }}>
        <p style={{ fontSize: 12, color: '#444' }}>
          Эта страница только для preview — не деплоится на боевой сайт. Скажите букву или комбинацию → применим.
        </p>
      </div>
    </div>
  );
}
