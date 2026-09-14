import CaseCard from './CaseCard';
import Link from 'next/link';
import { productCases } from '@/lib/product-cases';
import { caseImages } from '@/lib/case-images';
import { localizedPath, type SiteLocale } from '@/lib/seo';
import Reveal from './Reveal';
import ContactPanel from './ContactPanel';
import { PageStructuredData } from './StructuredData';
import ProductScreenGallery, { ProductScreenImage, type ProductScreen } from './ProductScreenGallery';
import s from './Editorial.module.css';
import c from './ProductCases.module.css';

type CaseKey = keyof typeof productCases;

function ProductName({ slug, locale }: { slug: CaseKey; locale: SiteLocale }) {
  return slug === 'church-analytics' && locale === 'ru' ? <>Горница<wbr />Аналитик</> : productCases[slug][locale].name;
}

function presentationScreens(slug: CaseKey, locale: SiteLocale): ProductScreen[] {
  const en = locale === 'en';
  const shots = caseImages[slug];
  const details: Record<CaseKey, { index: number; label: string; title: string; text: string; crop?: ProductScreen['crop'] }[]> = {
    radar: [
      { index: 0, label: en ? 'Content workspace' : 'Рабочее пространство', title: en ? 'Find the tool for the next step.' : 'Выбрать, над чем работать.', text: en ? 'Content formats, research, ideas, plans and analytics are grouped by task. The team can move straight to the section it needs.' : 'Форматы контента, поиск идей, планы и аналитика сгруппированы по задачам. Можно сразу перейти к нужному этапу работы.' },
      { index: 1, label: en ? 'Brands' : 'Бренды', title: en ? 'Keep each project in context.' : 'Работать с несколькими брендами.', text: en ? 'Brand selection is the starting point for content preparation. Two client accounts and their logos have been replaced with neutral labels in this image.' : 'Выбор бренда — отправная точка подготовки контента. Названия, аккаунты и логотипы двух клиентов на этом изображении заменены нейтральными обозначениями.', crop: { top: 260, bottom: 10, left: 2, right: 2 } },
      { index: 2, label: en ? 'Ideas' : 'Банк идей', title: en ? 'Save a topic. Choose its format.' : 'Отобрать тему и перейти к созданию.', text: en ? 'Ideas include a rationale and status. Filters and creation actions help turn the list into work on a particular piece of content.' : 'У идей есть пояснение и статус. Фильтры и кнопка создания помогают перейти от списка тем к работе над конкретным материалом.' },
      { index: 3, label: en ? 'Research' : 'Изучение конкурентов', title: en ? 'Start with relevant examples.' : 'Найти основу для новых тем.', text: en ? 'Choose an audience and format, then add Telegram channels or paste examples. Research results feed into the idea bank.' : 'Выберите аудиторию и формат, добавьте Telegram-каналы или вставьте примеры вручную. Результаты изучения попадают в банк идей.' },
      { index: 4, label: en ? 'Metrics' : 'Результаты публикаций', title: en ? 'Bring results back into the process.' : 'Вернуться к результатам после публикации.', text: en ? 'Reach and enquiries can be entered manually. This screenshot shows the empty state before metrics have been added.' : 'Охваты и заявки можно внести вручную. На скриншоте показан начальный экран: метрики публикаций ещё не добавлены.', crop: { top: 178, bottom: 450, left: 3, right: 3 } },
    ],
    besty: [
      { index: 1, label: en ? 'Workouts' : 'Тренировки', title: en ? 'Choose a session. Start moving.' : 'Выбрать занятие и начать.', text: en ? 'A visual video library shows what the session covers and how long it takes. The chosen workout opens on YouTube.' : 'В подборке сразу видны тема и длительность занятия. Выбранная тренировка открывается на YouTube.', crop: { top: 178, bottom: 10, left: 7, right: 34 } },
      { index: 2, label: en ? 'Nutrition' : 'Питание', title: en ? 'A daily guide to nutrition.' : 'Понятный ориентир по питанию.', text: en ? 'Members enter their parameters, goal and activity level. The calculator gives an approximate calorie and macronutrient target for the day.' : 'Участница указывает свои параметры, цель и активность. Калькулятор показывает приблизительную норму калорий, белков, жиров и углеводов.' },
      { index: 3, label: en ? 'Expert workspace' : 'Кабинет эксперта', title: en ? 'The community, under one roof.' : 'Сообщество под рукой у эксперта.', text: en ? 'Reports, workouts, recipes and members share one management area. The expert can update materials and support the community from here.' : 'Отчёты, тренировки, рецепты и участницы собраны в одном кабинете. Здесь эксперт обновляет материалы и ведёт сообщество.' },
      { index: 0, label: en ? 'Member home' : 'Главная участницы', title: en ? 'The next step is easy to find.' : 'Сразу понятно, что делать сегодня.', text: en ? 'Workouts, nutrition and challenges are available from the home screen. The active challenge offers a direct way to submit the daily report.' : 'С главной можно перейти к тренировкам, питанию или челленджу. У активного челленджа есть заметная кнопка для отчёта за день.' },
    ],
    financefamily: [
      { index: 0, label: en ? 'Balances & currencies' : 'Баланс и валюты', title: en ? 'See what is available in each currency.' : 'Видеть остаток в каждой валюте.', text: en ? 'IDR, USD and RUB balances sit together with the currency exchange entry point. Personal and household views are available in the same app.' : 'Остатки в IDR, USD и RUB собраны рядом с переходом к обмену валют. Можно смотреть деньги отдельного участника или всей семьи.' },
      { index: 1, label: en ? 'Spending categories' : 'Категории расходов', title: en ? 'Understand where the budget goes.' : 'Понять, на что уходит бюджет.', text: en ? 'A chart shows each category’s share of spending. The latest transactions below it connect the overview with individual purchases.' : 'Диаграмма показывает долю каждой категории. Последние операции под ней помогают перейти от общей картины к отдельным покупкам.' },
      { index: 2, label: en ? 'Transaction history' : 'История операций', title: en ? 'Find the transaction behind the total.' : 'Найти конкретную операцию.', text: en ? 'Entries are grouped by day and show the amount, currency and participant. Search and filters help locate the record you need.' : 'Записи сгруппированы по дням: видны сумма, валюта и участник. Поиск и фильтры помогают вернуться к нужной трате.' },
      { index: 3, label: en ? 'Monthly overview' : 'Сводка за месяц', title: en ? 'See the pattern across the month.' : 'Посмотреть на месяц целиком.', text: en ? 'The spending calendar highlights active days. Switch between personal, work and household views to focus on the relevant part of the budget.' : 'Календарь делает заметными дни с расходами. Переключатели помогают отдельно посмотреть личные, рабочие и семейные деньги.' },
    ],
    mayak: [
      { index: 0, label: en ? 'Journey overview' : 'Обзор обращений', title: en ? 'Keep the whole journey in view.' : 'Видеть путь каждого обращения.', text: en ? 'The team dashboard brings together incoming contacts, administrator handoffs and active cities. A weekly overview helps follow the flow.' : 'В панели собраны новые контакты, передачи администратору и активные города. Обзор за неделю помогает следить за прохождением сценария.' },
      { index: 1, label: en ? 'Bot messages' : 'Сообщения бота', title: en ? 'Update the conversation as you need.' : 'Менять сообщения без разработчика.', text: en ? 'Greetings and messages for each step are kept in a single editor. The team can maintain the bot’s content without changing its code.' : 'Приветствия и тексты отдельных шагов собраны в редакторе. Команда может поддерживать сообщения бота в актуальном состоянии без правки кода.' },
      { index: 2, label: en ? 'Cities & contacts' : 'Города и контакты', title: en ? 'Keep local destinations up to date.' : 'Поддерживать направления в порядке.', text: en ? 'The city directory shows available destinations and lets the team manage their availability and administrator details.' : 'В справочнике видны города и их доступность. Команда управляет направлениями и данными администраторов через одну панель.', crop: { top: 169, bottom: 0, left: 20, right: 4 } },
    ],
    'church-analytics': [
      { index: 0, label: en ? 'Submission status' : 'Статус отчётности', title: en ? 'See what is in. Follow up on what is missing.' : 'Понять, какие отчёты ещё ждём.', text: en ? 'Choose a month and check city and ministry submissions separately. Progress bars show how complete each reporting stream is.' : 'Выберите месяц и посмотрите заполнение отдельно по городам и служениям. Полосы прогресса помогают сразу оценить, где ещё не хватает данных.', crop: { top: 186, bottom: 594, left: 10, right: 2 } },
      { index: 1, label: en ? 'Reporting hub' : 'Выбор отчёта', title: en ? 'One starting point for reporting.' : 'Одна точка входа в отчётность.', text: en ? 'The coordinator chooses a church report or a ministry report. The same starting screen also provides access to the analytics dashboard.' : 'Ответственный выбирает отчёт по церкви или служению. С этого же экрана можно открыть общую аналитику.', crop: { top: 443, bottom: 300, left: 3, right: 3 } },
    ],
  };
  return details[slug].map(({ index, label, title, text, crop }) => {
    const shot = shots[index];
    const frame = crop ?? { top: 178, bottom: 8, left: 3, right: 3 };
    const scale = shot.demo ? shot.width / 593 : 1;
    return { shot, label, title, text, crop: { top: frame.top * scale, bottom: frame.bottom * scale, left: (frame.left ?? 0) * scale, right: (frame.right ?? 0) * scale } };
  });
}

