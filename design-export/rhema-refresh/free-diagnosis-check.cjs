const {chromium}=require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/playwright');
const Axe=require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/@axe-core/playwright').default;
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'chrome'});try{
 const context=await browser.newContext({reducedMotion:'reduce'});await context.addInitScript(()=>localStorage.setItem('cookie_consent','0'));
 await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'&&!new URL(r.request().url()).pathname.startsWith('/api/')?r.continue():r.abort());
 const page=await context.newPage();const base=process.env.QA_BASE||'http://127.0.0.1:3114';let checks=0;
 for(const route of ['/','/en','/services','/en/services','/cases','/en/cases','/cases/seraphim','/en/cases/seraphim'])for(const width of [320,390,768,1024,1440]){
  await page.setViewportSize({width,height:1000});await page.goto(base+route,{waitUntil:'domcontentloaded'});await page.locator('h1').waitFor();
  assert.equal(await page.locator('h1').count(),1);assert.ok(!(await page.locator('main').innerText()).includes('<br')); assert.ok(await page.evaluate(()=>[document.documentElement,document.querySelector('#scroll-root')].every(e=>e.scrollWidth<=e.clientWidth+1)),`${route} overflow at ${width}`);
  const header=page.locator('header').first();assert.ok(await header.locator('a[href$="#contact"]').count());
  assert.equal(await page.locator('#project-business').getAttribute('required'),null);
  if(width===390){const a=await new Axe({page}).analyze();assert.deepEqual(a.violations.map(v=>v.id),[],route);}
  if(['/','/cases/seraphim'].includes(route)&&[390,1440].includes(width))await page.screenshot({path:`design-export/rhema-refresh/free-diagnosis-${route==='/'?'home':'seraphim'}-${width}.png`});checks++;
 }
 for(const prefix of ['', '/en']){
  await page.goto(base+prefix,{waitUntil:'domcontentloaded'});await page.locator('a[href="#contact"]').first().click();
  await page.locator('#project-name').fill('QA Example');await page.locator('#project-contact').fill('@example');await page.locator('#contact input[name="consent"]').check();
  let attempts=0;await page.route('**/api/contact',async r=>{const body=r.request().postDataJSON();assert.ok(/диагностику|diagnosis/.test(body.business));assert.ok(body.business.length>=10&&body.business.length<=2000);attempts++;await r.fulfill({status:attempts===1?500:200,contentType:'application/json',body:'{}'});});
  await page.locator('#contact button[type="submit"]').click();await page.locator('#project-error').waitFor();assert.equal(await page.locator('#project-name').inputValue(),'QA Example');await page.locator('#contact button[type="submit"]').click();await page.getByRole('heading',{name:prefix?'Request received':'Заявка принята',exact:true}).waitFor();assert.equal(attempts,2);await page.unroute('**/api/contact');
 }
 await page.goto(base+'/cases/seraphim',{waitUntil:'domcontentloaded'});assert.ok((await page.locator('#project-business').inputValue()).includes('SERAPHIM'));assert.equal(await page.locator('a[href="/cases/seraphim/office.png"]').count(),1);
 console.log(`${checks} responsive routes; 8 axe audits; RU/EN free-diagnosis requests with optional task and retry verified using mocked API.`);
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
