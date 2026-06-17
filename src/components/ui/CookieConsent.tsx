'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem('cookie_consent', '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      background: 'rgba(12,12,12,0.97)',
      border: '1px solid #1C1C1C',
      backdropFilter: 'blur(12px)',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      maxWidth: 640,
      width: 'calc(100vw - 32px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
    }}>
      <p style={{ fontSize: 13, color: '#999', margin: 0, lineHeight: 1.6, flex: 1 }}>
        Мы используем cookie для корректной работы сайта.{' '}
        <Link href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
          Политика конфиденциальности
        </Link>
      </p>
      <button
        onClick={accept}
        style={{
          background: 'var(--accent)',
          color: '#090909',
          border: 'none',
          padding: '8px 18px',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}
      >
        Принять
      </button>
    </div>
  );
}
