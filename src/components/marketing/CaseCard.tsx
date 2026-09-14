import Image from 'next/image';
import Link from 'next/link';
import { caseImages } from '@/lib/case-images';
import { productCases, type ProductCaseSlug } from '@/lib/product-cases';
import { websiteCases, type WebsiteCaseSlug } from '@/lib/website-cases';
import { localizedPath, type SiteLocale } from '@/lib/seo';
import c from './CaseCard.module.css';

const descriptions: Record<string, { ru: [string, string, string]; en: [string, string, string] }> = {
  besty: { ru: ['Фитнес-клуб в Telegram', 'Тренировки, питание и отчёты участниц в одном приложении.', 'Занятия · Питание · Кабинет эксперта'], en: ['A fitness club in Telegram', 'Workouts, nutrition and member reports in one app.', 'Workouts · Nutrition · Expert workspace'] },
  mayak: { ru: ['От обращения до администратора', 'Бот знакомит с сообществом и помогает найти контакт в своём городе.', 'Знакомство · Выбор города · Обращение'], en: ['From enquiry to administrator', 'A bot introduces the community and helps people find a local contact.', 'Introduction · City selection · Contact'] },
  financefamily: { ru: ['Деньги в трёх валютах', 'Баланс, расходы и история обменов для личного и семейного бюджета.', 'IDR / USD / RUB · Расходы · История'], en: ['Money in three currencies', 'Balances, spending and exchange history for personal and household budgets.', 'IDR / USD / RUB · Spending · History'] },
  'church-analytics': { ru: ['Отчётность по городам', 'Отчёты городов и служений: видно, что уже сдали и чего не хватает.', 'Формы · Статусы · Общая сводка'], en: ['Reporting across cities', 'City and ministry reports show what is submitted and what is missing.', 'Forms · Statuses · Overview'] },
  radar: { ru: ['Контент от идеи до публикации', 'Темы, черновики и план работы с контентом для нескольких брендов.', 'Идеи · Подготовка · Планирование'], en: ['Content from idea to publication', 'Topics, drafts and content planning for multiple brands.', 'Ideas · Preparation · Planning'] },
  garajw: { ru: ['Сайт ювелирной мастерской', 'Посетитель знакомится с работами мастера и оставляет запрос на своё украшение.', 'Работы · Процесс · Заявка'], en: ['A jewellery workshop website', 'Visitors explore the maker’s work and enquire about a bespoke piece.', 'Portfolio · Process · Enquiry'] },
  sigmaup: { ru: ['Сайт образовательного проекта', 'Программа курса, варианты участия и понятный следующий шаг для ученика.', 'Программа · Тарифы · Запись'], en: ['An education project website', 'The course, participation options and a clear next step for students.', 'Curriculum · Plans · Enrolment'] },
  jarvis: { ru: ['Рабочая среда команды', 'Клиенты, задачи и AI-помощники собраны в одной системе.', 'Клиенты · Задачи · Помощники'], en: ['A shared team workspace', 'Clients, tasks and AI helpers brought into one system.', 'Clients · Tasks · Assistants'] },
};

export default function CaseCard({ slug, locale = 'ru', anchor = false, heading = 'h2' }: { slug: string; locale?: SiteLocale; anchor?: boolean; heading?: 'h2' | 'h3' }) {
  const product = productCases[slug as ProductCaseSlug]?.[locale];
  const website = websiteCases[slug as WebsiteCaseSlug]?.[locale];
  const phone = Boolean(product);
  const shot = caseImages[slug as ProductCaseSlug]?.[0] || website?.screens[slug === 'garajw' ? 1 : 0] || { src: '/cases/jarvis/agents.png', width: 1290, height: 684 };
  const name = product?.name || website?.name || 'Rhema OS / JARVIS';
  const [title, text, features] = descriptions[slug][locale];
  const Heading = heading;
  return <article className={c.card} id={anchor ? slug : undefined}>
    <Link className={c.link} href={localizedPath(`/cases/${slug}`, locale)}>
      <div className={c.copy}><span className={c.brand}>{name}</span><Heading>{title}</Heading><p>{text}</p></div>
      <div className={`${c.stage} ${phone ? c.mobileStage : ''}`}>
        <div className={c.screenLabel}><span>{locale === 'en' ? (phone ? 'Inside the app' : 'Website / workspace') : (phone ? 'Внутри приложения' : 'Сайт / рабочая среда')}</span><span aria-hidden="true">↗</span></div>
        <div className={phone ? c.phone : c.browser}>
          <Image src={shot.src} alt={`${name}: ${title}`} width={shot.width} height={shot.height} sizes={phone ? '240px' : '(max-width: 800px) 90vw, 580px'} style={phone ? { marginTop: `${-178 / shot.width * 100}%` } : undefined} />
        </div>
      </div>
      <div className={c.footer}><span>{features}</span><strong>{locale === 'en' ? 'Explore the project' : 'Что сделали'}<span aria-hidden="true">↗</span></strong></div>
    </Link>
  </article>;
}
