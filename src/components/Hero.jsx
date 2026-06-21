import React from 'react';
import styles from './Hero.module.css';
import { useTransparentImg } from '../utils/removeBackground';
import hoodieSrc from '../assets/daniel_hoodie.png';
import { MessageSquare, Award, Terminal } from 'lucide-react';

const LinkedinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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
            מפתח תוכנה המתמחה בארכיטקטורה ופיתוח מערכות ואפליקציות חכמות.
            כשותף-מייסד ב-<strong>GalilDevs</strong>, אני מתמקד בכתיבת קוד נקי והפיכת רעיונות למוצרי תוכנה מתקדמים, מהירים ויעילים.
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
            <a
              href="https://www.linkedin.com/in/daniel-malul-914114338/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
              style={{ padding: '12px 16px' }}
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} />
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
