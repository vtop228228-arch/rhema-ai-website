import ProductCaseStudy from '@/components/marketing/ProductCaseStudy';
import { productCases } from '@/lib/product-cases';
import { pageMetadata } from '@/lib/seo';

const copy = productCases['church-analytics'].en;
export const metadata = pageMetadata({ title: copy.seoTitle, description: copy.description, path: '/cases/church-analytics', locale: 'en' });
export default function Page() { return <ProductCaseStudy slug="church-analytics" locale="en" />; }
