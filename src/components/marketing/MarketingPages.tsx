import Link from 'next/link';
import DiagnosisSection from './DiagnosisSection';

import ContactPanel from './ContactPanel';
import Reveal from './Reveal';
import { faqs, projects, steps } from './content';
import DiscoveryIntro, { ClearServices } from './DiscoveryIntro';
import SeraphimTeaser from './SeraphimTeaser';
import RhemaOSFeature from './RhemaOSFeature';
import { ProductCaseCollection, ProductCaseTeaser } from './ProductCaseStudy';
import { WebsiteCaseCollection, WebsiteCaseTeaser } from './WebsiteCaseStudy';
import CaseDirectory from './CaseDirectory';
import s from './Editorial.module.css';

function Action({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link className={secondary ? s.secondary : s.button} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
function Label({ children }: { children: React.ReactNode }) { return <span className={s.kicker}>{children}</span>; }


function Intro({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <header className={s.subHero}><Label>{eyebrow}</Label><h1>{title}</h1><p>{children}</p></header>;
}


function Process() {
  return <section className={s.section} id="process" data-reveal>
    <div className={s.sectionHeading}><div><Label>03 / Как работаем</Label><h2>От первого вопроса<br /><em>до рабочего решения.</em></h2></div><p>На каждом этапе понятно, что делаем, что требуется от вас и какой результат проверяем вместе.</p></div>
    <ol className={s.steps}>{steps.map((step, i) => <li key={step.title}><span className={s.stepNumber}>0{i + 1}</span><h3>{step.title}</h3><p>{step.body}</p><span className={s.stepResult}>{step.result}</span></li>)}</ol>
  </section>;
}

function Pricing() {
  return <section className={s.section} id="pricing" data-reveal>
    <div className={s.sectionHeading}><div><Label>04 / Стоимость и сроки</Label><h2>Начать с малого.<br /><em>Развивать по мере роста.</em></h2></div><p>Можно поручить помощнику одну задачу или создать приложение для всей команды. После разговора предложим подходящий вариант и объясним стоимость.</p></div>
    <div className={s.pricingGrid}>
      <article className={s.priceShell}><div className={s.priceCard}><Label>Помощь в одной задаче</Label><h3>AI-помощник</h3><div className={s.price}><small>от</small> 30 000 <small>₽</small></div><p>Например, отвечает на вопросы о ваших услугах, напоминает о делах или ищет нужное в документах.</p><ul><li>Понятные задачи и правила работы</li><li>Ваши материалы и нужные программы</li><li>Проверка на примерах вашей команды</li><li>Запуск и инструкции</li></ul><span className={s.note}>Ориентир по срокам: 5–14 дней</span><Action href="#contact">Обсудить задачу</Action></div></article>
      <article className={s.priceShell}><div className={s.priceFeatured}><Label>Сервис для клиентов и команды</Label><h3>Своя платформа</h3><div className={s.price}><small>от</small> 90 000 <small>₽</small></div><p>Кабинет клиента, онлайн-школа или приложение для заказов, отчётов и работы сотрудников.</p><ul><li>Удобные экраны под ваши задачи</li><li>Личные кабинеты и права доступа</li><li>Подключение нужных программ</li><li>Запуск и передача проекта</li></ul><span className={s.note}>Первая версия: от 3 недель</span><Action href="#contact">Обсудить приложение</Action></div></article>
    </div>
    <div className={s.pricingNote}><strong>Что входит в ваш бюджет</strong><p>Это начальные цены. Точную стоимость согласуем после обсуждения функций и подключения ваших программ. Работа AI, размещение приложения и другие сервисы могут оплачиваться отдельно — обсудим эти расходы до старта. Дополнительные задачи оцениваем отдельно.</p></div>
  </section>;
}

function CasePreview() {
  return <section className={s.caseSection} id="cases" data-reveal>
    <div className={s.sectionHeading}><div><Label>02 / Уже собрали</Label><h2>Рабочие продукты.<br /><em>Реальные задачи.</em></h2></div><Action href="/cases" secondary>Все проекты</Action></div>
    <SeraphimTeaser />
    <div className={s.caseGrid}>
      <WebsiteCaseTeaser slug="sigmaup" heading="h3" />
      <ProductCaseTeaser slug="besty" heading="h3" />
    </div>
  </section>;
}

function Questions() {
  return <section className={s.faq} data-reveal><div><Label>05 / До первого шага</Label><h2>Хорошие вопросы.<br /><em>Прямые ответы.</em></h2><p>Не нашли свой?<br /><a href="https://t.me/RhemaAI_support" target="_blank" rel="noopener noreferrer">Напишите нам в Telegram ↗</a></p></div><div>{faqs.map((faq, i) => <details key={faq.q}><summary><span className={s.faqNumber}>0{i + 1}</span><span>{faq.q}</span><span className={s.faqPlus} aria-hidden="true">+</span></summary><p>{faq.a}</p></details>)}</div></section>;
}



export function HomePage() {
  return <Reveal><div className={s.container}><DiscoveryIntro />
    <ClearServices /><DiagnosisSection /><CasePreview /><Process /><Questions /><ContactPanel />
  </div></Reveal>;
}
export function WorkPage() {
  return <Reveal><div className={s.container}><Intro eyebrow="RHEMA / Подход" title="Вы рассказываете о задаче. Мы берём на себя технологии.">Разбираемся, как работает ваша команда, и выбираем одну задачу, которую стоит упростить. До разработки вы понимаете, что получите, сколько это стоит и как проверить результат.</Intro><Process /><section className={s.principles} data-reveal><Label>Что согласуем до разработки</Label><h2>У проекта есть<br /><em>понятный план.</em></h2><div className={s.scenarioGrid}>{[['Что создаём', 'Какие задачи решает программа, с чем её нужно соединить и что оставляем для следующих версий.'], ['Как проверяем', 'На каких реальных задачах проверяем результат и какие действия требуют подтверждения сотрудника.'], ['Что нужно от вас', 'Кто поделится материалами, расскажет о работе и поможет попробовать решение перед запуском.'], ['Цена и поддержка', 'Стоимость разработки, регулярных платежей за сервисы и состав помощи после запуска.']].map(([title, body]) => <article className={s.scenarioShell} key={title}><div className={s.scenarioCard}><h3>{title}</h3><p>{body}</p></div></article>)}</div></section><Pricing /><section id="cases" className={s.inlineLink}><Action href="/cases" secondary>Посмотреть готовые проекты</Action></section><ContactPanel /></div></Reveal>;
}
export function CasesPage() {
  const ids = ['sigmaup', 'besty', 'jarvis', 'isnail'];
  return <Reveal><div className={s.container}>
    <Intro eyebrow="RHEMA / Проекты" title="Посмотрите, как это работает у других.">Сайт мастерской, онлайн-курс, учёт денег, сбор отчётов и помощь клиентам. Выберите похожую задачу — в каждом кейсе покажем, что сделали и как этим пользуются.</Intro>
    <CaseDirectory />
    <WebsiteCaseCollection />
    <SeraphimTeaser anchor /><RhemaOSFeature anchor />
    <ProductCaseCollection />
    <div className={s.projectList}>{projects.map((project, i) => ['jarvis', 'besty', 'sigmaup'].includes(ids[i]) ? null : <article key={project.name} id={ids[i]} className={s.project} data-reveal><div><Label>09 / {project.type}</Label><div className={s.projectName}>{project.name}<span aria-hidden="true">↗</span></div><div className={s.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><div><h2>{project.title}</h2><dl><dt>Задача</dt><dd>{project.before}</dd><dt>Что сделали</dt><dd>{project.after}</dd></dl></div></article>)}</div>
    <ContactPanel />
  </div></Reveal>;
}
export function AboutPage() {
  const founders = [
    { firstName: 'Владислав', lastName: 'Грижак', initials: 'ВГ' },
    { firstName: 'Тимофей', lastName: 'Матюжов', initials: 'ТМ' },
  ];

  return <Reveal><div className={s.container}>
    <Intro eyebrow="RHEMA / Команда" title="Создаём инструменты для бизнеса. И пользуемся ими сами.">
      Rhema AI — небольшая команда, которая делает сайты, приложения и AI-помощников для малого и среднего бизнеса. Превращаем обычную рабочую задачу в удобный инструмент.
    </Intro>
    <section className={s.founders} aria-label="Основатели Rhema AI" data-reveal>
      <div className={s.foundersGrid}>
        {founders.map(founder => <article className={s.founderCard} key={founder.lastName}>
          <span className={s.mono}>ОСНОВАТЕЛЬ / AI-АРХИТЕКТОР</span>
          <div className={s.founderMonogram} aria-hidden="true">{founder.initials}<span>↗</span></div>
          <h2>{founder.firstName}<br />{founder.lastName}</h2>
        </article>)}
      </div>
    </section>
    <section className={s.aboutSplit} data-reveal>
      <div><Label>Наш подход</Label><h2>Знать процесс.<br /><em>Проверять в деле.</em></h2></div>
      <div>
        <p>Для своей команды мы создали <Link href="/cases/jarvis" className={s.textLink}>Rhema OS (JARVIS)</Link>. В ней собраны работа с клиентами, разбор звонков, подготовка публикаций и AI-помощники. На этот опыт опираемся, когда решаем ваши задачи.</p>
        <h3>Фокус на вашей команде</h3>
        <p>Смотрим, какие дела повторяются, где теряются обращения и что сотрудники переносят вручную. Объясняем, где поможет AI, а где достаточно более простого решения.</p>
        <h3>Система под ваш бизнес</h3>
        <p>Планируем функции под вашу работу и привычные программы. Доступ к готовому проекту, передачу кода и помощь после запуска фиксируем в условиях проекта.</p>
        <Action href="/cases" secondary>Посмотреть наши проекты</Action>
      </div>
    </section>
    <ContactPanel />
  </div></Reveal>;
}
