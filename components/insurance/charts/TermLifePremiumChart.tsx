import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartCard from './ChartCard';
import { useReducedMotionPref } from './useReducedMotionPref';

// Illustrative relative shape: monthly premium for a healthy non-smoker,
// $500,000, 20-year term, purchased at each age shown. Not a rate table.
const DATA = [
  { age: 25, premium: 22 },
  { age: 30, premium: 27 },
  { age: 35, premium: 35 },
  { age: 40, premium: 52 },
  { age: 45, premium: 78 },
  { age: 50, premium: 122 },
  { age: 55, premium: 185 },
  { age: 60, premium: 280 },
];

export default function TermLifePremiumChart() {
  const reducedMotion = useReducedMotionPref();

  return (
    <ChartCard
      title="Why buying term life earlier costs less"
      subtitle="Illustrative monthly premium for a healthy non-smoker buying a $500,000, 20-year term policy at each age. The rate is locked in for the whole term, so age at purchase matters more than most people expect."
      legend={[{ label: 'Approx. monthly premium', color: 'var(--chart-1)' }]}
      note="Illustrative shape only, not a quote. Actual premiums depend on health, smoking status, coverage amount, term length, and the specific insurer."
    >
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={DATA} margin={{ top: 8, right: 12, left: 0, bottom: 0 }} accessibilityLayer>
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="age"
            tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: 'var(--chart-grid)' }}
            label={{ value: 'Age at purchase', position: 'insideBottom', offset: -4, fill: 'var(--chart-axis)', fontSize: 11 }}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip
            formatter={(value) => `~$${Number(value)}/mo`}
            labelFormatter={(label) => `Age ${label}`}
            contentStyle={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
          />
          <Line type="monotone" dataKey="premium" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ r: 3 }} isAnimationActive={!reducedMotion} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
