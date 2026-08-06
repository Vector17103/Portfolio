import { useEffect, useState } from 'react';

// Shared across every chart so Recharts' entrance/transition animation is
// skipped for anyone with prefers-reduced-motion set, without each chart
// re-implementing the matchMedia listener.
export function useReducedMotionPref(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
