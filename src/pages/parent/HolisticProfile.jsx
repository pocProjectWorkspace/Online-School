import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from 'recharts'
import { ChevronLeft, Download, Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import GradientBar from '../../components/common/GradientBar'
import DonutChart from '../../components/charts/DonutChart'
import {
  cat4Data, psychometricData, wellbeingData, careerNodes,
  academicHeatmap, developmentRecommendations,
} from '../../data/intelligence360'

// --- Generating Overlay ---
const stages = [
  "Analysing cognitive assessment data...",
  "Processing psychometric profile...",
  "Integrating wellbeing indicators...",
  "Cross-referencing academic performance...",
  "Building holistic profile...",
  "Complete.",
]

function GeneratingOverlay({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [stageIdx, setStageIdx] = useState(0)

  useEffect(() => {
    const dur = 3000
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min((elapsed / dur) * 100, 100)
      setProgress(pct)
      setStageIdx(Math.min(Math.floor((elapsed / dur) * stages.length), stages.length - 1))
      if (elapsed >= dur) { clearInterval(interval); setTimeout(onComplete, 400) }
    }, 50)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200, background: 'var(--bg-primary)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: progress >= 100 ? 0 : 1, transition: 'opacity 400ms ease',
    }}>
      {/* Constellation dots */}
      <div style={{ position: 'relative', width: 80, height: 80, marginBottom: 32 }}>
        {[0, 1, 2, 3, 4].map(i => {
          const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
          const r = 30
          return (
            <div key={i} style={{
              position: 'absolute', width: 6, height: 6, borderRadius: '50%',
              background: 'var(--accent-cyan)',
              left: 40 + r * Math.cos(angle) - 3, top: 40 + r * Math.sin(angle) - 3,
              opacity: stageIdx >= i ? 1 : 0.2,
              boxShadow: stageIdx >= i ? '0 0 8px var(--accent-cyan)' : 'none',
              transition: 'all 300ms ease',
            }} />
          )
        })}
        {/* Connecting lines */}
        <svg width="80" height="80" style={{ position: 'absolute', top: 0, left: 0 }}>
          {[0, 1, 2, 3].map(i => {
            const a1 = (i / 5) * Math.PI * 2 - Math.PI / 2
            const a2 = ((i + 1) / 5) * Math.PI * 2 - Math.PI / 2
            return (
              <line key={i}
                x1={40 + 30 * Math.cos(a1)} y1={40 + 30 * Math.sin(a1)}
                x2={40 + 30 * Math.cos(a2)} y2={40 + 30 * Math.sin(a2)}
                stroke="var(--accent-cyan)" strokeWidth={1}
                opacity={stageIdx > i ? 0.5 : 0.1}
                style={{ transition: 'opacity 300ms ease' }}
              />
            )
          })}
        </svg>
      </div>

      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20, height: 20 }}>
        {stages[stageIdx]}
      </p>
      <div style={{ width: 320, height: 4, borderRadius: 2, background: 'var(--bg-secondary)' }}>
        <div style={{ width: `${progress}%`, height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))', transition: 'width 100ms linear' }} />
      </div>
    </div>
  )
}

