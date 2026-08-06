import { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import ChartCard from './ChartCard';
import { useReducedMotionPref } from './useReducedMotionPref';
import styles from './ChartCard.module.css';

const RATE_OPTIONS = [
  { label: '19.05% (up to $53,891)', value: 0.1905 },
  { label: '29.65% ($58,523–$94,907)', value: 0.2965 },
  { label: '37.91% ($111,814–$117,045)', value: 0.3791 },
  { label: '43.41% ($117,045–$150,000)', value: 0.4341 },
  { label: '53.53% (over $258,482)', value: 0.5353 },
];

function currency(n: number): string {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);
}

function compactCurrency(n: number): string {
  if (Math.abs(n) >= 1000) return `$${Math.round(n / 1000)}k`;
  return `$${Math.round(n)}`;
}

// Future value of an annuity due (contribution made at the start of each
// year), compounded annually at rate r, for `years` years.
function fvAnnuityDue(contribution: number, r: number, years: number): number {
  if (r === 0) return contribution * years;
  return contribution * (((1 + r) ** years - 1) / r) * (1 + r);
}

export default function TfsaRrspComparator() {
  const reducedMotion = useReducedMotionPref();
  const [contribution, setContribution] = useState(7000);
  const [years, setYears] = useState(25);
  const [returnRate, setReturnRate] = useState(5);
  const [rateNow, setRateNow] = useState(RATE_OPTIONS[1].value);
  const [rateRetirement, setRateRetirement] = useState(RATE_OPTIONS[0].value);

  const { data, finalTfsa, finalRrsp, winner, diff } = useMemo(() => {
    const r = returnRate / 100;
    const points: { year: number; TFSA: number; RRSP: number }[] = [];

    for (let y = 1; y <= years; y++) {
      const tfsa = fvAnnuityDue(contribution, r, y);
      const rrspGross = fvAnnuityDue(contribution, r, y);
      const rrspAfterTax = rrspGross * (1 - rateRetirement);
      const refundSide = fvAnnuityDue(contribution * rateNow, r, y);
      points.push({
        year: y,
        TFSA: Math.round(tfsa),
        RRSP: Math.round(rrspAfterTax + refundSide),
      });
    }

    const last = points[points.length - 1];
    const w = last.TFSA === last.RRSP ? 'tie' : last.TFSA > last.RRSP ? 'TFSA' : 'RRSP';
    return {
      data: points,
      finalTfsa: last.TFSA,
      finalRrsp: last.RRSP,
      winner: w,
      diff: Math.abs(last.TFSA - last.RRSP),
    };
  }, [contribution, years, returnRate, rateNow, rateRetirement]);

  const controls = (
    <div className={styles.controls}>
      <label className={styles.control}>
        <span className={styles.controlLabel}>
          Annual contribution <span className={styles.controlValue}>{currency(contribution)}</span>
        </span>
        <input
          type="range"
          min={1000}
          max={15000}
          step={500}
          value={contribution}
          onChange={(e) => setContribution(Number(e.target.value))}
          aria-label="Annual contribution amount"
        />
      </label>

      <label className={styles.control}>
        <span className={styles.controlLabel}>
          Years invested <span className={styles.controlValue}>{years}</span>
        </span>
        <input
          type="range"
          min={5}
          max={40}
          step={1}
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          aria-label="Number of years invested"
        />
      </label>

      <label className={styles.control}>
        <span className={styles.controlLabel}>
          Average annual return <span className={styles.controlValue}>{returnRate}%</span>
        </span>
        <input
          type="range"
          min={2}
          max={9}
          step={0.5}
          value={returnRate}
          onChange={(e) => setReturnRate(Number(e.target.value))}
          aria-label="Average annual return percentage"
        />
      </label>

      <label className={styles.control}>
        <span className={styles.controlLabel}>Your tax rate today</span>
        <select value={rateNow} onChange={(e) => setRateNow(Number(e.target.value))} aria-label="Your marginal tax rate today">
          {RATE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.control}>
        <span className={styles.controlLabel}>Your tax rate in retirement</span>
        <select
          value={rateRetirement}
          onChange={(e) => setRateRetirement(Number(e.target.value))}
          aria-label="Your expected marginal tax rate in retirement"
        >
          {RATE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );

  return (
    <ChartCard
      title="TFSA vs. RRSP: which comes out ahead for you?"
      subtitle="Adjust the numbers to match your own contribution, time horizon, and tax brackets. The RRSP line assumes your tax refund each year is reinvested, since that refund is part of what makes the RRSP work."
      controls={controls}
      legend={[
        { label: 'TFSA (never taxed)', color: 'var(--chart-1)' },
        { label: 'RRSP + reinvested refund, after retirement tax', color: 'var(--chart-2)' },
      ]}
      note="Illustrative only. Assumes contributions at the start of each year, a constant annual return, and today's tax brackets held constant. Real returns vary year to year and tax brackets are indexed annually."
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }} accessibilityLayer>
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="year"
            interval={Math.max(0, Math.ceil(data.length / 6) - 1)}
            tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: 'var(--chart-grid)' }}
            label={{ value: 'Years', position: 'insideBottom', offset: -4, fill: 'var(--chart-axis)', fontSize: 11 }}
          />
          <YAxis
            tickFormatter={compactCurrency}
            tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <Tooltip
            formatter={(value) => currency(Number(value))}
            labelFormatter={(label) => `Year ${label}`}
            contentStyle={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
          />
          <Line
            type="monotone"
            dataKey="TFSA"
            stroke="var(--chart-1)"
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={!reducedMotion}
          />
          <Line
            type="monotone"
            dataKey="RRSP"
            stroke="var(--chart-2)"
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={!reducedMotion}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className={styles.resultRow}>
        <div className={styles.resultStat}>
          <span className={styles.resultLabel}>TFSA after {years} years</span>
          <span className={styles.resultValue}>{currency(finalTfsa)}</span>
        </div>
        <div className={styles.resultStat}>
          <span className={styles.resultLabel}>RRSP after {years} years (after-tax)</span>
          <span className={styles.resultValue}>{currency(finalRrsp)}</span>
        </div>
        <div className={styles.resultStat}>
          <span className={styles.resultLabel}>{winner === 'tie' ? 'Result' : `${winner} comes out ahead by`}</span>
          <span className={styles.resultValue}>{winner === 'tie' ? 'A tie' : currency(diff)}</span>
        </div>
      </div>
    </ChartCard>
  );
}
