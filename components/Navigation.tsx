'use client';
import { useEffect, useState } from 'react';
import Logo from './Logo';

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Work',       href: '#work' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 72);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? scrollY / docH : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '2px', zIndex: 1001,
        background: 'var(--grad-sky)',
        width: `${progress * 100}%`,
        transition: 'width 0.1s linear',
      }} />

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '64px',
        display: 'flex', alignItems: 'center', zIndex: 1000,
        background: (scrolled || menuOpen) ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: (scrolled || menuOpen) ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: (scrolled || menuOpen) ? 'blur(16px)' : 'none',
        borderBottom: (scrolled || menuOpen) ? '1px solid rgba(14,165,233,0.12)' : '1px solid transparent',
        transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

          {/* Logo */}
          <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', cursor: 'none' }}>
            <Logo variant="navy" height={32} priority />
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="nav-links">
            {LINKS.map(l => (
              <a key={l.href} href={l.href}
                onClick={e => { e.preventDefault(); scrollTo(l.href); }}
                style={{
                  fontSize: '13px', fontWeight: 500, color: 'var(--muted)',
                  textDecoration: 'none', letterSpacing: '0.5px',
                  transition: 'color 0.2s', cursor: 'none',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--sky)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="#contact"
              onClick={e => { e.preventDefault(); scrollTo('#contact'); }}
              className="btn-primary"
              style={{ padding: '10px 24px', fontSize: '11px' }}>
              Hire Me
            </a>

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setMenuOpen(p => !p)}
              aria-label="Menu"
              style={{
                display: 'none', background: 'none', border: 'none', cursor: 'pointer',
                padding: '8px', gap: '5px', flexDirection: 'column', alignItems: 'center',
              }}
              className="hamburger">
              <span style={{
                display: 'block', width: '22px', height: '2px', background: 'var(--navy)',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
              }} />
              <span style={{
                display: 'block', width: '22px', height: '2px', background: 'var(--navy)',
                opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s',
              }} />
              <span style={{
                display: 'block', width: '22px', height: '2px', background: 'var(--navy)',
                transition: 'transform 0.3s',
                transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
              }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay - premium dark */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'linear-gradient(165deg, #06081C 0%, #0A1230 55%, #05060F 100%)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        opacity: menuOpen ? 1 : 0,
        visibility: menuOpen ? 'visible' : 'hidden',
        transition: 'opacity 0.45s ease, visibility 0.45s',
      }}>
        {/* Aurora glow blobs */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-15%', width: '380px', height: '380px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.16) 0%, transparent 65%)', filter: 'blur(30px)',
          animation: menuOpen ? 'blobMove1 18s ease-in-out infinite' : 'none', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-12%', left: '-12%', width: '320px', height: '320px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 65%)', filter: 'blur(34px)',
          animation: menuOpen ? 'blobMove2 22s ease-in-out infinite' : 'none', pointerEvents: 'none',
        }} />
        {/* blueprint grid */}
        <div className="blueprint-bg" style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }} />

        {/* Links */}
        <nav style={{
          flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 32px', position: 'relative', zIndex: 1, maxWidth: '520px', width: '100%', margin: '0 auto',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono, monospace)', fontSize: '10px', letterSpacing: '4px',
            color: 'rgba(56,189,248,0.6)', textTransform: 'uppercase', marginBottom: '28px', paddingLeft: '2px',
            opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'none' : 'translateY(10px)',
            transition: 'opacity 0.5s 0.1s, transform 0.5s 0.1s',
          }}>
            Navigation
          </div>

          {LINKS.map((l, i) => (
            <a key={l.href} href={l.href}
              onClick={e => { e.preventDefault(); scrollTo(l.href); }}
              className="m-menu-link"
              style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '16px 4px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                textDecoration: 'none', position: 'relative',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-24px)',
                transition: `opacity 0.5s ${0.15 + i * 0.07}s, transform 0.5s ${0.15 + i * 0.07}s`,
              }}>
              <span style={{
                fontFamily: 'var(--font-mono, monospace)', fontSize: '12px', fontWeight: 600,
                color: 'rgba(56,189,248,0.75)', minWidth: '28px',
              }}>
                0{i + 1}
              </span>
              <span className="m-menu-label" style={{
                fontSize: 'clamp(28px, 8vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em',
                color: '#fff', flex: 1, lineHeight: 1.1, transition: 'color 0.25s, transform 0.25s',
              }}>
                {l.label}
              </span>
              <svg className="m-menu-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ opacity: 0.35, transition: 'opacity 0.25s, transform 0.25s' }}>
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
          ))}

          {/* CTA */}
          <a href="#contact"
            onClick={e => { e.preventDefault(); scrollTo('#contact'); }}
            style={{
              marginTop: '32px',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              padding: '16px 32px', borderRadius: '100px',
              background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
              color: '#fff', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
              textDecoration: 'none', boxShadow: '0 12px 32px rgba(14,165,233,0.35)',
              opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'none' : 'translateY(16px)',
              transition: 'opacity 0.5s 0.55s, transform 0.5s 0.55s',
            }}>
            Let&apos;s Work Together
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </nav>

        {/* Footer - contact */}
        <div style={{
          position: 'relative', zIndex: 1, padding: '22px 32px 30px',
          maxWidth: '520px', width: '100%', margin: '0 auto',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          opacity: menuOpen ? 1 : 0, transition: 'opacity 0.5s 0.6s',
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34D399', boxShadow: '0 0 8px #34D399' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#34D399', letterSpacing: '0.5px' }}>Open for projects</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <a href="mailto:connect.mhtoha@gmail.com" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              connect.mhtoha@gmail.com
            </a>
            <a href="tel:+8801716102136" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              +880 1716-102136
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
        .m-menu-link:active .m-menu-label { color: #38BDF8; transform: translateX(6px); }
        .m-menu-link:active .m-menu-arrow { opacity: 1; transform: translate(3px,-3px); }
        @media (hover: hover) {
          .m-menu-link:hover .m-menu-label { color: #38BDF8; transform: translateX(6px); }
          .m-menu-link:hover .m-menu-arrow { opacity: 1; transform: translate(3px,-3px); }
        }
      `}</style>
    </>
  );
}
