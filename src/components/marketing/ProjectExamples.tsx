import Link from 'next/link';
import { localizedPath, type SiteLocale } from '@/lib/seo';
import c from './Services.module.css';
import CaseCard from './CaseCard';

export default function ProjectExamples({ ids, locale }: { ids: string[]; locale: SiteLocale }) {
  const en = locale === 'en';
  return <div className={c.proofGrid}>{ids.slice(0, 2).map(id => id !== 'isnail'
    ? <CaseCard key={id} slug={id} locale={locale} heading="h3" />
    : <Link key={id} className={c.proofCard} href={localizedPath('/cases/isnail', locale)}><div className={c.proofCopy}><span>{en ? 'Project concept · Not launched' : 'Концепция · Без рабочего запуска'}</span><h3>ISnail Academy</h3><p>{en ? 'A proposed AI tutor for course questions and initial assignment feedback.' : 'Проект AI-куратора для вопросов по курсу и первичного разбора заданий.'}</p><strong>{en ? 'Explore the approach' : 'Посмотреть решение'} <span aria-hidden="true">↗</span></strong></div></Link>
  )}</div>;
}
