// ID счётчика Яндекс.Метрики. Публичный (виден в исходниках страницы) — храним в коде.
// Пусто = аналитика выключена, ничего не грузится. Вставить номер счётчика после создания в Метрике.
export const YM_ID = '';

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
