import SectionLabel from '@/components/ui/SectionLabel';

const COMPETENCIES = [
  {
    category: 'AI/ML',
    items: ['Claude (Opus/Sonnet/Haiku)', 'RAG системы', 'Векторные БД (pgvector)', 'Deepgram (голос)', 'Мультиагентные системы'],
  },
  {
    category: 'Fullstack',
    items: ['Next.js 15 App Router', 'TypeScript strict', 'Supabase + PostgreSQL', 'Vercel Edge Functions', 'Telegram Mini Apps'],
  },
  {
    category: 'Интеграции',
    items: ['Telegram Bot API', 'WhatsApp / Twilio', 'YooKassa / Stripe', 'Kinescope / YouTube', 'Google Calendar / Maps'],
  },
];

export default function Competencies() {
  return (
    <section className="section-alt">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SectionLabel>Стек</SectionLabel>
            <h2 className="font-bebas text-ink" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '0.03em' }}>
              Наши компетенции
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {COMPETENCIES.map((comp, i) => (
              <div key={i} style={{
                background: 'var(--card)',
                border: '1px solid var(--line)',
                borderRadius: 0,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}>
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: 'var(--accent)',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  {comp.category}
                </h3>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, listStyle: 'none', margin: 0, padding: 0 }}>
                  {comp.items.map((item, j) => (
                    <li key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        flexShrink: 0,
                        marginTop: 6,
                      }} />
                      <span style={{ fontSize: 14, color: 'var(--ink)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
