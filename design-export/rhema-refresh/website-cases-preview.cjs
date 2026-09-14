const { chromium } = require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/playwright');
const assert = require('node:assert/strict');
const base = process.env.QA_BASE || 'http://127.0.0.1:3106';
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      return ['127.0.0.1', 'localhost'].includes(url.hostname) && !url.pathname.startsWith('/api/') ? route.continue() : route.abort();
    });
    await context.addInitScript(() => localStorage.setItem('cookie_consent', '1'));
    const page = await context.newPage();
    for (const slug of ['garajw', 'sigmaup']) {
      await page.goto(`${base}/cases/${slug}`, { waitUntil: 'networkidle' });
      const images = page.locator('main figure img');
      assert.equal(await images.count(), 3, `${slug} original site screenshots`);
      for (const img of await images.all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(el => el.decode());
        assert.ok(await img.evaluate(el => el.naturalWidth > 0));
      }
      const siteLink = page.locator('main header a[target="_blank"]');
      assert.equal(await siteLink.getAttribute('href'), slug === 'garajw' ? 'https://garajw.ru/' : 'https://www.sigmaup.pro/main');
      await page.locator('main header').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `design-export/rhema-refresh/${slug}-case-desktop.png` });
      await page.locator('#screens').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `design-export/rhema-refresh/${slug}-case-gallery.png` });
      const [popup] = await Promise.all([page.waitForEvent('popup'), page.locator('#screens a').first().click()]);
      await popup.waitForLoadState();
      assert.match(popup.url(), new RegExp(`/cases/${slug}/[a-z-]+\\.png$`));
      await popup.close();
      await page.getByRole('link', { name: 'Switch to English' }).click();
      await page.waitForURL(`${base}/en/cases/${slug}`);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({ path: `design-export/rhema-refresh/${slug}-case-en-mobile.png` });
      await page.setViewportSize({ width: 1440, height: 1000 });
    }
    await page.goto(base + '/cases', { waitUntil: 'networkidle' });
    for (const id of ['garajw', 'sigmaup', 'jarvis', 'besty', 'mayak', 'financefamily', 'church-analytics', 'isnail']) assert.equal(await page.locator('#' + id).count(), 1, id + ' unique project anchor');
    await page.locator('#garajw').scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'design-export/rhema-refresh/website-case-cards.png' });
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('main section').first().locator('a[href="#contact"]').count(), 1, 'Home leads to a conversation with the team');
    await page.locator('main section').first().locator('a[href="#contact"]').click();
    await page.locator('#contact').waitFor({ state: 'visible' });
    console.log('PASS: 6 website screenshots, full-size images, original-site links, RU/EN, 8 unique case anchors and human-first home CTA.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
