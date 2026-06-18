# Rhema AI — Маркетинговый сайт

Сайт AI-агентства Rhema AI с встроенным AI-агентом бесплатной диагностики бизнеса.

## Стек

- **Next.js 15** App Router + TypeScript
- **Tailwind CSS v4**
- **Anthropic Claude** — AI-агент диагностики
- **Telegram Bot API** — уведомления о заявках

---

## Быстрый старт

### 1. Клонировать репозиторий

```bash
git clone https://github.com/vtop228228-arch/rhema-ai-website.git
cd rhema-ai-website
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Настроить переменные окружения

```bash
cp .env.example .env.local
```

Открой `.env.local` и заполни:

| Переменная                                   | Где взять                                                       |
| -------------------------------------------- | --------------------------------------------------------------- |
| `TELEGRAM_BOT_TOKEN`                         | [@BotFather](https://t.me/BotFather) в Telegram → создать бота |
| `TELEGRAM_CHAT_ID`                           | [@userinfobot](https://t.me/userinfobot) → твой ID              |
| `ANTHROPIC_API_KEY`                          | [console.anthropic.com](https://console.anthropic.com)          |
| `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | [supabase.com](https://supabase.com) — опционально              |

### 4. Запустить локально

```bash
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000)

---

## Деплой на Vercel

```bash
npm install -g vercel
vercel login
vercel deploy --prod
```

Или подключи репозиторий напрямую через [vercel.com/new](https://vercel.com/new) — Vercel автоматически подхватит Next.js.

> Не забудь добавить переменные окружения в настройках проекта на Vercel (Settings → Environment Variables).

---

## Структура

```text
src/
├── app/
│   ├── page.tsx              # Главная + AI-диагностика
│   ├── how-we-work/          # Как работаем
│   ├── about/                # О нас
│   ├── cases/                # Кейсы
│   └── api/
│       ├── contact/          # Форма заявки → Telegram
│       ├── diagnose/         # AI-агент диагностики
│       └── diagnose/lead/    # Сохранение лида
├── components/
│   ├── layout/               # Header, Footer
│   ├── sections/             # Все секции страниц
│   └── ui/                   # Shared компоненты
└── app/globals.css           # Design system
```
