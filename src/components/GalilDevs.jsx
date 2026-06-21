import React from 'react';
import styles from './GalilDevs.module.css';
import { ExternalLink, Layers, ShieldCheck, Zap, Laptop, Smartphone, Search, ShoppingBag } from 'lucide-react';

export default function GalilDevs() {
  const galilServices = [
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

  const perfumeFeatures = [
    {
      icon: <ShoppingBag size={22} />,
      title: 'מסחר חברתי',
      desc: 'פלטפורמה המאפשרת למשתמשים לקנות, למכור ולהחליף בשמים בקלות ובבטחה.'
    },
    {
      icon: <Search size={22} />,
      title: 'מערכת חיפוש וסינון מתקדמת',
      desc: 'חיפוש בשמים חכם, סינון לפי מותג, ריכוז, מצב הבושם ומחיר.'
    },
    {
      icon: <Smartphone size={22} />,
      title: 'חוויית מובייל מושלמת',
      desc: 'אפליקציית React Native מהירה וחלקה עם התראות בזמן אמת וצ׳אט משתמשים (Firebase).'
    }
  ];

  return (
    <section id="galildevs" className={styles.galildevs}>
      <div className={styles.container}>

        {/* ─── Project 1: GalilDevs ─── */}
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
                <Laptop className={styles.mockupIcon} size={36} />
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

            {/* Project 2: Perfume Trades Card */}
            <div className={`${styles.mockupContainer} ${styles.mockupPerfume}`}>
              <div className={styles.mockupHeader}>
                <div className={styles.dots}>
                  <span className={styles.dotRed}></span>
                  <span className={styles.dotYellow}></span>
                  <span className={styles.dotGreen}></span>
                </div>
                <div className={styles.mockupTitle}>perfume-trades.com</div>
              </div>
              <div className={styles.mockupBody}>
                <ShoppingBag className={`${styles.mockupIcon} ${styles.iconGold}`} size={36} />
                <h4 className={styles.mockupText}>Perfume Trades</h4>
                <p className={styles.mockupSubtext}>
                  פלטפורמת מסחר חברתית לבשמים. קנייה, מכירה והחלפה באפליקציה מהירה ומאובטחת.
                </p>
                
                <div className={styles.mockupTech}>
                  <span>React Native</span>
                  <span>Firebase</span>
                  <span>Expo</span>
                </div>

                <a 
                  href="https://perfume-trades.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.mockupBtn}
                >
                  <span>לעמוד האפליקציה</span>
                  <ExternalLink size={14} />
                </a>
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

            <div className={styles.servicesList}>
              {galilServices.map((service, idx) => (
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

      </div>
    </section>
  );
}