// --- Cognitive Fingerprint SVG ---
function CognitiveFingerprint() {
  const [drawn, setDrawn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setDrawn(true), 300); return () => clearTimeout(t) }, [])

  const arcs = cat4Data.domains.map((d, i) => {
    const r = 50 + i * 28
    const pct = d.percentile / 100
    const startAngle = -90
    const endAngle = startAngle + pct * 360
    const endRad = (endAngle * Math.PI) / 180
    const startRad = (startAngle * Math.PI) / 180
    const cx = 160, cy = 160
    const x1 = cx + r * Math.cos(startRad), y1 = cy + r * Math.sin(startRad)
    const x2 = cx + r * Math.cos(endRad), y2 = cy + r * Math.sin(endRad)
    const largeArc = pct > 0.5 ? 1 : 0
    const path = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`
    const circumference = 2 * Math.PI * r * pct
    return { ...d, path, x2, y2, circumference, delay: i * 200 }
  })

  return (
    <svg width="320" height="320" viewBox="0 0 320 320">
      {/* Background circles */}
      {arcs.map((a, i) => (
        <circle key={`bg-${i}`} cx={160} cy={160} r={50 + i * 28} fill="none" stroke="var(--border-subtle)" strokeWidth={6} />
      ))}
      {/* Arcs */}
      {arcs.map((a, i) => (
        <path key={i} d={a.path} fill="none" stroke={a.color} strokeWidth={8} strokeLinecap="round"
          strokeDasharray={drawn ? a.circumference : 0}
          strokeDashoffset={0}
          style={{ transition: `stroke-dasharray 1000ms ease ${a.delay}ms` }}
        />
      ))}
      {/* Labels */}
      {arcs.map((a, i) => (
        <g key={`label-${i}`} style={{ opacity: drawn ? 1 : 0, transition: `opacity 400ms ease ${a.delay + 800}ms` }}>
          <circle cx={a.x2} cy={a.y2} r={3} fill={a.color} />
          <text x={a.x2 + (a.x2 > 160 ? 8 : -8)} y={a.y2 + 4}
            fill={a.color} fontSize={11} fontFamily="'JetBrains Mono', monospace" fontWeight={500}
            textAnchor={a.x2 > 160 ? 'start' : 'end'}>
            {a.name} {a.percentile}%
          </text>
        </g>
      ))}
    </svg>
  )
}

// --- Career Constellation ---
function CareerConstellation() {
  const [nodesVisible, setNodesVisible] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setNodesVisible(p => { if (p >= careerNodes.length) { clearInterval(t); return p } return p + 1 }), 100)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: 400, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      {/* Connecting lines between high-match nodes */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {careerNodes.filter(n => n.match > 80).map((n1, i) =>
          careerNodes.filter(n2 => n2.match > 80 && n2.name > n1.name).map((n2, j) => (
            <line key={`${i}-${j}`}
              x1={`${n1.x}%`} y1={`${n1.y}%`} x2={`${n2.x}%`} y2={`${n2.y}%`}
              stroke={n1.color} strokeWidth={0.5} opacity={nodesVisible >= careerNodes.length ? 0.3 : 0}
              style={{ transition: 'opacity 800ms ease 1000ms' }}
            />
          ))
        )}
      </svg>

      {careerNodes.map((node, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${node.x}%`, top: `${node.y}%`,
          transform: 'translate(-50%, -50%)',
          opacity: i < nodesVisible ? 1 : 0,
          transition: 'opacity 300ms ease, transform 300ms ease',
        }}>
          <div style={{
            width: node.size, height: node.size, borderRadius: '50%',
            background: `${node.color}20`, border: `2px solid ${node.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: node.match > 80 ? `0 0 16px ${node.color}40` : 'none',
          }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: Math.max(node.size * 0.25, 10), color: node.color, fontWeight: 500 }}>
              {node.match}
            </span>
          </div>
          <span style={{
            position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
            fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: 'var(--text-muted)',
            whiteSpace: 'nowrap', marginTop: 4, textAlign: 'center',
          }}>
            {node.name}
          </span>
        </div>
      ))}
    </div>
  )
}

// --- Trend Arrows ---
const trendIcons = { up2: '\u2191\u2191', up: '\u2191', stable: '\u2192', down: '\u2193' }
const trendColors = { up2: 'var(--accent-green)', up: 'var(--accent-green)', stable: 'var(--text-muted)', down: 'var(--accent-red)' }
const obsColors = { Strong: 'var(--accent-green)', Good: 'var(--accent-blue)', Developing: 'var(--accent-amber)', 'Needs Focus': 'var(--accent-red)', Progressing: 'var(--accent-cyan)', Excellent: 'var(--accent-green)' }

export default function HolisticProfile() {
  const navigate = useNavigate()
  const [showGen, setShowGen] = useState(() => !localStorage.getItem('gems-holistic-seen'))
  const [ready, setReady] = useState(!showGen)

  const handleGenComplete = () => {
    localStorage.setItem('gems-holistic-seen', '1')
    setShowGen(false)
    setReady(true)
  }

  const wellbeingRadar = wellbeingData.domains.map(d => ({
    domain: d.title.split(' ')[0],
    latest: d.latest * 20,
    first: d.first * 20,
  }))

  if (!ready && showGen) return <GeneratingOverlay onComplete={handleGenComplete} />

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/parent/intelligence360')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <ChevronLeft size={20} />
          </button>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, margin: 0 }}>Holistic Student Profile</h1>
        </div>
        <button onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'var(--gradient-ai)', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600 }}>
          <Download size={14} /> Download Full Report
        </button>
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', marginBottom: 28, paddingLeft: 32 }}>
        Rayan Sharma · Generated 15 March 2026 · Powered by Intelligence360
      </p>

      {/* Section 1: Cognitive Fingerprint */}
      <div className="holistic-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 36 }}>
        <Card padding="lg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CognitiveFingerprint />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>Rayan's Cognitive Fingerprint</span>
        </Card>
        <div>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 17, color: 'var(--accent-cyan)', marginBottom: 12 }}>How Rayan's Mind Works</h3>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <p style={{ marginBottom: 12 }}>Rayan is a structured, systems-oriented thinker. He processes quantitative and pattern-based information at an exceptional level — faster and more accurately than 99% of students his age globally. This is not simply "good at maths." It represents a fundamentally different capacity for recognising relationships between numbers, shapes, and abstract systems.</p>
            <p style={{ marginBottom: 12 }}>His spatial reasoning (91st percentile) means he naturally builds mental models of how things fit together — a skill that underpins engineering, computer science, architecture, and financial modelling.</p>
            <p style={{ marginBottom: 16 }}>His verbal skills, while strong (92nd percentile), represent his greatest growth opportunity. Targeted reading and discussion-based learning will develop the communication layer that his analytical ability needs to reach its full potential.</p>
          </div>
          <Card padding="md" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 12, color: 'var(--accent-green)', display: 'block', marginBottom: 6 }}>COGNITIVE STRENGTHS</span>
                {['Quantitative reasoning', 'Pattern recognition', 'Spatial modelling', 'Logical sequencing'].map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ color: 'var(--accent-green)', fontSize: 12 }}>●</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{s}</span>
                  </div>
                ))}
              </div>
              <div>
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 12, color: 'var(--accent-amber)', display: 'block', marginBottom: 6 }}>GROWTH OPPORTUNITIES</span>
                {['Verbal expression', 'Written communication', 'Abstract language', 'Creative interpretation'].map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ color: 'var(--accent-amber)', fontSize: 12 }}>●</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Section 2: Learning Blueprint */}
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 19, color: 'var(--accent-blue)', marginBottom: 4 }}>How to Teach Rayan</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Based on psychometric assessment and learning style analysis</p>
      <div className="holistic-learning-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20, marginBottom: 36 }}>
        <Card padding="lg">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <DonutChart data={psychometricData.learningStyles} size={200} innerLabel="" innerSublabel="Learning Styles" />
          </div>
          {[
            { label: 'PRIMARY: Visual Learner (25%)', text: 'Rayan retains information most effectively when it is presented visually — diagrams, charts, infographics, structured layouts. He builds mental maps rather than sequential notes.' },
            { label: 'SECONDARY: Read & Write (38%)', text: 'Despite being a visual learner, Rayan also processes written information strongly — suggesting he thrives with structured written content that includes visual organisation.' },
            { label: 'KINAESTHETIC (25%)', text: 'Hands-on application reinforces his understanding. He benefits from worked examples he can follow step-by-step, not abstract explanations.' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 12, color: psychometricData.learningStyles[i === 2 ? 2 : i === 1 ? 0 : 1]?.color || 'var(--text-primary)', display: 'block', marginBottom: 4 }}>{item.label}</span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{item.text}</p>
            </div>
          ))}
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card padding="md">
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 10 }}>For his teachers:</span>
            {[
              { ok: true, text: 'Use diagrams, flowcharts and structured layouts' },
              { ok: true, text: 'Provide worked examples before theory' },
              { ok: true, text: 'Allow time for independent problem-solving' },
              { ok: true, text: 'Use colour-coded notes and visual organisers' },
              { ok: false, text: 'Avoid long unstructured verbal explanations' },
              { ok: false, text: 'Avoid abstract concepts without concrete anchors' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                {r.ok ? <Check size={14} color="var(--accent-green)" /> : <X size={14} color="var(--accent-red)" />}
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{r.text}</span>
              </div>
            ))}
          </Card>
          <Card padding="md">
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 10 }}>Optimal study conditions:</span>
            {[
              'Structured environment (Psychometric: 98% structured)',
              'Independent working space',
              'Clear step-by-step task breakdown',
              'Timed sessions with defined goals',
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ color: 'var(--accent-cyan)', fontSize: 10 }}>●</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{s}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Section 3: Academic Heatmap */}
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 19, marginBottom: 16 }}>Academic Standing & Trajectory</h2>
      <Card className="responsive-table-wrap" padding="md" style={{ marginBottom: 16, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)' }}>
              {['Subject', 'Current', 'Trend', 'CAT4 Match', 'Teacher Obs', 'Overall'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {academicHeatmap.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '10px 12px', fontWeight: 500 }}>{row.subject}</td>
                <td style={{ padding: '10px 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 500 }}>{row.current}</td>
                <td style={{ padding: '10px 12px', color: trendColors[row.trend], fontSize: 16 }}>{trendIcons[row.trend]}</td>
                <td style={{ padding: '10px 12px' }}>
                  {Array.from({ length: 5 }, (_, j) => (
                    <span key={j} style={{ color: j < row.cat4Match ? 'var(--accent-cyan)' : 'var(--text-muted)', fontSize: 10, marginRight: 2 }}>●</span>
                  ))}
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-pill)', background: `${obsColors[row.teacherObs]}15`, color: obsColors[row.teacherObs], fontSize: 11, fontWeight: 600 }}>
                    {row.teacherObs}
                  </span>
                </td>
                <td style={{ padding: '10px 12px', width: 80 }}>
                  <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                    <div style={{ width: `${row.overall}%`, height: '100%', borderRadius: 3, background: row.overall > 80 ? 'var(--accent-green)' : row.overall > 65 ? 'var(--accent-blue)' : 'var(--accent-amber)', transition: 'width 1s ease-out' }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card padding="md" style={{ marginBottom: 36 }}>
        <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 12 }}>Predicted End-of-Year Outcomes</span>
        {academicHeatmap.map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '8px 0', borderBottom: i < academicHeatmap.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-primary)', fontWeight: 500, minWidth: 90 }}>{row.subject}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: 'var(--accent-cyan)', minWidth: 30 }}>{row.predicted}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>"{row.reason}"</span>
          </div>
        ))}
      </Card>

      {/* Section 4: Emotional & Social Portrait */}
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 19, marginBottom: 16 }}>Rayan as a Person</h2>
      <div className="holistic-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24, marginBottom: 36 }}>
        <Card padding="lg">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={wellbeingRadar} cx="50%" cy="50%" outerRadius="65%">
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="domain" tick={{ fill: 'var(--text-muted)', fontFamily: "'DM Sans', sans-serif", fontSize: 11 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="First Survey" dataKey="first" stroke="var(--accent-blue)" fill="var(--accent-blue)" fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="6 3"
                isAnimationActive animationDuration={800} />
              <Radar name="Latest" dataKey="latest" stroke="var(--accent-green)" fill="var(--accent-green)" fillOpacity={0.15} strokeWidth={2}
                dot={{ fill: 'var(--accent-green)', r: 4 }} isAnimationActive animationDuration={1200} />
            </RadarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 0, borderTop: '2px solid var(--accent-green)' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>Latest</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 0, borderTop: '2px dashed var(--accent-blue)' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>First Survey</span>
            </div>
          </div>
        </Card>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--accent-green)', marginBottom: 8 }}>EMOTIONAL PROFILE</h4>
          <p style={{ marginBottom: 12 }}>Rayan presents as emotionally stable with improving wellbeing across most domains. His home environment is consistently strong — you have created a foundation that supports his development. Physical health and emotional wellbeing are both on a positive trajectory over the last 6 survey periods.</p>
          <p style={{ marginBottom: 16 }}>The one flag in his emotional profile is academic focus: his most recent Parent360 score of 2.0/5 for engagement represents a dip from his average of 3.0/5. This correlates with a specific period in Term 2 and is likely transitional. The school is aware.</p>
          <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--accent-purple)', marginBottom: 8 }}>SOCIAL & PERSONALITY PROFILE</h4>
          <p style={{ marginBottom: 16 }}>Rayan is moderately extroverted (57%) — he is socially confident but does not require constant social engagement. He is a structured thinker who prefers planned environments over spontaneous ones. He is highly analytical (Thinking 100%) — he makes decisions based on logic, not emotion.</p>
          <Card padding="md" style={{ background: 'var(--bg-secondary)' }}>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 12, display: 'block', marginBottom: 10 }}>PERSONALITY SNAPSHOT</span>
            {[
              { label: 'Extrovert', value: 57 },
              { label: 'Observant', value: 100 },
              { label: 'Thinking', value: 100 },
              { label: 'Spontaneous', value: 57 },
            ].map((p, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{p.label}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-secondary)' }}>{p.value}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: 'var(--bg-primary)', overflow: 'hidden' }}>
                  <div style={{ width: `${p.value}%`, height: '100%', borderRadius: 3, background: 'var(--accent-purple)', transition: 'width 1s ease-out' }} />
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Section 5: Career Constellation */}
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 19, marginBottom: 4 }}>Where Rayan Could Go</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Based on the intersection of cognitive ability, personality profile, and interests</p>
      <Card padding="lg" style={{ marginBottom: 20 }}>
        <CareerConstellation />
      </Card>
      <Card padding="md" style={{ marginBottom: 36 }}>
        {[
          { num: 1, name: 'Accounts & Finance', why: 'Analytical precision + structured environment preference' },
          { num: 2, name: 'Information Technology', why: 'Top 1% quantitative reasoning + IT career interest score' },
          { num: 3, name: 'Data Science', why: 'Pattern recognition + logical ability (92%) + IT interest' },
          { num: 4, name: 'Business Management', why: 'Extroverted personality + organisational ability + Enterprising' },
        ].map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none' }}>
            <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 500, color: '#fff', flexShrink: 0 }}>{c.num}</span>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, minWidth: 180 }}>{c.name}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>"{c.why}"</span>
          </div>
        ))}
      </Card>

      {/* Section 6: Development Recommendations */}
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 19, marginBottom: 4 }}>What We Recommend</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>5 specific actions based on Rayan's complete profile</p>
      <div className="rec-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        {developmentRecommendations.map((rec, i) => (
          <Card key={i} padding="lg">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 500, color: 'var(--text-muted)', opacity: 0.4 }}>{rec.num}</span>
              <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: `${rec.priorityColor}15`, color: rec.priorityColor, fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600 }}>
                {rec.priority}
              </span>
            </div>
            <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{rec.title}</h4>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 10 }}>Source: {rec.source}</span>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 14 }}>
              "{rec.text}"
            </p>
            <button style={{
              padding: '6px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-card)',
              background: 'transparent', color: 'var(--accent-blue)', fontFamily: "'DM Sans', sans-serif",
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>
              {rec.action}
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}
