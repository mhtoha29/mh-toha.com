'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const STEPS = [
  { num: '01', title: 'Discover',  color: '#0EA5E9', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>, desc: 'Goals, audience, KPIs. Engineering mindset: understand the system first.' },
  { num: '02', title: 'Design',    color: '#06B6D4', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>, desc: 'Wireframes to final UI. No templates, every decision justified.' },
  { num: '03', title: 'Build',     color: '#3B82F6', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, desc: 'Next.js, Python, APIs - clean code, weekly updates.' },
  { num: '04', title: 'Refine',    color: '#6366F1', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>, desc: 'Two revision rounds. Mobile-perfect. 90+ Lighthouse score.' },
  { num: '05', title: 'Deploy',    color: '#10B981', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>, desc: 'Vercel deploy, domain, analytics. 30-day post-launch support.' },
];

const VIDEOS = [
  { id: 'ga1EAPlWciQ', title: 'Project Showcase - Full Walkthrough' },
  { id: 'gp32YB0ggtM', title: 'Agency & Portfolio Overview' },
  { id: 'CRyHggCN-Fs', title: 'Client Website Demo' },
  { id: 'uewnO_ijzn8', title: 'Development Process Walkthrough' },
];

function useSlider(len: number, autoMs = 0) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((n: number) => setIdx((n + len) % len), [len]);
  const next = useCallback(() => go(idx + 1), [go, idx]);
  const prev = useCallback(() => go(idx - 1), [go, idx]);

  useEffect(() => {
    if (!autoMs) return;
    timer.current = setTimeout(next, autoMs);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [idx, next, autoMs]);

  const reset = useCallback(() => { if (timer.current) clearTimeout(timer.current); }, []);

  return { idx, next, prev, go, reset };
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.04 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const vid = useSlider(VIDEOS.length, 6000);

  return (
    <section id="process" className="section" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="blueprint-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4 }} />
      <div className="sec-number">09</div>

      <div className="container" ref={ref}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '72px',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s, transform 0.7s',
        }}>
          <span className="label" style={{ marginBottom: '14px', display: 'block' }}>09 - Process & Proof</span>
          <h2 className="display-lg" style={{ marginBottom: '14px' }}>
            How I work.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>See it in motion.</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            A five-step process refined across 40+ projects - demonstrated by real work, not just words.
          </p>
        </div>

        {/* ── PROCESS STEPS ── */}
        <div className="process-row" style={{
          display: 'flex', gap: '0', marginBottom: '80px', position: 'relative',
          opacity: vis ? 1 : 0, transition: 'opacity 0.8s 0.1s',
          overflowX: 'auto', paddingBottom: '4px',
        }}>
          {STEPS.map((s, i) => (
            <div key={i} className="process-item" style={{ flex: '1 0 160px', position: 'relative' }}>
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="process-connector" style={{
                  position: 'absolute', top: '24px', left: '50%', right: '-50%', height: '1px',
                  background: `linear-gradient(90deg, ${s.color}50, ${STEPS[i+1].color}50)`,
                  zIndex: 0,
                  transform: vis ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: `transform 0.6s ${0.3 + i * 0.15}s ease`,
                }} />
              )}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                padding: '0 8px', position: 'relative', zIndex: 1,
                opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
                transition: `opacity 0.6s ${0.2 + i * 0.1}s, transform 0.6s ${0.2 + i * 0.1}s`,
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: 'var(--bg)', border: `1.5px solid ${s.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: s.color, marginBottom: '14px', position: 'relative',
                  zIndex: 1,
                  boxShadow: `0 0 0 4px var(--bg)`,
                }}>
                  {s.icon}
                  <div style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    fontSize: '10px', fontWeight: 700, letterSpacing: '1px',
                    color: s.color, background: 'var(--bg)',
                    padding: '1px 5px', borderRadius: '4px', border: `1px solid ${s.color}30`,
                  }}>{s.num}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--navy)', marginBottom: '6px' }}>{s.title}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── VIDEO SLIDER (centered) ── */}
        <div style={{
          maxWidth: '780px', margin: '0 auto',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.8s 0.3s, transform 0.8s 0.3s',
        }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <div className="label" style={{ marginBottom: '4px' }}>Work in Motion</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Project walkthroughs & demos</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[vid.prev, vid.next].map((fn, i) => (
                  <button key={i} onClick={() => { vid.reset(); fn(); }}
                    style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: 'transparent', border: '1px solid var(--border2)',
                      color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'none', transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--sky)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--sky)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(15,23,42,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)'; }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {i === 0 ? <polyline points="15 18 9 12 15 6"/> : <polyline points="9 18 15 12 9 6"/>}
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Video Thumbnail */}
            <div
              onClick={() => setLightbox(VIDEOS[vid.idx].id)}
              style={{
                borderRadius: '16px', overflow: 'hidden',
                border: '1px solid var(--border2)',
                cursor: 'none', position: 'relative',
                aspectRatio: '16/9',
                background: '#0a0a1a',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                transition: 'box-shadow 0.3s, border-color 0.3s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(14,165,233,0.15)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(14,165,233,0.3)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(15,23,42,0.08)'; }}>

              {/* YouTube thumbnail */}
              <img
                key={VIDEOS[vid.idx].id}
                src={`https://img.youtube.com/vi/${VIDEOS[vid.idx].id}/maxresdefault.jpg`}
                alt={VIDEOS[vid.idx].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />

              {/* Dark overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />

              {/* Play button */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '60px', height: '60px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.95)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0EA5E9">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>

              {/* Title overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '20px 16px 16px',
                background: 'linear-gradient(0deg, rgba(0,0,0,0.8), transparent)',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{VIDEOS[vid.idx].title}</div>
                <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Click to play</div>
              </div>
            </div>

            {/* Video dots */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '14px', justifyContent: 'center' }}>
              {VIDEOS.map((_, i) => (
                <button key={i} onClick={() => { vid.reset(); vid.go(i); }}
                  style={{
                    width: i === vid.idx ? '24px' : '7px', height: '7px', borderRadius: '4px',
                    background: i === vid.idx ? 'var(--sky)' : 'rgba(15,23,42,0.12)',
                    border: 'none', cursor: 'none', padding: 0,
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }} />
              ))}
            </div>
        </div>
      </div>

      {/* ── VIDEO LIGHTBOX ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 3000,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
            animation: 'fadeUp 0.25s ease',
          }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '900px', position: 'relative' }}>
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute', top: '-48px', right: '0',
                background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
                width: '36px', height: '36px', color: '#fff', fontSize: '18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'none',
              }}>×</button>
            <div style={{ aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
              <iframe
                src={`https://www.youtube.com/embed/${lightbox}?autoplay=1&rel=0&modestbranding=1`}
                allow="autoplay; encrypted-media; fullscreen"
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .process-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 48px 12px !important;
            overflow-x: visible !important;
            align-items: start;
          }
          /* last odd item spans full width, centered */
          .process-item:last-child:nth-child(odd) { grid-column: 1 / -1; }
          .process-connector { display: none; }
        }
      `}</style>
    </section>
  );
}
