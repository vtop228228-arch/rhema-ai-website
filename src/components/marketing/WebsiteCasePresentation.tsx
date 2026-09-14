import Image from 'next/image';
import { websiteCases, type WebsiteCaseSlug } from '@/lib/website-cases';
import type { SiteLocale } from '@/lib/seo';
import v from './WebsiteCasePresentation.module.css';

type PresentationProps = { slug: WebsiteCaseSlug; locale: SiteLocale };
type Screen = { src: string; width: number; height: number; caption: string };

function ScreenFrame({ image, locale, crop, priority = false }: { image: Screen; locale: SiteLocale; crop: string; priority?: boolean }) {
  const en = locale === 'en';
  return <figure className={v.screenFrame}>
    <a className={v.screenLink} href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`${image.caption}. ${en ? 'Open full-size screenshot' : 'Открыть скриншот полностью'}`}>
      <span className={`${v.screenClip} ${crop}`}><Image src={image.src} alt={image.caption} width={image.width} height={image.height} sizes="(max-width: 800px) 100vw, 1200px" preload={priority} /></span>
      <span className={v.screenCaption}><span>{en ? 'View full screen' : 'Рассмотреть экран'}</span><span className={v.expandIcon} aria-hidden="true">↗</span></span>
    </a>
    <figcaption className={v.srOnly}>{image.caption}</figcaption>
  </figure>;
}

export function WebsiteCaseOpening({ slug, locale }: PresentationProps) {
  const en = locale === 'en';
  if (slug === 'garajw') {
    return <section className={v.jewelryOpening} aria-label={en ? 'Jewellery and workshop photography' : 'Украшения и фотографии мастерской'}>
      <div className={v.ringPortrait}><Image src="/cases/garajw/emerald-ring-photo.webp" alt={en ? 'A finished gold ring with a green stone, photographed in the workshop' : 'Готовое золотое кольцо с зелёным камнем в мастерской'} width={640} height={1138} sizes="(max-width: 800px) 100vw, 620px" preload /><span>{en ? 'A piece made by hand' : 'Работа, которую хочется рассмотреть'}</span></div>
      <div className={v.jewelryEditorial}><span className={v.label}>D. Garabazhii · {en ? 'Bespoke jewellery' : 'Авторские украшения'}</span><h2>{en ? <>The details<br />build trust.</> : <>Доверие<br />в деталях.</>}</h2><p>{en ? 'Show the stone, the maker’s work and the care behind a personal piece.' : 'Показать камень, работу мастера и внимание, с которым создаётся личная вещь.'}</p><div className={v.paletteDetail}><Image src="/cases/garajw/gem-palette-photo.webp" alt={en ? 'Coloured gemstones selected for bespoke jewellery' : 'Цветные камни для индивидуального украшения'} width={640} height={1138} sizes="(max-width: 800px) 60vw, 360px" /><span>{en ? 'From choosing a stone to a finished piece.' : 'От выбора камня до готового украшения.'}</span></div></div>
    </section>;
  }
  return <section className={v.sigmaOpening} aria-label={en ? 'SigmaUp website presentation' : 'Презентация сайта SigmaUp'}>
    <div className={v.sigmaMasthead}><span>SigmaUp<span className={v.academy}>Academy</span></span><span className={v.label}>{en ? 'Mobile video editing' : 'Мобильный монтаж'}</span></div>
    <ScreenFrame image={websiteCases.sigmaup[locale].screens[0]} locale={locale} crop={v.sigmaHomeScreen} priority />
    <div className={v.sigmaRoute}><span><b>01</b>{en ? 'Discover the course' : 'Знакомство с курсом'}</span><span aria-hidden="true">→</span><span><b>02</b>{en ? 'Explore the lessons' : 'Программа обучения'}</span><span aria-hidden="true">→</span><span><b>03</b>{en ? 'Choose a plan' : 'Выбор тарифа'}</span></div>
  </section>;
}

