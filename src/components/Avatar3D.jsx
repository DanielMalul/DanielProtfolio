import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Palette ────────────────────────────────────────────────────
const C = {
  skin:    '#F5C5A3',
  hair:    '#180e08',
  jersey:  '#FFD700',   // Maccabi yellow
  navy:    '#1B2563',   // Maccabi navy
  shoe:    '#111118',
  white:   '#ffffff',
  pupil:   '#1a1a2e',
  glass:   '#b0b8c8',
  beard:   '#2d1a0e',
  bWhite:  '#f5f5f5',
  bBlack:  '#111111',
};

// ─── Pre-shared geometries (avoid recreation) ───────────────────
const SPHERE32  = <sphereGeometry args={[1, 32, 32]} />;
const SPHERE16  = <sphereGeometry args={[1, 16, 16]} />;

// ─── Character ──────────────────────────────────────────────────
function Character({ isInteracting }) {
  const rootRef        = useRef();
  const torsoRef       = useRef();
  const headRef        = useRef();
  const lArmRef        = useRef();
  const rArmRef        = useRef();
  const lLegRef        = useRef();
  const rLegRef        = useRef();
  const ballGrpRef     = useRef();
  const ballShadRef    = useRef();
  const lPupilRef      = useRef();
  const rPupilRef      = useRef();

  const clk = useRef(0);
  const bp  = useRef({
    y: -2.1, vy: 0,
    x:  0.35, vx: 0.02,
    spin: 0, launched: false,
  });

  // ── Materials (memoised) ───────────────────────────────────────
  const m = useMemo(() => {
    const mk = (color, rough = 0.75, metal = 0) =>
      new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });
    return {
      skin:   mk(C.skin,   0.80),
      hair:   mk(C.hair,   0.95),
      jersey: mk(C.jersey, 0.55),
      navy:   mk(C.navy,   0.70),
      shoe:   mk(C.shoe,   0.60),
      white:  mk(C.white,  0.40),
      pupil:  mk(C.pupil,  0.80),
      glass:  mk(C.glass,  0.05, 0.92),
      beard:  mk(C.beard,  0.95),
      bWhite: mk(C.bWhite, 0.55),
      bBlack: mk(C.bBlack, 0.80),
      shadow: new THREE.MeshBasicMaterial({
        color: '#000', transparent: true, opacity: 0.12, depthWrite: false,
      }),
    };
  }, []);

  // ── Animation frame ────────────────────────────────────────────
  useFrame((_, delta) => {
    clk.current += delta;
    const t = clk.current;
    const b = bp.current;

    /* ── IDLE ──────────────────────────────────────── */
    if (!isInteracting) {
      b.launched = false;
      b.y = THREE.MathUtils.lerp(b.y, -2.12, delta * 5);

      // breathing
      if (torsoRef.current) {
        torsoRef.current.scale.y = 1 + Math.sin(t * 1.15) * 0.018;
        torsoRef.current.scale.x = 1 - Math.sin(t * 1.15) * 0.007;
      }
      // gentle float
      if (rootRef.current) {
        rootRef.current.position.y = Math.sin(t * 1.0) * 0.04;
        rootRef.current.rotation.y = Math.sin(t * 0.45) * 0.07;
      }
      // head look around gently
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(t * 0.5) * 0.06;
        headRef.current.rotation.z = Math.sin(t * 0.6) * 0.02;
        headRef.current.rotation.x = 0;
      }
      // arms gentle swing
      if (lArmRef.current) lArmRef.current.rotation.x =  Math.sin(t * 1.0) * 0.09;
      if (rArmRef.current) rArmRef.current.rotation.x = -Math.sin(t * 1.0) * 0.09;
      if (lLegRef.current) lLegRef.current.rotation.x =  Math.sin(t * 1.0) * 0.04;
      if (rLegRef.current) rLegRef.current.rotation.x = -Math.sin(t * 1.0) * 0.04;
    }

    /* ── BOUNCING ──────────────────────────────────── */
    if (isInteracting) {
      if (!b.launched) {
        b.launched = true;
        b.y  = -0.8; b.vy = 6.0;
        b.x  =  0.35; b.vx = 0.025;
        b.spin = 0;
      }

      const GROUND = -2.12;
      const G      = -15;
      const RES    = 0.70;

      b.vy  += G * delta;
      b.y   += b.vy * delta;
      b.x   += b.vx * delta;
      b.spin += delta * 5;

      if (b.y <= GROUND) {
        b.y  = GROUND;
        b.vy = Math.abs(b.vy) * RES;
        if (b.vy < 1.5) b.vy = 4.0 + Math.random() * 1.5;
      }
      if (Math.abs(b.x) > 0.65) b.vx *= -1;

      // character bobs
      if (rootRef.current) {
        rootRef.current.position.y = Math.sin(t * 5.5) * 0.025;
        rootRef.current.rotation.y = THREE.MathUtils.lerp(
          rootRef.current.rotation.y,
          Math.atan2(b.x, 1.0) * 0.25,
          delta * 5,
        );
      }

      // HEAD tracks ball → eyes follow
      if (headRef.current) {
        const tx = THREE.MathUtils.clamp(-Math.atan2(b.y - 1.35, 1.2) * 0.5, -0.5, 0.3);
        const ty = THREE.MathUtils.clamp( Math.atan2(b.x,  1.2) * 0.35, -0.4, 0.4);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, tx, delta * 6);
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, ty, delta * 6);
        headRef.current.rotation.z = 0;
      }

      // Pupils track ball (local offset inside head)
      if (lPupilRef.current && rPupilRef.current) {
        const px = THREE.MathUtils.clamp(b.x * 0.02, -0.018, 0.018);
        const py = THREE.MathUtils.clamp((b.y - 1.35) * 0.015, -0.015, 0.015);
        lPupilRef.current.position.set( 0.16 + px, 0.06 + py, 0.47);
        rPupilRef.current.position.set(-0.16 + px, 0.06 + py, 0.47);
      }

      // kick leg
      const kickPhase = Math.sin(t * 5.5);
      if (rLegRef.current) rLegRef.current.rotation.x = kickPhase * 0.35;
      if (lLegRef.current) lLegRef.current.rotation.x = -kickPhase * 0.18;
      if (rArmRef.current) rArmRef.current.rotation.x = -kickPhase * 0.25;
      if (lArmRef.current) lArmRef.current.rotation.x =  kickPhase * 0.25;
    }

    /* ── BALL MESH ─────────────────────────────────── */
    if (ballGrpRef.current) {
      ballGrpRef.current.position.set(b.x, b.y, 0.25);
      ballGrpRef.current.rotation.z = b.spin;
    }

    /* ── BALL SHADOW ───────────────────────────────── */
    if (ballShadRef.current) {
      const h = b.y - (-2.12);
      const s = Math.max(0.1, 1 - h / 2.5);
      ballShadRef.current.position.set(b.x, -2.11, 0.25);
      ballShadRef.current.scale.setScalar(s * 1.1);
      ballShadRef.current.material.opacity = s * 0.13;
      ballShadRef.current.visible = isInteracting;
    }
  });

  /* ── JSX ───────────────────────────────────────────────────── */
  return (
    <group ref={rootRef}>

      {/* ══ HEAD ══ */}
      <group ref={headRef} position={[0, 1.38, 0]}>
        {/* skull */}
        <mesh material={m.skin} scale={[0.44, 0.46, 0.44]}>{SPHERE32}</mesh>

        {/* hair cap */}
        <mesh position={[0, 0.14, -0.02]} material={m.hair}>
          <sphereGeometry args={[0.438, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.53]} />
        </mesh>
        {/* fringe */}
        <mesh position={[0, 0.26, 0.27]} rotation={[0.45, 0, 0]} material={m.hair}>
          <sphereGeometry args={[0.22, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        </mesh>

        {/* ── eyes white ── */}
        <mesh position={[ 0.165, 0.06, 0.39]} material={m.white} scale={0.09}>{SPHERE16}</mesh>
        <mesh position={[-0.165, 0.06, 0.39]} material={m.white} scale={0.09}>{SPHERE16}</mesh>
        {/* iris */}
        <mesh position={[ 0.165, 0.06, 0.46]} material={m.pupil} scale={0.048}>{SPHERE16}</mesh>
        {/* pupils (animated) */}
        <mesh ref={lPupilRef} position={[ 0.165, 0.06, 0.47]} material={m.pupil} scale={0.025}>{SPHERE16}</mesh>
        <mesh ref={rPupilRef} position={[-0.165, 0.06, 0.47]} material={m.pupil} scale={0.025}>{SPHERE16}</mesh>
        <mesh position={[-0.165, 0.06, 0.46]} material={m.pupil} scale={0.048}>{SPHERE16}</mesh>
        {/* eye highlights */}
        <mesh position={[ 0.178, 0.075, 0.478]} material={m.white} scale={0.016}>{SPHERE16}</mesh>
        <mesh position={[-0.152, 0.075, 0.478]} material={m.white} scale={0.016}>{SPHERE16}</mesh>

        {/* ── glasses ── */}
        <mesh position={[ 0.165, 0.06, 0.41]} material={m.glass}><torusGeometry args={[0.1, 0.009, 8, 24]} /></mesh>
        <mesh position={[-0.165, 0.06, 0.41]} material={m.glass}><torusGeometry args={[0.1, 0.009, 8, 24]} /></mesh>
        {/* bridge */}
        <mesh position={[0, 0.06, 0.41]} rotation={[0, Math.PI / 2, 0]} material={m.glass}>
          <cylinderGeometry args={[0.005, 0.005, 0.15, 6]} />
        </mesh>
        {/* temples */}
        <mesh position={[ 0.29, 0.06, 0.23]} rotation={[0, -0.52, 0]} material={m.glass}>
          <cylinderGeometry args={[0.004, 0.004, 0.22, 6]} />
        </mesh>
        <mesh position={[-0.29, 0.06, 0.23]} rotation={[0,  0.52, 0]} material={m.glass}>
          <cylinderGeometry args={[0.004, 0.004, 0.22, 6]} />
        </mesh>

        {/* nose */}
        <mesh position={[0, -0.03, 0.435]} material={m.skin} scale={0.048}>{SPHERE16}</mesh>

        {/* beard stubble */}
        <mesh position={[0, -0.17, 0.36]} rotation={[0.28, 0, 0]} material={m.beard}>
          <sphereGeometry args={[0.2, 16, 8, 0, Math.PI * 2, Math.PI * 0.38, Math.PI * 0.28]} />
        </mesh>

        {/* ears */}
        <mesh position={[ 0.44, 0.0, 0.0]} material={m.skin} scale={0.088}>{SPHERE16}</mesh>
        <mesh position={[-0.44, 0.0, 0.0]} material={m.skin} scale={0.088}>{SPHERE16}</mesh>
      </group>

      {/* ══ NECK ══ */}
      <mesh position={[0, 0.93, 0]} material={m.skin}>
        <cylinderGeometry args={[0.1, 0.125, 0.22, 12]} />
      </mesh>

      {/* ══ TORSO ══ */}
      <group ref={torsoRef} position={[0, 0.32, 0]}>
        <mesh material={m.jersey}><capsuleGeometry args={[0.33, 0.65, 8, 18]} /></mesh>
        {/* collar */}
        <mesh position={[0, 0.41, 0]} material={m.navy}><torusGeometry args={[0.22, 0.046, 8, 20]} /></mesh>
        {/* ISRAEL bar */}
        <mesh position={[0, 0.13, 0.334]} material={m.navy}><boxGeometry args={[0.38, 0.09, 0.004]} /></mesh>
        {/* CANADA bar */}
        <mesh position={[0, 0.01, 0.334]} material={m.navy}><boxGeometry args={[0.35, 0.085, 0.004]} /></mesh>
        {/* FILA tag */}
        <mesh position={[0.21, 0.26, 0.29]} rotation={[0, -0.28, 0]} material={m.navy}>
          <boxGeometry args={[0.115, 0.038, 0.003]} />
        </mesh>
        {/* Maccabi badge */}
        <mesh position={[-0.22, 0.28, 0.27]} rotation={[0, 0.28, 0]} material={m.navy}>
          <circleGeometry args={[0.065, 12]} />
        </mesh>
      </group>

      {/* ══ SHORTS ══ */}
      <mesh position={[0, -0.4, 0]} material={m.jersey}>
        <cylinderGeometry args={[0.305, 0.285, 0.32, 14]} />
      </mesh>

      {/* ══ LEFT LEG ══ */}
      <group ref={lLegRef} position={[0.145, -0.84, 0]}>
        <mesh material={m.navy}><capsuleGeometry args={[0.093, 0.38, 6, 10]} /></mesh>
        <mesh position={[0, -0.26, 0.06]} material={m.shoe}><boxGeometry args={[0.158, 0.1, 0.28]} /></mesh>
      </group>

      {/* ══ RIGHT LEG ══ */}
      <group ref={rLegRef} position={[-0.145, -0.84, 0]}>
        <mesh material={m.navy}><capsuleGeometry args={[0.093, 0.38, 6, 10]} /></mesh>
        <mesh position={[0, -0.26, 0.06]} material={m.shoe}><boxGeometry args={[0.158, 0.1, 0.28]} /></mesh>
      </group>

      {/* ══ LEFT ARM ══ */}
      <group ref={lArmRef} position={[0.5, 0.38, 0]} rotation={[0, 0, 0.35]}>
        <mesh material={m.jersey}><capsuleGeometry args={[0.085, 0.38, 6, 10]} /></mesh>
        <mesh position={[0, -0.23, 0]} material={m.navy}><cylinderGeometry args={[0.088, 0.088, 0.06, 10]} /></mesh>
        <mesh position={[0, -0.31, 0]} material={m.skin} scale={0.088}>{SPHERE16}</mesh>
      </group>

      {/* ══ RIGHT ARM ══ */}
      <group ref={rArmRef} position={[-0.5, 0.38, 0]} rotation={[0, 0, -0.35]}>
        <mesh material={m.jersey}><capsuleGeometry args={[0.085, 0.38, 6, 10]} /></mesh>
        <mesh position={[0, -0.23, 0]} material={m.navy}><cylinderGeometry args={[0.088, 0.088, 0.06, 10]} /></mesh>
        <mesh position={[0, -0.31, 0]} material={m.skin} scale={0.088}>{SPHERE16}</mesh>
      </group>

      {/* ══ SOCCER BALL ══ */}
      <group ref={ballGrpRef} position={[0.35, -2.12, 0.25]}>
        <mesh material={m.bWhite}><sphereGeometry args={[0.16, 22, 22]} /></mesh>
        {/* pentagon patches */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const r = (deg * Math.PI) / 180;
          return (
            <mesh key={i}
              position={[Math.sin(r) * 0.13, 0.07, Math.cos(r) * 0.13]}
              material={m.bBlack}
              scale={0.046}
            >{SPHERE16}</mesh>
          );
        })}
        <mesh position={[0, 0.155, 0]} material={m.bBlack} scale={0.046}>{SPHERE16}</mesh>
      </group>

      {/* ══ BALL SHADOW ══ */}
      <mesh ref={ballShadRef} rotation={[-Math.PI / 2, 0, 0]} position={[0.35, -2.11, 0.25]}>
        <circleGeometry args={[0.18, 16]} />
        <primitive object={m.shadow} attach="material" />
      </mesh>

    </group>
  );
}

// ─── Scene Lights ───────────────────────────────────────────────
function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 9, 6]}  intensity={1.4} />
      <pointLight     position={[-4, 4, 5]}   intensity={0.45} color="#8b5cf6" />
      <pointLight     position={[ 4,-2, 4]}   intensity={0.30} color="#06b6d4" />
    </>
  );
}

// ─── Exported Canvas Component ───────────────────────────────────
export default function Avatar3D({ className, style }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(v => !v)}
      role="img"
      aria-label="דמות 3D אינטראקטיבית של דניאל"
    >
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0.22, 4.3], fov: 42 }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        dpr={[1, 2]}
      >
        <Lights />
        <Suspense fallback={null}>
          <Character isInteracting={active} />
        </Suspense>
      </Canvas>
    </div>
  );
}
