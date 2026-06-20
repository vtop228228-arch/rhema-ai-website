import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ShaderBackground from '@/components/ui/ShaderBackground';
import MobileBackground from '@/components/ui/MobileBackground';
import CookieConsent from '@/components/ui/CookieConsent';

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
  title: 'Rhema AI — AI-системы под ключ для бизнеса',
  description: 'Находим скрытые потери в вашем бизнесе за 3 дня. AI-агенты, платформы, автоматизация. Гарантия результата.',
  keywords: 'AI автоматизация, AI агент, диагностика бизнеса, Telegram бот',
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
      </body>
    </html>
  );
}
