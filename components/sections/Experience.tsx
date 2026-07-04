'use client';
import { useEffect, useRef, useState } from 'react';

const EDUCATION = [
  { period: '2014–2018', role: 'Diploma — Shipbuilding Technology',          org: 'Institute of Marine Technology, Sirajganj', color: 'var(--sky)',      cgpa: 'Diploma' },
  { period: '2019–2023', role: 'BSc — Mechanical Engineering',               org: 'Sonargaon University (SU)',                  color: 'var(--sky)',      cgpa: 'BSc' },
  { period: '2021–2022', role: 'Web Design & Development',                   org: 'VCAMPUS BD Training Institute',              color: 'var(--electric)', cgpa: 'Certified' },
  { period: '2023–2024', role: 'Machine Learning with Python',               org: 'BUET',                                       color: 'var(--violet)',   cgpa: 'Certified' },
  { period: '2024',      role: 'AutoCAD Professional',                       org: 'CADD CORE',                                  color: 'var(--cyan)',     cgpa: 'Certified' },
  { period: '2026',      role: 'AI Based Professional Software Engineering', org: 'ICT Bangladesh',                             color: 'var(--amber)',    cgpa: 'Enrolled' },
];

const WORK = [
  { period: '2022–2024', role: 'Research Assistant (R&D)',       org: 'The Institution of Engineers, Bangladesh (IEB)', color: 'var(--electric)' },
  { period: '2024 — now', role: 'CEO',                           org: 'TEX-IT & BYV Tech Agency',                       color: 'var(--emerald)' },
  { period: '2025 — now', role: 'Business Development Manager',  org: 'Apparel Horizon Ltd',                            color: 'var(--cyan)' },
];

