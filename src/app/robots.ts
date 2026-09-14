import type { MetadataRoute } from 'next';
import { IS_PREVIEW, SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
      // /demo и preview доступны роботу: иначе он не увидит meta noindex.
    },
    ...(IS_PREVIEW ? {} : { sitemap: `${SITE_URL}/sitemap.xml` }),
  };
}
