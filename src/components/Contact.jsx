import React, { useState } from 'react';
import styles from './Contact.module.css';
import { Mail, MapPin, Send, Check } from 'lucide-react';

const GithubIcon = (props) => (
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
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      // Simulate form submission
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>דברו איתי</span>
          <h2 className={styles.title}>יצירת קשר</h2>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.grid}>
          {/* Right: Contact Information */}
          <div className={styles.infoSide}>
            <h3 className={styles.infoTitle}>בואו נשתף פעולה</h3>
            <p className={styles.infoText}>
              יש לכם פרויקט בראש? צריכים פיתוח תוכנה מותאם אישית ברמת פרימיום? 
              השאירו פרטים ואחזור אליכם בהקדם האפשרי.
            </p>

            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <div className={styles.detailIconWrapper}>
                  <Mail size={20} />
                </div>
                <div className={styles.detailText}>
                  <span className={styles.detailLabel}>כתבו לי במייל</span>
                  <a href="mailto:info@galildevs.com" className={styles.detailValue}>info@galildevs.com</a>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIconWrapper}>
                  <MapPin size={20} />
                </div>
                <div className={styles.detailText}>
                  <span className={styles.detailLabel}>מיקום</span>
                  <span className={styles.detailValue}>הגליל, ישראל</span>
                </div>
              </div>
            </div>

            <div className={styles.socials}>
              <a 
                href="https://github.com/galildev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialBtn}
                aria-label="Github Profile"
              >
                <GithubIcon size={20} />
              </a>
            </div>
          </div>

          {/* Left: Contact Form */}
          <div className={styles.formSide}>
            <form onSubmit={handleSubmit} className={`${styles.form} glass-card`}>
              {isSubmitted ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>
                    <Check size={32} />
                  </div>
                  <h3>ההודעה נשלחה בהצלחה!</h3>
                  <p>תודה שפנית, אחזור אליך בהקדם.</p>
                </div>
              ) : (
                <>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>שם מלא</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={styles.input} 
                      placeholder="ישראל ישראלי" 
                      required 
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>כתובת אימייל</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={styles.input} 
                      placeholder="yourname@example.com" 
                      required 
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="message" className={styles.label}>הודעה</label>
                    <textarea 
                      id="message" 
                      rows="5"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={styles.textarea} 
                      placeholder="איך אוכל לעזור לך?" 
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className={`${styles.submitBtn} glow-btn`}>
                    <span>שלח הודעה</span>
                    <Send size={16} />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
