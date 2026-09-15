'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import s from './Chrome.module.css';
export default function Header({ locale = 'ru' }: { locale?: 'ru' | 'en' }) {
  const en = locale === 'en';
  const home = en ? '/en' : '/';
  const links = [{ path: '/services', label: en ? 'Services' : 'Услуги' }, { path: '/cases', label: en ? 'Projects' : 'Проекты' }, { path: '/how-we-work', label: en ? 'Our process' : 'Как работаем' }, { path: '/about', label: en ? 'About' : 'О нас' }].map(link => ({ href: `${en ? '/en' : ''}${link.path}`, label: link.label }));
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const hasLocalContact = !/\/(privacy|offer|demo)$/.test(pathname);
  const contactHref = hasLocalContact ? '#contact' : `${home}#contact`;
  const languageHref = en ? (pathname.replace(/^\/en(?=\/|$)/, '') || '/') : (pathname === '/demo' ? '/en' : `/en${pathname === '/' ? '' : pathname}`);
  return <header className={s.header} onKeyDown={e => { if(e.key === 'Escape') { setOpen(false); button.current?.focus(); } }}>
    <a href="#main-content" className={s.skip}>{en ? 'Skip to content' : 'К содержанию'}</a>
    <div className={s.bar}>
      <Link href={home} className={s.brand} aria-label={en ? 'Rhema AI — home' : 'Rhema AI — главная'} onClick={() => setOpen(false)}><Image src="/logo.png" alt={en ? 'Rhema AI fish logo' : 'Rhema AI — логотип с рыбкой'} width={1725} height={624} sizes="(max-width: 360px) 96px, (max-width: 480px) 104px, 184px" className={s.logoImage} preload /></Link>
      <nav className={s.desktop} aria-label={en ? 'Main navigation' : 'Основная навигация'}>{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</Link>)}</nav>
      <Link className={s.cta} href={contactHref} onClick={() => setOpen(false)} aria-label={en ? 'Free diagnosis' : 'Бесплатная диагностика'}><span className={s.ctaFull}>{en ? 'Free diagnosis' : 'Бесплатная диагностика'}</span><span className={s.ctaShort} aria-hidden="true">{en ? 'Diagnosis' : 'Диагностика'}</span><span className={s.ctaIcon} aria-hidden="true">↗</span></Link>
      <a className={s.language} href={languageHref} hrefLang={en ? 'ru' : 'en'} lang={en ? 'ru' : 'en'} aria-label={en ? 'Перейти на русский' : 'Switch to English'}>{en ? 'RU' : 'EN'}</a>
      <button ref={button} className={s.menuButton} aria-label={open ? (en ? 'Close menu' : 'Закрыть меню') : (en ? 'Open menu' : 'Открыть меню')} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><span className={open ? s.lineOpen : ''} /><span className={open ? s.lineOpen : ''} /></button>
    </div>
    <nav id="mobile-navigation" className={s.mobile} aria-label={en ? 'Mobile navigation' : 'Мобильная навигация'} hidden={!open}>{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? 'page' : undefined}>{link.label}<span aria-hidden="true">↗</span></Link>)}<Link href={contactHref} onClick={() => setOpen(false)}>{en ? 'Get a free diagnosis' : 'Получить бесплатную диагностику'}<span aria-hidden="true">↗</span></Link></nav>
  </header>;
}
