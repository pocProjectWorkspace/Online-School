import './AvatarStates.css'

// ─── LUNA (Year 3) ───────────────────────────────────────
export function LunaAvatar({ state = 'idle', size = 180 }) {
  const s = size
  const cx = s / 2, cy = s / 2
  const faceR = s * 0.42

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      className={`avatar-luna avatar-${state}`}
    >
      {/* Face */}
      <circle cx={cx} cy={cy} r={faceR} fill="#F4A261" />

      {/* Hair */}
      <g className="avatar-hair">
        <ellipse cx={cx} cy={cy - faceR * 0.55} rx={faceR * 0.92} ry={faceR * 0.42} fill="#3D2914" />
        <ellipse cx={cx - faceR * 0.6} cy={cy - faceR * 0.15} rx={faceR * 0.24} ry={faceR * 0.38} fill="#3D2914" />
        <ellipse cx={cx + faceR * 0.6} cy={cy - faceR * 0.15} rx={faceR * 0.24} ry={faceR * 0.38} fill="#3D2914" />
        {/* Bangs */}
        <ellipse cx={cx - faceR * 0.2} cy={cy - faceR * 0.35} rx={faceR * 0.22} ry={faceR * 0.18} fill="#4A3420" />
        <ellipse cx={cx + faceR * 0.15} cy={cy - faceR * 0.38} rx={faceR * 0.2} ry={faceR * 0.15} fill="#4A3420" />
      </g>

      {/* Eyebrows */}
      <g className="avatar-eyebrows">
        <path d={`M ${cx - faceR * 0.38} ${cy - faceR * 0.15} Q ${cx - faceR * 0.22} ${cy - faceR * 0.25} ${cx - faceR * 0.08} ${cy - faceR * 0.15}`}
          fill="none" stroke="#3D2914" strokeWidth={s * 0.015} strokeLinecap="round" />
        <path d={`M ${cx + faceR * 0.08} ${cy - faceR * 0.15} Q ${cx + faceR * 0.22} ${cy - faceR * 0.25} ${cx + faceR * 0.38} ${cy - faceR * 0.15}`}
          fill="none" stroke="#3D2914" strokeWidth={s * 0.015} strokeLinecap="round" />
      </g>

      {/* Eyes */}
      <g className="avatar-eyes">
        {/* Left eye */}
        <ellipse cx={cx - faceR * 0.28} cy={cy - faceR * 0.02} rx={faceR * 0.14} ry={faceR * 0.16} fill="white" />
        <circle className="avatar-pupil-l" cx={cx - faceR * 0.28} cy={cy} r={faceR * 0.07} fill="#2D1B0E" />
        <circle cx={cx - faceR * 0.25} cy={cy - faceR * 0.04} r={faceR * 0.03} fill="white" />

        {/* Right eye */}
        <ellipse cx={cx + faceR * 0.28} cy={cy - faceR * 0.02} rx={faceR * 0.14} ry={faceR * 0.16} fill="white" />
        <circle className="avatar-pupil-r" cx={cx + faceR * 0.28} cy={cy} r={faceR * 0.07} fill="#2D1B0E" />
        <circle cx={cx + faceR * 0.31} cy={cy - faceR * 0.04} r={faceR * 0.03} fill="white" />
      </g>

      {/* Nose */}
      <ellipse cx={cx} cy={cy + faceR * 0.12} rx={faceR * 0.06} ry={faceR * 0.04} fill="#E8924A" />

      {/* Blush */}
      <ellipse cx={cx - faceR * 0.4} cy={cy + faceR * 0.18} rx={faceR * 0.12} ry={faceR * 0.07} fill="#E8924A" opacity="0.35" />
      <ellipse cx={cx + faceR * 0.4} cy={cy + faceR * 0.18} rx={faceR * 0.12} ry={faceR * 0.07} fill="#E8924A" opacity="0.35" />

      {/* Mouth — two paths toggled via CSS */}
      <path className="avatar-mouth-closed"
        d={`M ${cx - faceR * 0.18} ${cy + faceR * 0.28} Q ${cx} ${cy + faceR * 0.35} ${cx + faceR * 0.18} ${cy + faceR * 0.28}`}
        fill="none" stroke="#C0392B" strokeWidth={s * 0.016} strokeLinecap="round" />
      <path className="avatar-mouth-open"
        d={`M ${cx - faceR * 0.2} ${cy + faceR * 0.24} Q ${cx} ${cy + faceR * 0.42} ${cx + faceR * 0.2} ${cy + faceR * 0.24}`}
        fill="#C0392B" stroke="#A93226" strokeWidth={1} />

      {/* Shirt hint */}
      <path d={`M ${cx - faceR * 0.55} ${cy + faceR * 0.78} Q ${cx - faceR * 0.25} ${cy + faceR * 0.6} ${cx} ${cy + faceR * 0.68} Q ${cx + faceR * 0.25} ${cy + faceR * 0.6} ${cx + faceR * 0.55} ${cy + faceR * 0.78}`}
        fill="#7B5CF0" opacity="0.85" />

      {/* Thinking dots (hidden by default, shown via CSS) */}
      <g className="avatar-thinking-dots">
        <circle cx={cx - faceR * 0.12} cy={cy + faceR * 0.55} r={faceR * 0.04} fill="var(--accent-purple)" />
        <circle cx={cx} cy={cy + faceR * 0.55} r={faceR * 0.04} fill="var(--accent-purple)" />
        <circle cx={cx + faceR * 0.12} cy={cy + faceR * 0.55} r={faceR * 0.04} fill="var(--accent-purple)" />
      </g>
    </svg>
  )
}

