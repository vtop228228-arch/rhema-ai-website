'use client';

import { useState } from 'react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа').max(100),
  contact: z.string().min(3, 'Укажите контакт').max(255),
  business: z.string().min(1).max(2000).optional().default(''),
  consent: z.boolean().refine(v => v === true, 'Согласие обязательно'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [formData, setFormData] = useState<Partial<ContactForm>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const validated = contactSchema.parse({ ...formData, business: formData.business || '' });
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });
      if (!res.ok) throw new Error('Ошибка при отправке');
      setSuccess(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactForm, string>> = {};
        error.issues.forEach(err => {
          const path = err.path[0] as keyof ContactForm;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{
      background: 'linear-gradient(135deg, #2d1508 0%, #1a0c04 50%, #261208 100%)',
      padding: '60px 0',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>

          {/* Левая — текст */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h2 className="font-bebas text-ink" style={{ fontSize: 'clamp(28px, 3vw, 44px)', letterSpacing: '0.04em', margin: 0, lineHeight: 1.1 }}>
              ГОТОВЫ УВИДЕТЬ ПРАВДУ О ВАШЕМ БИЗНЕСЕ?
            </h2>
            <p style={{ fontSize: 15, color: 'var(--sub2)', margin: 0, lineHeight: 1.6 }}>
              Проведём диагностику за 1-2 дня и покажем все точки роста. Свяжемся в течение 30 минут.
            </p>
          </div>

          {/* Правая — форма */}
          {success ? (
            <p style={{ fontSize: 15, color: 'var(--accent)' }}>✓ Получили! Свяжемся с вами в течение 30 минут.</p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {/* Имя */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="Имя"
                    required
                    style={{
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid ${errors.name ? 'var(--red)' : 'rgba(255,255,255,0.15)'}`,
                      borderRadius: 3,
                      color: 'var(--ink)',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                  {errors.name && <span style={{ fontSize: 11, color: 'var(--red)' }}>{errors.name}</span>}
                </div>

                {/* Контакт */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact || ''}
                    onChange={handleChange}
                    placeholder="+7 999 999 99 99"
                    required
                    style={{
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid ${errors.contact ? 'var(--red)' : 'rgba(255,255,255,0.15)'}`,
                      borderRadius: 3,
                      color: 'var(--ink)',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                  {errors.contact && <span style={{ fontSize: 11, color: 'var(--red)' }}>{errors.contact}</span>}
                </div>
              </div>

              {/* Кнопка */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '13px',
                  background: loading ? 'var(--accent2)' : 'var(--accent)',
                  border: 'none',
                  borderRadius: 3,
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.04em',
                }}
              >
                {loading ? 'Отправляю...' : 'Отправить'}
              </button>

              {/* Чекбоксы */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent || false}
                    onChange={handleChange}
                    style={{ marginTop: 3 }}
                  />
                  <span style={{ fontSize: 12, color: 'var(--sub)', lineHeight: 1.5 }}>
                    Я подтверждаю ознакомление и даю{' '}
                    <span style={{ color: 'var(--accent)' }}>Согласие</span>
                    {' '}на обработку моих персональных данных в порядке и на условиях, указанных в{' '}
                    <span style={{ color: 'var(--accent)' }}>Политике обработки персональных данных</span>
                  </span>
                </label>
                {errors.consent && <span style={{ fontSize: 11, color: 'var(--red)' }}>{errors.consent}</span>}

                <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', cursor: 'pointer' }}>
                  <input type="checkbox" name="promo" defaultChecked={false} style={{ marginTop: 3 }} />
                  <span style={{ fontSize: 12, color: 'var(--sub)', lineHeight: 1.5 }}>
                    Я даю согласие на получение рекламной информации о новых услугах, акциях и специальных предложениях посредством электронной почты
                  </span>
                </label>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
