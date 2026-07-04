'use client';
import Image from 'next/image';
import { useState } from 'react';

type Cat = 'RMG' | 'Oil & Gas' | 'Personal Brand' | 'Industrial';

const CAT: Record<Cat, { color: string; bg: string; accent: string }> = {
  'RMG':            { color: '#0EA5E9', bg: 'rgba(14,165,233,0.08)',  accent: 'linear-gradient(90deg,#0EA5E9,#06B6D4)' },
  'Oil & Gas':      { color: '#D97706', bg: 'rgba(245,158,11,0.10)',  accent: 'linear-gradient(90deg,#F59E0B,#EF4444)' },
  'Personal Brand': { color: '#7C3AED', bg: 'rgba(139,92,246,0.08)', accent: 'linear-gradient(90deg,#8B5CF6,#EC4899)' },
  'Industrial':     { color: '#059669', bg: 'rgba(16,185,129,0.08)',  accent: 'linear-gradient(90deg,#10B981,#0EA5E9)' },
};

const CLIENTS: { src: string; alt: string; desc: string; url: string; cat: Cat; featured?: boolean }[] = [
  {
    src: '/images/logos/abj-apparel.png',
    alt: 'ABJ Apparel',
    desc: 'Garment export & RMG buying house',
    url: 'https://apparel.binjalawi.com/', cat: 'RMG', featured: true,
  },
  {
    src: '/images/logos/verdant-source.png',
    alt: 'Verdant Source',
    desc: 'Eco-conscious textile sourcing firm',
    url: 'https://verdant.binjalawi.com/', cat: 'RMG', featured: true,
  },
  {
    src: '/images/logos/texora.png',
    alt: 'Texora Apparel',
    desc: 'Textile & apparel manufacturing brand',
    url: 'https://texora.byv.life/', cat: 'RMG', featured: true,
  },
  {
    src: '/images/logos/fusion-tex.png',
    alt: 'Fusion Tex Global',
    desc: 'Global textile solutions & RMG supplier',
    url: 'https://fusiontexglobal.byv.life/', cat: 'RMG', featured: true,
  },
  {
    src: '/images/logos/apparel-horizon.png',
    alt: 'Apparel Horizon',
    desc: 'Apparel sourcing & buying house',
    url: 'https://apparel.binjalawi.com/', cat: 'RMG',
  },
  {
    src: '/images/logos/time-sourcing.png',
    alt: 'Time Sourcing Intl.',
    desc: 'International garment buying agent',
    url: 'https://timesourcingbd.com', cat: 'RMG',
  },
  {
    src: '/images/logos/ibj-apparel.png',
    alt: 'IBJ',
    desc: 'Oil & gas industrial support & operations',
    url: 'https://binjalawi.com/', cat: 'Oil & Gas',
  },
  {
    src: '/images/logos/nazmun-nahar.jpg',
    alt: 'Nazmun Nahar',
    desc: 'Personal brand & lifestyle website',
    url: 'https://nazmunnahar.com', cat: 'Personal Brand',
  },
  {
    src: '/images/logos/bd-apparel.png',
    alt: 'BD Apparel',
    desc: 'Ready-made garment manufacturer',
    url: 'https://bdapparel.byv.life/', cat: 'RMG',
  },
  {
    src: '/images/logos/vertex-sourcing.png',
    alt: 'Vertex Sourcing',
    desc: 'Apparel sourcing & merchandising',
    url: 'https://vertexsourcing.byv.life/', cat: 'RMG',
  },
  {
    src: '/images/logos/iconic-apparel.png',
    alt: 'Iconic Apparel',
    desc: 'Premium lifestyle apparel brand',
    url: 'https://iconic.apparelhorizon.com/', cat: 'RMG',
  },
  {
    src: '/images/logos/origin-apparel.png',
    alt: 'Orijin Apparel',
    desc: 'Sustainable apparel sourcing company',
    url: 'https://originapparel.byv.life/', cat: 'RMG',
  },
  {
    src: '/images/logos/asm-drilling.png',
    alt: 'ASM Drilling Support',
    desc: 'Oil & gas drilling services company',
    url: 'https://asmdrillingsupport.com/', cat: 'Oil & Gas',
  },
  {
    src: '/images/logos/fci-group.png',
    alt: 'FCI Group',
    desc: 'Multi-sector industrial conglomerate',
    url: 'https://fcibd.com/', cat: 'Industrial',
  },
  {
    src: '/images/logos/second-basic-needs.png',
    alt: 'Second Basic Needs',
    desc: 'Lifestyle & essential goods brand',
    url: 'https://secondbasicneeds.com/', cat: 'Industrial',
  },
  {
    src: '/images/logos/nexora-apparel.png',
    alt: 'Nexora Apparel',
    desc: 'Modern fashion & apparel brand',
    url: 'https://nexoraapparel.byv.life/', cat: 'RMG',
  },
  {
    src: '/images/logos/nt-apparel.png',
    alt: 'NT Apparel',
    desc: 'Garment manufacturer & exporter',
    url: 'https://www.ntapparelbd.com', cat: 'RMG',
  },
  {
    src: '/images/logos/upoma-knit.jpg',
    alt: 'Upoma Knit Fashion Ltd.',
    desc: 'Knit garment manufacturer & RMG exporter',
    url: 'https://www.upomaknit.com/', cat: 'RMG',
  },
];

