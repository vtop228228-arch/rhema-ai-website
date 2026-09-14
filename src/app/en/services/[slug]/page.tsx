import { notFound } from 'next/navigation';
import { ServicePage } from '@/components/marketing/ServicePages';
import { servicesEn } from '@/lib/services-en';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() { return servicesEn.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesEn.find(item => item.slug === slug);
  if (!service) notFound();
  return pageMetadata({ title: service.seoTitle, description: service.description, path: `/services/${slug}`, locale: 'en' });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesEn.find(item => item.slug === slug);
  if (!service) notFound();
  return <ServicePage service={service} locale="en" />;
}
