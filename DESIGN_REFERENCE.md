# DESIGN_REFERENCE.md — Визуальный эталон Rhema AI

> ⚠️ **АКТУАЛЬНАЯ СИСТЕМА — «Industrial».** Эталон: `design-export/RHEMA AI Landing.dc.html`,
> разделы дизайна в `CLAUDE.md`, источник истины — `src/app/globals.css`.
> OLED-чёрный `#090909` + оранжевый `#FF6A00`, шрифт **Inter** + Bebas Neue,
> **острые углы (без скруглений), без glow**, плоские блоки с `gap: 2px`.
> Описание ниже («Ethereal Glass» — скругления/стекло/glow, `#050505`/`#FF5C1A`, Plus Jakarta Sans)
> **устарело** и сохранено как история; при расхождении следовать «Industrial».

---

## Цветовая палитра (только через CSS-переменные / Tailwind-токены)

```css
--bg:       #050505   /* основной фон — OLED-чёрный */
--bg2:      #080808   /* alt-секции */
--card:     #0d0d0d   /* база карточек */
--card2:    #110e0b   /* карточка с тёплым оттенком */
--line:     rgba(255,255,255,0.07)  /* бордеры */
--line2:    rgba(255,255,255,0.12)  /* активные бордеры */
--accent:   #FF5C1A   /* оранжевый — главный акцент */
--accent2:  #FF7A3D   /* оранжевый hover */
--accent-dim: rgba(255,92,26,0.12)
--green:    #22C55E   /* позитив / результат */
--red:      #EF4444   /* потери / убытки */
--ink:      #F5F5F5   /* основной текст */
--ink2:     #E0E0E0
--sub:      #4a4a4a   /* приглушённый текст */
--sub2:     #888888   /* второстепенный текст */
--blue:     var(--accent)  /* legacy-алиас → указывает на оранжевый */
```

Tailwind-токены (`@theme` в globals.css): `bg-bg`, `bg-bg2`, `bg-card`, `text-ink`, `text-sub`,
`text-sub2`, `text-accent`, `text-green`, `text-red`, `border-line`.
Шрифты: `font-bebas`, `font-jakarta`.

### Радиусы и тени
```css
--r-xs 6px · --r-sm 10px · --r 14px · --r-lg 20px · --r-xl 28px · --r-full 9999px
--shadow-sm / --shadow-md / --shadow-lg  (мягкие, с inset-бликом сверху)
--glow      0 0 32px rgba(255,92,26,0.18)   /* оранжевое свечение */
--glow-sm   0 0 16px rgba(255,92,26,0.12)
```

### Motion (easing)
```css
--ease-out-expo  cubic-bezier(0.16, 1, 0.3, 1)
--ease-spring    cubic-bezier(0.32, 0.72, 0, 1)
--ease-smooth    cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

---

## Атмосфера фона (глобально, в `body`)

- `body::before` — радиальный оранжевый glow сверху (два эллипса, opacity ~0.07 и 0.04).
- `body::after` — SVG noise grain overlay, opacity 0.025.
- Контент в `.container` поднят `z-index: 2` над этими слоями.

---

## Типографика

- **Заголовки:** `font-bebas` (Bebas Neue), letter-spacing 0.03em, line-height 1.04.
- **Тело:** `font-jakarta` (**Plus Jakarta Sans**, не Inter), 15px, line-height 1.72.
- **Метки секций:** Plus Jakarta, 10px, weight 700, uppercase, letter-spacing 0.22em, color --accent.
- **Stat number:** Bebas 72px, color --accent, text-shadow оранжевый glow.

---

## Кнопки (скошенный левый край — бренд-элемент, сохраняем)

```css
clip-path: polygon(14px 0%, 100% 0%, 100% 100%, 0% 100%);
transition: all 0.4s var(--ease-out-expo);
```
- `.btn-blue` → оранжевый градиент-fill (`--accent`→`#e84f10`), белый текст, оранжевая тень;
  hover: подъём `translateY(-2px) scale(1.01)` + усиленная тень.
- `.btn-line` → outline оранжевый, hover: лёгкий fill + glow-sm.
- `.btn-dim`  → полупрозрачный белый fill, серый бордер.
- Размеры: `.btn-sm` / `.btn-md` / `.btn-lg` (у lg больше padding и letter-spacing).
- Внутренний `::before` — диагональный световой блик, проявляется на hover.

---

## Метка секции — pill-badge

```css
.section-label  /* pill: оранжевый текст 10px, фон rgba(255,92,26,0.08),
                   бордер rgba(255,92,26,0.2), border-radius --r-full,
                   ::before = светящаяся оранжевая точка 6px */
```

---

## Карточки — архитектура Double-Bezel

- `.card-shell` (внешняя оболочка 1px градиент-бордер) + `.card` (внутреннее ядро) — для премиум-карточек; на hover оболочка наливается оранжевым.
- `.card-simple` — одиночная карточка с бордером `--line`, верхним световым бликом (`::before`), hover: оранжевый бордер + glow-sm + `translateY(-3px)`.
- `.card-accent` — тёплый оранжевый фон-градиент, для featured/popular; hover: усиленный glow.
- Все карточки: градиентный фон `#131313→#0c0c0c`, скругление `--r`/`--r-lg`, `overflow: hidden`.

> Glow и скругления теперь РАЗРЕШЕНЫ и являются частью стиля (в отличие от старого минимализма).

---

## Прочие элементы

- `.input-base` — полупрозрачный fill, focus: оранжевый бордер + ring `rgba(255,92,26,0.08)`.
- `.pill` — нейтральный тег, hover наливается оранжевым.
- Scrollbar — тонкий 4px, thumb на hover оранжевый.
- `.section` / `.section-alt` — padding `112px 0` (десктоп).
- `.container` — max-width 1120px, padding 0 32px.

---

## Навигация (Header)

- Логотип: `RHEMA` обычный + `AI` в `--accent`.
- CTA — `.btn-blue` со скошенным краем.

---

## Что ЗАПРЕЩЕНО (актуально)

- ❌ Тёмно-синий фон или cyan-акцент — только OLED-чёрный + оранжевый.
- ❌ Шрифт Inter в теле — только Plus Jakarta Sans (Inter забанен по скиллу).
- ❌ Заголовки крупнее ~76px на desktop.
- ❌ Хардкод цветов хексами в компонентах — только переменные/Tailwind-токены.
- ❌ grid-overlay / crosshairs / тяжёлые декоративные паттерны — атмосферу даёт глобальный glow+grain, не мусор в секциях.

---

## Ключевые секции и их реализация

### "Для кого" — двухколоночный layout
- Левая: список с оранжевыми точками (●). Правая: wireframe-иллюстрация (placeholder SVG).

### "Мы делаем так" — таб-навигация
- Табы: Диагностика | AI-агенты | Разработка ПО | SaaS. Активный — `--accent`. `'use client'`.

### FAQ — аккордеон
- Только один открыт одновременно. `'use client'`.

### Форма заявки
- Поля: Имя + Telegram/WhatsApp + Описание + 2 чекбокса согласия.
- POST /api/contact → Telegram Bot API. `'use client'` + Zod-валидация.
