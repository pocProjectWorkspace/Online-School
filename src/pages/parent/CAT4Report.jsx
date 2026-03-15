import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronDown, ChevronUp, Download } from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import GradientBar from '../../components/common/GradientBar'
import AnimatedBarChart from '../../components/charts/AnimatedBarChart'
import { cat4Data } from '../../data/intelligence360'

function useCountUp(target, duration = 800) {
  const [v, setV] = useState(0)
  useEffect(() => {
    let s = 0
    const step = target / (duration / 16)
    const t = setInterval(() => {
      s += step
      if (s >= target) { setV(target); clearInterval(t) }
      else setV(Math.round(s))
    }, 16)
    return () => clearInterval(t)
  }, [target, duration])
  return v
}

function PercentileSpectrum({ percentile }) {
  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>1st</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>25th</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>50th</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>75th</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>99th</span>
      </div>
      <div style={{ position: 'relative', height: 12, borderRadius: 6, background: 'linear-gradient(90deg, #FF4757, #FFB800, #2D7DD2, #00E5A0)', overflow: 'visible' }}>
        <div style={{
          position: 'absolute', top: -6, left: `${percentile}%`, transform: 'translateX(-50%)',
          width: 24, height: 24, borderRadius: '50%', background: '#fff',
          border: '3px solid var(--accent-blue)', boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          transition: 'left 1s ease-out', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: 'var(--accent-blue)', fontWeight: 700 }}>{percentile}</span>
        </div>
      </div>
    </div>
  )
}

export default function CAT4Report() {
  const navigate = useNavigate()
  const [showDetails, setShowDetails] = useState(false)
  const sasCount = useCountUp(cat4Data.overallSAS)

  const barData = cat4Data.domains.map(d => ({ name: d.name, value: d.score }))

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 900, margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/parent/intelligence360')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <ChevronLeft size={20} />
          </button>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20, margin: 0 }}>CAT4 Cognitive Assessment</h1>
        </div>
        <button onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', cursor: 'pointer', color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}>
          <Download size={14} /> Download PDF
        </button>
      </div>

      {/* Hero Score */}
      <Card glow="blue" padding="lg" style={{ marginBottom: 20, textAlign: 'center' }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Overall Performance</span>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 64, fontWeight: 500, color: 'var(--accent-blue)', lineHeight: 1 }}>
          {sasCount}
        </div>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-secondary)', display: 'block', margin: '4px 0 12px' }}>Standard Age Score (SAS)</span>
        <Badge variant="excelling" label={`${cat4Data.percentileRank}th Percentile`} />
        <GradientBar value={cat4Data.overallSAS} max={160} gradient="blue-cyan" label="" showValue={false} height={10} animated style={{ marginTop: 16 }} />
        <PercentileSpectrum percentile={cat4Data.percentileRank} />
      </Card>

      {/* SAS Comparison */}
      <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <Card padding="md">
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Global Average</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 32, fontWeight: 500, color: 'var(--text-primary)' }}>{cat4Data.globalSAS}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: 'var(--accent-red)' }}>{cat4Data.globalDelta} below Rayan</span>
          </div>
        </Card>
        <Card padding="md">
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Regional (UAE)</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 32, fontWeight: 500, color: 'var(--text-primary)' }}>{cat4Data.regionalSAS}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: 'var(--accent-red)' }}>{cat4Data.regionalDelta} below Rayan</span>
          </div>
        </Card>
      </div>

      {/* Domain Bar Chart */}
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 12 }}>Domain Breakdown</h3>
      <Card padding="md" style={{ marginBottom: 20 }}>
        <AnimatedBarChart data={barData} yDomain={[0, 5]} color="multi" height={260} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16, justifyContent: 'center' }}>
          {cat4Data.domains.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: d.color }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{d.name}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-muted)' }}>SAS {d.sas} · {d.percentile}th %ile</span>
            </div>
          ))}
        </div>
      </Card>

      {/* What this means */}
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 12 }}>What This Means</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {cat4Data.insights.map((insight, i) => (
          <Card key={i} padding="md">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ fontSize: 24, lineHeight: 1 }}>{insight.icon}</span>
              <div>
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 4 }}>{insight.title}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{insight.desc}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Performance Summary */}
      <button onClick={() => setShowDetails(!showDetails)} style={{
        width: '100%', padding: '12px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', color: 'var(--accent-blue)', fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 20,
      }}>
        {showDetails ? 'Hide Performance Summary' : 'View Performance Summary'}
        {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {showDetails && (
        <Card padding="lg" style={{ marginBottom: 20 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            The Cognitive Abilities Test (CAT4) measures abilities across four domains: Verbal Reasoning,
            Quantitative Reasoning, Non-Verbal Reasoning, and Spatial Ability. {cat4Data.studentName}'s overall
            SAS of {cat4Data.overallSAS} places them in the {cat4Data.percentileRank}th percentile,
            meaning they scored higher than {cat4Data.percentileRank}% of students their age globally.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: 12 }}>
            Their strongest domain is <strong style={{ color: 'var(--accent-purple)' }}>Quantitative Reasoning</strong> (SAS {cat4Data.domains[1].sas}, {cat4Data.domains[1].percentile}th percentile),
            indicating exceptional ability in mathematical and logical problem solving. <strong style={{ color: 'var(--accent-blue)' }}>Verbal Reasoning</strong> (SAS {cat4Data.domains[0].sas}, {cat4Data.domains[0].percentile}nd percentile)
            is strong but represents the most significant growth opportunity.
          </p>
        </Card>
      )}

      {/* Navigation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Card padding="md" onClick={() => navigate('/parent/ngrt')} style={{ cursor: 'pointer' }}>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--accent-cyan)' }}>NGRT Report &rarr;</span>
        </Card>
        <Card padding="md" onClick={() => navigate('/parent/psychometric')} style={{ cursor: 'pointer' }}>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--accent-purple)' }}>Psychometric &rarr;</span>
        </Card>
      </div>
    </div>
  )
}
