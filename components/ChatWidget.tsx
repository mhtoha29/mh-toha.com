'use client';
import { useEffect, useRef, useState } from 'react';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_QUESTIONS = [
  'What services do you offer?',
  'Show me your projects',
  'What is your pricing?',
  'How can I contact Toha?',
];

const WHATSAPP_URL =
  'https://wa.me/8801716102136?text=' +
  encodeURIComponent("Hi Toha! I found your portfolio and I'd like to discuss a project.");

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: 'assistant',
      content:
        "Hi! 👋 I'm TOHA AI - trained on everything about Mahmudul Hasan Toha. Ask me about his skills, projects, services, pricing, or agencies!",
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-scroll to newest message
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, typing, open]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || typing) return;

    const next: Msg[] = [...msgs, { role: 'user', content }];
    setMsgs(next);
    setInput('');
    setTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      // small delay so the typing indicator feels natural
      await new Promise(r => setTimeout(r, 400));
      setMsgs(m => [...m, { role: 'assistant', content: data.reply ?? '...' }]);
    } catch {
      setMsgs(m => [
        ...m,
        {
          role: 'assistant',
          content:
            'Connection hiccup - please try again, or message Toha directly on WhatsApp: +880 1716-102136.',
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const showQuick = msgs.length <= 1;

  return (
    <>
      {/* ── FLOATING BUTTONS ── */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1500,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '14px',
        }}
      >
        {/* WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fab-wa"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(37,211,102,0.35), 0 2px 8px rgba(0,0,0,0.15)',
            textDecoration: 'none',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        {/* AI Chat toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Chat with TOHA AI"
          className="fab-ai"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: 'none',
            background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 28px rgba(14,165,233,0.4), 0 2px 10px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.3)',
            cursor: 'none',
            position: 'relative',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
        >
          {/* rotating conic sheen - premium glow ring */}
          {!open && <span className="fab-ai-sheen" />}

          {/* glossy highlight - radial so it stays contained without clipping */}
          <span
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'radial-gradient(circle at 32% 24%, rgba(255,255,255,0.38), transparent 58%)',
              pointerEvents: 'none',
            }}
          />

          {/* pulse ring */}
          {!open && <span className="fab-pulse" />}

          {/* unread dot */}
          {!open && unread && (
            <span
              style={{
                position: 'absolute',
                top: '3px',
                right: '3px',
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                background: '#22C55E',
                border: '2.5px solid #fff',
                boxShadow: '0 0 6px rgba(34,197,94,0.6)',
                zIndex: 2,
              }}
            />
          )}

          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" style={{ position: 'relative', zIndex: 2 }}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 2, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.25))' }}>
              <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" fill="#fff" stroke="none" />
              <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14z" fill="#fff" stroke="none" opacity="0.85" />
              <path d="M5 15l.7 1.6L7.3 17.3l-1.6.7L5 19.6l-.7-1.6L2.7 17.3l1.6-.7L5 15z" fill="#fff" stroke="none" opacity="0.7" />
            </svg>
          )}
        </button>

        {/* Scroll to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fab-top"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(15,23,42,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            cursor: 'none',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease',
            opacity: showTop ? 1 : 0,
            transform: showTop ? 'scale(1)' : 'scale(0.7)',
            pointerEvents: showTop ? 'auto' : 'none',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* ── CHAT PANEL ── */}
      <div
        className="chat-panel"
        style={{
          position: 'fixed',
          bottom: '150px',
          right: '24px',
          zIndex: 1499,
          width: 'min(390px, calc(100vw - 32px))',
          height: 'min(560px, calc(100dvh - 130px))',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(170deg, #0B1228 0%, #0F1A3A 100%)',
          border: '1px solid rgba(99,140,255,0.18)',
          boxShadow: '0 32px 80px rgba(2,6,23,0.55), 0 0 0 1px rgba(14,165,233,0.08)',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.96)',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.4,0.5,1), bottom 0.3s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            flexShrink: 0,
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '16px',
              color: '#fff',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(14,165,233,0.35)',
            }}
          >
            T
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', letterSpacing: '0.2px' }}>
              TOHA AI
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#22C55E',
                  boxShadow: '0 0 8px rgba(34,197,94,0.8)',
                }}
              />
              <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.4px' }}>
                Online · Ask me anything
              </span>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'none',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          ref={bodyRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '18px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {msgs.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                animation: 'chatMsgIn 0.3s ease both',
              }}
            >
              <div
                style={{
                  maxWidth: '82%',
                  padding: '11px 14px',
                  borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  fontSize: '13px',
                  lineHeight: 1.65,
                  whiteSpace: 'pre-line',
                  ...(m.role === 'user'
                    ? {
                        background: 'linear-gradient(135deg, #0EA5E9, #3B82F6)',
                        color: '#fff',
                        boxShadow: '0 4px 14px rgba(14,165,233,0.25)',
                      }
                    : {
                        background: 'rgba(255,255,255,0.055)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.88)',
                      }),
                }}
              >
                {m.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  padding: '13px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'rgba(255,255,255,0.055)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                }}
              >
                <span className="chat-dot" style={{ animationDelay: '0s' }} />
                <span className="chat-dot" style={{ animationDelay: '0.15s' }} />
                <span className="chat-dot" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          )}

          {/* Quick questions */}
          {showQuick && !typing && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: '2px',
                }}
              >
                Quick questions
              </div>
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => send(q)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: 'rgba(14,165,233,0.07)',
                    border: '1px solid rgba(14,165,233,0.18)',
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '12.5px',
                    cursor: 'none',
                    transition: 'background 0.2s, border-color 0.2s',
                    animation: `chatMsgIn 0.3s ease ${0.1 + i * 0.07}s both`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(14,165,233,0.14)';
                    e.currentTarget.style.borderColor = 'rgba(14,165,233,0.35)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(14,165,233,0.07)';
                    e.currentTarget.style.borderColor = 'rgba(14,165,233,0.18)';
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div
          style={{
            padding: '14px 14px 12px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(255,255,255,0.02)',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '14px',
              padding: '4px 4px 4px 16px',
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask about Toha…"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: '13px',
                minWidth: 0,
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || typing}
              aria-label="Send"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '11px',
                border: 'none',
                background:
                  input.trim() && !typing
                    ? 'linear-gradient(135deg, #0EA5E9, #6366F1)'
                    : 'rgba(255,255,255,0.06)',
                color: input.trim() && !typing ? '#fff' : 'rgba(255,255,255,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'none',
                flexShrink: 0,
                transition: 'background 0.25s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
          <div
            style={{
              textAlign: 'center',
              fontSize: '9px',
              letterSpacing: '1px',
              color: 'rgba(255,255,255,0.22)',
              marginTop: '8px',
              textTransform: 'uppercase',
            }}
          >
            TOHA AI · Powered by MH-TOHA
          </div>
        </div>
      </div>

      {/* Widget-scoped styles */}
      <style>{`
        .fab-ai:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 16px 40px rgba(14,165,233,0.5), 0 4px 14px rgba(0,0,0,0.25); }
        .fab-wa:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 14px 36px rgba(37,211,102,0.45), 0 4px 12px rgba(0,0,0,0.2); }
        .fab-top:hover { background: rgba(15,23,42,0.95); border-color: rgba(255,255,255,0.3); }
        .fab-pulse {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid rgba(14,165,233,0.55);
          animation: fabPulse 2.4s ease-out infinite;
          pointer-events: none;
        }
        .fab-ai-sheen {
          position: absolute; inset: -3px; border-radius: 50%;
          background: conic-gradient(from 0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 12%, rgba(255,255,255,0) 24%);
          animation: fabSheenSpin 3.2s linear infinite;
          pointer-events: none;
        }
        @keyframes fabSheenSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fabPulse {
          0%   { transform: scale(1);    opacity: 0.8; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        @keyframes chatMsgIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chat-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,0.55);
          animation: chatDotBounce 1.1s ease-in-out infinite;
        }
        @keyframes chatDotBounce {
          0%, 60%, 100% { transform: translateY(0);    opacity: 0.45; }
          30%           { transform: translateY(-5px); opacity: 1; }
        }
        @media (max-width: 480px) {
          .chat-panel { right: 16px !important; bottom: 90px !important; }
        }
      `}</style>
    </>
  );
}
