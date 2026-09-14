import CaseCard from './CaseCard';
import Link from 'next/link';
import { websiteCases, type WebsiteCaseSlug } from '@/lib/website-cases';
import { localizedPath, type SiteLocale } from '@/lib/seo';
import ContactPanel from './ContactPanel';
import Reveal from './Reveal';
import { PageStructuredData } from './StructuredData';
import { WebsiteCaseOpening, WebsiteCaseScreens } from './WebsiteCasePresentation';
import s from './Editorial.module.css';
import c from './WebsiteCases.module.css';

export function WebsiteCaseTeaser({ slug, locale = 'ru', anchor = false, heading = 'h2' }: { slug: WebsiteCaseSlug; locale?: SiteLocale; anchor?: boolean; heading?: 'h2' | 'h3' }) {
  return <CaseCard slug={slug} locale={locale} anchor={anchor} heading={heading} />;
}

export function WebsiteCaseCollection({ locale = 'ru' }: { locale?: SiteLocale }) {
  return <div className={c.collection}><WebsiteCaseTeaser slug="garajw" locale={locale} anchor /><WebsiteCaseTeaser slug="sigmaup" locale={locale} anchor /></div>;
}

export default function WebsiteCaseStudy({ slug, locale = 'ru' }: { slug: WebsiteCaseSlug; locale?: SiteLocale }) {
  const en = locale === 'en';
  const copy = websiteCases[slug][locale];
  return <Reveal><PageStructuredData title={copy.title} description={copy.description} path={`/cases/${slug}`} locale={locale} parent={{ name: en ? 'Projects' : 'Проекты', path: '/cases' }} />
    <div className={`${s.container} ${c[slug]}`}>
      <nav className={c.breadcrumbs} aria-label={en ? 'Breadcrumb' : 'Хлебные крошки'}><ol><li><Link href={localizedPath('/', locale)}>{en ? 'Home' : 'Главная'}</Link></li><li><Link href={localizedPath('/cases', locale)}>{en ? 'Projects' : 'Проекты'}</Link></li><li aria-current="page">{copy.name}</li></ol></nav>
      <header className={c.hero}><span className={c.eyebrow}>{copy.eyebrow}</span><div className={c.heroCopy}><div><p className={c.brand}>{copy.name}<span aria-hidden="true">↗</span></p><h1>{copy.title}</h1></div><div><p>{copy.intro}</p><div className={c.actions}><a className={s.button} href="#contact">{en ? 'I want a similar solution' : 'Хочу похожее решение'}<span aria-hidden="true">↗</span></a><a className={s.textLink} href={copy.url} target="_blank" rel="noopener noreferrer">{en ? 'Visit the website' : 'Открыть сайт'} ↗</a></div></div></div></header>
      <WebsiteCaseOpening slug={slug} locale={locale} />
      <section className={c.story} data-reveal><div><span className={s.kicker}>{en ? 'The task' : 'Задача бизнеса'}</span><h2>{en ? 'Help a visitor decide.' : 'Помочь человеку сделать выбор.'}</h2><p>{copy.challenge}</p></div><div><span className={s.kicker}>{en ? 'What we built' : 'Что сделали'}</span><h2>{en ? 'A clear path through the website.' : 'Понятный путь по сайту.'}</h2><p>{copy.solution}</p></div></section>
      <section className={c.screens} id="screens" data-reveal><div className={s.sectionHeading}><div><span className={s.kicker}>{en ? 'Inside the website' : 'Внутри сайта'}</span><h2>{en ? 'Show the details that matter.' : 'Показать то, что важно клиенту.'}</h2></div><p>{en ? 'Actual public pages in Russian. Open an image to see the details.' : 'Реальные экраны сайта. Откройте изображение, чтобы рассмотреть детали.'}</p></div><WebsiteCaseScreens slug={slug} locale={locale} /></section>
      <section className={c.features} data-reveal><div className={s.sectionHeading}><div><span className={s.kicker}>{en ? 'What the visitor can do' : 'Что может посетитель'}</span><h2>{en ? 'From interest to a next step.' : 'От интереса к следующему шагу.'}</h2></div></div><div className={s.scenarioGrid}>{copy.features.map((feature, i) => <article className={s.scenarioShell} key={feature.title}><div className={s.scenarioCard}><span className={s.stepNumber}>0{i + 1}</span><h3>{feature.title}</h3><p>{feature.text}</p></div></article>)}</div></section>
      <section className={c.outcome} data-reveal><span className={c.eyebrow}>{en ? 'The result' : 'Результат работы'}</span><h2>{copy.resultTitle}</h2><p>{copy.result}</p><div className={c.actions}><Link className={s.textLink} href={localizedPath('/services/business-platforms', locale)}>{en ? 'Websites and business tools' : 'Сайты и сервисы для бизнеса'} ↗</Link><Link className={s.textLink} href={localizedPath(`/cases/${slug === 'garajw' ? 'sigmaup' : 'garajw'}`, locale)}>{en ? 'Another website project' : 'Ещё один пример сайта'} ↗</Link></div></section>
      <ContactPanel key={slug} locale={locale} projectName={copy.name} />
    </div>
  </Reveal>;
}
