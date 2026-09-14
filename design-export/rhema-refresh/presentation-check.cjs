const { chromium } = require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/playwright');
const AxeBuilder = require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/@axe-core/playwright').default;
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
 const browser = await chromium.launch({channel:'chrome',headless:true});
 const results=[];
 try {
  const context=await browser.newContext({reducedMotion:'reduce'});
  await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1' && !new URL(r.request().url()).pathname.startsWith('/api/') ? r.continue():r.abort());
  const page=await context.newPage();
  for(const locale of ['', '/en']) for(const slug of (process.env.CASE_SLUGS || 'besty,mayak,financefamily,church-analytics,jarvis,garajw,sigmaup,radar').split(',')) {
   for(const width of [1440,390,320]) {
    await page.setViewportSize({width,height:1000});
    await page.goto(`${process.env.QA_BASE||'http://127.0.0.1:3100'}${locale}/cases/${slug}`,{waitUntil:'networkidle'});
    assert.equal(await page.locator('h1').count(),1);
    assert.ok(await page.evaluate(()=>[document.documentElement,document.querySelector('#scroll-root')].every(e=>!e||e.scrollWidth<=e.clientWidth+1)),`${slug} overflow ${width}`);
    const buttons=page.locator('#screens button[aria-pressed]');
    const count=await buttons.count();
    const originals=new Set();
    for(let i=0;i<count;i++) {
     await buttons.nth(i).click();
     assert.equal(await buttons.nth(i).getAttribute('aria-pressed'),'true');
     assert.equal(await page.locator('#screens button[aria-pressed="true"]').count(),1);
     const img=page.locator('#product-screen-preview img');
     await img.scrollIntoViewIfNeeded(); await img.evaluate(e=>e.decode());
     originals.add(await page.locator('#product-screen-preview a').getAttribute('href'));
    }
    assert.equal(originals.size,count);
    for(const img of await page.locator('main img').all()) {await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());}
    if(width===390) {
     const audit=await new AxeBuilder({page}).analyze();
     assert.deepEqual(audit.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[],`${locale}/${slug} accessibility`);
    }
    if(!locale && width!==320) {
     const target=count?page.locator('[id="product-screen-preview"]'):page.locator('main figure').first();
     await target.scrollIntoViewIfNeeded();
     await page.screenshot({path:`design-export/rhema-refresh/presentation-${slug}-${width}.png`});
    }
    results.push({locale:locale||'ru',slug,width,stages:count});
   }
  }
  fs.writeFileSync('design-export/rhema-refresh/presentation-checks.json',JSON.stringify(results,null,2));
  console.log(`Passed ${results.length} responsive page checks and ${results.filter(r=>r.width===390).length} accessibility audits`);
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
