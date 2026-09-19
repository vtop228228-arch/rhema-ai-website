export type RhemaOsCase = {
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  challenge: string;
  solution: string;
  modules: {
    id: string;
    title: string;
    label: string;
    description: string;
  }[];
  workflow: { title: string; text: string }[];
  outcomes: string[];
  closing: string;
};

export const contentByLocale: Record<'ru' | 'en', RhemaOsCase> = {
  ru: {
    title: 'Клиенты, задачи и AI-помощники в одной системе.',
    seoTitle: 'Rhema OS (JARVIS) — операционная система с AI-агентами',
    description: 'Как мы создали Rhema OS, собственную операционную систему бизнеса с AI-агентами: продажи, контент, анализ рынка и контроль работы в одном интерфейсе.',
    eyebrow: 'JARVIS / Собственная операционная система',
    intro: 'Мы создали для Rhema AI рабочую систему, в которой команда агентов помогает вести продажи, разбирать звонки, готовить контент и исследовать рынок. Основатели управляют работой через единый интерфейс и принимают решения по подготовленным материалам.',
    challenge: 'Нужно было объединить в общей системе учёт, финансы, доходы и расходы, лиды и контроль качества сообщений клиентам. В той же среде — готовить сценарии и планы контента, после созвона получать краткие итоги, анализ разговора и черновик коммерческого предложения. Задача: передать повторяющиеся действия агентам и видеть, что система делает самостоятельно, где произошла ошибка и что требует решения человека.',
    solution: 'Внутренний проект JARVIS развили в Rhema OS — операционную систему бизнеса с агентами по направлениям. В ней связаны командный центр, CRM, разбор звонков, подготовка материалов и журнал действий. Агентам заданы роли: от координации работы и AI-архитектуры до бизнес-анализа и контента. Человек видит подготовленные результаты и управляет дальнейшими действиями.',
    modules: [
      {
        id: 'command',
        title: 'Командный центр и команда агентов',
        label: 'Command Center / Agents',
        description: 'Общий обзор заявок, задач и показателей бизнеса. На карте агентов видны роли и связи между ними: основатель, координирующий агент, AI-архитектор и исполнители по направлениям. Из этого же пространства можно поставить задачу и посмотреть состояние работы.',
      },
      {
        id: 'sales',
        title: 'Продажи: от обращения до разбора звонка',
        label: 'Lead Pipeline / Deal Engine / Coaching',
        description: 'Система учёта клиентов (CRM) показывает обращения по этапам работы. В разбор звонка можно передать текст или аудио: система помогает выделить контекст клиента и подготовить материалы для следующего шага. Отдельный экран собирает разборы и рекомендации для работы над продажами.',
      },
      {
        id: 'touches',
        title: 'Следующий контакт с клиентом',
        label: 'Touches',
        description: 'В одном списке собраны запланированные контакты, контекст компании и черновики сообщений. Сотрудник проверяет текст, использует его для общения и отмечает результат: сообщение отправлено, контакт принят или ответ получен.',
      },
      {
        id: 'content',
        title: 'Контент от идеи до одобрения',
        label: 'Content Factory',
        description: 'Рабочее пространство для тем, наблюдений за контентом на рынке и подготовки публикаций. Из идеи можно собрать черновик карусели, посмотреть материалы и одобрить или отклонить их. Подготовка и редакторское решение видны в одном процессе.',
      },
      {
        id: 'research',
        title: 'Исследование рынка для выбора задач',
        label: 'Audits / Market Intelligence',
        description: 'Агенты помогают разбирать сайты компаний и собирать наблюдения о процессах, которые можно автоматизировать. Результаты сгруппированы по нишам, задачам и возможным решениям. Это материал для проверки и выбора направления, с которым команда будет работать дальше.',
      },
      {
        id: 'activity',
        title: 'Работа агентов под наблюдением',
        label: 'Activity / History',
        description: 'Журнал показывает выполненные задачи, ошибки, объём обработанного текста и расходы на работу агентов. История сохраняет разборы звонков и бизнес-задач. Можно вернуться к результату, понять, что происходило, и определить, где нужна проверка человека.',
      },
    ],
    workflow: [
      {
        title: 'Задача получает контекст',
        text: 'В систему поступает рабочий материал: обращение, запись звонка, компания для исследования или тема публикации. Команда задаёт цель и выбирает нужный процесс.',
      },
      {
        title: 'Агенты готовят результат',
        text: 'Агенты выполняют работу в рамках своих ролей: разбирают материал, собирают сведения, готовят выводы и черновики. Результат появляется в соответствующем разделе системы.',
      },
      {
        title: 'Человек определяет следующий шаг',
        text: 'Сотрудник проверяет подготовленные материалы, принимает решение и отмечает действие или статус. Журнал и история помогают вернуться к работе и разобраться в результате.',
      },
    ],
    outcomes: [
      'У команды есть общее пространство для продаж, контента, исследований и работы с агентами.',
      'Контекст клиента, разбор звонка и следующий шаг доступны в одной системе.',
      'Черновики сообщений и публикаций проходят через проверку человека.',
      'Работа агентов наблюдаема: доступны задачи, ошибки, история и расходы.',
    ],
    closing: 'Rhema OS — наш собственный внутренний продукт. Этот кейс показывает, как мы соединяем AI-агентов с рабочими процессами команды. Для другого бизнеса состав системы начинается с его задач: можно выбрать один процесс, проверить его в работе и затем развивать решение.',
  },
  en: {
    title: 'One workspace for clients, tasks and AI helpers.',
    seoTitle: 'Rhema OS (JARVIS) — an AI operating system for our agency',
    description: 'How we built Rhema OS, our internal business operating system with AI agents for sales, content, market research and oversight in one workspace.',
    eyebrow: 'JARVIS / Our own operating system',
    intro: 'We built a working system for Rhema AI where a team of agents helps manage sales, analyse calls, prepare content and research the market. The founders direct the work through one interface and make decisions using the material the agents prepare.',
    challenge: 'We needed one system for records, finances, income and expenses, leads and the quality of customer messages. The same workspace needed to support content scripts and plans, call summaries, conversation analysis and draft proposals. The goal was to delegate recurring work to agents while seeing what runs automatically, what fails and what needs a human decision.',
    solution: 'We developed our internal JARVIS project into Rhema OS, a business operating system with agents assigned to specific functions. It brings together a command centre, CRM, call analysis, content preparation and an activity log. Agent roles range from coordinating work and AI architecture to business analysis and content. People review the results and direct what happens next.',
    modules: [
      {
        id: 'command',
        title: 'A command centre and a team of agents',
        label: 'Command Center / Agents',
        description: 'An overview of leads, tasks and business figures. The agent map shows roles and their connections: founder, coordinating agent, AI architect and agents for individual functions. The same workspace provides a place to assign a task and check its status.',
      },
      {
        id: 'sales',
        title: 'Sales, from a new lead to call review',
        label: 'Lead Pipeline / Deal Engine / Coaching',
        description: 'The customer records system (CRM) shows each enquiry and its current stage. Call analysis accepts text or audio to help identify the client context and prepare material for the next step. A separate view brings together call reviews and recommendations for improving the sales conversation.',
      },
      {
        id: 'touches',
        title: 'The next conversation with a prospect',
        label: 'Touches',
        description: 'Planned contacts, company context and draft messages appear in one list. A team member reviews the text, uses it in the conversation and records the outcome: message sent, connection accepted or reply received.',
      },
      {
        id: 'content',
        title: 'Content, from an idea to approval',
        label: 'Content Factory',
        description: 'A workspace for topics, observations about content in the market and publication drafts. An idea can become a draft carousel for review, approval or rejection. Content preparation and editorial decisions are part of the same visible process.',
      },
      {
        id: 'research',
        title: 'Market research to guide the next project',
        label: 'Audits / Market Intelligence',
        description: 'Agents help review company websites and gather observations about processes that could benefit from automation. Findings are grouped by industry, business task and possible solution. The team checks this material before deciding where to focus its work.',
      },
      {
        id: 'activity',
        title: 'Visibility into agent activity',
        label: 'Activity / History',
        description: 'The activity log displays completed tasks, errors, the amount of text processed and running costs. History retains call reviews and business analyses. The team can revisit a result, understand what happened and identify where human review is needed.',
      },
    ],
    workflow: [
      {
        title: 'Give the task its context',
        text: 'The system receives working material: a lead, a call recording, a company to research or a content topic. The team defines the goal and chooses the relevant workflow.',
      },
      {
        title: 'Agents prepare the result',
        text: 'Agents work within their assigned roles to analyse material, gather information and prepare findings and drafts. The result appears in the relevant section of the system.',
      },
      {
        title: 'A person decides what happens next',
        text: 'A team member checks the prepared material, makes the decision and records the action or status. The activity log and history make it possible to revisit the work and understand the result.',
      },
    ],
    outcomes: [
      'A shared workspace brings together sales, content, research and agent activity.',
      'Client context, call analysis and the next step are available in one system.',
      'Draft messages and publications go through human review.',
      'Agent work is visible through tasks, errors, history and running costs.',
    ],
    closing: 'Rhema OS is our own internal product. This case shows how we connect AI agents with a team’s working processes. For another business, the scope starts with its own tasks: choose one process, test it in practice and develop the system from there.',
  },
};
