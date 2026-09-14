const { chromium } = require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/playwright');
const assert = require('node:assert/strict');
const base = process.env.QA_BASE || 'http://127.0.0.1:3103';
(async () => {
 const browser = await chromium.launch({ channel:'chrome', headless:true });
 try {
  const context = await browser.newContext({ viewport:{width:1440,height:1000}, reducedMotion:'reduce' });
  await context.route('**/*',route=>{const u=new URL(route.request().url());return (!['127.0.0.1','localhost'].includes(u.hostname)||u.pathname.startsWith('/api/'))?route.abort():route.continue()});
  await context.addInitScript(()=>localStorage.setItem('cookie_consent','1'));
  const page=await context.newPage();
  for(const slug of ['besty','mayak','financefamily','church-analytics']) {
   await page.goto(`${base}/cases/${slug}`,{waitUntil:'networkidle'});
   const loadedHero=await page.locator('main header img').evaluate(img=>img.complete&&img.naturalWidth>0);
   assert.equal(loadedHero,true,slug+' actual hero image loads');
   await page.screenshot({path:`design-export/rhema-refresh/${slug}-hero-desktop.png`});
   await page.locator('#screens').scrollIntoViewIfNeeded();
   const gallery=page.locator('#screens img');
   for(const img of await gallery.all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate(el=>el.decode()); }
   assert.equal(await gallery.count(),['mayak','church-analytics'].includes(slug)?2:3);
   await page.locator('#screens').scrollIntoViewIfNeeded();
   await page.screenshot({path:`design-export/rhema-refresh/${slug}-gallery-desktop.png`});
   const [popup]=await Promise.all([page.waitForEvent('popup'),page.locator('#screens a[target="_blank"]').first().click()]);
   await popup.waitForLoadState();
   assert.match(popup.url(),new RegExp('/cases/'+slug+'/[a-z]+\\.png$'));
   await popup.close();
   await page.getByRole('link',{name:'Switch to English'}).click();
   await page.waitForURL(`${base}/en/cases/${slug}`);
   assert.equal(await page.locator('html').getAttribute('lang'),'en');
   await page.setViewportSize({width:390,height:844});
   await page.screenshot({path:`design-export/rhema-refresh/${slug}-en-mobile.png`});
   await page.setViewportSize({width:1440,height:1000});
  }
  await page.goto(base+'/cases#besty',{waitUntil:'networkidle'});
  assert.equal(await page.locator('#besty').count(),1);
  assert.equal(await page.locator('#mayak').count(),1);
  assert.equal(await page.locator('#financefamily').count(),1);
  assert.equal(await page.locator('#church-analytics').count(),1);
  await page.locator('#church-analytics').scrollIntoViewIfNeeded();
  await page.screenshot({path:'design-export/rhema-refresh/church-analytics-card-desktop.png'});
  await page.locator('#financefamily').scrollIntoViewIfNeeded();
  await page.screenshot({path:'design-export/rhema-refresh/financefamily-card-desktop.png'});
  await page.locator('#besty').scrollIntoViewIfNeeded();
  await page.screenshot({path:'design-export/rhema-refresh/product-case-cards.png'});
  console.log('PASS: original screenshots load, full-size links open, all case languages switch, legacy Besty anchor preserved.');
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1});
