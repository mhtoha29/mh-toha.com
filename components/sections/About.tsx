'use client';
import { useEffect, useRef, useState } from 'react';

function CountUp({ target, suffix = '', inView }: { target: number; suffix?: string; inView: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = Math.ceil(target / 60);
    const t = setInterval(() => {
      n += step;
      if (n >= target) { setV(target); clearInterval(t); }
      else setV(n);
    }, 20);
    return () => clearInterval(t);
  }, [inView, target]);
  return <>{v}{suffix}</>;
}

function gearPath(outerR: number, innerR: number, teeth: number): string {
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * Math.PI * 2;
    const a1 = ((i + 0.35) / teeth) * Math.PI * 2;
    const a2 = ((i + 0.65) / teeth) * Math.PI * 2;
    const a3 = ((i + 1) / teeth) * Math.PI * 2;
    const p = (a: number, r: number) => `${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`;
    if (i === 0) pts.push(`M${p(a0, innerR)}`);
    else pts.push(`L${p(a0, innerR)}`);
    pts.push(`L${p(a1, outerR)}`, `L${p(a2, outerR)}`, `L${p(a3, innerR)}`);
  }
  return pts.join(' ') + ' Z';
}

// Pre-computed at module level → identical between SSR and browser
const r3 = (n: number) => parseFloat(n.toFixed(3));
const BIG_HOLES = [0, 72, 144, 216, 288].map(a => ({
  cx: r3(155 + Math.cos(a * Math.PI / 180) * 48),
  cy: r3(138 + Math.sin(a * Math.PI / 180) * 48),
}));
const MED_HOLES = [0, 120, 240].map(a => ({
  cx: r3(290 + Math.cos(a * Math.PI / 180) * 28),
  cy: r3(84 + Math.sin(a * Math.PI / 180) * 28),
}));

const SKILL_CHIPS_DARK = [
  { label: 'WordPress',    bg: 'rgba(14,165,233,0.14)',   color: '#38BDF8', border: 'rgba(56,189,248,0.28)' },
  { label: 'HTML / CSS',   bg: 'rgba(14,165,233,0.14)',   color: '#38BDF8', border: 'rgba(56,189,248,0.28)' },
  { label: 'JavaScript',   bg: 'rgba(59,130,246,0.14)',   color: '#93C5FD', border: 'rgba(147,197,253,0.28)' },
  { label: 'Next.js',      bg: 'rgba(255,255,255,0.08)',  color: '#E2E8F0', border: 'rgba(255,255,255,0.18)' },
  { label: 'React',        bg: 'rgba(6,182,212,0.14)',    color: '#22D3EE', border: 'rgba(34,211,238,0.28)' },
  { label: 'Three.js',     bg: 'rgba(6,182,212,0.10)',    color: '#67E8F9', border: 'rgba(103,232,249,0.22)' },
  { label: 'Python / ML',  bg: 'rgba(139,92,246,0.14)',   color: '#A78BFA', border: 'rgba(167,139,250,0.28)' },
  { label: 'Photoshop',    bg: 'rgba(59,130,246,0.14)',   color: '#93C5FD', border: 'rgba(147,197,253,0.28)' },
  { label: 'Illustrator',  bg: 'rgba(245,158,11,0.14)',   color: '#FCD34D', border: 'rgba(252,211,77,0.28)' },
  { label: 'Figma / UI',   bg: 'rgba(236,72,153,0.12)',   color: '#F9A8D4', border: 'rgba(249,168,212,0.25)' },
  { label: 'AutoCAD',      bg: 'rgba(245,158,11,0.10)',   color: '#FDE68A', border: 'rgba(253,230,138,0.22)' },
  { label: 'SEO',          bg: 'rgba(16,185,129,0.14)',   color: '#6EE7B7', border: 'rgba(110,231,183,0.28)' },
  { label: 'Video Editing',bg: 'rgba(99,102,241,0.14)',   color: '#A5B4FC', border: 'rgba(165,180,252,0.28)' },
];

