import { useEffect, useRef, useState } from 'react';
import styles from './SectionNav.module.css';

const SECTIONS = [
  { id: 'products', label: 'Products' },
  { id: 'accounts', label: 'Accounts' },
];

export default function SectionNav() {
  const [active, setActive] = useState('products');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((el) => sectionObserver.observe(el));

    const accountsSection = document.getElementById('accounts');
    const backToTopObserver = accountsSection
      ? new IntersectionObserver(
          ([entry]) => setShowBackToTop(entry.isIntersecting || entry.boundingClientRect.top < 0),
          { threshold: 0 }
        )
      : null;
    if (accountsSection && backToTopObserver) backToTopObserver.observe(accountsSection);

    return () => {
      sectionObserver.disconnect();
      backToTopObserver?.disconnect();
    };
  }, []);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotionRef.current ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  }

  function handleBackToTop() {
    window.scrollTo({ top: 0, behavior: reducedMotionRef.current ? 'auto' : 'smooth' });
  }

  return (
    <>
      <nav className={styles.nav} aria-label="Insurance page sections">
        <div className={styles.navInner}>
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => handleNavClick(e, s.id)}
              className={`${styles.link}${active === s.id ? ' ' + styles.linkActive : ''}`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <button
        type="button"
        onClick={handleBackToTop}
        aria-label="Back to top"
        className={`${styles.backToTop}${showBackToTop ? ' ' + styles.backToTopVisible : ''}`}
      >
        ↑
      </button>
    </>
  );
}
