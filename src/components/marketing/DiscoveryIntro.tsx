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
        <h1>{en ? <>Less routine work.<br /><em>More time<br />for customers.</em></> : <>Меньше рутины.<br /><em>Больше времени<br />на клиентов.</em></>}</h1>
        <p className={c.lead}>{en ? 'We build AI assistants that help with enquiries, reports and content. We create websites and apps where customers can order and your team can get work done.' : 'Создаём AI-помощников, которые помогают с заявками, отчётами и контентом. Разрабатываем сайты и приложения, где клиентам удобно заказывать, а команде — работать.'}</p>
        <div className={s.actions}><a className={s.button} href="#diagnosis">{en ? 'Get a free diagnosis' : 'Получить бесплатную диагностику'}<span aria-hidden="true">↗</span></a><a className={s.textLink} href="#cases">{en ? 'See our projects' : 'Посмотреть наши проекты'} ↓</a></div>
        <span className={s.note}>{en ? '4 questions about your business → an initial analysis on this page' : '4 вопроса о вашем бизнесе → предварительный разбор на сайте'}</span>
      </div>
      <aside className={c.offer} aria-label={en ? 'Examples of work you can delegate' : 'Примеры задач, которые можно передать программе'}>
        <div className={c.offerTop}><span>{en ? 'What this looks like in practice' : 'Как это выглядит в работе'}</span><span aria-hidden="true">↙</span></div>
        <h2>{en ? 'The routine gets done. You decide what comes next.' : 'Повторяющуюся работу — программе. Решения — вам.'}</h2>
        <ol>{(en ? [ ['A customer sends a message', 'An assistant answers common questions and collects the details your team needs.'], ['A call ends', 'You get a summary, next steps and a draft proposal to review.'], ['You need a report', 'Information from agreed sources is brought together in one place for you to check.'] ] : [ ['Клиент написал', 'Помощник отвечает на типовые вопросы и собирает детали заявки для вашей команды.'], ['Созвон закончился', 'У вас — краткие итоги, следующие шаги и черновик предложения для проверки.'], ['Нужен отчёт', 'Данные из согласованных источников собираются в одном месте — остаётся проверить итог.'] ]).map(([title, text], i) => <li key={title}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        <p className={c.offerNote}>{en ? 'We agree what runs automatically and what needs your approval before building.' : 'До разработки согласуем, что программа делает сама, а что — только после вашего подтверждения.'}</p>
      </aside>
    </section>
    <section className={c.pains} id="your-task"><div className={s.sectionHeading}><div><span className={s.kicker}>{en ? 'For owners and their teams' : 'Для владельцев бизнеса и их команд'}</span><h2>{en ? <>The business grows.<br />The manual work follows.</> : <>Дела растут.<br />Ручная работа — тоже.</>}</h2></div><p>{en ? 'A service business, a workshop, an online school or an expert team: start with the task that keeps taking up your day.' : 'Сервисный бизнес, мастерская, онлайн-школа или команда эксперта: начнём с задачи, которая регулярно отнимает ваше время.'}</p></div><div className={c.painGrid}>{pains.map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><p className={c.closing}>{en ? 'Show us one example of how you work today. We will work out what can be delegated to software and how to check the result.' : 'Покажите один пример из вашей работы. Разберёмся, что можно поручить программе и как проверить результат. Разбираться в AI заранее не нужно.'}</p></section>
  </>;
}

export function ClearServices({locale='ru'}:{locale?:SiteLocale}) {
 const en=locale==='en';
 const offers=en ? [
  ['Give customers an answer','An AI assistant uses your materials to answer common questions, collect an enquiry and pass complex requests to a person. Your team can focus on what needs their attention.','/services/ai-agents'],
  ['Keep track of work without copying data','Connect enquiries, call summaries, reports and reminders. Give the team one place to find customer context and the next step.','/services/business-automation'],
  ['Prepare content with a starting point','Tools for finding topics, writing scripts and preparing drafts. Your team reviews the material and decides what to publish.','/services/ai-agents'],
  ['Make ordering and delivery easier','Websites, customer accounts and learning platforms. Customers can understand the offer, send an enquiry and access their materials.','/services/business-platforms'],
 ] : [
  ['Дать клиенту ответ','AI-помощник отвечает на типовые вопросы по вашим материалам, собирает заявку и передаёт сложное человеку. Команда подключается там, где нужно её внимание.','/services/ai-agents'],
  ['Держать дела под контролем','Связываем заявки, итоги звонков, отчёты и напоминания. Команда видит договорённости и следующий шаг по клиенту, без постоянного переноса данных вручную.','/services/business-automation'],
  ['Готовить контент с опорой на идеи','Создаём инструменты для поиска тем, подготовки сценариев и черновиков публикаций. У команды есть материал для доработки и выбора, что выпускать.','/services/ai-agents'],
  ['Сделать заказ и работу удобнее','Разрабатываем сайты, кабинеты клиентов и учебные платформы. Клиент может разобраться в предложении, оставить заявку и получить доступ к своим материалам.','/services/business-platforms'],
 ];
 return <section className={c.services} id="services"><div className={s.sectionHeading}><div><span className={s.kicker}>{en?'Where we can help':'Что берём на себя'}</span><h2>{en?'Four ways to simplify your work.':'Четыре задачи, с которыми мы помогаем.'}</h2></div><p>{en?'Start with one recurring task. We design the solution, connect the tools it needs and test it with your team’s examples.':'Начнём с одной повторяющейся задачи. Спроектируем решение, подключим нужные программы и проверим на примерах вашей команды.'}</p></div><div className={c.servicesGrid}>{offers.map(([title,text,path],i)=><article key={title}><span className={s.kicker}>0{i+1}</span><h3>{title}</h3><p>{text}</p><Link className={s.textLink} href={`${en?'/en':''}${path}`}>{en?'How we build it':'Как это реализуем'} ↗</Link></article>)}</div><div className={c.experience}><span className={s.kicker}>{en?'Experience from our own work':'Опыт из собственной работы'}</span><h3>{en?'We use these tools in our agency, too.':'Сами работаем с инструментами, которые создаём.'}</h3><p>{en?'We develop Rhema OS for customer work and call analysis, and Radar for content preparation. This experience helps us plan where automation is useful and where a person needs to review the result.':'Развиваем Rhema OS для работы с клиентами и разбора звонков, Radar — для подготовки контента. Этот опыт помогает проектировать процессы: где полезна автоматизация, а где нужна проверка человека.'}</p><div className={s.actions}><Link className={s.textLink} href={`${en?'/en':''}/cases/jarvis`}>{en?'Inside Rhema OS':'Как устроена Rhema OS'} ↗</Link><Link className={s.textLink} href={`${en?'/en':''}/cases/radar`}>{en?'See Radar in action':'Как работает Radar'} ↗</Link></div></div></section>;
}
