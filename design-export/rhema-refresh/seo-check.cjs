const { chromium } = require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/playwright');
const AxeBuilder = require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/@axe-core/playwright').default;
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.QA_BASE || 'http://127.0.0.1:3101';
const out = 'design-export/rhema-refresh';
const ru = ['/', '/services', '/services/ai-agents', '/services/business-automation', '/services/business-platforms', '/about', '/cases', '/cases/jarvis', '/cases/besty', '/cases/mayak', '/cases/financefamily', '/cases/church-analytics', '/cases/garajw', '/cases/sigmaup', '/how-we-work', '/privacy', '/offer'];
const routes = [...ru, ...ru.map(p => '/en' + (p === '/' ? '' : p))];
const checks = [];
const blockExternal = route => {
  const url = new URL(route.request().url());
  if ((!['127.0.0.1', 'localhost'].includes(url.hostname) && url.protocol.startsWith('http')) || url.pathname.startsWith('/api/')) return route.abort();
  return route.continue();
};

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const ssr = await browser.newContext({ javaScriptEnabled: false });
    await ssr.route('**/*', blockExternal);
    const page = await ssr.newPage();
    const titles = new Set(), descriptions = new Set(), internal = new Set();
    let origin;
    for (const path of routes) {
      const response = await page.goto(base + path);
      assert.equal(response.status(), 200, path);
      const en = path === '/en' || path.startsWith('/en/');
      const meta = await page.evaluate(() => ({
        title: document.title,
        lang: document.documentElement.lang,
        h1: [...document.querySelectorAll('h1')].map(e => e.textContent),
        description: document.querySelector('meta[name="description"]')?.content,
        canonical: [...document.querySelectorAll('link[rel="canonical"]')].map(e => e.href),
        alternates: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map(e => [e.hreflang, e.href]),
        robots: document.querySelector('meta[name="robots"]')?.content,
        ogTitle: document.querySelector('meta[property="og:title"]')?.content,
        ogUrl: document.querySelector('meta[property="og:url"]')?.content,
        images: [...document.querySelectorAll('meta[property="og:image"]')].map(e => e.content),
        twitterImage: document.querySelector('meta[name="twitter:image"]')?.content,
        schemas: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(e => JSON.parse(e.textContent)['@graph'] || []),
        content: document.querySelector('main').innerText,
        links: [...document.querySelectorAll('a[href]')].map(e => e.getAttribute('href')),
      }));
      assert.equal(meta.lang, en ? 'en' : 'ru', path + ' document language');
      assert.equal(meta.h1.length, 1, path + ' H1');
      assert.ok(meta.h1[0].trim());
      assert.ok(meta.content.length > 800, path + ' useful content without JavaScript');
      assert.ok(meta.description?.length > 50, path + ' description');
      assert.ok(!titles.has(meta.title), path + ' unique title'); titles.add(meta.title);
      assert.ok(!descriptions.has(meta.description), path + ' unique description'); descriptions.add(meta.description);
      assert.equal(meta.canonical.length, 1);
      origin ||= new URL(meta.canonical[0]).origin;
      assert.equal(new URL(meta.canonical[0]).origin, origin);
      assert.equal(new URL(meta.canonical[0]).pathname, path);
      assert.ok(!/noindex/.test(meta.robots), path + ' indexable');
      assert.equal(meta.ogTitle, meta.title);
      assert.equal(new URL(meta.ogUrl).href, new URL(meta.canonical[0]).href);
      assert.equal(meta.images.length, 1, path + ' one share image');
      assert.equal(new URL(meta.images[0]).origin, origin);
      assert.equal(new URL(meta.images[0]).pathname, (en ? '/en' : '') + '/opengraph-image');
      assert.ok(meta.twitterImage);
      const ruPath = en ? path.slice(3) || '/' : path;
      const alts = Object.fromEntries(meta.alternates);
      assert.deepEqual(Object.keys(alts).sort(), ['en', 'ru', 'x-default']);
      assert.equal(new URL(alts.ru).pathname, ruPath);
      assert.equal(new URL(alts.en).pathname, '/en' + (ruPath === '/' ? '' : ruPath));
      assert.equal(alts['x-default'], alts.ru);
      assert.ok(meta.schemas.some(s => s['@type'] === 'Organization'));
      if (path.includes('/cases/jarvis')) {
        const crumbs = meta.schemas.find(s => s['@type'] === 'BreadcrumbList');
        assert.equal(crumbs.itemListElement.length, 3);
        assert.ok(meta.content.includes('Rhema OS'));
        assert.ok(meta.content.includes('JARVIS'));
      }
      if (path.includes('/services/')) {
        assert.equal(meta.schemas.filter(s => s['@type'] === 'Service').length, 1);
        const crumbs = meta.schemas.find(s => s['@type'] === 'BreadcrumbList');
        assert.equal(crumbs.itemListElement.length, 3);
      }
      for (const href of meta.links) if (href?.startsWith('/') && !href.startsWith('//')) internal.add(new URL(href, base).pathname);
      checks.push({ path, title: meta.title, ssr: true, metadata: true });
    }
    for (const path of internal) {
      if (/^\/cases\/(besty|mayak|jarvis|financefamily|church-analytics|garajw|sigmaup)\/[a-z-]+\.png$/.test(path)) {
        const asset = await page.request.get(base + path);
        assert.equal(asset.status(), 200, path + ' screenshot');
        assert.match(asset.headers()['content-type'], /image\/png/);
      } else assert.ok(routes.includes(path), 'Internal link resolves to a published page: ' + path);
    }
    const xml = await (await page.request.get(base + '/sitemap.xml')).text();
    const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
    assert.deepEqual(locations.sort(), [...routes].sort());
    assert.ok(!xml.includes('<lastmod>'), 'No fabricated modification dates');
    const robots = await (await page.request.get(base + '/robots.txt')).text();
    assert.ok(robots.includes('Sitemap: ' + origin + '/sitemap.xml'));
    assert.ok(!robots.includes('Disallow: /demo'));
    await page.goto(base + '/demo');
    assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/);
    for (const path of ['/missing-seo-check', '/en/missing-seo-check', '/services/missing-seo-check', '/en/services/missing-seo-check']) {
      const response = await page.request.get(base + path);
      assert.equal(response.status(), 404, path + ' real 404');
    }
    await page.goto(base + '/en/services/ai-agents?utm_source=qa');
    assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute('href')).search, '');
    await ssr.close();

    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    await context.route('**/*', blockExternal);
    const ui = await context.newPage();
    const errors = [];
    ui.on('pageerror', error => errors.push(error.message));
    const visualRoutes = ['/', '/en', '/services', '/en/services', '/services/ai-agents', '/en/services/ai-agents', '/services/business-automation', '/en/services/business-platforms', '/en/about', '/en/cases', '/en/how-we-work', '/cases/jarvis', '/en/cases/jarvis', '/cases/besty', '/en/cases/besty', '/cases/mayak', '/en/cases/mayak', '/cases/financefamily', '/en/cases/financefamily', '/cases/church-analytics', '/en/cases/church-analytics', '/cases/garajw', '/en/cases/garajw', '/cases/sigmaup', '/en/cases/sigmaup'];
    const axe = [];
    for (const path of visualRoutes) {
      await ui.goto(base + path, { waitUntil: 'networkidle' });
      for (const width of [320, 390, 768, 1024, 1440]) {
        await ui.setViewportSize({ width, height: 1000 });
        await ui.evaluate(() => document.fonts.ready);
        const overflow = await ui.evaluate(() => [...document.querySelectorAll('header *, main *')].filter(el => {
          if (el instanceof SVGElement && el.ownerSVGElement) return false;
          const r = el.getBoundingClientRect(), st = getComputedStyle(el);
          return r.width > 0 && r.right > innerWidth + 2 && st.position !== 'absolute';
        }).map(el => el.tagName + '.' + el.className).slice(0, 8));
        assert.deepEqual(overflow, [], path + ' overflow at ' + width);
      }
      if (['/en', '/services/ai-agents', '/en/services/ai-agents', '/en/about', '/cases/jarvis', '/en/cases/jarvis', '/cases/besty', '/en/cases/besty', '/cases/mayak', '/en/cases/mayak', '/cases/financefamily', '/en/cases/financefamily', '/cases/church-analytics', '/en/cases/church-analytics', '/cases/garajw', '/en/cases/garajw', '/cases/sigmaup', '/en/cases/sigmaup'].includes(path)) {
        for (const width of [390, 1440]) {
          await ui.setViewportSize({ width, height: 1000 });
          const result = await new AxeBuilder({ page: ui }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
          axe.push({ path, width, violations: result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })) });
          assert.deepEqual(result.violations.map(v => v.id), [], path + ' accessibility at ' + width);
          await ui.screenshot({ path: `${out}/seo-${path.replaceAll('/', '-')}-${width}.png` });
        }
      }
    }
    await ui.goto(base + '/services/ai-agents');
    await ui.getByRole('link', { name: 'Switch to English' }).click();
    await ui.waitForURL(base + '/en/services/ai-agents');
    assert.equal(await ui.locator('html').getAttribute('lang'), 'en');
    await ui.getByRole('link', { name: 'Перейти на русский' }).click();
    await ui.waitForURL(base + '/services/ai-agents');
    assert.equal(await ui.locator('html').getAttribute('lang'), 'ru');
    await ui.goto(base + '/en');
    await ui.setViewportSize({ width: 390, height: 844 });
    await ui.getByRole('button', { name: 'Open menu' }).click();
    await ui.keyboard.press('Escape');
    assert.equal(await ui.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded'), 'false');
    const form = ui.locator('form');
    await form.getByLabel('Your name').fill('Local QA');
    await form.getByLabel('Email, Telegram or phone').fill('qa@example.com');
    await form.getByLabel('What would you like to simplify?').fill('Local English form check with mocked delivery.');
    await form.getByRole('checkbox').check();
    await ui.route('**/api/contact', route => route.fulfill({ status: 500, contentType: 'application/json', body: '{}' }));
    await form.getByRole('button', { name: 'Discuss my project' }).click();
    await form.getByRole('alert').waitFor();
    assert.match(await form.getByRole('alert').innerText(), /could not send/);
    assert.equal(await form.getByLabel('Your name').inputValue(), 'Local QA');
    await ui.unroute('**/api/contact');
    await ui.route('**/api/contact', route => {
      assert.equal(route.request().postDataJSON().consent, true);
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
    });
    await form.getByRole('button', { name: 'Discuss my project' }).click();
    await ui.getByRole('heading', { name: 'Request received' }).waitFor();
    assert.deepEqual(errors, []);
    fs.writeFileSync(`${out}/seo-checks.json`, JSON.stringify({ checks, links: [...internal], sitemap: locations.length, responsive: visualRoutes, accessibility: axe, languageSwitch: true, englishForm: 'failure and retry checked with mocked API', errors }, null, 2));
    console.log('PASS: 34 SSR pages, canonical/hreflang/OG/schema, sitemap, robots, screenshots, 404, 125 responsive checks, 36 accessibility audits, language switch, EN form (mock API).');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
