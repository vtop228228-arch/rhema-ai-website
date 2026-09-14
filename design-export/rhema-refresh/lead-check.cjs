
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ts=require('typescript'),zod=require('zod');
const source=fs.readFileSync('src/app/api/diagnose/lead/route.ts','utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const valid={sessionId:'test-session-123',name:'Local Test',contact:'@local_test',consent:true};
async function run({body=valid,env={},crm={ok:false,skipped:true},fetchOk=true}={}){
 const exports={},calls=[];
 const context={exports,process:{env},console:{error(){}},fetch:async(url)=>{calls.push(url);return {ok:fetchOk,status:fetchOk?200:500,text:async()=>'',json:async()=>({})};},require:(name)=>{
  if(name==='zod')return zod;
  if(name==='next/server')return {NextResponse:{json:(body,init)=>({body,status:init?.status??200})}};
  if(name==='@/lib/rate-limit')return {rateLimit:()=>true,getClientIp:()=> 'test'};
  if(name==='@/lib/crm')return {sendLeadToCRM:async()=>crm};
  if(name==='@/lib/escape-html')return {escapeHtml:s=>s};
  throw Error(name);
 }};
 vm.runInNewContext(js,context);
 return {result:await exports.POST({json:async()=>body}),calls};
}
(async()=>{
 const checks=[];
 let r=await run({body:{...valid,consent:undefined}});assert.equal(r.result.status,400);assert.equal(r.calls.length,0);checks.push('Missing consent rejected before delivery');
 r=await run();assert.equal(r.result.status,500);assert.equal(r.calls.length,0);checks.push('All destinations unconfigured returns failure');
 r=await run({env:{TELEGRAM_BOT_TOKEN:'test-token',TELEGRAM_CHAT_ID:'test-chat'},fetchOk:false});assert.equal(r.result.status,500);checks.push('Failed Telegram plus skipped destinations returns failure');
 r=await run({env:{TELEGRAM_BOT_TOKEN:'test-token',TELEGRAM_CHAT_ID:'test-chat'}});assert.equal(r.result.status,200);assert.equal(r.calls.length,1);checks.push('Successful Telegram delivery returns success');
 r=await run({crm:{ok:true}});assert.equal(r.result.status,200);checks.push('Successful CRM delivery returns success');
 fs.writeFileSync('design-export/rhema-refresh/lead-checks.json',JSON.stringify({checks,note:'Isolated handlers, mocked delivery, no external requests.'},null,2));
 console.log(checks.join('\n'));
})().catch(e=>{console.error(e);process.exit(1)});
