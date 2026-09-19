'use client';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { YM_ID, ymGoal } from '@/lib/analytics';
import { consentSnapshot, serverConsent, subscribeConsent } from '@/lib/analytics-consent';
import { analyticsPageUrl, captureAttribution, clearAttribution } from '@/lib/attribution';

export default function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, consentSnapshot, serverConsent);
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const previous = useRef('');
  useEffect(() => {
    if (!ready || consent !== '1' || !window.ym || previous.current === pathname) return;
    const acquisition = captureAttribution();
    let referer = previous.current;
    if (!referer && acquisition?.first.referrer) referer = `https://${acquisition.first.referrer}/`;
    window.ym(Number(YM_ID), 'hit', analyticsPageUrl(), { referer: referer || undefined, title: document.title, params: acquisition });
    previous.current = pathname;
    const project = pathname.match(/^\/(?:en\/)?cases\/([^/]+)$/)?.[1];
    if (project) ymGoal('case_view', { project });
    const service = pathname.match(/^\/(?:en\/)?services\/([^/]+)$/)?.[1];
    if (service) ymGoal('service_view', { service });
  }, [ready, pathname, consent]);
  useEffect(() => {
    if (consent !== '1') { clearAttribution(); previous.current = ''; return; }
    captureAttribution();
    const click = (event: MouseEvent) => {
      const control = event.target instanceof Element ? event.target.closest<HTMLElement>('a,button,summary,[role="tab"]') : null;
      if (!control) return;
      const explicit = control.dataset.analytics;
      if (!explicit && control.closest('form,[data-analytics-private]')) return;
      const label = explicit || control.getAttribute('aria-label') || control.textContent?.trim().replace(/\s+/g, ' ').slice(0, 100) || control.tagName;
      const section = control.closest('section')?.id || 'navigation';
      ymGoal('ui_click', { page: pathname, control: label, section });
      if (!(control instanceof HTMLAnchorElement)) return;
      const url = new URL(control.href, location.href);
      const project = url.pathname.match(/^\/(?:en\/)?cases\/([^/]+)$/)?.[1];
      if (project) ymGoal('case_open', { page: pathname, project });
      if (url.hostname === 't.me') ymGoal('telegram_click', { page: pathname });
      else if (url.origin === location.origin && url.hash === '#contact') ymGoal('contact_click', { page: pathname });
      else if (url.origin === location.origin && url.hash === '#diagnosis') ymGoal('diagnosis_click', { page: pathname });
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, [consent, pathname]);
  useEffect(() => {
    if (consent !== '1' || !ready) return;
    const root = document.getElementById('scroll-root');
    const seen = new Set<string>();
    const sections = Array.from(document.querySelectorAll('main section'));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const section = entry.target.id || `section_${sections.indexOf(entry.target) + 1}`;
      if (seen.has(section)) return;
      seen.add(section);
      ymGoal('section_view', { page: pathname, section });
    }), { root, threshold: 0 });
    sections.forEach(section => observer.observe(section));
    const depths = new Set<number>();
    let frame = 0;
    const scroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = root || document.documentElement;
        const distance = el.scrollHeight - el.clientHeight;
        if (distance < 1) return;
        const percentage = 100 * el.scrollTop / distance;
        for (const depth of [25, 50, 75, 100]) if (percentage >= depth - 1 && !depths.has(depth)) {
          depths.add(depth); ymGoal('scroll_depth', { page: pathname, depth: String(depth) });
        }
      });
    };
    const target = root || window;
    target.addEventListener('scroll', scroll, { passive: true });
    scroll();
    return () => { observer.disconnect(); target.removeEventListener('scroll', scroll); cancelAnimationFrame(frame); };
  }, [consent, pathname, ready]);
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
