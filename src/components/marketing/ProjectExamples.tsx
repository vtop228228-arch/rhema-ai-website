import Link from 'next/link';
import { localizedPath, type SiteLocale } from '@/lib/seo';
import c from './Services.module.css';
import CaseCard from './CaseCard';

export default function ProjectExamples({ ids, locale }: { ids: string[]; locale: SiteLocale }) {
  const en = locale === 'en';
  return <div className={c.proofGrid}>{ids.slice(0, 2).map(id => id !== 'isnail'
    ? <CaseCard key={id} slug={id} locale={locale} heading="h3" />
    : <Link key={id} className={c.proofCard} href={`${localizedPath('/cases', locale)}#isnail`}><div className={c.proofCopy}><span>{en ? 'Completed project' : 'Реализованный проект'}</span><h3>ISnail Academy</h3><p>{en ? 'A platform for online learning.' : 'Платформа для онлайн-обучения.'}</p><strong>{en ? 'Explore the case' : 'Посмотреть, что сделали'} <span aria-hidden="true">↗</span></strong></div></Link>
  )}</div>;
}