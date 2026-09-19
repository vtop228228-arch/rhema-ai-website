import { z } from 'zod';
const acquisition = z.object({ source: z.string().max(100), medium: z.string().max(100), campaign: z.string().max(100), content: z.string().max(100), term: z.string().max(100), landing: z.string().max(200), referrer: z.string().max(255) });
export const attributionSchema = z.object({ first: acquisition, last: acquisition }).optional();
export function attributionNotes(value: z.infer<typeof attributionSchema>) {
  if (!value) return '';
  return ['Источник перехода:', ...(['first','last'] as const).map(key => {
    const a = value[key];
    return `${key === 'first' ? 'Первый' : 'Последний'}: ${a.source} / ${a.medium || '—'} / ${a.campaign || '—'}; материал: ${a.content || '—'}; вход: ${a.landing}; сайт: ${a.referrer || '—'}`;
  })].join('\n');
}
