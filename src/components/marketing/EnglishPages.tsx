import DiagnosisSection from './DiagnosisSection';
import DiscoveryIntro, { ClearServices } from './DiscoveryIntro';
import SeraphimTeaser from './SeraphimTeaser';
import Link from 'next/link';
import Image from 'next/image';

import ContactPanel from './ContactPanel';
import Reveal from './Reveal';
import RhemaOSFeature from './RhemaOSFeature';
import { ProductCaseCollection, ProductCaseTeaser } from './ProductCaseStudy';
import { WebsiteCaseCollection, WebsiteCaseTeaser } from './WebsiteCaseStudy';
import CaseDirectory from './CaseDirectory';
import s from './Editorial.module.css';


const steps = [
  { title: 'Tell us about your work', body: 'What takes too long, where enquiries get lost and which tools your team uses. No technical brief needed.', result: 'One task to start with' },
  { title: 'We explain the plan', body: 'We explain what the solution will do and agree the price, timeline and how to check the result.', result: 'You know what you are paying for' },
  { title: 'Try a working version', body: 'Your team tries the first version with real examples. Together, we check the answers, actions and ease of use.', result: 'A solution your team has tested' },
  { title: 'We help you launch', body: 'We connect the tools you need, show your team how to use the solution and provide instructions.', result: '30 days of support after launch' },
];

const projects = [
  {
    id: 'sigmaup', name: 'SigmaUp', type: 'Learning platform',
    title: 'Courses, students and an AI tutor in one system.',
    body: 'A platform for Cherepakhin Academy with a student portal, courses, plans, analytics and an AI tutor.',
    tags: ['Student portal', 'Courses & access', 'AI tutor'],
    before: 'The academy needed its own learning environment with the flexibility to support its processes.',
    after: 'We built a platform with learning materials, access management and tools for supporting students.',
    service: 'business-platforms', serviceLabel: 'Custom platform development',
  },
  {
    id: 'besty', name: 'Besty', type: 'Telegram mini app',
    title: 'A fitness school that opens inside Telegram.',
    body: 'Workouts, nutrition, challenges and measurement records, with a workspace for the expert to manage content and member support.',
    tags: ['Mini app', 'Challenges', 'Expert dashboard'],
    before: 'Learning materials and student support were spread across chats and manual work by the course curator.',
    after: 'Students can access workouts, recipes, a measurement tracker and support in one application.',
    service: 'business-platforms', serviceLabel: 'Platforms and mini apps',
  },
  {
    id: 'jarvis', name: 'Rhema OS / JARVIS', type: 'Our own operating system',
    title: 'An agency operating system with a team of AI agents.',
    body: 'Agent coordination, CRM, call analysis, content workflows and activity tracking in the system we built for our own team.',
    tags: ['AI agents', 'Business platform', 'Human control'],
    before: 'We needed a shared working environment for agents, sales, content and the people responsible for them.',
    after: 'We built Rhema OS: a business platform with agent roles, sales workflows, content drafts and a record of activity and costs.',
    service: 'business-automation', serviceLabel: 'Business process automation',
  },
  {
    id: 'isnail', name: 'ISnail Academy', type: 'AI course assistant',
    title: 'An assistant that knows the course material.',
    body: 'Vika, an AI course assistant, answers questions, checks assignments against defined criteria and supports students.',
    tags: ['Knowledge base', 'Assignment review', 'Student support'],
    before: 'Repeated questions and assignment reviews took up the course team’s time.',
    after: 'We developed an assistant based on the course material to answer questions and review assignments.',
    service: 'ai-agents', serviceLabel: 'AI agent development',
  },
];

const faqs = [
  { q: 'Is the diagnosis really free?', a: 'Yes. We review your task and discuss a useful first step at no charge. Leave your details and we will arrange a call. If you decide to commission development, we agree its scope, price and timeline separately. There is no obligation to buy.' },
  { q: 'I do not understand AI. Where do I start?', a: 'Tell us in your own words what you would like to make easier: replying to customers, preparing reports or keeping track of promises. We will ask questions and suggest a first step. You do not need technical knowledge or a detailed brief.' },
  { q: 'What is an AI agent in plain language?', a: 'It is a software assistant that uses your materials to answer questions and carry out agreed tasks. For example, it can ask what a customer needs and pass the request to your team. A conventional bot works well for fixed steps and buttons; AI is useful when questions and texts vary. We choose the right approach for your task.' },
  { q: 'Will we have to replace the tools we already use?', a: 'First, we check whether we can connect your spreadsheets, email and CRM — software for tracking customers and deals. What is possible depends on those services. If changes are needed, we explain and agree them before development.' },
  { q: 'What does it cost, and are there monthly fees?', a: 'An AI assistant starts at RUB 30,000; a custom platform starts at RUB 90,000. The price depends on features and the tools we need to connect. Running AI, hosting the website or app, and other services may cost extra. We agree development and running costs before starting. Additional tasks beyond the plan are estimated separately.' },
  { q: 'When can we start using it?', a: 'A planning estimate for one AI assistant is 5–14 days; the first version of a platform starts from 3 weeks. Your timeline depends on the features, available materials and tools we need to connect. We agree it after discussing the task.' },
  { q: 'Can AI make mistakes or act without us?', a: 'AI can make mistakes. We agree what information it uses, what it can do on its own and when it must pass a question to a person. Important replies and changes can require human approval. Before launch, we test it with examples from your business.' },
  { q: 'How much time will our team need to spend?', a: 'We need someone who understands the task to show us how it works today, share examples and help test the first version. We also need materials about your services and agreed access to the tools we connect. We start with one task so you do not have to change everything at once.' },
  { q: 'Will you help us after launch?', a: 'Yes. We provide instructions, and the offer includes 30 days of support after launch. The project terms define what support covers, code ownership, further maintenance and the cost of running services.' },
];

