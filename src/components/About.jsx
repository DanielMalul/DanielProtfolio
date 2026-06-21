import React from 'react';
import styles from './About.module.css';
import { BookOpen, Code2, Sparkles, Award } from 'lucide-react';

export default function About() {
  const cards = [
    {
      icon: <BookOpen className={styles.cardIcon} size={28} />,
      title: 'לימודי הנדסאי תוכנה',
      description: 'רכשתי ידע תיאורטי ומעשי מקיף במדעי המחשב, מבני נתונים, הנדסת תוכנה, ובסיסי נתונים. הלימודים נתנו לי בסיס אלגוריתמי חזק.'
    },
    {
      icon: <Award className={styles.cardIcon} size={28} />,
      title: 'שותפות ב-GalilDevs',
      description: 'כחלק מהעסק שלי, אני מפתח פתרונות טכנולוגיים פרימיום ללקוחות, החל מאתרי תדמית יוקרתיים ועד למערכות ניהול לעסקים מורכבים.'
    },
    {
      icon: <Sparkles className={styles.cardIcon} size={28} />,
      title: 'חדשנות ו-Agentic AI',
      description: 'אני מרותק מהדור הבא של הטכנולוגיה, במיוחד בינה מלאכותית סוכנותית (Agentic AI), ומיישם סוכני בינה מלאכותית לייעול ופיתוח מערכות חכמות.'
    }
  ];

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>קצת עליי</span>
          <h2 className={styles.title}>המסע המקצועי שלי</h2>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.contentGrid}>
          {/* Right: Text explanation */}
          <div className={styles.textSide}>
            <p className={styles.bioParagraph}>
              שלום! אני דניאל, מפתח תוכנה נלהב והנדסאי תוכנה מוסמך. מאז שגיליתי את עולם הפיתוח, 
              אני מקדיש את זמני ללמידה וליצירת פרויקטים טכנולוגיים שפותרים בעיות אמיתיות.
            </p>
            <p className={styles.bioParagraph}>
              במהלך הלימודים שלי כהנדסאי תוכנה העמקתי במגוון רחב של שפות פיתוח וארכיטקטורות, 
              מפיתוח Low-Level ועד לפיתוח אפליקציות מובייל ומערכות ענן מבוזרות.
            </p>
            <p className={styles.bioParagraph}>
              אני מאמין שקוד הוא לא רק אוסף פקודות, אלא כלי רב עוצמה לעיצוב חוויות משתמש ולהנעת עסקים קדימה. 
              הגישה שלי משלבת בין כתיבת קוד נקי ותחזוקתי לבין עיצוב חזותי בלתי מתפשר.
            </p>

            <div className={styles.personalInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>גיל:</span>
                <span className={styles.infoValue}>21</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>מגורים:</span>
                <span className={styles.infoValue}>קריית שמונה, ישראל</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>טלפון:</span>
                <a href="tel:0549069447" className={styles.infoValue}>054-906-9447</a>
              </div>
            </div>
          </div>

          {/* Left: Highlights Cards */}
          <div className={styles.cardsSide}>
            {cards.map((card, idx) => (
              <div key={idx} className={`${styles.card} glass-card`}>
                <div className={styles.cardIconWrapper}>
                  {card.icon}
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDesc}>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
