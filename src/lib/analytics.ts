// ID счётчика Яндекс.Метрики. Публичный (виден в исходниках страницы) — читаем из env.
// Пусто = аналитика выключена, ничего не грузится. Чтобы воронка ожила — задать
// NEXT_PUBLIC_YM_ID в Vercel → Settings → Environment Variables (номер счётчика из Метрики).
export const YM_ID = process.env.NEXT_PUBLIC_YM_ID ?? '';

type YmFn = (id: number, action: string, goal?: string, params?: unknown) => void;

declare global {
  interface Window {
    ym?: YmFn;
  }
}

// Достижение цели воронки. Безопасно: молчит, если счётчик не подключён.
export function ymGoal(goal: string): void {
  if (!YM_ID || typeof window === 'undefined' || typeof window.ym !== 'function') return;
  window.ym(Number(YM_ID), 'reachGoal', goal);
}
