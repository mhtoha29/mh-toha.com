'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const TESTIMONIALS = [
  {
    name: 'Muhammad Mizanur Rahman',
    role: 'CEO',
    company: 'Apparel Horizon Ltd.',
    initials: 'MMR',
    color: '#0EA5E9',
    quote:
      'MH-TOHA transformed our digital presence completely. International buyers now discover us online - the website has directly contributed to new inquiries from European brands we simply couldn\'t reach before. Exceptional quality, on time, every time.',
  },
  {
    name: 'Shruti Chakraborty Borsha',
    role: 'COO',
    company: 'Verdant Source',
    initials: 'SCB',
    color: '#34D399',
    quote:
      'The Verdant Source website perfectly captures our sustainability ethos. TOHA understood our eco-conscious positioning immediately and delivered a design that genuinely resonates with Scandinavian and European buyers. Truly world-class work.',
  },
  {
    name: 'Khairuzzaman Tipu',
    role: 'CEO',
    company: 'Time Sourcing International',
    initials: 'KT',
    color: '#818CF8',
    quote:
      'Professional, fast, and detail-oriented. Our company website went from zero to live in record time and the quality rivals international standards. If you run an RMG business and want to go digital seriously, this is who you call.',
  },
  {
    name: 'Md. Helal Ahmed',
    role: 'Managing Director',
    company: 'Upoma Knit Fashion Ltd.',
    initials: 'MHA',
    color: '#F59E0B',
    quote:
      'Exceptional work quality and communication throughout. TOHA delivered exactly what we envisioned - a professional digital profile that represents our manufacturing capabilities to global fashion brands. Our buyer confidence has improved significantly.',
  },
  {
    name: 'Ibrahim Bin Jalawi Al Subaie',
    role: 'Managing Director',
    company: 'IBJ',
    initials: 'IB',
    color: '#D97706',
    quote:
      'Outstanding digital work for our oil & gas operations. The corporate design language and international SEO strategy far exceeded our expectations. A trusted technology partner we rely on for our expanding business operations.',
  },
];

const STARS = Array(5).fill(0);

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<'next' | 'prev'>('next');
  const [anim, setAnim] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const go = useCallback((next: number, d: 'next' | 'prev') => {
    setDir(d);
    setAnim(true);
    setTimeout(() => {
      setActive(next);
      setAnim(false);
    }, 320);
  }, []);

  const goNext = useCallback(() => go((active + 1) % TESTIMONIALS.length, 'next'), [active, go]);
  const goPrev = useCallback(() => go((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length, 'prev'), [active, go]);

  // Auto-advance every 5s
  useEffect(() => {
    if (!vis) return;
    timer.current = setTimeout(goNext, 5000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [vis, active, goNext]);

  const t = TESTIMONIALS[active];

  const slideOut = anim ? (dir === 'next' ? -40 : 40) : 0;
  const slideIn  = anim ? 0 : 0;

  return (
    <section
      id="testimonials"
      style={{
        padding: '120px 0',
        background: 'linear-gradient(160deg, #06081C 0%, #0A1230 55%, #06081C 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow orbs */}
      <div style={{
        position: 'absolute', top: '20%', left: '15%',
        width: '400px', height: '400px',
        background: `radial-gradient(circle, ${t.color}0A 0%, transparent 70%)`,
        transition: 'background 0.8s ease',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '10%',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="sec-number" style={{ color: 'rgba(14,165,233,0.035)' }}>08</div>

      <div className="container" ref={ref}>
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '72px',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s, transform 0.7s',
        }}>
          <span className="label" style={{ marginBottom: '14px', display: 'block' }}>Client Voices</span>
          <h2 className="display-lg" style={{ color: '#fff', marginBottom: '0' }}>
            What they{' '}
            <span style={{
              background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>say.</span>
          </h2>
        </div>

        {/* Slider card */}
        <div style={{
          maxWidth: '880px', margin: '0 auto',
          opacity: vis ? 1 : 0, transition: 'opacity 0.8s 0.2s',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.035)',
            border: `1px solid ${t.color}25`,
            borderRadius: '24px',
            padding: 'clamp(32px, 5vw, 56px)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'border-color 0.6s ease',
            boxShadow: `0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px ${t.color}10`,
          }}>

            {/* Top accent bar */}
            <div style={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px',
              background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`,
              transition: 'background 0.6s ease',
            }} />

            {/* Quote mark */}
            <div style={{
              position: 'absolute', top: '24px', right: '36px',
              fontSize: '120px', lineHeight: 1,
              color: `${t.color}08`,
              fontFamily: 'Georgia, serif',
              fontWeight: 900,
              transition: 'color 0.6s',
              userSelect: 'none',
            }}>"</div>

            {/* Content - animated */}
            <div style={{
              opacity: anim ? 0 : 1,
              transform: `translateX(${anim ? slideOut : 0}px)`,
              transition: 'opacity 0.32s ease, transform 0.32s ease',
            }}>
              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '28px' }}>
                {STARS.map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={t.color} style={{ opacity: 0.9 }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              {/* Quote text */}
              <blockquote style={{
                fontSize: 'clamp(15px, 1.8vw, 20px)',
                color: 'rgba(255,255,255,0.88)',
                lineHeight: 1.75,
                fontStyle: 'italic',
                marginBottom: '40px',
                fontWeight: 400,
              }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Avatar */}
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: `${t.color}20`,
                  border: `2px solid ${t.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.6s, border-color 0.6s',
                }}>
                  <span style={{
                    fontSize: '13px', fontWeight: 800,
                    color: t.color, letterSpacing: '0.5px',
                    transition: 'color 0.6s',
                  }}>{t.initials}</span>
                </div>

                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: t.color, fontWeight: 600, letterSpacing: '0.5px', transition: 'color 0.6s' }}>
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: '36px', padding: '0 4px',
          }}>
            {/* Prev */}
            <button
              onClick={() => { if (timer.current) clearTimeout(timer.current); goPrev(); }}
              aria-label="Previous"
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.78)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'none', transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => { if (timer.current) clearTimeout(timer.current); go(i, i > active ? 'next' : 'prev'); }}
                  aria-label={`Go to ${item.name}`}
                  style={{
                    width: i === active ? '28px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === active ? t.color : 'rgba(255,255,255,0.18)',
                    border: 'none',
                    cursor: 'none',
                    transition: 'width 0.35s ease, background 0.35s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => { if (timer.current) clearTimeout(timer.current); goNext(); }}
              aria-label="Next"
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.78)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'none', transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: '20px', height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '1px' }}>
            <div style={{
              height: '100%',
              width: `${((active + 1) / TESTIMONIALS.length) * 100}%`,
              background: `linear-gradient(90deg, ${t.color}, ${t.color}80)`,
              borderRadius: '1px',
              transition: 'width 0.4s ease, background 0.6s ease',
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}
