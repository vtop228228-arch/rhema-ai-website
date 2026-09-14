import type { SiteLocale } from '@/lib/seo';
import c from './Services.module.css';

const facts: Record<string, { ru: string[]; en: string[] }> = {
  'ai-agents': { ru: ['От 30 000 ₽', 'Ориентир: 5–14 дней', 'Примеры вопросов клиентов, описание услуг и правила работы.'], en: ['From RUB 30,000', 'Estimate: 5–14 days', 'Sample customer questions, service information and working rules.'] },
  'business-automation': { ru: ['После разбора процесса', 'Согласуем до старта', 'Пример текущей работы и список программ, которыми пользуется команда.'], en: ['Estimated after a process review', 'Agreed before starting', 'An example of the current workflow and the tools your team uses.'] },
  'business-platforms': { ru: ['Платформа — от 90 000 ₽', 'Первая версия — от 3 недель', 'Что должен делать клиент или сотрудник. Для сайта — описание услуги и материалы.'], en: ['Platforms from RUB 90,000', 'First version from 3 weeks', 'The actions customers or employees need to take. For a website, your service information and content.'] },
};
export default function ServiceBrief({ slug, locale }: { slug: string; locale: SiteLocale }) {
  const en = locale === 'en';
  const values = facts[slug]?.[locale];
  if (!values) return null;
  return <section className={c.brief} aria-label={en ? 'Project at a glance' : 'О проекте коротко'}>
    <dl>{[en ? 'Budget guide' : 'Ориентир по бюджету', en ? 'Timing' : 'Срок', en ? 'What we need from you' : 'Что понадобится от вас'].map((label, i) => <div key={label}><dt>{label}</dt><dd>{values[i]}</dd></div>)}</dl>
    <p>{en ? 'These are starting estimates. Website scope, integrations, service subscriptions and the final price are agreed separately before development.' : 'Это стартовые ориентиры. Состав сайта, подключения, подписки на сервисы и итоговую стоимость согласуем до разработки.'}</p>
  </section>;
}
