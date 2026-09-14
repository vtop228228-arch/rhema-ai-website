const { chromium } = require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');

async function settle(page, scroll = false) {
  await page.evaluate(() => document.fonts.ready);
  if (scroll) await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const records = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  async function capture(slug, filename, note) {
    const dir = path.join('public', 'cases', slug);
    fs.mkdirSync(dir, { recursive: true });
    await page.screenshot({ path: path.join(dir, filename), animations: 'disabled' });
    const record = { slug, path: `/cases/${slug}/${filename}`, width: 1440, height: 1000, sourceUrl: page.url(), note };
    records.push(record);
    console.log(JSON.stringify(record));
  }
  await page.goto('https://garajw.ru/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await settle(page, true);
  await capture('garajw', 'homepage.png', 'Original public homepage: bespoke jewellery and commission journey.');
  const processHeading = page.getByRole('heading', { name: '\u041a\u0430\u043a \u0440\u043e\u0436\u0434\u0430\u0435\u0442\u0441\u044f \u0438\u0437\u0434\u0435\u043b\u0438\u0435', exact: true });
  await processHeading.evaluate(el => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 100));
  await settle(page);
  await capture('garajw', 'workshop.png', 'Original public workshop section: gemstone selection, engraving, stone setting and finished emerald ring.');
  await page.goto('https://garajw.ru/custom', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await settle(page, true);
  await page.getByRole('heading', { name: '\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u0431\u0440\u0438\u0444', exact: true }).evaluate(el => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 150));
  await settle(page);
  await capture('garajw', 'custom-order.png', 'Original public bespoke order page. Form was not submitted.');
  console.log(JSON.stringify({ slug: 'garajw', customText: await page.locator('body').innerText() }));

  await page.goto('https://www.sigmaup.pro/main', { waitUntil: 'domcontentloaded', timeout: 60000 });
  const accept = page.getByRole('button', { name: '\u041f\u0420\u0418\u041d\u042f\u0422\u042c', exact: true });
  if (await accept.isVisible()) await accept.click();
  await settle(page, true);
  if (await accept.isVisible()) await accept.click();
  await page.waitForTimeout(500);
  await capture('sigmaup', 'homepage.png', 'Original public mobile video editing course homepage; cookie notice dismissed normally.');
  const planButton = page.getByRole('button', { name: '\u041f\u041b\u0410\u041d \u041a\u0423\u0420\u0421\u0410', exact: true });
  await planButton.evaluate(el => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 240));
  await settle(page);
  await capture('sigmaup', 'plans.png', 'Original public course plans. Prices are a snapshot; no purchase or registration was made.');
  await planButton.click();
  await settle(page);
  await capture('sigmaup', 'curriculum.png', 'Original public curriculum opened via the course-plan button.');
  console.log(JSON.stringify({ slug: 'sigmaup', visibleText: (await page.locator('body').innerText()).slice(-12000) }));
  fs.writeFileSync('design-export/rhema-refresh/website-assets.json', JSON.stringify({ capturedAt: new Date().toISOString(), screenshots: records, caveats: ['garajw.ru/catalog returned a visible catalogue load error in the browser; omitted from portfolio screenshots.', 'SigmaUp private student workspace was not accessed. Screenshots show public landing page and public course outline only.', 'No contact forms, registration or payment flow were submitted.'] }, null, 2));
  await browser.close();
})();