function Action({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link className={secondary ? s.secondary : s.button} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className={s.kicker}>{children}</span>;
}

function Intro({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <header className={s.subHero}><Label>{eyebrow}</Label><h1>{title}</h1><p>{children}</p></header>;
}



function Process() {
  return <section className={s.section} id="process" data-reveal>
    <div className={s.sectionHeading}><div><Label>03 / How we work</Label><h2>From a first question<br /><em>to a working system.</em></h2></div><p>At every stage, you know what we are building, what we need from you and what we will check together.</p></div>
    <ol className={s.steps}>{steps.map((step, i) => <li key={step.title}><span className={s.stepNumber}>0{i + 1}</span><h3>{step.title}</h3><p>{step.body}</p><span className={s.stepResult}>{step.result}</span></li>)}</ol>
  </section>;
}

function Pricing() {
  return <section className={s.section} id="pricing" data-reveal>
    <div className={s.sectionHeading}><div><Label>04 / Prices and timelines</Label><h2>Start small.<br /><em>Build as you grow.</em></h2></div><p>Give an assistant one task or create an app for your whole team. After a conversation, we suggest a suitable option and explain the cost.</p></div>
    <div className={s.pricingGrid}>
      <article className={s.priceShell}><div className={s.priceCard}><Label>Help with one task</Label><h3>AI assistant</h3><div className={s.price}><span className={s.note}>Starting at</span>30,000 <small>RUB</small></div><p>Answers questions about your services, reminds people about tasks or finds information in your documents.</p><ul><li>Clear tasks and operating rules</li><li>Your materials and the tools you need</li><li>Testing with your team’s examples</li><li>Launch and instructions</li></ul><span className={s.note}>Planning estimate: 5–14 days</span><Action href="#contact">Discuss my task</Action></div></article>
      <article className={s.priceShell}><div className={s.priceFeatured}><Label>A service for customers and staff</Label><h3>Your own platform</h3><div className={s.price}><span className={s.note}>Starting at</span>90,000 <small>RUB</small></div><p>A customer account area, online school or app for orders, reports and your team’s everyday work.</p><ul><li>Useful screens for your tasks</li><li>Personal accounts and access permissions</li><li>Connections to the tools you need</li><li>Launch and project handover</li></ul><span className={s.note}>First version: from 3 weeks</span><Action href="#contact">Discuss an app</Action></div></article>
    </div>
    <div className={s.pricingNote}><strong>What goes into your budget</strong><p>These are starting prices in Russian rubles (RUB). We agree the final price after discussing features and the tools we need to connect. Running AI, hosting the app and other services may cost extra; we discuss these costs before starting. Additional tasks are estimated separately.</p></div>
  </section>;
}

function CasePreview() {
  return <section className={s.caseSection} id="cases" data-reveal>
    <div className={s.sectionHeading}><div><Label>02 / What we have built</Label><h2>Working products.<br /><em>Real business tasks.</em></h2></div><Action href="/en/cases" secondary>All projects</Action></div>
    <SeraphimTeaser locale="en" />
    <div className={s.caseGrid}>
      <WebsiteCaseTeaser slug="sigmaup" locale="en" heading="h3" />
      <ProductCaseTeaser slug="besty" locale="en" heading="h3" />
    </div>
  </section>;
}

function Questions() {
  return <section className={s.faq} data-reveal><div><Label>05 / Before the first step</Label><h2>Good questions.<br /><em>Clear answers.</em></h2><p>Have another question?<br /><a href="https://t.me/RhemaAI_support" target="_blank" rel="noopener noreferrer">Message us on Telegram ↗</a></p></div><div>{faqs.map((faq, i) => <details key={faq.q}><summary><span className={s.faqNumber}>0{i + 1}</span><span>{faq.q}</span><span className={s.faqPlus} aria-hidden="true">+</span></summary><p>{faq.a}</p></details>)}</div></section>;
}

export function HomePage() {
  return <Reveal><div className={s.container}><DiscoveryIntro locale="en" />
    <ClearServices locale="en" /><DiagnosisSection locale="en" /><CasePreview /><Process /><Questions /><ContactPanel locale="en" />
  </div></Reveal>;
}

export function WorkPage() {
  const agreements = [
    ['What we are building', 'What the solution will do, which tools it needs to connect and what we leave for a later version.'],
    ['How we check it', 'Which real tasks we use to test the result and which actions need your team’s approval.'],
    ['What we need from you', 'Who shares materials, explains the work and helps try the solution before launch.'],
    ['Price and support', 'Development costs, the cost of running services and what support after launch covers.'],
  ];
  return <Reveal><div className={s.container}>
    <Intro eyebrow="RHEMA / Our approach" title="Tell us the problem. We handle the technology.">We learn how your team works and choose one task to make easier. Before development, you know what you will get, how much it costs and how we will check it.</Intro>
    <Process />
    <section className={s.principles} data-reveal><Label>What we agree before development</Label><h2>A project with<br /><em>clear boundaries.</em></h2><div className={s.scenarioGrid}>{agreements.map(([title, body]) => <article className={s.scenarioShell} key={title}><div className={s.scenarioCard}><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>
    <Pricing /><section className={s.inlineLink}><Action href="/en/cases" secondary>Explore completed projects</Action></section><ContactPanel locale="en" />
  </div></Reveal>;
}

export function CasesPage() {
  return <Reveal><div className={s.container}>
    <Intro eyebrow="RHEMA / Projects" title="See how it works for other businesses.">A workshop website, an online course, money tracking, reporting and customer support. Choose a task similar to yours to see what we built and how people use it.</Intro>
    <CaseDirectory locale="en" />
    <WebsiteCaseCollection locale="en" />
    <SeraphimTeaser locale="en" anchor /><RhemaOSFeature locale="en" anchor />
    <ProductCaseCollection locale="en" />
    <div className={s.projectList}>{projects.map((project) => ['jarvis', 'besty', 'sigmaup'].includes(project.id) ? null : <article key={project.name} id={project.id} className={s.project} data-reveal><div><Label>09 / {project.type}</Label><div className={s.projectName}>{project.name}<span aria-hidden="true">↗</span></div><div className={s.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><div><h2>{project.title}</h2><dl><dt>The task</dt><dd>{project.before}</dd><dt>What we built</dt><dd>{project.after}</dd></dl><p style={{ marginTop: 22 }}><Link className={s.textLink} href={`/en/services/${project.service}`}>{project.serviceLabel}<span aria-hidden="true">↗</span></Link></p></div></article>)}</div>
    <ContactPanel locale="en" />
  </div></Reveal>;
}

export function AboutPage() {
  const founders = [
    { firstName: 'Vladislav', lastName: 'Grizhak', photo: '/team/vladislav-grizhak.jpg' },
    { firstName: 'Timofey', lastName: 'Matyuzhov', photo: '/team/timofey-matyuzhov.jpg' },
  ];
  return <Reveal><div className={s.container}>
    <Intro eyebrow="RHEMA / Our team" title="We build tools for business. And use them ourselves.">Rhema AI is a small team building websites, apps and AI assistants for small and medium-sized businesses. We turn an everyday business task into a working tool.</Intro>
    <section className={s.founders} aria-label="Rhema AI founders" data-reveal><div className={s.foundersGrid}>{founders.map(founder => <article className={s.founderCard} key={founder.lastName}><span className={s.mono}>CO-FOUNDER / AI ARCHITECT</span><div className={s.founderPortrait}><Image src={founder.photo} alt={`${founder.firstName} ${founder.lastName} — Rhema AI co-founder`} width={640} height={640} sizes="(max-width: 600px) calc(100vw - 88px), (max-width: 1100px) 42vw, 520px" /></div><h2>{founder.firstName}<br />{founder.lastName}</h2></article>)}</div></section>
    <section className={s.aboutSplit} data-reveal><div><Label>Our approach</Label><h2>Know the work.<br /><em>Try it in practice.</em></h2></div><div><p>We built <Link href="/en/cases/jarvis" className={s.textLink}>Rhema OS (JARVIS)</Link> for our own team. It brings together customer records, call reviews, content drafts and AI assistants. We use that experience when working on your tasks.</p><h3>Start with your team</h3><p>We look at tasks that repeat, requests that get lost and information people have to copy by hand. Then we explain where AI would help and where a simpler solution would do.</p><h3>Fit the way you work</h3><p>We plan features around your work and the tools you already use. Access to the finished project, code handover and support are agreed in the project terms.</p><Action href="/en/cases" secondary>See our projects</Action></div></section>
    <ContactPanel locale="en" />
  </div></Reveal>;
}
