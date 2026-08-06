import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartCard from './ChartCard';
import { useReducedMotionPref } from './useReducedMotionPref';

// CRA prescribed RRIF minimum withdrawal factors, 1 / (90 - age) below 71,
// prescribed schedule from 71 on. Matches the table already on the RRIF page.
const DATA = [
  { age: 65, min: 4.0 },
  { age: 70, min: 5.0 },
  { age: 71, min: 5.28 },
  { age: 75, min: 5.82 },
  { age: 80, min: 6.82 },
  { age: 85, min: 8.51 },
  { age: 90, min: 11.92 },
  { age: 95, min: 20.0 },
];

export default function RrifWithdrawalChart() {
  const reducedMotion = useReducedMotionPref();

  return (
    <ChartCard
      title="RRIF minimum withdrawal rate by age"
      subtitle="The percentage of your RRIF's value you're required to withdraw (and pay tax on) climbs every year, sharply after 80."
      legend={[{ label: 'Prescribed minimum %', color: 'var(--chart-1)' }]}
      note="Based on the CRA prescribed RRIF factor schedule. Your actual minimum is calculated on your RRIF's value at the start of each year."
    >
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={DATA} margin={{ top: 8, right: 12, left: 0, bottom: 0 }} accessibilityLayer>
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="age"
            tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: 'var(--chart-grid)' }}
            label={{ value: 'Age', position: 'insideBottom', offset: -4, fill: 'var(--chart-axis)', fontSize: 11 }}
          />
          <YAxis
            tickFormatter={(v) => `${v}%`}
            tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip
            formatter={(value) => `${Number(value)}%`}
            labelFormatter={(label) => `Age ${label}`}
            contentStyle={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
          />
          <Line type="monotone" dataKey="min" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ r: 3 }} isAnimationActive={!reducedMotion} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
