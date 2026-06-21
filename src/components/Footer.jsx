import React from 'react';
import styles from './Footer.module.css';
import { Terminal } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoRow}>
          <div className={styles.logo}>
            <Terminal className={styles.logoIcon} size={20} />
            <span>דניאל<span className={styles.logoHighlight}>.dev</span></span>
          </div>
          <p className={styles.tagline}>הנדסת תוכנה ופתרונות דיגיטליים מתקדמים</p>
        </div>

        <ul className={styles.links}>
          <li><a href="#home">ראשי</a></li>
          <li><a href="#about">אודותיי</a></li>
          <li><a href="#galildevs">GalilDevs</a></li>
          <li><a href="#skills">כישורים</a></li>
          <li><a href="#contact">צור קשר</a></li>
        </ul>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {currentYear} דניאל. כל הזכויות שמורות. שותף-מייסד ב-
            <a href="https://galildevs.com" target="_blank" rel="noopener noreferrer" className={styles.businessLink}>
              GalilDevs
            </a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
