'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS, CATEGORIES, type Project } from '@/lib/projects';
import { X, ExternalLink, ArrowRight } from 'lucide-react';

export default function SelectedWork() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [filter, setFilter] = useState<string>('All');
  const [modal, setModal] = useState<Project | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.04 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="work" style={{ background: 'var(--bg-dark)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="sec-number" style={{ color: 'rgba(14,165,233,0.05)' }}>05</div>
      <div className="container" ref={ref}>

        {/* Header */}
        <div style={{
          marginBottom: '48px',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s, transform 0.7s',
        }}>
          <span className="label" style={{ marginBottom: '12px' }}>05 - Selected Work</span>
          <h2 className="display-lg" style={{ color: '#fff', marginBottom: '12px' }}>Projects that ship.</h2>
          <p className="body-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Case studies with real results, not just screenshots.
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{
          display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '48px',
          opacity: vis ? 1 : 0, transition: 'opacity 0.7s 0.15s',
        }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{
                padding: '8px 20px', borderRadius: '100px',
                fontSize: '12px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
                border: '1px solid',
                borderColor: filter === cat ? 'var(--sky)' : 'rgba(255,255,255,0.12)',
                background: filter === cat ? 'rgba(14,165,233,0.15)' : 'transparent',
                color: filter === cat ? 'var(--sky)' : 'rgba(255,255,255,0.7)',
                cursor: 'none', transition: 'all 0.25s',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="rg-2" style={{ gap: '24px' }}>
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              vis={vis}
              i={i}
              onOpen={() => setModal(project)}
            />
          ))}
        </div>
      </div>

      {/* Case study modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 2000,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px',
            }}
            onClick={() => setModal(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#0F172A',
                border: '1px solid rgba(14,165,233,0.2)',
                borderRadius: '20px',
                maxWidth: '700px', width: '100%',
                maxHeight: '90vh', overflowY: 'auto',
                position: 'relative',
              }}>

              {/* Modal header video */}
              {modal.videoEmbed && (
                <div style={{ aspectRatio: '16/9', position: 'relative', borderRadius: '20px 20px 0 0', overflow: 'hidden', background: '#000' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${modal.videoEmbed}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                    allow="autoplay; encrypted-media; fullscreen"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                  />
                </div>
              )}

              <div style={{ padding: '32px' }}>
                {/* Close */}
                <button onClick={() => setModal(null)} style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
                  width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'none', color: '#fff',
                }}>
                  <X size={16} />
                </button>

                <span className="chip chip-sky" style={{ marginBottom: '12px' }}>{modal.category} · {modal.year}</span>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{modal.title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>{modal.client}</p>

                {modal.challenge && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: 'var(--sky)', marginBottom: '8px', textTransform: 'uppercase' }}>Challenge</div>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.7 }}>{modal.challenge}</p>
                  </div>
                )}
                {modal.approach && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: 'var(--cyan)', marginBottom: '8px', textTransform: 'uppercase' }}>Approach</div>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.7 }}>{modal.approach}</p>
                  </div>
                )}
                {modal.result && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: 'var(--emerald)', marginBottom: '8px', textTransform: 'uppercase' }}>Result</div>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.7 }}>{modal.result}</p>
                  </div>
                )}
                {modal.metrics && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                    {modal.metrics.map((m, i) => (
                      <span key={i} className="chip chip-navy" style={{ color: 'rgba(255,255,255,0.88)', background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}>{m}</span>
                    ))}
                  </div>
                )}

                {/* Tech stack */}
                <div style={{ marginBottom: '28px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: 'rgba(255,255,255,0.62)', marginBottom: '8px', textTransform: 'uppercase' }}>Tech Stack</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {modal.tech.map((t, i) => <span key={i} className="chip chip-sky">{t}</span>)}
                  </div>
                </div>

                {modal.liveUrl !== '#' && (
                  <a href={modal.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    View Live Site <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const CARD_GRADS = [
  { bg: 'linear-gradient(135deg,#060e24 0%,#0a1e4a 60%,#0e3080 100%)', accent: '#0EA5E9' },
  { bg: 'linear-gradient(135deg,#100520 0%,#240a50 60%,#3b1080 100%)', accent: '#818CF8' },
  { bg: 'linear-gradient(135deg,#001a12 0%,#023324 60%,#065a3c 100%)', accent: '#34D399' },
  { bg: 'linear-gradient(135deg,#1a0c00 0%,#3b1a00 60%,#6b3200 100%)', accent: '#F59E0B' },
  { bg: 'linear-gradient(135deg,#0d1f1a 0%,#0a3028 60%,#075e4a 100%)', accent: '#22D3EE' },
  { bg: 'linear-gradient(135deg,#0e0e24 0%,#1a1050 60%,#2e1a80 100%)', accent: '#6366F1' },
];

function ProjectThumb({ project, idx }: { project: Project; idx: number }) {
  const g = CARD_GRADS[idx % CARD_GRADS.length];

  if (project.videoEmbed) {
    const src = `https://www.youtube.com/embed/${project.videoEmbed}?autoplay=1&mute=1&loop=1&playlist=${project.videoEmbed}&controls=0&rel=0&playsinline=1&modestbranding=1`;
    return (
      <div style={{ position: 'absolute', inset: 0, background: '#000', overflow: 'hidden' }}>
        <iframe
          src={src}
          allow="autoplay; encrypted-media"
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '130%', height: '130%',
            border: 'none',
            pointerEvents: 'none',
          }}
        />
        {/* Dark vignette so chips stay readable */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }} />
      </div>
    );
  }

  // Fallback gradient (no video)
  return (
    <div style={{ position: 'absolute', inset: 0, background: g.bg, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '200px', height: '200px',
        background: `radial-gradient(circle, ${g.accent}22 0%, transparent 70%)`,
      }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(0deg, rgba(0,0,0,0.5), transparent)' }} />
    </div>
  );
}

function ProjectCard({ project, vis, i, onOpen }: { project: Project; vis: boolean; i: number; onOpen: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -5;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 5;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
  };
  const onMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'none';
    setHov(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onMouseLeave}
      style={{
        borderRadius: '16px', overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: 'none',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s',
        boxShadow: hov ? '0 24px 48px rgba(0,0,0,0.4)' : 'none',
        borderColor: hov ? 'rgba(14,165,233,0.3)' : 'rgba(255,255,255,0.08)',
        opacity: vis ? 1 : 0,
        transitionDelay: `${0.1 + i * 0.12}s`,
      }}>

      {/* Image / Placeholder */}
      <div style={{
        height: '220px', position: 'relative', overflow: 'hidden',
        background: [
          'linear-gradient(135deg, #0c2340 0%, #0e3d6e 50%, #0EA5E9 100%)',
          'linear-gradient(135deg, #1a0533 0%, #3b1066 50%, #7C3AED 100%)',
          'linear-gradient(135deg, #002b1f 0%, #064e3b 50%, #10B981 100%)',
          'linear-gradient(135deg, #1c1003 0%, #3b2005 50%, #F59E0B 100%)',
          'linear-gradient(135deg, #1a0a14 0%, #3b0d2a 50%, #EC4899 100%)',
          'linear-gradient(135deg, #0d1a2e 0%, #1a3550 50%, #22D3EE 100%)',
        ][i % 6],
      }}>
        <ProjectThumb project={project} idx={i} />
        {/* Category chip overlay */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2 }}>
          <span className="chip chip-sky">{project.category} · {project.year}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{project.title}</h3>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px', lineHeight: 1.6 }}>{project.desc}</p>

        {/* Tech pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {project.tech.slice(0, 4).map((t, i) => (
            <span key={i} className="chip" style={{
              background: 'rgba(14,165,233,0.1)', color: 'var(--sky)',
              border: '1px solid rgba(14,165,233,0.2)',
            }}>{t}</span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onOpen} className="btn-primary"
            style={{ flex: 1, justifyContent: 'center', padding: '10px 16px', fontSize: '12px' }}>
            Case Study <ArrowRight size={13} />
          </button>
          {project.liveUrl !== '#' && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="btn-outline"
              style={{ padding: '10px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.88)', borderColor: 'rgba(255,255,255,0.2)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.88)'; }}>
              Live <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
