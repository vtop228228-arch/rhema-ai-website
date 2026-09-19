import { pageMetadata } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Privacy Policy — Rhema AI',
  description: 'How Rhema AI processes contact form data, uses cookies and analytics, and handles requests about your personal data.',
  path: '/privacy',
  locale: 'en',
});

const h2: React.CSSProperties = {
  fontSize: 20, fontWeight: 700, color: 'var(--ink)', margin: '32px 0 12px',
};
const p: React.CSSProperties = {
  fontSize: 14, color: 'var(--ink2)', lineHeight: 1.8, margin: '0 0 10px',
};

export default function PrivacyPage() {
  return (
    <article className="legal-page" style={{ maxWidth: 760, margin: '0 auto', padding: '72px 24px 100px' }}>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
        Privacy Policy
      </h1>
      <p style={{ ...p, color: 'var(--sub)' }}>Effective date: 17 June 2026</p>

      <h2 style={h2}>1. Personal data controller</h2>
      <p style={p}>
        The personal data controller is a self-employed individual registered under Russia’s
        professional income tax regime: <strong>Vladislav Grizhak (Владислав Грижак)</strong>,
        email: <a href="mailto:privacy@rhema.agency" style={{ color: 'var(--accent)' }}>privacy@rhema.agency</a>,
        website: <a href={SITE_URL} style={{ color: 'var(--accent)' }}>{new URL(SITE_URL).hostname}</a>.
      </p>

      <h2 style={h2}>2. Data we collect</h2>
      <p style={p}>Forms collect your name, contact details and task description. The diagnosis processes your answers and initial analysis. With analytics consent, your request also includes the traffic source, campaign tags and landing page. You provide this information voluntarily.</p>

      <h2 style={h2}>3. Purposes of processing</h2>
      <p style={p}>We process your data to respond to your enquiry, provide a consultation, enter into a service agreement and communicate about working together.</p>

      <h2 style={h2}>4. Legal basis</h2>
      <p style={p}>Processing is based on your consent under Article 9 of Russian Federal Law No. 152-FZ “On Personal Data”, which you give when submitting the form.</p>

      <h2 style={h2}>5. Data storage and protection</h2>
      <p style={p}>Requests are processed using the website server on Vercel, team notifications through Telegram, our CRM and, when configured, Supabase. Diagnostic answers are sent to an AI provider, Anthropic or NVIDIA, to prepare the analysis. Your name and contact from the form are not included in AI requests. Do not include passwords, payment credentials or your customers’ personal data in your answers.</p>

      <h2 style={h2}>6. Cookies and web analytics</h2>
      <p style={p}>Yandex Metrica loads after analytics consent. It measures page views, clicks, diagnosis stages, scroll depth and traffic sources. Sources and campaign tags are stored in sessionStorage for the browser tab and may accompany a request. Names, contacts and diagnostic answers are not included in Metrica events. Session replay is disabled. The website and forms remain available if you decline analytics.</p>

      <h2 style={h2}>7. Your rights</h2>
      <p style={p}>You may request access to, correction or deletion of your data, or withdraw your consent, by emailing the controller.</p>

      <h2 style={h2}>8. Changes to this policy</h2>
      <p style={p}>The current version is always available at /en/privacy. Continued use of the website after changes means that you agree to the updated version.</p>
    </article>
  );
}
