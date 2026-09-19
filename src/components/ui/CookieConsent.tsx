'use client';
import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { consentSnapshot, saveConsent, subscribeConsent } from '@/lib/analytics-consent';
import s from './CookieConsent.module.css';
export default function CookieConsent({ locale = 'ru' }: { locale?: 'ru' | 'en' }) {
  const en = locale === 'en';
  const consent = useSyncExternalStore(subscribeConsent, consentSnapshot, () => 'pending');
  if (consent !== null) return null;
  return <div role="region" aria-label={en ? 'Cookie notice' : 'Использование cookie'} className={s.notice}>
    <p>{en ? 'We use cookies and Yandex Metrica to understand how to improve the site. Allow analytics? ' : 'Мы используем cookie и Яндекс.Метрику, чтобы понимать, как улучшить сайт. Разрешить аналитику? '}<Link href={en ? '/en/privacy' : '/privacy'}>{en ? 'Details' : 'Подробнее'}</Link></p>
    <div><button type="button" onClick={() => saveConsent('0')}>{en ? 'No thanks' : 'Без аналитики'}</button><button type="button" className={s.accept} onClick={() => saveConsent('1')}>{en ? 'Accept' : 'Принять'}</button></div>
  </div>;
}
