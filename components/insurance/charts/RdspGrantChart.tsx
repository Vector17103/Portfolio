import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from 'recharts';
import ChartCard from './ChartCard';
import { useReducedMotionPref } from './useReducedMotionPref';

// CDSG matching is tiered by family income. Illustrating the two matching
// tiers on the first $1,500 contributed in a year, plus the CDSB for
// lower-income families (no contribution required).
const DATA = [
  { tier: 'Lower income\n(first $500)', contribution: 500, grant: 1500 },
  { tier: 'Lower income\n(next $1,000)', contribution: 1000, grant: 2000 },
  { tier: 'Higher income\n(first $1,000)', contribution: 1000, grant: 1000 },
  { tier: 'CDSB\n(no contribution needed)', contribution: 0, grant: 1000 },
];

export default function RdspGrantChart() {
  const reducedMotion = useReducedMotionPref();

  return (
    <ChartCard
      title="RDSP: government matching by family income tier"
      subtitle="The Canada Disability Savings Grant matches at 300% or 200% depending on family income, and the Canada Disability Savings Bond adds money with no contribution required at all for lower-income families."
      legend={[
        { label: 'Your contribution', color: 'var(--chart-2)' },
        { label: 'Grant/bond received', color: 'var(--chart-1)' },
      ]}
      note="Per-year illustration, not the full lifetime picture. Total CDSG is capped at $70,000 and CDSB at $20,000 over the beneficiary's lifetime; income thresholds are indexed annually."
    >
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={DATA} margin={{ top: 8, right: 12, left: 0, bottom: 24 }} accessibilityLayer>
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="tier"
            tick={{ fill: 'var(--chart-axis)', fontSize: 9.5 }}
            tickLine={false}
            axisLine={{ stroke: 'var(--chart-grid)' }}
            interval={0}
          />
          <YAxis tickFormatter={(v) => `$${v}`} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} tickLine={false} axisLine={false} width={48} />
          <Tooltip
            formatter={(value) => `$${Number(value).toLocaleString()}`}
            contentStyle={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
          />
          <Bar dataKey="contribution" fill="var(--chart-2)" isAnimationActive={!reducedMotion} />
          <Bar dataKey="grant" fill="var(--chart-1)" isAnimationActive={!reducedMotion}>
            <LabelList dataKey="grant" position="top" formatter={(v) => `$${Number(v)}`} fill="var(--chart-axis)" fontSize={11} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
