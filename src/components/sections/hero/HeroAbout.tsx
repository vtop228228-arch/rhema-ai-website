export default function HeroAbout() {
  return (
    <section className="section bg-bg" style={{ paddingTop: 160, paddingBottom: 112 }}>
      <div className="container">
        <div style={{ maxWidth: 720 }}>
          <h1 className="font-bebas text-ink" style={{ fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: 1.02, letterSpacing: '0.02em', margin: 0 }}>
            МЫ СТРОИМ AI-СИСТЕМЫ,<br />
            А НЕ ПОДКЛЮЧАЕМ CHATGPT
          </h1>
          <p style={{ fontSize: 17, color: 'var(--sub2)', lineHeight: 1.7, marginTop: 20, marginBottom: 0 }}>
            Полноценные решения с интерфейсами, аналитикой, интеграциями — за недели, не за месяцы.
            Enterprise-quality по цене стартапа.
          </p>
        </div>
      </div>
    </section>
  );
}
