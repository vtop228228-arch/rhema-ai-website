import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer-pad" style={{ borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, padding: '24px 72px' }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <Image src="/logo.png" alt="RHEMA AI" height={22} width={61} style={{ height: 22, width: 'auto', display: 'block' }} />
      </Link>

      <span style={{ fontSize: 12, color: '#666' }}>© 2026 Rhema AI. Все права защищены.</span>

      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="https://t.me/RhemaAI_support" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#888', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 500 }}>Telegram</a>
        <a href="mailto:rhemaaiagency@gmail.com" style={{ fontSize: 12, color: '#888', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 500 }}>Email</a>
        <Link href="/privacy" style={{ fontSize: 12, color: '#666', letterSpacing: '1px', textTransform: 'uppercase' }}>Политика</Link>
        <Link href="/offer" style={{ fontSize: 12, color: '#666', letterSpacing: '1px', textTransform: 'uppercase' }}>Оферта</Link>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .footer-pad { padding: 24px 22px !important; justify-content: center; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
