import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartCard from './ChartCard';
import { useReducedMotionPref } from './useReducedMotionPref';

// Mirrors the David walkthrough on this page: $220/month participating
// whole life, cumulative premiums vs. cash surrender value over 25 years.
const DATA = [
  { year: 0, premiums: 0, cashValue: 0 },
  { year: 1, premiums: 2640, cashValue: 400 },
  { year: 5, premiums: 13200, cashValue: 6800 },
  { year: 10, premiums: 26400, cashValue: 18000 },
  { year: 15, premiums: 39600, cashValue: 38000 },
  { year: 20, premiums: 52800, cashValue: 63000 },
  { year: 25, premiums: 66000, cashValue: 95000 },
];

export default function WholeLifeCashValueChart() {
  const reducedMotion = useReducedMotionPref();

  return (
    <ChartCard
      title="Cumulative premiums vs. cash surrender value"
      subtitle="Following the David example above: cash value builds slowly at first, since early premiums cover more of the pure insurance cost, then grows faster as dividends compound."
      legend={[
        { label: 'Cumulative premiums paid', color: 'var(--chart-2)' },
        { label: 'Cash surrender value', color: 'var(--chart-1)' },
      ]}
      note="Illustrative, following the David example above. Actual cash value growth depends on the insurer's declared dividend scale, which is not guaranteed and can change."
    >
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={DATA} margin={{ top: 8, right: 12, left: 0, bottom: 0 }} accessibilityLayer>
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: 'var(--chart-grid)' }}
            label={{ value: 'Years', position: 'insideBottom', offset: -4, fill: 'var(--chart-axis)', fontSize: 11 }}
          />
          <YAxis
            tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
            tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={44}
          />
          <Tooltip
            formatter={(value) => `$${Number(value).toLocaleString()}`}
            labelFormatter={(label) => `Year ${label}`}
            contentStyle={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
          />
          <Area type="monotone" dataKey="premiums" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.15} strokeWidth={2} isAnimationActive={!reducedMotion} />
          <Area type="monotone" dataKey="cashValue" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.25} strokeWidth={2.5} isAnimationActive={!reducedMotion} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
