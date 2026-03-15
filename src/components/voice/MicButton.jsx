import { Mic } from 'lucide-react'

const stateStyles = {
  idle: { bg: 'var(--bg-card)', border: '2px solid var(--border-subtle)', color: 'var(--text-muted)' },
  listening: { bg: 'var(--accent-red)', border: '2px solid var(--accent-red)', color: '#fff', glow: 'var(--accent-red)' },
  processing: { bg: 'var(--accent-purple)', border: '2px solid var(--accent-purple)', color: '#fff', glow: 'var(--accent-purple)', spin: true },
  speaking: { bg: 'var(--accent-blue)', border: '2px solid var(--accent-blue)', color: '#fff', glow: 'var(--accent-blue)' },
}

export default function MicButton({ state = 'idle', onClick, size = 56, variant = 'default' }) {
  const s = stateStyles[state] || stateStyles.idle

  return (
    <button
      onClick={onClick}
      disabled={state === 'processing' || state === 'speaking'}
      style={{
        width: size, height: size, borderRadius: '50%',
        background: s.bg, border: s.border,
        cursor: state === 'processing' || state === 'speaking' ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: s.glow ? `0 0 20px ${s.glow}40` : 'none',
        position: 'relative', transition: 'all 250ms ease',
      }}
    >
      {/* Pulsing ring for listening */}
      {state === 'listening' && (
        <span style={{
          position: 'absolute', inset: -6, borderRadius: '50%',
          border: '2px solid var(--accent-red)',
          animation: 'pulse 1.5s ease-in-out infinite', opacity: 0.5,
        }} />
      )}

      {/* Spinner for processing */}
      {s.spin ? (
        <span style={{
          width: size * 0.4, height: size * 0.4, borderRadius: '50%',
          border: '2px solid transparent', borderTopColor: '#fff',
          animation: 'spin 0.8s linear infinite',
        }} />
      ) : (
        <Mic size={size * 0.38} color={s.color} />
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </button>
  )
}
