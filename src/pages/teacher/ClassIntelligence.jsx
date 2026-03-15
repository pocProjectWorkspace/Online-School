import { useState } from 'react'
import { Brain, AlertTriangle, TrendingUp, Users, Heart, BookOpen, MessageSquare, Check } from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import GradientBar from '../../components/common/GradientBar'
import DonutChart from '../../components/charts/DonutChart'
import { mockGraphStudents } from '../../data/mockGraph'

const classProfile = {
  name: 'Year 3J — Primary Science',
  students: 24,
  avgCAT4: 62,
  avgAttendance: 88,
  avgWellbeing: 3.4,
}

const learningStyleDist = [
  { name: 'Visual', value: 35, color: '#00E5A0' },
  { name: 'Read & Write', value: 30, color: '#2D7DD2' },
  { name: 'Kinaesthetic', value: 25, color: '#FFB800' },
  { name: 'Auditory', value: 10, color: '#7B5CF0' },
]

const classDomains = [
  { name: 'Verbal', avg: 58, color: '#2D7DD2' },
  { name: 'Quantitative', avg: 52, color: '#7B5CF0' },
  { name: 'Non-Verbal', avg: 55, color: '#B06AF0' },
  { name: 'Spatial', avg: 60, color: '#00E5A0' },
]

const wellbeingFlags = [
  { student: 'Hamdan Al Ketbi', score: '2.1/5', trend: 'attention', issue: 'Academic engagement declining for 3 consecutive surveys', parentAction: 'Parent flagged concern on March 5' },
  { student: 'Saeed Al Mulla', score: '2.4/5', trend: 'attention', issue: 'Physical health score dropped — low energy reported by parent', parentAction: 'No parent survey submitted recently' },
  { student: 'Rashid Ahmed', score: '2.8/5', trend: 'same', issue: 'Personal growth stagnant — confidence not improving', parentAction: 'Parent survey stable' },
]

const topPerformers = [
  { name: 'Dana Al Nuaimi', cat4: 94, completion: 99, attendance: 97 },
  { name: 'Maryam Noor', cat4: 88, completion: 98, attendance: 96 },
  { name: 'Noura Al Dhaheri', cat4: 85, completion: 95, attendance: 94 },
]

const needSupport = [
  { name: 'Hamdan Al Ketbi', issue: 'Attendance 78%, assignments 65%', action: 'Schedule parent meeting', priority: 'High' },
  { name: 'Saeed Al Mulla', issue: 'Attendance 80%, last active 3 days ago', action: 'Check-in conversation', priority: 'Medium' },
  { name: 'Mohammad Hassan', issue: 'Assignment completion 76%, verbal reasoning low', action: 'Provide reading scaffolds', priority: 'Medium' },
]

export default function ClassIntelligence() {
  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Class Intelligence</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)' }}>{classProfile.name} · {classProfile.students} students</p>
        </div>
        <Badge variant="excelling" label={`${classProfile.avgCAT4}th %ile avg`} />
      </div>

      {/* Overview KPIs */}
      <div className="responsive-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
        {[
          { label: 'Students', value: classProfile.students, icon: Users, color: 'var(--accent-blue)' },
          { label: 'Avg CAT4', value: `${classProfile.avgCAT4}th`, icon: Brain, color: 'var(--accent-purple)' },
          { label: 'Attendance', value: `${classProfile.avgAttendance}%`, icon: Check, color: 'var(--accent-green)' },
          { label: 'Wellbeing', value: `${classProfile.avgWellbeing}/5`, icon: Heart, color: 'var(--accent-cyan)' },
        ].map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <Card key={i} padding="md">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: `${kpi.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color={kpi.color} />
                </div>
                <div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 500, display: 'block', lineHeight: 1 }}>{kpi.value}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{kpi.label}</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
        {/* Class Cognitive Profile */}
        <Card padding="lg">
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Brain size={16} color="var(--accent-purple)" /> Class Cognitive Profile
          </h3>
          {classDomains.map((d, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <GradientBar value={d.avg} max={100} gradient={d.color} label={d.name} height={6} />
            </div>
          ))}
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', marginTop: 12, lineHeight: 1.5 }}>
            Class shows strongest spatial reasoning. Verbal reasoning is the biggest growth area — consider structured reading activities across the group.
          </p>
        </Card>

        {/* Learning Style Distribution */}
        <Card padding="lg">
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={16} color="var(--accent-cyan)" /> Learning Style Distribution
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'center' }}>
            <DonutChart data={learningStyleDist} size={160} innerLabel="" innerSublabel="24 students" />
            <div>
              {learningStyleDist.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', flex: 1 }}>{s.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-primary)' }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', marginTop: 12, lineHeight: 1.5 }}>
            35% visual learners — prioritise diagrams and visual aids. Only 10% auditory — minimise lecture-only delivery.
          </p>
        </Card>
      </div>

      {/* Wellbeing Flags from Parent360 */}
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Heart size={16} color="var(--accent-red)" /> Parent360 Wellbeing Flags
      </h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>{wellbeingFlags.length} students need attention based on parent survey data</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        {wellbeingFlags.map((flag, i) => (
          <Card key={i} padding="md" glow={flag.trend === 'attention' ? 'red' : undefined}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <AlertTriangle size={14} color={flag.trend === 'attention' ? 'var(--accent-red)' : 'var(--accent-amber)'} />
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14 }}>{flag.student}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--accent-red)' }}>{flag.score}</span>
                  <Badge variant={flag.trend} />
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4, margin: '0 0 4px' }}>{flag.issue}</p>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>{flag.parentAction}</span>
              </div>
              <button style={{ padding: '6px 12px', borderRadius: 'var(--radius-pill)', background: 'var(--accent-blue)', border: 'none', cursor: 'pointer', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4 }}>
                <MessageSquare size={12} /> Follow Up
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Top Performers */}
        <div>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={16} color="var(--accent-green)" /> Top Performers
          </h3>
          <Card padding="sm">
            {topPerformers.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: i < topPerformers.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 500, color: 'var(--accent-green)', width: 24 }}>{i + 1}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500 }}>{s.name}</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent-purple)' }}>{s.cat4}th</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent-green)' }}>{s.completion}%</span>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Need Support */}
        <div>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertTriangle size={16} color="var(--accent-amber)" /> Need Support
          </h3>
          <Card padding="sm">
            {needSupport.map((s, i) => (
              <div key={i} style={{ padding: '10px 14px', borderBottom: i < needSupport.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500 }}>{s.name}</span>
                  <span style={{ padding: '1px 6px', borderRadius: 'var(--radius-pill)', background: s.priority === 'High' ? 'rgba(255,71,87,0.15)' : 'rgba(255,184,0,0.15)', color: s.priority === 'High' ? 'var(--accent-red)' : 'var(--accent-amber)', fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600 }}>{s.priority}</span>
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>{s.issue}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--accent-blue)', fontWeight: 600 }}>{s.action}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
