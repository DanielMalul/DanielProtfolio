import React, { useState, useRef, useEffect } from 'react';
import styles from './Hero.module.css';
import { useTransparentImg } from '../utils/removeBackground';
import standingSrc from '../assets/daniel_standing.png';
import kickingSrc  from '../assets/daniel_kicking.png';
import { MessageSquare, Award, Terminal } from 'lucide-react';

// ─── Real Physics Ball ───────────────────────────────────────────
// Simulates a bouncing soccer ball with gravity + restitution.
// Uses requestAnimationFrame for buttery 60fps animation.
function useBallPhysics(active) {
  const ballRef   = useRef(null);
  const shadowRef = useRef(null);
  const rafId     = useRef(null);

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(rafId.current);
      if (ballRef.current)   ballRef.current.style.opacity   = '0';
      if (shadowRef.current) shadowRef.current.style.opacity = '0';
      return;
    }

    // Physics state
    let posY  = 0;       // px above ground (positive = up)
    let velY  = 260;     // initial upward kick
    let posX  = 0;       // lateral drift
    let t     = 0;
    let lastTs = null;

    const GRAVITY     = 650;   // px / s²
    const RESTITUTION = 0.68;  // energy kept on bounce
    const GROUND      = 0;
    const MAX_H       = 220;   // for shadow scaling

    const tick = (ts) => {
      if (!lastTs) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.033); // cap at 33ms
      lastTs = ts;
      t += dt;

      // Update physics
      velY -= GRAVITY * dt;
      posY += velY  * dt;
      posX  = Math.sin(t * 2.1) * 14; // gentle lateral sway

      // Ground collision
      if (posY <= GROUND) {
        posY = GROUND;
        velY = Math.abs(velY) * RESTITUTION;
        // Re-kick if energy gets too low
        if (velY < 55) velY = 230 + Math.random() * 70;
      }

      // ── Apply to DOM ──
      if (ballRef.current) {
        // Ball is positioned with bottom: anchor, translateY is negative = up
        ballRef.current.style.transform = `translate(calc(-50% + ${posX}px), ${-posY}px)`;
        ballRef.current.style.opacity   = '1';
      }

      if (shadowRef.current) {
        const heightRatio = Math.max(0, 1 - posY / MAX_H);
        const scale       = 0.15 + heightRatio * 0.85;
        shadowRef.current.style.transform = `translate(calc(-50% + ${posX}px), 0) scale(${scale})`;
        shadowRef.current.style.opacity   = String(heightRatio * 0.3);
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [active]);

  return { ballRef, shadowRef };
}

// ─── Hero Section ────────────────────────────────────────────────
export default function Hero() {
  // 'idle'  → standing image, no ball
  // 'kick'  → kicking image + animated ball
  const [mode, setMode] = useState('idle');

  // Process both images (strip white background via canvas BFS)
  const standingUrl = useTransparentImg(standingSrc);
  const kickingUrl  = useTransparentImg(kickingSrc);

  const { ballRef, shadowRef } = useBallPhysics(mode === 'kick');

  const imgSrc = mode === 'kick' ? (kickingUrl || kickingSrc)
                                 : (standingUrl || standingSrc);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>

        {/* ── Right: Text ── */}
        <div className={styles.introContent}>
          <div className={styles.badge}>
            <Terminal size={14} className={styles.badgeIcon} />
            <span>הנדסאי תוכנה &amp; מפתח תוכנה</span>
          </div>

          <h1 className={styles.title}>
            היי, אני <span className="gradient-text">דניאל</span>
          </h1>

          <p className={styles.description}>
            אני בונה פתרונות דיגיטליים מקצה לקצה – מאתרי אינטרנט מתקדמים ועד מערכות ניהול מתקדמות.
            כשותף-מייסד ב-<strong>GalilDevs</strong>, אני שואף להפוך רעיונות מורכבים למוצרים מדהימים ויעילים.
          </p>

          <div className={styles.ctaGroup}>
            <a
              href="https://wa.me/972549069447"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn"
            >
              <span>בואו נדבר בוואטסאפ</span>
              <MessageSquare size={18} />
            </a>
            <a href="#about" className={styles.secondaryBtn}>
              <span>מידע נוסף אודותיי</span>
              <Award size={18} />
            </a>
          </div>
        </div>

        {/* ── Left: Avatar + Physics Ball ── */}
        <div className={styles.avatarWrapper}>
          <div
            className={styles.stage}
            onMouseEnter={() => setMode('kick')}
            onMouseLeave={() => setMode('idle')}
            onTouchStart={() => setMode(m => m === 'kick' ? 'idle' : 'kick')}
          >
            {/* ── Character Image ── */}
            <img
              src={imgSrc}
              alt="דניאל מלול"
              className={`${styles.charImg} ${mode === 'kick' ? styles.charKick : styles.charIdle}`}
              draggable={false}
            />

            {/* ── Animated Ball (only in kick mode) ── */}
            <div ref={ballRef} className={styles.ballWrapper} aria-hidden="true">
              <div className={styles.ballIcon}>⚽</div>
            </div>

            {/* ── Ball Ground Shadow ── */}
            <div ref={shadowRef} className={styles.ballShadow} aria-hidden="true" />
          </div>

          {/* Floor ambient glow */}
          <div className={styles.floorGlow} />
        </div>

      </div>

      {/* BG effects */}
      <div className={styles.decorGrid} />
      <div className={styles.decorCircle1} />
      <div className={styles.decorCircle2} />
    </section>
  );
}
