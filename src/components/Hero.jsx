import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Hero.module.css';
import { useTransparentImg } from '../utils/removeBackground';
import standingSrc from '../assets/daniel_standing.png';
import soccerSrc   from '../assets/daniel_soccer_anim.png';
import smilingSrc  from '../assets/daniel_smiling.png';
import { MessageSquare, Award, Terminal } from 'lucide-react';

// ── Ball Physics Engine ─────────────────────────────────────────
function useBallPhysics(active) {
  const ballRef   = useRef(null);
  const shadowRef = useRef(null);
  const animId    = useRef(null);
  const state     = useRef({ y: 0, vy: 0, x: 0, t: 0 });

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(animId.current);
      // reset ball off-screen
      if (ballRef.current)   ballRef.current.style.opacity = '0';
      if (shadowRef.current) shadowRef.current.style.opacity = '0';
      return;
    }

    const s = state.current;
    s.y   = 0;          // px from bottom-anchor
    s.vy  = -280;       // initial upward velocity (px/s)
    s.x   = 0;
    let last = null;

    const GRAVITY    = 700;   // px/s²
    const RESTITUTION = 0.68;
    const GROUND     = 0;

    const tick = (ts) => {
      const dt = last ? Math.min((ts - last) / 1000, 0.04) : 0.016;
      last = ts;

      s.vy += GRAVITY * dt;
      s.y  += s.vy * dt;
      s.t  += dt;
      s.x   = Math.sin(s.t * 2.2) * 22; // gentle side-swing

      if (s.y >= GROUND) {
        s.y  = GROUND;
        s.vy = -Math.abs(s.vy) * RESTITUTION;
        if (Math.abs(s.vy) < 60) s.vy = -260 - Math.random() * 80;
      }

      if (ballRef.current) {
        ballRef.current.style.transform = `translate(calc(-50% + ${s.x}px), ${s.y}px)`;
        ballRef.current.style.opacity   = '1';
      }
      if (shadowRef.current) {
        const pct   = Math.max(0, 1 - (-s.y) / 240);
        const scale = 0.2 + pct * 0.8;
        shadowRef.current.style.transform = `translateX(-50%) scale(${scale})`;
        shadowRef.current.style.opacity   = String(pct * 0.35);
      }

      animId.current = requestAnimationFrame(tick);
    };

    animId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId.current);
  }, [active]);

  return { ballRef, shadowRef };
}

// ── Hero Component ──────────────────────────────────────────────
export default function Hero() {
  const [mode, setMode] = useState('idle'); // idle | bouncing | smiling

  // Pre-process all 3 images (remove white BG)
  const standingUrl = useTransparentImg(standingSrc);
  const soccerUrl   = useTransparentImg(soccerSrc);
  const smilingUrl  = useTransparentImg(smilingSrc);

  const { ballRef, shadowRef } = useBallPhysics(mode === 'bouncing');

  // Auto-start bouncing after 1.2 s
  useEffect(() => {
    const t = setTimeout(() => setMode('bouncing'), 1200);
    return () => clearTimeout(t);
  }, []);

  const src = mode === 'smiling' ? smilingUrl
            : mode === 'bouncing' ? soccerUrl
            : standingUrl;

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>

        {/* ── Text side ── */}
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

        {/* ── Avatar side ── */}
        <div className={styles.avatarWrapper}>
          <div
            className={styles.avatarStage}
            onMouseEnter={() => setMode('smiling')}
            onMouseLeave={() => setMode('bouncing')}
            onTouchStart={() => setMode(m => m === 'smiling' ? 'bouncing' : 'smiling')}
          >
            {/* Character image */}
            <img
              src={src || standingSrc}
              alt="דניאל מלול - דמות 3D"
              className={`${styles.charImg} ${mode === 'smiling' ? styles.charSmile : ''}`}
              draggable={false}
            />

            {/* Animated soccer ball */}
            <div ref={ballRef} className={styles.ball} aria-hidden>⚽</div>

            {/* Ball ground shadow */}
            <div ref={shadowRef} className={styles.ballShadow} aria-hidden />
          </div>

          {/* Floor glow ring */}
          <div className={styles.glowRing} />
        </div>

      </div>

      {/* BG decorations */}
      <div className={styles.decorGrid} />
      <div className={styles.decorCircle1} />
      <div className={styles.decorCircle2} />
    </section>
  );
}
