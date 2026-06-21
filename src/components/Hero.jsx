import React from 'react';
import styles from './Hero.module.css';
import { useTransparentImg } from '../utils/removeBackground';
import hoodieSrc from '../assets/daniel_hoodie.png';
import { MessageSquare, Award, Terminal } from 'lucide-react';

export default function Hero() {
  // Remove white background seamlessly
  const hoodieUrl = useTransparentImg(hoodieSrc);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>

        {/* ── Right: Intro Text ── */}
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

        {/* ── Left: Avatar Area ── */}
        <div className={styles.avatarWrapper}>
          <div className={styles.stage}>
            <img
              src={hoodieUrl || ''}
              alt="דניאל מלול"
              className={`${styles.charImg} ${styles.charIdle}`}
              style={{ opacity: hoodieUrl ? 1 : 0, transition: 'opacity 0.4s ease' }}
              draggable={false}
            />
          </div>
          <div className={styles.floorGlow} />
        </div>

      </div>

      <div className={styles.decorGrid} />
      <div className={styles.decorCircle1} />
      <div className={styles.decorCircle2} />
    </section>
  );
}
