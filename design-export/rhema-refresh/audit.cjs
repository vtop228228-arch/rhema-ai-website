
const { chromium }=require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/playwright');
const AxeBuilder=require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/@axe-core/playwright').default;
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1050},reducedMotion:'reduce'}); const page=await context.newPage();
 await page.route('**/*',r=>{const u=new URL(r.request().url());return u.hostname==='127.0.0.1'?r.continue():r.abort();});
 const report=[];
 for(const route of ['/','/cases','/how-we-work','/about']){
  for(const width of [1440,390]){
   await page.setViewportSize({width,height:1050});
   await page.goto('http://127.0.0.1:3100'+route,{waitUntil:'networkidle'});
   for(const section of await page.locator('main section,main article').all()) await section.scrollIntoViewIfNeeded();
   const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   report.push({route,width,violations:result.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  }
 }
 fs.writeFileSync('design-export/rhema-refresh/accessibility.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
