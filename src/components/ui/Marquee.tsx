const ITEMS: { label: string; accent?: boolean }[] = [
  { label: 'AI-АГЕНТЫ 24/7' },
  { label: 'ROI ЗА 1–2 МЕСЯЦА' },
  { label: 'ВНЕДРЕНИЕ ПОД КЛЮЧ' },
  { label: 'БЕСПЛАТНАЯ ДИАГНОСТИКА', accent: true },
  { label: 'ОСТРЫЕ РЕШЕНИЯ ДЛЯ БИЗНЕСА' },
];

function Track() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
      {ITEMS.map((item, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-bebas), Bebas Neue, sans-serif',
            fontSize: 15, letterSpacing: '2.5px',
            color: item.accent ? 'var(--accent)' : '#888',
            padding: '11px 20px',
          }}>
            {item.label}
          </span>
          <span style={{ color: 'rgba(255,106,0,0.35)', padding: '0 2px', fontSize: 15, lineHeight: 1 }}>→</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div style={{ overflow: 'hidden', background: 'var(--bg2)', borderTop: '1px solid #0E0E0E', borderBottom: '1px solid #0E0E0E' }}>
      <div style={{ display: 'flex', width: 'max-content', alignItems: 'center', animation: 'marquee 44s linear infinite' }}>
        <Track />
        <Track />
      </div>
    </div>
  );
}
