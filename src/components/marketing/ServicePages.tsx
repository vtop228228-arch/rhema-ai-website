import { ClearServices } from './DiscoveryIntro';
import ServiceBrief from './ServiceBrief';
import ProjectExamples from './ProjectExamples';
import Link from 'next/link';
import { services, type Service } from '@/lib/services';
import { servicesEn } from '@/lib/services-en';
import { localizedPath, type SiteLocale } from '@/lib/seo';
import ContactPanel from './ContactPanel';
import Reveal from './Reveal';
import { PageStructuredData } from './StructuredData';
import s from './Editorial.module.css';
import c from './Services.module.css';

function Breadcrumbs({ title, locale, detail = false }: { title: string; locale: SiteLocale; detail?: boolean }) {
  return <nav className={c.breadcrumbs} aria-label={locale === 'en' ? 'Breadcrumb' : 'Хлебные крошки'}><ol>
    <li><Link href={localizedPath('/', locale)}>{locale === 'en' ? 'Home' : 'Главная'}</Link></li>
    {detail && <li><Link href={localizedPath('/services', locale)}>{locale === 'en' ? 'Services' : 'Услуги'}</Link></li>}
    <li aria-current="page">{title}</li>
  </ol></nav>;
}

function ServiceLinks({ locale, exclude }: { locale: SiteLocale; exclude?: string }) {
  const items = locale === 'en' ? servicesEn : services;
  const estimates: Record<string, string> = locale === 'en' ? {
    'ai-agents': 'From RUB 30,000 · Initial estimate: 5–14 days for one task.',
    'business-automation': 'We estimate the price and timing after reviewing your process.',
    'business-platforms': 'Platforms from RUB 90,000 · First version: from 3 weeks.',
  } : {
    'ai-agents': 'От 30 000 ₽ · Ориентир для одной задачи: 5–14 дней.',
    'business-automation': 'Стоимость и срок рассчитываем после разбора вашей задачи.',
    'business-platforms': 'Платформы от 90 000 ₽ · Первая версия: от 3 недель.',
  };
  return <div className={c.serviceList}>{items.filter(item => item.slug !== exclude).map((item, i) =>
    <article key={item.slug} className={c.serviceRow}>
      <span className={s.kicker}>0{i + 1} / {item.eyebrow}</span>
      <div><h2><Link href={localizedPath(`/services/${item.slug}`, locale)}>{item.title}<span className={c.arrow} aria-hidden="true">↗</span></Link></h2>
        <p>{item.description}</p><span className={s.note}>{estimates[item.slug]}</span></div>
    </article>)}</div>;
}

export function ServicesPage({ locale = 'ru' }: { locale?: SiteLocale }) {
  const en = locale === 'en';
  const title = en ? 'Make everyday business tasks simpler' : 'Помогаем упростить работу бизнеса';
  const description = en ? 'Answer customer questions, pass enquiries to employees or build a website for your service. We explain the options and help you choose a useful starting point.' : 'Ответить клиенту, передать заявку менеджеру или сделать сайт для вашей услуги. Объясним варианты и поможем выбрать, с чего начать.';
  return <Reveal><PageStructuredData title={title} description={description} path="/services" locale={locale} /><div className={s.container}>
    <Breadcrumbs title={en ? 'Services' : 'Услуги'} locale={locale} />
    <header className={`${s.subHero} ${c.hero}`}><span className={s.kicker}>RHEMA / {en ? 'Services' : 'Услуги'}</span><h1>{title}</h1><p>{description}</p></header>
    <ClearServices locale={locale} />
    <section className={s.aboutSplit} data-reveal><div><span className={s.kicker}>{en ? 'Where to begin' : 'С чего начать'}</span><h2>{en ? 'Tell us what takes time.' : 'Расскажите, что занимает время.'}</h2></div><div>
      <p>{en ? 'If your team answers the same questions every day, an AI assistant may help. If people copy information between tools, we can connect those tools. If customers need somewhere to book, learn or use your service, we can build a website or app.' : 'Если команда каждый день отвечает на одинаковые вопросы, может помочь AI-помощник. Если сотрудники переносят данные между программами — соединим эти программы. Если клиентам нужно место для записи, обучения или работы с вашей услугой — создадим сайт или приложение.'}</p>
      <p>{en ? 'You do not need a technical brief. Show us an example of the work. We will explain what can be done, what we need from you and the likely cost and timing. The first discussion is free.' : 'Техническое задание не требуется. Покажите пример вашей работы. Мы объясним, что можно сделать, что понадобится от вас и каковы ориентиры по стоимости и срокам. Первое обсуждение бесплатно.'}</p>
      <Link className={s.secondary} href={localizedPath('/how-we-work', locale)}>{en ? 'How we work' : 'Как строится работа'}<span aria-hidden="true">↗</span></Link>
    </div></section><ContactPanel locale={locale} />
  </div></Reveal>;
}


