import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { ChevronLeft, ChevronDown, ChevronUp, Check } from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import { wellbeingData, parent360TrendData } from '../../data/intelligence360'

const domainColors = {
  emotional: '#00E5A0',
  home: '#2D7DD2',
  physical: '#FFB800',
  growth: '#7B5CF0',
  academic: '#FF4757',
}

const domainKeys = ['emotional', 'home', 'physical', 'growth', 'academic']
const domainLabels = { emotional: 'Emotional', home: 'Home', physical: 'Physical', growth: 'Growth', academic: 'Academic' }

function TrendTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)', borderRadius: 'var(--radius-md)', padding: '10px 14px', boxShadow: 'var(--shadow-card)' }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: entry.color, margin: '3px 0 0' }}>
          {domainLabels[entry.dataKey] || entry.dataKey}: {entry.value}
        </p>
      ))}
    </div>
  )
}

function DomainResultCard({ domain, index }) {
  const [expanded, setExpanded] = useState(index === 0)
  const trendBadge = domain.trend === 'improved' ? 'improved' : domain.trend === 'same' ? 'same' : 'attention'

  return (
    <Card padding="sm" style={{ marginBottom: 10 }}>
      <button onClick={() => setExpanded(!expanded)} style={{
        width: '100%', padding: '12px 14px', background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-primary)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 500, color: domain.trendColor }}>{domain.latest}</span>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, display: 'block' }}>{domain.title}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{domain.subtitle}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Badge variant={trendBadge} />
          {expanded ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
        </div>
      </button>
      {expanded && (
        <div style={{ padding: '4px 14px 14px' }}>
          <div style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', borderLeft: `3px solid ${domain.trendColor}`, marginBottom: 14 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>"{domain.question}"</p>
          </div>
          {[
            { label: 'First Survey', value: domain.first, color: 'var(--text-muted)' },
            { label: 'Average', value: domain.average, color: 'var(--accent-blue)' },
            { label: 'Latest', value: domain.latest, color: domain.trendColor },
          ].map((bar, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>{bar.label}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-secondary)' }}>{bar.value}/5</span>
              </div>
              <div style={{ height: 7, borderRadius: 4, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                <div style={{ width: `${(bar.value / 5) * 100}%`, height: '100%', borderRadius: 4, background: bar.color, transition: 'width 1s ease-out' }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

function HighlightedText({ text }) {
  const highlights = {
    'Emotional Wellbeing': '#00E5A0', 'Social Connection': '#00D4FF', 'Physical Health': '#FFB800',
    'home environment': '#2D7DD2', 'Personal growth': '#7B5CF0', 'Academic Performance': '#FF4757',
    'Academic\nPerformance': '#FF4757',
  }

  let result = text
  const parts = []
  let lastIdx = 0
  Object.entries(highlights).forEach(([term, color]) => {
    const idx = result.indexOf(term, lastIdx)
    if (idx !== -1) {
      if (idx > lastIdx) parts.push({ text: result.slice(lastIdx, idx) })
      parts.push({ text: term, color })
      lastIdx = idx + term.length
    }
  })
  if (lastIdx < result.length) parts.push({ text: result.slice(lastIdx) })
  if (parts.length === 0) return <span>{text}</span>
  return <>{parts.map((p, i) => p.color ? <span key={i} style={{ color: p.color, fontWeight: 600 }}>{p.text}</span> : <span key={i}>{p.text}</span>)}</>
}

export default function Parent360Results() {
  const navigate = useNavigate()

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Parent 360 — Wellbeing Trends</h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
        Showing your last 6 surveys · January 15 – March 15, 2026
      </p>

      {/* Trend Chart */}
      <Card padding="lg" style={{ marginBottom: 24 }}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={parent360TrendData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="survey" tick={{ fill: 'var(--chart-axis)', fontFamily: "'DM Sans', sans-serif", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 5]} tick={{ fill: 'var(--chart-axis)', fontFamily: "'JetBrains Mono', monospace", fontSize: 10 }} axisLine={false} tickLine={false} />
            <ReferenceLine y={3.5} stroke="var(--text-muted)" strokeDasharray="4 4" label={{ value: "Target", fill: 'var(--text-muted)', fontSize: 10, fontFamily: "'DM Sans', sans-serif" }} />
            <Tooltip content={<TrendTooltip />} />
            {domainKeys.map(key => (
              <Area key={key} type="monotone" dataKey={key} name={domainLabels[key]}
                stroke={domainColors[key]} fill={domainColors[key]} fillOpacity={0.10}
                strokeWidth={2} dot={false}
                isAnimationActive animationDuration={1500} animationEasing="ease-out"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 }}>
          {domainKeys.map(key => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 10, height: 3, borderRadius: 1, background: domainColors[key] }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{domainLabels[key]}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Domain Cards */}
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 12 }}>Domain Breakdown</h3>
      {wellbeingData.domains.map((domain, i) => (
        <DomainResultCard key={i} domain={domain} index={i} />
      ))}

      {/* AI Summary */}
      <Card glow="purple" padding="lg" style={{ marginTop: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 18 }}>{"\uD83E\uDD16"}</span>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--accent-purple)' }}>AI-Generated Summary</span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          <HighlightedText text="Rayan shows positive progress in Emotional Wellbeing, Social Connection, and Physical Health since your first survey in January. The home environment has remained consistently strong throughout — a foundation that the school greatly values. Personal growth maintains a steady baseline. However, Academic Performance has declined from 2.5 to 2.0 over the last three surveys and warrants attention. This decline correlates with observations from his teachers and has been flagged to his Form Tutor. The school will reach out to discuss support strategies. Your continued engagement through Parent 360 is making a difference." />
        </p>
      </Card>

      {/* What Changed */}
      <Card glow="green" padding="lg">
        <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 12 }}>What Changed After Your Last Survey</h4>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
          You told us: Academic focus felt low (<span style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent-red)' }}>2.0/5</span>)
        </p>
        <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', display: 'block', marginBottom: 10 }}>What the school did:</span>
        {[
          { text: 'Mr. Thompson reviewed Rayan\'s engagement records', date: '12 Mar' },
          { text: 'Learning support session scheduled for 18 March', date: '13 Mar' },
          { text: 'History teacher notified — make-up materials sent', date: '14 Mar' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Check size={12} color="#fff" />
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', flex: 1 }}>{item.text}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)' }}>{item.date}</span>
          </div>
        ))}
        <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, color: 'var(--accent-green)', fontStyle: 'italic', marginTop: 16, textAlign: 'center' }}>
          "Your input led to action."
        </p>
      </Card>
    </div>
  )
}
