import { LunaAvatar, AlexAvatar } from './SVGAvatar'

const ringColors = {
  idle: 'var(--border-subtle)',
  speaking: 'var(--accent-blue)',
  listening: 'var(--accent-green)',
  thinking: 'var(--accent-purple)',
  happy: 'var(--accent-amber)',
  encouraging: 'var(--accent-cyan)',
}

export default function AvatarContainer({
  variant = 'luna',
  state = 'idle',
  size = 200,
  showRing = true,
}) {
  const Avatar = variant === 'luna' ? LunaAvatar : AlexAvatar
  const avatarSize = showRing ? size - 24 : size
  const ringColor = ringColors[state] || ringColors.idle

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Animated ring */}
      {showRing && (
        <svg
          width={size}
          height={size}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <defs>
            <linearGradient id={`ring-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={variant === 'luna' ? 'var(--accent-purple)' : 'var(--accent-blue)'} />
              <stop offset="100%" stopColor={variant === 'luna' ? 'var(--accent-cyan)' : 'var(--accent-cyan)'} />
            </linearGradient>
          </defs>
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 3}
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth={2}
          />
          {/* Accent ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 3}
            fill="none"
            stroke={ringColor}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray={state === 'idle' ? `${Math.PI * (size - 6) * 0.25} ${Math.PI * (size - 6) * 0.75}` : `${Math.PI * (size - 6)}`}
            style={{
              transition: 'stroke 400ms ease, stroke-dasharray 400ms ease',
              transformOrigin: 'center',
              animation: state === 'speaking'
                ? 'ringSpin 3s linear infinite'
                : state === 'listening'
                ? 'ringPulse 1.5s ease-in-out infinite'
                : undefined,
            }}
          />
        </svg>
      )}

      <Avatar state={state} size={avatarSize} />

      <style>{`
        @keyframes ringSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
