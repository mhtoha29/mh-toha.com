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

  // Three.js: AI neural network
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
      const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200);
      camera.position.set(0, 0, 20);

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);

      const allGeos: THREE.BufferGeometry[] = [];
      const allMats: THREE.Material[] = [];
      const group = new THREE.Group();
      scene.add(group);

      // ── Orbital rings (rotate independently in scene) ──
      const makeCircle = (r: number, seg: number) => {
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= seg; i++) {
          const a = (i / seg) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
        }
        return new THREE.BufferGeometry().setFromPoints(pts);
      };

      type RingEntry = { line: THREE.Line; ry: number; rz: number; rx: number };
      const ringEntries: RingEntry[] = [];

      if (!isMobile) {
        const add = (r: number, seg: number, col: number, op: number,
          rx: number, ry: number, rz: number,
          dRy: number, dRz: number, dRx: number) => {
          const g = makeCircle(r, seg); allGeos.push(g);
          const m = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: op }); allMats.push(m);
          const l = new THREE.Line(g, m);
          l.rotation.x = rx; l.rotation.y = ry; l.rotation.z = rz;
          scene.add(l);
          ringEntries.push({ line: l, ry: dRy, rz: dRz, rx: dRx });
        };
        add(10,  140, 0x0EA5E9, 0.13, Math.PI * 0.28, 0,            Math.PI * 0.08, 0,      0.0010, 0);
        add(14.5,180, 0x7C3AED, 0.07, Math.PI * 0.55, Math.PI*0.18, 0,              0.0007, 0,      0);
        add(7,   100, 0x06B6D4, 0.10, Math.PI * 0.42, 0,           -Math.PI * 0.12, 0,      0.0008, 0.0015);
      }

      // ── Neural network nodes ──
      const hubCount   = isMobile ? 3 : 6;
      const midCount   = isMobile ? 10 : 20;
      const smallCount = isMobile ? 12 : 24;
      const total = hubCount + midCount + smallCount;

      type NodeData = {
        mesh: THREE.Mesh;
        aura: THREE.Mesh | null;
        basePos: THREE.Vector3;
        phase: number;
        phaseSpeed: number;
      };
      const nodes: NodeData[] = [];

      for (let i = 0; i < total; i++) {
        const isHub = i < hubCount;
        const isMid = !isHub && i < hubCount + midCount;
        const sx = isMobile ? 13 : 19;
        const sy = isMobile ? 9 : 11;
        // slight right bias: x center = +0.3*sx*0.3 ≈ +2
        const x = (Math.random() - 0.28) * sx;
        const y = (Math.random() - 0.5) * sy;
        const z = (Math.random() - 0.5) * 7;

        const geo = new THREE.SphereGeometry(
          isHub ? 0.22 : isMid ? 0.115 : 0.065,
          isHub ? 10 : 6, isHub ? 10 : 6,
        );
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(isHub ? '#0EA5E9' : isMid ? '#7C3AED' : '#94A3B8'),
          transparent: true,
          opacity: isHub ? 1 : isMid ? 0.85 : 0.5,
        });
        const mesh = new THREE.Mesh(geo, mat);
        const pos = new THREE.Vector3(x, y, z);
        mesh.position.copy(pos);
        group.add(mesh);
        allGeos.push(geo); allMats.push(mat);

        let aura: THREE.Mesh | null = null;
        if (isHub) {
          const aGeo = new THREE.SphereGeometry(0.5, 12, 12);
          const aMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#0EA5E9'), transparent: true, opacity: 0.07 });
          aura = new THREE.Mesh(aGeo, aMat);
          aura.position.copy(pos);
          group.add(aura);
          allGeos.push(aGeo); allMats.push(aMat);
        }

        nodes.push({ mesh, aura, basePos: pos.clone(), phase: Math.random() * Math.PI * 2, phaseSpeed: 0.004 + Math.random() * 0.006 });
      }

      // ── Connections as single LineSegments ──
      type EdgeData = { a: number; b: number };
      const edgeList: EdgeData[] = [];
      const threshold = isMobile ? 5.0 : 5.8;

      for (let a = 0; a < total; a++) {
        for (let b = a + 1; b < total; b++) {
          if (nodes[a].basePos.distanceTo(nodes[b].basePos) < threshold) {
            edgeList.push({ a, b });
          }
        }
      }

      const edgeBuf = new Float32Array(edgeList.length * 6);
      for (let i = 0; i < edgeList.length; i++) {
        const pa = nodes[edgeList[i].a].mesh.position;
        const pb = nodes[edgeList[i].b].mesh.position;
        edgeBuf[i*6]=pa.x; edgeBuf[i*6+1]=pa.y; edgeBuf[i*6+2]=pa.z;
        edgeBuf[i*6+3]=pb.x; edgeBuf[i*6+4]=pb.y; edgeBuf[i*6+5]=pb.z;
      }
      const edgeGeo = new THREE.BufferGeometry();
      edgeGeo.setAttribute('position', new THREE.BufferAttribute(edgeBuf, 3));
      const edgeMat = new THREE.LineBasicMaterial({ color: 0x0EA5E9, transparent: true, opacity: 0.10 });
      group.add(new THREE.LineSegments(edgeGeo, edgeMat));
      allGeos.push(edgeGeo); allMats.push(edgeMat);

      // ── Pulse signals ──
      const pulseCount = isMobile ? 8 : 18;
      const pGeo = new THREE.SphereGeometry(0.07, 6, 6);
      allGeos.push(pGeo);

      type PulseData = { edgeIdx: number; progress: number; speed: number; mesh: THREE.Mesh };
      const pulses: PulseData[] = [];
      const tmpA = new THREE.Vector3();
      const tmpB = new THREE.Vector3();

      for (let i = 0; i < pulseCount && edgeList.length > 0; i++) {
        const pMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(i % 3 === 0 ? '#A78BFA' : '#38BDF8'),
          transparent: true, opacity: 0.92,
        });
        allMats.push(pMat);
        const pMesh = new THREE.Mesh(pGeo, pMat);
        group.add(pMesh);
        pulses.push({
          edgeIdx: Math.floor(Math.random() * edgeList.length),
          progress: Math.random(),
          speed: 0.006 + Math.random() * 0.014,
          mesh: pMesh,
        });
      }

      // ── Animation loop (paused while Hero is scrolled out of view) ──
      const animate = () => {
        if (!isVisible) { loopRunning = false; return; }
        rafId = requestAnimationFrame(animate);

        group.rotation.y += 0.0008;
        group.rotation.x += 0.0003;

        ringEntries.forEach(({ line, ry, rz, rx }) => {
          line.rotation.y += ry;
          line.rotation.z += rz;
          line.rotation.x += rx;
        });

        nodes.forEach(nd => {
          nd.phase += nd.phaseSpeed;
          nd.mesh.position.set(
            nd.basePos.x + Math.cos(nd.phase * 0.8) * 0.07,
            nd.basePos.y + Math.sin(nd.phase) * 0.10,
            nd.basePos.z + Math.sin(nd.phase * 1.3) * 0.06,
          );
          if (nd.aura) {
            nd.aura.position.copy(nd.mesh.position);
            nd.aura.scale.setScalar(1 + Math.sin(nd.phase * 2) * 0.12);
          }
        });

        const attr = edgeGeo.getAttribute('position') as THREE.BufferAttribute;
        for (let i = 0; i < edgeList.length; i++) {
          const pa = nodes[edgeList[i].a].mesh.position;
          const pb = nodes[edgeList[i].b].mesh.position;
          attr.setXYZ(i * 2,     pa.x, pa.y, pa.z);
          attr.setXYZ(i * 2 + 1, pb.x, pb.y, pb.z);
        }
        attr.needsUpdate = true;

        pulses.forEach(p => {
          p.progress += p.speed;
          if (p.progress > 1) {
            p.progress = 0;
            p.edgeIdx = Math.floor(Math.random() * edgeList.length);
          }
          tmpA.copy(nodes[edgeList[p.edgeIdx].a].mesh.position);
          tmpB.copy(nodes[edgeList[p.edgeIdx].b].mesh.position);
          p.mesh.position.lerpVectors(tmpA, tmpB, p.progress);
        });

        camera.position.x += (mouseRef.current.x * 2   - camera.position.x) * 0.02;
        camera.position.y += (mouseRef.current.y * 1.2 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };
      loopRunning = true;
      animate();

      // Pause the render loop entirely once Hero scrolls out of view —
      // otherwise this WebGL scene keeps rendering at 60fps for the whole
      // session, competing with scroll/compositing on lower-end devices.
      const io = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !loopRunning) {
          loopRunning = true;
          animate();
        }
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
        opacity: isMobile ? 0.45 : 0.82,
      }} />

      {/* Left gradient shield */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0, width: '46%',
          zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.97) 45%, rgba(255,255,255,0.5) 75%, transparent 100%)',
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

          {/* Photo card — mobile only, scaled-down version of the desktop card (desktop renders its own larger card further below) */}
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

          <div className="mono" style={{ ...delay(0), marginBottom: '20px', display: 'block' }}>
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
            Engineering precision, developer&apos;s craft — 5+ years delivering for global clients.
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
                  <div className="mono" style={{ fontSize: '9px', marginTop: '4px' }}>{s.l.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo card — desktop only */}
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
                <div style={{ color: 'var(--sky)', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
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
        <span className="mono" style={{ fontSize: '9px' }}>SCROLL</span>
      </div>
    </section>
  );
}
