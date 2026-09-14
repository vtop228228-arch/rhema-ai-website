const {chromium}=require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/playwright');
const Axe=require('C:/Users/ROG/AppData/Local/Temp/rhema-design-qa/node_modules/@axe-core/playwright').default;
const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});try{
const context=await b.newContext({reducedMotion:'reduce'});const p=await context.newPage();
await p.addInitScript(()=>localStorage.setItem('cookie_consent','0'));let checks=0;
for(const route of ['/','/en','/services','/en/services'])for(const width of [320,390,1440]){
await p.setViewportSize({width,height:1100});await p.goto((process.env.QA_BASE||'http://127.0.0.1:3112')+route);
for(let i=0;i<4;i++){
await p.locator('[aria-controls="task-recommendation"]').nth(i).click();const panel=p.locator('#task-recommendation');
assert.equal(await panel.locator('img').count(),0);assert.equal(await panel.locator('aside ol li').count(),3);
assert.equal(await panel.locator('aside a').count(),1);assert.ok(await panel.locator('aside a').getAttribute('href'));
assert.ok(await p.evaluate(()=>document.querySelector('#scroll-root').scrollWidth<=innerWidth+1));
if(route==='/'&&[390,1440].includes(width)){await panel.scrollIntoViewIfNeeded();await p.screenshot({path:`design-export/rhema-refresh/task-flow-${i}-${width}.png`});}checks++;
}
if(width===390){const r=await new Axe({page:p}).analyze();assert.deepEqual(r.violations.map(v=>v.id),[],route);}
}
console.log(`${checks} workflow states passed; 4 accessibility audits; all case links and no screenshots in the selector.`);
}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
