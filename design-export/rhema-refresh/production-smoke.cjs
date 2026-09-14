const {chromium}=require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base='https://rhema-ai-agency-amber.vercel.app';
(async()=>{
 const paths=['/','/en','/cases','/en/cases','/sitemap.xml','/robots.txt','/opengraph-image','/en/opengraph-image'];
 for(const language of ['','/en']) for(const slug of ['besty','mayak','financefamily','church-analytics','garajw','sigmaup','jarvis']) paths.push(`${language}/cases/${slug}`);
 const checks=await Promise.all(paths.map(async path=>{const r=await fetch(base+path);assert.equal(r.status,200,path);const body=await r.text();if(path==='/')assert.ok(body.includes('Меньше рутины'));return {path,status:r.status};}));
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await page.route('**/*',route=>{const u=new URL(route.request().url());return u.hostname==='rhema-ai-agency-amber.vercel.app'&&!u.pathname.startsWith('/api/')?route.continue():route.abort();});
 await page.goto(base+'/cases/financefamily',{waitUntil:'networkidle'});
 const button=page.locator('#screens button[aria-pressed]').nth(2);
 await button.click();assert.equal(await button.getAttribute('aria-pressed'),'true');
 const img=page.locator('#product-screen-preview img');await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());
 assert.ok(await page.evaluate(()=>document.querySelector('#scroll-root').scrollWidth<=innerWidth));
 await page.screenshot({path:'design-export/rhema-refresh/production-mobile.png'});
 fs.writeFileSync('design-export/rhema-refresh/production-smoke.json',JSON.stringify({base,checkedAt:new Date().toISOString(),checks,mobileGallery:'passed'},null,2));
 console.log('Public production verified: '+checks.length+' URLs, mobile gallery and optimized screenshot.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
