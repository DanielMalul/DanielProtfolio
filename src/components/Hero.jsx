import React, { useRef } from 'react';
import styles from './Hero.module.css';
import danielFullBody from '../assets/daniel_full_body.png';
import { MessageSquare, Briefcase, Terminal, Award } from 'lucide-react';

export default function Hero() {
  const cardRef = useRef(null);

  // 3D Parallax Tilt Effect
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Calculate rotation angles (max 15 degrees)
    const rotateX = -mouseY * 20;
    const rotateY = mouseX * 20;

    // Set CSS custom properties on the card element
    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    // Reset rotation smoothly
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        {/* Right: Intro Text */}
        <div className={styles.introContent}>
          <div className={styles.badge}>
            <Terminal size={14} className={styles.badgeIcon} />
            <span>הנדסאי תוכנה & Full-Stack Developer</span>
          </div>
          
          <h1 className={styles.title}>
            היי, אני <span className="gradient-text">דניאל</span>
          </h1>
          
          <p className={styles.description}>
            אני בונה פתרונות דיגיטליים מקצה לקצה – מאתרי אינטרנט מתקדמים ועד מערכות ניהול מבוזרות.
            כשותף-מייסד ב-<strong>GalilDevs</strong>, אני שואף להפוך רעיונות מורכבים למוצרים מדהימים ויעילים.
          </p>

          <div className={styles.ctaGroup}>
            <a href="#contact" className="glow-btn">
              <span>בואו נדבר בוואטסאפ</span>
              <MessageSquare size={18} />
            </a>
            <a href="#about" className={styles.secondaryBtn}>
              <span>מידע נוסף אודותיי</span>
              <Award size={18} />
            </a>
          </div>
        </div>

        {/* Left: 3D Full-body Interactive Avatar Area */}
        <div className={styles.avatarWrapper}>
          <div 
            ref={cardRef}
            className={styles.avatarCard}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.avatarFrame}>
              <div className={styles.avatarGlow}></div>
              <img 
                src={danielFullBody} 
                alt="דניאל - אוואטר תלת מימדי מלא" 
                className={styles.avatarImg} 
              />
            </div>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>דניאל מלול</h3>
              <p className={styles.cardSubtitle}>הנדסאי תוכנה & מפתח Full Stack</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background grids & circles */}
      <div className={styles.decorGrid}></div>
      <div className={styles.decorCircle1}></div>
      <div className={styles.decorCircle2}></div>
    </section>
  );
}
