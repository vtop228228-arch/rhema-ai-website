import type { MetadataRoute } from 'next';
import { languageAlternates, localizedPath } from '@/lib/seo';
import { services } from '@/lib/services';
import { IS_PREVIEW, SITE_URL } from '@/lib/site';

// Публичные маршруты сайта (без /demo — он noindex, и без /api).
export default function sitemap(): MetadataRoute.Sitemap {
  if (IS_PREVIEW) return [];
  const routes = [
    '/',
    '/services',
    ...services.map(service => `/services/${service.slug}`),
    '/how-we-work',
    '/about',
    '/cases',
    '/cases/jarvis',
    '/cases/seraphim',
    '/cases/besty',
    '/cases/mayak',
    '/cases/financefamily',
    '/cases/church-analytics',
    '/cases/radar',
    '/cases/garajw',
    '/cases/sigmaup',
    '/offer',
    '/privacy',
    '/consent',
  ];

  // lastModified добавляем только при наличии достоверной даты изменения
  // конкретной страницы. Время каждой сборки не является такой датой.
  return routes.flatMap(path => (['ru', 'en'] as const).map(locale => ({
    url: new URL(localizedPath(path, locale), `${SITE_URL}/`).toString(),
    alternates: { languages: languageAlternates(path) },
  })));
}
