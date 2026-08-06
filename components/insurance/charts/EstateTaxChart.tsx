import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartCard from './ChartCard';
import { useReducedMotionPref } from './useReducedMotionPref';

// Ontario Estate Administration Tax: 0% on the first $50,000, ~1.5% above
// that. A directly named beneficiary bypasses probate, and this tax, entirely.
const DATA = [
  { estate: '$250k', probate: Math.round((250000 - 50000) * 0.015), bypass: 0 },
  { estate: '$500k', probate: Math.round((500000 - 50000) * 0.015), bypass: 0 },
  { estate: '$1M', probate: Math.round((1000000 - 50000) * 0.015), bypass: 0 },
];

export default function EstateTaxChart() {
  const reducedMotion = useReducedMotionPref();

  return (
    <ChartCard
      title="Ontario Estate Administration Tax: probate vs. named beneficiary"
      subtitle="Assets passing through probate owe roughly 1.5% above the first $50,000. A segregated fund contract with a named beneficiary bypasses probate, and this tax, on that portion entirely."
      legend={[
        { label: 'Estate Administration Tax owed (via probate)', color: 'var(--chart-1)' },
        { label: 'Tax owed with a named beneficiary', color: 'var(--chart-2)' },
      ]}
      note="Based on Ontario's Estate Administration Tax: 0% on the first $50,000, approximately 1.5% above that. Other estate costs (legal, executor fees) aren't included here."
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={DATA} margin={{ top: 8, right: 12, left: 0, bottom: 0 }} accessibilityLayer>
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="estate" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} tickLine={false} axisLine={{ stroke: 'var(--chart-grid)' }} />
          <YAxis
            tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
            tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={44}
          />
          <Tooltip
            formatter={(value) => `$${Number(value).toLocaleString()}`}
            contentStyle={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
          />
          <Bar dataKey="probate" fill="var(--chart-1)" isAnimationActive={!reducedMotion} maxBarSize={48} />
          <Bar dataKey="bypass" fill="var(--chart-2)" isAnimationActive={!reducedMotion} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
