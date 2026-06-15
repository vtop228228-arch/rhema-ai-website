'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function PatternCTA() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [promo, setPromo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !consent) return;
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact: phone, business: 'Заявка через PatternCTA', consent }),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{
      background: 'linear-gradient(135deg, #2d1508 0%, #1a0c04 50%, #261208 100%)',
      padding: '60px 0',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>

          {/* Левая часть */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h2 className="font-bebas text-ink" style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '0.04em', margin: 0 }}>
              ВИДИТЕ ПАТТЕРН?
            </h2>
            <p style={{ fontSize: 15, color: 'var(--sub2)', margin: 0, lineHeight: 1.6 }}>
              9 из 10 предпринимателей неправильно определяют причину проблемы.
              Хотите узнать, что скрывает ваша?
            </p>
          </div>

          {/* Правая часть — форма */}
          {sent ? (
            <p style={{ fontSize: 15, color: 'var(--accent)' }}>✓ Свяжемся с вами в течение 30 минут!</p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <input
                  type="text"
                  placeholder="Имя"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 3,
                    color: 'var(--ink)',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
                <input
                  type="text"
                  placeholder="+7 999 999 99 99"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 3,
                    color: 'var(--ink)',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>

              <Button variant="blue" size="md" onClick={handleSubmit} style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Отправляю...' : 'Найти корень моих проблем'}
              </Button>

              <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', cursor: 'pointer' }}>
                <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} style={{ marginTop: 3 }} />
                <span style={{ fontSize: 12, color: 'var(--sub)', lineHeight: 1.5 }}>
                  Я подтверждаю ознакомление и даю <span style={{ color: 'var(--accent)' }}>Согласие</span> на обработку моих персональных данных в порядке и на условиях, указанных в{' '}
                  <span style={{ color: 'var(--accent)' }}>Политике обработки персональных данных</span>
                </span>
              </label>

              <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', cursor: 'pointer' }}>
                <input type="checkbox" checked={promo} onChange={e => setPromo(e.target.checked)} style={{ marginTop: 3 }} />
                <span style={{ fontSize: 12, color: 'var(--sub)', lineHeight: 1.5 }}>
                  Я даю согласие на получение рекламной информации о новых услугах, акциях и специальных предложениях посредством электронной почты
                </span>
              </label>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
