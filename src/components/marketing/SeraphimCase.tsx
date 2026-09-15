import Image from 'next/image';
import Link from 'next/link';
import { localizedPath, type SiteLocale } from '@/lib/seo';
import ContactPanel from './ContactPanel';
import { PageStructuredData } from './StructuredData';
import Reveal from './Reveal';
import s from './Editorial.module.css';
import c from './Seraphim.module.css';

export const seraphimTitle = {ru:'SERAPHIM — цифровой офис с 38 AI-агентами',en:'SERAPHIM — a digital office with 38 AI agents'};
export const seraphimDescription = {ru:'Почта, маркетинг, продажи, финансы и задачи команды в цифровом офисе. Обзор SERAPHIM с реальными экранами отделов и базы знаний.',en:'Email, marketing, sales, finance and team tasks in a digital office. Explore SERAPHIM departments and knowledge base through actual product screens.'};

export default function SeraphimCase({locale='ru'}:{locale?:SiteLocale}){
 const en=locale==='en';
 const departments=en?[
  ['Email','Incoming messages and drafts for clients, vendors, contractors and the internal team.','Emails Lead · Client Emails · Vendor Emails'],
  ['Marketing','Research, content preparation, newsletters, graphics, video and advertising tasks.','Marketing Lead · Research · Video Editor'],
  ['Sales','Lead enrichment, routing, follow-ups and proposal preparation.','Lead Enricher · Follow Ups · Proposals'],
  ['Finance','Roles for invoices, payments and reconciliation.','Accounting Lead · Invoicing · Reconciliation'],
  ['Production','Project coordination, delivery and quality assurance roles.','Delivery Lead · Project Co-ordinator · Quality Assurance'],
  ['Operations','Internal reporting, compliance and operational coordination.','Operations Lead · Internal Reporting · Compliance Checker'],
 ]:[
  ['Почта','Входящие письма и черновики ответов для клиентов, поставщиков, подрядчиков и команды.','Emails Lead · Client Emails · Vendor Emails'],
  ['Маркетинг','Исследования, подготовка контента, рассылки, графика, видео и рекламные задачи.','Marketing Lead · Research · Video Editor'],
  ['Продажи','Уточнение данных о лидах, распределение обращений, повторные контакты и подготовка предложений.','Lead Enricher · Follow Ups · Proposals'],
  ['Финансы','Роли для работы со счетами, платежами и сверкой операций.','Accounting Lead · Invoicing · Reconciliation'],
  ['Производство','Координация проектов, выполнение работ и контроль качества.','Delivery Lead · Project Co-ordinator · Quality Assurance'],
  ['Операции','Внутренняя отчётность, проверки и координация ежедневной работы.','Operations Lead · Internal Reporting · Compliance Checker'],
 ];
 const screens=en?[
  ['email','Email department','A shared inbox, separate roles','The department view brings together the selected agent, its conversation and the task queue. The team can see who is handling a message and what stage the task has reached.'],
  ['marketing','Marketing department','From research to content tasks','Research, design, newsletters, social content and video roles share a department. The task list shows assignments, progress and completed work.'],
  ['brain','The Brain','Knowledge connected to work','A graph links notes, clients and areas of work. Search and connections help navigate the shared context instead of treating every task as a new conversation.'],
 ]:[
  ['email','Отдел почты','Общий ящик — разные роли','На одном экране собраны выбранный агент, диалог с ним и очередь задач. Видно, кто работает с письмом и на каком этапе находится задача.'],
  ['marketing','Отдел маркетинга','От исследования к задачам по контенту','Исследование, дизайн, рассылки, соцсети и видео собраны в отдел. В списке задач видны поручения, ход выполнения и завершённые работы.'],
  ['brain','База знаний — The Brain','Знания связаны с работой','Граф объединяет заметки, клиентов и направления работы. Поиск и связи помогают находить общий контекст и возвращаться к накопленным материалам.'],
 ];
 return <Reveal><PageStructuredData title={seraphimTitle[locale]} description={seraphimDescription[locale]} path="/cases/seraphim" locale={locale} parent={{name:en?'Projects':'Проекты',path:'/cases'}}/><div className={s.container}>
  <nav className={c.breadcrumbs} aria-label={en?'Breadcrumb':'Хлебные крошки'}><Link href={localizedPath('/cases',locale)}>{en?'Projects':'Проекты'}</Link><span>/ SERAPHIM</span></nav>
  <header className={c.hero}><span className={s.kicker}>SERAPHIM / BETA</span><h1>{en?<>A digital office.<br /><em>38 AI agents at work.</em></>:<>Цифровой офис.<br /><em>38 AI-агентов в работе.</em></>}</h1><p>{en?'A visual workspace where agents have roles, departments and a shared task panel. The office brings together everyday work and the knowledge it depends on.':'Рабочая среда, в которой у агентов есть роли, отделы и общая панель задач. Офис объединяет повседневную работу и знания, которые нужны для её выполнения.'}</p><div className={s.actions}><a className={s.button} href="#contact">{en?'Discuss it on a free call':'Разобрать на бесплатной диагностике'}<span aria-hidden="true">↗</span></a><a className={s.textLink} href="#screens">{en?'Explore the screens':'Посмотреть экраны'} ↓</a></div></header>
  <figure className={c.overview}><a href="/cases/seraphim/office.png" target="_blank" rel="noopener noreferrer" aria-label={en?'Open the full office screenshot':'Открыть общий экран офиса полностью'}><Image src="/cases/seraphim/office.png" width={1274} height={663} alt={en?'SERAPHIM digital office with departments and task statuses':'Цифровой офис SERAPHIM с отделами и статусами задач'} sizes="(max-width:800px) 95vw, 1240px" preload/></a><figcaption>{en?'Actual interface. Open the image to inspect details.':'Реальный интерфейс. Нажмите на изображение, чтобы рассмотреть детали.'}</figcaption></figure>
  <section className={c.story}><div><span className={s.kicker}>{en?'The task':'Задача'}</span><h2>{en?'Give agent work a shared structure.':'Собрать работу агентов в понятную систему.'}</h2><p>{en?'When tasks and conversations grow, it becomes harder to track responsibilities and progress. The office groups work by department and keeps shared knowledge close at hand.':'Когда задач и переписок становится больше, сложнее следить за ответственными и ходом работы. Офис группирует задачи по отделам и объединяет их с общей базой знаний.'}</p></div><div><span className={s.kicker}>{en?'What the team sees':'Что видит команда'}</span><h2>{en?'Roles, conversations and task statuses.':'Роли, диалоги и статусы задач.'}</h2><p>{en?'Open a department, select an agent and review its work. The shared task panel includes queued, scheduled, active and completed states.':'Можно открыть отдел, выбрать агента и посмотреть его работу. Общая панель показывает очередь, запланированные, текущие и завершённые задачи.'}</p></div></section>
  <section className={c.departments}><div className={s.sectionHeading}><div><span className={s.kicker}>{en?'Roles visible in the office':'Роли, которые видны в офисе'}</span><h2>{en?<>Familiar departments.<br />A clear purpose.</>:<>Знакомые отделы.<br />Понятные задачи.</>}</h2></div><p>{en?'Examples of roles shown in the supplied interface.':'Примеры ролей, показанных в интерфейсе.'}</p></div><div className={c.departmentGrid}>{departments.map(([title,text,roles])=><article key={title}><h3>{title}</h3><p>{text}</p><small>{roles}</small></article>)}</div></section>
  <section id="screens" className={c.screens}>{screens.map(([id,label,title,text],i)=><article key={id}><div className={c.screenCopy}><span className={s.kicker}>0{i+1} / {label}</span><h2>{title}</h2><p>{text}</p><a className={s.textLink} href={`/cases/seraphim/${id}.png`} target="_blank" rel="noopener noreferrer">{en?'Open full screen':'Рассмотреть экран полностью'} ↗</a></div><a className={c.screenImage} href={`/cases/seraphim/${id}.png`} target="_blank" rel="noopener noreferrer" aria-label={en?`Open ${label}`:`Открыть: ${label}`}><Image src={`/cases/seraphim/${id}.png`} width={id === 'email' ? 1288 : id === 'brain' ? 1275 : 1274} height={id === 'email' ? 678 : id === 'brain' ? 658 : 665} alt={label} sizes="(max-width:800px) 95vw, 1240px"/></a></article>)}</section>
  <ContactPanel locale={locale} projectName={en?'SERAPHIM — 38 AI agents':'SERAPHIM — 38 AI-агентов'}/>
 </div></Reveal>;
}
