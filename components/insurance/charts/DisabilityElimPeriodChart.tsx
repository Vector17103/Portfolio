import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from 'recharts';
import ChartCard from './ChartCard';
import { useReducedMotionPref } from './useReducedMotionPref';

// Illustrative relative premium, indexed to the 30-day elimination period as
// 100, showing the typical direction and rough magnitude of the trade-off.
const DATA = [
  { period: '30 days', relative: 100 },
  { period: '60 days', relative: 84 },
  { period: '90 days', relative: 74 },
  { period: '180 days', relative: 58 },
];

export default function DisabilityElimPeriodChart() {
  const reducedMotion = useReducedMotionPref();

  return (
    <ChartCard
      title="Elimination period vs. relative premium"
      subtitle="Choosing a longer wait before benefits start lowers the premium, since you're self-insuring more of the early weeks yourself. Shown relative to a 30-day elimination period, indexed to 100."
      legend={[{ label: 'Relative premium (30-day = 100)', color: 'var(--chart-1)' }]}
      note="Illustrative relative shape, not a quote. The actual discount for a longer elimination period varies by insurer, occupation, and income."
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={DATA} margin={{ top: 16, right: 12, left: 0, bottom: 0 }} accessibilityLayer>
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="period" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} tickLine={false} axisLine={{ stroke: 'var(--chart-grid)' }} />
          <YAxis tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} tickLine={false} axisLine={false} width={32} domain={[0, 110]} />
          <Tooltip
            formatter={(value) => Number(value)}
            contentStyle={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
          />
          <Bar dataKey="relative" fill="var(--chart-1)" isAnimationActive={!reducedMotion} maxBarSize={64}>
            <LabelList dataKey="relative" position="top" fill="var(--chart-axis)" fontSize={11} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
