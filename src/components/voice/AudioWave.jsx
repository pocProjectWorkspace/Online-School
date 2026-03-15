export default function AudioWave({ active, color = 'var(--accent-blue)', bars = 5, height = 24 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, height }}>
      {Array.from({ length: bars }, (_, i) => (
        <div
          key={i}
          style={{
            width: 4, borderRadius: 2, background: color,
            height: active ? undefined : 4,
            animation: active ? `audioWaveBar 0.7s ease-in-out ${i * 0.08}s infinite alternate` : 'none',
            transition: 'height 200ms ease',
          }}
        />
      ))}
      <style>{`
        @keyframes audioWaveBar {
          0% { height: 4px; }
          100% { height: ${height}px; }
        }
      `}</style>
    </div>
  )
}
