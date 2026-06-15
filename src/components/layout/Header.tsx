'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

const NAV_LINKS = [
  { href: '/how-we-work', label: 'Как мы работаем' },
  { href: '/how-we-work#cases', label: 'Кейсы' },
  { href: '/how-we-work#pricing', label: 'Сроки' },
  { href: '/how-we-work#faq', label: 'FAQ' },
  { href: '/about', label: 'О нас' },
];

export default function Header() {
  return (
    /* Floating pill — детачированный от края, как у Linear / Vercel */
    <header style={{
      position: 'fixed',
      top: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      width: 'calc(100% - 64px)',
      maxWidth: 1100,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 52,
        padding: '0 8px 0 20px',
        background: 'rgba(8,8,8,0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 9999,
        boxShadow: '0 4px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05) inset',
      }}>

        {/* Логотип */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 2 }}>
          <span style={{
            fontFamily: 'Bebas Neue, var(--font-bebas), sans-serif',
            fontSize: 20,
            letterSpacing: '0.12em',
            color: '#F5F5F5',
          }}>
            RHEMA
          </span>
          <span style={{
            fontFamily: 'Bebas Neue, var(--font-bebas), sans-serif',
            fontSize: 20,
            letterSpacing: '0.12em',
            color: 'var(--accent)',
            textShadow: '0 0 12px rgba(255,92,26,0.5)',
          }}>
            AI
          </span>
        </Link>

        {/* Навигация */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: 13,
                fontWeight: 500,
                fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif',
                letterSpacing: '0.01em',
                padding: '6px 12px',
                textDecoration: 'none',
                color: 'rgba(255,255,255,0.45)',
                borderRadius: 9999,
                transition: 'color 0.25s, background 0.25s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = '#F5F5F5';
                el.style.background = 'rgba(255,255,255,0.06)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = 'rgba(255,255,255,0.45)';
                el.style.background = 'transparent';
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Button href="/how-we-work#contact" variant="blue" size="sm">
          Получить диагностику
        </Button>

      </div>
    </header>
  );
}
