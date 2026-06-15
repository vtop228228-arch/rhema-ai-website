import type { Metadata } from 'next';
import { Bebas_Neue, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

// Inter BANNED по скиллу → Plus Jakarta Sans (premium SaaS typography)
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rhema AI — AI-системы под ключ для бизнеса',
  description: 'Находим скрытые потери в вашем бизнесе за 3 дня. AI-агенты, платформы, автоматизация. Гарантия результата.',
  keywords: 'AI автоматизация, AI агент, диагностика бизнеса, Telegram бот',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${bebasNeue.variable} ${plusJakartaSans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
