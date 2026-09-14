import { SITE_NAME, SITE_URL } from '@/lib/site';
import { localizedPath, type SiteLocale } from '@/lib/seo';

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function SiteIdentity() {
  return <JsonLd data={{
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME,
        url: SITE_URL, logo: `${SITE_URL}/logo.png`, email: 'rhemaaiagency@gmail.com',
        sameAs: ['https://t.me/RhemaAI_support'],
        founder: [
          { '@type': 'Person', name: 'Владислав Грижак', jobTitle: 'Основатель и AI-архитектор' },
          { '@type': 'Person', name: 'Тимофей Матюжов', jobTitle: 'Основатель и AI-архитектор' },
        ],
      },
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: SITE_NAME,
        url: SITE_URL, inLanguage: ['ru', 'en'], publisher: { '@id': `${SITE_URL}/#organization` } },
    ],
  }} />;
}

export function PageStructuredData({ title, description, path, locale = 'ru', service = false, parent }: {
  title: string; description: string; path: string; locale?: SiteLocale; service?: boolean; parent?: { name: string; path: string };
}) {
  const url = `${SITE_URL}${localizedPath(path, locale)}`;
  const crumbs = [
    { name: locale === 'en' ? 'Home' : 'Главная', path: '/' },
    ...(service ? [{ name: locale === 'en' ? 'Services' : 'Услуги', path: '/services' }] : []),
    ...(parent ? [parent] : []),
    ...(path !== '/' ? [{ name: title, path }] : []),
  ];
  return <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description,
      inLanguage: locale, isPartOf: { '@id': `${SITE_URL}/#website` },
      ...(service ? { mainEntity: { '@id': `${url}#service` } } : {}),
    },
    ...(crumbs.length > 1 ? [{ '@type': 'BreadcrumbList', itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem', position: i + 1, name: crumb.name,
      item: `${SITE_URL}${localizedPath(crumb.path, locale)}`,
    })) }] : []),
    ...(service ? [{ '@type': 'Service', '@id': `${url}#service`, name: title, description, url,
      provider: { '@id': `${SITE_URL}/#organization` }, areaServed: 'Worldwide',
    }] : []),
  ] }} />;
}
