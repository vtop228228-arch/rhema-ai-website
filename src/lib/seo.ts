import type { Metadata } from 'next';
import { IS_PREVIEW, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site';

export type SiteLocale = 'ru' | 'en';

// path — адрес русской страницы без языкового префикса.
export function localizedPath(path: string, locale: SiteLocale = 'ru') {
  return locale === 'en' ? `/en${path === '/' ? '' : path}` : path;
}

export function languageAlternates(path: string) {
  return {
    ru: new URL(localizedPath(path, 'ru'), `${SITE_URL}/`).toString(),
    en: new URL(localizedPath(path, 'en'), `${SITE_URL}/`).toString(),
    'x-default': new URL(localizedPath(path, 'ru'), `${SITE_URL}/`).toString(),
  };
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  locale?: SiteLocale;
};

// Next объединяет вложенные поля metadata поверхностно. Задаём всю карточку
// страницы, чтобы внутренние URL не наследовали заголовок и адрес главной.
export function pageMetadata({ title, description, path, locale = 'ru' }: PageMetadataInput): Metadata {
  const url = new URL(localizedPath(path, locale), `${SITE_URL}/`).toString();
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'ru_RU',
      alternateLocale: locale === 'en' ? 'ru_RU' : 'en_US',
      images: [{ url: `${SITE_URL}${locale === 'en' ? '/en' : ''}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}${locale === 'en' ? '/en' : ''}/opengraph-image`],
    },
  };
}

// Canonical и языковые альтернативы принадлежат страницам, а не layout:
// новые маршруты не должны автоматически канонизироваться на главную.
export function siteMetadata(locale: SiteLocale = 'ru'): Metadata {
  const title = locale === 'en' ? 'AI agents and business automation — Rhema AI' : SITE_TITLE;
  const description = locale === 'en'
    ? 'Websites, apps and AI assistants for business. Capture enquiries, answer customers and simplify reporting with a team that explains, builds and supports your solution.'
    : SITE_DESCRIPTION;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    robots: IS_PREVIEW ? { index: false, follow: false } : { index: true, follow: true },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined,
      yandex: process.env.YANDEX_SITE_VERIFICATION?.trim() || undefined,
    },
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'ru_RU',
      images: [{ url: `${SITE_URL}${locale === 'en' ? '/en' : ''}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${SITE_URL}${locale === 'en' ? '/en' : ''}/opengraph-image`] },
  };
}
