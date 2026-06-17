'use client';

import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '/how-we-work', label: 'Как работаем' },
  { href: '/cases', label: 'Кейсы' },
  { href: '/about', label: 'О нас' },
  { href: '/#contact', label: 'Контакты' },
];

export default function Header() {
  return (
    <nav
      style={{
        background: 'rgba(9,9,9,0.97)',
        borderBottom: '1px solid var(--line)',
        height: 54,
        display: 'flex',
        alignItems: 'center',
        gap: 36,
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      className="header-bar"
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <Image src="/logo.png" alt="RHEMA AI" height={50} width={138} style={{ height: 50, width: 'auto', display: 'block' }} priority />
      </Link>

      <div style={{ flex: 1 }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="header-links">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: 11,
              color: '#999',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontWeight: 500,
              transition: 'color 0.18s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#999'; }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link href="/#diagnose" className="btn btn-blue btn-sm" style={{ flexShrink: 0 }}>
        ДИАГНОСТИКА
      </Link>

      <style>{`
        .header-bar { padding: 0 72px; }
        @media (max-width: 720px) {
          .header-bar { padding: 0 18px; gap: 14px; }
          .header-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
