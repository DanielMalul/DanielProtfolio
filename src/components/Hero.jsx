import React from 'react';
import styles from './Hero.module.css';
import Avatar3D from './Avatar3D';
import { MessageSquare, Award, Terminal } from 'lucide-react';

export default function Hero() {
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

        {/* ── Left: 3D Interactive Avatar ── */}
        <div className={styles.avatarWrapper}>
          <div className={styles.glowRing} />
          <Avatar3D className={styles.canvas3d} />
        </div>

      </div>

      {/* Background decorations */}
      <div className={styles.decorGrid} />
      <div className={styles.decorCircle1} />
      <div className={styles.decorCircle2} />
    </section>
  );
}
