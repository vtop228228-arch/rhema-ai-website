// Канонический адрес сайта — единый источник правды для SEO/OG/robots/sitemap.
// По умолчанию — актуальный прод-домен проекта на Vercel (rhema-ai-agency-amber).
// Подключишь свой домен (например rhema.ai) — задай NEXT_PUBLIC_SITE_URL
// в Vercel → Settings → Environment Variables (без слэша на конце).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rhema-ai-agency-amber.vercel.app'
).replace(/\/+$/, '');

export const SITE_NAME = 'Rhema AI';

export const SITE_TITLE = 'Rhema AI — AI-системы под ключ для бизнеса';

export const SITE_DESCRIPTION =
  'AI-агенты и автоматизация для малого и среднего бизнеса. Бесплатная диагностика: находим, где вы теряете деньги, — и внедряем под ключ.';
