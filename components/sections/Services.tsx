'use client';
import { useEffect, useRef, useState } from 'react';

const SERVICES = [
  {
    num: '01',
    color: '#0EA5E9',
    bg: 'rgba(14,165,233,0.08)',
    border: 'rgba(14,165,233,0.20)',
    category: 'AI & Web',
    title: 'AI-Powered Websites & Apps',
    desc: 'Full-stack web apps with AI built in — ChatGPT, Claude, and custom ML. Smart chatbots, intelligent features, and automation using React, Next.js & Python.',
    features: ['Next.js / React', 'ChatGPT & Claude API', 'Python ML pipelines', 'AI chatbots'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    ),
  },
  {
    num: '02',
    color: '#818CF8',
    bg: 'rgba(129,140,248,0.08)',
    border: 'rgba(129,140,248,0.22)',
    category: 'Enterprise',
    title: 'ERP & Business Software',
    desc: 'Custom enterprise software built for your exact workflow — ERP systems, hospital management, employee attendance, and operations tools that replace generic software.',
    features: ['ERP systems', 'Hospital management', 'Employee attendance', 'Operations software'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="9" height="9" rx="1" />
        <rect x="13" y="3" width="9" height="9" rx="1" />
        <rect x="2" y="13" width="9" height="9" rx="1" />
        <rect x="13" y="13" width="9" height="9" rx="1" />
      </svg>
    ),
  },
  {
    num: '03',
    color: '#22D3EE',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.20)',
    category: 'CRM',
    title: 'Custom CRM Systems',
    desc: 'Purpose-built CRM tailored to how your team sells — lead pipelines, deal tracking, client dashboards, and automated follow-ups. No bloat, no unused features.',
    features: ['Lead pipelines', 'Deal & client tracking', 'Client dashboards', 'Sales automation'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    num: '04',
    color: '#34D399',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.20)',
    category: 'Analytics',
    title: 'CEO Dashboards & Analytics',
    desc: 'Executive-level visibility into your business — real-time KPI dashboards, team performance tracking, and automated reports. Make decisions from data, not guesswork.',
    features: ['KPI dashboards', 'Real-time metrics', 'Team performance', 'Automated reporting'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <path d="M2 20h20" />
      </svg>
    ),
  },
  {
    num: '05',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.20)',
    category: 'Digital Presence',
    title: 'Digital Company Profile',
    desc: 'Professional company websites and brand identity that convert visitors into clients — custom-coded or WordPress, SEO-optimised, and designed to represent your business at its best.',
    features: ['Company websites', 'Brand identity & logo', 'WordPress & custom', 'SEO optimisation'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    num: '06',
    color: '#6366F1',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.20)',
    category: 'Automation',
    title: 'Workflow Automation',
    desc: 'Eliminate manual work with Python-powered automation — data pipelines, API integrations, scheduled tasks, and smart workflows that run your business operations in the background.',
    features: ['Python automation', 'API integrations', 'Data pipelines', 'Scheduled workflows'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

function ServiceCard({ s, vis, i }: { s: typeof SERVICES[0]; vis: boolean; i: number }) {
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateY(0)';
    setHov(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      style={{
        padding: '26px 24px 24px',
        background: '#fff',
        borderRadius: '16px',
        borderLeft: `1px solid ${hov ? s.color + '35' : 'rgba(15,23,42,0.07)'}`,
        borderRight: `1px solid ${hov ? s.color + '35' : 'rgba(15,23,42,0.07)'}`,
        borderBottom: `1px solid ${hov ? s.color + '35' : 'rgba(15,23,42,0.07)'}`,
        borderTop: `3px solid ${s.color}`,
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.25s',
        boxShadow: hov
          ? `0 20px 40px ${s.color}14, 0 4px 16px rgba(0,0,0,0.06)`
          : '0 2px 8px rgba(0,0,0,0.04)',
        opacity: vis ? 1 : 0,
        transitionDelay: `${0.08 + i * 0.09}s`,
        cursor: 'default',
      }}>

      {/* Number watermark */}
      <div style={{
        position: 'absolute', top: '14px', right: '18px',
        fontSize: '52px', fontWeight: 900,
        color: `${s.color}0E`,
        lineHeight: 1, userSelect: 'none',
        transition: 'color 0.3s',
        ...(hov ? { color: `${s.color}1A` } : {}),
      }}>{s.num}</div>

      {/* Icon */}
      <div style={{
        width: '46px', height: '46px',
        borderRadius: '11px',
        background: s.bg,
        border: `1px solid ${s.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: s.color, marginBottom: '16px',
        transition: 'box-shadow 0.3s',
        ...(hov ? { boxShadow: `0 0 20px ${s.color}25` } : {}),
      }}>
        {s.icon}
      </div>

      {/* Category chip */}
      <span style={{
        display: 'inline-block',
        fontSize: '9px', fontWeight: 700, letterSpacing: '1.2px',
        textTransform: 'uppercase',
        color: s.color,
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: '4px',
        padding: '2px 8px',
        marginBottom: '10px',
      }}>
        {s.category}
      </span>

      {/* Title */}
      <h3 style={{
        fontSize: 'clamp(15px, 1.3vw, 17px)',
        fontWeight: 700,
        color: 'var(--navy)',
        marginBottom: '10px',
        lineHeight: 1.25,
        letterSpacing: '-0.01em',
      }}>
        {s.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '12.5px',
        lineHeight: 1.7,
        color: 'var(--muted)',
        marginBottom: '18px',
      }}>
        {s.desc}
      </p>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: hov ? `${s.color}20` : 'rgba(15,23,42,0.06)',
        marginBottom: '14px',
        transition: 'background 0.25s',
      }} />

      {/* Features */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {s.features.map((f, j) => (
          <li key={j} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontSize: '12px', color: 'var(--slate)',
          }}>
            <div style={{
              width: '4px', height: '4px', borderRadius: '50%',
              background: s.color, flexShrink: 0,
            }} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Services() {
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

  return (
    <section id="services" className="section" style={{ background: 'var(--bg)' }}>
      <div className="sec-number">03</div>
      <div className="container" ref={ref}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '60px',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s, transform 0.7s',
        }}>
          <span className="label" style={{ marginBottom: '14px', display: 'block' }}>03 — What I Deliver</span>

          <h2 className="display-lg" style={{ marginBottom: '10px' }}>
            Helping Founders Build
          </h2>
          <h2 className="display-lg" style={{
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Smarter Businesses
          </h2>

          <p style={{
            fontSize: '15px', color: 'var(--muted)',
            maxWidth: '540px', margin: '0 auto', lineHeight: 1.75,
          }}>
            AI, websites, automation, and custom software — everything a growing business
            needs to operate smarter, scale faster, and look world-class online.
          </p>
        </div>

        {/* 6-card grid */}
        <div className="rg-3" style={{ gap: '24px' }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} s={s} vis={vis} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
