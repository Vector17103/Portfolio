import { ReactNode } from 'react';
import { useReveal } from '../lib/useReveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export default function Reveal({ children, className, delay = 0, threshold }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>(threshold);
  return (
    <div
      ref={ref}
      data-reveal
      className={visible ? `${className ?? ''} is-visible` : className}
      style={{ '--reveal-delay': `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
