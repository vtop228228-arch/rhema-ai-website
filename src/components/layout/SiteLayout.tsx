import { Manrope } from 'next/font/google';
import '@/app/globals.css';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from '@/components/ui/CookieConsent';
import Analytics from '@/components/analytics/Analytics';
import { SiteIdentity } from '@/components/marketing/StructuredData';
import type { SiteLocale } from '@/lib/seo';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700', '800'], variable: '--font-heading', display: 'swap' });

export default function SiteLayout({ children, locale }: { children: React.ReactNode; locale: SiteLocale }) {
  return <html lang={locale} className={manrope.variable}><body>
    <SiteIdentity />
    <div id="scroll-root" style={{ position: 'relative', zIndex: 1, height: '100dvh', overflowY: 'auto', overflowX: 'hidden' }}>
      <Header locale={locale} /><main id="main-content" tabIndex={-1}>{children}</main><Footer locale={locale} />
    </div>
    <CookieConsent locale={locale} /><Analytics />
  </body></html>;
}
