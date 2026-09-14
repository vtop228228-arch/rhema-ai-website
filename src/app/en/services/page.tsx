import { ServicesPage } from '@/components/marketing/ServicePages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'AI Agents, Workflow Automation & Custom Platforms — Rhema AI', description: 'AI agent development, business workflow automation and custom CRM systems, client portals and platforms. Explore scope, pricing and project examples.', path: '/services', locale: 'en' });
export default function Page() { return <ServicesPage locale="en" />; }
