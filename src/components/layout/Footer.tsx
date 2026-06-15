'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)' }}>

      {/* Нижняя строка */}
      <div className="container" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>

        {/* Логотип */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span className="font-bebas" style={{ fontSize: 22, letterSpacing: '0.08em', color: 'var(--ink)' }}>
            RHEMA <span style={{ color: 'var(--accent)' }}>AI</span>
          </span>
        </Link>

        {/* Иконки соцсетей */}
        <div style={{ display: 'flex', gap: 10 }}>
          <a
            href="mailto:vtop228228@gmail.com"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--card)',
              border: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: 'var(--sub)',
              fontSize: 16,
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
              (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)';
              (e.currentTarget as HTMLElement).style.color = 'var(--sub)';
            }}
          >
            ✉
          </a>
          <a
            href="https://t.me/rhema_ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--card)',
              border: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: 'var(--sub)',
              fontSize: 14,
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
              (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)';
              (e.currentTarget as HTMLElement).style.color = 'var(--sub)';
            }}
          >
            ✈
          </a>
        </div>
      </div>

      {/* Разделитель + копирайт */}
      <div style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container" style={{ padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--sub)' }}>© 2026 Rhema AI. Все права защищены.</span>
          <Link href="/privacy" style={{ fontSize: 12, color: 'var(--sub)', textDecoration: 'none' }}>
            Политика конфиденциальности
          </Link>
        </div>
      </div>

    </footer>
  );
}
