import FishArtwork from '@/components/ui/FishArtwork';
import type { SiteLocale } from '@/lib/seo';
import c from './RhemaOS.module.css';

export default function RhemaOSVisual({ locale = 'ru' }: { locale?: SiteLocale }) {
  const en = locale === 'en';
  const roles = en ? ['Sales', 'Documents', 'Routine tasks', 'Team tools', 'Publications', 'Research'] : ['Продажи', 'Документы', 'Рутинные задачи', 'Сервисы команды', 'Публикации', 'Исследования'];
  return <figure className={c.visual}>
    <div className={c.console}>
      <div className={c.consoleTop}><span><FishArtwork className={c.fish} />Rhema OS</span><span>{en ? 'HOW WORK IS SHARED' : 'КАК РАСПРЕДЕЛЕНА РАБОТА'}</span></div>
      <div className={c.network}>
        <div className={c.human}><span className={c.nodeLabel}>{en ? 'Human control' : 'Контроль человека'}</span><strong>{en ? 'Founder' : 'Основатель'}</strong></div>
        <span className={c.wire} aria-hidden="true" />
        <div className={c.director}><span className={c.nodeLabel}>{en ? 'AI coordinator' : 'AI-координатор'}</span><strong>{en ? 'Assigns the tasks' : 'Распределяет задачи'}</strong></div>
        <span className={c.wire} aria-hidden="true" />
        <div className={c.architect}><span className={c.nodeLabel}>{en ? 'Technical helper' : 'Технический помощник'}</span><strong>{en ? 'Connects the tools' : 'Связывает рабочие сервисы'}</strong></div>
        <span className={c.wire} aria-hidden="true" />
        <ul className={c.roles}>{roles.map((role, i) => <li key={role}><span aria-hidden="true">0{i + 1}</span>{role}</li>)}</ul>
      </div>
      <div className={c.consoleBottom}><span>{en ? 'Shared information' : 'Общие данные'}</span><span>{en ? 'Work history' : 'История работы'}</span><span>{en ? 'Running costs' : 'Расходы на работу'}</span></div>
    </div>
    <figcaption>{en ? 'Simplified system diagram based on the Rhema OS interface.' : 'Упрощённая схема системы по интерфейсу Rhema OS.'}</figcaption>
  </figure>;
}