export function WebsiteCaseScreens({ slug, locale }: PresentationProps) {
  const en = locale === 'en';
  const copy = websiteCases[slug][locale];
  if (slug === 'garajw') {
    const [workshop, homepage, order] = copy.screens;
    return <div className={v.screenStories}>
      <article className={v.screenStory}>
        <div className={v.storyCopy}><span className={v.step}>01 / {en ? 'First impression' : 'Первое знакомство'}</span><h3>{en ? 'Introduce the maker.' : 'Познакомить с мастерской.'}</h3><p>{en ? 'What the workshop makes, how an order works and where to start a conversation — visible from the first page.' : 'Что делает мастерская, как проходит заказ и с чего начать разговор — понятно уже на главной.'}</p><span className={v.pageAddress}>garajw.ru</span></div>
        <div className={v.screenSurface}><ScreenFrame image={homepage} locale={locale} crop={v.jewelryHomeScreen} /></div>
      </article>
      <article className={`${v.screenStory} ${v.workshopStory}`}>
        <div className={v.storyCopy}><span className={v.step}>02 / {en ? 'The process' : 'Работа мастера'}</span><h3>{en ? 'Let the work speak.' : 'Показать, как рождается изделие.'}</h3><p>{en ? 'Real workshop photographs bring the visitor closer to the craft, from the selection of stones to the finished ring.' : 'Настоящие фотографии производства помогают увидеть работу изнутри: от подбора камней до готового кольца.'}</p></div>
        <div className={v.screenSurface}><ScreenFrame image={workshop} locale={locale} crop={v.workshopScreen} /></div>
      </article>
      <article className={`${v.screenStory} ${v.orderStory}`}>
        <div className={v.storyCopy}><span className={v.step}>03 / {en ? 'A personal enquiry' : 'Индивидуальный заказ'}</span><h3>{en ? 'Turn an idea into an enquiry.' : 'Помочь рассказать о своей идее.'}</h3><p>{en ? 'A short questionnaire guides the customer through the piece, stone, budget and other details. The maker receives a clearer starting point for the conversation.' : 'Короткая анкета последовательно уточняет изделие, камень, бюджет и другие пожелания. Мастеру проще начать предметный разговор с клиентом.'}</p><span className={v.pageAddress}>garajw.ru/custom</span></div>
        <div className={v.screenSurface}><ScreenFrame image={order} locale={locale} crop={v.orderScreen} /></div>
      </article>
    </div>;
  }
  return <div className={`${v.screenStories} ${v.sigmaStories}`}>
    <article className={`${v.screenStory} ${v.curriculumStory}`}>
      <div className={v.storyCopy}><span className={v.step}>02 / {en ? 'The curriculum' : 'Программа курса'}</span><h3>{en ? 'Make the content clear.' : 'Дать понять, чему научат.'}</h3><p>{en ? 'Visitors can open the course plan and see the lesson topics before choosing how to take part.' : 'Посетитель открывает план курса и видит темы занятий до того, как выберет вариант участия.'}</p><span className={v.pageAddress}>sigmaup.pro/main</span></div>
      <div className={v.screenSurface}><ScreenFrame image={copy.screens[1]} locale={locale} crop={v.curriculumScreen} /></div>
    </article>
    <article className={`${v.screenStory} ${v.plansStory}`}>
      <div className={v.storyCopy}><div><span className={v.step}>03 / {en ? 'Participation options' : 'Варианты участия'}</span><h3>{en ? 'Make the plans easy to compare.' : 'Помочь сравнить тарифы.'}</h3></div><p>{en ? 'Independent learning, support from mentors or personal guidance: each plan shows what is included.' : 'Самостоятельное обучение, помощь наставников или личное сопровождение: в каждом варианте видно, что входит в обучение.'}</p></div>
      <div className={v.screenSurface}><ScreenFrame image={copy.screens[2]} locale={locale} crop={v.plansScreen} /></div>
    </article>
  </div>;
}
