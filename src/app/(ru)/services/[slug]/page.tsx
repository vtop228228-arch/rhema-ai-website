import { notFound } from 'next/navigation';
import { ServicePage } from '@/components/marketing/ServicePages';
import { services, getService } from '@/lib/services';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return pageMetadata({ title: service.seoTitle, description: service.description, path: `/services/${slug}` });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
