import Link from 'next/link';
import type { SiteLocale } from '@/lib/seo';
import s from './Editorial.module.css';
import c from './DiscoveryIntro.module.css';

export default function DiscoveryIntro({ locale = 'ru' }: { locale?: SiteLocale }) {
  const en = locale === 'en';
  const pains = en ? [
    ['Enquiries slip through the cracks', 'Messages arrive in different places. Following up depends on someone remembering.'],
    ['Routine work fills the day', 'Reports, proposals and repeated answers take time away from customers.'],
    ['Everything depends on you', 'You bring the numbers together, check the work and remind people what comes next.'],
    ['You need a website or app', 'The idea is there. The features, budget and starting point are still unclear.'],
  ] : [
    ['Заявки теряются', 'Клиенты пишут в разные места. Ответить и напомнить о себе получается не всегда.'],
    ['Рутина съедает день', 'Отчёты, коммерческие предложения и одинаковые ответы отнимают время у команды.'],
    ['Всё держится на вас', 'Вы сводите цифры, проверяете работу и напоминаете, что нужно сделать дальше.'],
    ['Нужен сайт или приложение', 'Идея есть. Какие функции нужны, сколько это стоит и с чего начать — пока непонятно.'],
  ];
  return <>
    <section className={c.hero}>
      <div><span className={s.kicker}>{en ? 'Rhema AI / AI and software for business' : 'Rhema AI / Внедрение AI и разработка для бизнеса'}</span>
        <h1>{en ? <>Find out what AI<br />can do <em>for your business.</em></> : <>Узнайте, что AI<br />может сделать <em>для вашего бизнеса.</em></>}</h1>
        <p className={c.lead}>{en ? 'Answer four questions about your business for a free initial analysis. See where you could start, then discuss implementation, timing and costs with us on a call.' : 'Ответьте на четыре вопроса о своём бизнесе и получите бесплатный предварительный разбор. Покажем, с чего можно начать. Внедрение, сроки и стоимость обсудим на созвоне.'}</p>
        <div className={s.actions}><a className={s.button} href="#diagnosis">{en ? 'Get a free diagnosis' : 'Получить бесплатную диагностику'}<span aria-hidden="true">↗</span></a><a className={s.textLink} href="#cases">{en ? 'See our projects' : 'Посмотреть наши проекты'} ↓</a></div>
        <span className={s.note}>{en ? '4 questions · Results on this page · No obligation to buy' : '4 вопроса · Результат на сайте · Без обязательства покупать'}</span>
      </div>
      <aside className={c.offer} aria-label={en ? 'What the free diagnosis includes' : 'Что входит в бесплатную диагностику'}>
        <div className={c.offerTop}><span>{en ? 'Your first step' : 'Первый шаг'}</span><strong>0 ₽</strong></div>
        <h2>{en ? 'From “where do we start?” to a clear next step.' : 'Из «непонятно, с чего начать» — в понятный следующий шаг.'}</h2>
        <ol>{(en ? [ ['Understand the task', 'How things work now and where your team gets stuck.'], ['Choose an approach', 'An AI helper, automation, a website or your own app.'], ['Discuss the next step', 'What to build first, what inputs we need and how we will estimate the work.'] ] : [ ['Разберём задачу', 'Как всё устроено сейчас и на что уходит время команды.'], ['Подберём подход', 'AI-помощник, автоматизация, сайт или своё приложение.'], ['Обсудим первый шаг', 'Что делать сначала, какие материалы нужны и как оценим разработку.'] ]).map(([title, text], i) => <li key={title}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        <p className={c.offerNote}>{en ? 'The diagnosis is free. Development is a separate decision after the call.' : 'Диагностика бесплатная. Разработка — отдельное решение после созвона.'}</p>
      </aside>
    </section>
    <section className={c.pains}><div className={s.sectionHeading}><div><span className={s.kicker}>{en ? 'Does this sound familiar?' : 'Узнаёте свою ситуацию?'}</span><h2>{en ? <>Business is moving.<br />But too much is manual.</> : <>Бизнес работает.<br />Но слишком многое — вручную.</>}</h2></div></div><div className={c.painGrid}>{pains.map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><p className={c.closing}>{en ? 'Bring one real example to the call. We will work through it together.' : 'На созвоне начнём с одного реального примера из вашей работы. Разбираться в AI заранее не нужно.'}</p></section>
  </>;
}

export function ClearServices({locale='ru'}:{locale?:SiteLocale}) {
 const en=locale==='en';
 const offers=en ? [
  ['AI assistants','Answer questions, work with your materials and prepare drafts for review.','/services/ai-agents'],
  ['Workflow automation','Connect enquiries, calls, reports and follow-ups into one process.','/services/business-automation'],
  ['Business websites','Explain your offer, show your work and help visitors send an enquiry.','/services/business-platforms'],
  ['Apps and platforms','Client portals, online schools, team workspaces and Telegram apps.','/services/business-platforms'],
 ] : [
  ['AI-помощники','Отвечают на вопросы, работают с вашими материалами и готовят черновики для проверки.','/services/ai-agents'],
  ['Автоматизация бизнеса','Связываем заявки, созвоны, отчёты и напоминания в один рабочий процесс.','/services/business-automation'],
  ['Сайты для бизнеса','Показываем вашу услугу и работы, помогаем посетителю выбрать и оставить заявку.','/services/business-platforms'],
  ['Приложения и платформы','Кабинеты клиентов, онлайн-школы, рабочие системы и приложения в Telegram.','/services/business-platforms'],
 ];
 return <section className={c.services} id="services"><div className={s.sectionHeading}><div><span className={s.kicker}>{en?'What we build':'Что мы делаем'}</span><h2>{en?'A solution for your task.':'Решение под вашу задачу.'}</h2></div><p>{en?'You do not have to choose the technology. We will work out the right approach on the free call.':'Вам не нужно выбирать технологию. На бесплатной диагностике разберёмся, какой вариант подходит.'}</p></div><div className={c.servicesGrid}>{offers.map(([title,text,path],i)=><article key={title}><span className={s.kicker}>0{i+1}</span><h3>{title}</h3><p>{text}</p><Link className={s.textLink} href={`${en?'/en':''}${path}`}>{en?'What is included':'Что входит'} ↗</Link></article>)}</div><a className={s.button} href="#diagnosis">{en?'Help me choose — free diagnosis':'Помогите выбрать — бесплатная диагностика'}<span aria-hidden="true">↗</span></a></section>;
}
