import Link from 'next/link';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import styles from '../styles/Header.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/insurance', label: 'Insurance' },
  { href: '/resume', label: 'Resume' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <Link href="/" className={styles.wordmark} onClick={closeMenu}>
          Achyut Niroula
        </Link>

        <ThemeToggle />
      </div>

      <nav className={`${styles.overlay} ${isMenuOpen ? styles.overlayOpen : ''}`}>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={closeMenu} className={styles.overlayLink}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
