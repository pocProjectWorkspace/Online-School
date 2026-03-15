import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export default function DonutChart({ data = [], size = 180, innerLabel, innerSublabel }) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.32}
            outerRadius={size * 0.44}
            paddingAngle={2}
            dataKey="value"
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-out"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {(innerLabel || innerSublabel) && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          {innerLabel && (
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 500,
                fontSize: 18,
                color: 'var(--text-primary)',
              }}
            >
              {innerLabel}
            </span>
          )}
          {innerSublabel && (
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: 'var(--text-muted)',
                marginTop: 2,
                textAlign: 'center',
                maxWidth: size * 0.5,
              }}
            >
              {innerSublabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
