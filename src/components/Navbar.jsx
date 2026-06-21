import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Menu, X, Terminal } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ראשי', href: '#home' },
    { name: 'אודותיי', href: '#about' },
    { name: 'GalilDevs', href: '#galildevs' },
    { name: 'פרויקטים', href: '#projects' },
    { name: 'כישורים וכלים', href: '#skills' },
    { name: 'צור קשר', href: '#contact' }
  ];

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <a href="#home" className={styles.logo}>
          <Terminal className={styles.logoIcon} />
          <span className={styles.logoText}>דניאל<span className={styles.logoHighlight}>.dev</span></span>
        </a>

        {/* Desktop Menu */}
        <ul className={styles.navMenu}>
          {navLinks.map((link, idx) => (
            <li key={idx} className={styles.navItem}>
              <a href={link.href} className={styles.navLink}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle Button */}
        <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileMenuLinks}>
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <a 
                href={link.href} 
                className={styles.mobileNavLink}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
