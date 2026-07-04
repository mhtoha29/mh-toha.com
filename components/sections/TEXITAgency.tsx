'use client';
import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

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

const TEXIT_SERVICES = [
  'Web Design & Development', 'Brand Identity', 'Digital Marketing',
  'SEO & Meta Ads', 'Business Development', 'Video Production',
  'Social Media Management', 'Factory Digital Profiles',
  'Custom Software', 'ERP Software', 'CRM Systems', 'CEO Dashboards',
];

const BYV_SERVICES = [
  'AI Automation', 'Customer Support AI Assistant', 'AI Chatbots',
  'Web Development', 'App Development', 'Custom Software', 'SaaS Products',
  'API Integrations', 'Workflow Automation', 'Cloud & DevOps',
];

/* ─────────────────────────────────────────────
   RMG background — running stitches + garment glyphs
   ───────────────────────────────────────────── */
const RMG_CURVES = [
  'M-20 66 C 110 18, 300 128, 420 72',
  'M-20 168 C 130 224, 280 96, 420 176',
  'M-20 250 C 150 208, 300 286, 420 232',
];

function RMGBackground() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* soft radial depth */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 15% 30%, rgba(14,165,233,0.10) 0%, transparent 55%)' }} />

      {/* satin shimmer sweep */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: '-40%', width: '40%',
        background: 'linear-gradient(105deg, transparent 0%, rgba(125,211,252,0.10) 45%, rgba(186,230,253,0.18) 50%, rgba(125,211,252,0.10) 55%, transparent 100%)',
        filter: 'blur(6px)',
        animation: 'rmgSheen 7s ease-in-out infinite',
      }} />

      <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id="weave" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 12 H24 M12 0 V24" stroke="rgba(14,165,233,0.08)" strokeWidth="1" />
          </pattern>
          <linearGradient id="rmgThread" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#0EA5E9" stopOpacity="0" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
          <filter id="rmgGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect width="400" height="300" fill="url(#weave)" opacity="0.6" />

        {/* Flowing threads — faint base + a light segment that runs along + a glowing needle head */}
        {RMG_CURVES.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="rgba(56,189,248,0.16)" strokeWidth="1" strokeDasharray="4 5" />
            <path d={d} fill="none" stroke="url(#rmgThread)" strokeWidth="1.8" strokeLinecap="round"
              strokeDasharray="26 460" filter="url(#rmgGlow)">
              <animate attributeName="stroke-dashoffset" from="486" to="0" dur={`${4.5 + i}s`} repeatCount="indefinite" />
            </path>
            <circle r="2.6" fill="#BAE6FD" filter="url(#rmgGlow)">
              <animateMotion dur={`${4.5 + i}s`} repeatCount="indefinite" path={d} rotate="auto" />
            </circle>
          </g>
        ))}
      </svg>

      {/* Floating garment glyphs — with glow */}
      {RMG_GLYPHS.map((g, i) => (
        <div key={i} style={{
          position: 'absolute', left: g.left, top: g.top,
          color: 'rgba(125,211,252,0.30)',
          filter: 'drop-shadow(0 0 8px rgba(56,189,248,0.35))',
          animation: `rmgFloat ${g.dur}s ease-in-out ${g.delay}s infinite`,
        }}>
          {g.svg}
        </div>
      ))}

      <style>{`
        @keyframes rmgFloat {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%     { transform: translateY(-18px) rotate(9deg); }
        }
        @keyframes rmgSheen {
          0%   { left: -40%; }
          55%  { left: 130%; }
          100% { left: 130%; }
        }
      `}</style>
    </div>
  );
}

const RMG_GLYPHS = [
  { left: '9%',  top: '22%', dur: 9,  delay: 0,   svg: <TShirtIcon /> },
  { left: '83%', top: '15%', dur: 11, delay: 1.5, svg: <SpoolIcon /> },
  { left: '70%', top: '66%', dur: 10, delay: 0.8, svg: <HangerIcon /> },
  { left: '16%', top: '70%', dur: 12, delay: 2.2, svg: <ButtonIcon /> },
  { left: '47%', top: '12%', dur: 8,  delay: 1.0, svg: <NeedleIcon /> },
];

