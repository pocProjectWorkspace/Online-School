import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell,
  AreaChart, Area,
} from 'recharts'
import { Brain, BookOpen, User, Heart, ChevronRight, Download, Sparkles, TrendingUp } from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import DonutChart from '../../components/charts/DonutChart'
import {
  radarData, cat4Data, ngrtData, psychometricData, wellbeingData, connectionInsights,
} from '../../data/intelligence360'

function useStaggerIn(count, baseDelay = 80) {
  const [visible, setVisible] = useState(Array(count).fill(false))
  useEffect(() => {
    const timers = Array.from({ length: count }, (_, i) =>
      setTimeout(() => setVisible(prev => { const n = [...prev]; n[i] = true; return n }), i * baseDelay + 200)
    )
    return () => timers.forEach(clearTimeout)
  }, [count, baseDelay])
  return visible
}

function ConnectorCard({ sources, insight, index }) {
  const [lineDrawn, setLineDrawn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLineDrawn(true), 600 + index * 300); return () => clearTimeout(t) }, [index])

  return (
    <Card padding="lg" style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 20, minHeight: 100 }}>
        {/* Source pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center', minWidth: 220 }}>
          {sources.map((s, i) => (
            <span key={i} style={{
              padding: '4px 12px', borderRadius: 'var(--radius-pill)',
              background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30`,
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
            }}>
              {s.label}
            </span>
          ))}
        </div>

        {/* Connector SVG */}
        <div style={{ width: 60, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="60" height="80" viewBox="0 0 60 80" style={{ overflow: 'visible' }}>
            <path
              d="M 5 15 C 30 15, 30 40, 55 40"
              fill="none" stroke="var(--accent-cyan)" strokeWidth={1.5}
              strokeDasharray={lineDrawn ? "0" : "200"} strokeDashoffset={lineDrawn ? "0" : "200"}
              style={{ transition: 'stroke-dasharray 800ms ease, stroke-dashoffset 800ms ease' }}
            />
            <path
              d="M 5 40 L 55 40"
              fill="none" stroke="var(--accent-cyan)" strokeWidth={1.5}
              strokeDasharray={lineDrawn ? "0" : "200"} strokeDashoffset={lineDrawn ? "0" : "200"}
              style={{ transition: 'stroke-dasharray 800ms ease 200ms, stroke-dashoffset 800ms ease 200ms' }}
            />
            <path
              d="M 5 65 C 30 65, 30 40, 55 40"
              fill="none" stroke="var(--accent-cyan)" strokeWidth={1.5}
              strokeDasharray={lineDrawn ? "0" : "200"} strokeDashoffset={lineDrawn ? "0" : "200"}
              style={{ transition: 'stroke-dasharray 800ms ease 400ms, stroke-dashoffset 800ms ease 400ms' }}
            />
            <circle cx={55} cy={40} r={4} fill="var(--accent-cyan)" opacity={lineDrawn ? 1 : 0} style={{ transition: 'opacity 400ms ease 600ms' }} />
          </svg>
        </div>

        {/* Insight text */}
        <div style={{
          flex: 1, padding: '14px 18px', borderRadius: 'var(--radius-md)',
          background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
          display: 'flex', alignItems: 'center',
        }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
            "{insight}"
          </p>
        </div>
      </div>
    </Card>
  )
}

const tileData = [
  {
    icon: Brain, color: 'var(--accent-cyan)', title: 'CAT4 Cognitive Assessment', badge: 'AI',
    stats: [{ label: 'SAS Score', value: '130' }, { label: 'Percentile', value: '95th' }],
    insight: 'Exceptional quantitative and spatial reasoning. Verbal skills are strong but represent the greatest growth opportunity.',
    path: '/parent/cat4', actions: ['Explore Full Report', 'Download PDF'],
  },
  {
    icon: BookOpen, color: 'var(--accent-blue)', title: 'NGRT Reading & Comprehension', badge: '\u2191',
    stats: [{ label: 'Latest SAS', value: '75' }, { label: 'Band Rank', value: '2' }],
    insight: 'Reading ability is progressing. Two tests taken \u2014 consistent improvement observed. Sentence comprehension is a strength.',
    path: '/parent/ngrt', actions: ['Explore Full Report', 'Download PDF'],
  },
  {
    icon: User, color: 'var(--accent-purple)', title: 'Psychometric Profile', badge: 'Career',
    stats: [{ label: 'Personality', value: 'Extrovert 57%' }, { label: 'Style', value: 'Analytical' }],
    insight: 'Rayan thrives in structured, fast-paced environments. His analytical and social skills position him strongly for tech-adjacent careers.',
    path: '/parent/psychometric', actions: ['Explore Full Report', 'Download PDF'],
  },
  {
    icon: Heart, color: 'var(--accent-green)', title: 'Parent 360 Wellbeing', badge: '6 surveys',
    stats: [{ label: 'Latest', value: '4.0/5' }, { label: 'Trend', value: '\u2191 Improving' }],
    insight: 'Emotional wellbeing and physical health are both improving. Academic focus is the only domain needing attention this term.',
    path: '/parent/parent360-survey', actions: ['Take New Survey', 'View All Results'],
  },
]

export default function Intelligence360Page() {
  const navigate = useNavigate()
  const vis = useStaggerIn(8)

  const miniBarData = cat4Data.domains.map(d => ({ name: d.name.slice(0, 3), value: d.score, color: d.color }))
  const miniWellbeingData = wellbeingData.domains.map(d => ({ name: d.title.slice(0, 4), value: d.latest }))

  return (
    <div className="page-content page-enter" style={{
      padding: '28px 32px', maxWidth: 1200, margin: '0 auto',
      background: 'radial-gradient(ellipse at 15% 40%, rgba(45,125,210,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(123,92,240,0.10) 0%, transparent 45%), radial-gradient(ellipse at 50% 80%, rgba(0,212,255,0.08) 0%, transparent 50%)',
      minHeight: '100%',
    }}>
      {/* Hero Radar */}
      <div style={{
        opacity: vis[0] ? 1 : 0, transform: vis[0] ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 600ms ease',
      }}>
        <Card glow="purple" padding="lg" style={{ marginBottom: 28, textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20, margin: '0 0 4px' }}>Cognitive Intelligence Profile</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>
            Rayan Sharma · Benchmarked against class and global peers
          </p>

          <div className="radar-container" style={{ maxWidth: 480, margin: '0 auto' }}>
            <ResponsiveContainer width="100%" height={380}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="72%">
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="domain" tick={{ fill: 'var(--text-secondary)', fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 600 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Global" dataKey="global" stroke="var(--text-muted)" fill="transparent" strokeWidth={1} strokeDasharray="3 3" dot={false}
                  isAnimationActive animationDuration={200} animationEasing="ease-out" />
                <Radar name="Class Avg" dataKey="classAvg" stroke="var(--accent-blue)" fill="transparent" strokeWidth={1.5} strokeDasharray="8 4"
                  dot={{ fill: 'var(--accent-blue)', r: 3 }} isAnimationActive animationDuration={600} animationEasing="ease-out" />
                <Radar name="Rayan" dataKey="rayan" stroke="var(--accent-cyan)" fill="var(--accent-cyan)" fillOpacity={0.20} strokeWidth={2.5}
                  dot={{ fill: 'var(--accent-cyan)', r: 5, strokeWidth: 2, stroke: 'var(--accent-cyan)' }}
                  isAnimationActive animationDuration={1200} animationEasing="ease-out" />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 12 }}>
            {[{ l: 'Rayan Sharma', c: 'var(--accent-cyan)', s: 'solid' }, { l: 'Class Average', c: 'var(--accent-blue)', s: 'dashed' }, { l: 'Global Benchmark', c: 'var(--text-muted)', s: 'dotted' }].map(item => (
              <div key={item.l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 16, height: 0, borderTop: `2px ${item.s} ${item.c}` }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>{item.l}</span>
              </div>
            ))}
          </div>

          {/* Percentile callouts */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            {cat4Data.domains.map((d, i) => (
              <span key={i} style={{
                padding: '4px 14px', borderRadius: 'var(--radius-pill)',
                background: `${d.color}15`, color: d.color, border: `1px solid ${d.color}30`,
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500,
              }}>
                {d.name}: {d.percentile}{d.percentile === 99 ? 'th' : d.percentile === 92 ? 'nd' : d.percentile === 91 ? 'st' : 'th'} %ile
              </span>
            ))}
          </div>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginTop: 16, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            Rayan's cognitive profile across four domains of intelligence, benchmarked against his class and students globally. He sits in the top 1% for quantitative and non-verbal reasoning.
          </p>
        </Card>
      </div>

      {/* 4 Deep-Dive Tiles */}
      <div className="intel-tiles" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
        {tileData.map((tile, i) => {
          const Icon = tile.icon
          return (
            <div key={i} style={{
              opacity: vis[i + 1] ? 1 : 0, transform: vis[i + 1] ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 500ms ease',
            }}>
              <Card padding="lg" style={{ height: '100%', cursor: 'pointer', transition: 'transform 250ms ease, box-shadow 250ms ease' }}
                onClick={() => navigate(tile.path)}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Icon size={20} color={tile.color} />
                    <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14 }}>{tile.title}</span>
                  </div>
                  <Badge variant={i === 0 ? 'excelling' : i === 1 ? 'improved' : i === 2 ? 'student' : 'secure'} label={tile.badge} />
                </div>

                <div style={{ display: 'flex', gap: 20, marginBottom: 14 }}>
                  {tile.stats.map((s, j) => (
                    <div key={j}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>{s.label}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 500 }}>{s.value}</span>
                    </div>
                  ))}
                </div>

                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, fontStyle: 'italic', marginBottom: 14 }}>
                  "{tile.insight}"
                </p>

                <div style={{ display: 'flex', gap: 12 }}>
                  {tile.actions.map((a, j) => (
                    <span key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: j === 0 ? tile.color : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer' }}>
                      {j === 1 ? '\u2193 ' : ''}{a} {j === 0 ? '\u2192' : ''}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          )
        })}
      </div>

      {/* Connection Layer */}
      <div style={{
        opacity: vis[5] ? 1 : 0, transform: vis[5] ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 600ms ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Sparkles size={18} color="var(--accent-purple)" />
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 17, margin: 0 }}>How Rayan's Data Connects</h3>
        </div>

        {connectionInsights.map((c, i) => (
          <ConnectorCard key={i} sources={c.sources} insight={c.insight} index={i} />
        ))}
      </div>
    </div>
  )
}
