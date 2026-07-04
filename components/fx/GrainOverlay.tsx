'use client';

// Film-grain texture overlay — the subtle noise that makes flat colors feel printed.
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: '-50%',
        width: '200%',
        height: '200%',
        zIndex: 9000,
        pointerEvents: 'none',
        backgroundImage: NOISE_SVG,
        backgroundRepeat: 'repeat',
        opacity: 0.045,
        animation: 'grainShift 0.9s steps(4) infinite',
      }}
    >
      <style>{`
        @keyframes grainShift {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(-2%, 1%); }
          50%  { transform: translate(1%, -1.5%); }
          75%  { transform: translate(-1%, 2%); }
          100% { transform: translate(0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
