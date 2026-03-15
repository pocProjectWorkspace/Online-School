const statusStyles = {
  Secure: { bg: 'rgba(0, 229, 160, 0.15)', color: 'var(--accent-green)', border: 'var(--accent-green)' },
  Developing: { bg: 'rgba(255, 184, 0, 0.15)', color: 'var(--accent-amber)', border: 'var(--accent-amber)' },
  Excelling: { bg: 'rgba(0, 212, 255, 0.15)', color: 'var(--accent-cyan)', border: 'var(--accent-cyan)', glow: true },
  Emerging: { bg: 'rgba(255, 71, 87, 0.15)', color: 'var(--accent-red)', border: 'var(--accent-red)' },
}

export default function StatusPill({ status }) {
  const s = statusStyles[status] || statusStyles.Developing

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 14px',
        borderRadius: 'var(--radius-pill)',
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}33`,
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: s.glow ? `0 0 12px ${s.border}40` : undefined,
      }}
    >
      {status}
    </span>
  )
}
