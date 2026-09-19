import { consentSnapshot } from './analytics-consent';

export type Acquisition = { source: string; medium: string; campaign: string; content: string; term: string; landing: string; referrer: string };
export type Attribution = { first: Acquisition; last: Acquisition };
const key = 'rhema_acquisition_v1';
let current: Attribution | undefined;
const clean = (value: string | null) => (value ?? '').replace(/[^\p{L}\p{N}_.-]/gu, '').slice(0, 80);
export function captureAttribution(): Attribution | undefined {
  if (typeof window === 'undefined' || consentSnapshot() !== '1') return;
  const url = new URL(location.href);
  let referrer = '';
  try { referrer = new URL(document.referrer).hostname; } catch {}
  const acquisition: Acquisition = { source: clean(url.searchParams.get('utm_source')) || (referrer && referrer !== location.hostname ? referrer : 'direct'), medium: clean(url.searchParams.get('utm_medium')), campaign: clean(url.searchParams.get('utm_campaign')), content: clean(url.searchParams.get('utm_content')), term: clean(url.searchParams.get('utm_term')), landing: url.pathname.slice(0, 200), referrer };
  if (!current) {
    try {
      const stored = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (stored?.first?.source && stored?.last?.source) current = stored;
    } catch {}
  }
  if (!current) current = { first: acquisition, last: acquisition };
  else if (url.searchParams.has('utm_source')) current = { first: current.first, last: acquisition };
  try { sessionStorage.setItem(key, JSON.stringify(current)); } catch {}
  return current;
}
export function getLeadAttribution() { return captureAttribution(); }
export function clearAttribution() {
  current = undefined;
  try { sessionStorage.removeItem(key); } catch {}
}
export function analyticsPageUrl() {
  const url = new URL(location.href);
  const query = new URLSearchParams();
  for (const name of ['source', 'medium', 'campaign', 'content', 'term']) {
    const value = clean(url.searchParams.get(`utm_${name}`));
    if (value) query.set(`utm_${name}`, value);
  }
  return url.pathname + (query.size ? `?${query}` : '');
}
