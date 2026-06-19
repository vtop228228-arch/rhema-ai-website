'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/how-we-work', label: 'Как работаем' },
  { href: '/cases', label: 'Кейсы' },
  { href: '/about', label: 'О нас' },
  { href: '/#contact', label: 'Контакты' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav
        style={{
          background: 'rgba(9,9,9,0.97)',
          borderBottom: '1px solid var(--line)',
          height: 54,
          display: 'flex',
          alignItems: 'center',
          gap: 36,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          // Фикс position:fixed в Telegram WebView (WKWebView)
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          willChange: 'transform',
        }}
        className="header-bar"
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Image src="/logo.png" alt="RHEMA AI" height={50} width={138} style={{ height: 50, width: 'auto', display: 'block' }} priority />
        </Link>

        <div style={{ flex: 1 }} />

        {/* Desktop nav */}
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

        <Link href="/#diagnose" className="btn btn-blue btn-sm header-cta">
          ДИАГНОСТИКА
        </Link>

        {/* Бургер — только мобайл */}
        <button
          className="burger-btn"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        >
          <span className={`burger-line ${open ? 'open' : ''}`} />
          <span className={`burger-line ${open ? 'open' : ''}`} />
          <span className={`burger-line ${open ? 'open' : ''}`} />
        </button>

        <style>{`
          .header-bar { padding: 0 72px; }
          @media (max-width: 720px) {
            .header-bar { padding: 0 18px; gap: 12px; }
            .header-links { display: none !important; }
            .header-cta { display: none !important; }
          }
          .burger-btn {
            display: none;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 36px;
            height: 36px;
            background: rgba(255,106,0,0.08);
            border: 1px solid rgba(255,106,0,0.22);
            cursor: pointer;
            padding: 8px;
            flex-shrink: 0;
          }
          @media (max-width: 720px) {
            .burger-btn { display: flex; }
          }
          .burger-line {
            display: block;
            width: 100%;
            height: 1.5px;
            background: var(--ink);
            transition: transform 0.22s, opacity 0.22s;
            transform-origin: center;
          }
          .burger-line.open:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
          .burger-line.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
          .burger-line.open:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
        `}</style>
      </nav>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 98 }}
        />
      )}

      {/* Mobile drawer */}
      <div
        style={{
          position: 'fixed',
          top: 54,
          left: 0,
          right: 0,
          background: '#0A0A0B',
          borderBottom: '1px solid var(--line2)',
          zIndex: 99,
          transform: open ? 'translateY(0)' : 'translateY(-105%)',
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
          padding: '12px 0 20px',
        }}
      >
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 22px',
              fontSize: 13,
              color: '#C0BBB2',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontWeight: 500,
              borderBottom: i < NAV_LINKS.length - 1 ? '1px solid var(--line)' : 'none',
              transition: 'color 0.18s',
            }}
          >
            <span style={{ width: 3, height: 3, background: 'var(--accent)', flexShrink: 0, display: 'block' }} />
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
