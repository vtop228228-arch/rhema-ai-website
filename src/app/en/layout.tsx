import type { Viewport } from 'next';
import SiteLayout from '@/components/layout/SiteLayout';
import { siteMetadata } from '@/lib/seo';

export const metadata = siteMetadata('en');
export const viewport: Viewport = { themeColor: '#f4f2ec', colorScheme: 'light' };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
