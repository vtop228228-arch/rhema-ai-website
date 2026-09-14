const {chromium}=require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/playwright');
const Axe=require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/@axe-core/playwright').default;
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'chrome'});try{
 const context=await browser.newContext({reducedMotion:'reduce'});
 await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'&&!new URL(r.request().url()).pathname.startsWith('/api/')?r.continue():r.abort());
 await context.addInitScript(()=>localStorage.setItem('cookie_consent','0')); const page=await context.newPage(); const base='http://127.0.0.1:3113';
 let checks=0;
 for(const prefix of ['', '/en']) for(const route of ['/cases','/cases/besty','/cases/mayak','/cases/financefamily','/cases/church-analytics','/cases/radar','/cases/garajw','/cases/sigmaup','/cases/jarvis']) for(const width of [320,390,1440]){
  await page.setViewportSize({width,height:1000});await page.goto(base+prefix+route,{waitUntil:'domcontentloaded'});await page.locator('h1').waitFor();
  assert.ok(await page.evaluate(()=>document.querySelector('#scroll-root').scrollWidth<=innerWidth+1),route);
  if(route!='/cases') {assert.ok((await page.locator('#project-business').inputValue()).length>15);assert.ok(await page.locator('a[href="#contact"]').count());}
  if(route==='/cases'&&width===390) {const audit=await new Axe({page}).analyze();assert.deepEqual(audit.violations.map(v=>v.id),[]);}
  if(!prefix&&route==='/cases'&&width!==320) {await page.locator('#garajw').scrollIntoViewIfNeeded();await page.screenshot({path:`design-export/rhema-refresh/case-cards-${width}.png`});}
  if(!prefix&&route==='/cases'&&width!==320) {await page.locator('#financefamily').scrollIntoViewIfNeeded();await page.screenshot({path:"design-export/rhema-refresh/finance-cover-"+width+'.png'});} checks++;
 }
 await page.goto(base+'/cases/financefamily',{waitUntil:'domcontentloaded'});
 await page.locator('#project-name').fill('QA Example');await page.locator('#project-contact').fill('@example');
 const initial=await page.locator('#project-business').inputValue();await page.locator('#project-business').fill(initial+' Нужен учёт для команды.');
 await page.locator('input[name="consent"]').check();let attempts=0;
 await page.route('**/api/contact',async r=>{const body=r.request().postDataJSON();assert.ok(body.business.includes('Financefamily'));assert.ok(body.business.includes('учёт для команды'));attempts++;await r.fulfill({status:attempts===1?500:200,contentType:'application/json',body:'{}'});});
 await page.locator('#contact button[type="submit"]').click();await page.locator('#project-error').waitFor();assert.ok((await page.locator('#project-business').inputValue()).includes('учёт для команды'));
 await page.locator('#contact button[type="submit"]').click();await page.getByRole('heading',{name:'Заявка принята',exact:true}).waitFor();assert.equal(attempts,2);
 console.log(`${checks} responsive case checks; 2 axe audits; prefilled context and edited retry payload verified with mocked API.`);
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
