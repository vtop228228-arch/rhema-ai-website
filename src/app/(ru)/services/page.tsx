import { ServicesPage } from '@/components/marketing/ServicePages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'AI-агенты, автоматизация и разработка платформ — Rhema AI', description: 'Разработка AI-агентов, автоматизация бизнес-процессов и создание CRM, личных кабинетов и платформ. Сценарии, состав работ и примеры проектов.', path: '/services' });
export default function Page() { return <ServicesPage />; }
