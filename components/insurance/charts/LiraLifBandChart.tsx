import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartCard from './ChartCard';
import { useReducedMotionPref } from './useReducedMotionPref';

// Min follows the same CRA RRIF prescribed factor as a RRIF. Max follows
// Ontario's FSRA LIF payment formula, which is illustrative here (it depends
// on prevailing long-term bond rates and isn't a fixed schedule); shown to
// convey the shape of the band, not an exact figure for any specific year.
const DATA = [
  { age: 55, min: 2.86, max: 6.4 },
  { age: 60, min: 3.33, max: 6.6 },
  { age: 65, min: 4.0, max: 6.9 },
  { age: 70, min: 5.0, max: 7.3 },
  { age: 75, min: 5.82, max: 8.3 },
  { age: 80, min: 6.82, max: 10.2 },
  { age: 85, min: 8.51, max: 13.6 },
];

export default function LiraLifBandChart() {
  const reducedMotion = useReducedMotionPref();

  return (
    <ChartCard
      title="LIF withdrawal band, Ontario: minimum vs. maximum"
      subtitle="Unlike a RRIF, a LIF has a ceiling as well as a floor. The gap between them is your actual withdrawal flexibility each year."
      legend={[
        { label: 'Minimum (RRIF formula)', color: 'var(--chart-2)' },
        { label: 'Maximum (FSRA formula)', color: 'var(--chart-1)' },
      ]}
      note="Illustrative. The Ontario FSRA maximum formula is tied to prevailing long-term bond rates and changes annually; the shape shown here is representative, not a specific year's exact figures. Confirm current-year factors with FSRA before relying on them."
    >
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={DATA} margin={{ top: 8, right: 12, left: 0, bottom: 0 }} accessibilityLayer>
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
          <Area type="monotone" dataKey="max" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.12} strokeWidth={2} isAnimationActive={!reducedMotion} />
          <Area type="monotone" dataKey="min" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.25} strokeWidth={2} isAnimationActive={!reducedMotion} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
