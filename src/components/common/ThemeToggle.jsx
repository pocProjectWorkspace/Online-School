import { useTheme } from '../../context/ThemeContext'

function SunIcon({ size }) {
  const r = size * 0.25
  const lineLen = size * 0.12
  const offset = size * 0.38
  const cx = size / 2
  const cy = size / 2

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={cx} cy={cy} r={r} stroke="var(--accent-amber)" strokeWidth={1.5} fill="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
        const rad = (angle * Math.PI) / 180
        const x1 = cx + (offset - lineLen) * Math.cos(rad)
        const y1 = cy + (offset - lineLen) * Math.sin(rad)
        const x2 = cx + offset * Math.cos(rad)
        const y2 = cy + offset * Math.sin(rad)
        return (
          <line
            key={angle}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--accent-amber)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

function MoonIcon({ size }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.3

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <mask id="moon-mask">
        <rect width={size} height={size} fill="white" />
        <circle cx={cx + r * 0.55} cy={cy - r * 0.35} r={r * 0.75} fill="black" />
      </mask>
      <circle cx={cx} cy={cy} r={r} fill="var(--accent-cyan)" mask="url(#moon-mask)" />
    </svg>
  )
}

export default function ThemeToggle({ size = 'sm', showLabel = false }) {
  const { isDark, toggleTheme } = useTheme()

  const trackW = size === 'sm' ? 48 : 64
  const trackH = size === 'sm' ? 26 : 34
  const thumbSize = trackH - 6
  const iconSize = size === 'sm' ? 14 : 18

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <button
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle theme"
        onClick={toggleTheme}
        style={{
          position: 'relative',
          width: trackW,
          height: trackH,
          borderRadius: trackH,
          border: 'none',
          cursor: 'pointer',
          background: isDark
            ? 'linear-gradient(135deg, #0F1E38, #1A2E50)'
            : 'linear-gradient(135deg, #87CEEB, #B0D4F1)',
          boxShadow: isDark
            ? 'inset 0 1px 3px rgba(0,0,0,0.4)'
            : 'inset 0 1px 3px rgba(0,0,0,0.1)',
          padding: 0,
          overflow: 'hidden',
        }}
      >
        {/* Stars in dark mode */}
        {isDark && (
          <>
            <span style={{ position: 'absolute', top: 6, left: 8, width: 2, height: 2, borderRadius: '50%', background: '#fff', opacity: 0.6 }} />
            <span style={{ position: 'absolute', top: 14, left: 14, width: 1.5, height: 1.5, borderRadius: '50%', background: '#fff', opacity: 0.4 }} />
            <span style={{ position: 'absolute', top: 8, left: 22, width: 1.5, height: 1.5, borderRadius: '50%', background: '#fff', opacity: 0.5 }} />
          </>
        )}

        {/* Thumb */}
        <div
          style={{
            position: 'absolute',
            top: 3,
            left: isDark ? 3 : trackW - thumbSize - 3,
            width: thumbSize,
            height: thumbSize,
            borderRadius: '50%',
            background: isDark ? '#1A2E50' : '#FFFFFF',
            boxShadow: isDark
              ? '0 1px 4px rgba(0,0,0,0.5)'
              : '0 1px 4px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1), background 300ms ease',
          }}
        >
          <div
            style={{
              transition: 'opacity 200ms ease, transform 200ms ease',
              opacity: 1,
              transform: 'scale(1)',
            }}
          >
            {isDark ? <MoonIcon size={iconSize} /> : <SunIcon size={iconSize} />}
          </div>
        </div>
      </button>

      {showLabel && (
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            color: 'var(--text-muted)',
          }}
        >
          {isDark ? 'Night' : 'Day'}
        </span>
      )}
    </div>
  )
}
