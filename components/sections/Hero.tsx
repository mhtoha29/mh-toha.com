'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type * as THREE from 'three';
import Magnetic from '@/components/fx/Magnetic';

const NAME_LETTERS = 'MH-TOHA'.split('');

const HERO_STATS = [
  { n: '50+', l: 'Projects' },
  { n: '25+', l: 'Brands' },
  { n: '5+',  l: 'Years' },
  { n: '2',   l: 'Agencies' },
];

const ROLES = [
  'Full-Stack Web Developer.',
  'AI Integration Engineer.',
  '3D Web Experience Creator.',
  'CEO · TEX-IT & BYV Tech.',
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleFade, setRoleFade] = useState(true);
  const [vis, setVis] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleFade(false);
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setRoleFade(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  // Three.js: 3D world globe — Bangladesh HQ → global connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let rafId = 0;
    let disposed = false;
    let isVisible = true;
    let loopRunning = false;

    import('three').then((THREE) => {
      if (disposed) return;

      const W = canvas.offsetWidth || window.innerWidth;
      const H = canvas.offsetHeight || window.innerHeight;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 200);
      camera.position.set(0, 0, 18);

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);

      const allGeos: THREE.BufferGeometry[] = [];
      const allMats: THREE.Material[] = [];
      const group = new THREE.Group();
      scene.add(group);

      const R = isMobile ? 4.5 : 5.5;

      // lat/lon → sphere surface point
      const ll2v = (lat: number, lon: number, r = R) => {
        const phi   = (90 - lat) * Math.PI / 180;
        const theta = (lon + 180) * Math.PI / 180;
        return new THREE.Vector3(
          -r * Math.sin(phi) * Math.cos(theta),
           r * Math.cos(phi),
           r * Math.sin(phi) * Math.sin(theta),
        );
      };

      // ── Globe: dark sphere ──
      const sphereGeo = new THREE.SphereGeometry(R, 48, 24);
      const sphereMat = new THREE.MeshBasicMaterial({ color: 0x040D1A, transparent: true, opacity: 0.6 });
      allGeos.push(sphereGeo); allMats.push(sphereMat);
      group.add(new THREE.Mesh(sphereGeo, sphereMat));

      // ── Globe: lat/lon wireframe ──
      const wGeo = new THREE.SphereGeometry(R * 1.001, 28, 14);
      const wMat = new THREE.LineBasicMaterial({ color: 0x0EA5E9, transparent: true, opacity: 0.11 });
      allGeos.push(wGeo); allMats.push(wMat);
      group.add(new THREE.LineSegments(new THREE.WireframeGeometry(wGeo), wMat));

      // ── Globe: outer glow ──
      const glowGeo = new THREE.SphereGeometry(R * 1.06, 32, 16);
      const glowMat = new THREE.MeshBasicMaterial({ color: 0x0EA5E9, transparent: true, opacity: 0.055, side: THREE.BackSide });
      allGeos.push(glowGeo); allMats.push(glowMat);
      group.add(new THREE.Mesh(glowGeo, glowMat));

      // ── City definitions ──
      const CITIES = [
        { lat: 23.8,  lon:  90.4, isHQ: true  },
        { lat: 38.0,  lon: -95.0, isHQ: false },
        { lat: 51.5,  lon:  -0.1, isHQ: false },
        { lat: 51.0,  lon:  10.0, isHQ: false },
        { lat: 24.7,  lon:  46.7, isHQ: false },
        { lat: 25.2,  lon:  55.3, isHQ: false },
        { lat: -25.0, lon: 133.0, isHQ: false },
        { lat: 35.7,  lon: 139.7, isHQ: false },
        { lat: 56.0,  lon:-106.0, isHQ: false },
      ];

      // ── City dots ──
      CITIES.forEach(c => {
        const pos  = ll2v(c.lat, c.lon);
        const size = c.isHQ ? 0.17 : 0.085;
        const col  = c.isHQ ? 0xef4444 : 0x38BDF8;
        const g = new THREE.SphereGeometry(size, 8, 8);
        const m = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.95 });
        const mesh = new THREE.Mesh(g, m);
        mesh.position.copy(pos);
        group.add(mesh);
        allGeos.push(g); allMats.push(m);
      });

      // ── Bangladesh pulse rings ──
      const BD_POS    = ll2v(23.8, 90.4);
      const BD_NORMAL = BD_POS.clone().normalize();
      type RingData = { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; phase: number };
      const pulseRings: RingData[] = [];
      for (let ri = 0; ri < 3; ri++) {
        const rg = new THREE.RingGeometry(0.22, 0.30, 32);
        const rm = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0, side: THREE.DoubleSide });
        const rmesh = new THREE.Mesh(rg, rm);
        const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), BD_NORMAL);
        rmesh.setRotationFromQuaternion(q);
        rmesh.position.copy(BD_POS.clone().multiplyScalar(1.012));
        group.add(rmesh);
        allGeos.push(rg); allMats.push(rm);
        pulseRings.push({ mesh: rmesh, mat: rm, phase: ri * (Math.PI * 2 / 3) });
      }

      // ── Arc connections Bangladesh → world ──
      const HQ      = BD_POS.clone();
      const TARGETS = CITIES.filter(c => !c.isHQ);
      const N_ARC   = 80;

      type ArcData = {
        line: THREE.Line;
        mat: THREE.LineBasicMaterial;
        geo: THREE.BufferGeometry;
        pts: THREE.Vector3[];
      };

      const arcDatas: ArcData[] = TARGETS.map(tgt => {
        const to  = ll2v(tgt.lat, tgt.lon);
        const mid = new THREE.Vector3().addVectors(HQ, to).normalize().multiplyScalar(R * 1.48);
        const pts: THREE.Vector3[] = [];
        for (let s = 0; s <= N_ARC; s++) {
          const t = s / N_ARC, u = 1 - t;
          pts.push(new THREE.Vector3(
            u*u*HQ.x + 2*u*t*mid.x + t*t*to.x,
            u*u*HQ.y + 2*u*t*mid.y + t*t*to.y,
            u*u*HQ.z + 2*u*t*mid.z + t*t*to.z,
          ));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        geo.setDrawRange(0, 0);
        const mat = new THREE.LineBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0 });
        const line = new THREE.Line(geo, mat);
        group.add(line);
        allGeos.push(geo); allMats.push(mat);
        return { line, mat, geo, pts };
      });

      // ── Arc head dots (travel along arc) ──
      const headDots = arcDatas.map(() => {
        const g = new THREE.SphereGeometry(0.06, 6, 6);
        const m = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
        const mesh = new THREE.Mesh(g, m);
        group.add(mesh);
        allGeos.push(g); allMats.push(m);
        return { mesh, mat: m };
      });

      // Orient globe so Bangladesh faces slightly front-right
      group.rotation.y = -Math.PI * 0.75;

      // ── Animation state ──
      // Phases: 0=intro-spin(2s) → 1=draw-arcs → 2=hold(3s) → 3=fade(1.5s) → 4=pause(0.3s) → back to 1
      let phase = 0;
      let phaseTimer = 0;
      let currentArc = 0;
      let arcDrawT = 0;
      const DT = 1 / 60;

      // ── Animation loop ──
      const animate = () => {
        if (!isVisible) { loopRunning = false; return; }
        rafId = requestAnimationFrame(animate);

        phaseTimer += DT;

        // Continuous slow rotation
        group.rotation.y += phase === 0 ? 0.010 : 0.0025;
        group.rotation.x += 0.0004;

        // Pulse rings — only visible in phase 1+
        pulseRings.forEach(r => {
          r.phase += DT * 1.1;
          const pulse = (r.phase % (Math.PI * 2)) / (Math.PI * 2);
          r.mesh.scale.setScalar(1 + pulse * 3.2);
          r.mat.opacity = phase >= 1 ? (1 - pulse) * 0.65 : 0;
        });

        if (phase === 0) {
          // Intro: rotate globe into position, then start drawing
          if (phaseTimer > 1.8) { phase = 1; phaseTimer = 0; currentArc = 0; arcDrawT = 0; }

        } else if (phase === 1) {
          // Draw arcs sequentially
          if (currentArc < arcDatas.length) {
            arcDrawT += DT * 1.6;
            const steps = Math.min(Math.floor(arcDrawT * N_ARC), N_ARC + 1);
            arcDatas[currentArc].geo.setDrawRange(0, steps);
            arcDatas[currentArc].mat.opacity = 0.82;

            // Head dot follows tip of arc
            if (arcDrawT < 1.0) {
              const pt = arcDatas[currentArc].pts[Math.floor(arcDrawT * N_ARC)];
              headDots[currentArc].mesh.position.copy(pt);
              headDots[currentArc].mat.opacity = 0.95;
            } else {
              headDots[currentArc].mat.opacity = 0;
              arcDrawT = 0;
              currentArc++;
            }
          } else {
            phase = 2; phaseTimer = 0;
          }

        } else if (phase === 2) {
          // Hold — all arcs visible
          if (phaseTimer > 3.0) { phase = 3; phaseTimer = 0; }

        } else if (phase === 3) {
          // Fade out
          const f = Math.max(0, 1 - phaseTimer / 1.5);
          arcDatas.forEach(a => { a.mat.opacity = f * 0.82; });
          headDots.forEach(h => { h.mat.opacity = 0; });
          if (phaseTimer > 1.5) { phase = 4; phaseTimer = 0; }

        } else if (phase === 4) {
          // Brief gap, then restart
          arcDatas.forEach(a => { a.mat.opacity = 0; a.geo.setDrawRange(0, 0); });
          if (phaseTimer > 0.4) { phase = 1; phaseTimer = 0; currentArc = 0; arcDrawT = 0; }
        }

        // Mouse-responsive camera
        camera.position.x += (mouseRef.current.x * 2   - camera.position.x) * 0.02;
        camera.position.y += (mouseRef.current.y * 1.2 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };
      loopRunning = true;
      animate();

      const io = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !loopRunning) { loopRunning = true; animate(); }
      }, { threshold: 0 });
      io.observe(canvas);

      const onResize = () => {
        const w = canvas.offsetWidth, h = canvas.offsetHeight;
        camera.aspect = w / h; camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      const cleanup = () => {
        cancelAnimationFrame(rafId);
        io.disconnect();
        window.removeEventListener('resize', onResize);
        allGeos.forEach(g => g.dispose());
        allMats.forEach(m => m.dispose());
        renderer.dispose();
      };
      (canvas as HTMLCanvasElement & { _cleanup?: () => void })._cleanup = cleanup;
    });

    return () => {
      disposed = true;
      const c = canvas as HTMLCanvasElement & { _cleanup?: () => void };
      if (c._cleanup) { c._cleanup(); delete c._cleanup; }
    };
  }, [isMobile]);

  const delay = (d: number) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s ${d}s, transform 0.7s ${d}s`,
  });

  return (
    <section id="hero" style={{
      position: 'relative',
      height: isMobile ? 'auto' : '100svh',
      minHeight: isMobile ? '100svh' : '680px',
      overflow: 'hidden',
      background: 'var(--bg)',
    }}>
      {/* Blueprint grid */}
      <div className="blueprint-bg" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />

      {/* Radial gradient */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'var(--grad-hero)' }} />

      {/* Aurora blobs */}
      <div style={{
        position: 'absolute', top: '-10%', right: '5%', zIndex: 1, pointerEvents: 'none',
        width: '480px', height: '480px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.14) 0%, transparent 65%)',
        filter: 'blur(20px)',
        animation: 'blobMove1 16s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '20%', zIndex: 1, pointerEvents: 'none',
        width: '420px', height: '420px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 65%)',
        filter: 'blur(24px)',
        animation: 'blobMove2 20s ease-in-out infinite',
      }} />

      {/* Full-width canvas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        zIndex: 2, pointerEvents: 'none',
        opacity: isMobile ? 0.55 : 0.95,
      }} />

      {/* Left gradient shield */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0, width: '46%',
          zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.97) 45%, rgba(255,255,255,0.7) 75%, transparent 100%)',
        }} />
      )}

      {/* Content */}
      <div className="container" style={{
        position: 'relative', zIndex: 4,
        height: isMobile ? 'auto' : '100%',
        paddingTop: isMobile ? '108px' : 0,
        paddingBottom: isMobile ? '48px' : 0,
        display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: isMobile ? 'center' : 'space-between',
        gap: '32px',
      }}>
        {/* Text */}
        <div style={{
          maxWidth: isMobile ? '100%' : '480px', flexShrink: 0,
          ...(isMobile
            ? { textAlign: 'center' as const, display: 'flex', flexDirection: 'column' as const, alignItems: 'center' }
            : {}),
        }}>

          {/* Photo card - mobile only, scaled-down version of the desktop card (desktop renders its own larger card further below) */}
          {isMobile && (
            <div style={{
              ...delay(0),
              width: '168px', height: '210px',
              borderRadius: '18px',
              overflow: 'hidden', position: 'relative', margin: '0 auto 20px',
              border: '2px solid rgba(14,165,233,0.3)',
              boxShadow: '0 0 40px rgba(14,165,233,0.15), 0 16px 32px rgba(0,0,0,0.1)',
            }}>
              <Image
                src="/images/hero/mh-toha-01.png"
                alt="Mahmudul Hasan Toha"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                sizes="168px"
                priority
              />
            </div>
          )}

          <div className="mono" style={{ ...delay(0), marginBottom: '20px', display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--slate)', letterSpacing: '2.5px' }}>
            MAHMUDUL HASAN TOHA · DHAKA, BD
          </div>

          <h1 className="hero-name" aria-label="MH-TOHA" style={{ marginBottom: '20px', lineHeight: '0.9', fontSize: 'clamp(52px, 7vw, 96px)', whiteSpace: 'nowrap' }}>
            {NAME_LETTERS.map((ch, i) => (
              <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                <span style={{
                  display: 'inline-block',
                  transform: vis ? 'translateY(0)' : 'translateY(110%)',
                  transition: `transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${0.12 + i * 0.055}s`,
                }}>
                  {ch}
                </span>
              </span>
            ))}
            <span style={{
              display: 'inline-block', marginLeft: '6px',
              width: 'clamp(10px, 1.2vw, 16px)', height: 'clamp(10px, 1.2vw, 16px)',
              borderRadius: '50%', background: 'var(--sky)',
              opacity: vis ? 1 : 0, transform: vis ? 'scale(1)' : 'scale(0)',
              transition: 'opacity 0.4s 0.7s, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s',
            }} />
          </h1>

          <div style={{
            ...delay(0.3),
            fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 600,
            color: 'var(--sky)', marginBottom: '16px', minHeight: '40px',
            opacity: roleFade && vis ? 1 : 0,
            transition: 'opacity 0.3s, transform 0.7s 0.3s',
            transform: vis ? 'translateY(0)' : 'translateY(24px)',
          }}>
            {ROLES[roleIdx]}
          </div>

          <p className="body-lg" style={{ ...delay(0.45), marginBottom: '36px', fontStyle: 'italic', maxWidth: '400px' }}>
            Engineering precision, developer&apos;s craft - 5+ years delivering for global clients.
          </p>

          <div style={{ ...delay(0.6), display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '32px', justifyContent: isMobile ? 'center' : 'flex-start' }}>
            <Magnetic>
              <a href="#work"
                onClick={e => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-primary">
                View My Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="/MH-TOHA-CV-2026.pdf"
                download
                className="btn-outline">
                Download My Resume
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </a>
            </Magnetic>
          </div>

          <div style={{ ...delay(0.75), display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <div style={{ position: 'relative', width: '10px', height: '10px' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--emerald)', animation: 'dotPulse 2s ease-out infinite' }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--emerald)' }} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--emerald)' }}>
              Currently open for new projects
            </span>
          </div>

          {/* Stats strip */}
          <div style={{ ...delay(0.9), display: 'flex', alignItems: 'center', gap: 'clamp(16px, 2.5vw, 28px)', flexWrap: 'wrap' }}>
            {HERO_STATS.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 2.5vw, 28px)' }}>
                {i > 0 && <div style={{ width: '1px', height: '26px', background: 'var(--border2)' }} />}
                <div>
                  <div style={{ fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.n}</div>
                  <div className="mono" style={{ fontSize: '11px', marginTop: '4px' }}>{s.l.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo card - desktop only */}
        {!isMobile && (
          <div style={{
            flexShrink: 0,
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateX(0)' : 'translateX(40px)',
            transition: 'opacity 0.9s 0.4s, transform 0.9s 0.4s',
          }}>
            <div style={{
              width: '300px',
              height: '400px',
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '2px solid rgba(14,165,233,0.3)',
              boxShadow: '0 0 60px rgba(14,165,233,0.15), 0 24px 48px rgba(0,0,0,0.1)',
              animation: 'float 6s ease-in-out infinite',
            }}>
              <Image
                src="/images/hero/mh-toha-01.png"
                alt="Mahmudul Hasan Toha"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                sizes="280px"
                priority
              />
              {/* Bottom label */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '32px 16px 16px',
                background: 'linear-gradient(transparent, rgba(15,23,42,0.88))',
              }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '13px', marginBottom: '3px' }}>
                  Mahmudul Hasan Toha
                </div>
                <div style={{ color: 'var(--sky)', fontSize: '11.5px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  CEO · TEX-IT & BYV Tech
                </div>
              </div>
            </div>

            {/* Decorative ring behind card */}
            <div style={{
              position: 'absolute',
              inset: '-12px',
              borderRadius: '28px',
              border: '1px solid rgba(14,165,233,0.12)',
              pointerEvents: 'none',
            }} />
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '28px',
        left: isMobile ? '20px' : '48px',
        zIndex: 5, display: 'flex', alignItems: 'center', gap: '10px',
        opacity: vis ? 0.4 : 0, transition: 'opacity 0.8s 1.2s',
      }}>
        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, var(--sky), transparent)' }} className="pulse" />
        <span className="mono" style={{ fontSize: '11px' }}>SCROLL</span>
      </div>
    </section>
  );
}
