'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ymGoal } from '@/lib/analytics';
import { getLeadAttribution } from '@/lib/attribution';
import { diagnosisQuestions, diagnosticSummary, type DiagnosisLocale } from '@/lib/diagnostic-summary';
import s from './DiagnosticAgent.module.css';

export default function DiagnosticAgent({ locale = 'ru' }: { locale?: DiagnosisLocale }) {
 const en = locale === 'en';
 const questions = diagnosisQuestions[locale];
 const [phase,setPhase] = useState<'idle'|'questions'|'analyzing'|'result'|'done'>('idle');
 const [answers,setAnswers] = useState<string[]>(['','','','']);
 const [step,setStep] = useState(0);
 const [result,setResult] = useState('');
 const [mode,setMode] = useState<'ai'|'guided'>('guided');
 const [error,setError] = useState('');
 const [sending,setSending] = useState(false);
 const lock = useRef(false);
 const session = useRef('');
 const answerField = useRef<HTMLTextAreaElement>(null);
 const resultTitle = useRef<HTMLHeadingElement>(null);
 useEffect(() => { if(phase==='questions') answerField.current?.focus(); else if(phase==='result'||phase==='done') resultTitle.current?.focus(); }, [phase,step]);
 const dialog = () => questions.map((q,i)=>`${q}\n${answers[i]}`).join('\n\n');
 async function analyze() {
  if(lock.current) return;
  lock.current=true;setError('');setPhase('analyzing');
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),28000);
  try {
   const history: {role:'user'|'assistant';content:string}[]=[{role:'user',content:en?'Start the business diagnosis.':'Начать диагностику бизнеса.'}];
   questions.forEach((q,i)=>history.push({role:'assistant',content:q},{role:'user',content:answers[i]}));
   const response=await fetch('/api/diagnose',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({history,forceMap:true,locale}),signal:controller.signal});
   if(!response.ok) throw new Error('unavailable');
   const body=await response.json();
   if(typeof body.data?.reply!=='string'||!body.data.reply.trim()) throw new Error('invalid');
   const nextMode=body.data.mode==='ai'?'ai':'guided';
   setResult(body.data.reply.slice(0,4000));setMode(nextMode);
   ymGoal('agent_map',{mode:nextMode,locale});
  } catch {
   setResult(diagnosticSummary(answers,locale));setMode('guided');
   ymGoal('agent_map',{mode:'guided',locale});
  } finally { clearTimeout(timer);lock.current=false;setPhase('result'); }
 }
 async function submit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();if(lock.current)return;
  const form=new FormData(event.currentTarget);
  const name=String(form.get('name')||'').trim();const contact=String(form.get('contact')||'').trim();
  if(name.length<2||contact.length<3||form.get('consent')!=='on'){setError(en?'Check your name, contact and consent.':'Проверьте имя, контакт и согласие на обработку данных.');return;}
  lock.current=true;setSending(true);setError('');
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),25000);
  try {
   session.current ||= crypto.randomUUID();
   const response=await fetch('/api/diagnose/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:session.current,name,contact,consent:true,sphere:answers[0].slice(0,200),pain:answers[1],dialog:dialog(),mapText:result,attribution:getLeadAttribution()}),signal:controller.signal});
   if(!response.ok)throw new Error('failed');
   setPhase('done');ymGoal('agent_lead',{locale});ymGoal('diagnosis_request',{method:'interactive',locale});
  } catch {setError(en?'Could not confirm delivery. Your answers are still here. Try again or message us on Telegram.':'Не удалось подтвердить отправку. Ответы сохранены на этой странице. Попробуйте ещё раз или напишите нам в Telegram.');}
  finally {clearTimeout(timer);lock.current=false;setSending(false);}
 }
 const examples = en ? ['For example: a furniture workshop, selling custom kitchens.','For example: preparing quotes after customer calls.','For example: 20 enquiries a week, around 6 hours of work.','For example: Telegram, spreadsheets and manual reminders.'] : ['Например: мебельная мастерская, делаем кухни на заказ.','Например: готовить коммерческие предложения после звонков.','Например: 20 обращений в неделю, около 6 часов работы.','Например: Telegram, таблицы и напоминания вручную.'];
 return <div className={s.shell} data-analytics-private>
  <div className={s.top}><span>{en?'Your business / free diagnosis':'Ваш бизнес / бесплатная диагностика'}</span><span>0 ₽</span></div>
  {phase==='idle'&&<div className={s.body}><h3>{en?'Try it with your task.':'Попробуйте на своей задаче.'}</h3><p>{en?'Answer four questions. You will see an initial analysis here, then you can leave your contact details to discuss implementation.':'Ответьте на четыре вопроса. Предварительный разбор появится здесь — затем можно оставить контакт и обсудить внедрение.'}</p><p className={s.note}>{en?'No account needed. Please do not include passwords or customer details.':'Без регистрации. Не указывайте пароли и данные ваших клиентов.'}</p><button className={s.primary} data-analytics="diagnosis_start" onClick={()=>{setPhase('questions');ymGoal('agent_start',{locale});}}>{en?'Start free diagnosis':'Начать бесплатную диагностику'} ↗</button></div>}
  {phase==='questions'&&<form className={s.body} onSubmit={e=>{e.preventDefault();if(!answers[step].trim())return;ymGoal('diagnosis_step',{step:String(step+1),locale});if(step<3)setStep(step+1);else void analyze();}}>
   <p className={s.note}>{en?'Question':'Вопрос'} {step+1} / 4</p><div className={s.progress} aria-hidden="true"><span style={{width:`${(step+1)*25}%`}} /></div>
   <label className={s.question} htmlFor="diagnosis-answer">{questions[step]}</label>
   <textarea ref={answerField} id="diagnosis-answer" required maxLength={500} rows={4} value={answers[step]} placeholder={examples[step]} onChange={e=>setAnswers(answers.map((a,i)=>i===step?e.target.value:a))} />
   {step===2&&<button type="button" className={s.text} data-analytics="diagnosis_volume_unknown" onClick={()=>setAnswers(answers.map((a,i)=>i===2?(en?'Not sure yet':'Пока не знаю'):a))}>{en?'I do not know yet':'Пока не знаю точных цифр'}</button>}
   <div className={s.actions}>{step>0&&<button type="button" className={s.secondary} data-analytics="diagnosis_back" onClick={()=>setStep(step-1)}>{en?'Back':'Назад'}</button>}<button className={s.primary} data-analytics="diagnosis_next" disabled={!answers[step].trim()}>{step===3?(en?'Show my analysis':'Получить разбор'):(en?'Next':'Дальше')} ↗</button></div>
  </form>}
  {phase==='analyzing'&&<div className={s.body} role="status"><div className={s.progress}><span className={s.loading}/></div><h3>{en?'Reviewing your answers…':'Разбираем ваши ответы…'}</h3><p>{en?'Matching your task with a possible first solution. This can take up to 30 seconds.':'Подбираем возможный первый шаг под вашу задачу. Это может занять до 30 секунд.'}</p></div>}
  {phase==='result'&&<div className={s.body}><h3 tabIndex={-1} ref={resultTitle}>{en?'Your starting point':'С чего можно начать'}</h3><p className={s.note}>{mode==='ai'?(en?'Initial AI analysis. Feasibility and costs need to be checked with our team.':'Предварительный AI-разбор. Возможность внедрения и стоимость уточним с командой.'):(en?'AI is temporarily unavailable. Below is a guided summary of your answers.':'AI сейчас недоступен. Ниже — сводка ваших ответов и направление для обсуждения.')}</p><div className={s.result}>{result}</div>
   {mode==='guided'&&<button className={s.secondary} data-analytics="diagnosis_retry" onClick={()=>void analyze()}>{en?'Retry AI analysis':'Повторить AI-разбор'}</button>}
   <form className={s.lead} onSubmit={submit} aria-busy={sending}><h4>{en?'Want to put this into practice?':'Хотите внедрить это у себя?'}</h4><p>{en?'Leave your contact. We will arrange a free call and discuss the plan using these answers.':'Оставьте контакт — согласуем бесплатный созвон и обсудим план на основе ваших ответов.'}</p>
   <label>{en?'Your name':'Ваше имя'}<input name="name" required minLength={2} maxLength={100} autoComplete="name" /></label><label>{en?'Email, Telegram or phone':'Telegram или телефон'}<input name="contact" required minLength={3} maxLength={255} autoComplete="off" /></label>
   <label className={s.consent}><input type="checkbox" name="consent" required/><span>{en?'I agree to the processing of my data under the ':'Согласен на обработку данных по '}<Link href={en?'/en/privacy':'/privacy'} target="_blank" rel="noopener noreferrer">{en?'privacy policy':'политике конфиденциальности'}</Link>.</span></label>
   {error&&<p role="alert">{error}</p>}<button className={s.primary} data-analytics="diagnosis_submit" disabled={sending}>{sending?(en?'Sending…':'Отправляем…'):(en?'Discuss implementation — free':'Обсудить внедрение — бесплатно')} ↗</button><a className={s.text} href="https://t.me/RhemaAI_support" data-analytics="diagnosis_telegram" target="_blank" rel="noopener noreferrer">{en?'Or message us on Telegram':'Или написать нам в Telegram'}</a></form></div>}
  {phase==='done'&&<div className={s.body} role="status"><h3 ref={resultTitle} tabIndex={-1}>{en?'Your request is received.':'Заявка принята.'}</h3><p>{en?'We received your answers and contact details. We will get in touch to arrange a free call.':'Получили ваши ответы и контакт. Свяжемся с вами, чтобы согласовать бесплатный созвон.'}</p></div>}
 </div>;
}
