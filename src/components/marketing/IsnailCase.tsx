import Link from 'next/link';
import ContactPanel from './ContactPanel';
import Reveal from './Reveal';
import { PageStructuredData } from './StructuredData';
import s from './Editorial.module.css';
import c from './IsnailCase.module.css';

export const isnailTitle = {ru:'ISnail Academy — проект AI-куратора для онлайн-обучения',en:'ISnail Academy — an AI course assistant concept'};
export const isnailDescription = {ru:'Как AI-куратор «Вика» мог бы помогать ученицам курса маникюра: материалы, вопросы и разбор домашних заданий. Концепция проекта без рабочего запуска.',en:'A proposed workflow for Vika, an AI assistant for a nail training course: learning materials, questions and assignment feedback. The project did not reach a live launch.'};

export function IsnailTeaser({locale='ru'}:{locale?:'ru'|'en'}) {
 const en=locale==='en';
 return <article id="isnail" className={c.teaser}><div><span className={s.kicker}>ISnail Academy / {en?'Project concept':'Концепция проекта'}</span><h2>{en?'Course support built around the school’s knowledge.':'Помощь ученицам на основе знаний школы.'}</h2></div><div><p>{en?'A proposed AI tutor for questions and initial homework feedback, supporting a move from in-person teaching to an online course. The project did not reach a live launch.':'Проект AI-куратора для вопросов по курсу и первичного разбора домашних заданий при переходе школы в онлайн. До рабочего запуска проект не дошёл.'}</p><Link className={s.textLink} href={`${en?'/en':''}/cases/isnail`}>{en?'Explore the task and proposed approach':'Задача и сценарий решения'} ↗</Link></div></article>;
}

