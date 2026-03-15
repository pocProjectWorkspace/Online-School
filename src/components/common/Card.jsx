const glowColors = {
  blue: { border: 'var(--accent-blue)', shadow: 'var(--shadow-glow-blue)' },
  purple: { border: 'var(--accent-purple)', shadow: 'var(--shadow-glow-purple)' },
  green: { border: 'var(--accent-green)', shadow: 'var(--shadow-glow-green)' },
  amber: { border: 'var(--accent-amber)', shadow: '0 0 20px rgba(255, 184, 0, 0.25)' },
  red: { border: 'var(--accent-red)', shadow: '0 0 20px rgba(255, 71, 87, 0.25)' },
  cyan: { border: 'var(--accent-cyan)', shadow: '0 0 20px rgba(0, 212, 255, 0.25)' },
}

const paddingSizes = {
  sm: 12,
  md: 20,
  lg: 28,
}

export default function Card({ children, glow, padding = 'md', glass = false, className = '', style = {}, onClick }) {
  const glowStyle = glow && glowColors[glow]

  const baseStyle = {
    background: glass
      ? 'var(--bg-overlay)'
      : 'var(--gradient-card)',
    backdropFilter: glass ? 'blur(12px)' : undefined,
    WebkitBackdropFilter: glass ? 'blur(12px)' : undefined,
    borderRadius: 'var(--radius-lg)',
    padding: paddingSizes[padding],
    boxShadow: glowStyle
      ? `var(--shadow-card), ${glowStyle.shadow}`
      : 'var(--shadow-card)',
    border: glowStyle
      ? `1px solid ${glowStyle.border}`
      : '1px solid var(--border-card)',
    transition: 'box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
    cursor: onClick ? 'pointer' : undefined,
    ...style,
  }

  return (
    <div className={className} style={baseStyle} onClick={onClick}>
      {children}
    </div>
  )
}