function ClientCard({ client }: { client: typeof CLIENTS[0] }) {
  const [hov, setHov] = useState(false);
  const c = CAT[client.cat];
  const hasUrl = client.url !== '#';

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        borderRadius: '16px',
        border: `1px solid ${hov ? c.color + '50' : 'rgba(15,23,42,0.07)'}`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
        boxShadow: hov
          ? `0 20px 48px ${c.color}18, 0 4px 16px rgba(0,0,0,0.06)`
          : client.featured
          ? '0 4px 16px rgba(14,165,233,0.08), 0 1px 4px rgba(0,0,0,0.04)'
          : '0 1px 6px rgba(0,0,0,0.05)',
        transform: hov ? 'translateY(-5px)' : 'translateY(0)',
        cursor: 'default',
      }}>

      {/* Category accent top bar */}
      <div style={{ height: '3px', background: hov ? c.accent : client.featured ? c.accent : 'rgba(15,23,42,0.06)', transition: 'background 0.3s' }} />

      {/* Logo area */}
      <div style={{
        padding: '22px 20px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: hov ? c.bg : 'transparent',
        transition: 'background 0.25s',
        minHeight: '88px',
      }}>
        <div style={{
          position: 'relative', width: '120px', height: '52px',
          filter: hov ? 'none' : 'grayscale(55%)',
          opacity: hov ? 1 : 0.78,
          transition: 'filter 0.3s, opacity 0.3s',
        }}>
          <Image src={client.src} alt={client.alt} fill style={{ objectFit: 'contain' }} sizes="120px" />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Category pill */}
        <div style={{ marginBottom: '8px' }}>
          <span style={{
            display: 'inline-block',
            fontSize: '9px', fontWeight: 700, letterSpacing: '1px',
            textTransform: 'uppercase',
            color: c.color,
            background: c.bg,
            border: `1px solid ${c.color}30`,
            borderRadius: '4px',
            padding: '2px 7px',
          }}>
            {client.cat}
          </span>
        </div>

        {/* Name */}
        <div style={{
          fontSize: '13px', fontWeight: 700,
          color: 'var(--navy)', marginBottom: '5px',
          letterSpacing: '-0.01em',
        }}>
          {client.alt}
        </div>

        {/* Description */}
        <div style={{
          fontSize: '10.5px', lineHeight: 1.55,
          color: 'var(--muted)',
          marginBottom: '14px', flex: 1,
        }}>
          {client.desc}
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: hov ? `${c.color}22` : 'rgba(15,23,42,0.06)',
          marginBottom: '12px',
          transition: 'background 0.25s',
        }} />

        {/* View Website */}
        {hasUrl ? (
          <a
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.8px',
              textTransform: 'uppercase', textDecoration: 'none',
              color: hov ? c.color : 'var(--muted)',
              transition: 'color 0.25s',
            }}>
            View Website
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        ) : (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.8px',
            textTransform: 'uppercase',
            color: 'rgba(100,116,139,0.4)',
          }}>
            View Website
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.5 }}>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section style={{
      padding: '88px 0',
      background: 'var(--bg)',
      borderTop: '1px solid var(--border2)',
      borderBottom: '1px solid var(--border2)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle bg gradient */}
      <div style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(14,165,233,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="label" style={{ display: 'block', marginBottom: '12px' }}>Trusted By</span>
          <h2 className="display-md" style={{ marginBottom: '12px' }}>25+ Brands &amp; Projects</h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            From Bangladesh RMG factories to oil &amp; gas rigs, mining operations to personal brands -
            complete digital solutions, delivered.
          </p>

          {/* Industry tags */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '20px' }}>
            {(['RMG', 'Oil & Gas', 'Personal Brand', 'Industrial'] as Cat[]).map(cat => (
              <span key={cat} style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.8px',
                textTransform: 'uppercase', padding: '4px 12px',
                background: CAT[cat].bg,
                color: CAT[cat].color,
                border: `1px solid ${CAT[cat].color}30`,
                borderRadius: '20px',
              }}>
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* All clients - 4 per row */}
        <div className="client-grid">
          {CLIENTS.map((c, i) => (
            <ClientCard key={i} client={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
