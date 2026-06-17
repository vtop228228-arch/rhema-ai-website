import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';

const STATS = [
  { value: '3', label: 'месяца от идеи до запуска' },
  { value: '150+', label: 'учеников на платформе' },
  { value: '2×', label: 'рост доходимости курсов' },
  { value: '0', label: 'потерянных заявок и платежей' },
];

const FEATURES = [
  'Вход через Telegram — без паролей и регистраций',
  'AI-куратор проверяет задания за секунды, без менеджера',
  'Видеоуроки с автоматическим отслеживанием прогресса',
  'Онлайн-оплата с автовыдачей доступа к курсам',
  'Геймификация: уровни, достижения, рейтинг учеников',
  'Автоматические уведомления студентам без ручной рассылки',
  'Личный кабинет с историей прогресса и сертификатами',
  'Витрина выпускников — социальное доказательство для продаж',
];

export default function Flagship() {
  return (
    <section className="section-alt">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

          {/* Заголовок */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionLabel>Флагман проект</SectionLabel>
            <h2 className="font-bebas text-ink" style={{ fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '0.03em', margin: 0 }}>
              Академия Черепахина
            </h2>
            <p style={{ fontSize: 16, color: 'var(--sub2)', margin: 0, lineHeight: 1.6 }}>
              Полноценная образовательная SaaS-платформа с AI-куратором, геймификацией и Telegram-экосистемой.<br />
              Мы не просто рассказываем — мы показываем.
            </p>
          </div>

          {/* Статистика */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="font-bebas" style={{ fontSize: 56, color: 'var(--accent)', lineHeight: 1 }}>
                  {s.value}
                </div>
                <p style={{ fontSize: 13, color: 'var(--sub2)', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Фичи — pill tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                padding: '6px 14px',
                border: '1px solid var(--line)',
                borderRadius: 0,
                fontSize: 13,
                color: 'var(--sub2)',
                background: 'var(--card)',
              }}>
                {f}
              </div>
            ))}
          </div>

          {/* Стек */}
          <div style={{
            background: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: 0,
            padding: 28,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 24,
          }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>Фронтенд</p>
              <p style={{ fontSize: 13, color: 'var(--sub2)', margin: 0, lineHeight: 1.8 }}>
                Next.js 16 App Router<br />TypeScript strict<br />Tailwind v4
              </p>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>Бэкенд и AI</p>
              <p style={{ fontSize: 13, color: 'var(--sub2)', margin: 0, lineHeight: 1.8 }}>
                Supabase + pg_cron<br />Claude (AI-куратор)<br />Telegram Bot API
              </p>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>Интеграции</p>
              <p style={{ fontSize: 13, color: 'var(--sub2)', margin: 0, lineHeight: 1.8 }}>
                ЮKassa (оплата)<br />Kinescope (видео)<br />Telegram Login
              </p>
            </div>
          </div>

          <div>
            <Button href="/how-we-work#contact" variant="blue" size="lg">
              Построим что-то похожее для вас
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
