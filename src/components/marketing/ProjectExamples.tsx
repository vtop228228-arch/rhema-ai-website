import Image from 'next/image';
import Link from 'next/link';
import { caseImages } from '@/lib/case-images';
import { productCases, type ProductCaseSlug } from '@/lib/product-cases';
import { websiteCases, type WebsiteCaseSlug } from '@/lib/website-cases';
import { localizedPath, type SiteLocale } from '@/lib/seo';
import c from './Services.module.css';

export default function ProjectExamples({ ids, locale }: { ids: string[]; locale: SiteLocale }) {
  const en = locale === 'en';
  return <div className={c.proofGrid}>{ids.slice(0, 2).map(id => {
    const product = productCases[id as ProductCaseSlug]?.[locale];
    const website = websiteCases[id as WebsiteCaseSlug]?.[locale];
    const shot = caseImages[id as ProductCaseSlug]?.[0];
    const name = product?.name || website?.name || (id === 'jarvis' ? 'Rhema OS / JARVIS' : 'ISnail Academy');
    const title = product?.title || website?.title || (en ? 'A workspace built around everyday tasks.' : 'Рабочая среда под повседневные задачи.');
    const image = shot || (website ? website.screens[0] : id === 'jarvis' ? { src: '/cases/jarvis/agents.png', width: 1290, height: 684 } : null);
    return <Link key={id} className={c.proofCard} href={id === 'isnail' ? `${localizedPath('/cases', locale)}#isnail` : localizedPath(`/cases/${id}`, locale)}>
      {image && <div className={`${c.proofImage} ${shot ? c.phoneProof : ''}`}><Image src={image.src} alt={en ? `${name}: product interface` : `${name}: интерфейс проекта`} width={image.width} height={image.height} sizes="(max-width: 800px) 90vw, 550px" /></div>}
      <div className={c.proofCopy}><span>{en ? 'Completed project' : 'Реализованный проект'}</span><h3>{name}</h3><p>{title}</p><strong>{en ? 'Explore the case' : 'Посмотреть, что сделали'} <span aria-hidden="true">↗</span></strong></div>
    </Link>;
  })}</div>;
}
