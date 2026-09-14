type Choice = '1' | '0' | null;
let memoryChoice: Choice = null;
export function consentSnapshot(): Choice {
  if (memoryChoice !== null) return memoryChoice;
  try { const value = localStorage.getItem('cookie_consent'); return value === '1' || value === '0' ? value : null; } catch { return null; }
}
export function subscribeConsent(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('rhema-cookie-consent', callback);
  return () => { window.removeEventListener('storage', callback); window.removeEventListener('rhema-cookie-consent', callback); };
}
export function saveConsent(choice: '1' | '0') {
  try { localStorage.setItem('cookie_consent', choice); memoryChoice = null; } catch { memoryChoice = choice; }
  window.dispatchEvent(new Event('rhema-cookie-consent'));
}
export const serverConsent = (): Choice => null;
