import type { Viewport } from 'next';
import SiteLayout from '@/components/layout/SiteLayout';
import { siteMetadata } from '@/lib/seo';

export const metadata = siteMetadata('ru');
export const viewport: Viewport = { themeColor: '#f4f2ec', colorScheme: 'light' };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="ru">{children}</SiteLayout>;
}
