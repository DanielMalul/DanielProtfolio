import React, { useState } from 'react';
import styles from './Projects.module.css';
import { ExternalLink, Globe, Smartphone, Code2, Users, Star } from 'lucide-react';

const projects = [
  {
    id: 'galildevs',
    title: 'GalilDevs',
    subtitle: 'סוכנות פיתוח תוכנה',
    url: 'https://galildevs.com',
    displayUrl: 'galildevs.com',
    description: 'סוכנות בוטיק לפיתוח תוכנה שהקמנו יחד - בניית אתרים, אפליקציות ומערכות ניהול ברמה הגבוהה ביותר. שני הנדסאי תוכנה מהגליל שיוצרים פתרונות דיגיטליים פרימיום.',
    tech: ['React', 'Node.js', 'PHP', 'MySQL'],
    icon: <Globe size={28} />,
    accentColor: '#06b6d4',
    accentBg: 'rgba(6, 182, 212, 0.08)',
    accentBorder: 'rgba(6, 182, 212, 0.2)',
    stats: [
      { label: 'לקוחות', value: '10+' },
      { label: 'פרויקטים', value: '15+' },
    ],
    emoji: '🚀',
  },
  {
    id: 'perfume',
    title: 'Perfume Trades',
    subtitle: 'פלטפורמת מסחר בבשמים',
    url: 'https://perfume-trades.com',
    displayUrl: 'perfume-trades.com',
    description: 'פלטפורמת מסחר חברתית לבשמים - מקום שבו חובבי בשמים יכולים לקנות, למכור ולהחליף בשמים. אפליקציה מלאה עם מנגנון ביקורות, מחירים חיים ומשתמשים אמיתיים.',
    tech: ['React Native', 'Expo', 'Firebase', 'TypeScript'],
    icon: <Smartphone size={28} />,
    accentColor: '#c9a84c',
    accentBg: 'rgba(201, 168, 76, 0.08)',
    accentBorder: 'rgba(201, 168, 76, 0.25)',
    stats: [
      { label: 'אפליקציה', value: 'Live' },
      { label: 'פלטפורמה', value: 'iOS & Web' },
    ],
    emoji: '🌸',
  },
];

export default function Projects() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>מה בנינו</span>
          <h2 className={styles.title}>פרויקטים שלנו</h2>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.grid}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={`${styles.card} glass-card`}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                '--accent': project.accentColor,
                '--accent-bg': project.accentBg,
                '--accent-border': project.accentBorder,
                borderColor: hoveredId === project.id ? project.accentColor : undefined,
                boxShadow: hoveredId === project.id
                  ? `0 20px 60px ${project.accentColor}22, 0 0 0 1px ${project.accentColor}33`
                  : undefined,
              }}
            >
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <div className={styles.iconWrap} style={{ background: project.accentBg, borderColor: project.accentBorder, color: project.accentColor }}>
                  {project.icon}
                </div>
                <div className={styles.cardTitles}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <span className={styles.cardSubtitle}>{project.subtitle}</span>
                </div>
                <span className={styles.emoji}>{project.emoji}</span>
              </div>

              {/* Description */}
              <p className={styles.desc}>{project.description}</p>

              {/* Tech Stack */}
              <div className={styles.techList}>
                {project.tech.map((t) => (
                  <span key={t} className={styles.techBadge} style={{ borderColor: project.accentBorder, color: project.accentColor }}>
                    <Code2 size={10} />
                    {t}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className={styles.statsRow}>
                {project.stats.map((s) => (
                  <div key={s.label} className={styles.stat}>
                    <span className={styles.statValue} style={{ color: project.accentColor }}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
                <div className={styles.ratingBadge}>
                  <Star size={12} fill="currentColor" />
                  <span>Live</span>
                </div>
              </div>

              {/* CTA */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.visitBtn}
                style={{ background: project.accentBg, borderColor: project.accentBorder, color: project.accentColor }}
              >
                <Globe size={14} />
                <span>{project.displayUrl}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
