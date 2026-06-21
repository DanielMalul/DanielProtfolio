import React from 'react';
import styles from './Contact.module.css';
import { Mail, MapPin, Phone } from 'lucide-react';

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

const WhatsAppIcon = (props) => (
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
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function Contact() {
  const whatsappUrl = "https://wa.me/972549069447?text=%D7%94%D7%99%D7%99%20%D7%93%D7%A0%D7%99%D7%90%D7%9C%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%9E%D7%94%D7%A4%D7%95%D7%A8%D7%98%D7%A4%D7%95%D7%9C%D7%99%D7%95%20%D7%A9%D7%9C%D7%9A%21";

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
              מחפשים מפתח תוכנה נלהב לצוות שלכם? פתוחים לשיתופי פעולה מעניינים?
              אני זמין לשיחה מהירה בוואטסאפ, ואשמח לשוחח על הזדמנויות מקצועיות.
            </p>

            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <div className={styles.detailIconWrapper}>
                  <Mail size={20} />
                </div>
                <div className={styles.detailText}>
                  <span className={styles.detailLabel}>כתבו לי במייל</span>
                  <a href="mailto:danielmalul110@gmail.com" className={styles.detailValue}>danielmalul110@gmail.com</a>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIconWrapper}>
                  <MapPin size={20} />
                </div>
                <div className={styles.detailText}>
                  <span className={styles.detailLabel}>מיקום</span>
                  <span className={styles.detailValue}>קריית שמונה, ישראל</span>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIconWrapper}>
                  <Phone size={20} />
                </div>
                <div className={styles.detailText}>
                  <span className={styles.detailLabel}>טלפון</span>
                  <a href="tel:0549069447" className={styles.detailValue}>054-906-9447</a>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIconWrapper}>
                  <LinkedinIcon size={20} />
                </div>
                <div className={styles.detailText}>
                  <span className={styles.detailLabel}>לינקדין</span>
                  <a href="https://www.linkedin.com/in/daniel-malul-914114338/" target="_blank" rel="noopener noreferrer" className={styles.detailValue}>Daniel Malul</a>
                </div>
              </div>
            </div>
          </div>

          {/* Left: WhatsApp Direct Card */}
          <div className={styles.formSide}>
            <div className={`${styles.whatsappCard} glass-card`}>
              <div className={styles.whatsappIconWrapper}>
                <WhatsAppIcon size={48} className={styles.whatsappIcon} />
              </div>
              <h3 className={styles.whatsappTitle}>מענה מהיר בוואטסאפ</h3>
              <p className={styles.whatsappText}>
                לחיצה על הכפתור למטה תפתח שיחה ישירה איתי. 
                אני זמין לענות על שאלות מקצועיות ולדון בהצעות עבודה ומשרות פיתוח.
              </p>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.whatsappBtn} glow-btn`}
              >
                <WhatsAppIcon size={18} />
                <span>שלחו לי הודעה עכשיו</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
