import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronDown, ChevronUp, Download } from 'lucide-react'
import Card from '../../components/common/Card'
import GradientBar from '../../components/common/GradientBar'
import DonutChart from '../../components/charts/DonutChart'
import AnimatedBarChart from '../../components/charts/AnimatedBarChart'
import { psychometricData } from '../../data/intelligence360'

function PersonalitySlider({ left, right, leftValue, rightValue }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: leftValue > rightValue ? 'var(--accent-blue)' : 'var(--text-muted)' }}>{left} ({leftValue}%)</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: rightValue > leftValue ? 'var(--accent-purple)' : 'var(--text-muted)' }}>{right} ({rightValue}%)</span>
      </div>
      <div style={{ position: 'relative', height: 8, borderRadius: 4, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, height: '100%',
          width: `${leftValue}%`, borderRadius: 4,
          background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))',
          transition: 'width 1s ease-out',
        }} />
      </div>
    </div>
  )
}

function InterestDial({ name, score, size = 80 }) {
  const radius = size * 0.38
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--bg-secondary)" strokeWidth={5} />
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--accent-purple)" strokeWidth={5}
            strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{score}</span>
        </div>
      </div>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', display: 'block', marginTop: 6 }}>{name}</span>
    </div>
  )
}

function CollapsibleSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div style={{ marginBottom: 16 }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', padding: '12px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-card)',
        borderRadius: open ? 'var(--radius-md) var(--radius-md) 0 0' : 'var(--radius-md)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        color: 'var(--text-primary)', fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600,
      }}>
        {title}
        {open ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
      </button>
      {open && (
        <div style={{ padding: 16, background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderTop: 'none', borderRadius: '0 0 var(--radius-md) var(--radius-md)' }}>
          {children}
        </div>
      )}
    </div>
  )
}

export default function PsychometricReport() {
  const navigate = useNavigate()

  const clusterBarData = psychometricData.topCareerClusters.map(c => ({ name: c.name, value: c.value }))

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 900, margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button onClick={() => navigate('/parent/intelligence360')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={20} />
        </button>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20, margin: 0 }}>Psychometric Report</h1>
      </div>

      {/* Summary */}
      <CollapsibleSection title="Summary" defaultOpen={true}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {psychometricData.summary.map((item, i) => (
            <li key={i} style={{
              padding: '8px 0', borderBottom: i < psychometricData.summary.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5,
              display: 'flex', alignItems: 'flex-start', gap: 8,
            }}>
              <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>&bull;</span>
              {item}
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      {/* Career Personality */}
      <CollapsibleSection title="Career Personality" defaultOpen={true}>
        {Object.values(psychometricData.personality).map((trait, i) => (
          <PersonalitySlider key={i} left={trait.left} right={trait.right} leftValue={trait.leftValue} rightValue={trait.rightValue} />
        ))}
      </CollapsibleSection>

      {/* Career Interests */}
      <CollapsibleSection title="Career Interests" defaultOpen={true}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {psychometricData.careerInterests.map((interest, i) => (
            <InterestDial key={i} name={interest.name} score={interest.score} />
          ))}
        </div>
      </CollapsibleSection>

      {/* Career Motivators */}
      <CollapsibleSection title="Career Motivators">
        {psychometricData.careerMotivators.map((m, i) => (
          <GradientBar key={i} value={m.value} max={100} gradient="purple-blue" label={m.name} height={8} />
        ))}
      </CollapsibleSection>

      {/* Learning Styles */}
      <CollapsibleSection title="Learning Styles" defaultOpen={true}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          <DonutChart data={psychometricData.learningStyles} size={180} innerLabel="" innerSublabel="Learning Styles" />
          <div style={{ minWidth: 140 }}>
            {psychometricData.learningStyles.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', flex: 1 }}>{s.name}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-primary)' }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* Skills & Abilities */}
      <CollapsibleSection title="Skills & Abilities">
        {psychometricData.skillsAbilities.map((s, i) => (
          <GradientBar key={i} value={s.value} max={100} gradient="blue-cyan" label={s.name} height={8} />
        ))}
      </CollapsibleSection>

      {/* Top Career Clusters */}
      <CollapsibleSection title="Top Career Clusters">
        <AnimatedBarChart data={clusterBarData} yDomain={[0, 100]} color="var(--accent-purple)" height={220} barSize={24} />
      </CollapsibleSection>

      {/* Selected Career Clusters */}
      <CollapsibleSection title="Selected Career Clusters">
        {psychometricData.selectedCareerClusters.map((cluster, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
            borderBottom: i < psychometricData.selectedCareerClusters.length - 1 ? '1px solid var(--border-subtle)' : 'none',
          }}>
            <span style={{
              width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-purple)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, color: '#fff',
            }}>
              {i + 1}
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-primary)' }}>{cluster}</span>
          </div>
        ))}
      </CollapsibleSection>

      {/* Download Button */}
      <button style={{
        width: '100%', padding: '14px', background: 'var(--gradient-ai)', border: 'none',
        borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: 8, color: '#fff', fontFamily: "'DM Sans', sans-serif",
        fontSize: 14, fontWeight: 600, marginTop: 8,
      }}>
        <Download size={18} />
        Download Full Report
      </button>
    </div>
  )
}
