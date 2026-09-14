
const { chromium } = require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
 const out = path.resolve('design-export/rhema-refresh');
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1050}, reducedMotion:'reduce'});
 await context.route('**/*', route => { const u=new URL(route.request().url()); if(!['127.0.0.1','localhost'].includes(u.hostname) && u.protocol.startsWith('http')) return route.abort(); return route.continue(); });
 const page=await context.newPage();
 const errors=[];
 page.on('pageerror', error=>errors.push(error.message));
 const checks=[];
 for(const route of ['/','/cases','/how-we-work','/about','/privacy','/offer']){
   const response=await page.goto('http://127.0.0.1:3100'+route,{waitUntil:'networkidle'});
   assert.equal(response.status(),200,route);
   assert.equal(await page.locator('h1').count(),1,route+' h1');
   checks.push(route+' returns 200 and has one H1');
 }
 await page.goto('http://127.0.0.1:3100/',{waitUntil:'networkidle'});
 const accept=page.getByRole('button',{name:'Принять',exact:true}); if(await accept.isVisible()) await accept.click();
 for(const width of [1440,1024,768,390,320]){
   await page.setViewportSize({width,height:1050});
   await page.evaluate(()=>document.fonts.ready);
   const overflow=await page.evaluate(()=>[...document.querySelectorAll('main *')].filter(el=>{const r=el.getBoundingClientRect(); const st=getComputedStyle(el); return !(el instanceof SVGElement && el.ownerSVGElement) && r.width>0 && r.right>innerWidth+2 && st.position!=='absolute';}).map(el=>el.tagName+'.'+el.className).slice(0,8));
   assert.deepEqual(overflow,[],width+' overflow');
   await page.screenshot({path:path.join(out,'home-'+width+'.png'),fullPage:false});
   checks.push('No horizontal overflow at '+width+'px');
 }
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('button',{name:'Открыть меню'}).click();
 assert.equal(await page.getByRole('button',{name:'Закрыть меню'}).getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Escape');
 assert.equal(await page.getByRole('button',{name:'Открыть меню'}).getAttribute('aria-expanded'),'false');
 checks.push('Mobile menu opens and closes with Escape');
 await page.locator('summary').first().click();
 assert.equal(await page.locator('details').first().getAttribute('open'),'');
 checks.push('FAQ expands');
 const form=page.locator('form').first();
 await form.getByLabel('Как к вам обращаться').fill('Тестовая проверка');
 await form.getByLabel('Telegram или телефон').fill('@local_test');
 await form.getByLabel('Что хотите упростить?').fill('Проверка формы локально без отправки внешних сообщений.');
 await form.getByRole('checkbox').check();
 let sent;
 await page.route('**/api/contact',async route=>{sent=route.request().postDataJSON(); await route.fulfill({status:500,contentType:'application/json',body:'{}'});});
 await form.getByRole('button',{name:'Обсудить мой проект'}).click();
 await form.getByRole('alert').waitFor();
 assert.equal(sent.consent,true);
 assert.equal(await form.getByLabel('Как к вам обращаться').inputValue(),'Тестовая проверка');
 await page.unroute('**/api/contact');
 await page.route('**/api/contact',route=>route.fulfill({status:200,contentType:'application/json',body:'{"success":true}'}));
 await form.getByRole('button',{name:'Обсудить мой проект'}).click();
 await page.getByRole('heading',{name:'Заявка принята'}).waitFor();
 checks.push('Contact error preserves input; retry succeeds; consent included (mock API)');
 await page.route('**/api/diagnose',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({data:{reply:'Предварительный разбор: автоматизация заявок.',options:[],stage:'map'}})}));
 await page.getByRole('button',{name:'НАЧАТЬ ДИАГНОСТИКУ'}).click();
 await page.getByLabel('Ваше имя',{exact:true}).fill('Тест диагностики');
 await page.getByLabel('Telegram или телефон',{exact:true}).fill('@diagnostic_test');
 const send=page.getByRole('button',{name:'ПОЛУЧИТЬ ДИАГНОСТИКУ'});
 await send.click();
 await page.getByText('Подтвердите согласие на обработку данных.').waitFor();
 await page.getByRole('checkbox').check();
 await page.route('**/api/diagnose/lead',async route=>{assert.equal(route.request().postDataJSON().consent,true); await route.fulfill({status:200,contentType:'application/json',body:'{"success":true}'});});
 await send.click();
 await page.getByText('Свяжемся по указанному контакту. Спасибо!').waitFor();
 checks.push('Diagnosis requires explicit consent and reaches success (mock API)');
 await page.setViewportSize({width:1440,height:1050});
 await page.goto('http://127.0.0.1:3100/',{waitUntil:'networkidle'});
 const sections=await page.locator('main section').all();
 for(const section of sections) await section.scrollIntoViewIfNeeded();
 await page.evaluate(()=>{const root=document.querySelector('#scroll-root');root.style.height='auto';root.style.overflow='visible';});
 await page.screenshot({path:path.join(out,'home-desktop-full.png'),fullPage:true});
 for(const route of ['/cases','/how-we-work','/about']){
   await page.goto('http://127.0.0.1:3100'+route,{waitUntil:'networkidle'});
   await page.screenshot({path:path.join(out,route.slice(1)+'-desktop.png')});
 }
 assert.deepEqual(errors,[],'Browser errors');
 checks.push('No browser runtime errors');
 fs.writeFileSync(path.join(out,'checks.json'),JSON.stringify({checks,errors,note:'API submissions mocked; no real leads sent.'},null,2));
 console.log(JSON.stringify({checks,errors,out},null,2));
 await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
