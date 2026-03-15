import { useRef, useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Transcript({ messages = [], variant = 'default' }) {
  const [expanded, setExpanded] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current && expanded) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, expanded])

  if (messages.length === 0) return null

  const agentColor = variant === 'y3' ? 'var(--accent-purple)' : 'var(--accent-blue)'
  const agentName = variant === 'y3' ? 'Luna' : 'Alex'

  return (
    <div style={{ width: '100%', maxWidth: 520 }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-muted)', fontFamily: "'DM Sans', sans-serif", fontSize: 12,
        }}
      >
        Transcript ({messages.length})
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {expanded && (
        <div
          ref={scrollRef}
          style={{
            maxHeight: 200, overflowY: 'auto', padding: '8px 12px',
            background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex', gap: 8, marginBottom: 8,
                flexDirection: msg.role === 'student' ? 'row-reverse' : 'row',
              }}
            >
              <div
                style={{
                  padding: '6px 12px', borderRadius: 'var(--radius-md)',
                  maxWidth: '80%',
                  background: msg.role === 'student' ? 'rgba(0,229,160,0.1)' : `${agentColor}15`,
                  borderLeft: msg.role === 'agent' ? `3px solid ${agentColor}` : 'none',
                  borderRight: msg.role === 'student' ? '3px solid var(--accent-green)' : 'none',
                }}
              >
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, display: 'block', marginBottom: 2,
                  color: msg.role === 'student' ? 'var(--accent-green)' : agentColor,
                }}>
                  {msg.role === 'student' ? 'You' : agentName}
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {msg.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
