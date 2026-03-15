import { useEffect, useState } from 'react'

const gradients = {
  'blue-cyan': 'linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))',
  'purple-blue': 'linear-gradient(90deg, var(--accent-purple), var(--accent-blue))',
  'green-cyan': 'linear-gradient(90deg, var(--accent-green), var(--accent-cyan))',
  'amber-red': 'linear-gradient(90deg, var(--accent-amber), var(--accent-red))',
  blue: 'var(--accent-blue)',
  purple: 'var(--accent-purple)',
  green: 'var(--accent-green)',
  amber: 'var(--accent-amber)',
  red: 'var(--accent-red)',
  cyan: 'var(--accent-cyan)',
}

export default function GradientBar({
  value = 0,
  max = 100,
  gradient = 'blue-cyan',
  label,
  showValue = true,
  height = 8,
  animated = true,
}) {
  const [animatedWidth, setAnimatedWidth] = useState(0)
  const percentage = Math.min((value / max) * 100, 100)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setAnimatedWidth(percentage), 100)
      return () => clearTimeout(timer)
    } else {
      setAnimatedWidth(percentage)
    }
  }, [percentage, animated])

  return (
    <div>
      {(label || showValue) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          {label && (
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: 'var(--text-secondary)',
              }}
            >
              {label}
            </span>
          )}
          {showValue && (
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: 'var(--text-muted)',
              }}
            >
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          borderRadius: height,
          background: 'var(--bg-secondary)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${animatedWidth}%`,
            height: '100%',
            borderRadius: height,
            background: gradients[gradient] || gradient,
            transition: animated ? 'width 1s ease-out' : 'none',
          }}
        />
      </div>
    </div>
  )
}
