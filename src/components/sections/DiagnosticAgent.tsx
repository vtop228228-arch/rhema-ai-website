'use client';

import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';

type ChatState = 'idle' | 'active' | 'map_loading' | 'map_shown' | 'done';
type Msg = { role: 'user' | 'ai'; text: string };

const leadSchema = z.object({
  name: z.string().min(2, 'Укажите имя (минимум 2 символа)').max(100),
  contact: z.string().min(3, 'Укажите контакт').max(255),
});

// Стримит ответ роута в onChunk. false → агент недоступен (нужен fallback).
async function streamPost(url: string, body: unknown, onChunk: (t: string) => void): Promise<boolean> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok || !res.body) return false;
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value, { stream: true }));
  }
  return true;
}

const GREETING = 'Здравствуйте! Расскажите, чем занимается ваш бизнес и что сейчас больше всего отнимает время или деньги?';

export default function DiagnosticAgent() {
  const sessionId = useRef<string>(typeof crypto !== 'undefined' ? crypto.randomUUID() : String(Date.now()));
  const chatRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [chatState, setChatState] = useState<ChatState>('idle');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [turn, setTurn] = useState(0); // 0 — описание бизнеса, 1 — ответы на уточнения
  const [typing, setTyping] = useState(false);
  const [stream, setStream] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [fallback, setFallback] = useState(false);

  // Данные диагностики
  const [sphere, setSphere] = useState('');
  const [pain, setPain] = useState('');
  const [questionsText, setQuestionsText] = useState('');
  const [mapText, setMapText] = useState('');
  const [mapDone, setMapDone] = useState(false);

  // Лид
  const [lead, setLead] = useState({ name: '', contact: '' });
  const [leadErr, setLeadErr] = useState('');

  // Авто-скролл ленты
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, stream, chatState, mapText]);

  function addMsg(role: 'user' | 'ai', text: string) {
    setMsgs(prev => [...prev, { role, text }]);
  }

  // Стрим текста в живой пузырь, затем коллбэк с финальным текстом.
  async function streamBubble(url: string, body: unknown): Promise<{ ok: boolean; text: string }> {
    setTyping(false);
    setIsStreaming(true);
    setStream('');
    let acc = '';
    const ok = await streamPost(url, body, t => {
      acc += t;
      setStream(acc);
    });
    setIsStreaming(false);
    setStream('');
    return { ok, text: acc };
  }

  function startChat() {
    if (chatState !== 'idle') return;
    setChatState('active');
    setMsgs([{ role: 'ai', text: GREETING }]);
    setTurn(0);
    setInputDisabled(false);
  }

  async function handleSend() {
    const text = inputVal.trim();
    if (!text || chatState !== 'active' || inputDisabled) return;
    addMsg('user', text);
    setInputVal('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setInputDisabled(true);
    setTyping(true);

    if (turn === 0) {
      // Первый ответ = описание бизнеса (сфера + боль)
      const sph = text.slice(0, 200);
      setSphere(sph);
      setPain(text);
      const { ok, text: q } = await streamBubble('/api/diagnose', { mode: 'questions', sphere: sph, pain: text });
      if (!ok) { goFallback(); return; }
      setQuestionsText(q);
      addMsg('ai', q);
      setTurn(1);
      setTyping(false);
      setInputDisabled(false);
    } else {
      // Второй ответ = ответы на уточняющие вопросы → карта потерь
      setTyping(false);
      setChatState('map_loading');
      setMapText('');
      setMapDone(false);
      const qa = [{ question: questionsText.slice(0, 500), answer: text.slice(0, 1000) }];
      let firstChunk = true;
      let acc = '';
      const ok = await streamPost('/api/diagnose', { mode: 'map', sphere, pain, qa }, t => {
        acc += t;
        if (firstChunk) { firstChunk = false; setChatState('map_shown'); }
        setMapText(acc);
      });
      if (!ok) { goFallback(); return; }
      setChatState('map_shown');
      setMapDone(true);
    }
  }

  function goFallback() {
    setFallback(true);
    setIsStreaming(false);
    setTyping(false);
    setChatState('map_shown');
    setMapDone(true);
    setMapText('');
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  async function submitLead() {
    const parsed = leadSchema.safeParse(lead);
    if (!parsed.success) {
      setLeadErr(parsed.error.issues[0]?.message ?? 'Проверьте данные');
      return;
    }
    setLeadErr('');
    await fetch('/api/diagnose/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: sessionId.current, ...parsed.data, sphere, pain, mapText }),
    });
    setChatState('done');
  }

  const focusOrange = (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = 'rgba(255,106,0,0.55)'; };
  const blurInput = (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = '#1E1E1E'; };

  return (
    <div
      id="diagnose"
      className="chat-panel"
      style={{ flex: '0 0 460px', background: 'var(--card)', display: 'flex', flexDirection: 'column', minHeight: 640 }}
    >
      {/* Header */}
      <div style={{ padding: '18px 24px', borderBottom: '1px solid #161616', display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
        <div style={{ width: 6, height: 6, background: 'var(--accent)' }} />
        <span style={{ fontFamily: 'var(--font-bebas), Bebas Neue, sans-serif', fontSize: 14, letterSpacing: 2, color: 'var(--accent)' }}>ДИАГНОСТИКА БИЗНЕСА</span>
      </div>

      {/* IDLE */}
      {chatState === 'idle' && (
        <div style={{ flex: 1, padding: '30px 24px', display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas), Bebas Neue, sans-serif', fontSize: 30, letterSpacing: 1, color: 'var(--ink)', lineHeight: 1.05 }}>
            Узнайте за 2 минуты,<br />где теряете деньги
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['2–3 вопроса, ~2 минуты', 'Персональная карта потерь в ₽', 'AI-решения для вашей ниши', 'Ориентир ROI для вашей сферы'].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
                <div style={{ width: 4, height: 4, background: 'var(--accent)', flexShrink: 0 }} />
                <span style={{ fontSize: 15, color: 'var(--ink2)' }}>{t}</span>
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={startChat}
              style={{ background: 'var(--accent)', color: '#ffffff', border: 'none', padding: '14px 24px', fontFamily: 'var(--font-bebas), Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8, animation: 'ctaGlow 3s ease-in-out infinite' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#ffffff" /></svg>
              НАЧАТЬ ДИАГНОСТИКУ
            </button>
            <p style={{ fontSize: 13, color: '#888', marginTop: 10 }}>Бесплатно · без регистрации</p>
          </div>
        </div>
      )}

      {/* CHAT OPEN */}
      {chatState !== 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 9, minHeight: 0 }}>

            {/* Message list */}
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', animation: 'fadeUp 0.2s ease' }}>
                <div style={{ maxWidth: '87%', padding: '9px 13px', background: m.role === 'user' ? 'var(--accent)' : 'rgba(24,24,24,0.88)' }}>
                  <span style={{ fontSize: 14, lineHeight: 1.65, color: m.role === 'user' ? '#090909' : 'var(--ink2)', whiteSpace: 'pre-wrap', display: 'block' }}>{m.text}</span>
                </div>
              </div>
            ))}

            {/* Typing dots */}
            {typing && !isStreaming && (
              <div style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '10px 13px', background: 'rgba(24,24,24,0.88)', width: 'fit-content' }}>
                {[0, 0.18, 0.36].map((d, i) => (
                  <div key={i} style={{ width: 5, height: 5, background: '#333', borderRadius: '50%', animation: `blink 1.1s ease-in-out infinite ${d}s` }} />
                ))}
              </div>
            )}

            {/* Streaming bubble */}
            {isStreaming && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'fadeUp 0.18s ease' }}>
                <div style={{ maxWidth: '87%', padding: '9px 13px', background: 'rgba(24,24,24,0.88)' }}>
                  <span style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink2)', whiteSpace: 'pre-wrap' }}>{stream}</span>
                  <span style={{ display: 'inline-block', width: 1.5, height: 13, background: 'var(--accent)', marginLeft: 1, animation: 'blink 0.65s ease-in-out infinite', verticalAlign: 'text-bottom' }} />
                </div>
              </div>
            )}

            {/* Map loading */}
            {chatState === 'map_loading' && (
              <div style={{ padding: 14, background: 'rgba(14,14,14,0.88)', border: '1px solid #1A1A1A', display: 'flex', flexDirection: 'column', gap: 11, animation: 'fadeUp 0.22s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 11, height: 11, border: '1.5px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: '#999' }}>Генерирую карту потерь...</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[['Анализ бизнеса', '88%', 0], ['Расчёт потерь', '58%', 0.35], ['Рекомендации', '34%', 0.7]].map(([label, w, delay], i) => (
                    <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
                      <span style={{ fontSize: 10, color: '#505050', width: 76, flexShrink: 0 }}>{label}</span>
                      <div style={{ flex: 1, height: 2, background: '#161616', overflow: 'hidden', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: w as string, background: 'var(--accent)', animation: `shimmer 1.4s ease-in-out infinite ${delay}s` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loss map card */}
            {(chatState === 'map_shown' || chatState === 'done') && !fallback && (
              <div style={{ background: 'rgba(14,14,14,0.88)', border: '1px solid #1A1A1A', padding: 16, display: 'flex', flexDirection: 'column', gap: 13, animation: 'fadeUp 0.35s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ width: 2, height: 22, background: 'var(--accent)', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-bebas), Bebas Neue, sans-serif', fontSize: 18, color: 'var(--accent)', letterSpacing: 1, lineHeight: 1 }}>КАРТА ПОТЕРЬ</div>
                    <div style={{ fontSize: 9, color: '#999', textTransform: 'uppercase', letterSpacing: 2, marginTop: 2 }}>{sphere || 'Ваш бизнес'}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                  {mapText || 'Анализирую…'}
                  {!mapDone && <span style={{ display: 'inline-block', width: 1.5, height: 13, background: 'var(--accent)', marginLeft: 1, animation: 'blink 0.65s ease-in-out infinite', verticalAlign: 'text-bottom' }} />}
                </div>
                <div style={{ fontSize: 10, color: '#3a3a3a', fontStyle: 'italic', lineHeight: 1.4, borderTop: '1px solid #1A1A1A', paddingTop: 9 }}>
                  Это предварительная оценка на основе ваших ответов. Точные цифры покажет бесплатная диагностика.
                </div>
              </div>
            )}

            {/* Lead form */}
            {chatState === 'map_shown' && mapDone && (
              <div style={{ background: 'rgba(14,14,14,0.88)', border: '1px solid #1A1A1A', padding: 16, display: 'flex', flexDirection: 'column', gap: 9, animation: 'fadeUp 0.35s ease 0.15s both' }}>
                <div style={{ fontFamily: 'var(--font-bebas), Bebas Neue, sans-serif', fontSize: 15, letterSpacing: 1, color: 'var(--ink)', lineHeight: 1.2 }}>
                  ПОЛУЧИТЬ ПОЛНУЮ<br />ДИАГНОСТИКУ БЕСПЛАТНО
                </div>
                <p style={{ fontSize: 11, color: '#888', lineHeight: 1.5 }}>
                  {fallback ? 'Агент перегружен — оставьте контакт, пришлём диагностику вручную в течение дня.' : 'Составим точный план автоматизации под ваш бизнес.'}
                </p>
                <input
                  className="input-base" placeholder="Ваше имя" value={lead.name}
                  onChange={e => setLead(p => ({ ...p, name: e.target.value }))}
                  onFocus={focusOrange} onBlur={blurInput}
                  style={{ borderColor: '#1E1E1E' }}
                />
                <input
                  className="input-base" placeholder="Telegram (@username) или телефон" value={lead.contact}
                  onChange={e => setLead(p => ({ ...p, contact: e.target.value }))}
                  onFocus={focusOrange} onBlur={blurInput}
                  style={{ borderColor: '#1E1E1E' }}
                />
                {leadErr && (
                  <div style={{ fontSize: 11, color: 'var(--red)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 3, height: 3, background: 'var(--red)', flexShrink: 0 }} />{leadErr}
                  </div>
                )}
                <button onClick={submitLead} style={{ background: 'var(--accent)', color: '#ffffff', border: 'none', padding: '11px 16px', fontFamily: 'var(--font-bebas), Bebas Neue, sans-serif', fontSize: 17, letterSpacing: 1, width: '100%' }}>
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
                <div style={{ fontFamily: 'var(--font-bebas), Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1, color: 'var(--accent)' }}>ЗАЯВКА ПРИНЯТА</div>
                <div style={{ fontSize: 13, color: '#999', lineHeight: 1.65, maxWidth: 240 }}>Напишем в Telegram в течение рабочего дня. Спасибо!</div>
              </div>
            )}
          </div>

          {/* Input bar */}
          {chatState === 'active' && (
            <div style={{ borderTop: '1px solid #161616', padding: '11px 16px', display: 'flex', gap: 6, background: 'var(--card)', flexShrink: 0 }}>
              <textarea
                ref={textareaRef}
                placeholder="Введите ответ..." value={inputVal}
                rows={1}
                onChange={e => {
                  setInputVal(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
                onKeyDown={handleKey}
                disabled={inputDisabled}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,106,0,0.55)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = '#1C1C1C'; }}
                style={{ flex: 1, background: 'rgba(19,19,19,0.88)', border: '1px solid #1C1C1C', color: 'var(--ink)', padding: '8px 12px', fontSize: 16, fontFamily: 'var(--font-inter), Inter, sans-serif', outline: 'none', transition: 'border-color 0.18s', resize: 'none', overflow: 'hidden', lineHeight: '1.55', minHeight: 36, maxHeight: 120 }}
              />
              <button onClick={handleSend} disabled={inputDisabled} style={{ background: 'var(--accent)', border: 'none', padding: '8px 13px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: inputDisabled ? 0.5 : 1 }}>
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
