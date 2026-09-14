import Link from 'next/link';
import { localizedPath, type SiteLocale } from '@/lib/seo';
import c from './TaskPicker.module.css';

const flows = {
  website: {
    ru: { title: 'От посетителя к заявке', steps: [['Клиент знакомится', 'Смотрит услуги, работы и условия.'], ['Выбирает следующий шаг', 'Оставляет запрос через сайт.'], ['Команда получает заявку', 'Видит контакт и пожелания клиента.']], caseTitle: 'Сайт ювелирной мастерской', caseText: 'D. Garabazhii — показ работ, процесс изготовления и анкета заказа.' },
    en: { title: 'From visitor to enquiry', steps: [['Discover the service', 'Explore the work, services and terms.'], ['Take the next step', 'Send an enquiry through the website.'], ['Receive the enquiry', 'Your team sees the contact and request.']], caseTitle: 'A jewellery workshop website', caseText: 'D. Garabazhii — portfolio, making process and an order questionnaire.' },
  },
  leads: {
    ru: { title: 'От вопроса к разговору', steps: [['Клиент задаёт вопрос', 'Пишет в привычном канале.'], ['Помощник уточняет запрос', 'Отвечает по материалам компании.'], ['Менеджер продолжает', 'Получает обращение и переписку.']], caseTitle: 'Бот для обращений в сообщество', caseText: 'Маяк — знакомство, выбор города и переход к администратору. Пример маршрутизации обращений.' },
    en: { title: 'From question to conversation', steps: [['A customer asks', 'Writes through a familiar channel.'], ['An assistant clarifies', 'Answers using company materials.'], ['Your colleague takes over', 'Receives the enquiry and conversation.']], caseTitle: 'A community enquiries bot', caseText: 'Mayak — introduction, city selection and administrator handoff. An example of enquiry routing.' },
  },
  operations: {
    ru: { title: 'От данных к общей картине', steps: [['Сотрудник передаёт данные', 'Заполняет понятную форму.'], ['Система собирает ответы', 'Обновляет статусы в одном месте.'], ['Руководитель видит итог', 'Понимает, что готово и чего не хватает.']], caseTitle: 'Система сбора отчётности', caseText: 'ГорницаАналитик — отчёты по городам и служениям, статусы и напоминания.' },
    en: { title: 'From inputs to an overview', steps: [['A colleague submits data', 'Completes a straightforward form.'], ['The system gathers responses', 'Updates statuses in one place.'], ['The team lead sees the picture', 'Knows what is ready and what is missing.']], caseTitle: 'A reporting system', caseText: 'Gornitsa Analytics — city and ministry reports, submission statuses and reminders.' },
  },
  content: {
    ru: { title: 'От темы к готовому материалу', steps: [['Команда выбирает идею', 'Собирает темы и примеры.'], ['Готовит черновик', 'Создаёт пост, карусель или сценарий.'], ['Проверяет и планирует', 'Редактирует материал перед публикацией.']], caseTitle: 'Приложение для подготовки контента', caseText: 'Радар — банк идей, подготовка публикаций и контент-план в Telegram.' },
    en: { title: 'From topic to finished content', steps: [['Choose an idea', 'Collect topics and reference material.'], ['Prepare a draft', 'Create a post, carousel or script.'], ['Review and plan', 'Edit the material before publication.']], caseTitle: 'A content preparation app', caseText: 'Radar — ideas, publication preparation and content planning inside Telegram.' },
  },
} as const;

export default function TaskFlow({ task, project, locale }: { task: keyof typeof flows; project: string; locale: SiteLocale }) {
  const flow = flows[task][locale];
  const en = locale === 'en';
  return <aside className={c.flow} aria-label={en ? 'Example workflow and related project' : 'Пример сценария и связанный проект'}>
    <div className={c.flowHeading}><span className={c.flowLabel}><i aria-hidden="true" />{en ? 'Example workflow' : 'Пример сценария'}</span><p>{flow.title}</p></div>
    <ol className={c.flowSteps}>{flow.steps.map(([title, text], index) => <li key={title}><span className={c.flowNumber} aria-hidden="true">0{index + 1}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ol>
    <Link className={c.flowCase} href={localizedPath(`/cases/${project}`, locale)}><span>{en ? 'See a related project' : 'Посмотрите похожий проект'}<span className={c.flowArrow} aria-hidden="true">↗</span></span><strong>{flow.caseTitle}</strong><p>{flow.caseText}</p></Link>
  </aside>;
}
