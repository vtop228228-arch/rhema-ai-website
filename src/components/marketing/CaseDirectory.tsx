import type { SiteLocale } from '@/lib/seo';
import s from './Editorial.module.css';

const links = [
  ['seraphim', 'Офис из 38 AI-агентов', '38-agent digital office'],
  ['garajw', 'Сайт мастерской', 'Workshop website'],
  ['sigmaup', 'Сайт курса', 'Course website'],
  ['jarvis', 'Работа команды', 'Team workspace'],
  ['besty', 'Фитнес-сообщество', 'Fitness community'],
  ['mayak', 'Обращения в сообщество', 'Community enquiries'],
  ['financefamily', 'Учёт денег', 'Money tracking'],
  ['church-analytics', 'Сбор отчётов', 'Monthly reporting'],
  ['radar', 'Подготовка контента', 'Content preparation'],
  ['isnail', 'Помощь ученикам', 'Student support'],
] as const;

export default function CaseDirectory({ locale = 'ru' }: { locale?: SiteLocale }) {
  return <nav className={s.serviceLinks} aria-label={locale === 'en' ? 'Explore a project by business task' : 'Выберите пример по задаче бизнеса'}>{links.map(([id, ru, en]) => <a key={id} href={`#${id}`}>{locale === 'en' ? en : ru}<span aria-hidden="true">↓</span></a>)}</nav>;
}
