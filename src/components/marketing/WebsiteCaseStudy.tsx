import Image from 'next/image';
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
  const copy = websiteCases[slug][locale];
  const shot = copy.screens[0];
  const Heading = heading;
  if (slug === 'garajw') {
    const en = locale === 'en';
    const href = localizedPath('/cases/garajw', locale);
    return <article className={`${c.teaser} ${c.garajw} ${c.jewelryTeaser}`} id={anchor ? slug : undefined} data-reveal>
      <Link className={c.jewelryCover} href={href} aria-label={en ? 'Explore the D. Garabazhii website project' : 'Посмотреть кейс сайта D. Garabazhii'}>
        <span className={c.jewelryMain}><Image src="/cases/garajw/emerald-ring-photo.webp" alt={en ? 'A gold ring with a green stone in the jeweller’s workshop' : 'Золотое кольцо с зелёным камнем в ювелирной мастерской'} width={640} height={1138} sizes="(max-width: 800px) 65vw, 400px" /></span>
        <span className={c.jewelryAside}>
          <span className={c.jewelryDetail}><span>{en ? 'Bespoke jewellery' : 'Украшения на заказ'}</span><strong>{en ? <>It starts<br />with a stone.</> : <>Всё начинается<br />с камня.</>}</strong></span>
          <span className={c.jewelryPalette}><Image src="/cases/garajw/gem-palette-photo.webp" alt={en ? 'A selection of coloured stones for a bespoke piece' : 'Подборка цветных камней для будущего украшения'} width={640} height={1138} sizes="(max-width: 800px) 30vw, 220px" /></span>
        </span>
      </Link>
      <div className={`${c.teaserCopy} ${c.jewelryCopy}`}>
        <span className={c.eyebrow}>{en ? 'Jewellery workshop website' : 'Сайт ювелирной мастерской'}</span>
        <Heading>{copy.name}</Heading>
        <p>{en ? 'The maker’s work, the production process and a bespoke enquiry — all on one website.' : 'Работы мастера, этапы изготовления и заявка на украшение — на одном сайте.'}</p>
        <Link className={s.secondary} href={href}>{en ? 'See the project' : 'Посмотреть кейс'}<span aria-hidden="true">↗</span></Link>
      </div>
    </article>;
  }
  return <article className={`${c.teaser} ${c[slug]}`} id={anchor ? slug : undefined} data-reveal>
    <Link className={c.teaserImage} href={localizedPath(`/cases/${slug}`, locale)} aria-label={locale === 'en' ? `Explore the ${copy.name} project` : `Посмотреть кейс ${copy.name}`}><Image src={shot.src} alt={shot.caption} width={shot.width} height={shot.height} sizes="(max-width: 800px) calc(100vw - 48px), 600px" /></Link>
    <div className={c.teaserCopy}><span className={c.eyebrow}>{copy.eyebrow}</span><Heading>{copy.name}</Heading><p>{copy.title}</p><Link className={s.secondary} href={localizedPath(`/cases/${slug}`, locale)}>{locale === 'en' ? 'See the project' : 'Посмотреть кейс'}<span aria-hidden="true">↗</span></Link></div>
  </article>;
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
      <header className={c.hero}><span className={c.eyebrow}>{copy.eyebrow}</span><div className={c.heroCopy}><div><p className={c.brand}>{copy.name}<span aria-hidden="true">↗</span></p><h1>{copy.title}</h1></div><div><p>{copy.intro}</p><div className={c.actions}><a className={s.button} href="#contact">{en ? 'Discuss a similar website' : 'Обсудить похожий сайт'}<span aria-hidden="true">↗</span></a><a className={s.textLink} href={copy.url} target="_blank" rel="noopener noreferrer">{en ? 'Visit the website' : 'Открыть сайт'} ↗</a></div></div></div></header>
      <WebsiteCaseOpening slug={slug} locale={locale} />
      <section className={c.story} data-reveal><div><span className={s.kicker}>{en ? 'The task' : 'Задача бизнеса'}</span><h2>{en ? 'Help a visitor decide.' : 'Помочь человеку сделать выбор.'}</h2><p>{copy.challenge}</p></div><div><span className={s.kicker}>{en ? 'What we built' : 'Что сделали'}</span><h2>{en ? 'A clear path through the website.' : 'Понятный путь по сайту.'}</h2><p>{copy.solution}</p></div></section>
      <section className={c.screens} id="screens" data-reveal><div className={s.sectionHeading}><div><span className={s.kicker}>{en ? 'Inside the website' : 'Внутри сайта'}</span><h2>{en ? 'Show the details that matter.' : 'Показать то, что важно клиенту.'}</h2></div><p>{en ? 'Actual public pages in Russian. Open an image to see the details.' : 'Реальные экраны сайта. Откройте изображение, чтобы рассмотреть детали.'}</p></div><WebsiteCaseScreens slug={slug} locale={locale} /></section>
      <section className={c.features} data-reveal><div className={s.sectionHeading}><div><span className={s.kicker}>{en ? 'What the visitor can do' : 'Что может посетитель'}</span><h2>{en ? 'From interest to a next step.' : 'От интереса к следующему шагу.'}</h2></div></div><div className={s.scenarioGrid}>{copy.features.map((feature, i) => <article className={s.scenarioShell} key={feature.title}><div className={s.scenarioCard}><span className={s.stepNumber}>0{i + 1}</span><h3>{feature.title}</h3><p>{feature.text}</p></div></article>)}</div></section>
      <section className={c.outcome} data-reveal><span className={c.eyebrow}>{en ? 'The result' : 'Результат работы'}</span><h2>{copy.resultTitle}</h2><p>{copy.result}</p><div className={c.actions}><Link className={s.textLink} href={localizedPath('/services/business-platforms', locale)}>{en ? 'Websites and business tools' : 'Сайты и сервисы для бизнеса'} ↗</Link><Link className={s.textLink} href={localizedPath(`/cases/${slug === 'garajw' ? 'sigmaup' : 'garajw'}`, locale)}>{en ? 'Another website project' : 'Ещё один пример сайта'} ↗</Link></div></section>
      <ContactPanel locale={locale} />
    </div>
  </Reveal>;
}