const CERTS = ['Machine Learning · BUET', 'AutoCAD · CADD CORE', 'Web Design & Dev · VCAMPUS BD', 'AI Software Engineering · ICT Bangladesh', 'Shipbuilding Tech · Marine Technology Institute'];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState<string | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.04 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const cardStyle = (i: number, dir: 'left' | 'right') => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'none' : `translateX(${dir === 'left' ? -28 : 28}px)`,
    transition: `opacity 0.65s ${0.15 + i * 0.1}s, transform 0.65s ${0.15 + i * 0.1}s`,
  });

  return (
    <section id="experience" className="section" style={{ background: 'var(--bg)' }}>
      <div className="blueprint-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }} />
      <div className="sec-number">06</div>

      <div className="container" ref={ref}>
        {/* Header */}
        <div style={{
          marginBottom: '64px',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s, transform 0.7s',
        }}>
          <span className="label" style={{ marginBottom: '12px' }}>06 — Experience</span>
          <h2 className="display-lg">The journey that built this.</h2>
        </div>

        <div className="rg-2" style={{ gap: '48px', alignItems: 'start' }}>

          {/* EDUCATION */}
          <div>
            <div style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase',
              color: 'var(--sky)', marginBottom: '28px',
              opacity: vis ? 1 : 0, transition: 'opacity 0.6s 0.1s',
            }}>
              Education & Training
            </div>

            {/* Vertical line */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '7px', top: '12px', bottom: '8px', width: '1px',
                background: 'linear-gradient(180deg, var(--sky), var(--violet))',
                opacity: 0.25,
                transform: vis ? 'scaleY(1)' : 'scaleY(0)',
                transformOrigin: 'top',
                transition: 'transform 1.4s cubic-bezier(0.4,0,0.2,1) 0.3s',
              }} />

              {EDUCATION.map((e, i) => {
                const key = `edu-${i}`;
                const isHov = hov === key;
                return (
                  <div key={i} onMouseEnter={() => setHov(key)} onMouseLeave={() => setHov(null)}
                    style={{ display: 'flex', gap: '20px', marginBottom: '20px', ...cardStyle(i, 'left'), cursor: 'default' }}>

                    <div style={{ paddingTop: '18px', flexShrink: 0 }}>
                      <div style={{
                        width: '14px', height: '14px', borderRadius: '50%',
                        border: `2px solid ${e.color}`,
                        background: isHov ? e.color : 'var(--bg)',
                        boxShadow: isHov ? `0 0 10px ${e.color}` : 'none',
                        transition: 'all 0.3s',
                      }} />
                    </div>

                    <div style={{
                      flex: 1, padding: '16px 18px',
                      border: `1px solid ${isHov ? e.color + '35' : 'var(--border2)'}`,
                      borderRadius: '10px',
                      background: isHov ? `${e.color}06` : '#fff',
                      transform: isHov ? 'translateX(4px)' : 'none',
                      transition: 'all 0.3s ease',
                      position: 'relative', overflow: 'hidden',
                    }}>
                      <div style={{
                        position: 'absolute', left: 0, top: '15%', bottom: '15%', width: '2px',
                        background: e.color, opacity: isHov ? 1 : 0, transition: 'opacity 0.3s',
                      }} />
                      <div className="mono" style={{ color: e.color, marginBottom: '4px', fontSize: '10px' }}>{e.period}</div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--navy)', marginBottom: '2px' }}>{e.role}</div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{e.org}</div>
                      <div className="chip chip-sky" style={{ marginTop: '8px', fontSize: '9px' }}>{e.cgpa}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WORK */}
          <div>
            <div style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase',
              color: 'var(--emerald)', marginBottom: '28px',
              opacity: vis ? 1 : 0, transition: 'opacity 0.6s 0.15s',
            }}>
              Work Experience
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '7px', top: '12px', bottom: '8px', width: '1px',
                background: 'linear-gradient(180deg, var(--emerald), var(--sky))',
                opacity: 0.25,
                transform: vis ? 'scaleY(1)' : 'scaleY(0)',
                transformOrigin: 'top',
                transition: 'transform 1.4s cubic-bezier(0.4,0,0.2,1) 0.4s',
              }} />

              {WORK.map((w, i) => {
                const key = `work-${i}`;
                const isHov = hov === key;
                const isCurrent = w.period.includes('now');
                return (
                  <div key={i} onMouseEnter={() => setHov(key)} onMouseLeave={() => setHov(null)}
                    style={{ display: 'flex', gap: '20px', marginBottom: '20px', ...cardStyle(i, 'right'), cursor: 'default' }}>

                    <div style={{ paddingTop: '18px', flexShrink: 0 }}>
                      <div style={{
                        width: '14px', height: '14px', borderRadius: '50%',
                        border: `2px solid ${w.color}`,
                        background: isCurrent ? w.color : (isHov ? w.color : 'var(--bg)'),
                        boxShadow: (isHov || isCurrent) ? `0 0 10px ${w.color}` : 'none',
                        transition: 'all 0.3s',
                      }} />
                    </div>

                    <div style={{
                      flex: 1, padding: '16px 18px',
                      border: `1px solid ${isHov ? w.color + '35' : 'var(--border2)'}`,
                      borderRadius: '10px',
                      background: isHov ? `${w.color}06` : '#fff',
                      transform: isHov ? 'translateX(4px)' : 'none',
                      transition: 'all 0.3s ease',
                      position: 'relative', overflow: 'hidden',
                    }}>
                      <div style={{
                        position: 'absolute', left: 0, top: '15%', bottom: '15%', width: '2px',
                        background: w.color, opacity: isHov ? 1 : 0, transition: 'opacity 0.3s',
                      }} />
                      <div className="mono" style={{ color: w.color, marginBottom: '4px', fontSize: '10px' }}>{w.period}</div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--navy)', marginBottom: '2px' }}>{w.role}</div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{w.org}</div>
                      {isCurrent && <div className="chip chip-emerald" style={{ marginTop: '8px', fontSize: '9px' }}>Current</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div style={{
          marginTop: '48px', padding: '24px',
          border: '1px solid var(--border2)', borderRadius: '12px',
          opacity: vis ? 1 : 0, transition: 'opacity 0.8s 0.6s',
        }}>
          <div className="label" style={{ marginBottom: '16px' }}>Certifications</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {CERTS.map((c, i) => (
              <span key={i} className="chip chip-sky" style={{
                opacity: vis ? 1 : 0,
                transition: `opacity 0.5s ${0.7 + i * 0.06}s`,
              }}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
