import React, { useState } from 'react';
import styles from './Skills.module.css';
import { 
  Terminal, Cpu, Coffee, CheckSquare, FileCode, Database, 
  Server, Smartphone, Layers, Brain, Code2, Code, Wrench, 
  Globe, Compass, Sun, AppWindow, ChevronLeft 
} from 'lucide-react';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('tech');

  const techSkills = [
    { name: 'Python', icon: <Terminal size={20} />, level: 90, color: '#ffde59' },
    { name: 'React', icon: <Cpu size={20} />, level: 95, color: '#61dafb' },
    { name: 'Java', icon: <Coffee size={20} />, level: 85, color: '#f89820' },
    { name: 'QA', icon: <CheckSquare size={20} />, level: 80, color: '#10b981' },
    { name: 'PHP', icon: <FileCode size={20} />, level: 75, color: '#777bb4' },
    { name: 'MongoDB', icon: <Database size={20} />, level: 85, color: '#4db33d' },
    { name: 'SQL', icon: <Server size={20} />, level: 90, color: '#00758f' },
    { name: 'Android', icon: <Smartphone size={20} />, level: 80, color: '#3ddc84' },
    { name: 'Linux', icon: <Layers size={20} />, level: 85, color: '#fcc624' },
    { name: 'Agentic AI', icon: <Brain size={20} />, level: 90, color: '#8b5cf6' }
  ];

  const toolSkills = [
    { name: 'VS Code', icon: <Code2 size={20} />, level: 95, color: '#007acc' },
    { name: 'VS Community', icon: <Code size={20} />, level: 85, color: '#5c2d91' },
    { name: 'Rider JetBrains', icon: <Wrench size={20} />, level: 80, color: '#ff007f' },
    { name: 'PhpMyAdmin', icon: <Globe size={20} />, level: 85, color: '#f09206' },
    { name: 'MongoDB Compass', icon: <Compass size={20} />, level: 90, color: '#439c35' },
    { name: 'Spyder', icon: <Terminal size={20} />, level: 70, color: '#ff5c5c' },
    { name: 'Eclipse', icon: <Sun size={20} />, level: 75, color: '#2c2255' },
    { name: 'IntelliJ', icon: <AppWindow size={20} />, level: 85, color: '#000000' }
  ];

  const activeSkills = activeTab === 'tech' ? techSkills : toolSkills;

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>ארגז הכלים שלי</span>
          <h2 className={styles.title}>כישורים וכלים</h2>
          <div className={styles.divider}></div>
        </div>

        {/* Tab Buttons */}
        <div className={styles.tabContainer}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'tech' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('tech')}
          >
            <Terminal size={18} />
            <span>טכנולוגיות ושפות</span>
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'tools' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('tools')}
          >
            <Wrench size={18} />
            <span>סביבות עבודה וכלים</span>
          </button>
        </div>

        {/* Skills Dashboard Grid */}
        <div className={styles.skillsGrid}>
          {activeSkills.map((skill, idx) => (
            <div 
              key={idx} 
              className={`${styles.skillCard} glass-card`}
              style={{ '--skill-color': skill.color }}
            >
              <div className={styles.skillHeader}>
                <div className={styles.iconWrapper} style={{ backgroundColor: `${skill.color}15`, color: skill.color }}>
                  {skill.icon}
                </div>
                <h3 className={styles.skillName}>{skill.name}</h3>
                <span className={styles.skillLevel}>{skill.level}%</span>
              </div>
              <div className={styles.progressBarBg}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