// ─── ALEX (Year 9) ───────────────────────────────────────
export function AlexAvatar({ state = 'idle', size = 180 }) {
  const s = size
  const cx = s / 2, cy = s / 2
  const fw = s * 0.35  // face half-width
  const fh = s * 0.42  // face half-height

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      className={`avatar-alex avatar-${state}`}
    >
      {/* Face — rounded rectangle, slightly angular */}
      <rect x={cx - fw} y={cy - fh * 0.8} width={fw * 2} height={fh * 1.7} rx={fw * 0.45} fill="#C4A882" />

      {/* Hair — short, structured */}
      <rect x={cx - fw * 0.95} y={cy - fh * 0.88} width={fw * 1.9} height={fh * 0.55} rx={fw * 0.35} fill="#2C2C2C" />
      {/* Side hair */}
      <rect x={cx - fw * 0.98} y={cy - fh * 0.65} width={fw * 0.2} height={fh * 0.35} rx={fw * 0.08} fill="#2C2C2C" />
      <rect x={cx + fw * 0.78} y={cy - fh * 0.65} width={fw * 0.2} height={fh * 0.35} rx={fw * 0.08} fill="#2C2C2C" />

      {/* Eyebrows */}
      <g className="avatar-eyebrows">
        <line x1={cx - fw * 0.5} y1={cy - fh * 0.2} x2={cx - fw * 0.12} y2={cy - fh * 0.24}
          stroke="#2C2C2C" strokeWidth={s * 0.018} strokeLinecap="round" />
        <line x1={cx + fw * 0.12} y1={cy - fh * 0.24} x2={cx + fw * 0.5} y2={cy - fh * 0.2}
          stroke="#2C2C2C" strokeWidth={s * 0.018} strokeLinecap="round" />
      </g>

      {/* Eyes — narrower rectangles */}
      <g className="avatar-eyes">
        <rect x={cx - fw * 0.48} y={cy - fh * 0.12} width={fw * 0.3} height={fh * 0.15} rx={fh * 0.05} fill="white" />
        <rect x={cx + fw * 0.18} y={cy - fh * 0.12} width={fw * 0.3} height={fh * 0.15} rx={fh * 0.05} fill="white" />
        <circle className="avatar-pupil-l" cx={cx - fw * 0.33} cy={cy - fh * 0.05} r={fh * 0.055} fill="#1A1A1A" />
        <circle className="avatar-pupil-r" cx={cx + fw * 0.33} cy={cy - fh * 0.05} r={fh * 0.055} fill="#1A1A1A" />
      </g>

      {/* Nose */}
      <line x1={cx} y1={cy + fh * 0.02} x2={cx - fw * 0.04} y2={cy + fh * 0.15}
        stroke="#B09070" strokeWidth={s * 0.012} strokeLinecap="round" />

      {/* Mouth */}
      <line className="avatar-mouth-closed"
        x1={cx - fw * 0.2} y1={cy + fh * 0.28}
        x2={cx + fw * 0.2} y2={cy + fh * 0.28}
        stroke="#8B6B50" strokeWidth={s * 0.013} strokeLinecap="round" />
      <rect className="avatar-mouth-open"
        x={cx - fw * 0.18} y={cy + fh * 0.22}
        width={fw * 0.36} height={fh * 0.12} rx={fh * 0.04}
        fill="#8B4513" />

      {/* Collar / shirt */}
      <path d={`M ${cx - fw * 0.7} ${cy + fh * 0.75} L ${cx - fw * 0.25} ${cy + fh * 0.55} L ${cx} ${cy + fh * 0.65} L ${cx + fw * 0.25} ${cy + fh * 0.55} L ${cx + fw * 0.7} ${cy + fh * 0.75}`}
        fill="#2D7DD2" opacity="0.8" />

      {/* Thinking dots */}
      <g className="avatar-thinking-dots">
        <circle cx={cx - fw * 0.12} cy={cy + fh * 0.6} r={fh * 0.035} fill="var(--accent-blue)" />
        <circle cx={cx} cy={cy + fh * 0.6} r={fh * 0.035} fill="var(--accent-blue)" />
        <circle cx={cx + fw * 0.12} cy={cy + fh * 0.6} r={fh * 0.035} fill="var(--accent-blue)" />
      </g>
    </svg>
  )
}
