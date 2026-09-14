import type { ProductCase } from './product-cases';

export const radarCase: Record<'ru' | 'en', ProductCase> = {
  ru: {
    slug: 'radar', name: 'Радар', title: 'От идеи до контента для вашего бизнеса.',
    seoTitle: 'Радар — подготовка контента для бизнеса | Rhema AI',
    description: 'Кейс «Радар»: мини-приложение в Telegram для изучения конкурентов, сбора идей, подготовки каруселей, сценариев Reels и постов, планирования и учёта метрик.',
    eyebrow: 'Мини-приложение в Telegram / Контент и маркетинг',
    intro: 'Собрали работу над контентом в одном приложении: изучить публикации конкурентов, выбрать тему, подготовить материал в стиле бренда и вернуться к результатам после публикации.',
    challenge: 'Предпринимателю или небольшой команде приходится постоянно решать, о чём писать и как подать тему. Примеры конкурентов, заметки, черновики и планы оказываются в разных местах. При работе с несколькими брендами важно ещё и не смешивать их подачу.',
    solution: 'Создали «Радар» — рабочее пространство внутри Telegram. В нём можно выбрать бренд, собрать примеры публикаций, сохранить идеи и перейти к созданию карусели, сценария короткого видео или поста. Планы и метрики находятся рядом с подготовкой материалов.',
    featuresHeading: 'Всё, что нужно для работы над контентом.',
    features: [
      { title: 'Отдельное пространство для брендов', text: 'Выбор бренда задаёт контекст работы над контентом. Команда может переключаться между проектами в одном приложении.' },
      { title: 'Изучение конкурентов', text: 'Можно указать Telegram-каналы или добавить публикации вручную. Раздел помогает найти темы и подходы, которые стоит развить в собственном контенте.' },
      { title: 'Банк идей и создание материалов', text: 'Темы сохраняются в списке со статусами. Из идеи можно перейти к карусели, сценарию Reels или тексту для Telegram-канала.' },
      { title: 'Планы и учёт результатов', text: 'Контент-календарь и раздел аналитики дополняют подготовку публикаций. Охваты и заявки вносятся вручную, чтобы оценивать опубликованные материалы.' },
    ],
    steps: [
      { title: 'Выбрать бренд и собрать примеры', text: 'Команда определяет проект, аудиторию и формат, затем добавляет источники для изучения.' },
      { title: 'Превратить тему в материал', text: 'В банке идей выбирают подходящую тему и переходят к подготовке нужного формата контента.' },
      { title: 'Спланировать и оценить', text: 'После подготовки и публикации команда возвращается к плану и вносит показатели, чтобы понять, какие материалы стоит развивать.' },
    ],
    outcomes: ['Бренды, источники, идеи и подготовка контента собраны в одном месте.', 'Из сохранённой темы можно перейти к нескольким форматам публикаций.', 'Для планирования и внесения результатов предусмотрены отдельные разделы.'],
    closing: 'Такой инструмент подходит предпринимателю, маркетологу или агентству, которые регулярно готовят контент для одного или нескольких проектов. На показанном экране метрики ещё не внесены: это демонстрация интерфейса, а не подтверждение роста охватов или продаж.',
  },
  en: {
    slug: 'radar', name: 'Radar', title: 'From an idea to content for your business.',
    seoTitle: 'Radar — Business Content Workspace | Rhema AI',
    description: 'Radar is a Telegram Mini App for competitor research, content ideas, carousels, Reels scripts, Telegram posts, planning and manual performance tracking.',
    eyebrow: 'Telegram Mini App / Content and marketing',
    intro: 'One workspace to explore competitors’ posts, choose a topic, prepare content in a brand’s style and review results after publication.',
    challenge: 'Business owners and small teams continually need fresh topics and a useful way to present them. Competitor examples, notes, drafts and plans end up scattered across tools. Managing multiple brands also requires keeping their styles distinct.',
    solution: 'We built Radar inside Telegram. The team selects a brand, collects reference posts, saves ideas and moves into preparing a carousel, a short-video script or a channel post. Planning and metrics sit alongside content preparation.',
    featuresHeading: 'A workspace for the content process.',
    features: [
      { title: 'Multiple brands in one workspace', text: 'Selecting a brand sets the context for the content. The team can switch between projects without leaving the app.' },
      { title: 'Competitor research', text: 'Add Telegram channels or paste posts manually. Research helps identify topics and angles to develop in the brand’s own content.' },
      { title: 'An idea bank with creation tools', text: 'Topics are saved with statuses. An idea can become a carousel, a Reels script or a Telegram channel post.' },
      { title: 'Planning and performance tracking', text: 'A content calendar and analytics section support the workflow. Reach and enquiries are entered manually to review published content.' },
    ],
    steps: [
      { title: 'Choose a brand and collect examples', text: 'Select the project, audience and format, then add sources to explore.' },
      { title: 'Turn a topic into content', text: 'Choose a useful idea and move into preparing the appropriate content format.' },
      { title: 'Plan and review', text: 'After preparing and publishing the material, return to the plan and enter metrics to understand which topics to develop further.' },
    ],
    outcomes: ['Brands, sources, ideas and content preparation share one workspace.', 'A saved topic can lead into several publication formats.', 'Dedicated sections support planning and recording results.'],
    closing: 'Radar suits business owners, marketers and agencies preparing regular content for one or several projects. The analytics screen shown has no recorded metrics yet: it demonstrates the interface, not evidence of increased reach or sales.',
  },
};