export default function IsnailCase({locale='ru'}:{locale?:'ru'|'en'}) {
 const en=locale==='en';const prefix=en?'/en':'';
 const steps=en?[
  ['Learning materials','Lessons and explanations are organised by topic in a shared knowledge base.'],
  ['A student’s question','The student asks about the lesson or submits an assignment.'],
  ['Vika’s initial feedback','The assistant looks for relevant material and follows the school’s review criteria.'],
  ['A teacher when needed','Unclear questions and work requiring expert judgement go to a person.'],
 ]:[
  ['Материалы школы','Уроки и объяснения собраны по темам в общей базе знаний.'],
  ['Вопрос ученицы','Ученица уточняет материал урока или отправляет домашнее задание.'],
  ['Первичный разбор «Вики»','Помощник находит нужный материал и следует критериям проверки школы.'],
  ['Преподаватель при необходимости','Неясные вопросы и работы, требующие экспертной оценки, передаются человеку.'],
 ];
 const scenarios=en?[
  ['Understand the lesson','Help the student find an explanation in the course material and return to the relevant topic. If the source does not contain an answer, say so and pass the question to a teacher.'],
  ['Review an assignment','Compare a submitted answer with agreed criteria and suggest what to revisit. Assessing practical nail work from photographs would need separate testing with teachers.'],
  ['Continue learning','Link feedback to the topic being studied so the student knows which material to review and what to clarify with a teacher.'],
 ]:[
  ['Разобраться в уроке','Помочь найти объяснение в материалах курса и вернуться к нужной теме. Если ответа в источниках нет — сообщить об этом и передать вопрос преподавателю.'],
  ['Получить разбор задания','Сопоставить ответ с согласованными критериями и подсказать, что стоит повторить. Оценку практической работы с ногтями по фотографии нужно отдельно проверять вместе с преподавателями.'],
  ['Продолжить обучение','Связать обратную связь с темой урока: какой материал пересмотреть, что доработать и какой вопрос уточнить у преподавателя.'],
 ];
 return <Reveal><PageStructuredData title={isnailTitle[locale]} description={isnailDescription[locale]} path="/cases/isnail" locale={locale} parent={{name:en?'Projects':'Проекты',path:'/cases'}}/><div className={s.container}>
  <nav className={c.breadcrumb} aria-label={en?'Breadcrumb':'Хлебные крошки'}><Link href={`${prefix}/cases`}>{en?'Projects':'Проекты'}</Link><span>/ ISnail Academy</span></nav>
  <header className={c.hero}><span className={s.kicker}>{en?'Education / AI course assistant':'Обучение / AI-куратор'}</span><h1>{en?<>Knowledge stays with the school.<br/><em>Help is closer to the student.</em></>:<>Знания остаются у школы.<br/><em>Помощь — рядом с ученицей.</em></>}</h1><p>{en?'ISnail Academy: a proposed assistant called Vika, designed around course materials to help students with questions and initial assignment feedback.':'ISnail Academy: проект помощника «Вика», который опирается на материалы курса, помогает с вопросами учениц и первичным разбором заданий.'}</p><div className={c.status}><strong>{en?'Status: project concept':'Статус: концепция проекта'}</strong><span>{en?'No live launch. No measured impact on workload or learning outcomes.':'До рабочего запуска не дошёл. Влияние на нагрузку команды и результаты обучения не измерялось.'}</span></div></header>
  <section className={c.story}><div><span className={s.kicker}>{en?'The school’s task':'Задача школы'}</span><h2>{en?'Move teaching online without losing support.':'Перенести обучение в онлайн и сохранить поддержку.'}</h2></div><div><p>{en?'The brief described a nail training business with years of in-person teaching experience and a collection of digitised lessons. The owner wanted to offer online learning and make use of that accumulated knowledge.':'По вводным проекта, у школы маникюра был многолетний опыт офлайн-обучения и накопленные материалы, переведённые в цифровой формат. Владелица хотела развивать онлайн-обучение и использовать уже собранные знания.'}</p><p>{en?'The aim was to support students without building a large tutor team for recurring questions. The proposed solution was an AI assistant using a shared course knowledge base.':'Задача — сопровождать учениц без расширения команды кураторов под каждый повторяющийся вопрос. Для этого рассматривался AI-помощник с общей базой материалов курса.'}</p></div></section>
  <section className={c.flowSection} aria-labelledby="isnail-flow"><span className={s.kicker}>{en?'Proposed workflow / diagram':'Предлагаемый сценарий / схема'}</span><h2 id="isnail-flow">{en?'From a lesson to a useful next step.':'От материала урока к понятному следующему шагу.'}</h2><ol className={c.flow}>{steps.map(([title,text],i)=><li key={title}><span className={s.kicker}>0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol><p className={c.caption}>{en?'A diagram of the proposed approach, not a screenshot of a launched product.':'Схема предлагаемого решения, а не экран запущенного продукта.'}</p></section>
  <section className={c.scenarios}><div className={s.sectionHeading}><div><span className={s.kicker}>{en?'Vika’s proposed role':'Что предполагалось поручить «Вике»'}</span><h2>{en?'Support tied to the course.':'Поддержка в контексте курса.'}</h2></div></div>{scenarios.map(([title,text],i)=><article key={title}><span className={s.kicker}>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</section>
  <section className={c.story}><div><span className={s.kicker}>{en?'Expected benefit':'Ожидаемая польза'}</span><h2>{en?'More attention for questions that need a teacher.':'Больше внимания вопросам, где нужен преподаватель.'}</h2></div><div><p>{en?'The intended benefit was to delegate recurring explanations and initial checks to the assistant. Students would have a route to the relevant lesson, while teachers could focus on difficult questions and expert feedback.':'Идея — передать помощнику повторяющиеся объяснения и первичную проверку. Ученицы могли бы находить нужный материал через вопрос, а преподаватели — сосредоточиться на сложных ситуациях и экспертной обратной связи.'}</p><p>{en?'These are goals for the proposed solution. There is no launch data confirming faster replies, lower staffing costs or improved assignment quality.':'Это цели предлагаемого решения. Данных запуска, подтверждающих ускорение ответов, экономию на кураторах или повышение качества проверки, нет.'}</p></div></section>
  <section className={c.next}><span className={s.kicker}>{en?'How we would check it':'Как проверить такой подход'}</span><h2>{en?'Start with one learning module.':'Начать с одного учебного модуля.'}</h2><p>{en?'Choose lessons, student questions and assignments with teacher-approved answers. Test whether the assistant follows the material, spots when it does not know and refers difficult cases to a person. Only then decide which parts of the course it can support.':'Выбрать уроки, вопросы учениц и задания с проверенными преподавателем ответами. Проверить, следует ли помощник материалам, замечает ли нехватку данных и передаёт ли сложные вопросы человеку. По результатам решить, какие задачи курса ему можно доверить.'}</p><Link className={s.textLink} href={`${prefix}/services/ai-agents`}>{en?'AI assistants for your task':'AI-помощники под вашу задачу'} ↗</Link></section>
  <ContactPanel locale={locale} projectName={en?'ISnail Academy — AI course assistant concept':'ISnail Academy — проект AI-куратора'}/>
 </div></Reveal>;
}
