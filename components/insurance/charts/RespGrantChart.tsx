import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartCard from './ChartCard';
import { useReducedMotionPref } from './useReducedMotionPref';

// $2,500/year contribution captures the full $500/year CESG match, to the
// $7,200 lifetime cap (reached partway through year 15 at this rate).
const DATA = Array.from({ length: 15 }, (_, i) => {
  const year = i + 1;
  const cumContribution = year * 2500;
  const grantThisYear = Math.min(500, Math.max(0, 7200 - (year - 1) * 500));
  return { year, contribution: 2500, grant: grantThisYear, cumContribution };
});

export default function RespGrantChart() {
  const reducedMotion = useReducedMotionPref();

  return (
    <ChartCard
      title="RESP: your contribution vs. the CESG match"
      subtitle="Contributing $2,500/year captures the full 20% Canada Education Savings Grant, until the $7,200 lifetime cap is reached."
      legend={[
        { label: 'Your contribution', color: 'var(--chart-2)' },
        { label: 'CESG grant received', color: 'var(--chart-1)' },
      ]}
      note="Illustrative at the $2,500/year contribution level. Grant matching continues until the $7,200 lifetime cap per beneficiary is reached, shown here partway through year 15."
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={DATA} margin={{ top: 8, right: 12, left: 0, bottom: 0 }} accessibilityLayer>
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: 'var(--chart-grid)' }}
            interval={1}
            label={{ value: 'Year', position: 'insideBottom', offset: -4, fill: 'var(--chart-axis)', fontSize: 11 }}
          />
          <YAxis tickFormatter={(v) => `$${v}`} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} tickLine={false} axisLine={false} width={48} />
          <Tooltip
            formatter={(value) => `$${Number(value).toLocaleString()}`}
            labelFormatter={(label) => `Year ${label}`}
            contentStyle={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
          />
          <Bar dataKey="contribution" stackId="a" fill="var(--chart-2)" isAnimationActive={!reducedMotion} />
          <Bar dataKey="grant" stackId="a" fill="var(--chart-1)" isAnimationActive={!reducedMotion} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
