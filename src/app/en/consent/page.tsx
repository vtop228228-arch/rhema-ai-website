import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Consent to Personal Data Processing — Rhema AI',
  description: 'The consent you give when submitting a form on the Rhema AI website: controller, data, purposes, transfers, retention and how to withdraw.',
  path: '/consent',
  locale: 'en',
});

const h2: React.CSSProperties = {
  fontSize: 20, fontWeight: 700, color: 'var(--ink)', margin: '32px 0 12px',
};
const p: React.CSSProperties = {
  fontSize: 14, color: 'var(--ink2)', lineHeight: 1.8, margin: '0 0 10px',
};
const a: React.CSSProperties = { color: 'var(--accent)' };

export default function ConsentPage() {
  const host = new URL(SITE_URL).hostname;
  return (
    <article className="legal-page" style={{ maxWidth: 760, margin: '0 auto', padding: '72px 24px 100px' }}>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
        Consent to Personal Data Processing
      </h1>
      <p style={{ ...p, color: 'var(--sub)' }}>Version of 19 September 2026</p>

      <p style={p}>
        By ticking “I give my consent to the processing of my personal data” and submitting a form on{' '}
        <a href={SITE_URL} style={a}>{host}</a>, I freely, of my own will and in my own interest consent to the
        controller processing my personal data on the terms below (Article 9 of Russian Federal Law No. 152-FZ
        “On Personal Data” of 27 July 2006).
      </p>

      <h2 style={h2}>1. Controller</h2>
      <p style={p}>
        <strong>Vladislav Grizhak (Владислав Грижак)</strong>, a self-employed individual registered under Russia’s
        professional income tax regime, email: <a href="mailto:privacy@rhema.agency" style={a}>privacy@rhema.agency</a>.
      </p>

      <h2 style={h2}>2. Data</h2>
      <p style={p}>Name; contact details — phone number, email or messenger username; task description, diagnosis answers and the analysis prepared from them. If I allowed analytics — traffic source, campaign tags and landing page.</p>

      <h2 style={h2}>3. Purposes</h2>
      <p style={p}>Reviewing my request and contacting me; arranging and holding a free call or diagnosis; preparing an initial analysis from my answers; entering into and performing a service agreement.</p>

      <h2 style={h2}>4. Processing operations</h2>
      <p style={p}>Collection, recording, organisation, accumulation, storage, clarification (updating, changing), retrieval, use, transfer (provision, access), blocking, deletion and destruction. Processing is automated and involves transfer over the Internet.</p>

      <h2 style={h2}>5. Transfers, including outside Russia</h2>
      <p style={p}>I agree that, for these purposes, my data is transferred to the services that run the website and process requests, including cross-border transfer:</p>
      <p style={p}>
        — Vercel Inc. (USA) — website hosting and form processing;<br />
        — Supabase Inc. (servers outside Russia) — storing requests in the CRM;<br />
        — Telegram (servers outside Russia) — notifying the controller about new requests;<br />
        — Anthropic PBC and NVIDIA Corporation (USA) — preparing the analysis from diagnosis answers. Name and contact details are not sent to these services.
      </p>

      <h2 style={h2}>6. Duration and retention</h2>
      <p style={p}>This consent is valid until the purposes are achieved or until I withdraw it. If no agreement is concluded, request data is kept for no more than 1 year after my last contact. If an agreement is concluded, it is kept for the term of the agreement and 3 years after its performance. The data is then deleted.</p>

      <h2 style={h2}>7. Withdrawal</h2>
      <p style={p}>
        I may withdraw this consent at any time by emailing{' '}
        <a href="mailto:privacy@rhema.agency" style={a}>privacy@rhema.agency</a>. The controller stops processing and
        deletes the data within 30 days of receiving the withdrawal, unless the law provides otherwise
        (Article 21(5) of Federal Law No. 152-FZ).
      </p>

      <p style={{ ...p, marginTop: 32 }}>
        How the controller handles data is described in the <Link href="/en/privacy" style={a}>Privacy Policy</Link>.
      </p>
    </article>
  );
}
