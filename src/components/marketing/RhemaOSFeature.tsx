import Link from 'next/link';
import { localizedPath, type SiteLocale } from '@/lib/seo';
import RhemaOSVisual from './RhemaOSVisual';
import s from './Editorial.module.css';
import c from './RhemaOS.module.css';

export default function RhemaOSFeature({ locale = 'ru', anchor = false }: { locale?: SiteLocale; anchor?: boolean }) {
  const en = locale === 'en';
  return <article className={c.feature} id={anchor ? 'jarvis' : undefined} data-reveal>
    <div className={c.featureCopy}>
      <span className={s.kicker}>{en ? 'Built for our own team' : 'Сначала построили для себя'}</span>
      <h2>Rhema OS<span className={c.alias}>JARVIS</span></h2>
      <p className={c.featureLead}>{en ? 'Clients, tasks and AI helpers in one place.' : 'Клиенты, задачи и AI-помощники в одном месте.'}</p>
      <p>{en ? 'We built a workspace for our own team. It keeps client enquiries together, helps review sales calls and prepares draft messages and posts. A person checks the work and decides what happens next.' : 'Собрали систему для своей команды: в ней видны обращения клиентов, разборы звонков, задачи и черновики публикаций. AI-помощники готовят материалы, а человек проверяет их и принимает решения.'}</p>
      <Link className={s.button} href={localizedPath('/cases/jarvis', locale)}>{en ? 'Explore Rhema OS' : 'Разобрать Rhema OS'}<span aria-hidden="true">↗</span></Link>
    </div>
    <RhemaOSVisual locale={locale} />
  </article>;
}
