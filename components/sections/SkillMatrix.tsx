'use client';
import { useEffect, useRef, useState } from 'react';
import { TOP_SKILLS } from '@/lib/skills';

// Continent outlines [lng, lat] - lat range −58 to 78
const MAP: [number, number][][] = [
  // ── NORTH AMERICA ──────────────────────────────────────────────
  [[-168,62],[-145,72],[-120,74],[-80,73],[-60,72],[-52,47],[-65,44],
   [-70,42],[-75,40],[-80,32],[-81,25],[-87,18],[-95,15],[-90,15],
   [-85,20],[-90,25],[-97,26],[-100,22],[-110,23],[-115,30],
   [-120,34],[-124,42],[-130,56],[-143,60],[-152,60],[-160,55],
   [-165,60],[-168,62]],
  // ── GREENLAND ──────────────────────────────────────────────────
  [[-18,77],[-15,83],[-44,85],[-60,82],[-58,72],[-42,68],[-22,70],[-18,77]],
  // ── SOUTH AMERICA ──────────────────────────────────────────────
  [[-73,12],[-63,10],[-50,5],[-35,-4],[-36,-12],[-38,-20],
   [-42,-28],[-50,-33],[-55,-40],[-66,-55],[-70,-52],
   [-74,-42],[-70,-25],[-73,-15],[-78,-3],[-77,5],[-73,12]],
  // ── EUROPE (mainland) ──────────────────────────────────────────
  [[-9,36],[-2,36],[10,38],[16,38],[20,38],[26,40],[30,42],
   [32,46],[28,52],[22,55],[18,60],[14,58],[8,52],[2,50],
   [0,48],[-2,46],[-5,44],[-9,40],[-9,36]],
  // ── IBERIAN PENINSULA ──────────────────────────────────────────
  [[-9,44],[-2,44],[4,42],[3,40],[0,38],[-2,36],[-6,36],[-9,36],[-9,44]],
  // ── SCANDINAVIA ────────────────────────────────────────────────
  [[4,56],[8,55],[14,56],[24,60],[28,65],[26,70],[20,72],
   [14,70],[12,65],[8,62],[4,60],[4,56]],
  // ── BRITISH ISLES ──────────────────────────────────────────────
  [[-5,50],[2,51],[2,52],[-2,54],[-5,56],[-6,58],[-2,59],
   [0,58],[-2,56],[-3,52],[-5,50]],
  // ── AFRICA ─────────────────────────────────────────────────────
  [[-18,16],[0,16],[16,16],[32,14],[36,14],[38,12],
   [42,10],[44,10],[44,2],[40,-5],[36,-18],
   [26,-34],[18,-34],[12,-28],[8,-5],[5,5],[0,8],
   [-16,8],[-18,14],[-18,16]],
  // ── HORN OF AFRICA (Somalia) ───────────────────────────────────
  [[38,12],[44,10],[52,12],[52,2],[42,-2],[38,2],[36,6],[38,12]],
  // ── ARABIAN PENINSULA (Saudi Arabia clearly outlined) ──────────
  [[36,29],[37,26],[37,22],[39,16],[42,13],[46,12],
   [48,13],[50,15],[54,18],[57,20],[58,22],[58,25],
   [56,24],[55,25],[51,24],[51,26],[50,27],[48,29],
   [47,30],[46,31],[42,32],[38,32],[36,29]],
  // ── TURKEY / ANATOLIA ──────────────────────────────────────────
  [[26,38],[36,42],[40,40],[44,38],[44,36],[36,36],[28,36],[26,38]],
  // ── INDIA ──────────────────────────────────────────────────────
  [[68,24],[72,22],[72,8],[78,8],[80,14],[88,22],
   [92,22],[86,26],[80,30],[72,34],[66,28],[68,24]],
  // ── SE ASIA ────────────────────────────────────────────────────
  [[100,2],[104,1],[108,2],[110,-1],[112,-4],
   [108,-7],[104,-7],[102,-4],[100,2]],
  // ── RUSSIA / NORTH ASIA ────────────────────────────────────────
  [[30,70],[60,73],[90,75],[120,76],[150,72],[165,60],
   [155,50],[140,44],[130,35],[120,22],[100,10],[80,10],
   [60,22],[50,30],[40,38],[36,42],[38,50],[36,60],
   [42,66],[60,68],[90,72],[120,74],[150,70],[165,60]],
  // ── CHINA / EAST ASIA ──────────────────────────────────────────
  [[80,35],[90,28],[100,22],[110,18],[120,22],[130,35],
   [125,40],[122,50],[110,54],[100,53],[90,48],[80,40],[80,35]],
  // ── KOREAN PENINSULA ───────────────────────────────────────────
  [[126,34],[128,38],[130,36],[128,34],[126,34]],
  // ── JAPAN ──────────────────────────────────────────────────────
  [[130,32],[133,34],[136,36],[140,40],[144,44],
   [142,42],[138,36],[132,33],[130,32]],
  // ── AUSTRALIA ──────────────────────────────────────────────────
  [[114,-22],[120,-17],[128,-14],[136,-12],[140,-18],
   [148,-22],[152,-26],[154,-36],[148,-38],[142,-38],
   [136,-36],[128,-32],[120,-28],[114,-26],[114,-22]],
  // ── NEW ZEALAND (simplified) ───────────────────────────────────
  [[172,-37],[175,-38],[178,-38],[178,-40],[175,-41],[172,-39],[172,-37]],
];

