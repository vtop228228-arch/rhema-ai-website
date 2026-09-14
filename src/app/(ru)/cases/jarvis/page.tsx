import RhemaOSCase from '@/components/marketing/RhemaOSCase';
import { contentByLocale } from '@/lib/rhema-os-case';
import { pageMetadata } from '@/lib/seo';

const copy = contentByLocale.ru;
export const metadata = pageMetadata({ title: copy.seoTitle, description: copy.description, path: '/cases/jarvis' });
export default function Page() { return <RhemaOSCase />; }
