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
    <p>{en ? 'Allow analytics to help us improve the site? ' : 'Разрешить аналитику, чтобы помочь нам улучшить сайт? '}<Link href={en ? '/en/privacy' : '/privacy'}>{en ? 'Details' : 'Подробнее'}</Link></p>
    <div><button type="button" onClick={() => saveConsent('0')}>{en ? 'No thanks' : 'Без аналитики'}</button><button type="button" className={s.accept} onClick={() => saveConsent('1')}>{en ? 'Accept' : 'Принять'}</button></div>
  </div>;
}
