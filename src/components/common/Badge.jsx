const variants = {
  secure: { bg: 'rgba(0, 229, 160, 0.15)', color: 'var(--accent-green)', label: 'Secure' },
  developing: { bg: 'rgba(255, 184, 0, 0.15)', color: 'var(--accent-amber)', label: 'Developing' },
  excelling: { bg: 'rgba(0, 212, 255, 0.15)', color: 'var(--accent-cyan)', label: 'Excelling', glow: true },
  improved: { bg: 'rgba(0, 229, 160, 0.15)', color: 'var(--accent-green)', label: '\u2191 Improved' },
  same: { bg: 'rgba(90, 115, 153, 0.2)', color: 'var(--text-muted)', label: '\u2192 Same' },
  attention: { bg: 'rgba(255, 71, 87, 0.15)', color: 'var(--accent-red)', label: '\u2193 Improvements Required' },
  live: { bg: 'rgba(255, 71, 87, 0.15)', color: 'var(--accent-red)', label: 'Live Now', pulse: true },
  student: { bg: 'rgba(123, 92, 240, 0.15)', color: 'var(--accent-purple)', label: 'Student' },
  teacher: { bg: 'rgba(0, 212, 255, 0.15)', color: 'var(--accent-cyan)', label: 'Teacher' },
  parent: { bg: 'rgba(255, 184, 0, 0.15)', color: 'var(--accent-amber)', label: 'Parent' },
  pending: { bg: 'rgba(255, 71, 87, 0.15)', color: 'var(--accent-red)', label: 'Pending' },
  paid: { bg: 'rgba(0, 229, 160, 0.15)', color: 'var(--accent-green)', label: 'Paid' },
}

export default function Badge({ variant, label: customLabel, style: customStyle = {} }) {
  const v = variants[variant] || variants.same
  const displayLabel = customLabel || v.label

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 12px',
        borderRadius: 'var(--radius-pill)',
        background: v.bg,
        color: v.color,
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: 'nowrap',
        boxShadow: v.glow ? `0 0 12px ${v.color}` : undefined,
        ...customStyle,
      }}
    >
      {v.pulse && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: v.color,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      )}
      {displayLabel}
    </span>
  )
}
