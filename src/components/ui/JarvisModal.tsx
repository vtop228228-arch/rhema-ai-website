'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { ymGoal } from '@/lib/analytics';

const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';
const inter = 'var(--font-inter), Inter, sans-serif';

const FEATURES = [
  'Ежедневный отчёт по воронке — без участия менеджера',
  'Находит узкие места: где и почему клиенты отваливаются',
  'Сигнализирует о падении конверсии раньше, чем это видно в цифрах',
  'Работает с CRM и присылает сводку в Telegram',
];

const schema = z.object({
  name: z.string().min(2, 'Укажите имя'),
  contact: z.string().min(5, 'Укажите телефон или Telegram'),
});

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function JarvisModal({ open, onClose }: Props) {
  const [view, setView] = useState<'info' | 'form'>('info');
  const [form, setForm] = useState({ name: '', contact: '' });
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Сброс при открытии
  useEffect(() => {
    if (open) {
      setView('info');
      setForm({ name: '', contact: '' });
      setConsent(false);
      setErr('');
      setSuccess(false);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) { setErr('Подтвердите согласие на обработку данных'); return; }
    const parsed = schema.safeParse(form);
    if (!parsed.success) { setErr(parsed.error.issues[0]?.message ?? 'Проверьте данные'); return; }
    setErr('');
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: parsed.data.name,
          contact: parsed.data.contact,
          business: 'Заявка через попап JARVIS — «хочу такого же агента»',
          consent: true,
        }),
      });
      if (!res.ok) throw new Error();
      ymGoal('jarvis_lead');
      setSuccess(true);
    } catch {
      setErr('Ошибка отправки. Напишите нам напрямую в Telegram.');
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    background: '#111', border: '1px solid #252525', color: 'var(--ink)',
    padding: '14px 16px', fontSize: 16, fontFamily: inter, width: '100%',
    outline: 'none', transition: 'border-color 0.18s', borderRadius: 0, boxSizing: 'border-box',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 400,
          background: 'rgba(0,0,0,0.82)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          animation: 'jFadeIn 0.18s ease',
        }}
      />

      {/* Panel */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 401,
          background: '#0C0C0C',
          borderTop: '2px solid var(--accent)',
          borderRight: '1px solid rgba(255,106,0,0.2)',
          borderBottom: '1px solid rgba(255,106,0,0.2)',
          borderLeft: '1px solid rgba(255,106,0,0.2)',
          width: 'min(500px, 92vw)',
          maxHeight: '88dvh',
          overflowY: 'auto',
          display: 'flex', flexDirection: 'column',
          animation: 'jSlideUp 0.22s ease',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '22px 24px 18px',
          borderBottom: '1px solid #161616',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 6, height: 6, background: 'var(--accent)' }} />
              <span style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '3px', fontFamily: inter, fontWeight: 700 }}>
                Внутренний AI-агент · Rhema AI
              </span>
            </div>
            <h2 style={{ fontFamily: bebas, fontSize: 36, color: 'var(--ink)', letterSpacing: '2px', lineHeight: 1, margin: 0 }}>
              JARVIS
            </h2>
            <p style={{ fontSize: 13, color: '#666', margin: '5px 0 0', fontFamily: inter }}>
              Агент аналитики продаж и клиентской базы
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: '1px solid #252525', color: '#666',
              width: 34, height: 34, display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer', fontSize: 20, flexShrink: 0,
              fontFamily: inter, transition: 'border-color 0.15s, color 0.15s',
            }}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        {/* SUCCESS */}
        {success ? (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ fontFamily: bebas, fontSize: 28, color: 'var(--accent)', letterSpacing: 1, marginBottom: 12 }}>
              ЗАЯВКА ПРИНЯТА ✓
            </div>
            <p style={{ fontSize: 14, color: '#888', lineHeight: 1.7, fontFamily: inter }}>
              Свяжемся с вами в течение 2 часов — расскажем, как собрать такого же агента под ваш бизнес.
            </p>
          </div>
        ) : view === 'form' ? (
          /* FORM — прямо в окне */
          <div style={{ padding: '20px 24px 24px' }}>
            <button
              onClick={() => { setView('info'); setErr(''); }}
              style={{ background: 'none', border: 'none', color: '#666', fontSize: 12, fontFamily: inter, cursor: 'pointer', padding: 0, marginBottom: 14 }}
            >
              ← назад к описанию
            </button>
            <div style={{ fontFamily: bebas, fontSize: 22, color: 'var(--ink)', letterSpacing: 1, lineHeight: 1.1, marginBottom: 4 }}>
              ХОЧУ ТАКОГО ЖЕ АГЕНТА
            </div>
            <p style={{ fontSize: 13, color: '#666', fontFamily: inter, lineHeight: 1.55, marginBottom: 16 }}>
              Оставьте контакт — покажем, как собрать такого агента под ваши процессы.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="text" placeholder="Ваше имя" value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,106,0,0.5)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = '#252525'; }}
                style={inputStyle} autoComplete="name"
              />
              <input
                type="tel" placeholder="+7 999 999 99 99 или @telegram" value={form.contact}
                onChange={e => setForm(p => ({ ...p, contact: e.target.value }))}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,106,0,0.5)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = '#252525'; }}
                style={inputStyle} autoComplete="tel"
              />
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginTop: 2 }}>
                <input
                  type="checkbox" checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  style={{ marginTop: 3, accentColor: 'var(--accent)', flexShrink: 0, width: 16, height: 16, cursor: 'pointer' }}
                />
                <span style={{ fontSize: 12, color: '#555', lineHeight: 1.6, fontFamily: inter }}>
                  Согласен(а) на обработку персональных данных
                </span>
              </label>
              {err && <span style={{ fontSize: 13, color: '#D95252', fontFamily: inter }}>{err}</span>}
              <button
                type="submit" disabled={loading}
                style={{
                  background: 'var(--accent)', color: '#ffffff', border: 'none',
                  padding: '15px 22px', fontFamily: bebas, fontSize: 18, letterSpacing: '1.5px',
                  width: '100%', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
                  transition: 'opacity 0.15s', marginTop: 4,
                }}
              >
                {loading ? 'ОТПРАВЛЯЮ…' : 'ОСТАВИТЬ ЗАЯВКУ →'}
              </button>
            </form>
          </div>
        ) : (
          /* INFO */
          <>
            {/* Metric */}
            <div style={{
              margin: '0 24px', marginTop: 20,
              padding: '16px 18px',
              background: 'rgba(255,106,0,0.05)',
              borderLeft: '2px solid var(--accent)',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{ fontFamily: bebas, fontSize: 48, color: 'var(--accent)', lineHeight: 1, letterSpacing: '1px', flexShrink: 0 }}>
                −70%
              </div>
              <div>
                <div style={{ fontFamily: bebas, fontSize: 14, color: 'var(--ink)', letterSpacing: '1px' }}>
                  ВРЕМЕНИ НА РУЧНУЮ АНАЛИТИКУ
                </div>
                <div style={{ fontSize: 12, color: '#555', fontFamily: inter, marginTop: 3 }}>
                  Отчёт, который раньше занимал час — теперь приходит автоматически каждое утро
                </div>
              </div>
            </div>

            {/* Features */}
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 11 }}>
              <div style={{ fontFamily: bebas, fontSize: 12, letterSpacing: '2px', color: '#444', marginBottom: 4 }}>
                ЧТО ДЕЛАЕТ АГЕНТ
              </div>
              {FEATURES.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                  <div style={{ width: 3, height: 3, background: 'var(--accent)', flexShrink: 0, marginTop: 6 }} />
                  <span style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.6, fontFamily: inter }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Stack */}
            <div style={{ padding: '0 24px 20px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['CRM-интеграция', 'Telegram-бот', 'Автоотчёты', 'Анализ воронки'].map(tag => (
                <span key={tag} style={{
                  fontSize: 11, color: '#555', fontFamily: inter,
                  padding: '4px 10px', border: '1px solid #1C1C1C',
                  letterSpacing: '0.5px',
                }}>{tag}</span>
              ))}
            </div>

            {/* CTA → открывает форму в этом же окне */}
            <div style={{ padding: '16px 24px 24px', borderTop: '1px solid #141414' }}>
              <p style={{ fontSize: 13, color: '#555', fontFamily: inter, lineHeight: 1.55, marginBottom: 14 }}>
                Хотите такого же агента? Оставьте заявку — покажем, как это работает именно в вашем бизнесе.
              </p>
              <button
                onClick={() => setView('form')}
                style={{
                  display: 'block', width: '100%', background: 'var(--accent)', color: '#ffffff',
                  border: 'none', fontFamily: bebas, fontSize: 19, letterSpacing: '1.5px',
                  padding: '14px 22px', textAlign: 'center', cursor: 'pointer',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.82'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                ХОЧУ ТАКОГО ЖЕ АГЕНТА →
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes jFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes jSlideUp {
          from { opacity: 0; transform: translate(-50%, -47%) }
          to   { opacity: 1; transform: translate(-50%, -50%) }
        }
      `}</style>
    </>
  );
}
