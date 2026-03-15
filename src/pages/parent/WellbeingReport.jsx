import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import GradientBar from '../../components/common/GradientBar'
import { wellbeingData } from '../../data/intelligence360'

const trendToBadge = {
  improved: 'improved',
  same: 'same',
  attention: 'attention',
}

const trendToGradient = {
  improved: 'green',
  same: 'blue',
  attention: 'red',
}

function DomainCard({ domain, index }) {
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <Card padding="sm" style={{ marginBottom: 12 }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%', padding: '12px 14px', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-primary)',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, display: 'block' }}>{domain.title}</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{domain.subtitle}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Badge variant={trendToBadge[domain.trend]} />
          {expanded ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
        </div>
      </button>

      {expanded && (
        <div style={{ padding: '4px 14px 14px' }}>
          {/* Survey question */}
          <div style={{
            padding: '10px 14px', marginBottom: 14, borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-secondary)', borderLeft: `3px solid ${domain.trendColor}`,
          }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.5 }}>
              "{domain.question}"
            </p>
          </div>

          {/* Progress bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>First Survey</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-secondary)' }}>{domain.first}/5</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                <div style={{ width: `${(domain.first / 5) * 100}%`, height: '100%', borderRadius: 4, background: 'var(--text-muted)', transition: 'width 1s ease-out' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>Average</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-secondary)' }}>{domain.average}/5</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                <div style={{ width: `${(domain.average / 5) * 100}%`, height: '100%', borderRadius: 4, background: 'var(--accent-blue)', transition: 'width 1s ease-out' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>Latest</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-secondary)' }}>{domain.latest}/5</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                <div style={{ width: `${(domain.latest / 5) * 100}%`, height: '100%', borderRadius: 4, background: domain.trendColor, transition: 'width 1s ease-out' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

function HighlightedSummary({ text }) {
  const highlights = {
    'Emotional Wellbeing': 'var(--accent-green)',
    'Social Connection': 'var(--accent-cyan)',
    'Physical Health': 'var(--accent-green)',
    'Home environment': 'var(--accent-blue)',
    'personal growth': 'var(--accent-blue)',
    'Academic Performance': 'var(--accent-red)',
  }

  let result = text
  const parts = []
  let lastIndex = 0

  Object.entries(highlights).forEach(([term, color]) => {
    const idx = result.indexOf(term, lastIndex)
    if (idx !== -1) {
      if (idx > lastIndex) {
        parts.push({ text: result.slice(lastIndex, idx), color: null })
      }
      parts.push({ text: term, color })
      lastIndex = idx + term.length
    }
  })
  if (lastIndex < result.length) {
    parts.push({ text: result.slice(lastIndex), color: null })
  }

  if (parts.length === 0) {
    return <span>{text}</span>
  }

  return (
    <>
      {parts.map((part, i) =>
        part.color ? (
          <span key={i} style={{ color: part.color, fontWeight: 600 }}>{part.text}</span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  )
}

export default function WellbeingReport() {
  const navigate = useNavigate()

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 900, margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button onClick={() => navigate('/parent/parent360-results')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={20} />
        </button>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20, margin: 0 }}>Parent 360 Wellbeing</h1>
      </div>

      {/* Thank you header */}
      <Card glow="green" padding="lg" style={{ marginBottom: 24, textAlign: 'center' }}>
        <CheckCircle size={40} color="var(--accent-green)" style={{ marginBottom: 12 }} />
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>
          Thank you!
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>
          You have submitted successfully.
        </p>
      </Card>

      {/* Survey Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        <Card padding="md" style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 500, color: 'var(--accent-blue)', display: 'block' }}>{wellbeingData.totalSurveys}</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>Surveys Taken</span>
        </Card>
        <Card padding="md" style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-primary)', display: 'block', fontWeight: 500 }}>{wellbeingData.firstSurveyDate.split(',')[0]}</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>First Survey</span>
        </Card>
        <Card padding="md" style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-primary)', display: 'block', fontWeight: 500 }}>{wellbeingData.recentSurveyDate.split(',')[0]}</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>Latest Survey</span>
        </Card>
      </div>

      {/* Survey Summary heading */}
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 16 }}>Survey Summary</h3>

      {/* Domain Cards */}
      {wellbeingData.domains.map((domain, i) => (
        <DomainCard key={i} domain={domain} index={i} />
      ))}

      {/* AI Summary */}
      <Card glow="purple" padding="lg" style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 18 }}>&#x1F916;</span>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--accent-purple)' }}>AI-Generated Summary</span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          <HighlightedSummary text={wellbeingData.aiSummary} />
        </p>
      </Card>
    </div>
  )
}
