import { HomePage } from '@/components/marketing/MarketingPages';
import { pageMetadata } from '@/lib/seo';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/lib/site';
export const metadata = pageMetadata({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: '/' });
export default HomePage;
