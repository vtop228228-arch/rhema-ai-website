export type DiagnosisLocale = 'ru' | 'en';
export const diagnosisQuestions = {
 ru: ['Чем занимается ваш бизнес и кто ваши клиенты?', 'Какую задачу хотите упростить в первую очередь?', 'Какой объём работы: сколько обращений или часов уходит на эту задачу?', 'Как решаете задачу сейчас и какими программами пользуетесь?'],
 en: ['What does your business do and who are your customers?', 'Which task would you like to simplify first?', 'How much work is involved: how many enquiries or hours does this task take?', 'How do you handle it now and which tools do you use?'],
};

// Transparent, answer-specific fallback. It never invents losses or presents itself as AI output.
export function diagnosticSummary(answers: string[], locale: DiagnosisLocale = 'ru') {
 const en=locale==='en';const [business='',task='',volume='',tools='']=answers.map(a=>a.trim().slice(0,500));
 const text=task.toLowerCase();
 const direction=/сайт|website|каталог|лендинг/.test(text)
  ? (en?'A website with a clear offer and enquiry form.':'Сайт с понятным предложением и формой заявки.')
  : /контент|content|пост|сценар|reels/.test(text)
  ? (en?'A workflow for topics, drafts and review before publication.':'Процесс подготовки тем и черновиков с проверкой перед публикацией.')
  : /отч[её]т|report|финанс|finance|таблиц|spreadsheet/.test(text)
  ? (en?'Collect data in one place and prepare a report for review.':'Сбор данных в одном месте и подготовка отчёта для проверки.')
  : /заяв|клиент|customer|enquir|пись|email|звон|call/.test(text)
  ? (en?'A helper for enquiries, conversation summaries and the next action.':'Помощник для обращений, кратких итогов разговора и следующего действия.')
  : (en?'Start by mapping this task into inputs, actions and a checkable result.':'Начать с описания задачи: входные данные, действия и проверяемый результат.');
 return en ? `YOUR INPUT\n• Business: ${business || 'To clarify on the call.'}\n• First task: ${task || 'To clarify on the call.'}\n• Workload: ${volume || 'Not specified.'}\n• Current process: ${tools || 'Not specified.'}\n\nA DIRECTION TO EXPLORE\n→ ${direction}\n→ Test one scenario using your examples before extending it.\n\nWHAT TO CLARIFY ON THE CALL\n• Available materials and access to your tools.\n• Which actions need employee approval.\n• The first version, running costs and how to measure improvement.\n\nThis is a guided summary of your answers, not an AI analysis. Savings and feasibility have not been calculated.`
 : `ВАШИ ВВОДНЫЕ\n• Бизнес: ${business || 'Уточним на созвоне.'}\n• Первая задача: ${task || 'Уточним на созвоне.'}\n• Объём работы: ${volume || 'Не указан.'}\n• Текущий процесс: ${tools || 'Не указан.'}\n\nНАПРАВЛЕНИЕ ДЛЯ ОБСУЖДЕНИЯ\n→ ${direction}\n→ Проверить один сценарий на ваших примерах, затем расширять решение.\n\nЧТО УТОЧНИМ НА СОЗВОНЕ\n• Какие материалы есть и можно ли подключить ваши программы.\n• Какие действия должен подтверждать сотрудник.\n• Состав первой версии, расходы на сервисы и способ оценки результата.\n\nЭто сводка по вашим ответам, без AI-анализа. Экономия и возможность внедрения ещё не рассчитаны.`;
}
