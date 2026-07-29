import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../lib/useTheme';
import styles from '../styles/Header.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
}
