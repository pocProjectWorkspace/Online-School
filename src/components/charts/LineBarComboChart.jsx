import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts'

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
      {payload.map((entry, i) => (
        <p
          key={i}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: entry.color,
            margin: '4px 0 0',
          }}
        >
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  )
}

export default function LineBarComboChart({
  data = [],
  barKey = 'barValue',
  lineKey = 'lineValue',
  barName = 'Score',
  lineName = 'Average',
  barColor = 'var(--accent-blue)',
  lineColor = 'var(--accent-cyan)',
  barColors,
  yDomain,
  height = 250,
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
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
          dataKey={barKey}
          name={barName}
          radius={[6, 6, 0, 0]}
          barSize={28}
          isAnimationActive={true}
          animationDuration={1000}
          animationEasing="ease-out"
          fill={barColor}
        >
          {barColors && data.map((_, index) => (
            <Cell key={index} fill={barColors[index % barColors.length]} />
          ))}
        </Bar>
        <Line
          type="monotone"
          dataKey={lineKey}
          name={lineName}
          stroke={lineColor}
          strokeWidth={2}
          dot={{ fill: lineColor, r: 4, strokeWidth: 0 }}
          isAnimationActive={true}
          animationDuration={1000}
          animationEasing="ease-out"
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