function TShirtIcon() {
  return <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M4 5l4-2 4 2 4-2 4 2-2 4-2-1v11H8V8L6 9 4 5z"/></svg>;
}
function SpoolIcon() {
  return <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="6" y="3" width="12" height="18" rx="1"/><path d="M6 7h12M6 17h12M9 10h6M9 13h6"/></svg>;
}
function HangerIcon() {
  return <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 7a2 2 0 1 1 2 2c-1 0-2 .8-2 2v1M2 18l10-6 10 6-1 2H3l-1-2z"/></svg>;
}
function ButtonIcon() {
  return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="9"/><circle cx="9.5" cy="9.5" r="1"/><circle cx="14.5" cy="9.5" r="1"/><circle cx="9.5" cy="14.5" r="1"/><circle cx="14.5" cy="14.5" r="1"/></svg>;
}
function NeedleIcon() {
  return <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 21L18 6M18 6l3-3M15 4a2 2 0 0 0 0 4"/></svg>;
}

/* ─────────────────────────────────────────────
   BYV background — rotating globe + orbiting nodes
   ───────────────────────────────────────────── */
// Flight-path arcs (viewBox 400×320) — global connections toward the globe
const TECH_ARCS = [
  { d: 'M40 232 Q 150 70, 300 96',  dur: 3.8, color: '#22D3EE' },
  { d: 'M64 96 Q 210 30, 322 176',  dur: 4.6, color: '#818CF8' },
  { d: 'M34 168 Q 170 250, 300 150', dur: 4.2, color: '#6366F1' },
  { d: 'M96 250 Q 230 150, 320 108', dur: 5.0, color: '#22D3EE' },
];
const TECH_ENDS = [
  { x: 40, y: 232 }, { x: 64, y: 96 }, { x: 34, y: 168 }, { x: 96, y: 250 },
];

