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
  // Отказ после согласия: Метрика уже загружена во вкладке — стираем её cookie и перезагружаем страницу.
  const withdraw = choice === '0' && typeof window.ym === 'function';
  try { localStorage.setItem('cookie_consent', choice); memoryChoice = null; } catch { memoryChoice = choice; }
  window.dispatchEvent(new Event('rhema-cookie-consent'));
  if (withdraw) { clearMetrikaCookies(); location.reload(); }
}
// «Настройки cookie» в футере: сбрасываем выбор — баннер показывается снова.
export function resetConsent() {
  try { localStorage.removeItem('cookie_consent'); } catch { /* хранилище недоступно */ }
  memoryChoice = null;
  window.dispatchEvent(new Event('rhema-cookie-consent'));
}
function clearMetrikaCookies() {
  const names = document.cookie.split(';').map(c => c.split('=')[0].trim()).filter(n => n.startsWith('_ym'));
  for (const name of names) for (const domain of ['', `; domain=${location.hostname}`, `; domain=.${location.hostname}`]) {
    document.cookie = `${name}=; max-age=0; path=/${domain}`;
  }
}
export const serverConsent = (): Choice => null;
