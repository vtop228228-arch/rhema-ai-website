export default function StickyDiagCTA() {
  return (
    <>
      <a href="/#diagnose" className="sticky-diag-cta">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#090909" />
        </svg>
        НАЧАТЬ ДИАГНОСТИКУ →
      </a>
      <style>{`
        .sticky-diag-cta {
          display: none;
        }
        @media (max-width: 900px) {
          .sticky-diag-cta {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 200;
            background: linear-gradient(180deg, var(--accent2), var(--accent));
            color: #090909;
            font-family: var(--font-dm), 'DM Sans', sans-serif;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            text-decoration: none;
            padding: 15px 22px;
            box-shadow: 0 -4px 24px rgba(255,106,0,0.35);
          }
        }
      `}</style>
    </>
  );
}