function GearPanel({ vis }: { vis: boolean }) {
  return (
    <div style={{
      background: 'linear-gradient(160deg, #05071A 0%, #09102A 55%, #060E1E 100%)',
      border: '1px solid rgba(56,189,248,0.18)',
      borderRadius: '20px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '560px',
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateX(0)' : 'translateX(-36px)',
      transition: 'opacity 0.9s, transform 0.9s',
      boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(56,189,248,0.06), inset 0 1px 0 rgba(56,189,248,0.15)',
    }}>

      {/* ── Identity header ── */}
      <div style={{ padding: '22px 22px 18px', borderBottom: '1px solid rgba(56,189,248,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#38BDF8',
            boxShadow: '0 0 10px #38BDF8, 0 0 20px rgba(56,189,248,0.4)',
          }} />
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '9px', letterSpacing: '3px', color: 'rgba(186,230,253,0.78)', textTransform: 'uppercase' }}>
            Background · Expertise
          </span>
        </div>
        <div style={{ fontSize: '28px', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '12px' }}>
          Mechanical<br />Engineer
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #38BDF8 0%, rgba(56,189,248,0.2) 80%, transparent 100%)' }} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Digital Builder
          </span>
        </div>
      </div>

      {/* ── Gear SVG ── */}
      <div style={{ flex: 1, position: 'relative', minHeight: '260px' }}>
        <svg viewBox="0 0 380 270" xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
          suppressHydrationWarning>
          <style>{`
            .g-big  { animation: spin 26s linear infinite; transform-origin: 155px 138px; }
            .g-med  { animation: spin 16s linear infinite reverse; transform-origin: 290px 84px; }
            .g-sm   { animation: spin 9s linear infinite; transform-origin: 68px 228px; }
            .g-xs   { animation: spin 7s linear infinite reverse; transform-origin: 325px 196px; }
          `}</style>

          <defs>
            <pattern id="aboutGrid" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M 18 0 L 0 0 0 18" fill="none" stroke="rgba(56,189,248,0.06)" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="gearGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="380" height="270" fill="url(#aboutGrid)" />
          <circle cx="155" cy="138" r="100" fill="url(#gearGlow)" />

          {/* Big gear — sky blue */}
          <g className="g-big">
            <path d={gearPath(86, 70, 18)} transform="translate(155 138)"
              fill="none" stroke="#38BDF8" strokeWidth="1.6" opacity="0.62" />
            <circle cx="155" cy="138" r="26" fill="none" stroke="#38BDF8" strokeWidth="0.8" opacity="0.4" />
            <circle cx="155" cy="138" r="10" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" strokeWidth="1.8" opacity="0.7" />
            {BIG_HOLES.map(({ cx, cy }, i) => (
              <circle key={i} cx={cx} cy={cy}
                r="4.5" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" strokeWidth="1" opacity="0.55" />
            ))}
            <line x1="56" y1="138" x2="118" y2="138" stroke="#38BDF8" strokeWidth="0.5" opacity="0.28" />
            <line x1="192" y1="138" x2="255" y2="138" stroke="#38BDF8" strokeWidth="0.5" opacity="0.28" />
            <line x1="155" y1="52" x2="155" y2="106" stroke="#38BDF8" strokeWidth="0.5" opacity="0.28" />
            <line x1="155" y1="170" x2="155" y2="238" stroke="#38BDF8" strokeWidth="0.5" opacity="0.28" />
          </g>

          {/* Medium gear — violet */}
          <g className="g-med">
            <path d={gearPath(53, 42, 11)} transform="translate(290 84)"
              fill="none" stroke="#818CF8" strokeWidth="1.5" opacity="0.58" />
            <circle cx="290" cy="84" r="16" fill="none" stroke="#818CF8" strokeWidth="0.8" opacity="0.35" />
            <circle cx="290" cy="84" r="5.5" fill="rgba(129,140,248,0.12)" stroke="#818CF8" strokeWidth="1.6" opacity="0.6" />
            {MED_HOLES.map(({ cx, cy }, i) => (
              <circle key={i} cx={cx} cy={cy}
                r="3.5" fill="rgba(129,140,248,0.1)" stroke="#818CF8" strokeWidth="1" opacity="0.45" />
            ))}
          </g>

          {/* Small gear — cyan */}
          <g className="g-sm">
            <path d={gearPath(37, 28, 8)} transform="translate(68 228)"
              fill="none" stroke="#22D3EE" strokeWidth="1.4" opacity="0.52" />
            <circle cx="68" cy="228" r="11" fill="none" stroke="#22D3EE" strokeWidth="0.8" opacity="0.32" />
            <circle cx="68" cy="228" r="3.5" fill="rgba(34,211,238,0.12)" stroke="#22D3EE" strokeWidth="1.5" opacity="0.52" />
          </g>

          {/* Tiny gear — emerald */}
          <g className="g-xs">
            <path d={gearPath(23, 18, 6)} transform="translate(325 196)"
              fill="none" stroke="#34D399" strokeWidth="1.4" opacity="0.48" />
            <circle cx="325" cy="196" r="7" fill="none" stroke="#34D399" strokeWidth="0.8" opacity="0.28" />
            <circle cx="325" cy="196" r="2.5" fill="rgba(52,211,153,0.1)" stroke="#34D399" strokeWidth="1.4" opacity="0.48" />
          </g>

          {/* Connection dashes */}
          <line x1="155" y1="138" x2="290" y2="84"
            stroke="rgba(56,189,248,0.15)" strokeWidth="0.8" strokeDasharray="5 5" />

          {/* Technical annotations */}
          <text x="18" y="22" fill="rgba(56,189,248,0.4)" fontSize="7" fontFamily="monospace">N=18T · m=1.5</text>
          <text x="18" y="32" fill="rgba(56,189,248,0.4)" fontSize="7" fontFamily="monospace">ω=2π/26s · CW</text>
          <text x="220" y="260" fill="rgba(129,140,248,0.4)" fontSize="7" fontFamily="monospace">REV=16s · CCW</text>
        </svg>
      </div>

      {/* ── Skills stack ── */}
      <div style={{ padding: '14px 18px 22px', borderTop: '1px solid rgba(56,189,248,0.1)', background: 'rgba(0,0,0,0.25)' }}>
        <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '8px', letterSpacing: '2.5px', color: 'rgba(56,189,248,0.55)', textTransform: 'uppercase', marginBottom: '10px' }}>
          Skill Stack
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {SKILL_CHIPS_DARK.map((chip, i) => (
            <span key={i} style={{
              padding: '3px 9px',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: 600,
              background: chip.bg,
              color: chip.color,
              border: `1px solid ${chip.border}`,
              letterSpacing: '0.2px',
              opacity: vis ? 1 : 0,
              transition: `opacity 0.4s ${0.6 + i * 0.04}s`,
            }}>
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stagger = (i: number) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity 0.7s ${i * 0.12}s, transform 0.7s ${i * 0.12}s`,
  });

  return (
    <section id="about" className="section" style={{
      background: 'linear-gradient(160deg, #06081C 0%, #0A102E 48%, #070F1D 100%)',
    }}>
      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.7) 28%, rgba(129,140,248,0.7) 60%, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Background glow orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-15%', right: '-8%',
          width: '560px', height: '560px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 65%)',
          filter: 'blur(40px)',
          animation: 'blobMove2 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: '440px', height: '440px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 65%)',
          filter: 'blur(40px)',
          animation: 'blobMove1 25s ease-in-out infinite',
        }} />
      </div>

      {/* Blueprint grid — very subtle on dark */}
      <div className="blueprint-bg" style={{ position: 'absolute', inset: 0, opacity: 0.07, pointerEvents: 'none' }} />

      <div className="sec-number" style={{ color: 'rgba(56,189,248,0.05)' }}>02</div>

      <div className="container" ref={ref}>
        <div className="rg-2-l" style={{ alignItems: 'start' }}>

          {/* LEFT — Gear Panel */}
          <GearPanel vis={vis} />

          {/* RIGHT — Content */}
          <div style={{ paddingTop: '4px' }}>

            {/* Label + Heading */}
            <div style={stagger(0)}>
              <span style={{
                display: 'block', marginBottom: '14px',
                fontSize: '11px', fontWeight: 700, letterSpacing: '3px',
                textTransform: 'uppercase', color: '#38BDF8',
              }}>
                02 — About
              </span>
              <h2 style={{
                fontSize: 'clamp(32px, 4.2vw, 56px)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.025em',
                color: '#FFFFFF',
                marginBottom: '30px',
              }}>
                Problem Solver.<br />
                <span style={{ color: '#38BDF8' }}>System Builder.</span><br />
                Vision Builder.
              </h2>
            </div>

            {/* Bio */}
            <div style={stagger(1)}>
              <p style={{ fontSize: 'clamp(15px,1.2vw,17px)', lineHeight: 1.85, color: 'rgba(255,255,255,0.68)', marginBottom: '18px' }}>
                I believe engineering is more than a profession — it&apos;s a way of thinking. An engineer is an
                innovator, a creator, and a problem solver who turns complexity into simple, scalable systems.
                My passion is transforming ideas into reality by combining modern technology, AI, and thoughtful
                design to build solutions that create real impact.
              </p>
              <p style={{ fontSize: 'clamp(15px,1.2vw,17px)', lineHeight: 1.85, color: 'rgba(255,255,255,0.68)', marginBottom: '18px' }}>
                I don&apos;t believe in one-size-fits-all solutions or copied templates. Every business has unique
                challenges, and every solution should be built with purpose. Whether it&apos;s a high-performance
                website, a custom platform, or an AI-powered system, I focus on creating products that are
                reliable, scalable, and built to last.
              </p>
              <p style={{ fontSize: 'clamp(15px,1.2vw,17px)', lineHeight: 1.85, color: 'rgba(255,255,255,0.68)', marginBottom: '38px' }}>
                More than writing code, I enjoy bringing people&apos;s visions to life. I build systems that solve
                problems, simplify work, and create freedom — because great technology should empower people,
                not complicate their lives.
              </p>
            </div>

            {/* Stats */}
            <div style={{
              ...stagger(2),
              display: 'flex',
              marginBottom: '36px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '14px',
              overflow: 'hidden',
            }}>
              {[
                { n: 25, s: '+', l: 'Brands Built',      c: '#38BDF8' },
                { n: 5,  s: '+', l: 'Years in Industry', c: '#818CF8' },
                { n: 12, s: '+', l: 'Team at BYV',       c: '#34D399' },
              ].map((stat, i) => (
                <div key={i} style={{
                  flex: 1,
                  padding: '22px 16px',
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)',
                  textAlign: i === 0 ? 'left' : 'center',
                }}>
                  <div style={{
                    fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800,
                    color: stat.c, lineHeight: 1, marginBottom: '7px',
                    textShadow: `0 0 20px ${stat.c}55`,
                  }}>
                    {vis ? <CountUp target={stat.n} suffix={stat.s} inView={vis} /> : `0${stat.s}`}
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    {stat.l}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA links */}
            <div style={{ ...stagger(3), display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a href="#work"
                onClick={e => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 24px', borderRadius: '8px',
                  background: 'rgba(56,189,248,0.12)',
                  border: '1px solid rgba(56,189,248,0.3)',
                  color: '#38BDF8', fontWeight: 600, fontSize: '13px',
                  textDecoration: 'none', letterSpacing: '0.3px',
                  transition: 'background 0.25s, border-color 0.25s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.2)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.5)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.12)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.3)';
                }}>
                View My Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 24px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.75)', fontWeight: 600, fontSize: '13px',
                  textDecoration: 'none', letterSpacing: '0.3px',
                  transition: 'background 0.25s, border-color 0.25s, color 0.25s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLElement).style.color = '#fff';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
                }}>
                Let&apos;s Talk →
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom accent */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(129,140,248,0.4) 50%, transparent)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
