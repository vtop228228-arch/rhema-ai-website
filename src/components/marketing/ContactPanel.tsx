'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ymGoal } from '@/lib/analytics';
import s from './Editorial.module.css';

export default function ContactPanel({ locale = 'ru', projectName }: { locale?: 'ru' | 'en'; projectName?: string }) {
  const en = locale === 'en';
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [invalidField, setInvalidField] = useState('');
  const lock = useRef(false);
  const started = useRef(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    const data = new FormData(event.currentTarget);
    const details = String(data.get('business') ?? '').trim();
    const payload = { name: String(data.get('name') ?? '').trim(), contact: String(data.get('contact') ?? '').trim(), business: `${en ? 'Free diagnosis request.' : 'Заявка на бесплатную диагностику.'}\n${details || (en ? 'Discuss the task on the call.' : 'Задачу обсудим на созвоне.')}`, consent: data.get('consent') === 'on' };
    const issue = [
      { field: 'name', invalid: payload.name.length < 2, message: en ? 'Enter your name using at least 2 characters.' : 'Укажите имя: минимум 2 символа без пробелов по краям.' },
      { field: 'contact', invalid: payload.contact.length < 3, message: en ? 'Enter an email address, Telegram username or phone number.' : 'Укажите Telegram или телефон, по которому можно с вами связаться.' },
      { field: 'consent', invalid: !payload.consent, message: en ? 'Please confirm your consent to data processing.' : 'Подтвердите согласие на обработку данных.' },
    ].find(item => item.invalid);
    if (issue) {
      setError(issue.message);
      setInvalidField(issue.field);
      setStatus('error');
      const field = event.currentTarget.elements.namedItem(issue.field);
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    setInvalidField('');
    lock.current = true;
    setStatus('sending');
    setError('');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: controller.signal });
      if (!res.ok) throw new Error(res.status === 429
        ? (en ? 'Too many attempts. Try again later or contact us on Telegram.' : 'Слишком много попыток. Попробуйте позже или напишите нам в Telegram.')
        : (en ? 'We could not send your request. Please try again or contact us on Telegram.' : 'Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram.'));
      setStatus('success');
      ymGoal('contact_lead');
      ymGoal('diagnosis_request');
    } catch (reason) {
      setError(reason instanceof Error && reason.name !== 'AbortError' ? reason.message : (en ? 'The server is taking longer than expected. Contact us on Telegram to check whether we received your request.' : 'Ответ сервера задерживается. Свяжитесь с нами в Telegram, чтобы уточнить получение заявки.'));
      setStatus('error');
    } finally { clearTimeout(timer); lock.current = false; }
  }
  return <section className={s.contact} id="contact" aria-labelledby="contact-title">
    <div>
      <span className={s.kicker}>{en ? 'Free business diagnosis' : 'Бесплатная диагностика бизнеса'}</span>
      <h2 id="contact-title">{en ? <>Find your<br />first step.</> : <>Разберём вашу задачу.<br />Бесплатно.</>}</h2>
      {projectName && <p><strong>{en ? 'Project you are exploring: ' : 'Вас заинтересовал проект: '}{projectName}</strong><br />{en ? 'Its name is already in the form. Tell us what you would like to adapt.' : 'Название уже в форме. Допишите, что нужно изменить под вашу задачу.'}</p>}
      <p>{en ? 'Leave your contact details. We will arrange a call, review how you work and suggest a useful first step. If you want us to build it, we will discuss the scope, price and timing on the call.' : 'Оставьте контакт — согласуем удобное время созвона. Разберём, как вы работаете сейчас, и предложим, с чего начать. Если захотите внедрить решение, на созвоне обсудим состав работ, стоимость и сроки.'}</p>
      <a className={s.contactLink} href="https://t.me/RhemaAI_support" target="_blank" rel="noopener noreferrer">{en ? 'Message us on Telegram' : 'Написать в Telegram'} <span aria-hidden="true">↗</span></a>
      <span className={s.note}>{en ? '0 RUB · No obligation to buy development.' : '0 ₽ · Без обязательства заказывать разработку.'}</span>
    </div>
    <div className={s.formShell}><div className={s.formCore}>
      {status === 'success' ? <div className={s.success} role="status"><span aria-hidden="true">✓</span><h3>{en ? 'Request received' : 'Заявка принята'}</h3><p>{en ? 'Thank you! We will contact you to arrange your free discovery call.' : 'Спасибо! Свяжемся по указанному контакту и согласуем время бесплатной диагностики.'}</p></div> :
      <form onSubmit={submit} className={s.form} aria-busy={status === 'sending'} onChange={() => { if (!started.current) { ymGoal('contact_start', { page: window.location.pathname }); started.current = true; } }}>
        <label htmlFor="project-name">{en ? 'Your name' : 'Как к вам обращаться'}<input id="project-name" name="name" autoComplete="name" placeholder={en ? 'Your name' : 'Ваше имя'} required minLength={2} maxLength={100} aria-invalid={invalidField === 'name' || undefined} aria-describedby={invalidField === 'name' ? 'project-error' : undefined} /></label>
        <label htmlFor="project-contact">{en ? 'Email, Telegram or phone' : 'Telegram или телефон'}<input id="project-contact" name="contact" autoComplete="off" autoCapitalize="none" spellCheck={false} placeholder={en ? 'you@company.com or @username' : '@username или +7…'} required minLength={3} maxLength={255} aria-invalid={invalidField === 'contact' || undefined} aria-describedby={invalidField === 'contact' ? 'project-error' : undefined} /></label>
        <label htmlFor="project-business">{en ? 'Your task (optional)' : 'О задаче — по желанию'}<textarea id="project-business" name="business" defaultValue={projectName ? (en ? `I am interested in a solution similar to ${projectName}. ` : `Интересует решение, похожее на ${projectName}. `) : undefined} placeholder={en ? 'For example: we run an online school and answer the same student questions every day…' : 'Например: у нас онлайн-школа, каждый день отвечаем ученикам на одинаковые вопросы…'} rows={3} maxLength={1850} aria-invalid={invalidField === 'business' || undefined} aria-describedby={invalidField === 'business' ? 'project-error' : undefined} /></label>
        <label className={s.consent}><input type="checkbox" name="consent" required aria-invalid={invalidField === 'consent' || undefined} aria-describedby={invalidField === 'consent' ? 'project-error' : undefined} /><span>{en ? 'I consent to the processing of my personal data under the ' : 'Согласен на обработку персональных данных в соответствии с '}<Link href={en ? '/en/privacy' : '/privacy'} target="_blank" rel="noopener noreferrer">{en ? 'privacy policy' : 'политикой конфиденциальности'}</Link>.</span></label>
        {status === 'error' && <p id="project-error" role="alert" className={s.error}>{error}</p>}
        <button className={s.button} type="submit" disabled={status === 'sending'}>{status === 'sending' ? (en ? 'Sending…' : 'Отправляем…') : (en ? 'Book a free diagnosis' : 'Записаться на бесплатную диагностику')}<span aria-hidden="true">↗</span></button>
        <p className={s.note}>{en ? 'No obligation to commission development.' : 'Без обязательства заказывать разработку.'}</p>
      </form>}
    </div></div>
  </section>;
}
