'use client';

import { useState } from 'react';
import DiagnosticAgent from '@/components/sections/DiagnosticAgent';
import JarvisModal from '@/components/ui/JarvisModal';

export default function HeroMain() {
  const [jarvisOpen, setJarvisOpen] = useState(false);

  return (
    <section className="hero-wrap" id="diagnose" style={{ display: 'flex', minHeight: 640 }}>
      {/* LEFT: МОНОЛИТ */}
      <div
        className="hero-left"
        style={{
          flex: 1,
          minWidth: 0,
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 24,
          position: 'relative',
        }}
      >
        {/* Grid texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,106,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.04) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }} />
        {/* Depth vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 30% 55%, transparent 40%, #090909 82%)',
        }} />

        {/* Eyebrow */}
        <div className="eyebrow" style={{ position: 'relative', zIndex: 1, animation: 'fadeUp 0.5s ease 0.05s both' }}>
          <div className="bar" />
          <span className="text">AI-агентство · автоматизация под ключ</span>
        </div>

        {/* H1 */}
        <h1 className="hero-h1" style={{
          fontFamily: 'var(--font-bebas), Bebas Neue, sans-serif',
          lineHeight: 0.9,
          position: 'relative',
          zIndex: 1,
          overflowWrap: 'break-word',
          wordBreak: 'normal',
        }}>
          <span style={{ display: 'block', color: 'var(--ink)', animation: 'fadeUp 0.6s ease 0.18s both' }}>Проектирование и внедрение</span>
          <span style={{ display: 'block', color: 'var(--accent)', animation: 'fadeUp 0.6s ease 0.3s both' }}>AI-агентов под ваш бизнес</span>
          <span className="hero-sub hero-sub-xs" style={{ display: 'block', color: '#999', fontSize: '0.43em', marginTop: 10, animation: 'fadeUp 0.6s ease 0.4s both' }}>Агент с памятью · Не шаблон · Ваши данные</span>
        </h1>

        {/* Body */}
        <p style={{ fontSize: 15, color: '#AAAAAA', maxWidth: 400, lineHeight: 1.85, position: 'relative', zIndex: 1, animation: 'fadeUp 0.6s ease 0.45s both' }}>
          Интегрируем AI в вашу CRM и внутренние системы. Заменим рутину на агентов, которые помнят каждого клиента, работают 24/7 и полностью окупаются за 1–2 месяца.
        </p>

        {/* Мы используем это сами */}
        <button
          onClick={() => setJarvisOpen(true)}
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 14,
            padding: '14px 16px', maxWidth: 400, width: '100%',
            background: 'rgba(255,106,0,0.07)',
            borderTop: '1px solid rgba(255,106,0,0.22)',
            borderRight: '1px solid rgba(255,106,0,0.22)',
            borderBottom: '1px solid rgba(255,106,0,0.22)',
            borderLeft: '2px solid var(--accent)',
            position: 'relative', zIndex: 1,
            animation: 'fadeUp 0.6s ease 0.55s both',
            cursor: 'pointer', textAlign: 'left',
            transition: 'background 0.18s, border-color 0.18s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,106,0,0.12)';
            (e.currentTarget as HTMLButtonElement).style.borderTopColor = 'rgba(255,106,0,0.35)';
            (e.currentTarget as HTMLButtonElement).style.borderRightColor = 'rgba(255,106,0,0.35)';
            (e.currentTarget as HTMLButtonElement).style.borderBottomColor = 'rgba(255,106,0,0.35)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,106,0,0.07)';
            (e.currentTarget as HTMLButtonElement).style.borderTopColor = 'rgba(255,106,0,0.22)';
            (e.currentTarget as HTMLButtonElement).style.borderRightColor = 'rgba(255,106,0,0.22)';
            (e.currentTarget as HTMLButtonElement).style.borderBottomColor = 'rgba(255,106,0,0.22)';
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 4, height: 4, background: 'var(--accent)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-bebas), Bebas Neue, sans-serif', fontSize: 11, letterSpacing: '2.5px', color: 'var(--accent)' }}>
                МЫ ИСПОЛЬЗУЕМ ЭТО САМИ
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
              <p style={{ fontSize: 13, color: '#999', lineHeight: 1.6, margin: 0 }}>
                <span style={{ color: 'var(--ink)', fontWeight: 500 }}>JARVIS</span> — наш внутренний AI-агент для аналитики продаж и клиентской базы. Строим для вас то, на что сами полагаемся каждый день.
              </p>
              <span style={{
                fontFamily: 'var(--font-bebas), Bebas Neue, sans-serif',
                fontSize: 10, letterSpacing: '1.5px', color: 'var(--accent)',
                whiteSpace: 'nowrap', flexShrink: 0, paddingBottom: 2,
              }}>
                СМОТРЕТЬ →
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* DIVIDER */}
      <div className="hero-divider" style={{ width: 1, background: 'var(--line2)', flexShrink: 0 }} />

      {/* RIGHT: живой AI-агент диагностики */}
      <DiagnosticAgent />

      <JarvisModal open={jarvisOpen} onClose={() => setJarvisOpen(false)} />

      <style>{`
        .hero-h1 { font-size: clamp(28px, 7.5vw, 76px); }
        .hero-sub-xs { letter-spacing: 5px; }
        .hero-left {
          padding: 60px 40px 60px 72px;
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .hero-wrap { flex-direction: column; min-height: auto; }
          .hero-left { padding: 48px 22px 36px; overflow: visible; }
          .hero-divider { display: none; }
        }
        @media (max-width: 600px) {
          .hero-h1 { font-size: 5.5vw; }
        }
        @media (max-width: 480px) {
          .hero-h1 { font-size: 5.2vw; }
          .hero-left { padding: 40px 20px 28px; }
          .hero-sub { letter-spacing: 2px; }
          .hero-sub-xs { letter-spacing: 1.5px; }
        }
      `}</style>
    </section>
  );
}
