// ID счётчика Яндекс.Метрики. Публичный (виден в исходниках страницы) — читаем из env.
// Пусто = аналитика выключена, ничего не грузится. Чтобы воронка ожила — задать
// NEXT_PUBLIC_YM_ID в Vercel → Settings → Environment Variables (номер счётчика из Метрики).
import { consentSnapshot } from './analytics-consent';
const configuredId = process.env.NEXT_PUBLIC_YM_ID?.trim() ?? '';
export const YM_ID = /^\d+$/.test(configuredId) ? configuredId : '';

type YmFn = (id: number, action: string, goal?: string | Record<string, unknown>, params?: unknown) => void;

declare global {
  interface Window {
    ym?: YmFn;
  }
}

// Достижение цели воронки. Безопасно: молчит, если счётчик не подключён.
export function ymGoal(goal: string, params?: Record<string, string>): void {
  if (!YM_ID || typeof window === 'undefined' || consentSnapshot() !== '1' || typeof window.ym !== 'function') return;
  window.ym(Number(YM_ID), 'reachGoal', goal, params);
}
