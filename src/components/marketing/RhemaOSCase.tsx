import Link from 'next/link';
import Image from 'next/image';
import { localizedPath, type SiteLocale } from '@/lib/seo';
import { contentByLocale } from '@/lib/rhema-os-case';
import Reveal from './Reveal';
import ContactPanel from './ContactPanel';
import RhemaOSVisual from './RhemaOSVisual';
import { PageStructuredData } from './StructuredData';
import s from './Editorial.module.css';
import c from './RhemaOS.module.css';

export default function RhemaOSCase({ locale = 'ru' }: { locale?: SiteLocale }) {
  const en = locale === 'en';
  const copy = contentByLocale[locale];
  return <Reveal>
    <PageStructuredData title={copy.title} description={copy.description} path="/cases/jarvis" locale={locale} parent={{ name: en ? 'Projects' : 'Проекты', path: '/cases' }} />
    <div className={s.container}>
      <nav className={c.breadcrumbs} aria-label={en ? 'Breadcrumb' : 'Хлебные крошки'}><ol>
        <li><Link href={localizedPath('/', locale)}>{en ? 'Home' : 'Главная'}</Link></li>
        <li><Link href={localizedPath('/cases', locale)}>{en ? 'Projects' : 'Проекты'}</Link></li>
        <li aria-current="page">Rhema OS / JARVIS</li>
      </ol></nav>
      <header className={c.hero}>
        <span className={s.kicker}>{copy.eyebrow}</span>
        <div className={c.wordmark}>Rhema OS<span aria-hidden="true">↗</span></div>
        <div className={c.heroSplit}><h1>{copy.title}</h1><div><p>{copy.intro}</p><a className={s.secondary} href="#inside">{en ? 'Explore the system' : 'Как устроена система'}<span aria-hidden="true">↓</span></a></div></div>
      <div className={s.actions}><a className={s.button} href="#contact">{en ? 'I want a similar solution' : 'Хочу похожее решение'}<span aria-hidden="true">↗</span></a></div></header>
      <figure className={c.realScreen} data-reveal>
        <div className={c.screenBar}><span><i aria-hidden="true" />Rhema OS</span><span>{en ? 'The team workspace' : 'Рабочая среда команды'}</span></div>
        <a className={c.screenOverview} href="/cases/jarvis/agents.png" target="_blank" rel="noopener noreferrer" aria-label={en ? 'Open the Rhema OS interface screenshot at full size' : 'Открыть скриншот интерфейса Rhema OS полностью'}><Image src="/cases/jarvis/agents.png" width={1290} height={684} sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 1100px) calc(100vw - 80px), 1224px" alt={en ? 'Rhema OS interface: the founder, agent hierarchy and Mission Control panel' : 'Интерфейс Rhema OS: основатель, иерархия агентов и панель Mission Control'} preload /><span className={c.screenExpand}>{en ? 'View full screen' : 'Рассмотреть экран'}<span aria-hidden="true">↗</span></span></a>
        <figcaption><span>{en ? 'The actual product interface' : 'Реальный интерфейс продукта'}</span><span>{en ? 'The team, tasks and working conversation in one place.' : 'Команда, задачи и рабочий диалог в одном месте.'}</span></figcaption>
      </figure>
      <div className={c.projectFacts}><span>JARVIS / Rhema OS</span><span>{en ? 'Our own product' : 'Собственный продукт'}</span><span>{en ? 'AI agents + business platform' : 'AI-агенты + бизнес-платформа'}</span></div>
      <section className={c.story} aria-label={en ? 'The task and the solution' : 'Задача и решение'} data-reveal>
        <div><span className={s.kicker}>{en ? 'The task' : 'Задача'}</span><h2>{en ? 'Build a shared working environment.' : 'Собрать работу в единую среду.'}</h2><p>{copy.challenge}</p></div>
        <div><span className={s.kicker}>{en ? 'What we built' : 'Что сделали'}</span><h2>{en ? 'Give agents a place in the process.' : 'Встроить агентов в процессы.'}</h2><p>{copy.solution}</p></div>
      </section>
      <section className={c.architecture} id="inside" data-reveal>
        <div><span className={s.kicker}>{en ? 'The AI helpers' : 'Команда AI-помощников'}</span><h2>{en ? 'Each helper has a task. People stay in charge.' : 'У каждого своя задача. Решение — за человеком.'}</h2><p>{en ? 'The founder sets the goal. One helper assigns tasks, another connects the working tools, and others prepare sales notes, documents or publications.' : 'Основатель задаёт цель. Один помощник распределяет задачи, другой связывает рабочие сервисы, остальные готовят материалы для продаж, документы или публикации.'}</p><p>{en ? 'The team can see what is being done and review prepared material before deciding on the next step.' : 'Команда видит, что уже сделано, и проверяет подготовленные материалы перед следующим шагом.'}</p></div>
        <RhemaOSVisual locale={locale} />
      </section>
      <section className={c.screenDetails} aria-labelledby="interface-details" data-reveal>
        <div className={s.sectionHeading}><div><span className={s.kicker}>{en ? 'A closer look' : 'Интерфейс в деталях'}</span><h2 id="interface-details">{en ? 'See who does what.' : 'Видно, кто за что отвечает.'}</h2></div><p>{en ? 'Two details from the same workspace, shown at a readable scale.' : 'Два фрагмента рабочего экрана — с акцентом на главном.'}</p></div>
        <div className={c.detailGrid}>
          <figure className={c.detailCard}>
            <a className={`${c.detailImage} ${c.networkCrop}`} href="/cases/jarvis/agents.png" target="_blank" rel="noopener noreferrer" aria-label={en ? 'Open the full screenshot containing the task coordination view' : 'Открыть полный скриншот со схемой распределения задач'}><Image src="/cases/jarvis/agents.png" width={1290} height={684} sizes="(max-width: 800px) 230vw, 1600px" alt={en ? 'Interface detail showing the founder and the task coordination roles' : 'Фрагмент интерфейса: основатель и роли, которые координируют задачи'} /><span className={c.detailExpand} aria-hidden="true">↗</span></a>
            <figcaption><span className={c.detailNumber}>01 / {en ? 'Responsibilities' : 'Распределение задач'}</span><h3>{en ? 'A goal becomes a team task.' : 'Цель превращается в задачи команды.'}</h3><p>{en ? 'The founder sets the direction. The diagram shows how the helpers are connected and which role coordinates the work.' : 'Основатель задаёт направление. На схеме видно, как связаны помощники и кто координирует работу.'}</p></figcaption>
          </figure>
          <figure className={c.detailCard}>
            <a className={`${c.detailImage} ${c.controlCrop}`} href="/cases/jarvis/agents.png" target="_blank" rel="noopener noreferrer" aria-label={en ? 'Open the full screenshot containing the working conversation' : 'Открыть полный скриншот с рабочим диалогом'}><Image src="/cases/jarvis/agents.png" width={1290} height={684} sizes="(max-width: 800px) 300vw, 2100px" alt={en ? 'Interface detail showing the Mission Control conversation panel' : 'Фрагмент интерфейса: рабочий диалог в панели Mission Control'} /><span className={c.detailExpand} aria-hidden="true">↗</span></a>
            <figcaption><span className={c.detailNumber}>02 / {en ? 'Working conversation' : 'Рабочий диалог'}</span><h3>{en ? 'Context stays close at hand.' : 'Контекст работы всегда рядом.'}</h3><p>{en ? 'The conversation sits beside the team view, so people can discuss the next step within the same workspace.' : 'Панель диалога находится рядом со схемой команды. Обсудить следующий шаг можно в той же рабочей среде.'}</p></figcaption>
          </figure>
        </div>
      </section>
      <section className={c.modules} data-reveal><div className={s.sectionHeading}><div><span className={s.kicker}>{en ? 'Inside Rhema OS' : 'Внутри Rhema OS'}</span><h2>{en ? 'One workspace. Connected functions.' : 'Одна среда. Связанные функции.'}</h2></div><p>{en ? 'From the first enquiry to a call review, content draft or agent activity log.' : 'От первого обращения до разбора звонка, черновика контента и журнала работы агента.'}</p></div>
        <div className={c.moduleList}>{copy.modules.map((module, i) => <article key={module.id} id={module.id} className={c.module}><span className={c.moduleIndex}>0{i + 1}</span><div><span className={c.moduleLabel}>{module.label}</span><h3>{module.title}</h3></div><p>{module.description}</p></article>)}</div>
      </section>
      <section className={c.workflow} data-reveal><div><span className={s.kicker}>{en ? 'A workflow in practice' : 'Сценарий работы'}</span><h2>{en ? 'From context to a next step.' : 'От контекста до следующего шага.'}</h2></div><ol>{copy.workflow.map((step, i) => <li key={step.title}><span>0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></section>
      <section className={c.outcome} data-reveal><span className={s.kicker}>{en ? 'What this gives our team' : 'Что это даёт нашей команде'}</span><h2>{en ? 'Practical experience, built into our work.' : 'Опыт, встроенный в нашу работу.'}</h2><ul>{copy.outcomes.map(item => <li key={item}><span aria-hidden="true">↳</span>{item}</li>)}</ul><p>{copy.closing}</p><div className={c.related}><Link className={s.textLink} href={localizedPath('/services/ai-agents', locale)}>{en ? 'AI agent development' : 'Разработка AI-агентов'} ↗</Link><Link className={s.textLink} href={localizedPath('/services/business-platforms', locale)}>{en ? 'Custom business platforms' : 'Бизнес-платформы под ключ'} ↗</Link></div></section>
      <ContactPanel locale={locale} projectName="Rhema OS / JARVIS" />
    </div>
  </Reveal>;
}