export function ServicePage({ service, locale = 'ru' }: { service: Service; locale?: SiteLocale }) {
  const en = locale === 'en';
  return <Reveal><PageStructuredData title={service.title} description={service.description} path={`/services/${service.slug}`} locale={locale} service /><div className={s.container}>
    <Breadcrumbs title={service.title} locale={locale} detail />
    <header className={`${s.subHero} ${c.hero}`}><span className={s.kicker}>{service.eyebrow}</span><h1>{service.title}</h1><p>{service.intro}</p><div className={c.heroActions}><Link className={s.button} href="#contact">{en ? 'Discuss your project' : 'Обсудить задачу'}<span aria-hidden="true">↗</span></Link><Link className={s.textLink} href="#scope">{en ? 'What is included' : 'Что входит в работу'} ↓</Link></div></header>
    <ServiceBrief slug={service.slug} locale={locale} />
    <ul className={c.outcomes}>{service.outcomes.map(item => <li key={item}><span aria-hidden="true">↳</span>{item}</li>)}</ul>
    <section className={c.split} data-reveal><div><span className={s.kicker}>{en ? 'When it helps' : 'Когда это нужно'}</span><h2>{en ? 'Everyday tasks we can help with.' : 'Какие задачи можно упростить.'}</h2></div><div className={c.proseList}>{service.useCases.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className={c.split} id="scope" data-reveal><div><span className={s.kicker}>{en ? 'Price and delivery' : 'Стоимость и результат'}</span><h2>{en ? 'What is included in the work.' : 'Что входит в работу.'}</h2><p className={c.priceNote}>{service.priceNote}</p></div><div className={s.scenarioShell}><div className={s.scenarioCard}><h3>{en ? 'What you receive' : 'Что вы получаете'}</h3><ul className={c.deliverables}>{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul><p>{en ? 'Before starting, we write down what must work, how we will check it together and what support includes. We also explain any ongoing payments for AI services, website hosting and other tools.' : 'До старта записываем, что должно работать, как будем проверять результат вместе с вами и что входит в поддержку. Отдельно объясняем регулярные платежи за AI-сервисы, размещение сайта и другие программы.'}</p></div></div></section>
    <section className={c.process} data-reveal><h2>{en ? 'How we work together' : 'Как будем работать вместе'}</h2><ol className={c.processSteps}>{service.steps.map((step, i) => <li key={step.title}><span className={s.stepNumber}>0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol><Link href={localizedPath('/how-we-work', locale)} className={s.textLink}>{en ? 'Our process and support' : 'Подробнее об этапах и поддержке'} ↗</Link></section>
    <section className={c.related} data-reveal><div><span className={s.kicker}>{en ? 'From our work' : 'Наши проекты'}</span><h2>{en ? 'See examples of our work.' : 'Посмотрите примеры нашей работы.'}</h2></div><ProjectExamples ids={service.relevantProjectIds} locale={locale} /></section>
    <section className={s.faq} data-reveal><div><span className={s.kicker}>{en ? 'Before we start' : 'Перед стартом'}</span><h2>{en ? 'Questions, answered.' : 'Ответы на ваши вопросы.'}</h2></div><div>{service.faqs.map((faq, i) => <details key={faq.q}><summary><span className={s.faqNumber}>0{i + 1}</span><span>{faq.q}</span><span className={s.faqPlus} aria-hidden="true">+</span></summary><p>{faq.a}</p></details>)}</div></section>
    <section className={c.more} data-reveal><span className={s.kicker}>{en ? 'Related services' : 'Другие направления'}</span><ServiceLinks locale={locale} exclude={service.slug} /></section>
    <ContactPanel locale={locale} />
  </div></Reveal>;
}
