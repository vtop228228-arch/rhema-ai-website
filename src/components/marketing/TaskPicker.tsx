'use client';

import { useState } from 'react';
import Link from 'next/link';
import TaskFlow from './TaskFlow';
import { ymGoal } from '@/lib/analytics';
import { localizedPath, type SiteLocale } from '@/lib/seo';
import s from './Editorial.module.css';
import c from './TaskPicker.module.css';

const tasks = [
  { id: 'website', ru: 'Нужен сайт или приложение', en: 'I need a website or app', title: ['Дать клиенту удобный путь к заказу.', 'Give customers a clear path to an enquiry.'], text: ['Покажем вашу услугу, поможем выбрать и оставим понятный следующий шаг. Если нужны заказы, обучение или личный кабинет — спроектируем приложение под этот процесс.', 'Present your service, help people choose and make the next step clear. For orders, learning or a customer account, we design an app around that process.'], result: ['На выходе: работающий сайт или приложение и инструкция для команды.', 'You receive a working website or app and guidance for your team.'], service: 'business-platforms', project: 'garajw' },
  { id: 'leads', ru: 'Долго отвечаем клиентам', en: 'Customer replies take too long', title: ['Подготовить обращение для менеджера.', 'Prepare the enquiry for your team.'], text: ['Помощник отвечает по вашим материалам, уточняет запрос и собирает контакты. Сложные вопросы передаёт человеку вместе с перепиской.', 'An assistant uses your materials to answer questions, clarify the request and collect contact details. Complex questions go to a person with the conversation attached.'], result: ['На выходе: помощник с понятными правилами и передачей обращений команде.', 'You receive an assistant with clear rules and a handoff to your team.'], service: 'ai-agents', project: 'mayak' },
  { id: 'operations', ru: 'Всё переносим вручную', en: 'We copy everything by hand', title: ['Собрать повторяющуюся работу в один процесс.', 'Bring recurring work into one process.'], text: ['Разберём, где команда переписывает данные, собирает отчёты или теряет договорённости. Соединим нужные шаги и покажем, что требует внимания.', 'Find where your team copies data, collects reports or loses track of commitments. Connect the necessary steps and make outstanding work visible.'], result: ['На выходе: согласованный рабочий процесс и проверка на ваших примерах.', 'You receive an agreed workflow, tested on your examples.'], service: 'business-automation', project: 'church-analytics' },
  { id: 'content', ru: 'Контент отнимает много времени', en: 'Content takes too much time', title: ['От темы к материалу — в одном месте.', 'From a topic to content in one workspace.'], text: ['Соберём идеи, подготовку публикаций и планирование вокруг вашего бренда. Команда выбирает темы и проверяет материалы перед публикацией.', 'Bring ideas, content preparation and planning together around your brand. Your team chooses topics and reviews materials before publishing.'], result: ['На выходе: рабочее пространство для подготовки контента.', 'You receive a workspace for preparing content.'], service: 'business-platforms', project: 'radar' },
] as const;

export default function TaskPicker({ locale = 'ru', heading = 'h3' }: { locale?: SiteLocale; heading?: 'h2' | 'h3' }) {
  const [selected, setSelected] = useState(0);
  const en = locale === 'en';
  const i = en ? 1 : 0;
  const task = tasks[selected];
  const Heading = heading;
  return <div className={c.picker}>
    <div className={c.options} role="group" aria-label={en ? 'Choose your business task' : 'Выберите вашу задачу'}>
      {tasks.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} aria-controls="task-recommendation" onClick={() => { setSelected(index); ymGoal('task_selected', { task: item.id }); }}><span>0{index + 1}</span><strong>{en ? item.en : item.ru}</strong><span aria-hidden="true">↗</span></button>)}
    </div>
    <div className={c.recommendation} id="task-recommendation">
      <div className={c.copy} aria-live="polite" aria-atomic="true"><span className={s.kicker}>{en ? 'A possible starting point' : 'С чего можно начать'}</span><Heading>{task.title[i]}</Heading><p>{task.text[i]}</p><div className={c.result}>{task.result[i]}</div><Link href={localizedPath(`/services/${task.service}`, locale)} className={s.button}>{en ? 'Scope and cost' : 'Состав работ и стоимость'}<span aria-hidden="true">↗</span></Link><a className={c.talk} href="#contact">{en ? 'Discuss my situation' : 'Обсудить мою ситуацию'} →</a></div>
      <TaskFlow task={task.id} project={task.project} locale={locale} />
    </div>
  </div>;
}