const CITIES = [
  { id: 'dhaka',    name: 'DHAKA',     lat: 23.8,  lng: 90.4,  color: '#38BDF8', r: 5.5, hub: true },
  { id: 'dubai',    name: 'DUBAI',     lat: 25.2,  lng: 55.3,  color: '#F59E0B', r: 4 },
  { id: 'london',   name: 'LONDON',    lat: 51.5,  lng: -0.1,  color: '#A78BFA', r: 4 },
  { id: 'newyork',  name: 'NEW YORK',  lat: 40.7,  lng: -74.0, color: '#22D3EE', r: 4 },
  { id: 'sg',       name: 'SINGAPORE', lat: 1.3,   lng: 103.8, color: '#34D399', r: 3.5 },
  { id: 'sydney',   name: 'SYDNEY',    lat: -33.9, lng: 151.2, color: '#FB923C', r: 3 },
  { id: 'toronto',  name: 'TORONTO',   lat: 43.7,  lng: -79.4, color: '#818CF8', r: 3 },
] as const;

// Pairs [from, to] - all route through Dhaka (0) as hub
const ARCS: [number, number][] = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,2],[2,6],[4,5],
];

const LAT_MAX = 78, LAT_MIN = -58;
function geo2px(lng: number, lat: number, W: number, H: number) {
  return {
    x: (lng + 180) / 360 * W,
    y: (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * H,
  };
}

export default function SkillMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.04 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // World map canvas animation
  useEffect(() => {
    if (!vis) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    let ctx: CanvasRenderingContext2D | null = null;
    let rafId = 0;
    let t = 0;
    let disposed = false;
    let isVisible = true;
    let loopRunning = false;

    const setup = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx = canvas.getContext('2d');
      if (ctx) { ctx.scale(dpr, dpr); }
    };

    const frame = () => {
      if (disposed || !ctx || !W || !H) return;
      if (!isVisible) { loopRunning = false; return; }
      ctx.clearRect(0, 0, W, H);

      // ── Graticule (matches LAT_MAX/LAT_MIN range) ──
      ctx.lineWidth = 0.4;
      ctx.strokeStyle = 'rgba(56,189,248,0.07)';
      for (let lat = -50; lat <= 75; lat += 25) {
        const y = geo2px(0, lat, W, H).y;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      for (let lng = -180; lng <= 180; lng += 30) {
        const x = geo2px(lng, 0, W, H).x;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }

      // ── Continent fills & outlines ──
      MAP.forEach(poly => {
        ctx!.beginPath();
        poly.forEach(([lng, lat], i) => {
          const p = geo2px(lng, lat, W, H);
          i === 0 ? ctx!.moveTo(p.x, p.y) : ctx!.lineTo(p.x, p.y);
        });
        ctx!.closePath();
        ctx!.fillStyle = 'rgba(56,189,248,0.055)';
        ctx!.fill();
        ctx!.strokeStyle = 'rgba(56,189,248,0.28)';
        ctx!.lineWidth = 0.65;
        ctx!.stroke();
      });

      // ── Connection arcs ──
      ARCS.forEach(([fi, ti], ci) => {
        const from = CITIES[fi], to = CITIES[ti];
        const p1 = geo2px(from.lng, from.lat, W, H);
        const p2 = geo2px(to.lng, to.lat, W, H);
        const mx = (p1.x + p2.x) / 2;
        const my = Math.min(p1.y, p2.y) - Math.abs(p2.x - p1.x) * 0.3;

        // Static arc
        ctx!.beginPath();
        ctx!.moveTo(p1.x, p1.y);
        ctx!.quadraticCurveTo(mx, my, p2.x, p2.y);
        ctx!.strokeStyle = from.color + '28';
        ctx!.lineWidth = 0.9;
        ctx!.stroke();

        // Moving particle
        const phase = (t * 0.65 + ci * 0.11) % 1;
        const qx = (1-phase)*(1-phase)*p1.x + 2*(1-phase)*phase*mx + phase*phase*p2.x;
        const qy = (1-phase)*(1-phase)*p1.y + 2*(1-phase)*phase*my + phase*phase*p2.y;
        const pg = ctx!.createRadialGradient(qx, qy, 0, qx, qy, 5);
        pg.addColorStop(0, from.color + 'FF');
        pg.addColorStop(1, from.color + '00');
        ctx!.fillStyle = pg;
        ctx!.beginPath(); ctx!.arc(qx, qy, 5, 0, Math.PI * 2); ctx!.fill();
      });

      // ── City nodes ──
      CITIES.forEach((city, ci) => {
        const p = geo2px(city.lng, city.lat, W, H);

        // Outer pulse ring
        const pulseT = (t * 0.9 + ci * 0.2) % 1;
        const pulseR = city.r + pulseT * 20;
        const pa = (1 - pulseT) * 0.38;
        ctx!.beginPath(); ctx!.arc(p.x, p.y, pulseR, 0, Math.PI * 2);
        ctx!.strokeStyle = city.color + Math.floor(pa * 255).toString(16).padStart(2, '0');
        ctx!.lineWidth = 1;
        ctx!.stroke();

        // Glow halo
        const g = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, 18);
        g.addColorStop(0, city.color + '55'); g.addColorStop(1, city.color + '00');
        ctx!.fillStyle = g;
        ctx!.beginPath(); ctx!.arc(p.x, p.y, 18, 0, Math.PI * 2); ctx!.fill();

        // Core dot
        ctx!.fillStyle = city.color;
        ctx!.beginPath(); ctx!.arc(p.x, p.y, city.r, 0, Math.PI * 2); ctx!.fill();
        ctx!.fillStyle = 'rgba(255,255,255,0.9)';
        ctx!.beginPath(); ctx!.arc(p.x, p.y, city.r * 0.4, 0, Math.PI * 2); ctx!.fill();

        // City name
        ctx!.font = `700 8px "Plus Jakarta Sans",sans-serif`;
        ctx!.fillStyle = city.color;
        ctx!.textAlign = 'center';
        ctx!.fillText(city.name, p.x, p.y - city.r - 7);

        // Hub badge
        if ('hub' in city) {
          ctx!.font = `600 6.5px "Plus Jakarta Sans",sans-serif`;
          ctx!.fillStyle = city.color + 'CC';
          ctx!.fillText('● BASE', p.x, p.y + city.r + 10);
        }
      });

      t += 0.004;
      rafId = requestAnimationFrame(frame);
    };

    setup();
    loopRunning = true;
    frame();

    // Pause the animation entirely once this canvas scrolls out of view -
    // otherwise it keeps drawing at 60fps for the rest of the session.
    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !loopRunning) {
        loopRunning = true;
        frame();
      }
    }, { threshold: 0 });
    io.observe(canvas);

    const onResize = () => setup();
    window.addEventListener('resize', onResize);
    return () => {
      disposed = true;
      io.disconnect();
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, [vis]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(160deg, #06081C 0%, #0A1230 55%, #06081C 100%)',
        padding: '88px 0 72px',
        position: 'relative',
        overflow: 'hidden',
      }}>

      {/* Section number watermark */}
      <div className="sec-number" style={{ color: 'rgba(56,189,248,0.04)' }}>04</div>

      {/* Header */}
      <div className="container">
        <div style={{
          textAlign: 'center', marginBottom: '36px',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s, transform 0.7s',
        }}>
          <span className="label" style={{ color: '#38BDF8', marginBottom: '14px', display: 'block' }}>
            04 - Skill Matrix
          </span>
          <h2 className="display-lg" style={{ color: '#fff', marginBottom: '14px', lineHeight: 1.05 }}>
            Connected.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #38BDF8 0%, #818CF8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Globally.</span>
          </h2>
          <p style={{
            fontSize: '14px', color: 'rgba(255,255,255,0.66)',
            maxWidth: '440px', margin: '0 auto', lineHeight: 1.75,
          }}>
            Delivering digital solutions from Dhaka to clients across the globe -
            RMG supply chains, oil &amp; gas operations, personal brands, enterprise software.
          </p>
        </div>
      </div>

      {/* Full-bleed world map canvas */}
      <div style={{ position: 'relative', width: '100%', height: isMobile ? '280px' : '420px', marginBottom: '44px' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

        {/* Edge vignettes - fade canvas into section bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(90deg, #06081C 0%, transparent 7%, transparent 93%, #06081C 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, #06081C 0%, transparent 15%, transparent 85%, #06081C 100%)',
        }} />
      </div>

      {/* Skill tiles - dark styled 4-col grid */}
      <div className="container">
        <div className="rg-4" style={{ gap: '12px' }}>
          {TOP_SKILLS.map((skill, i) => (
            <div key={i} style={{
              padding: '16px 18px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(56,189,248,0.1)',
              borderRadius: '12px',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(14px)',
              transition: `opacity 0.5s ${0.3 + i * 0.06}s, transform 0.5s ${0.3 + i * 0.06}s`,
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '10px',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff', letterSpacing: '0.2px' }}>
                  {skill.name}
                </span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#38BDF8' }}>
                  {skill.level}%
                </span>
              </div>
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: '2px',
                  background: 'linear-gradient(90deg, #38BDF8, #818CF8)',
                  transformOrigin: 'left',
                  transform: vis ? `scaleX(${skill.level / 100})` : 'scaleX(0)',
                  transition: `transform 0.9s ${0.35 + i * 0.07}s cubic-bezier(0.4,0,0.2,1)`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
