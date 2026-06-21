import React from 'react';
import styles from './GalilDevs.module.css';
import { ExternalLink, Layers, ShieldCheck, Zap, Laptop, Smartphone, Code2 } from 'lucide-react';

export default function GalilDevs() {
  const services = [
    {
      icon: <Zap size={22} />,
      title: 'פיתוח מהיר ויציב',
      desc: 'בניית אתרים ואפליקציות בטכנולוגיות המתקדמות ביותר (React, Vite, Node.js) לחוויית משתמש חלקה.'
    },
    {
      icon: <Layers size={22} />,
      title: 'מערכות ניהול מותאמות',
      desc: 'פיתוח מערכות פנים-ארגוניות, דאשבורדים ומערכות CRM מותאמות בדיוק לצרכי העסק.'
    },
    {
      icon: <ShieldCheck size={22} />,
      title: 'אבטחה ואופטימיזציה',
      desc: 'שילוב הגנות מתקדמות, כתיבת קוד מאובטח וביצוע אופטימיזציית SEO מלאה להגדלת המכירות.'
    }
  ];

  return (
    <section id="galildevs" className={styles.galildevs}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Right: Graphic mockup representing GalilDevs */}
          <div className={styles.graphicSide}>
            <div className={styles.mockupContainer}>
              <div className={styles.mockupHeader}>
                <div className={styles.dots}>
                  <span className={styles.dotRed}></span>
                  <span className={styles.dotYellow}></span>
                  <span className={styles.dotGreen}></span>
                </div>
                <div className={styles.mockupTitle}>galildevs.com</div>
              </div>
              <div className={styles.mockupBody}>
                <Laptop className={styles.mockupIcon} size={48} />
                <h4 className={styles.mockupText}>GalilDevs — פיתוח תוכנה פרימיום</h4>
                <p className={styles.mockupSubtext}>שני הנדסאי תוכנה מהגליל בונים פתרונות דיגיטליים שמייצרים תוצאות.</p>
                <div className={styles.mockupStats}>
                  <div className={styles.stat}>
                    <span className={styles.statVal}>99%</span>
                    <span className={styles.statLabel}>ביצועי מהירות</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statVal}>100%</span>
                    <span className={styles.statLabel}>קוד נקי</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.glowDecor}></div>
          </div>

          {/* Left: Content description */}
          <div className={styles.contentSide}>
            <span className={styles.preTitle}>הסוכנות שלנו</span>
            <h2 className={styles.title}>GalilDevs — גליל דבס</h2>
            <p className={styles.leadText}>
              יחד עם השותף שלי, הקמנו את GalilDevs — סוכנות בוטיק לפיתוח תוכנה הממוקמת בגליל.
              אנו מתמחים בבניית אתרים, אפליקציות ומערכות ניהול מתקדמות ברמה הגבוהה ביותר.
            </p>
            <p className={styles.bodyText}>
              אנו שמים דגש מיוחד על ביצועי מהירות, קוד נקי ותקני, חוויית משתמש (UI/UX) מרהיבה, 
              ותמיכה מלאה בכל שלבי הפרויקט — מאפיון הרעיון ועד להשקה מושלמת.
            </p>

            <div className={styles.servicesList}>
              {services.map((service, idx) => (
                <div key={idx} className={styles.serviceItem}>
                  <div className={styles.iconBox}>{service.icon}</div>
                  <div className={styles.serviceInfo}>
                    <h4 className={styles.serviceTitle}>{service.title}</h4>
                    <p className={styles.serviceDesc}>{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a 
              href="https://galildevs.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${styles.visitBtn} glow-btn`}
            >
              <span>בקרו באתר הרשמי</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* ── Sub-projects strip ── */}
        <div className={styles.subProjectsSection}>
          <div className={styles.subProjectsHeader}>
            <span className={styles.subProjectsLabel}>
              <Code2 size={14} />
              פרויקטים שפיתחנו
            </span>
          </div>
          <div className={styles.subProjectsGrid}>
            {/* Project card: Perfume Trades */}
            <a
              href="https://perfume-trades.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.subProjectCard}
            >
              <div className={styles.subProjectIcon}>
                <Smartphone size={20} />
              </div>
              <div className={styles.subProjectInfo}>
                <h4 className={styles.subProjectTitle}>Perfume Trades</h4>
                <p className={styles.subProjectDesc}>
                  פלטפורמת מסחר חברתית לבשמים — מקום שבו חובבי בשמים קונים, מוכרים ומחליפים. 
                  אפליקציית React Native מלאה עם מנגנון ביקורות וניהול מוצרים חי.
                </p>
                <div className={styles.subProjectTech}>
                  <span>React Native</span>
                  <span>Expo</span>
                  <span>Firebase</span>
                  <span>TypeScript</span>
                </div>
              </div>
              <div className={styles.subProjectArrow}>
                <ExternalLink size={16} />
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
