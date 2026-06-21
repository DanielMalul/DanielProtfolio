import React, { useState, useRef } from 'react';
import styles from './Hero.module.css';
import danielFullBody from '../assets/daniel_full_body.png';
import danielSoccer from '../assets/daniel_soccer.png';
import { MessageSquare, Briefcase, Terminal, Award } from 'lucide-react';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef(null);

  // 3D Parallax Tilt Effect on hover
  const handleMouseMove = (e) => {
    const el = imageRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Calculate rotation angles (max 15 degrees)
    const rotateX = -mouseY * 20;
    const rotateY = mouseX * 20;

    // Set CSS custom properties on the element
    el.style.setProperty('--rx', `${rotateX}deg`);
    el.style.setProperty('--ry', `${rotateY}deg`);
    
    if (!isHovered) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    const el = imageRef.current;
    if (!el) return;

    // Reset rotation smoothly
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    setIsHovered(false);
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        {/* Right: Intro Text */}
        <div className={styles.introContent}>
          <div className={styles.badge}>
            <Terminal size={14} className={styles.badgeIcon} />
            <span>הנדסאי תוכנה & מפתח תוכנה</span>
          </div>
          
          <h1 className={styles.title}>
            היי, אני <span className="gradient-text">דניאל</span>
          </h1>
          
          <p className={styles.description}>
            אני בונה פתרונות דיגיטליים מקצה לקצה – מאתרי אינטרנט מתקדמים ועד מערכות ניהול מתקדמות.
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

        {/* Left: 3D Full-body Interactive Avatar Area without Card Frame */}
        <div className={styles.avatarWrapper}>
          <div 
            ref={imageRef}
            className={styles.avatarImageContainer}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={handleMouseLeave}
          >
            <div className={styles.avatarGlow} style={{
              background: isHovered 
                ? 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 60%)'
                : 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 60%)'
            }}></div>
            <img 
              src={isHovered ? danielSoccer : danielFullBody} 
              alt="דניאל - אוואטר תלת מימדי" 
              className={styles.avatarImg} 
            />
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
