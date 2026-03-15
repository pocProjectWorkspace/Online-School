import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import Card from '../../components/common/Card'

const surveyDomains = [
  { icon: "\uD83D\uDE0A", title: "Emotional Wellbeing", subtitle: "Happiness, Stress, Emotional Expression", question: "How happy and emotionally positive has Rayan seemed this week?", lastRating: 3, lastDate: "1 March 2026" },
  { icon: "\uD83C\uDFE0", title: "Home Environment", subtitle: "Safety, Support, Family Bonding", question: "How well is Rayan connecting and engaging with your family this week?", lastRating: 4, lastDate: "1 March 2026" },
  { icon: "\uD83D\uDCAA", title: "Physical Health", subtitle: "Energy, Sleep, Activity", question: "How would you describe Rayan's energy levels, sleep and physical activity this week?", lastRating: 4, lastDate: "1 March 2026" },
  { icon: "\uD83C\uDF31", title: "Personal Growth", subtitle: "Confidence, Curiosity, Independence", question: "How confident and motivated has Rayan been in trying new things or taking responsibility?", lastRating: 3, lastDate: "1 March 2026" },
  { icon: "\uD83D\uDCD6", title: "Academic Focus", subtitle: "Engagement, Understanding, Effort", question: "How engaged and focused has Rayan been with his schoolwork and learning this week?", lastRating: 2, lastDate: "1 March 2026" },
]

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0)

  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3, 4, 5].map(star => {
        const filled = star <= (hover || value)
        return (
          <button key={star}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(star)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontSize: 36, lineHeight: 1,
              color: filled ? 'var(--accent-amber)' : 'var(--text-muted)',
              filter: filled ? 'drop-shadow(0 0 6px rgba(255,184,0,0.4))' : 'none',
              transform: value === star ? 'scale(1)' : undefined,
              transition: 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), color 150ms ease, filter 150ms ease',
              animation: value === star ? 'starPop 300ms ease' : undefined,
            }}
          >
            {filled ? '\u2605' : '\u2606'}
          </button>
        )
      })}
      <style>{`
        @keyframes starPop {
          0% { transform: scale(1); }
          40% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

function AnimatedCheckmark() {
  return (
    <div style={{ width: 64, height: 64, margin: '0 auto 20px', position: 'relative' }}>
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill="none" stroke="var(--accent-green)" strokeWidth="3"
          strokeDasharray="176" strokeDashoffset="0"
          style={{ animation: 'drawCircle 600ms ease forwards' }}
        />
        <path d="M 20 32 L 28 40 L 44 24" fill="none" stroke="var(--accent-green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="40" strokeDashoffset="40"
          style={{ animation: 'drawCheck 400ms ease 400ms forwards' }}
        />
      </svg>
      <style>{`
        @keyframes drawCircle { from { stroke-dashoffset: 176; } to { stroke-dashoffset: 0; } }
        @keyframes drawCheck { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  )
}

export default function Parent360Survey() {
  const navigate = useNavigate()
  const [ratings, setRatings] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const allRated = Object.keys(ratings).length === surveyDomains.length
  const handleRate = (idx, val) => setRatings(prev => ({ ...prev, [idx]: val }))

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 800)
  }

  if (submitted) {
    return (
      <div style={{ padding: '60px 32px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <AnimatedCheckmark />
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Thank you, Mrs. Sharma.</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 8 }}>
          Your responses have been shared with Rayan's pastoral team at GEMS Wellington International School.
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28 }}>
          His Form Tutor, Mr. Thompson, will be notified of your feedback. The school will follow up on any areas of concern within 2 school days.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <button onClick={() => navigate('/parent/parent360-results')} style={{
            padding: '10px 24px', background: 'var(--gradient-ai)', border: 'none', borderRadius: 'var(--radius-pill)',
            color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>View Survey Trends &rarr;</button>
          <button onClick={() => navigate('/parent')} style={{
            padding: '10px 24px', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-pill)',
            color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>Return to Dashboard &rarr;</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 700, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <span style={{ fontSize: 28 }}>{"\uD83D\uDCAC"}</span>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, margin: '8px 0 4px' }}>Parent 360</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: 8 }}>
          "Your voice shapes Rayan's school experience"
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>
          Sunday, 15 March 2026 · 6 surveys completed · Est. time: 60 seconds
        </p>
      </div>

      {/* Survey Cards */}
      {surveyDomains.map((domain, i) => (
        <Card key={i} padding="lg" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 22 }}>{domain.icon}</span>
            <div>
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, display: 'block' }}>{domain.title}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>{domain.subtitle}</span>
            </div>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 14 }}>
            {domain.question}
          </p>
          <StarRating value={ratings[i] || 0} onChange={(val) => handleRate(i, val)} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', marginTop: 10 }}>
            Your last rating: {'★'.repeat(domain.lastRating)}{'☆'.repeat(5 - domain.lastRating)} ({domain.lastRating}.0) · {domain.lastDate}
          </p>
        </Card>
      ))}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!allRated || submitting}
        style={{
          width: '100%', padding: '14px', background: allRated ? 'var(--gradient-ai)' : 'var(--bg-card)',
          border: allRated ? 'none' : '1px solid var(--border-card)', borderRadius: 'var(--radius-md)',
          cursor: allRated ? 'pointer' : 'not-allowed', color: allRated ? '#fff' : 'var(--text-muted)',
          fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
          opacity: submitting ? 0.7 : 1, transition: 'all 250ms ease',
        }}
      >
        {submitting ? 'Submitting...' : 'Share with GEMS Wellington \u2192'}
      </button>
    </div>
  )
}
