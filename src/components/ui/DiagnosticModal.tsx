'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';

const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';
const inter = 'var(--font-inter), Inter, sans-serif';

const schema = z.object({
  name: z.string().min(2, 'Укажите имя'),
  contact: z.string().min(5, 'Укажите телефон или Telegram'),
});

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DiagnosticModal({ open, onClose }: Props) {
  const [form, setForm] = useState({ name: '', contact: '' });
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Сброс при открытии
  useEffect(() => {
    if (open) {
      setForm({ name: '', contact: '' });
      setConsent(false);
      setErr('');
      setSuccess(false);
    }
  }, [open]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Закрытие по Escape
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
          business: 'Запрос диагностики через форму в хедере',
          consent: true,
        }),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
    } catch {
      setErr('Ошибка отправки. Напишите нам напрямую в Telegram.');
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    background: '#111',
    border: '1px solid #252525',
    color: 'var(--ink)',
    padding: '14px 16px',
    fontSize: 16, // 16px — не вызывает zoom на iOS
    fontFamily: inter,
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.18s',
    borderRadius: 0,
    boxSizing: 'border-box',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.78)',
          zIndex: 300,
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          animation: 'diagFadeIn 0.18s ease',
        }}
      />

      {/* Панель */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 301,
          background: '#0C0C0C',
          border: '1px solid rgba(37,99,235,0.22)',
          borderTop: '3px solid var(--accent)',
          width: 'min(460px, 92vw)',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          maxHeight: '90dvh',
          overflowY: 'auto',
          animation: 'diagSlideUp 0.22s ease',
        }}
      >
        {/* Шапка */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: 'rgba(37,99,235,0.85)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, marginBottom: 6 }}>
              Бесплатно · без обязательств
            </div>
            <h2 style={{ fontFamily: bebas, fontSize: 28, color: 'var(--ink)', letterSpacing: '1px', lineHeight: 1, margin: 0 }}>
              ПОЛУЧИТЬ ДИАГНОСТИКУ
            </h2>
          </div>
          <button
            onClick={onClose}
            className="diag-close-btn"
            style={{
              background: 'none',
              border: '1px solid #252525',
              color: '#666',
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 20,
              lineHeight: 1,
              flexShrink: 0,
              transition: 'border-color 0.15s, color 0.15s',
            }}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        {/* Содержимое */}
        {success ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontFamily: bebas, fontSize: 26, color: 'var(--accent)', letterSpacing: 1, marginBottom: 10 }}>
              ЗАЯВКА ПРИНЯТА ✓
            </div>
            <p style={{ fontSize: 14, color: '#888', lineHeight: 1.7 }}>
              Свяжемся с вами в течение 2 часов — разберём ваш запрос и расскажем, что стоит сделать первым.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              type="text"
              placeholder="Ваше имя"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.5)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#252525'; }}
              style={inputStyle}
              autoComplete="name"
            />
            <input
              type="tel"
              placeholder="+7 999 999 99 99 или @telegram"
              value={form.contact}
              onChange={e => setForm(p => ({ ...p, contact: e.target.value }))}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.5)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#252525'; }}
              style={inputStyle}
              autoComplete="tel"
            />

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginTop: 2 }}>
              <input
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                style={{ marginTop: 3, accentColor: 'var(--accent)', flexShrink: 0, width: 16, height: 16, cursor: 'pointer' }}
              />
              <span style={{ fontSize: 12, color: '#555', lineHeight: 1.6 }}>
                Согласен(а) на обработку персональных данных
              </span>
            </label>

            {err && (
              <span style={{ fontSize: 13, color: '#D95252' }}>{err}</span>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'var(--accent)',
                color: '#ffffff',
                border: 'none',
                padding: '15px 22px',
                fontFamily: bebas,
                fontSize: 18,
                letterSpacing: '1.5px',
                width: '100%',
                cursor: loading ? 'wait' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'opacity 0.15s',
                marginTop: 4,
              }}
            >
              {loading ? 'ОТПРАВЛЯЮ…' : 'ЗАПИСАТЬСЯ НА ДИАГНОСТИКУ →'}
            </button>
          </form>
        )}
      </div>

      <style>{`
        @keyframes diagFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes diagSlideUp { from { opacity: 0; transform: translate(-50%, -47%) } to { opacity: 1; transform: translate(-50%, -50%) } }
        .diag-close-btn:hover { border-color: rgba(37,99,235,0.3) !important; color: var(--ink) !important; }
      `}</style>
    </>
  );
}
