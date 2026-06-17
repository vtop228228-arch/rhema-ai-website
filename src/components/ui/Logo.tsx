const BEBAS = 'Bebas Neue, var(--font-bebas), sans-serif';

interface LogoMarkProps {
  size?: number;
}

// Знак «Ихтис» — рыбка из двух пересекающихся дуг (отсылка к названию Rhema).
export function LogoMark({ size = 26 }: LogoMarkProps) {
  // Вытянутый ихтис ~1.7:1. height = size, width пропорционален.
  return (
    <svg width={Math.round(size * 56 / 34)} height={size} viewBox="0 0 56 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Верхняя дуга (белая) → нижнее перо хвоста */}
      <path
        d="M3 17 C 8 7, 26 5, 40 14 C 44 16, 47 20, 52 25"
        stroke="#F5F5F5"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Нижняя дуга + хвост (оранжевые), пересекают белую */}
      <path
        d="M3 17 C 8 27, 26 29, 40 20 C 44 18, 47 14, 52 9"
        stroke="var(--accent)"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface LogoProps {
  markSize?: number;
  textSize?: number;
  glow?: boolean;
}

// Локап: знак + вордмарка RHEMA AI.
export default function Logo({ markSize = 24, textSize = 20, glow = true }: LogoProps) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
      <span style={{ display: 'flex', filter: glow ? 'drop-shadow(0 0 8px rgba(255,92,26,0.45))' : 'none' }}>
        <LogoMark size={markSize} />
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
        <span style={{ fontFamily: BEBAS, fontSize: textSize, letterSpacing: '0.12em', color: '#F5F5F5' }}>RHEMA</span>
        <span style={{ fontFamily: BEBAS, fontSize: textSize, letterSpacing: '0.12em', color: 'var(--accent)', textShadow: '0 0 12px rgba(255,92,26,0.5)', marginLeft: `${-textSize * 0.52}px` }}>AI</span>
      </span>
    </span>
  );
}
