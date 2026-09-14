const {chromium}=require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/playwright');
const AxeBuilder=require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/@axe-core/playwright').default;
const assert=require('node:assert/strict');const fs=require('node:fs');
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});const results=[];try{
 const context=await b.newContext({reducedMotion:'reduce'});
 await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'&&!new URL(r.request().url()).pathname.startsWith('/api/')?r.continue():r.abort());
 await context.addInitScript(()=>localStorage.setItem('cookie_consent','0'));
 const page=await context.newPage();
 for(const lang of ['', '/en']) for(const path of ['', '/services','/services/ai-agents','/services/business-automation','/services/business-platforms','/cases/radar']) for(const width of [320,390,1440]){
 await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:3110'+lang+(path||'/'),{waitUntil:'networkidle'});
 assert.equal(await page.locator('h1').count(),1);
 const picker=page.locator('[aria-controls="task-recommendation"]');
 for(let i=0;i<await picker.count();i++){await picker.nth(i).click();assert.equal(await picker.nth(i).getAttribute('aria-pressed'),'true');assert.equal(await page.locator('[aria-controls="task-recommendation"][aria-pressed="true"]').count(),1);}
 const overflow=await page.evaluate(()=>{const e=document.querySelector('#scroll-root');return {width:e.clientWidth,scroll:e.scrollWidth};});
 if(overflow.scroll>overflow.width+1) throw Error(`${lang}${path} width ${width}: ${JSON.stringify(overflow)}`);
 if(width===390){const audit=await new AxeBuilder({page}).analyze();assert.deepEqual(audit.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[],`${lang}${path} axe`);}
 if(!lang&&width!==320){const t=await picker.count()?page.locator('#task-recommendation'):page.locator('main header');await t.scrollIntoViewIfNeeded();for(const img of await t.locator('img').all())await img.evaluate(e=>e.decode());await page.screenshot({path:`design-export/rhema-refresh/upgrade-${path.replaceAll('/','-')||'home'}-${width}.png`});}
 results.push({lang,path,width});
 }
 await page.goto('http://127.0.0.1:3110/cases/radar');await page.locator('header a[href="#contact"]').first().click();assert.ok(page.url().endsWith('/cases/radar#contact'));assert.ok(await page.locator('#project-name').isVisible());
 await page.locator('#project-name').fill('Test customer');await page.locator('#project-contact').fill('test@example.com');await page.locator('#project-business').fill('A test project, not a real enquiry.');await page.locator('input[name="consent"]').check();
 await page.route('**/api/contact',r=>r.fulfill({status:500,contentType:'application/json',body:'{}'}));await page.locator('#contact button[type="submit"]').click();await page.locator('#project-error').waitFor();assert.equal(await page.locator('#project-name').inputValue(),'Test customer');
 await page.route('**/api/contact',r=>r.fulfill({status:200,contentType:'application/json',body:'{"success":true}'}));await page.locator('#contact button[type="submit"]').click();await page.locator('#contact [role="status"]').waitFor();
 const a=await b.newContext();let requests=0;await a.route('**/*',r=>{const u=new URL(r.request().url());if(u.hostname==='mc.yandex.ru'){requests++;return r.fulfill({contentType:'application/javascript',body:'/* mocked analytics transport */'});}return u.hostname==='127.0.0.1'&&!u.pathname.startsWith('/api/')?r.continue():r.abort();});const ap=await a.newPage();await ap.goto('http://127.0.0.1:3111/en');await ap.getByRole('button',{name:'No thanks',exact:true}).click();await ap.reload();assert.equal(requests,0);assert.equal(await ap.getByRole('button',{name:'Accept',exact:true}).count(),0);
 await ap.evaluate(()=>{localStorage.removeItem('cookie_consent');window.dispatchEvent(new Event('rhema-cookie-consent'));});await ap.getByRole('button',{name:'Accept',exact:true}).click();await ap.waitForFunction(()=>window.ym?.a?.some(a=>a[1]==='hit'));assert.equal(requests,1);
 await ap.locator('[aria-controls="task-recommendation"]').nth(3).click();await ap.locator('#task-recommendation a[href="/en/cases/radar"]').click();await ap.waitForFunction(()=>window.ym?.a?.some(a=>a[2]==='case_view'));
 const events=await ap.evaluate(()=>window.ym.a.map(a=>Array.from(a)));assert.equal(events.filter(e=>e[1]==='hit'&&e[2]==='/en/cases/radar').length,1);assert.ok(events.some(e=>e[2]==='task_selected'));assert.ok(!JSON.stringify(events).includes('test@example.com'));
 fs.writeFileSync('design-export/rhema-refresh/ux-upgrade-checks.json',JSON.stringify({results,events,forms:'mocked retry and success passed',consent:'decline persists; accept starts tracking'},null,2));console.log(`Passed ${results.length} responsive checks, 12 axe audits, local contact navigation, mocked form retry and analytics consent/events.`);
}finally{await b.close();}})().catch(e=>{console.error(e);process.exit(1)});
