import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const multiColors = ['#2D7DD2', '#7B5CF0', '#B06AF0', '#00E5A0']

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div
      style={{
        background: 'var(--tooltip-bg)',
        border: '1px solid var(--tooltip-border)',
        borderRadius: 'var(--radius-md)',
        padding: '8px 14px',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>
        {label}
      </p>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: 'var(--text-primary)', margin: '4px 0 0' }}>
        {payload[0].value}
      </p>
    </div>
  )
}

export default function AnimatedBarChart({
  data = [],
  yDomain = [0, 5],
  color = 'multi',
  height = 250,
  barSize = 32,
}) {
  const singleColor = color !== 'multi' ? color : null

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
        <CartesianGrid
          stroke="var(--chart-grid)"
          strokeDasharray="4 4"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          tick={{ fill: 'var(--chart-axis)', fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={yDomain}
          tick={{ fill: 'var(--chart-axis)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar
          dataKey="value"
          radius={[6, 6, 0, 0]}
          barSize={barSize}
          isAnimationActive={true}
          animationDuration={1000}
          animationEasing="ease-out"
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={singleColor || multiColors[index % multiColors.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
