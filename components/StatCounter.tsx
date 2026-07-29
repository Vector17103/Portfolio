import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../lib/useReveal';
import styles from '../styles/StatCounter.module.css';

interface StatCounterProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function StatCounter({ label, value, prefix = '', suffix = '', duration = 1400 }: StatCounterProps) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.4);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [visible, value, duration]);

  return (
    <div ref={ref} className={styles.stat}>
      <strong className={styles.value}>
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </strong>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
