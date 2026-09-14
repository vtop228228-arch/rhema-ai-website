import { radarCase } from './radar-case';

export type ProductCaseSlug = 'besty' | 'mayak' | 'financefamily' | 'church-analytics' | 'radar';

export type ProductCase = {
  slug: ProductCaseSlug; name: string; title: string; seoTitle: string;
  description: string; eyebrow: string; intro: string; challenge: string; solution: string;
  features: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  outcomes: string[]; closing: string;
  featuresHeading?: string;
};

export const productCases: Record<ProductCaseSlug, Record<'ru' | 'en', ProductCase>> = {
  radar: radarCase,
  'church-analytics': {
    ru: {
      slug: 'church-analytics', name: 'ГорницаАналитик', title: 'Отчётность по городам и служениям в одном месте.',
      seoTitle: 'ГорницаАналитик — Telegram-бот для отчётности церкви | Rhema AI',
      description: 'Кейс ГорницаАналитик: Telegram-бот и Mini App для отчётности по городам и служениям. Выбор месяца, статус заполнения, напоминания и уведомления о новых отчётах.',
      eyebrow: 'Telegram-бот + Mini App / Отчётность и аналитика',
      featuresHeading: 'Отчёты, статусы и напоминания.',
      intro: 'Создали Telegram-бота и мини-приложение для ежемесячной отчётности церкви. Ответственные передают данные по городам и служениям, а команда видит ход заполнения и получает уведомления в Telegram.',
      challenge: 'Данные поступают от ответственных в разных городах и служениях. Команде нужно собрать их за один период, понять, какие отчёты уже сданы, и напомнить о недостающих. Важен и статус самого напоминания: дошло ли оно до нужного человека.',
      solution: 'Объединили бота «Аналитика течения» и мини-приложение «ГорницаАналитик». В приложении доступны вход в отчёт по церкви или служению и дашборд за выбранный месяц. Telegram связывает этот процесс с напоминаниями и уведомлениями о новых отчётах.',
      features: [
        { title: 'Два направления отчётности', text: 'С начального экрана можно открыть отчёт по церкви или по служению. В уведомлении о новом отчёте по городу собраны период, количество горниц, лидеров и посещаемость.' },
        { title: 'Обзор за выбранный месяц', text: 'Дашборд отдельно показывает заполнение по городам и служениям: сколько отчётов сдано и сколько ожидается. Полосы прогресса помогают быстро оценить состояние сбора данных.' },
        { title: 'Напоминания и статус доставки', text: 'Бот отправляет напоминания и показывает итог отправки. В сообщении видны случаи, когда получатель ещё не запускал бота или для ответственного не указан Telegram ID.' },
        { title: 'Уведомления рядом с командой', text: 'Новый отчёт сопровождается сообщением в Telegram с основными данными. Из меню бота можно перейти в приложение, к выбору месяца, статусу заполнения, архиву и разделу ответственных.' },
      ],
      steps: [
        { title: 'Выбрать отчёт и период', text: 'Ответственный открывает мини-приложение из Telegram и переходит к отчёту по церкви или служению. Для обзора команда выбирает нужный месяц.' },
        { title: 'Передать данные', text: 'После поступления нового отчёта бот уведомляет команду. В сообщении по городу видны отчётный период и основные показатели.' },
        { title: 'Проверить полноту отчётности', text: 'Команда смотрит статус заполнения по двум направлениям и использует напоминания для сбора недостающих отчётов. Результат доставки помогает заметить проблемы с контактами.' },
      ],
      outcomes: ['Статус отчётности по городам и служениям собран на одном экране.', 'Новые отчёты и результаты отправки напоминаний доступны в Telegram.', 'Выбор месяца позволяет вернуться к нужному отчётному периоду.'],
      closing: 'ГорницаАналитик показывает, как связать распределённую отчётность с привычным для команды мессенджером. Такой подход можно адаптировать для сети филиалов, волонтёрских команд или сообщества, которое регулярно собирает данные от ответственных.',
    },
    en: {
      slug: 'church-analytics', name: 'Gornitsa Analytics', title: 'City and ministry reporting, brought together.',
      seoTitle: 'Gornitsa Analytics — Church Reporting Telegram Bot | Rhema AI',
      description: 'Gornitsa Analytics combines a Telegram bot and Mini App for monthly church reporting by city and ministry, with submission status, reminders and notifications.',
      eyebrow: 'Telegram bot + Mini App / Reporting and analytics',
      featuresHeading: 'Reports, status and reminders.',
      intro: 'We built a Telegram bot and Mini App for monthly church reporting. Coordinators submit city and ministry data, while the team tracks reporting progress and receives notifications in Telegram.',
      challenge: 'Reports come from coordinators across different cities and ministries. The team needs to collect them for the same period, see which submissions are in and follow up on missing reports. It also needs to know whether a reminder reached the intended person.',
      solution: 'We connected the Analitika Techeniya bot with the Gornitsa Analytics Mini App. The app provides entry points for church and ministry reports and a dashboard for the selected month. Telegram connects this workflow with reminders and new-report notifications.',
      features: [
        { title: 'Two reporting streams', text: 'The opening screen provides access to a church report or a ministry report. A new city-report notification brings together the reporting period, local groups, leaders and attendance.' },
        { title: 'A monthly submission overview', text: 'The dashboard separately tracks city and ministry reporting, showing received submissions against the expected totals. Progress bars make the current collection status easy to scan.' },
        { title: 'Reminders with delivery status', text: 'The bot sends reminders and shows a delivery summary. It identifies cases where the recipient has not started the bot or a coordinator’s Telegram ID is missing.' },
        { title: 'Notifications where the team works', text: 'A new report triggers a Telegram message with its key data. The bot menu provides access to the app, month selection, submission status, the archive and the coordinators section.' },
      ],
      steps: [
        { title: 'Choose the report and period', text: 'A coordinator opens the Mini App from Telegram and selects a church or ministry report. The team selects the relevant month for its overview.' },
        { title: 'Submit the information', text: 'When a new report arrives, the bot notifies the team. A city-report message includes the reporting period and key figures.' },
        { title: 'Review submission progress', text: 'The team checks both reporting streams and uses reminders to follow up on missing reports. Delivery results help identify contact issues.' },
      ],
      outcomes: ['City and ministry submission status is available in one view.', 'New reports and reminder delivery results are accessible in Telegram.', 'Month selection gives the team access to the relevant reporting period.'],
      closing: 'Gornitsa Analytics shows how distributed reporting can work through a messenger the team already uses. The same approach can be adapted for branch networks, volunteer teams or communities that regularly collect information from local coordinators.',
    },
  },
  financefamily: {
    ru: {
      slug: 'financefamily', name: 'Financefamily', title: 'Куда уходят деньги — в любой валюте.',
      seoTitle: 'Мультивалютный кошелёк Financefamily — кейс разработки | Rhema AI',
      description: 'Кейс Financefamily: мультивалютный кошелёк в Telegram для учёта доходов, расходов и обменов. IDR, USD, RUB, история операций, категории и семейная сводка.',
      eyebrow: 'Telegram Mini App / Мультивалютный учёт',
      featuresHeading: 'Всё для учёта денег.',
      intro: 'Создали мультивалютный кошелёк для учёта личных и семейных денег. Остатки, покупки и обмены собраны в Telegram Mini App: можно проследить движение средств и понять, на что уходит бюджет.',
      challenge: 'Когда доходы приходят в одной валюте, расходы идут в другой, а деньги регулярно меняют, одного общего остатка недостаточно. Нужно видеть суммы по валютам, сохранять историю трат и обменов, а также разделять личные, семейные и рабочие операции.',
      solution: 'Собрали Financefamily — приложение с балансами в IDR, USD и RUB, учётом доходов, расходов и обменов валют. История сохраняет отдельные операции, категории объясняют структуру трат, а месячная сводка помогает посмотреть на весь период. В одном интерфейсе доступны личный и семейный обзор.',
      features: [
        { title: 'Валюты и обмены', text: 'Остатки в IDR, USD и RUB видны на одном экране. Учёт обменов помогает проследить суммы в исходной и полученной валюте и сохранить контекст движения денег.' },
        { title: 'История операций', text: 'Журнал показывает операции по дням: сумму, валюту, описание и участника. Поиск и фильтры помогают вернуться к нужной записи и разобраться в конкретной трате.' },
        { title: 'Категории и карта трат', text: 'Доходы и расходы собраны по валютам, а диаграмма показывает доли категорий. Месячная сводка включает календарь трат, дни без расходов и сравнение с прошлым месяцем.' },
        { title: 'Личный и семейный бюджет', text: 'Можно переключаться между участниками и общим семейным видом. В сводке есть отдельные режимы для личных и рабочих операций, чтобы смотреть на нужную часть бюджета.' },
      ],
      steps: [
        { title: 'Зафиксировать движение денег', text: 'Доход или расход попадает в учёт со своей суммой, валютой и категорией. В истории остаётся запись, к которой можно вернуться.' },
        { title: 'Сохранить обмен', text: 'При обмене валют важно сохранить обе стороны операции: сколько денег было отдано и сколько получено. Так сохраняется история движения средств между валютами.' },
        { title: 'Понять структуру трат', text: 'Пользователь открывает сводку за месяц, выбирает личный или семейный вид и смотрит категории, активность по дням и отдельные операции.' },
      ],
      outcomes: ['Остатки и движение денег в нескольких валютах собраны в одном приложении.', 'История помогает разобраться в расходах и обменах валют.', 'Категории и месячная сводка делают структуру личного и семейного бюджета наглядной.'],
      closing: 'Financefamily показывает, как превратить разрозненные финансовые записи в понятный повседневный инструмент. Такой продукт можно спроектировать под учёт расходов команды, семейный бюджет или личные финансы в нескольких валютах.',
    },
    en: {
      slug: 'financefamily', name: 'Financefamily', title: 'Know where your money goes, across currencies.',
      seoTitle: 'Financefamily — Multi-Currency Wallet Case Study | Rhema AI',
      description: 'Financefamily is a Telegram Mini App for tracking income, spending and currency exchanges in IDR, USD and RUB, with transaction history and household reporting.',
      eyebrow: 'Telegram Mini App / Multi-currency tracking',
      featuresHeading: 'The tools to follow your money.',
      intro: 'We built a multi-currency wallet for keeping track of personal and household finances. Balances, purchases and exchange records share one Telegram Mini App, making it easier to follow money movements and understand spending.',
      challenge: 'When income arrives in one currency, purchases happen in another and money is regularly exchanged, a single total balance tells only part of the story. Users need balances by currency, a record of spending and exchanges, and separate views for personal, household and work-related transactions.',
      solution: 'We built Financefamily with balances in IDR, USD and RUB and records of income, expenses and currency exchanges. Transaction history keeps the individual entries, categories explain the spending breakdown, and a monthly overview brings the period together. Personal and household views are available within the same interface.',
      features: [
        { title: 'Currencies and exchange records', text: 'Balances in IDR, USD and RUB appear on one screen. Exchange tracking records the amounts in the source and destination currencies, preserving the context of money movements.' },
        { title: 'Transaction history', text: 'The journal groups entries by day and shows the amount, currency, description and participant. Search and filters help users revisit a specific entry and understand an expense.' },
        { title: 'Categories and spending patterns', text: 'Income and expenses are grouped by currency, with a chart showing each spending category’s share. The monthly overview includes a spending calendar, days without expenses and a comparison with the previous month.' },
        { title: 'Personal and household views', text: 'Users can switch between individual participants and a combined household view. Separate personal and work-related views in the summary help focus on the relevant part of the budget.' },
      ],
      steps: [
        { title: 'Record a money movement', text: 'Income or spending is recorded with its amount, currency and category. The entry remains available in transaction history.' },
        { title: 'Keep the exchange record', text: 'An exchange needs both sides of the transaction: the amount given and the amount received. Recording them preserves the history of movements between currencies.' },
        { title: 'Understand the spending breakdown', text: 'The user opens a monthly summary, selects a personal or household view, and reviews categories, daily activity and individual transactions.' },
      ],
      outcomes: ['Balances and money movements across currencies are organised in one app.', 'Transaction history makes spending and exchange records easier to review.', 'Categories and monthly reporting make personal and household spending visible.'],
      closing: 'Financefamily shows how scattered financial records can become a useful everyday tool. A similar product can be designed around team expenses, household budgeting or personal finances across currencies.',
    },
  },
  besty: {
    ru: {
      slug: 'besty', name: 'Besty', title: 'Фитнес-сообщество в Telegram Mini App.',
      seoTitle: 'Besty — разработка фитнес-приложения в Telegram | Rhema AI',
      description: 'Кейс Besty: Telegram Mini App с тренировками, питанием, челленджами, замерами и кабинетом эксперта. Реальные экраны приложения, задача и решение Rhema AI.',
      eyebrow: 'Telegram Mini App / Фитнес и сообщество',
      intro: 'Создали приложение, в котором участницы находят тренировки, работают с питанием и участвуют в челленджах. Эксперт управляет материалами и сопровождением через свой кабинет — в том же продукте.',
      challenge: 'Нужно было собрать материалы и регулярную работу с участницами в понятном пространстве. Тренировки, рецепты, отчёты и замеры должны быть доступны без поиска по перепискам, а у эксперта должны быть инструменты для обновления контента и ведения сообщества.',
      solution: 'Собрали Besty community — мини-приложение, которое открывается внутри Telegram. Главная объединяет основные направления, отдельные разделы помогают работать с тренировками и питанием, а профиль хранит историю замеров. Для эксперта предусмотрен свой набор функций управления.',
      features: [
        { title: 'Тренировки и челленджи', text: 'Каталог видео с длительностью и переходом к тренировке на YouTube. С главной можно перейти к активному челленджу и отправить отчёт за день.' },
        { title: 'Питание и рецепты', text: 'Раздел объединяет рецепты и приблизительный расчёт калорий, белков, жиров и углеводов. Пользователь задаёт свои параметры, цель и активность, чтобы получить ориентир внутри приложения.' },
        { title: 'Профиль и история замеров', text: 'В личном профиле собраны цель и записи замеров по неделям. Участница добавляет новую запись и может вернуться к предыдущим значениям.' },
        { title: 'Кабинет эксперта', text: 'Просмотр и комментирование отчётов, управление тренировками, рецептами, челленджами и базой участниц. Здесь же доступны работа с подписками, расписание эфиров и советы дня.' },
      ],
      steps: [
        { title: 'Открыть своё пространство', text: 'Участница запускает Mini App в Telegram и с главной выбирает тренировку, питание или текущий челлендж.' },
        { title: 'Вернуться к регулярной работе', text: 'Материалы, отчёт за день и записи замеров доступны из разделов приложения. Каждый сценарий имеет своё место.' },
        { title: 'Получить сопровождение', text: 'Эксперт работает с отчётами и обновляет материалы через кабинет. Контент и управление сообществом собраны в одном продукте.' },
      ],
      outcomes: ['Материалы фитнес-сообщества доступны из одного приложения.', 'Участницы могут вести замеры и отправлять отчёты по челленджам.', 'Эксперт получает инструменты для контента, подписок и сопровождения.'],
      closing: 'Besty показывает, как мини-приложение объединяет пользовательские сценарии и кабинет команды. Такой формат можно спроектировать под школу, клуб или экспертное сообщество с его материалами и правилами работы.',
    },
    en: {
      slug: 'besty', name: 'Besty', title: 'A fitness community inside a Telegram Mini App.',
      seoTitle: 'Besty — Fitness Telegram Mini App Case Study | Rhema AI',
      description: 'Inside Besty: a Telegram Mini App for workouts, nutrition, challenges, measurements and expert management. Real product screens and the solution built by Rhema AI.',
      eyebrow: 'Telegram Mini App / Fitness community',
      intro: 'We built an app where members find workouts, explore nutrition and join challenges. The expert manages content and member support through a dedicated workspace in the same product.',
      challenge: 'The community needed a clear place for its content and recurring activities. Workouts, recipes, reports and measurements needed to be accessible without searching through conversations. The expert also needed tools to update material and run the community.',
      solution: 'We built Besty community as a mini app that opens inside Telegram. Its home screen brings together the main activities, dedicated sections organise workouts and nutrition, and member profiles hold measurement history. A separate expert area provides management tools.',
      features: [
        { title: 'Workouts and challenges', text: 'A video catalogue shows workout duration and opens the selected session on YouTube. Members can reach an active challenge from the home screen and submit their daily report.' },
        { title: 'Nutrition and recipes', text: 'The nutrition area combines recipes with an approximate calorie and macronutrient calculator. Members enter their parameters, goal and activity level to obtain a planning estimate within the app.' },
        { title: 'Profiles and measurement history', text: 'Each profile brings together the member’s goal and weekly measurement records. Members can add an entry and revisit earlier records.' },
        { title: 'An expert workspace', text: 'The expert can review and comment on reports, manage workouts, recipes, challenges and members, and work with subscriptions. Tools also cover live-session schedules and daily tips.' },
      ],
      steps: [
        { title: 'Open the community workspace', text: 'A member launches the Telegram Mini App and chooses a workout, nutrition or the current challenge from the home screen.' },
        { title: 'Return to regular activities', text: 'Materials, daily reports and measurement records have dedicated places in the app, making the next action easier to find.' },
        { title: 'Stay connected with the expert', text: 'The expert reviews reports and updates material through the management area. Community content and support share one product.' },
      ],
      outcomes: ['Fitness community materials are accessible through one app.', 'Members can keep measurement records and submit challenge reports.', 'The expert has tools for content, subscriptions and member support.'],
      closing: 'Besty demonstrates how a mini app can connect member activities with a team workspace. The same product approach can be designed around a school, club or expert community and its own materials and working rules.',
    },
  },
  mayak: {
    ru: {
      slug: 'mayak', name: 'Маяк', title: 'От первого сообщения до своего администратора.',
      seoTitle: 'Маяк — Telegram-бот, маршрутизация и CRM сообщества | Rhema AI',
      description: 'Кейс «Маяк»: переход из Instagram в Telegram, приветственное видео, выбор города и контакт администратора. Панель управления, статусы и аналитика пути пользователя.',
      eyebrow: 'Бот + панель управления / Сообщество',
      intro: 'Система для сообщества «Церковь Любовь Христа»: помогает человеку перейти из первого обращения к нужному контакту, а команде — видеть этапы этого пути и управлять содержимым бота.',
      challenge: 'После обращения человеку нужно объяснить, что делать дальше, помочь выбрать город и найти подходящего администратора. Команде важно понимать, на каком шаге находится контакт, поддерживать актуальность сообщений и управлять направлениями из одного места.',
      solution: 'Связали входящий сценарий в Instagram, Telegram-бота и веб-панель «Маяк». В боте человек получает приветственное видео и продолжает путь через выбор направления и города. Затем ему доступен контакт администратора. Команда видит источник обращения и текущий статус в панели.',
      features: [
        { title: 'Понятное начало диалога', text: 'Ответ в Instagram приглашает перейти в Telegram. Бот встречает приветственным видео и кнопкой продолжения; для обращения за поддержкой предусмотрен «Отдел заботы».' },
        { title: 'Маршрут по городу', text: 'Человек выбирает направление и город, после чего получает ссылку для связи с нужным администратором. Команда управляет списком городов, их активностью и контактами в панели.' },
        { title: 'Контакты и обзор пути', text: 'В списке видны источник, этап, город и дата обращения. Обзор показывает движение от входа в Telegram через видео и выбор города к передаче администратору. Предусмотрен экспорт CSV.' },
        { title: 'Тексты под контролем команды', text: 'Приветствия, сообщения отдельных шагов и другие тексты доступны в панели для редактирования без правки кода. Команда может поддерживать сценарий и направления в актуальном состоянии.' },
      ],
      steps: [
        { title: 'Первое обращение', text: 'Человек приходит через Instagram или открывает Telegram напрямую. В боте получает вводное сообщение, видео и варианты продолжения.' },
        { title: 'Выбор подходящего пути', text: 'Бот ведёт по шагам к направлению и городу. При необходимости человек может обратиться за поддержкой.' },
        { title: 'Связь с администратором', text: 'Человек получает контакт и может написать администратору. В панели команды сохраняется статус прохождения сценария.' },
      ],
      outcomes: ['Для нового человека сформирован последовательный путь к нужному контакту.', 'Команда видит источники обращений и этапы прохождения сценария.', 'Города, контакты и тексты сообщений управляются через веб-панель.'],
      closing: '«Маяк» — пример бота с маршрутизацией и рабочей панелью для команды. Подобный подход подходит сообществам и организациям, которым нужно распределять обращения между направлениями, городами и ответственными людьми.',
    },
    en: {
      slug: 'mayak', name: 'Mayak', title: 'From a first message to the right local contact.',
      seoTitle: 'Mayak — Telegram Onboarding Bot & Community CRM | Rhema AI',
      description: 'Mayak connects Instagram enquiries to a Telegram bot, welcome video, city selection and administrator contact, with a dashboard for managing the community journey.',
      eyebrow: 'Bot + management dashboard / Community',
      intro: 'A system for the Love of Christ church community. It helps a new visitor reach the right contact while the team follows the journey and manages the bot’s content through a web dashboard.',
      challenge: 'After the first enquiry, visitors need to understand the next step, choose their city and find the appropriate administrator. The team needs to see where each contact is in the journey, keep messages current and manage local destinations from one place.',
      solution: 'We connected an Instagram entry flow, a Telegram bot and the Mayak web dashboard. The bot introduces the community with a welcome video, then guides visitors through their options and city selection to an administrator contact. The team can see the source and current stage of each enquiry.',
      features: [
        { title: 'A clear start to the conversation', text: 'An Instagram reply invites the visitor into Telegram. The bot opens with a welcome video and a next-step button, with a dedicated care option for people seeking support.' },
        { title: 'Routing by city', text: 'Visitors select a path and city, then receive a link to the appropriate administrator. The team manages cities, availability and contact details in the dashboard.' },
        { title: 'Contact records and journey overview', text: 'Records show source, stage, city and date. The overview follows the path from entering Telegram through the video and city selection to administrator handoff. CSV export is available.' },
        { title: 'Messages managed by the team', text: 'Greetings and individual step messages can be edited through the dashboard without changing code. The team can maintain the flow and its destinations as information changes.' },
      ],
      steps: [
        { title: 'The first enquiry', text: 'A visitor arrives from Instagram or opens Telegram directly. The bot provides an introduction, a video and options for continuing.' },
        { title: 'Finding the appropriate path', text: 'The bot guides the visitor through direction and city selection. A support option is available along the way.' },
        { title: 'Reaching an administrator', text: 'The visitor receives a contact link and can message the administrator. The team dashboard retains the stage reached in the flow.' },
      ],
      outcomes: ['New visitors have a defined path to the right contact.', 'The team can see enquiry sources and progress through the flow.', 'Cities, contact details and messages are managed through a web dashboard.'],
      closing: 'Mayak shows how a routing bot can work with a practical management dashboard. The approach can support communities and organisations that distribute enquiries across locations, activities and responsible team members.',
    },
  },
};
