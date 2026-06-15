const ITEMS = [
  'AI-агенты', 'Telegram Mini Apps', 'Автоматизация',
  'Диагностика бизнеса', 'SaaS-платформы', 'Разработка ПО',
  'RAG-системы', 'Интеграции', 'Claude Opus', 'Supabase',
  'Next.js 15', 'Мультиагентные системы',
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div style={{
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      background: 'var(--bg2)',
      overflow: 'hidden',
      padding: '14px 0',
    }}>
      <div style={{
        display: 'flex',
        gap: 48,
        animation: 'marquee 30s linear infinite',
        width: 'max-content',
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 48, whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sub)' }}>
              {item}
            </span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', opacity: 0.6, flexShrink: 0 }} />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
