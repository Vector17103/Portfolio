import { ReactNode } from 'react';
import styles from './ChartCard.module.css';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  note?: string;
  controls?: ReactNode;
  legend?: { label: string; color: string }[];
}

export default function ChartCard({ title, subtitle, children, note, controls, legend }: ChartCardProps) {
  return (
    <div className={styles.card} role="figure" aria-label={title}>
      <p className={styles.title}>{title}</p>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {controls}
      <div className={styles.chartWrap}>{children}</div>
      {legend && (
        <div className={styles.legend}>
          {legend.map((item) => (
            <span key={item.label} className={styles.legendItem}>
              <span className={styles.legendSwatch} style={{ background: item.color }} />
              {item.label}
            </span>
          ))}
        </div>
      )}
      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}
