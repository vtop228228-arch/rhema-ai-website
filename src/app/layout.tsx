import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ShaderBackground from '@/components/ui/ShaderBackground';
import MobileBackground from '@/components/ui/MobileBackground';
import CookieConsent from '@/components/ui/CookieConsent';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rhema AI — AI-системы под ключ для бизнеса',
  description: 'Находим скрытые потери в вашем бизнесе за 3 дня. AI-агенты, платформы, автоматизация. Гарантия результата.',
  keywords: 'AI автоматизация, AI агент, диагностика бизнеса, Telegram бот',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={dmSans.variable}>
      <body>
        <ShaderBackground />
        <MobileBackground />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
