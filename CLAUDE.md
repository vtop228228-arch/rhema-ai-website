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
- **next/font** для Google Fonts (Bebas Neue + **Inter**)
- **Zod** для валидации форм
- Без Supabase, без авторизации, без БД — статичный сайт

## Дизайн-система — «Industrial» (НЕ отклоняться)

> Эталон — `design-export/RHEMA AI Landing.dc.html` (макет из Claude-дизайна).
> Источник истины — `src/app/globals.css`.
> Стиль: OLED-чёрный монолит + оранжевый акцент, **острые углы (без скруглений)**,
> плоские блоки с 2px-зазорами, минимум декора, упор на типографику и контент.

### Цвета — только через CSS-переменные / Tailwind-токены
```css
--bg: #090909 | --bg2: #070707 | --card: #0C0C0C | --card2: #0D0D0D
--line: #0F0F0F | --line2: #141414
--accent: #FF6A00 | --accent2: #FF7A1A | --green: #22C55E | --red: #D95252
--ink: #F0EEE8 | --ink2: #C0BBB2 | --sub: #505050 | --sub2: #888888
--blue: var(--accent)  /* legacy-алиас → оранжевый */
```

### Шрифты
- Заголовки: `font-bebas` (Bebas Neue), uppercase, `letter-spacing` ~0.02–2px
- Тело: **Inter** (`--font-inter`), `14px`, `line-height: 1.6`

### Кнопка — плоская оранжевая заливка
- `btn-blue`: фон `#FF6A00`, текст `#090909`, шрифт Bebas Neue, **без скоса/скруглений**, hover = `opacity .82`.
- `btn-line` (outline оранжевый), `btn-dim` (тёмная). Размеры `btn-sm/md/lg`.

### Блоки и карточки — плоские
- Фон `#0C0C0C`/`#0D0D0D`, бордеры `#0F0F0F`/`#1A1A1A`, **без border-radius**.
- Сетки секций: `gap: 2px` между плоскими блоками (эффект «монолита из плиток»).
- Hover-карточки: смена фона на `#111` + `translateY(-3px)`.

### Секции
- Полноширинные, утилита `.section-pad` = `padding: 68px 72px` (моб. `48px 22px`).
- Заголовок секции — `.section-head`: маркер 4×4 + Bebas 34px + линия (`.dot`/`.title`/`.rule`).

### Eyebrow (метка секции)
- `.eyebrow`: оранжевая линия 36px (`.bar`) + текст 10px/600/uppercase letter-spacing 3px (`.text`).

### Анимации (keyframes в globals.css)
`blink`, `fadeUp`, `spin`, `shimmer`, `marquee`, `ctaGlow`. Сложнее `opacity + translateY` не добавлять.

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

## Текущая структура страниц (факт, сохраняем)

- `/` → HeroMain · Marquee · ForWho · ServicesTabs · PriceTable · ContactForm
- `/how-we-work` → HeroHowWeWork · Myths · ServiceStep · Process · Cases · PatternCTA · Stats · Works · DiagnosticPricing · FAQ · ContactForm
- `/about` → HeroAbout · ComparisonTable · MethodCards · Competencies · Flagship · ContactForm
- Отзывы (Testimonials) скрыты — были выдуманы, вернуть с реальными.

## Кейсы (Cases.tsx) — статус

Переделаны под реальные проекты Rhema AI: JARVIS (SaaS аналитики продаж), ISnail Academy,
SigmaUp, LifesystemA. Описание и боли — реальные; **цифры результата помечены `provisional: true`
и комментарием — ЗАМЕНИТЬ реальными** после завершения внедрений. Не выдумывать новые метрики.

## Следующая фича — AI-агент бесплатной диагностики (SPEC §9)

Ядро: на `/` живой агент мини-диагностики (сфера+боль → карта потерь → лид).
Модели: Haiku 4.5 (диалог) + Sonnet 4.6 (карта). Хранение: Supabase + дубль в Telegram.
Это единственная динамическая часть — остальной сайт статичный. Перед сборкой читать SPEC §9.

## Визуальные детали оригинала (reveluxai.ru)

1. **Фон:** OLED-чёрный `#090909`, НЕ тёмно-синий
2. **Герой:** слева монолит (grid-текстура + H1), справа панель live-чата диагностики
3. **"Мы делаем так":** таб-навигация (Диагностика | AI-агенты | Разработка ПО | SaaS)
4. **Минимализм:** мало декоративных элементов, упор на контент и whitespace
5. **Маркеры:** оранжевые квадратные точки/линии (не cyan)
6. **Бегущая строка:** Bebas-метрики с оранжевыми стрелками `→`

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

## Важные ограничения (актуальные под «Industrial»)

- **НЕ** тёмно-синий фон / cyan-акцент — только OLED-чёрный `#090909` + оранжевый `#FF6A00`
- **Шрифт тела — Inter** (Bebas Neue для заголовков). Эталон-макет на Inter.
- **НЕ** хардкодить цвета хексами в компонентах — только переменные/Tailwind-токены (исключение — точечные тёмные оттенки `#0E0E0E`/`#131313` из макета)
- **НЕ** заголовки больше ~76px на desktop
- **НЕ** скругления и glow-эффекты — стиль строится на острых углах и плоских блоках
- **НЕ** создавать README и changelog без запроса
- Атмосфера — из плоских блоков с `gap: 2px`, grid-текстуры в герое и анимаций `fadeUp`/`ctaGlow`
- **ВСЕГДА** Context7 перед Tailwind v4 и Next.js 15

> Примечание: страницы `/about` и `/how-we-work` пока на старой системе — переделываются под «Industrial» следующим шагом.
