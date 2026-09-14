import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Public Offer — Rhema AI',
  description: 'Rhema AI service terms for AI systems and business automation: scope, payment, delivery, responsibilities, confidentiality and contact details.',
  path: '/offer',
  locale: 'en',
});

const h2: React.CSSProperties = {
  fontSize: 20, fontWeight: 700, color: 'var(--ink)', margin: '32px 0 12px',
};
const p: React.CSSProperties = {
  fontSize: 14, color: 'var(--ink2)', lineHeight: 1.8, margin: '0 0 10px',
};

export default function OfferPage() {
  return (
    <article className="legal-page" style={{ maxWidth: 760, margin: '0 auto', padding: '72px 24px 100px' }}>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
        Public Offer
      </h1>
      <p style={{ ...p, color: 'var(--sub)' }}>For AI system development and business automation services</p>
      <p style={{ ...p, color: 'var(--sub)' }}>Publication date: 17 June 2026</p>

      <h2 style={h2}>1. General provisions</h2>
      <p style={p}>
        This document is a public offer under Article 437 of the Civil Code of the Russian Federation
        made by the self-employed individual <strong>Vladislav Grizhak (Владислав Грижак)</strong>
        {' '}(the “Provider”),
        email: <a href="mailto:rhemaaiagency@gmail.com" style={{ color: 'var(--accent)' }}>rhemaaiagency@gmail.com</a>,
        addressed to any individual with legal capacity or legal entity (the “Client”).
      </p>
      <p style={p}>Payment for services or written confirmation of the terms of cooperation, including by email, constitutes acceptance of this offer.</p>

      <h2 style={h2}>2. Subject of the agreement</h2>
      <p style={p}>The Provider offers the following services: development of AI agents and automated systems; integration of artificial intelligence into business processes; creation of Telegram bots and ecosystems; AI business diagnostics; and consulting and training in AI automation.</p>

      <h2 style={h2}>3. Pricing and payment</h2>
      <p style={p}>The price is determined individually and recorded in the project specification or invoice. Payment follows the arrangement agreed by the parties. A self-employed tax receipt is issued through the “My Tax” application within one business day after payment is received.</p>

      <h2 style={h2}>4. Delivery schedule</h2>
      <p style={p}>Delivery dates are specified in the project specification. The Provider may engage third parties without disclosing their details to the Client.</p>

      <h2 style={h2}>5. Rights and obligations</h2>
      <p style={p}><strong style={{ color: 'var(--ink)' }}>The Provider agrees to:</strong> deliver services within the agreed schedule; maintain the confidentiality of the Client’s data; and hand over the completed work after full payment.</p>
      <p style={p}><strong style={{ color: 'var(--ink)' }}>The Client agrees to:</strong> provide the necessary data and access; pay for services by the agreed deadlines; and accept the completed work.</p>

      <h2 style={h2}>6. Liability</h2>
      <p style={p}>The Provider is not liable for direct or indirect losses arising from use of the developed systems in ways not covered by the project specification. The Provider’s maximum liability is limited to the amount actually received under the agreement.</p>

      <h2 style={h2}>7. Confidentiality</h2>
      <p style={p}>The parties agree not to disclose commercial information obtained during their cooperation to third parties without the other party’s written consent.</p>

      <h2 style={h2}>8. Termination and refunds</h2>
      <p style={p}>The Client may cancel services before work begins, in which case a full refund of the advance payment is possible. After work begins, any refund is calculated in proportion to the work actually completed.</p>

      <h2 style={h2}>9. Governing law</h2>
      <p style={p}>The agreement is governed by the laws of the Russian Federation. Disputes are first addressed through a pre-action claims procedure. If no agreement is reached, the dispute is referred to a court at the Provider’s location.</p>

      <h2 style={h2}>10. Contact details</h2>
      <p style={p}>
        Email: <a href="mailto:rhemaaiagency@gmail.com" style={{ color: 'var(--accent)' }}>rhemaaiagency@gmail.com</a><br />
        Telegram: <a href="https://t.me/RhemaAI_support" style={{ color: 'var(--accent)' }}>@RhemaAI_support</a>
      </p>
    </article>
  );
}
