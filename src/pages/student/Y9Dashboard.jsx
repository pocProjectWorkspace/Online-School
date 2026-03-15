import { useNavigate } from 'react-router-dom'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import GradientBar from '../../components/common/GradientBar'
import {
  Video, ClipboardList, Brain, BarChart3, Flame, Clock,
  TrendingUp, TrendingDown, Target, ExternalLink, BookOpen, Lightbulb,
} from 'lucide-react'
import { cat4Data } from '../../data/intelligence360'

const schedule = [
  { time: '08:00', end: '08:45', subject: 'Mathematics', teacher: 'Mr. James Okafor', live: true },
  { time: '09:00', end: '09:45', subject: 'English Language', teacher: 'Ms. Rachel Green', live: false },
  { time: '10:00', end: '10:45', subject: 'Science — Biology', teacher: 'Dr. Ahmed Khalil', live: false },
  { time: '11:00', end: '11:45', subject: 'History', teacher: 'Ms. Laura Bennett', live: false },
  { time: '12:30', end: '13:15', subject: 'Physical Education', teacher: 'Mr. Chris Taylor', live: false },
]

const subjects = [
  { id: 'quadratic-equations', name: 'Mathematics', grade: 'A-', predicted: 'A', progress: 84, color: '#2D7DD2', trend: 'up' },
  { id: 'cell-biology', name: 'Science', grade: 'B+', predicted: 'A-', progress: 76, color: '#00E5A0', trend: 'up' },
  { id: null, name: 'English', grade: 'B', predicted: 'B+', progress: 72, color: '#7B5CF0', trend: 'stable' },
  { id: null, name: 'History', grade: 'C+', predicted: 'B-', progress: 58, color: '#FFB800', trend: 'down' },
  { id: null, name: 'Arabic', grade: 'B-', predicted: 'B', progress: 70, color: '#FF4757', trend: 'up' },
  { id: null, name: 'PE', grade: 'A', predicted: 'A', progress: 92, color: '#00D4FF', trend: 'stable' },
]

const quickActions = [
  { icon: Video, label: 'Join Class', color: 'var(--accent-blue)' },
  { icon: ClipboardList, label: 'Assignments', color: 'var(--accent-amber)' },
  { icon: Brain, label: 'AI Tutor', color: 'var(--accent-purple)' },
  { icon: BarChart3, label: 'My Progress', color: 'var(--accent-cyan)' },
]

const improvementAreas = [
  { area: 'Verbal Reasoning', source: 'CAT4', percentile: '92nd', action: 'Targeted reading + discussion classes will close the gap to your quantitative ability', priority: 'Medium', color: 'var(--accent-amber)' },
  { area: 'History', source: 'Academics', percentile: 'C+', action: 'Schedule catch-up with Ms. Bennett — 3 missed sessions correlated with grade dip', priority: 'High', color: 'var(--accent-red)' },
  { area: 'Academic Focus', source: 'Wellbeing', percentile: '2.0/5', action: 'Your focus score has dipped — learning support session booked for 18 March', priority: 'Monitor', color: 'var(--accent-blue)' },
]

const externalResources = [
  { title: 'Khan Academy — Quadratic Equations', url: '#', type: 'Interactive', subject: 'Maths', icon: '📐' },
  { title: 'BBC Bitesize — Cell Biology', url: '#', type: 'Video + Quiz', subject: 'Science', icon: '🧬' },
  { title: 'Seneca Learning — GCSE History', url: '#', type: 'Revision', subject: 'History', icon: '📜' },
  { title: 'Duolingo Arabic — Level 3', url: '#', type: 'Practice', subject: 'Arabic', icon: '🌍' },
  { title: 'Dr Frost Maths — Past Papers', url: '#', type: 'Practice', subject: 'Maths', icon: '📝' },
  { title: 'Oak Academy — Reading Comprehension', url: '#', type: 'Lesson', subject: 'English', icon: '📖' },
]

const trendIcons = { up: TrendingUp, down: TrendingDown, stable: Target }
const trendColors = { up: 'var(--accent-green)', down: 'var(--accent-red)', stable: 'var(--text-muted)' }

