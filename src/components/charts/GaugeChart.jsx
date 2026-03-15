import { useEffect, useState } from 'react'

export default function GaugeChart({
  value = 0,
  min = 0,
  max = 5,
  label,
  size = 180,
  segments = ['#FF4757', '#FFB800', '#00E5A0'],
}) {
  const [animatedValue, setAnimatedValue] = useState(min)

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 200)
    return () => clearTimeout(timer)
  }, [value])

  const cx = size / 2
  const cy = size * 0.55
  const radius = size * 0.4
  const startAngle = Math.PI
  const endAngle = 0
  const range = max - min
  const normalizedValue = (animatedValue - min) / range

  // Build segment arcs
  const segmentCount = segments.length
  const segmentArcs = segments.map((color, i) => {
    const segStart = startAngle - (i / segmentCount) * Math.PI
    const segEnd = startAngle - ((i + 1) / segmentCount) * Math.PI
    const x1 = cx + radius * Math.cos(segStart)
    const y1 = cy - radius * Math.sin(segStart)
    const x2 = cx + radius * Math.cos(segEnd)
    const y2 = cy - radius * Math.sin(segEnd)
    return { color, d: `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}` }
  })

  // Needle
  const needleAngle = startAngle - normalizedValue * Math.PI
  const needleLen = radius * 0.75
  const nx = cx + needleLen * Math.cos(needleAngle)
  const ny = cy - needleLen * Math.sin(needleAngle)

  return (
    <div style={{ width: size, height: size * 0.65, position: 'relative' }}>
      <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.65}`}>
        {/* Background track */}
        {segmentArcs.map((seg, i) => (
          <path
            key={i}
            d={seg.d}
            fill="none"
            stroke={seg.color}
            strokeWidth={12}
            strokeLinecap="round"
            opacity={0.3}
          />
        ))}

        {/* Active track up to value */}
        {segmentArcs.map((seg, i) => {
          const segFraction = (i + 1) / segmentCount
          if (normalizedValue < i / segmentCount) return null
          const clipFraction = Math.min(normalizedValue, segFraction)
          const segStart = startAngle - (i / segmentCount) * Math.PI
          const segEnd = startAngle - clipFraction * Math.PI
          const x1 = cx + radius * Math.cos(segStart)
          const y1 = cy - radius * Math.sin(segStart)
          const x2 = cx + radius * Math.cos(segEnd)
          const y2 = cy - radius * Math.sin(segEnd)
          const d = `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`
          return (
            <path
              key={`active-${i}`}
              d={d}
              fill="none"
              stroke={seg.color}
              strokeWidth={12}
              strokeLinecap="round"
              style={{ transition: 'all 1s ease-out' }}
            />
          )
        })}

        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke="var(--text-primary)"
          strokeWidth={2.5}
          strokeLinecap="round"
          style={{ transition: 'all 1s ease-out' }}
        />
        <circle cx={cx} cy={cy} r={5} fill="var(--text-primary)" />
      </svg>

      {/* Value label */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            fontSize: 22,
            color: 'var(--text-primary)',
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: 'var(--text-muted)',
          }}
        >
          /{max}
        </span>
        {label && (
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: 'var(--text-muted)',
              marginTop: 2,
            }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  )
}
