import type { ProductCaseSlug } from './product-cases';

export type CaseImage = { src: string; width: number; height: number; ru: string; en: string };
export const caseImages: Record<ProductCaseSlug, CaseImage[]> = {
  radar: [
    { src: '/cases/radar/workspace.png', width: 587, height: 1281, ru: 'Радар: создание контента, поиск идей и планирование', en: 'Radar workspace for content creation, ideas and planning' },
    { src: '/cases/radar/brands-public.png', width: 852, height: 1846, ru: 'Выбор бренда в Радаре; два аккаунта обезличены', en: 'Radar brand selection; two accounts have been anonymised' },
    { src: '/cases/radar/ideas.png', width: 591, height: 1283, ru: 'Банк идей со статусами и выбором формата контента', en: 'Idea bank with statuses and content format selection' },
    { src: '/cases/radar/research.png', width: 588, height: 1285, ru: 'Изучение конкурентов: аудитория, формат и Telegram-каналы', en: 'Competitor research with audience, format and Telegram sources' },
    { src: '/cases/radar/analytics.png', width: 590, height: 1280, ru: 'Раздел аналитики до внесения метрик публикаций', en: 'Analytics section before publication metrics have been entered' },
  ],
  'church-analytics': [
    { src: '/cases/church-analytics/dashboard.png', width: 602, height: 1292, ru: 'ГорницаАналитик: статус отчётности по городам и служениям за выбранный месяц', en: 'Gornitsa Analytics dashboard with city and ministry submission status for the selected month' },
    { src: '/cases/church-analytics/menu.png', width: 590, height: 1272, ru: 'Единый вход в дашборд, отчёт по церкви и отчёт по служению', en: 'Reporting hub with access to the dashboard, church reports and ministry reports' },
  ],
  financefamily: [
    { src: '/cases/financefamily/dashboard.png', width: 593, height: 1291, ru: 'Financefamily: остатки в IDR, USD и RUB и переход к обмену валют', en: 'Financefamily dashboard with IDR, USD and RUB balances and the currency exchange entry point' },
    { src: '/cases/financefamily/categories.png', width: 593, height: 1282, ru: 'Расходы по категориям и последние операции', en: 'Spending by category and recent transactions' },
    { src: '/cases/financefamily/history.png', width: 598, height: 1282, ru: 'История операций по дням с поиском и фильтрами', en: 'Daily transaction history with search and filters' },
    { src: '/cases/financefamily/summary.png', width: 590, height: 1277, ru: 'Месячная сводка: семейный бюджет, личные и рабочие траты', en: 'Monthly overview with household, personal and work-related spending views' },
  ],
  besty: [
    { src: '/cases/besty/home.png', width: 594, height: 1277, ru: 'Главная Besty с тренировками, питанием и активным челленджем', en: 'Besty home screen with workouts, nutrition and the active challenge' },
    { src: '/cases/besty/workouts.png', width: 630, height: 1289, ru: 'Подборка тренировок с видео и длительностью занятий', en: 'Workout library with video sessions and duration' },
    { src: '/cases/besty/nutrition.png', width: 596, height: 1295, ru: 'Приблизительный калькулятор калорий и макронутриентов', en: 'Approximate calorie and macronutrient calculator' },
    { src: '/cases/besty/expert.png', width: 601, height: 1287, ru: 'Кабинет эксперта: отчёты, материалы и управление сообществом', en: 'Expert area for reports, materials and community management' },
  ],
  mayak: [
    { src: '/cases/mayak/overview.png', width: 595, height: 1277, ru: 'Панель «Маяк»: обзор прохождения сценария', en: 'Mayak dashboard with a journey overview' },
    { src: '/cases/mayak/messages.png', width: 588, height: 1279, ru: 'Управление текстами сообщений на шагах бота', en: 'Management view for the messages used at each bot step' },
    { src: '/cases/mayak/cities.png', width: 613, height: 1274, ru: 'Список городов и управление их доступностью', en: 'City directory and availability management' },
  ],
};
