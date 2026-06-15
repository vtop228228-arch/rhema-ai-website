# CLAUDE.md — Rhema AI Website

## Источники истины
Читать перед каждой задачей:
- `SPEC.md` — техническая спецификация (структура, компоненты, API)
- `PROJECT_IDEA.md` — бизнес-контекст
- `DESIGN_REFERENCE.md` — визуальный эталон, цвета, запрещённые паттерны
- `CONTENT.md` — готовые тексты для всех секций

При конфликте между файлами — **НЕ менять молча**, спросить у пользователя.

## Обзор проекта
Маркетинговый сайт AI-агентства Rhema AI (Владислав Грижак). 3 страницы: `/`, `/how-we-work`, `/about`. Цель — генерировать заявки на диагностику бизнеса. Структура и продающая формула скопированы с reveluxai.ru (полный реверс-инжиниринг проведён).

## Стек
- **Next.js 15** App Router, TypeScript strict (`"strict": true` в tsconfig)
- **Tailwind CSS v4** — `@import "tailwindcss"` + токены через `@theme` в globals.css
- **next/font** для Google Fonts (Bebas Neue + **Plus Jakarta Sans**)
- **Zod** для валидации форм
- Без Supabase, без авторизации, без БД — статичный сайт

## Дизайн-система — «Ethereal Glass» (НЕ отклоняться)

> Полный эталон — `DESIGN_REFERENCE.md`. Источник истины — `src/app/globals.css`.
> Стиль премиальный: OLED-чёрный + оранжевый, мягкое свечение, стекло, скруглённые углы.

### Цвета — только через CSS-переменные / Tailwind-токены
```css
--bg: #050505 | --bg2: #080808 | --card: #0d0d0d | --card2: #110e0b
--line: rgba(255,255,255,0.07) | --line2: rgba(255,255,255,0.12)
--accent: #FF5C1A | --accent2: #FF7A3D | --green: #22C55E | --red: #EF4444
--ink: #F5F5F5 | --ink2: #E0E0E0 | --sub: #4a4a4a | --sub2: #888888
--blue: var(--accent)  /* legacy-алиас → оранжевый */
--glow: 0 0 32px rgba(255,92,26,0.18)  /* свечение разрешено */
```

### Шрифты
- Заголовки: `font-bebas` (Bebas Neue), `letter-spacing: 0.03em`, `line-height: 1.04`
- Тело: `font-jakarta` (**Plus Jakarta Sans**, не Inter), `15px`, `line-height: 1.72`

### Кнопка — скошенный левый край (ОБЯЗАТЕЛЬНО)
```css
clip-path: polygon(14px 0%, 100% 0%, 100% 100%, 0% 100%);
```
`btn-blue` (оранжевый градиент-fill + тень), `btn-line` (outline), `btn-dim` (полупрозрачный fill).
Размеры `btn-sm/md/lg`. Hover на blue — подъём + усиление тени.

### Карточки (Double-Bezel)
`card-shell`+`card` (премиум), `card-simple` (с hover-glow и подъёмом), `card-accent` (тёплый, для featured).
Градиентный фон `#131313→#0c0c0c`, скругления `--r`(14px)/`--r-lg`(20px), верхний световой блик.

### Секции и атмосфера
```css
.section / .section-alt: padding 112px 0; контейнер max-width 1120px, padding 0 32px
/* body::before — радиальный оранжевый glow; body::after — noise grain 0.025 */
```

### Метки секций — pill-badge
```
.section-label: оранжевый текст 10px/700/uppercase, letter-spacing 0.22em,
фон+бордер оранжевые полупрозрачные, ::before = светящаяся точка
```

## Правила кодирования

- TypeScript `any` — запрещён, использовать `unknown` с type guards
- Server Components по умолчанию, `'use client'` только для: FAQ аккордеон, форма, табы
- Один компонент = один файл, максимум 150 строк
- Импорты через `@/` алиас
- Без `console.log` в продакшн
- Tailwind v4 — проверить синтаксис через Context7 перед кодом

## Структура компонентов

```
src/components/
  layout/    → Header.tsx, Footer.tsx
  ui/        → Button.tsx, SectionLabel.tsx, Marquee.tsx
  sections/  → все секции страниц (см. SPEC.md §4)
```

## Визуальные детали оригинала (reveluxai.ru)

1. **Фон:** OLED-чёрный `#050505`, НЕ тёмно-синий
2. **"Для кого":** двухколоночный layout — список с cyan-точками слева, wireframe-иллюстрация справа
3. **"Мы делаем так":** таб-навигация (Диагностика | AI-агенты | Разработка ПО | SaaS)
4. **Минимализм:** мало декоративных элементов, упор на контент и whitespace
5. **Nav dot:** маленькая cyan точка (●) между некоторыми пунктами навигации
6. **Wireframe рука:** 3D иллюстрация из линий — пока placeholder SVG, потом заменить

## API — Форма заявки

```typescript
// POST /api/contact
// Body: { name: string, contact: string, business: string, consent: boolean }
// Отправка в Telegram Bot API
// ENV: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
```

## ENV переменные
```
TELEGRAM_BOT_TOKEN=   # токен бота для уведомлений о заявках
TELEGRAM_CHAT_ID=     # Telegram ID Владислава
```

## Субагенты

### frontend-developer
Разрабатывает компоненты и страницы. Читает SPEC.md перед каждой задачей. Использует только цвета из CSS переменных. Не добавляет анимации сложнее `opacity + translateY`.

### backend-engineer
Реализует `/api/contact` route. Валидация через Zod. Отправка в Telegram Bot API. Обработка ошибок.

### qa-reviewer
После каждой страницы: проверить скошенные кнопки, цвета из переменных, мобильную версию, валидацию формы.

## Порядок реализации

### Фаза 1 — Основа
globals.css → layout.tsx (Header + Footer) → Button.tsx → SectionLabel.tsx

### Фаза 2 — Главная `/`
Hero → Marquee → ForWho → ServicesTabs → PriceTable → CTA

### Фаза 3 — Продающая `/how-we-work`
Hero → ForWho → Myths → Works → ServiceStep(1+2) → DaysProcess → Cases → Stats → Testimonials → Pricing → FAQ → ContactForm

### Фаза 4 — О нас `/about`
Hero → ComparisonTable → WhySlow → MethodCards → Competencies → Flagship → CTA

### Фаза 5 — API + деплой
/api/contact → .env.local → Vercel deploy

## Важные ограничения (актуальные под Ethereal Glass)

- **НЕ** тёмно-синий фон / cyan-акцент — только OLED-чёрный + оранжевый
- **НЕ** шрифт Inter в теле — только Plus Jakarta Sans
- **НЕ** хардкодить цвета хексами в компонентах — только переменные/Tailwind-токены
- **НЕ** заголовки больше ~76px на desktop
- **НЕ** grid-overlay / crosshairs — атмосферу даёт глобальный glow+grain в `body`, не мусор в секциях
- **НЕ** создавать README и changelog без запроса
- glow и скругления — **разрешены**, это часть стиля (используй `--glow`, `--r*`)
- **ВСЕГДА** Context7 перед Tailwind v4 и Next.js 15
