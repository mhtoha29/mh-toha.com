'use client';

const ROW_A = ['AI-POWERED WEBSITES', 'NEXT.JS', 'ERP SOFTWARE', 'CUSTOM CRM', 'THREE.JS', 'PYTHON AUTOMATION', 'CEO DASHBOARDS', 'BRAND IDENTITY'];
const ROW_B = ['40+ PROJECTS SHIPPED', 'DHAKA → WORLDWIDE', '25+ BRANDS', 'TEX-IT AGENCY', 'BYV TECH', 'MACHINE LEARNING', 'SEO', 'WORDPRESS'];

function Row({ items, reverse, outlined }: { items: string[]; reverse?: boolean; outlined?: boolean }) {
  // duplicate for seamless -50% loop
  const seq = [...items, ...items];
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex' }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '28px',
          paddingRight: '28px',
          animation: `${reverse ? 'marquee-r' : 'marquee'} ${reverse ? 46 : 38}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {seq.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '28px', flexShrink: 0 }}>
            <span
              style={{
                fontSize: 'clamp(28px, 4.5vw, 56px)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                ...(outlined
                  ? {
                      color: 'transparent',
                      WebkitTextStroke: '1.5px rgba(15,23,42,0.18)',
                    }
                  : {
                      color: 'var(--navy)',
                    }),
              }}
            >
              {item}
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.75 }}>
              <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" fill="#0EA5E9" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      aria-hidden
      style={{
        padding: '56px 0',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border2)',
        borderBottom: '1px solid var(--border2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse outlined />

      {/* edge fades */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '12%', background: 'linear-gradient(90deg, var(--bg), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '12%', background: 'linear-gradient(270deg, var(--bg), transparent)', pointerEvents: 'none' }} />
    </section>
  );
}
