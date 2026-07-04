'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Building2, Clock, Send, Check } from 'lucide-react';

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

type Status = 'idle' | 'loading' | 'success' | 'error';

const CONTACT_PARTICLES = [
  { left: '12%', size: 4,   color: 'rgba(56,189,248,0.7)',  dur: 14, delay: 0 },
  { left: '28%', size: 3,   color: 'rgba(129,140,248,0.6)', dur: 18, delay: 3 },
  { left: '44%', size: 5,   color: 'rgba(56,189,248,0.6)',  dur: 16, delay: 6 },
  { left: '61%', size: 3.5, color: 'rgba(52,211,153,0.55)', dur: 20, delay: 2 },
  { left: '74%', size: 4,   color: 'rgba(129,140,248,0.6)', dur: 15, delay: 8 },
  { left: '88%', size: 3,   color: 'rgba(56,189,248,0.6)',  dur: 19, delay: 4 },
  { left: '52%', size: 2.5, color: 'rgba(255,255,255,0.5)', dur: 22, delay: 10 },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '', email: '', projectType: '', budget: '', message: '',
  });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', projectType: '', budget: '', message: '' }); }
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px', color: '#fff',
    fontSize: '14px', outline: 'none',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.25s, box-shadow 0.25s',
  };

  const inputFocusStyle = (el: HTMLElement) => {
    el.style.borderColor = 'rgba(14,165,233,0.5)';
    el.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.12)';
  };
  const inputBlurStyle = (el: HTMLElement) => {
    el.style.borderColor = 'rgba(255,255,255,0.12)';
    el.style.boxShadow = 'none';
  };

  const CONTACTS = [
    { icon: <Mail size={16} />, label: 'Email', value: 'connect.mhtoha@gmail.com', href: 'mailto:connect.mhtoha@gmail.com' },
    { icon: <LinkedinIcon />, label: 'LinkedIn', value: 'linkedin.com/in/mahmudulhasantoha-mhtoha', href: 'https://linkedin.com/in/mahmudulhasantoha-mhtoha' },
    { icon: <GithubIcon />, label: 'GitHub', value: 'github.com/mhtoha29', href: 'https://github.com/mhtoha29' },
    { icon: <Phone size={16} />, label: 'Phone / WhatsApp', value: '+8801716102136', href: 'tel:+8801716102136' },
    { icon: <Building2 size={16} />, label: 'Agency · RMG', value: 'TEX-IT · texit.byv.life', href: 'https://texit.byv.life' },
    { icon: <Building2 size={16} />, label: 'Agency · Tech', value: 'BYV Tech · tech.byv.life', href: 'https://tech.byv.life' },
  ];

  return (
    <section id="contact" className="section" style={{ background: 'linear-gradient(180deg, #0A1120 0%, #0B1428 50%, #070C18 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Premium ambient background */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* soft blueprint grid */}
        <div className="blueprint-bg" style={{ position: 'absolute', inset: 0, opacity: 0.05 }} />
        {/* aurora glow blobs — slow, smooth */}
        <div style={{
          position: 'absolute', top: '-12%', right: '-6%',
          width: '520px', height: '520px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.13) 0%, transparent 62%)',
          filter: 'blur(50px)', animation: 'blobMove1 24s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-18%', left: '-8%',
          width: '460px', height: '460px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.11) 0%, transparent 62%)',
          filter: 'blur(56px)', animation: 'blobMove2 30s ease-in-out infinite',
        }} />
        {/* top hairline accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.5) 50%, transparent)',
        }} />
        {/* drifting light particles - smooth premium movement */}
        {CONTACT_PARTICLES.map((p, k) => (
          <span key={k} style={{
            position: 'absolute', left: p.left, bottom: '-10px',
            width: p.size, height: p.size, borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `floatUp ${p.dur}s linear ${p.delay}s infinite`,
            opacity: 0,
          }} />
        ))}
      </div>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(0.6);   opacity: 0; }
          12%  { opacity: 0.8; }
          85%  { opacity: 0.5; }
          100% { transform: translateY(-88vh) scale(1); opacity: 0; }
        }
      `}</style>

      <div className="sec-number" style={{ color: 'rgba(14,165,233,0.04)' }}>09</div>
      <div className="container" ref={ref} style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '64px',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s, transform 0.7s',
        }}>
          {/* Available badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ position: 'relative', width: '10px', height: '10px' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--emerald)', animation: 'dotPulse 2s ease-out infinite' }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--emerald)' }} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--emerald)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Open to new projects
            </span>
          </div>

          <span className="label" style={{ marginBottom: '12px', display: 'block' }}>09 - Contact</span>
          <h2 className="display-lg" style={{ color: '#fff', marginBottom: '12px' }}>Let&apos;s build something great.</h2>
          <p className="body-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Based in Dhaka, Bangladesh - available globally.
          </p>
        </div>

        <div className="rg-2" style={{ gap: '64px', alignItems: 'start' }}>

          {/* LEFT - Info */}
          <div style={{
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-24px)',
            transition: 'opacity 0.8s 0.15s, transform 0.8s 0.15s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
              <Clock size={14} style={{ color: 'var(--muted)' }} />
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Usually responds within 24 hours · GMT+6 Dhaka</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
              {CONTACTS.map((c, i) => (
                <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    textDecoration: 'none', cursor: 'none',
                    transition: 'background 0.25s, border-color 0.25s',
                    opacity: vis ? 1 : 0,
                    transitionDelay: `${0.2 + i * 0.06}s`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(14,165,233,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(14,165,233,0.25)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}>
                  <div style={{ color: 'var(--sky)', flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>{c.label}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT - Form */}
          <div style={{
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(24px)',
            transition: 'opacity 0.8s 0.2s, transform 0.8s 0.2s',
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="rg-2" style={{ gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Name</label>
                  <input type="text" required placeholder="Your name" value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => inputFocusStyle(e.currentTarget)}
                    onBlur={e => inputBlurStyle(e.currentTarget)} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Email</label>
                  <input type="email" required placeholder="you@company.com" value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => inputFocusStyle(e.currentTarget)}
                    onBlur={e => inputBlurStyle(e.currentTarget)} />
                </div>
              </div>

              <div className="rg-2" style={{ gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Project Type</label>
                  <select value={form.projectType}
                    onChange={e => setForm(p => ({ ...p, projectType: e.target.value }))}
                    style={{ ...inputStyle, cursor: 'none' }}
                    onFocus={e => inputFocusStyle(e.currentTarget)}
                    onBlur={e => inputBlurStyle(e.currentTarget)}>
                    <option value="" style={{ background: '#0F172A' }}>Select type</option>
                    <option value="Web App" style={{ background: '#0F172A' }}>Web Application</option>
                    <option value="AI Integration" style={{ background: '#0F172A' }}>AI Integration</option>
                    <option value="3D Creative" style={{ background: '#0F172A' }}>3D Creative Web</option>
                    <option value="Full Suite" style={{ background: '#0F172A' }}>Full Digital Suite</option>
                    <option value="Other" style={{ background: '#0F172A' }}>Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Budget Range</label>
                  <select value={form.budget}
                    onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}
                    style={{ ...inputStyle, cursor: 'none' }}
                    onFocus={e => inputFocusStyle(e.currentTarget)}
                    onBlur={e => inputBlurStyle(e.currentTarget)}>
                    <option value="" style={{ background: '#0F172A' }}>Select range</option>
                    <option value="<500" style={{ background: '#0F172A' }}>Under $500</option>
                    <option value="500-2k" style={{ background: '#0F172A' }}>$500 – $2,000</option>
                    <option value="2k-5k" style={{ background: '#0F172A' }}>$2,000 – $5,000</option>
                    <option value="5k+" style={{ background: '#0F172A' }}>$5,000+</option>
                    <option value="discuss" style={{ background: '#0F172A' }}>Let&apos;s discuss</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Message</label>
                <textarea required rows={5} placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '140px', fontFamily: 'var(--font-body)' }}
                  onFocus={e => inputFocusStyle(e.currentTarget)}
                  onBlur={e => inputBlurStyle(e.currentTarget)} />
              </div>

              <button type="submit" disabled={status === 'loading' || status === 'success'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '16px 32px', width: '100%',
                  background: status === 'success' ? 'var(--emerald)' : 'var(--sky)',
                  color: '#fff', border: 'none', borderRadius: '100px',
                  fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
                  cursor: status === 'loading' ? 'not-allowed' : 'none',
                  transition: 'background 0.3s, transform 0.2s',
                  opacity: status === 'loading' ? 0.8 : 1,
                }}
                onMouseEnter={e => { if (status === 'idle') e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
                {status === 'loading' ? (
                  <><div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Sending...</>
                ) : status === 'success' ? (
                  <><Check size={16} /> Message Sent!</>
                ) : (
                  <><Send size={14} /> Send Message</>
                )}
              </button>

              {status === 'success' && (
                <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--emerald)' }}>
                  I&apos;ll reply within 24 hours.
                </p>
              )}
              {status === 'error' && (
                <p style={{ textAlign: 'center', fontSize: '13px', color: '#ef4444' }}>
                  Something went wrong. Email me directly: connect.mhtoha@gmail.com
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