export default function Y9Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Welcome back, Rayan</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)' }}>Sunday, 15 March 2026</p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { value: '87%', label: 'Attendance' },
              { value: 'B+', label: 'Average' },
              { value: '2 days', label: 'Next deadline', color: 'var(--accent-amber)' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 500, display: 'block', color: s.color || 'var(--text-primary)' }}>{s.value}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
          {quickActions.map((qa, i) => {
            const Icon = qa.icon
            return (
              <button key={i} onClick={() => qa.label === 'AI Tutor' ? navigate('/student/y9/lesson/quadratic-equations') : null} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
                background: 'var(--bg-card)', border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)', cursor: 'pointer', color: 'var(--text-secondary)',
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, transition: 'all 200ms ease',
              }}>
                <Icon size={16} color={qa.color} /> {qa.label}
              </button>
            )
          })}
        </div>

        <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
          {/* Today's Schedule */}
          <div>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 12 }}>Today's Schedule</h3>
            <Card padding="sm">
              {schedule.map((slot, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px',
                  borderBottom: i < schedule.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: slot.live ? 'var(--accent-blue)' : 'var(--text-muted)', minWidth: 40 }}>{slot.time}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: 13 }}>{slot.subject}</span>
                      {slot.live && <Badge variant="live" />}
                    </div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{slot.teacher}</span>
                  </div>
                  {slot.live && (
                    <button style={{ padding: '4px 12px', borderRadius: 'var(--radius-pill)', background: 'var(--accent-blue)', border: 'none', cursor: 'pointer', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600 }}>
                      Join
                    </button>
                  )}
                </div>
              ))}
            </Card>
          </div>

          {/* My Intelligence Profile (Student View) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, margin: 0 }}>My Intelligence Profile</h3>
              <Badge variant="excelling" label="95th %ile" />
            </div>
            <Card glow="purple" padding="md">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 14 }}>
                {cat4Data.domains.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', flex: 1 }}>{d.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: d.color }}>{d.percentile}%</span>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 10 }}>
                You're in the top 5% globally for quantitative reasoning. Your verbal skills are strong but have the most room to grow.
              </p>
              <button onClick={() => navigate('/student/y9/intelligence')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--accent-purple)', fontWeight: 600 }}>
                View full profile &rarr;
              </button>
            </Card>
          </div>
        </div>

        {/* Academic Progress — all 6 subjects */}
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 12 }}>Academic Progress</h3>
        <div className="responsive-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          {subjects.map((subj, i) => {
            const TrendIcon = trendIcons[subj.trend]
            return (
              <Card key={i} padding="md" onClick={() => subj.id ? navigate(`/student/y9/lesson/${subj.id}`) : null} style={{ cursor: subj.id ? 'pointer' : 'default' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14 }}>{subj.name}</span>
                  <TrendIcon size={14} color={trendColors[subj.trend]} />
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 500 }}>{subj.grade}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>Predicted: {subj.predicted}</span>
                </div>
                <GradientBar value={subj.progress} max={100} gradient={subj.color} showValue={false} height={5} />
              </Card>
            )
          })}
        </div>

        {/* What I Need to Work On */}
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Lightbulb size={18} color="var(--accent-amber)" /> What I Need to Work On
        </h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>Based on your Intelligence360 profile and academic data</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {improvementAreas.map((item, i) => (
            <Card key={i} padding="md">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14 }}>{item.area}</span>
                    <span style={{ padding: '1px 8px', borderRadius: 'var(--radius-pill)', background: `${item.color}15`, color: item.color, fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600 }}>{item.priority}</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Source: {item.source} · {item.percentile}</span>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{item.action}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* External Resources */}
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
          <BookOpen size={18} color="var(--accent-cyan)" /> Recommended Resources
        </h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>Curated for your learning profile and improvement areas</p>
        <div className="responsive-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
          {externalResources.map((res, i) => (
            <Card key={i} padding="md" style={{ cursor: 'pointer', transition: 'transform 200ms ease' }}
              onClick={() => {}}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ fontSize: 24, lineHeight: 1 }}>{res.icon}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, display: 'block', lineHeight: 1.3, marginBottom: 4 }}>{res.title}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>{res.type}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>·</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>{res.subject}</span>
                  </div>
                </div>
                <ExternalLink size={12} color="var(--text-muted)" style={{ marginTop: 2, flexShrink: 0 }} />
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom row: Streak + Upcoming */}
        <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Flame size={24} color="var(--accent-amber)" />
              <div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 500, display: 'block', lineHeight: 1 }}>7</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>day learning streak</span>
              </div>
            </div>
          </Card>
          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Clock size={20} color="var(--accent-red)" />
              <div>
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, display: 'block' }}>Forces Experiment Report</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--accent-red)' }}>Due: 18 March 2026</span>
              </div>
            </div>
          </Card>
        </div>
    </div>
  )
}
