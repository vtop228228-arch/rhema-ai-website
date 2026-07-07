import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';

// Блок «Кто мы» — честный текст без стоковых фото и выдуманных регалий.
// Главный аргумент доверия: мы сами работаем на тех же инструментах, которые продаём.
const POINTS = [
  {
    title: 'Сами работаем на том, что продаём',
    text: 'Наш сайт ведёт диагностику AI-агентом. Наша CRM управляется агентами. Наши процессы автоматизированы теми же инструментами, которые мы внедряем клиентам. Мы продаём не презентации — а то, чем пользуемся каждый день.',
  },
  {
    title: 'Малый и средний бизнес — наш фокус',
    text: 'Работаем с компаниями, где владелец рядом, решения принимаются быстро, а эффект виден в деньгах, а не в отчётах. Не берёмся за всё подряд: если на диагностике видим, что AI вам сейчас не нужен — так и скажем.',
  },
  {
    title: 'Инженерия, а не конструктор',
    text: 'Во главе — AI-архитектор Владислав Грижак. Мы проектируем систему под ваши процессы и отдаём код, который принадлежит вам, — без зависимости от чужих платформ и подписок.',
  },
];

export default function WhoWeAre() {
  return (
    <section className="section-alt">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionLabel>Кто мы</SectionLabel>
            <h2 className="font-bebas text-ink" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '0.03em', margin: 0 }}>
              Небольшая команда, которая строит, а не рассказывает
            </h2>
          </div>

          <div className="whoweare-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {POINTS.map((p, i) => (
              <div key={i} style={{
                background: 'var(--card)',
                border: '1px solid var(--line)',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>{p.title}</h3>
                <p style={{ fontSize: 13.5, color: 'var(--sub2)', margin: 0, lineHeight: 1.7 }}>{p.text}</p>
              </div>
            ))}
          </div>

          <div>
            <Button href="/#diagnose" variant="blue" size="md">Проверить нас в деле — бесплатная диагностика</Button>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .whoweare-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
