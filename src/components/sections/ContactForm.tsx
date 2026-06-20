'use client';

import { useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';

const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

const formSchema = z.object({
  name: z.string().min(2, 'Укажите имя'),
  contact: z.string().min(3, 'Укажите контакт'),
  business: z.string().min(10, 'Расскажите о бизнесе подробнее (мин. 10 символов)'),
});

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', contact: '', business: '' });
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setErr('Необходимо согласие на обработку персональных данных');
      return;
    }
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? 'Проверьте данные');
      return;
    }
    setErr('');
    setLoading(true);
    try {
      // Нажатие кнопки = согласие на обработку ПД (см. дисклеймер ниже).
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...parsed.data, consent: true }),
      });
      if (!res.ok) throw new Error('fail');
      setSuccess(true);
    } catch {
      setErr('Не удалось отправить. Попробуйте позже или напишите в Telegram.');
    } finally {
      setLoading(false);
    }
  }

  const focusOrange = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = 'rgba(255,106,0,0.55)'; };
  const blurInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = '#1C1C1C'; };
  const inputStyle: React.CSSProperties = { background: 'rgba(19,19,19,0.88)', border: '1px solid #1C1C1C', color: 'var(--ink)', padding: '11px 14px', fontSize: 14, fontFamily: 'var(--font-inter), Inter, sans-serif', width: '100%', outline: 'none', transition: 'border-color 0.18s' };

  return (
    <div id="contact" className="contact-grid section-pad" style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: 68 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div className="eyebrow">
          <div className="bar" style={{ width: 'auto', flex: 'none' }} />
          <span className="text">Первый шаг</span>
        </div>
        <h2 style={{ fontFamily: bebas, fontSize: 'clamp(28px, 7.5vw, 62px)', lineHeight: 0.9, letterSpacing: '-0.5px' }}>
          <span style={{ display: 'block', color: 'var(--ink)' }}>ОБСУДИМ</span>
          <span style={{ display: 'block', color: 'var(--accent)' }}>ВАШУ ЗАДАЧУ</span>
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.8, maxWidth: 340 }}>
          Расскажите про бизнес — за один звонок разберёмся, что принесёт первый результат и во сколько это обойдётся.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 10, paddingTop: 18, borderTop: '1px solid var(--line)' }}>
          {['Отвечаем в течение рабочего дня', 'Первая консультация — бесплатно'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
              <div style={{ width: 3, height: 3, background: 'var(--accent)', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: '#888' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--card)', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {success ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontFamily: bebas, fontSize: 22, letterSpacing: 1, color: 'var(--accent)' }}>ЗАЯВКА ПРИНЯТА</div>
            <p style={{ fontSize: 13, color: '#999', lineHeight: 1.65 }}>Свяжемся с вами в течение рабочего дня. Спасибо!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input type="text" placeholder="Ваше имя" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} onFocus={focusOrange} onBlur={blurInput} style={inputStyle} />
            <input type="text" placeholder="Telegram (@username) или телефон" value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} onFocus={focusOrange} onBlur={blurInput} style={inputStyle} />
            <textarea placeholder="Расскажите о вашем бизнесе..." rows={4} value={form.business} onChange={e => setForm(p => ({ ...p, business: e.target.value }))} onFocus={focusOrange} onBlur={blurInput} style={{ ...inputStyle, resize: 'none' }} />
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                style={{ marginTop: 2, accentColor: 'var(--accent)', flexShrink: 0 }}
              />
              <span style={{ fontSize: 12, color: '#777', lineHeight: 1.5 }}>
                Я согласен(а) на обработку персональных данных в соответствии с{' '}
                <Link href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                  Политикой конфиденциальности
                </Link>
              </span>
            </label>
            {err && <span style={{ fontSize: 13, color: 'var(--red)' }}>{err}</span>}
            <button type="submit" disabled={loading || !consent} style={{ background: 'var(--accent)', color: '#ffffff', border: 'none', padding: '13px 22px', fontFamily: bebas, fontSize: 19, letterSpacing: 1, width: '100%', opacity: (loading || !consent) ? 0.5 : 1, cursor: (!consent || loading) ? 'not-allowed' : 'pointer' }}>
              {loading ? 'ОТПРАВЛЯЮ…' : 'ОСТАВИТЬ ЗАЯВКУ'}
            </button>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}
