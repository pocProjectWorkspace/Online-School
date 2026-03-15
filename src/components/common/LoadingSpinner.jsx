export default function LoadingSpinner({ size = 40, label }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 12, padding: 40,
    }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        border: `3px solid var(--border-subtle)`,
        borderTopColor: 'var(--accent-blue)',
        animation: 'spin 0.8s linear infinite',
      }} />
      {label && (
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)' }}>
          {label}
        </span>
      )}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
