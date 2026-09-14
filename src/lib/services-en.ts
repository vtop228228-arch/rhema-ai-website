import type { Service } from './services';

export const servicesEn: Service[] = [
  {
    slug: 'ai-agents',
    title: 'AI assistants for customers and teams',
    seoTitle: 'Custom AI Agent Development for Business — Rhema AI',
    description: 'Custom AI agents that answer customer questions, collect enquiries and help employees find information. Development from RUB 30,000.',
    eyebrow: 'RHEMA / AI agents',
    intro: 'Customers ask the same questions, and employees look up the answers each time. We build an AI agent: an assistant set up around your products, services and rules. It answers from your company materials, clarifies enquiries and passes difficult questions to a person.',
    outcomes: [
      'Customers get answers to routine questions from your company materials.',
      'Your employee receives the enquiry and conversation without having to start again.',
      'You decide what the assistant can do and what an employee must approve.',
    ],
    useCases: [
      {
        title: 'Prepare enquiries for your sales team',
        text: 'Today, an employee asks what a customer needs and copies the answers into your records. The assistant can ask about the request, explain your service and collect contact details. If your customer records system, or CRM, supports a connection, the enquiry and conversation can be saved there automatically.',
      },
      {
        title: 'Answer recurring questions',
        text: 'A customer asks about delivery, or a student needs to find a lesson. The assistant looks for an answer in approved instructions or course materials. If information is missing or the situation needs a decision, it passes the question and conversation to an employee.',
      },
      {
        title: 'Help employees find what they need',
        text: 'Instead of searching through folders, an employee asks, “What is included in this plan?” The assistant searches the documents you have made available to it. It can also summarise a conversation or draft a reply for a person to review.',
      },
    ],
    steps: [
      {
        title: 'Show us the task',
        text: 'We ask for sample enquiries, service descriptions and your current rules. Together, we choose one task and decide when the assistant should ask an employee for help. If information is missing, we help you list what needs to be clarified.',
      },
      {
        title: 'Try a working version',
        text: 'We show you the assistant and try real customer questions together, including incomplete and difficult ones. Your team checks the meaning of the answers; we improve the software. We agree what needs to work before launch.',
      },
      {
        title: 'Launch and show your team how to use it',
        text: 'We connect the assistant to the chosen channel, such as your website or Telegram, and check that enquiries reach your team. We show employees how to receive requests, update the materials and report problems. They receive clear instructions.',
      },
    ],
    deliverables: [
      'A working assistant for one agreed task on your website, in a messenger or within your team.',
      'Your reference materials and the agreed connections to existing tools.',
      'Clear rules for what the assistant can do and when it asks a person for help.',
      'Testing on your examples, launch and employee instructions.',
    ],
    priceNote: 'AI assistant development starts at RUB 30,000. The initial estimate for one task is 5–14 days. The final price and schedule depend on your materials, features and connections to your tools; we agree them after discussing the task. AI services, running the software on a server and other services may be billed separately. The offer includes 30 days of support after launch; what it covers is specified in the project terms.',
    faqs: [
      {
        q: 'Do I need to understand AI to order an assistant?',
        a: 'No. Tell us what employees do manually and show us a few examples. We will suggest an approach. If a bot with buttons and prepared answers is enough, we can use that. AI helps when customers write in their own words and the answer needs to be found in your materials.',
      },
      {
        q: 'What do you need from our team?',
        a: 'Current product or service descriptions, sample questions and an employee who can check the answers. If enquiries should be saved in your CRM, the system that holds your customer records, we will check whether it can be connected. We discuss access and your team’s involvement before work begins.',
      },
      {
        q: 'What happens if the agent does not know an answer or makes a mistake?',
        a: 'AI can make mistakes. We define which questions should go to an employee and test answers on your examples before launch. Important actions, such as changing records, can require human approval. Your team remains responsible for reviewing difficult cases and keeping the source materials up to date.',
      },
    ],
    relevantProjectIds: ['jarvis', 'isnail'],
  },
  {
    slug: 'business-automation',
    title: 'Business process automation',
    seoTitle: 'Business Process Automation and CRM Integration — Rhema AI',
    description: 'Business process automation: route enquiries to employees, update customer records and prepare reports using the tools your team already works with.',
    eyebrow: 'RHEMA / Automation',
    intro: 'Enquiries arrive in messengers, employees copy them into spreadsheets, and a manager puts together the report by hand. We connect familiar tools so these actions follow agreed rules automatically. We start with one part of the work you want to simplify.',
    outcomes: [
      'A new enquiry reaches the assigned employee with the details they need.',
      'Your team does not have to re-enter the same information in connected tools.',
      'A manager receives a summary from the sources you have chosen.',
    ],
    useCases: [
      {
        title: 'Send enquiries to the right employee',
        text: 'Instead of someone copying a website form, the enquiry appears in your CRM, the system that holds customer records. An employee receives a notification and the information needed for a first conversation. We agree who should get the enquiry and which details it must include.',
      },
      {
        title: 'Remember the next step',
        text: 'An employee no longer has to keep every promised call in their head. We set up reminders using your rules and keep the conversation history and next action together. Where useful, AI can prepare a short conversation summary for an employee to check.',
      },
      {
        title: 'Prepare reports and fill in documents',
        text: 'Today, an employee opens several spreadsheets, copies figures and fills in a template. We can set up the collection of agreed data and the preparation of a report or draft document. Your team checks important documents and conclusions before using them.',
      },
    ],
    steps: [
      {
        title: 'Show us how the work happens today',
        text: 'You walk us through one task: where an enquiry or document comes from, who handles it and where they copy the information. We choose the recurring actions to include in the first version.',
      },
      {
        title: 'Agree what should happen automatically',
        text: 'We check whether your tools can be connected. We describe the new process in clear steps: what starts an action, where the data goes, who receives a notification and when an employee needs to check the result.',
      },
      {
        title: 'Check it together and launch',
        text: 'Using your examples, we check that information goes to the right place and the task reaches the responsible person. After approval, we launch and provide instructions. Additional tasks are discussed and estimated separately.',
      },
    ],
    deliverables: [
      'A clear plan of what will run automatically and who checks the result.',
      'Connected tools that pass the required information between them.',
      'The notifications, reports or documents agreed for your task.',
      'Testing on examples, launch and employee instructions.',
    ],
    priceNote: 'We estimate the price after reviewing your work. It depends on the number of actions, connections to your tools and the complexity of the information involved. If a separate AI assistant is needed, its development starts at RUB 30,000. We agree the overall budget and schedule before work begins. Subscriptions, AI services and running the software on a server are accounted for separately. The offer includes 30 days of support after launch within an agreed scope.',
    faqs: [
      {
        q: 'Do we need to switch to new software?',
        a: 'We first look at what you already use: spreadsheets, messengers and customer records software. We check which tools can be connected. If there are limitations, we explain them and discuss the options before development.',
      },
      {
        q: 'Which process should we automate first?',
        a: 'A task your team repeats with similar rules: copying enquiries, reminding people to submit reports or collecting figures from spreadsheets. You show us how it works today; we help choose a starting point and estimate the work involved.',
      },
      {
        q: 'How do we know the automation is working correctly?',
        a: 'Before starting, we write down the expected result: for example, an enquiry appears in the right system and the assigned employee gets a notification. We then check it together using ordinary and incomplete requests. To assess the benefit, you can compare the time spent and number of manual actions before and after launch.',
      },
    ],
    relevantProjectIds: ['jarvis', 'mayak', 'church-analytics', 'isnail'],
  },
  {
    slug: 'business-platforms',
    title: 'Websites, apps and customer portals',
    seoTitle: 'Custom Business Platforms, CRM and Customer Portals — Rhema AI',
    description: 'Websites, customer portals, CRM and Telegram mini apps for business. Customers use your service and your team manages the work. Platforms from RUB 90,000.',
    eyebrow: 'RHEMA / Business platforms',
    intro: 'You may need a website for your service, a student account or an app where your team manages customers and reports. We build around that need: plan the pages, create the design and develop the features. You try a working version before launch.',
    outcomes: [
      'Customers can find information, send an enquiry or use your service.',
      'Employees manage the information and sections they are responsible for.',
      'Core features launch first; additional features can be estimated separately.',
    ],
    useCases: [
      {
        title: 'Customer records and team tasks',
        text: 'When information is spread across chats and spreadsheets, we can bring it together in a shared workspace. Employees see enquiries and commitments; managers see the reports they need. This type of customer records system is called a CRM. We agree what each employee can see and change.',
      },
      {
        title: 'Online schools and expert services',
        text: 'Students open lessons and submit assignments in their account, while an expert manages materials and reviews their work. Where needed, an AI assistant can answer questions using the course materials. We choose features around how you teach and support your customers.',
      },
      {
        title: 'Websites and apps inside Telegram',
        text: 'A website explains your service and collects enquiries. A Telegram mini app opens inside the messenger and can contain materials, forms, reports and personal accounts. We help choose a format based on your users and what they need to do.',
      },
    ],
    steps: [
      {
        title: 'Choose what needs to work at launch',
        text: 'You tell us about your business and show us your materials. Together, we choose what customers and employees need to do in the product. We list the pages and features, then agree the budget, schedule and how to check the result.',
      },
      {
        title: 'Review the design and try working pages',
        text: 'We plan how someone finds your service, sends an enquiry or opens their account. You review the design and try the features with practical examples. We build the product and make the agreed changes.',
      },
      {
        title: 'Launch and show you how to manage it',
        text: 'We check the product on phones and computers, test forms, employee access and connected tools. We hand over the product and instructions. Code transfer, support and future changes are agreed before work starts.',
      },
    ],
    deliverables: [
      'Agreed pages and a design for phones and computers.',
      'Working forms, accounts and the other features included in the project.',
      'Connections to the required tools and an AI assistant if agreed for the task.',
      'Testing, launch and instructions for managing the product.',
    ],
    priceNote: 'Platform development starts at RUB 90,000, with an initial estimate of at least 3 weeks for the first version. Budget and timing depend on features, employee access, design and connections to other tools. We agree the work and estimate after reviewing the task. Running the product on a server, AI services and other services may be billed separately. The offer includes 30 days of support after launch; what it covers, code rights and ongoing maintenance are specified in the project terms.',
    faqs: [
      {
        q: 'How do I know whether I need a website or an app?',
        a: 'A website is often enough to describe a service and receive enquiries. If customers need lessons, activity history or personal information, they may need an account or an app. You describe what people should be able to do, and we suggest the amount of development required.',
      },
      {
        q: 'Can we launch the core features and add more later?',
        a: 'Yes. We start with one task a user can complete from beginning to end, such as taking a lesson and submitting an assignment. We then look at what is missing in everyday use. Additional features receive a separate cost and time estimate.',
      },
      {
        q: 'What do you need from us, and what do we receive after launch?',
        a: 'We need information about your business, examples of your work and someone who can approve decisions. We handle planning, design, development and testing. After launch, we hand over the product and instructions. Code rights, access to the hosting account and support terms are agreed before work begins.',
      },
    ],
    relevantProjectIds: ['garajw', 'sigmaup', 'besty', 'jarvis', 'mayak', 'financefamily', 'church-analytics'],
  },
];