export function ProductCaseTeaser({ slug, locale = 'ru', anchor = false, heading = 'h2' }: { slug: CaseKey; locale?: SiteLocale; anchor?: boolean; heading?: 'h2' | 'h3' }) {
  return <CaseCard slug={slug} locale={locale} anchor={anchor} heading={heading} />;
}

export function ProductCaseCollection({ locale = 'ru' }: { locale?: SiteLocale }) {
  return <div className={c.casePair}><ProductCaseTeaser slug="besty" locale={locale} anchor /><ProductCaseTeaser slug="mayak" locale={locale} anchor /><ProductCaseTeaser slug="financefamily" locale={locale} anchor /><ProductCaseTeaser slug="church-analytics" locale={locale} anchor /><ProductCaseTeaser slug="radar" locale={locale} anchor /></div>;
}

export default function ProductCaseStudy({ slug, locale = 'ru' }: { slug: CaseKey; locale?: SiteLocale }) {
  const en = locale === 'en';
  const copy = productCases[slug][locale];
  const screens = presentationScreens(slug, locale);
  const heroScreen = slug === 'besty' ? screens[1] : screens[0];
  return <Reveal><PageStructuredData title={copy.title} description={copy.description} path={`/cases/${slug}`} locale={locale} parent={{ name: en ? 'Projects' : 'Проекты', path: '/cases' }} />
    <div className={`${s.container} ${c[slug]}`}>
      <nav className={c.breadcrumbs} aria-label={en ? 'Breadcrumb' : 'Хлебные крошки'}><ol><li><Link href={localizedPath('/', locale)}>{en ? 'Home' : 'Главная'}</Link></li><li><Link href={localizedPath('/cases', locale)}>{en ? 'Projects' : 'Проекты'}</Link></li><li aria-current="page">{copy.name}</li></ol></nav>
      <header className={c.hero}><div><span className={c.eyebrow}>{copy.eyebrow}</span><div className={c.wordmark}><ProductName slug={slug} locale={locale} /><span aria-hidden="true">↗</span></div><h1>{copy.title}</h1><p>{copy.intro}</p><div className={c.actions}><a className={s.button} href="#screens">{en ? 'See the product' : 'Посмотреть продукт'}<span aria-hidden="true">↓</span></a><a className={s.textLink} href="#contact">{en ? 'I want a similar solution' : 'Хочу похожее решение'} ↗</a></div></div><div className={c.heroArt}><div className={c.heroArtLabel}><span>{copy.name}</span><span>{en ? 'Product interface' : 'Интерфейс продукта'}</span></div><figure className={c.heroScreenshot}><ProductScreenImage screen={heroScreen} locale={locale} hero /><figcaption>{heroScreen.shot.demo ? (en ? 'Demo names and amounts' : 'Имена и суммы — для примера') : heroScreen.label}<span aria-hidden="true">↗</span></figcaption></figure></div></header>
      <section className={c.story} data-reveal><div><span className={s.kicker}>{en ? 'The task' : 'Задача'}</span><h2>{en ? 'Start with the people using it.' : 'Начать с задач пользователей.'}</h2><p>{copy.challenge}</p></div><div><span className={s.kicker}>{en ? 'The solution' : 'Решение'}</span><h2>{en ? 'Connect the whole process.' : 'Связать весь процесс.'}</h2><p>{copy.solution}</p></div></section>
      <section className={c.screens} id="screens" data-reveal><div className={s.sectionHeading}><div><span className={s.kicker}>{en ? 'Inside the product' : 'Внутри продукта'}</span><h2>{en ? 'See how it works, screen by screen.' : 'Как это работает — на экранах.'}</h2></div><p>{en ? 'Choose a section to explore its purpose and interface. The original product is in Russian.' : 'Выберите раздел: рядом с экраном объясняем, какую задачу он решает.'}</p></div><ProductScreenGallery screens={screens} locale={locale} />{['mayak', 'financefamily', 'church-analytics'].includes(slug) && <p className={s.note}>{en ? 'Dashboard values are a snapshot of the interface when captured.' : 'Значения в панели отражают состояние интерфейса на момент съёмки.'}</p>}</section>
      <section className={c.features} data-reveal><div className={s.sectionHeading}><div><span className={s.kicker}>{en ? 'What we built' : 'Что реализовали'}</span><h2>{copy.featuresHeading ?? (en ? 'Tools for each side of the process.' : 'Инструменты для каждой стороны.')}</h2></div></div><div className={s.scenarioGrid}>{copy.features.map((feature, i) => <article className={s.scenarioShell} key={feature.title}><div className={s.scenarioCard}><span className={s.stepNumber}>0{i + 1}</span><h3>{feature.title}</h3><p>{feature.text}</p></div></article>)}</div></section>
      <section className={c.steps} data-reveal><div><span className={s.kicker}>{en ? 'The user journey' : 'Путь пользователя'}</span><h2>{en ? 'A clear next step.' : 'Понятный следующий шаг.'}</h2></div><ol>{copy.steps.map((step, i) => <li key={step.title}><span>0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></section>
      <section className={c.outcomes} data-reveal><span className={c.eyebrow}>{en ? 'The result' : 'Результат работы'}</span><h2>{en ? 'A working product around a real task.' : 'Рабочий продукт под конкретную задачу.'}</h2><ul>{copy.outcomes.map(item => <li key={item}><span aria-hidden="true">↳</span>{item}</li>)}</ul><p>{copy.closing}</p><div className={c.actions}><Link className={s.textLink} href={localizedPath('/services/business-platforms', locale)}>{en ? 'Platform development' : 'Разработка платформ'} ↗</Link><Link className={s.textLink} href={localizedPath(slug === 'mayak' ? '/services/business-automation' : '/cases/mayak', locale)}>{en ? (slug === 'mayak' ? 'Workflow automation' : 'Explore Mayak') : (slug === 'mayak' ? 'Автоматизация процессов' : 'Кейс «Маяк»')} ↗</Link></div></section>
      <ContactPanel key={slug} locale={locale} projectName={copy.name} />
    </div>
  </Reveal>;
}
