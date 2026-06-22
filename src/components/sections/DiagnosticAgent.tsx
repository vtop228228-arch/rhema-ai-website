'use client';

import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { ymGoal } from '@/lib/analytics';

type ChatState = 'idle' | 'active' | 'thinking' | 'map_shown' | 'done';
type Msg = { role: 'user' | 'ai'; text: string };
type ApiMsg = { role: 'user' | 'assistant'; content: string };
type AgentTurn = { reply: string; options: string[]; stage: 'ask' | 'map' };

const bebas = 'var(--font-bebas), Bebas Neue, sans-serif';

const leadSchema = z.object({
  name: z.string().min(2, 'Укажите имя (минимум 2 символа)').max(100),
  contact: z.string().min(3, 'Укажите контакт').max(255),
});

// Скрытый стартовый ход — модель сама генерирует приветствие и первый вопрос (не хардкод).
const OPENER: ApiMsg = {
  role: 'user',
  content: 'Поздоровайся коротко и задай первый вопрос про мой бизнес, чтобы начать диагностику.',
};

export default function DiagnosticAgent() {
  const sessionId = useRef<string>(typeof crypto !== 'undefined' ? crypto.randomUUID() : String(Date.now()));
  const chatRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const historyRef = useRef<ApiMsg[]>([]);

  const [chatState, setChatState] = useState<ChatState>('idle');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [fallback, setFallback] = useState(false);

  const [mapText, setMapText] = useState('');
  const [sphere, setSphere] = useState('');

  const [lead, setLead] = useState({ name: '', contact: '' });
  const [leadErr, setLeadErr] = useState('');

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, chatState, mapText, options]);

  function addMsg(role: 'user' | 'ai', text: string) {
    setMsgs(prev => [...prev, { role, text }]);
  }

  // Один запрос к агенту с таймаутом. Возвращает ход или null (осечка).
  async function fetchTurn(history: ApiMsg[]): Promise<AgentTurn | null> {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 30000);
    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: history.slice(-24) }),
        signal: ctrl.signal,
      });
      if (!res.ok) return null;
      const json = await res.json() as { data?: AgentTurn };
      return json.data?.reply ? json.data : null;
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  // Один ход к агенту: до 3 попыток (NIM изредка отдаёт осечку), и только потом фолбэк.
  async function callAgent(history: ApiMsg[]) {
    setOptions([]);
    setChatState('thinking');

    let turn: AgentTurn | null = null;
    for (let attempt = 0; attempt < 3 && !turn; attempt++) {
      if (attempt > 0) await new Promise(r => setTimeout(r, 700));
      turn = await fetchTurn(history);
    }
    if (!turn) { goFallback(); return; }

    historyRef.current = [...history, { role: 'assistant', content: turn.reply }];

    if (turn.stage === 'map') {
      ymGoal('agent_map');
      setMapText(turn.reply);
      setChatState('map_shown');
    } else {
      addMsg('ai', turn.reply);
      setOptions(turn.options);
      setChatState('active');
    }
  }

  function startChat() {
    if (chatState !== 'idle') return;
    ymGoal('agent_start');
    historyRef.current = [OPENER];
    callAgent(historyRef.current);
  }

  // Ответ пользователя — по клику на вариант ИЛИ вводом своего текста.
  function sendAnswer(text: string) {
    const a = text.trim();
    if (!a || chatState === 'thinking') return;

    if (!sphere) { setSphere(a.slice(0, 60)); ymGoal('agent_engaged'); }
    addMsg('user', a);
    setInputVal('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    const next = [...historyRef.current, { role: 'user' as const, content: a }];
    historyRef.current = next;
    callAgent(next);
  }

  function goFallback() {
    setFallback(true);
    setMapText('');
    setOptions([]);
    setChatState('map_shown');
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAnswer(inputVal); }
  }

  async function submitLead() {
    const parsed = leadSchema.safeParse(lead);
    if (!parsed.success) { setLeadErr(parsed.error.issues[0]?.message ?? 'Проверьте данные'); return; }
    setLeadErr('');
    const transcript = msgs.filter(m => m.role === 'user').map(m => m.text).join(' | ');
    await fetch('/api/diagnose/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: sessionId.current, ...parsed.data, sphere, pain: transcript, mapText }),
    });
    ymGoal('agent_lead');
    setChatState('done');
  }

  const showInput = chatState === 'active' || chatState === 'thinking';

  return (
    <div
      id="diagnose"
      className="chat-panel"
      style={{ flex: '0 0 460px', background: 'var(--card)', display: 'flex', flexDirection: 'column', minHeight: 640 }}
    >
      {/* Header */}
      <div style={{ padding: '18px 24px', borderBottom: '1px solid #161616', display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
        <div style={{ width: 6, height: 6, background: 'var(--accent)' }} />
        <span style={{ fontFamily: bebas, fontSize: 14, letterSpacing: 2, color: 'var(--accent)' }}>ДИАГНОСТИКА БИЗНЕСА</span>
      </div>

      {/* IDLE */}
      {chatState === 'idle' && (
        <div style={{ flex: 1, padding: '30px 24px', display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center' }}>
          <h2 style={{ fontFamily: bebas, fontSize: 30, letterSpacing: 1, color: 'var(--ink)', lineHeight: 1.05 }}>
            Узнайте за 2 минуты,<br />где теряете деньги
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Живой диалог, а не анкета', 'Персональная карта потерь', 'AI-решения для вашей ниши', 'Ориентир эффекта для вашей сферы'].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
                <div style={{ width: 4, height: 4, background: 'var(--accent)', flexShrink: 0 }} />
                <span style={{ fontSize: 15, color: 'var(--ink2)' }}>{t}</span>
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={startChat}
              style={{ background: 'var(--accent)', color: '#ffffff', border: 'none', padding: '14px 24px', fontFamily: bebas, fontSize: 22, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8, animation: 'ctaGlow 3s ease-in-out infinite', cursor: 'pointer' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#ffffff" /></svg>
              НАЧАТЬ ДИАГНОСТИКУ
            </button>
            <p style={{ fontSize: 13, color: '#888', marginTop: 10 }}>Бесплатно · без регистрации</p>
          </div>
        </div>
      )}

      {/* CHAT */}
      {chatState !== 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>

            {/* Message bubbles */}
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', animation: 'fadeUp 0.2s ease' }}>
                <div style={{ maxWidth: '87%', padding: '9px 13px', background: m.role === 'user' ? 'var(--accent)' : 'rgba(24,24,24,0.88)' }}>
                  <span style={{ fontSize: 14, lineHeight: 1.65, color: m.role === 'user' ? '#090909' : 'var(--ink2)', whiteSpace: 'pre-wrap', display: 'block' }}>{m.text}</span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {chatState === 'thinking' && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'fadeUp 0.2s ease' }}>
                <div style={{ padding: '11px 14px', background: 'rgba(24,24,24,0.88)', display: 'flex', gap: 5, alignItems: 'center' }}>
                  {[0, 0.18, 0.36].map((d, i) => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', opacity: 0.5, animation: `blink 1s ease-in-out infinite ${d}s` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Quick-reply chips для текущего вопроса */}
            {chatState === 'active' && options.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, animation: 'fadeUp 0.2s ease', paddingLeft: 2 }}>
                {options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => sendAnswer(opt)}
                    style={{
                      padding: '7px 12px',
                      border: '1px solid #242424',
                      background: 'rgba(14,14,14,0.9)',
                      color: '#aaa',
                      fontSize: 12,
                      lineHeight: 1.45,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'border-color 0.15s, color 0.15s, background 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'rgba(255,106,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#242424'; e.currentTarget.style.color = '#aaa'; e.currentTarget.style.background = 'rgba(14,14,14,0.9)'; }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Loss map card */}
            {(chatState === 'map_shown' || chatState === 'done') && !fallback && (
              <div style={{ background: 'rgba(14,14,14,0.88)', border: '1px solid #1A1A1A', padding: 16, display: 'flex', flexDirection: 'column', gap: 13, animation: 'fadeUp 0.35s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ width: 2, height: 22, background: 'var(--accent)', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: bebas, fontSize: 18, color: 'var(--accent)', letterSpacing: 1, lineHeight: 1 }}>КАРТА ПОТЕРЬ</div>
                    <div style={{ fontSize: 9, color: '#999', textTransform: 'uppercase', letterSpacing: 2, marginTop: 2 }}>{sphere || 'Ваш бизнес'}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                  {mapText || 'Анализирую…'}
                </div>
                <div style={{ fontSize: 10, color: '#3a3a3a', fontStyle: 'italic', lineHeight: 1.4, borderTop: '1px solid #1A1A1A', paddingTop: 9 }}>
                  Предварительная оценка на основе ваших ответов. Точные цифры — на бесплатной диагностике.
                </div>
              </div>
            )}

            {/* Lead form */}
            {chatState === 'map_shown' && (
              <div style={{ background: 'rgba(14,14,14,0.88)', border: '1px solid #1A1A1A', padding: 16, display: 'flex', flexDirection: 'column', gap: 9, animation: 'fadeUp 0.35s ease 0.15s both' }}>
                <div style={{ fontFamily: bebas, fontSize: 15, letterSpacing: 1, color: 'var(--ink)', lineHeight: 1.2 }}>
                  ПОЛУЧИТЬ ПОЛНУЮ<br />ДИАГНОСТИКУ БЕСПЛАТНО
                </div>
                <p style={{ fontSize: 11, color: '#888', lineHeight: 1.5 }}>
                  {fallback ? 'Агент перегружен — оставьте контакт, пришлём диагностику вручную в течение 2 часов.' : 'Составим точный план автоматизации под ваш бизнес.'}
                </p>
                <input
                  className="input-base" placeholder="Ваше имя" value={lead.name}
                  onChange={e => setLead(p => ({ ...p, name: e.target.value }))}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,106,0,0.55)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#1E1E1E'; }}
                  style={{ borderColor: '#1E1E1E' }}
                />
                <input
                  className="input-base" placeholder="Telegram (@username) или телефон" value={lead.contact}
                  onChange={e => setLead(p => ({ ...p, contact: e.target.value }))}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,106,0,0.55)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#1E1E1E'; }}
                  style={{ borderColor: '#1E1E1E' }}
                />
                {leadErr && (
                  <div style={{ fontSize: 11, color: 'var(--red)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 3, height: 3, background: 'var(--red)', flexShrink: 0 }} />{leadErr}
                  </div>
                )}
                <button onClick={submitLead} style={{ background: 'var(--accent)', color: '#ffffff', border: 'none', padding: '11px 16px', fontFamily: bebas, fontSize: 17, letterSpacing: 1, width: '100%', cursor: 'pointer' }}>
                  ПОЛУЧИТЬ ДИАГНОСТИКУ →
                </button>
              </div>
            )}

            {/* Done */}
            {chatState === 'done' && (
              <div style={{ background: 'rgba(255,106,0,0.05)', border: '1px solid rgba(255,106,0,0.13)', padding: '26px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, textAlign: 'center', animation: 'fadeUp 0.35s ease' }}>
                <div style={{ width: 36, height: 36, background: 'rgba(255,106,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="#FF6A00" strokeWidth="2.5" strokeLinecap="square" /></svg>
                </div>
                <div style={{ fontFamily: bebas, fontSize: 22, letterSpacing: 1, color: 'var(--accent)' }}>ЗАЯВКА ПРИНЯТА</div>
                <div style={{ fontSize: 13, color: '#999', lineHeight: 1.65, maxWidth: 240 }}>Напишем в Telegram в течение 2 часов. Спасибо!</div>
              </div>
            )}

          </div>

          {/* Input — всё время живого диалога */}
          {showInput && (
            <div style={{ borderTop: '1px solid #161616', padding: '11px 16px', display: 'flex', gap: 6, background: 'var(--card)', flexShrink: 0, alignItems: 'flex-end' }}>
              <textarea
                ref={textareaRef}
                placeholder="Напишите ответ…" value={inputVal}
                rows={1}
                onChange={e => {
                  setInputVal(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
                onKeyDown={handleKey}
                disabled={chatState === 'thinking'}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,106,0,0.55)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = '#1C1C1C'; }}
                style={{ flex: 1, background: 'rgba(19,19,19,0.88)', border: '1px solid #1C1C1C', color: 'var(--ink)', padding: '8px 12px', fontSize: 16, fontFamily: 'var(--font-inter), Inter, sans-serif', outline: 'none', transition: 'border-color 0.18s', resize: 'none', overflow: 'hidden', lineHeight: '1.55', minHeight: 36, maxHeight: 120, opacity: chatState === 'thinking' ? 0.5 : 1 }}
              />
              <button onClick={() => sendAnswer(inputVal)} disabled={chatState === 'thinking'} style={{ background: 'var(--accent)', border: 'none', padding: '8px 13px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: chatState === 'thinking' ? 0.5 : 1, flexShrink: 0, height: 36, cursor: chatState === 'thinking' ? 'not-allowed' : 'pointer' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="square" /></svg>
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .chat-panel { flex: 1 1 auto !important; min-height: 560px; }
        }
      `}</style>
    </div>
  );
}
