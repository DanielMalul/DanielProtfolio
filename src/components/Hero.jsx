import React, { useState, useRef, useEffect } from 'react';
import styles from './Hero.module.css';
import danielStanding from '../assets/daniel_standing.png';
import danielSmiling from '../assets/daniel_smiling.png';
import danielSoccer from '../assets/daniel_soccer_anim.png';
import { MessageSquare, Award, Terminal } from 'lucide-react';

export default function Hero() {
  const [avatarState, setAvatarState] = useState('idle'); // 'idle', 'bouncing', 'smiling'
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 });
  const [isBouncing, setIsBouncing] = useState(false);
  const ballAnimRef = useRef(null);
  const bounceTimeoutRef = useRef(null);

  // Autonomous ball bouncing animation using requestAnimationFrame
  useEffect(() => {
    let startTime = null;
    let animId = null;

    const bounceBall = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000; // seconds

      // Sine wave for horizontal movement, parabola for vertical (bouncing)
      const x = Math.sin(elapsed * 1.5) * 18; // swing left/right
      const bounceRaw = Math.abs(Math.sin(elapsed * 3)); // 0 to 1
      const y = -bounceRaw * 30; // bounce up (negative = up)

      setBallPos({ x, y });
      animId = requestAnimationFrame(bounceBall);
    };

    if (isBouncing) {
      animId = requestAnimationFrame(bounceBall);
      ballAnimRef.current = animId;
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isBouncing]);

  // Auto-start bouncing after 1s on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBouncing(true);
      setAvatarState('bouncing');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAvatarClick = () => {
    // Show smiling state briefly on click
    setAvatarState('smiling');
    setIsBouncing(false);
    clearTimeout(bounceTimeoutRef.current);

    bounceTimeoutRef.current = setTimeout(() => {
      setAvatarState('bouncing');
      setIsBouncing(true);
    }, 1800);
  };

  const handleMouseEnter = () => {
    setAvatarState('smiling');
    setIsBouncing(false);
  };

  const handleMouseLeave = () => {
    setAvatarState('bouncing');
    setIsBouncing(true);
  };

  const getAvatarSrc = () => {
    if (avatarState === 'smiling') return danielSmiling;
    if (avatarState === 'bouncing') return danielSoccer;
    return danielStanding;
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        {/* Right: Intro Text */}
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

        {/* Left: Animated Character */}
        <div className={styles.avatarWrapper}>
          {/* Animated floating glow underneath character */}
          <div className={styles.characterGlow} />

          {/* The character image - no frame, no card */}
          <div
            className={styles.characterContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleAvatarClick}
          >
            <img
              key={avatarState}
              src={getAvatarSrc()}
              alt="דניאל - אוואטר 3D"
              className={`${styles.characterImg} ${styles[avatarState]}`}
            />

            {/* Floating soccer ball - only when bouncing */}
            {avatarState === 'bouncing' && (
              <div
                className={styles.soccerBall}
                style={{
                  transform: `translate(${ballPos.x}px, ${ballPos.y}px)`
                }}
              >
                ⚽
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className={styles.decorGrid} />
      <div className={styles.decorCircle1} />
      <div className={styles.decorCircle2} />
    </section>
  );
}
