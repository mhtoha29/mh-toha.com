'use client';
import { ExternalLink } from 'lucide-react';
import Logo from './Logo';
import Starfield from '@/components/fx/Starfield';

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

const LINKS = [
  { label: 'About',       href: '#about' },
  { label: 'Work',        href: '#work' },
  { label: 'Skills',      href: '#skills' },
  { label: 'Experience',  href: '#experience' },
  { label: 'Contact',     href: '#contact' },
  { label: 'TEX-IT ↗',   href: 'https://texit.byv.life', external: true },
];

const SOCIALS = [
  { icon: <LinkedinIcon />, href: 'https://linkedin.com/in/mahmudulhasantoha-mhtoha', label: 'LinkedIn' },
  { icon: <GithubIcon />,   href: 'https://github.com/mhtoha29',                        label: 'GitHub' },
  { icon: <ExternalLink size={16} />, href: 'https://texit.byv.life',                          label: 'Agency' },
];

const FOOTER_PARTICLES = [
  { left: '15%', size: 3.5, color: 'rgba(56,189,248,0.6)',  dur: 16, delay: 0 },
  { left: '35%', size: 3,   color: 'rgba(129,140,248,0.55)', dur: 20, delay: 5 },
  { left: '58%', size: 4,   color: 'rgba(56,189,248,0.55)',  dur: 18, delay: 2 },
  { left: '78%', size: 3,   color: 'rgba(129,140,248,0.5)',  dur: 22, delay: 8 },
  { left: '90%', size: 2.5, color: 'rgba(255,255,255,0.45)', dur: 24, delay: 11 },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #070C18 0%, #05080F 100%)',
      borderTop: '1px solid rgba(14,165,233,0.08)',
      padding: '0 0 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* night-sky starfield across whole footer */}
      <Starfield opacity={0.8} />

      {/* ── GIANT CTA ── */}
      <a
        href="#contact"
        onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
        className="footer-cta"
        style={{
          display: 'block',
          padding: 'clamp(56px, 9vw, 110px) 0',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          textDecoration: 'none',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* premium ambient glow behind the giant CTA */}
        <div aria-hidden style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 'min(900px, 90%)', height: '320px',
          background: 'radial-gradient(ellipse, rgba(14,165,233,0.12) 0%, rgba(99,102,241,0.06) 45%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
          animation: 'footerGlow 8s ease-in-out infinite',
        }} />
        {/* drifting light particles */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {FOOTER_PARTICLES.map((p, k) => (
            <span key={k} style={{
              position: 'absolute', left: p.left, bottom: '-8px',
              width: p.size, height: p.size, borderRadius: '50%',
              background: p.color, boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              animation: `floatUp ${p.dur}s linear ${p.delay}s infinite`, opacity: 0,
            }} />
          ))}
        </div>
        <div className="container" style={{ position: 'relative' }}>
          <div style={{
            fontSize: '12px', fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--sky)', marginBottom: '18px',
          }}>
            Have a project in mind?
          </div>
          <div className="footer-cta-text" style={{
            fontSize: 'clamp(44px, 8.5vw, 120px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(255,255,255,0.35)',
            transition: 'all 0.5s ease',
            whiteSpace: 'nowrap',
          }}>
            LET&apos;S WORK<br />TOGETHER
            <span className="footer-cta-arrow" style={{
              display: 'inline-block',
              marginLeft: 'clamp(12px, 2vw, 28px)',
              transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
              WebkitTextStroke: '0px',
              color: 'var(--sky)',
            }}>→</span>
          </div>
        </div>
        <style>{`
          .footer-cta:hover .footer-cta-text {
            color: #fff;
            -webkit-text-stroke: 1.5px transparent;
          }
          .footer-cta:hover .footer-cta-arrow {
            transform: translateX(18px) rotate(-45deg);
          }
          @keyframes footerGlow {
            0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
            50%      { opacity: 1;   transform: translate(-50%, -50%) scale(1.08); }
          }
          @keyframes floatUp {
            0%   { transform: translateY(0) scale(0.6);    opacity: 0; }
            12%  { opacity: 0.75; }
            85%  { opacity: 0.45; }
            100% { transform: translateY(-320px) scale(1); opacity: 0; }
          }
        `}</style>
      </a>

      <div className="container" style={{ paddingTop: '48px' }}>
        <div className="rg-3" style={{ gap: '48px', marginBottom: '40px' }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: '14px' }}>
              <Logo variant="white" height={22} />
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '220px' }}>
              Engineering. Design. Code.<br />Dhaka, Bangladesh.
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: 'var(--sky)', textTransform: 'uppercase', marginBottom: '16px' }}>Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {LINKS.map(l => (
                <a key={l.href} href={l.href} target={l.external ? '_blank' : undefined} rel="noopener noreferrer"
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--sky)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact + socials */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: 'var(--sky)', textTransform: 'uppercase', marginBottom: '16px' }}>Connect</div>
            <a href="mailto:connect.mhtoha@gmail.com"
              style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: '8px', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
              connect.mhtoha@gmail.com
            </a>
            <a href="tel:+8801716102136"
              style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: '20px' }}>
              +8801716102136
            </a>
            <div style={{ display: 'flex', gap: '12px' }}>
              {SOCIALS.map(s => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(14,165,233,0.15)';
                    e.currentTarget.style.borderColor = 'var(--sky)';
                    e.currentTarget.style.color = 'var(--sky)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="divider" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.15) 30%, rgba(14,165,233,0.15) 70%, transparent)', marginBottom: '24px' }} />

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.3px' }}>
            © 2025 Mahmudul Hasan Toha · MH-TOHA
          </span>
        </div>
      </div>
    </footer>
  );
}
