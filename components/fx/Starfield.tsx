'use client';

// Deterministic star positions (SSR-safe — no Math.random at render).
// Generated once at module load with a fixed seed so server & client match.
function makeStars(count: number, seed: number) {
  const stars: { x: number; y: number; s: number; dur: number; delay: number; bright: boolean }[] = [];
  let v = seed;
  const rand = () => { v = (v * 9301 + 49297) % 233280; return v / 233280; };
  for (let i = 0; i < count; i++) {
    const r = rand();
    stars.push({
      x: Math.round(rand() * 1000) / 10,      // %
      y: Math.round(rand() * 1000) / 10,      // %
      s: Math.round((0.8 + rand() * 1.8) * 10) / 10, // px
      dur: Math.round((2.4 + rand() * 4) * 10) / 10,  // s
      delay: Math.round(rand() * 5 * 10) / 10,        // s
      bright: r > 0.82,
    });
  }
  return stars;
}

const STARS = makeStars(46, 12345);

export default function Starfield({ opacity = 1 }: { opacity?: number }) {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity }}>
      {STARS.map((st, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: `${st.s}px`,
            height: `${st.s}px`,
            borderRadius: '50%',
            background: st.bright ? 'rgba(186,230,253,0.95)' : 'rgba(255,255,255,0.75)',
            boxShadow: st.bright
              ? `0 0 ${st.s * 4}px rgba(56,189,248,0.8)`
              : `0 0 ${st.s * 2}px rgba(255,255,255,0.4)`,
            animation: `twinkle ${st.dur}s ease-in-out ${st.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.7); }
          50%      { opacity: 1;    transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
