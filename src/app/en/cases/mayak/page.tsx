import ProductCaseStudy from '@/components/marketing/ProductCaseStudy';
import { productCases } from '@/lib/product-cases';
import { pageMetadata } from '@/lib/seo';
const copy = productCases.mayak.en;
export const metadata = pageMetadata({ title: copy.seoTitle, description: copy.description, path: '/cases/mayak', locale: 'en' });
export default function Page() { return <ProductCaseStudy slug="mayak" locale="en" />; }