function TechBackground() {
  // dotted globe — precomputed meridians/latitudes rendered as dotted ellipses
  const R = 70, CX = 292, CY = 160;
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* depth glow behind globe */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(90% 120% at 78% 50%, rgba(99,102,241,0.14) 0%, transparent 55%)' }} />

      {/* circuit grid */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <defs>
          <pattern id="circuit" width="42" height="42" patternUnits="userSpaceOnUse">
            <path d="M21 0 V15 M21 27 V42 M0 21 H15 M27 21 H42" stroke="rgba(99,102,241,0.10)" strokeWidth="1"/>
            <circle cx="21" cy="21" r="2.5" fill="none" stroke="rgba(34,211,238,0.18)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Main scene */}
      <svg width="100%" height="100%" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <filter id="byvGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="byvSphere" cx="42%" cy="38%" r="70%">
            <stop offset="0%"  stopColor="rgba(34,211,238,0.10)" />
            <stop offset="70%" stopColor="rgba(99,102,241,0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* ── Dotted rotating globe ── */}
        <g style={{ transformOrigin: `${CX}px ${CY}px`, animation: 'byvSpin 34s linear infinite' }}>
          <circle cx={CX} cy={CY} r={R} fill="url(#byvSphere)" stroke="rgba(34,211,238,0.30)" strokeWidth="1" />
          {/* meridians (dotted) — rx animated to fake 3D rotation */}
          {[12, 28, 46, 62].map((rx, i) => (
            <ellipse key={`m${i}`} cx={CX} cy={CY} rx={rx} ry={R} fill="none"
              stroke="rgba(129,140,248,0.30)" strokeWidth="0.8" strokeDasharray="1.5 5">
              <animate attributeName="rx" values={`${rx};${R};${rx}`} dur={`${12 + i * 2}s`} repeatCount="indefinite" />
            </ellipse>
          ))}
          {/* latitudes (dotted) */}
          {[-48, -24, 0, 24, 48].map((dy, i) => {
            const ry = Math.round(Math.sqrt(Math.max(R * R - dy * dy, 0)) * 0.30 * 100) / 100;
            const rx = Math.round(Math.sqrt(Math.max(R * R - dy * dy, 0)) * 100) / 100;
            return (
              <ellipse key={`l${i}`} cx={CX} cy={CY + dy} rx={rx} ry={ry} fill="none"
                stroke="rgba(34,211,238,0.22)" strokeWidth="0.8" strokeDasharray="1.5 5" />
            );
          })}
          {/* glowing city nodes on the globe */}
          {GLOBE_NODES.map((n, i) => (
            <circle key={i} cx={CX + n.dx} cy={CY + n.dy} r="2.6" fill="#7DD3FC" filter="url(#byvGlow)">
              <animate attributeName="opacity" values="0.35;1;0.35" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>

        {/* ── Flight-path arcs + traveling light ── */}
        {TECH_ARCS.map((a, i) => (
          <g key={i}>
            <path d={a.d} fill="none" stroke={a.color} strokeOpacity="0.28" strokeWidth="1" strokeDasharray="3 4" />
            <circle r="2.6" fill={a.color} filter="url(#byvGlow)">
              <animateMotion dur={`${a.dur}s`} repeatCount="indefinite" path={a.d} />
            </circle>
          </g>
        ))}

        {/* ── Pulse rings at origin cities ── */}
        {TECH_ENDS.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="2.4" fill="#6366F1" filter="url(#byvGlow)" />
            <circle cx={p.x} cy={p.y} r="2.4" fill="none" stroke="#6366F1" strokeWidth="1">
              <animate attributeName="r" values="2.4;12;2.4" dur="3s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>

      <style>{`
        @keyframes byvSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// node offsets relative to globe center (within R=70)
const GLOBE_NODES = [
  { dx: -36, dy: -24 }, { dx: 32, dy: -14 }, { dx: 6, dy: -48 },
  { dx: -18, dy: 34 }, { dx: 34, dy: 26 }, { dx: 0, dy: 52 },
];


export default function TEXITAgency() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="agency" className="section" style={{ background: 'linear-gradient(180deg, #0F172A 0%, #0A1628 100%)' }}>
      <div className="sec-number" style={{ color: 'rgba(14,165,233,0.04)' }}>07</div>
      <div className="container" ref={ref}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '64px',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s, transform 0.7s',
        }}>
          <span className="label" style={{ marginBottom: '12px' }}>07 — My Agencies</span>
          <h2 className="display-lg" style={{ color: '#fff', marginBottom: '8px' }}>
            TEX-IT{' '}
            <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>&</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366F1, #22D3EE)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>BYV Tech</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.6 }}>
            Two agencies, one mission — digital excellence for RMG Bangladesh and international AI-powered products.
          </p>
        </div>

        {/* === TEX-IT === */}
        <div style={{
          background: 'rgba(14,165,233,0.04)', border: '1px solid rgba(14,165,233,0.12)',
          borderRadius: '20px', padding: '40px', marginBottom: '32px',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.8s 0.1s, transform 0.8s 0.1s',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--sky), var(--cyan), transparent)', transform: vis ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 1s 0.3s ease', zIndex: 2 }} />

          {/* RMG animated background */}
          <RMGBackground />

          <div className="rg-2" style={{ gap: '48px', alignItems: 'start', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--sky)', boxShadow: '0 0 12px var(--sky)' }} />
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>TEX-IT Agency</span>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: 'var(--sky)', background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)', borderRadius: '4px', padding: '2px 8px', textTransform: 'uppercase' }}>RMG Focused</span>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: '24px' }}>
                Bangladesh&apos;s 10,000+ garment factories compete for global buyers but lack the digital presence to close deals online.
                TEX-IT is the dedicated digital transformation partner for the RMG industry — buyer-facing websites, company profiles,
                custom software, ERP systems, and marketing campaigns that convert international interest into real orders.
              </p>
              <div className="label" style={{ marginBottom: '10px' }}>Services</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {TEXIT_SERVICES.map((s, i) => (
                  <span key={i} style={{
                    fontSize: '10px', fontWeight: 600, letterSpacing: '0.8px', padding: '4px 10px',
                    background: 'rgba(14,165,233,0.07)', color: 'rgba(255,255,255,0.65)',
                    border: '1px solid rgba(14,165,233,0.14)', borderRadius: '20px',
                    opacity: vis ? 1 : 0, transition: `opacity 0.4s ${0.3 + i * 0.04}s`,
                  }}>{s}</span>
                ))}
              </div>
            </div>

            <div>
              {[
                { n: 50,   s: '+', l: 'Clients Served',  c: 'var(--sky)',     sub: 'RMG factories & brands' },
                { n: 12,   s: '',  l: 'Team Members',     c: 'var(--violet)',  sub: 'Designers, devs & marketers' },
                { n: 8,    s: '+', l: 'Services',         c: 'var(--emerald)', sub: 'Full digital suite' },
                { n: 2024, s: '',  l: 'Founded',          c: 'var(--amber)',   sub: "Bangladesh's first RMG IT studio" },
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '20px 24px', marginBottom: '12px',
                  background: 'rgba(255,255,255,0.03)', border: `1px solid ${stat.c}18`,
                  borderRadius: '10px', position: 'relative', overflow: 'hidden',
                  opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(12px)',
                  transition: `opacity 0.6s ${0.25 + i * 0.1}s, transform 0.6s ${0.25 + i * 0.1}s`,
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: stat.c, opacity: 0.6 }} />
                  <div style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: stat.c, lineHeight: 1, marginBottom: '4px' }}>
                    {vis ? <CountUp target={stat.n} suffix={stat.s} inView={vis} /> : `0${stat.s}`}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{stat.l}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{stat.sub}</div>
                </div>
              ))}
              <a href="https://texit.byv.life" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '4px' }}>
                Visit TEX-IT <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* === BYV TECH === */}
        <div style={{
          background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.14)',
          borderRadius: '20px', padding: '40px',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.8s 0.3s, transform 0.8s 0.3s',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #6366F1, #22D3EE, transparent)', transform: vis ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 1s 0.5s ease', zIndex: 2 }} />

          {/* Technology worldwide animated background */}
          <TechBackground />

          <div className="rg-2" style={{ gap: '48px', alignItems: 'start', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#6366F1', boxShadow: '0 0 12px #6366F1' }} />
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>BYV Tech</span>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: '#22D3EE', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: '4px', padding: '2px 8px', textTransform: 'uppercase' }}>International</span>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: '24px' }}>
                BYV Tech is the international arm — full-stack web &amp; app development, AI-powered products, automation platforms,
                and software solutions for global clients. Where TEX-IT serves Bangladesh&apos;s RMG sector, BYV Tech operates at
                international standard: modern websites, web apps, AI assistants, SaaS tools, and custom software for businesses
                that need cutting-edge technology without enterprise complexity.
              </p>
              <div className="label" style={{ marginBottom: '10px' }}>Services</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {BYV_SERVICES.map((s, i) => (
                  <span key={i} style={{
                    fontSize: '10px', fontWeight: 600, letterSpacing: '0.8px', padding: '4px 10px',
                    background: 'rgba(99,102,241,0.08)', color: 'rgba(255,255,255,0.65)',
                    border: '1px solid rgba(99,102,241,0.16)', borderRadius: '20px',
                    opacity: vis ? 1 : 0, transition: `opacity 0.4s ${0.45 + i * 0.04}s`,
                  }}>{s}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '🤖', label: 'AI-First', desc: 'Every product built with AI at its core' },
                { icon: '🌐', label: 'International', desc: 'Global clients, global standards' },
                { icon: '⚡', label: 'Fast Delivery', desc: 'MVPs in weeks, not months' },
                { icon: '🔗', label: 'API Everything', desc: 'Integrated, automated, connected' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.12)',
                  borderRadius: '10px',
                  opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(20px)',
                  transition: `opacity 0.6s ${0.4 + i * 0.1}s, transform 0.6s ${0.4 + i * 0.1}s`,
                }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{item.label}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
              <a href="https://tech.byv.life" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ justifyContent: 'center', color: '#6366F1', borderColor: 'rgba(99,102,241,0.4)', marginTop: '4px' }}>
                Visit BYV Tech <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
