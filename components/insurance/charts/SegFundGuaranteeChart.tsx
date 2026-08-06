import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartCard from './ChartCard';
import { useReducedMotionPref } from './useReducedMotionPref';

// Mirrors the Priya walkthrough on this page: $50,000 deposit, resets after
// strong years lock in a rising floor, market value fluctuates around it.
const DATA = [
  { year: 0, market: 50000, floor: 37500 },
  { year: 1, market: 52000, floor: 39000 },
  { year: 3, market: 48000, floor: 39000 },
  { year: 5, market: 61000, floor: 45750 },
  { year: 7, market: 58000, floor: 45750 },
  { year: 10, market: 71000, floor: 46000 },
  { year: 13, market: 65000, floor: 53250 },
  { year: 16, market: 82000, floor: 53250 },
  { year: 18, market: 95000, floor: 71250 },
  { year: 21, market: 88000, floor: 71250 },
  { year: 25, market: 118000, floor: 58000 },
];

export default function SegFundGuaranteeChart() {
  const reducedMotion = useReducedMotionPref();

  return (
    <ChartCard
      title="How the guarantee floor rises with resets"
      subtitle="Market value moves with the underlying investments. Each reset after a strong year locks that year's value in as the new permanent guaranteed floor, which can never fall even if markets do."
      legend={[
        { label: 'Market value', color: 'var(--chart-2)' },
        { label: 'Guaranteed floor after resets', color: 'var(--chart-1)' },
      ]}
      note="Illustrative, following the Priya example above. Actual reset timing and resulting floor depend on your specific contract, the guarantee level chosen, and real market performance."
    >
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={DATA} margin={{ top: 8, right: 12, left: 0, bottom: 0 }} accessibilityLayer>
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
          <Line type="monotone" dataKey="market" stroke="var(--chart-2)" strokeWidth={2} dot={false} isAnimationActive={!reducedMotion} />
          <Line type="stepAfter" dataKey="floor" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} isAnimationActive={!reducedMotion} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
