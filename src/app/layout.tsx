import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ShaderBackground from '@/components/ui/ShaderBackground';
import MobileBackground from '@/components/ui/MobileBackground';
import CookieConsent from '@/components/ui/CookieConsent';
import Analytics from '@/components/analytics/Analytics';
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/site';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: 'AI автоматизация, AI агент, диагностика бизнеса, Telegram бот',
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'ru_RU',
    // Картинку 1200×630 подставляет файл-конвенция app/opengraph-image.tsx —
    // Next автоматически добавляет og:image (и twitter:image как фолбэк).
    // Явный список images здесь дал бы дубли og:image-тегов, поэтому не указываем.
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <ShaderBackground />
        <MobileBackground />
        {/* scroll-root — прокручиваемый контейнер.
            sticky внутри него работает надёжно в любом WebView (в т.ч. Telegram) */}
        <div id="scroll-root" style={{ position: 'relative', zIndex: 1, height: '100dvh', overflowY: 'auto', overflowX: 'hidden' }}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
