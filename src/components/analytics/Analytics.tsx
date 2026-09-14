'use client';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { YM_ID, ymGoal } from '@/lib/analytics';
import { consentSnapshot, serverConsent, subscribeConsent } from '@/lib/analytics-consent';

export default function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, consentSnapshot, serverConsent);
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const previous = useRef('');
  useEffect(() => {
    if (!ready || consent !== '1' || !window.ym || previous.current === pathname) return;
    window.ym(Number(YM_ID), 'hit', pathname, { referer: previous.current || undefined });
    previous.current = pathname;
    const project = pathname.match(/^\/(?:en\/)?cases\/([^/]+)$/)?.[1];
    if (project) ymGoal('case_view', { project });
    const service = pathname.match(/^\/(?:en\/)?services\/([^/]+)$/)?.[1];
    if (service) ymGoal('service_view', { service });
  }, [ready, pathname, consent]);
  useEffect(() => {
    if (consent !== '1') return;
    const click = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      if (!link) return;
      const url = new URL(link.href, location.href);
      if (url.hostname === 't.me') ymGoal('telegram_click', { page: pathname });
      else if (url.origin === location.origin && url.hash === '#contact') ymGoal('contact_click', { page: pathname });
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, [consent, pathname]);
  if (!YM_ID || consent !== '1') return null;
  return <Script id="yandex-metrika" strategy="afterInteractive" onReady={() => setReady(true)}>{`
    window.ym = window.ym || function(){ (window.ym.a = window.ym.a || []).push(arguments); };
    window.ym.l = Date.now();
    var metrikaScript = document.createElement('script');
    metrikaScript.async = true; metrikaScript.src = 'https://mc.yandex.ru/metrika/tag.js';
    document.head.appendChild(metrikaScript);
    ym(${YM_ID}, 'init', {defer:true, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:false});
  `}</Script>;
}
