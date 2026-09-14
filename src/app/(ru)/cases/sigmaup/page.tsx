import WebsiteCaseStudy from '@/components/marketing/WebsiteCaseStudy';
import { websiteCases } from '@/lib/website-cases';
import { pageMetadata } from '@/lib/seo';
const copy = websiteCases.sigmaup.ru;
export const metadata = pageMetadata({ title: copy.seoTitle, description: copy.description, path: '/cases/sigmaup' });
export default function Page() { return <WebsiteCaseStudy slug="sigmaup" />; }
