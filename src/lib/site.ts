// Задайте основной домен перед сборкой: он используется в SEO,
// карточках ссылок, структурированных данных и карте сайта.
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  || 'https://rhema-ai-agency-amber.vercel.app';
const parsedSiteUrl = new URL(configuredSiteUrl);

if (!['https:', 'http:'].includes(parsedSiteUrl.protocol)
  || parsedSiteUrl.username || parsedSiteUrl.password
  || parsedSiteUrl.pathname !== '/' || parsedSiteUrl.search || parsedSiteUrl.hash) {
  throw new Error('NEXT_PUBLIC_SITE_URL must be an http(s) origin without a path, credentials, query, or hash.');
}

export const SITE_URL = parsedSiteUrl.origin;
export const IS_PREVIEW = process.env.VERCEL_ENV === 'preview';
export const SITE_NAME = 'Rhema AI';
export const SITE_TITLE = 'AI-агенты и автоматизация бизнеса под ключ — Rhema AI';
export const SITE_DESCRIPTION =
  'Бесплатная диагностика бизнеса: разберём вашу задачу и подберём первый шаг. Разрабатываем AI-помощников, автоматизацию, сайты и приложения. Условия внедрения обсуждаем на созвоне.';
