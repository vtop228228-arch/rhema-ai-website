import ProductCaseStudy from '@/components/marketing/ProductCaseStudy';
import { productCases } from '@/lib/product-cases';
import { pageMetadata } from '@/lib/seo';

const copy = productCases.radar.ru;
export const metadata = pageMetadata({ title: copy.seoTitle, description: copy.description, path: '/cases/radar' });
export default function Page() { return <ProductCaseStudy slug="radar" />; }
