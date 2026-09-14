const { chromium } = require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    await context.route('**/*', route => {
      const u = new URL(route.request().url());
      return (!['localhost', '127.0.0.1'].includes(u.hostname) || u.pathname.startsWith('/api/')) ? route.abort() : route.continue();
    });
    await context.addInitScript(() => localStorage.setItem('cookie_consent', '1'));
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:3100/cases#jarvis', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('#jarvis').count(), 1);
    await page.locator('#jarvis').scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'design-export/rhema-refresh/rhema-os-feature.png' });
    await page.locator('#jarvis').getByRole('link', { name: 'Разобрать Rhema OS' }).click();
    await page.waitForURL('**/cases/jarvis');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: 'design-export/rhema-refresh/rhema-os-hero.png' });
    await page.locator('#inside').scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'design-export/rhema-refresh/rhema-os-network.png' });
    await page.getByRole('link', { name: 'Switch to English' }).click();
    await page.waitForURL('**/en/cases/jarvis');
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: 'design-export/rhema-refresh/rhema-os-en-mobile.png' });
    console.log('PASS: preserved #jarvis anchor, case link and case language switch; current screenshots saved.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
