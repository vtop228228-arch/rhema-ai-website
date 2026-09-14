export type WebsiteCaseSlug = 'garajw' | 'sigmaup';
type WebsiteCase = {
  name: string; title: string; seoTitle: string; description: string; eyebrow: string;
  intro: string; challenge: string; solution: string; url: string; displayUrl: string;
  features: { title: string; text: string }[];
  resultTitle: string; result: string;
  screens: { src: string; width: number; height: number; caption: string }[];
};

export const websiteCases: Record<WebsiteCaseSlug, Record<'ru' | 'en', WebsiteCase>> = {
  garajw: {
    ru: {
      name: 'D. Garabazhii', title: 'От знакомства с мастерской до своего украшения.',
      seoTitle: 'Сайт ювелирной мастерской D. Garabazhii — кейс Rhema AI',
      description: 'Разработка сайта D. Garabazhii: ювелирная мастерская, фотографии производства, этапы работы и заявка на индивидуальное украшение. Реальные экраны сайта.',
      eyebrow: 'Сайт для бизнеса / Ювелирная мастерская',
      url: 'https://garajw.ru/', displayUrl: 'garajw.ru',
      intro: 'Создали сайт для мастерской авторских украшений. Посетитель знакомится с производством, узнаёт, как проходит индивидуальный заказ, и может перейти к обсуждению своего изделия.',
      challenge: 'Украшение на заказ выбирают по доверию к мастеру и вниманию к деталям. Сайту нужно объяснить, кто стоит за работой, показать производство и помочь человеку сформулировать пожелания к будущему изделию.',
      solution: 'Собрали спокойный, выразительный сайт с крупной типографикой и фотографиями мастерской. Разделы о процессе, стоимости и индивидуальном заказе последовательно отвечают на вопросы посетителя. Переход к заявке доступен из главной навигации.',
      features: [
        { title: 'Познакомиться с мастерской', text: 'Главная представляет автора и направление работы. Фотографии производства помогают увидеть, где и как создаются украшения.' },
        { title: 'Разобраться в процессе', text: 'Отдельные страницы рассказывают, как проходит заказ и изготовление. Посетитель может изучить этапы до обращения к мастеру.' },
        { title: 'Уточнить детали выбора', text: 'На сайте есть разделы о стоимости, размерах колец, качестве и уходе. Человек может заранее найти ответы на практические вопросы.' },
        { title: 'Обсудить своё изделие', text: 'Страница индивидуального заказа помогает перейти от идеи к обращению. В навигации и контактах есть понятный путь к связи с мастерской.' },
      ],
      resultTitle: 'Мастерская получает своё представительство в интернете.',
      result: 'Сайт объединяет знакомство с автором, рассказ о производстве и переход к индивидуальному заказу. Такой формат подходит бизнесу, которому важно объяснить ценность своей работы, показать детали и дать клиенту понятный способ обратиться.',
      screens: [
        { src: '/cases/garajw/workshop.png', width: 1440, height: 1000, caption: 'Раздел сайта с фотографиями производства и украшений D. Garabazhii' },
        { src: '/cases/garajw/homepage.png', width: 1440, height: 1000, caption: 'Первый экран сайта D. Garabazhii' },
        { src: '/cases/garajw/custom-order.png', width: 1440, height: 1000, caption: 'Страница индивидуального заказа украшения' },
      ],
    },
    en: {
      name: 'D. Garabazhii', title: 'From meeting the jeweller to discussing a personal piece.',
      seoTitle: 'D. Garabazhii — Bespoke Jewellery Website Case Study | Rhema AI',
      description: 'A website for the D. Garabazhii jewellery workshop, with production photography, process information and a route to a bespoke order. Real website screenshots.',
      eyebrow: 'Business website / Bespoke jewellery',
      url: 'https://garajw.ru/', displayUrl: 'garajw.ru',
      intro: 'We created a website for a bespoke jewellery workshop. Visitors can discover the production process, understand how a custom order works and start a conversation about their own piece.',
      challenge: 'A bespoke jewellery purchase depends on trust in the maker and attention to detail. The website needed to introduce the people behind the work, show the workshop and help visitors express what they wanted from a personal piece.',
      solution: 'We built a restrained, expressive website with prominent typography and workshop photography. Dedicated pages about the process, pricing and bespoke orders answer the visitor’s questions in sequence. The main navigation provides a direct route to an enquiry.',
      features: [
        { title: 'Meet the maker', text: 'The home page introduces the jeweller and the work. Production photography gives visitors a view of the place and process behind the jewellery.' },
        { title: 'Understand the process', text: 'Dedicated pages explain how ordering and production work. Visitors can learn about the stages before contacting the workshop.' },
        { title: 'Explore the practical details', text: 'Sections cover pricing, ring sizes, quality and care. Visitors can find answers to common practical questions before making an enquiry.' },
        { title: 'Discuss a personal piece', text: 'The bespoke-order page offers a route from an idea to an enquiry. Navigation and contact links make the next step easy to find.' },
      ],
      resultTitle: 'A dedicated online home for the workshop.',
      result: 'The website brings together the maker’s introduction, the production story and a route to a bespoke order. This approach suits businesses that need to explain the value of their work, show the details and give clients a clear way to get in touch.',
      screens: [
        { src: '/cases/garajw/workshop.png', width: 1440, height: 1000, caption: 'The D. Garabazhii website showing workshop and jewellery photography' },
        { src: '/cases/garajw/homepage.png', width: 1440, height: 1000, caption: 'The opening screen of the D. Garabazhii website' },
        { src: '/cases/garajw/custom-order.png', width: 1440, height: 1000, caption: 'The bespoke jewellery order page' },
      ],
    },
  },
  sigmaup: {
    ru: {
      name: 'SigmaUp', title: 'Познакомиться с курсом. Понять программу. Выбрать тариф.',
      seoTitle: 'SigmaUp — разработка сайта онлайн-курса | Rhema AI',
      description: 'Кейс сайта SigmaUp Academy: курс мобильного монтажа Даниила Черепахина, знакомство с автором, программа и выбор тарифа. Реальные страницы образовательного проекта.',
      eyebrow: 'Образовательный проект / Сайт онлайн-курса',
      url: 'https://www.sigmaup.pro/main', displayUrl: 'sigmaup.pro/main',
      intro: 'Для SigmaUp собрали сайт курса по мобильному монтажу. Он знакомит посетителя с автором и форматом обучения, раскрывает программу и помогает сравнить варианты участия.',
      challenge: 'Будущему ученику нужно понять, чему посвящён курс, кто его ведёт, как устроено обучение и чем отличаются тарифы. Образовательному проекту нужен сайт, который собирает эту информацию в последовательный рассказ и даёт понятный следующий шаг.',
      solution: 'На публичной странице связали знакомство с Даниилом Черепахиным, описание курса, программу и тарифы. Посетитель может изучить содержание, сравнить самостоятельное обучение и варианты с сопровождением, найти поддержку и перейти ко входу.',
      features: [
        { title: 'Понять, о чём курс', text: 'Первый экран задаёт тему мобильного монтажа. Далее сайт объясняет, кому адресовано обучение и как оно организовано.' },
        { title: 'Познакомиться с автором', text: 'История Даниила Черепахина и материалы об обучении помогают посетителю понять, кто стоит за проектом.' },
        { title: 'Изучить программу', text: 'План курса доступен со страницы. Будущий ученик может посмотреть содержание до выбора варианта участия.' },
        { title: 'Сравнить варианты участия', text: 'В тарифах показан состав каждого варианта: самостоятельное изучение или обучение с сопровождением. Рядом доступны условия участия, а в меню — вход и связь с поддержкой.' },
      ],
      resultTitle: 'Весь путь знакомства с курсом — на одном сайте.',
      result: 'Образовательный проект получил страницу, где можно представить автора, объяснить обучение, раскрыть программу и показать тарифы. Здесь демонстрируем публичную часть SigmaUp — с настоящими экранами работающего сайта.',
      screens: [
        { src: '/cases/sigmaup/homepage.png', width: 1440, height: 1000, caption: 'Первый экран сайта курса SigmaUp Academy' },
        { src: '/cases/sigmaup/curriculum.png', width: 1440, height: 1000, caption: 'План курса: знакомство с содержанием обучения' },
        { src: '/cases/sigmaup/plans.png', width: 1440, height: 1000, caption: 'Тарифы и состав вариантов участия в курсе' },
      ],
    },
    en: {
      name: 'SigmaUp', title: 'Discover the course. Explore the lessons. Choose a plan.',
      seoTitle: 'SigmaUp — Online Course Website Case Study | Rhema AI',
      description: 'The SigmaUp Academy course website introduces Daniil Cherepakhin’s mobile video editing course, its curriculum and participation plans. Real public-page screenshots.',
      eyebrow: 'Education / Online course website',
      url: 'https://www.sigmaup.pro/main', displayUrl: 'sigmaup.pro/main',
      intro: 'We built a website for SigmaUp’s mobile video editing course. It introduces the creator and learning format, presents the curriculum and helps visitors compare ways to take part.',
      challenge: 'Prospective students need to understand the course topic, who teaches it, how learning works and how the plans differ. The education business needs a website that brings this information together in a clear sequence and makes the next step easy to find.',
      solution: 'The public page connects an introduction to Daniil Cherepakhin with course information, the curriculum and participation plans. Visitors can explore the content, compare independent learning with supported options, find help and access the sign-in page.',
      features: [
        { title: 'Understand the course', text: 'The opening screen introduces mobile video editing. The page then explains who the course is for and how the learning experience is organised.' },
        { title: 'Meet the creator', text: 'Daniil Cherepakhin’s story and course information help visitors understand who is behind the project.' },
        { title: 'Explore the curriculum', text: 'Visitors can open the course plan from the page and review the content before choosing a participation option.' },
        { title: 'Compare participation options', text: 'Plan descriptions explain what is included, from independent study to learning with support. Participation terms are nearby, with sign-in and support links in the navigation.' },
      ],
      resultTitle: 'One place to discover and explore the course.',
      result: 'The education project has a page for introducing its creator, explaining the learning experience, presenting the curriculum and comparing plans. This case shows SigmaUp’s public website through real screenshots.',
      screens: [
        { src: '/cases/sigmaup/homepage.png', width: 1440, height: 1000, caption: 'The opening screen of the SigmaUp Academy course website' },
        { src: '/cases/sigmaup/curriculum.png', width: 1440, height: 1000, caption: 'The course plan, available before choosing a plan' },
        { src: '/cases/sigmaup/plans.png', width: 1440, height: 1000, caption: 'Course plans and what each participation option includes' },
      ],
    },
  },
};
