import Link from 'next/link';
import Image from 'next/image';
import CookieSettingsButton from '@/components/ui/CookieSettingsButton';
import s from './Chrome.module.css';
export default function Footer({ locale = 'ru' }: { locale?: 'ru' | 'en' }) {
  const en = locale === 'en';
  const prefix = en ? '/en' : '';
  const services = [['ai-agents', en ? 'AI assistants' : 'AI-помощники'], ['business-automation', en ? 'Less manual work' : 'Меньше ручной работы'], ['business-platforms', en ? 'Websites and business tools' : 'Сайты и сервисы для бизнеса']];
  return <footer className={s.footer}>
    <div className={s.footerTop}><div><Link className={s.brand} href={prefix || '/'} aria-label={en ? 'Rhema AI — home' : 'Rhema AI — главная'}><Image src="/logo.png" alt={en ? 'Rhema AI fish logo' : 'Rhema AI — логотип с рыбкой'} width={1725} height={624} sizes="(max-width: 480px) 204px, 228px" className={s.logoImage} /></Link><p>{en ? 'Practical tools for your everyday work.' : 'Помогаем упростить ежедневную работу.'}</p></div><div className={s.footerContacts}><a href="https://t.me/RhemaAI_support" target="_blank" rel="noopener noreferrer">Telegram ↗</a><a href="mailto:hello@rhema.agency">hello@rhema.agency</a></div></div>
    <nav className={s.footerServices} aria-label={en ? 'Our services' : 'Наши услуги'}><Link href={`${prefix}/services`}>{en ? 'All services' : 'Все услуги'} ↗</Link>{services.map(([slug, label]) => <Link key={slug} href={`${prefix}/services/${slug}`}>{label}</Link>)}</nav>
    <div className={s.footerBottom}><span>© 2026 Rhema AI</span><nav aria-label={en ? 'Legal' : 'Документы'}><Link href={`${prefix}/privacy`}>{en ? 'Privacy policy' : 'Конфиденциальность'}</Link><Link href={`${prefix}/consent`}>{en ? 'Data processing consent' : 'Согласие на обработку данных'}</Link><Link href={`${prefix}/offer`}>{en ? 'Service terms' : 'Оферта'}</Link><CookieSettingsButton label={en ? 'Cookie settings' : 'Настройки cookie'} /></nav><a href="#main-content">{en ? 'Back to top ↑' : 'Наверх ↑'}</a></div>
  </footer>;
}
