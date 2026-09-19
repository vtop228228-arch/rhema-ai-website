import Link from 'next/link';
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
      <p style={{ ...p, color: 'var(--sub)' }}>Version of 19 September 2026</p>

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
      <p style={p}>Processing is based on your consent under Article 9 of Russian Federal Law No. 152-FZ “On Personal Data”. The consent is a separate document — the <Link href="/en/consent" style={{ color: 'var(--accent)' }}>Consent to Personal Data Processing</Link> — which you give by ticking the box in the form before submitting it.</p>

      <h2 style={h2}>5. Data storage and protection</h2>
      <p style={p}>Requests are processed using the website server on Vercel, team notifications through Telegram, our CRM and, when configured, Supabase. Diagnostic answers are sent to an AI provider, Anthropic or NVIDIA, to prepare the analysis. Your name and contact from the form are not included in AI requests. Do not include passwords, payment credentials or your customers’ personal data in your answers.</p>

      <h2 style={h2}>6. Retention periods</h2>
      <p style={p}>A request from a form or the diagnosis — name, contact details, task description, answers, analysis and traffic source — is kept for no more than 1 year after your last contact if no agreement is concluded. If an agreement is concluded, it is kept for the term of the agreement and 3 years after its performance (the limitation period under Article 196 of the Russian Civil Code). Telegram notifications and correspondence about the request are deleted on the same schedule.</p>
      <p style={p}>Your IP address is used only in server memory to protect forms from abuse and is not stored. Traffic sources and campaign tags in sessionStorage are kept until the tab is closed; your cookie choice in localStorage is kept until you change it or clear your browser data. After you withdraw consent, your data is deleted within 30 days.</p>

      <h2 style={h2}>7. Cross-border transfer</h2>
      <p style={p}>The website and request-processing services run on servers outside the Russian Federation. With your consent, data is transferred to: Vercel Inc. (USA) — website hosting and form processing; Supabase Inc. (servers outside Russia) — storing requests in the CRM; Telegram (servers outside Russia) — request notifications; Anthropic PBC and NVIDIA Corporation (USA) — preparing the analysis from diagnosis answers, without your name or contact details. Emails sent to @rhema.agency addresses are forwarded through Cloudflare, Inc. (USA) and stored in Google LLC (USA) mail.</p>

      <h2 style={h2}>8. Cookies and web analytics</h2>
      <p style={p}>Yandex Metrica loads after analytics consent and sets its own cookies. It measures page views, clicks, diagnosis stages, scroll depth and traffic sources. Sources and campaign tags are stored in sessionStorage for the browser tab and may accompany a request. Names, contacts and diagnostic answers are not included in Metrica events. Session replay is disabled. The website and forms remain available if you decline analytics.</p>
      <p style={p}>You can change your choice or withdraw analytics consent at any time via “Cookie settings” at the bottom of the page: Metrica is switched off and its cookies are deleted.</p>

      <h2 style={h2}>9. Your rights</h2>
      <p style={p}>You may request information about the processing of your data, ask for it to be corrected, blocked or deleted, and withdraw your consent by emailing <a href="mailto:privacy@rhema.agency" style={{ color: 'var(--accent)' }}>privacy@rhema.agency</a>. We reply within 10 working days of receiving the request (Articles 14 and 20 of Federal Law No. 152-FZ).</p>

      <h2 style={h2}>10. Changes to this policy</h2>
      <p style={p}>The current version is always available at /en/privacy and applies from the moment of publication. If the purposes of processing or the data we collect change, we will ask for your consent again.</p>
    </article>
  );
}
