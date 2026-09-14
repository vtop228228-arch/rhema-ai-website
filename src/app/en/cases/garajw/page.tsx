import WebsiteCaseStudy from '@/components/marketing/WebsiteCaseStudy';
import { websiteCases } from '@/lib/website-cases';
import { pageMetadata } from '@/lib/seo';
const copy = websiteCases.garajw.en;
export const metadata = pageMetadata({ title: copy.seoTitle, description: copy.description, path: '/cases/garajw', locale: 'en' });
export default function Page() { return <WebsiteCaseStudy slug="garajw" locale="en" />; }
