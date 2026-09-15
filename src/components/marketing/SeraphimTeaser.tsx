import Image from 'next/image';
import Link from 'next/link';
import { localizedPath, type SiteLocale } from '@/lib/seo';
import s from './Editorial.module.css';
import c from './Seraphim.module.css';

export default function SeraphimTeaser({locale='ru',anchor=false}:{locale?:SiteLocale;anchor?:boolean}){
 const en=locale==='en';
 return <article className={c.teaser} id={anchor?'seraphim':undefined}>
  <div className={c.teaserCopy}><span className={s.kicker}>SERAPHIM / {en?'Digital office':'Цифровой офис'}</span><h2>{en?'38 AI agents. One workspace.':'38 AI-агентов. Один рабочий офис.'}</h2><p>{en?'Email, marketing, sales, finance and operations have their own roles. A shared task panel shows what is happening across the office.':'Почта, маркетинг, продажи, финансы и операционные задачи распределены по ролям. В общей панели видно, что происходит в офисе.'}</p><Link className={s.button} href={localizedPath('/cases/seraphim',locale)}>{en?'Explore the office':'Посмотреть, как устроен офис'}<span aria-hidden="true">↗</span></Link></div>
  <Link className={c.cover} href={localizedPath('/cases/seraphim',locale)} aria-label={en?'Explore SERAPHIM digital office':'Посмотреть кейс цифрового офиса SERAPHIM'}><Image src="/cases/seraphim/office.png" width={1274} height={663} alt={en?'SERAPHIM departments and shared task panel':'SERAPHIM: отделы цифрового офиса и общая панель задач'} sizes="(max-width:800px) 90vw, 750px"/><span>{en?'Actual interface · SERAPHIM beta':'Реальный интерфейс · SERAPHIM beta'}</span></Link>
 </article>;
}
