// Экранирование пользовательского ввода для Telegram parse_mode: 'HTML'.
// Без экранирования символ «<» в имени/тексте посетителя ломает отправку (Telegram 400).
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
