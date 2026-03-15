import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, MessageSquare, BarChart3, Search, Brain, Heart, BookOpen, Lightbulb, Check, AlertTriangle } from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import GradientBar from '../../components/common/GradientBar'
import { mockGraphStudents } from '../../data/mockGraph'
import { cat4Data, psychometricData, wellbeingData } from '../../data/intelligence360'

const tabs = [
  { id: 'all', label: 'All Classes' },
  { id: 'class-y3j', label: 'Year 3J' },
  { id: 'class-y4b', label: 'Year 4B' },
  { id: 'class-y5a', label: 'Year 5A' },
  { id: 'class-y3k', label: 'Year 3K' },
]

// Mock per-student intelligence data (varies slightly per student)
function getStudentIntel(student) {
  const seed = student.id.charCodeAt(student.id.length - 1)
  const isHighPerf = student.assignmentCompletion > 85
  return {
    cat4Percentile: isHighPerf ? 70 + (seed % 25) : 35 + (seed % 30),
    learningStyle: ['Visual', 'Read & Write', 'Kinaesthetic', 'Auditory'][seed % 4],
    learningPct: 25 + (seed % 20),
    wellbeingScore: (2.5 + (seed % 20) / 10).toFixed(1),
    wellbeingTrend: seed % 3 === 0 ? 'attention' : seed % 3 === 1 ? 'same' : 'improved',
    parentFlagged: seed % 5 === 0,
    domains: [
      { name: 'Verbal', pct: 50 + (seed % 40), color: '#2D7DD2' },
      { name: 'Quant', pct: 40 + (seed % 50), color: '#7B5CF0' },
      { name: 'Non-verbal', pct: 45 + (seed % 45), color: '#B06AF0' },
      { name: 'Spatial', pct: 50 + (seed % 40), color: '#00E5A0' },
    ],
    recommendations: [
      isHighPerf
        ? { text: 'Challenge with extension problems and peer tutoring opportunities', priority: 'Opportunity', color: 'var(--accent-cyan)' }
        : { text: 'Provide structured scaffolding and worked examples before independent tasks', priority: 'Support', color: 'var(--accent-amber)' },
      student.attendance < 85
        ? { text: `Attendance at ${student.attendance}% — check in on engagement and barriers`, priority: 'Monitor', color: 'var(--accent-red)' }
        : { text: 'Attendance is strong — maintain current engagement approach', priority: 'On track', color: 'var(--accent-green)' },
    ],
  }
}

function StudentDrawer({ student, onClose }) {
  const intel = getStudentIntel(student)
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200 }} />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 420, background: 'var(--bg-secondary)',
        borderLeft: '1px solid var(--border-subtle)', zIndex: 201, display: 'flex', flexDirection: 'column',
        animation: 'fadeInUp 0.3s ease',
      }}>
        {/* Header */}
        <div style={{ padding: '20px 20px 0', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 17, margin: 0 }}>Student Profile</h3>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff' }}>
              {student.displayName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, display: 'block' }}>{student.displayName}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>{student.grade} · Last active: {student.lastActive}</span>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 2, background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', padding: 2 }}>
            {[
              { id: 'profile', label: 'Overview' },
              { id: 'intelligence', label: 'Intelligence' },
              { id: 'wellbeing', label: 'Wellbeing' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                flex: 1, padding: '6px 8px', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
                background: activeTab === tab.id ? 'var(--accent-blue)' : 'transparent',
                color: activeTab === tab.id ? '#fff' : 'var(--text-muted)',
                transition: 'all 200ms ease',
              }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 20px' }}>
          {activeTab === 'profile' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                <Card padding="sm" style={{ textAlign: 'center' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 500, color: 'var(--accent-blue)', display: 'block' }}>{student.attendance}%</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>Attendance</span>
                </Card>
                <Card padding="sm" style={{ textAlign: 'center' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 500, color: 'var(--accent-green)', display: 'block' }}>{student.assignmentCompletion}%</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>Assignments</span>
                </Card>
                <Card padding="sm" style={{ textAlign: 'center' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 500, color: 'var(--accent-purple)', display: 'block' }}>{intel.cat4Percentile}<sup style={{ fontSize: 10 }}>th</sup></span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>CAT4 %ile</span>
                </Card>
                <Card padding="sm" style={{ textAlign: 'center' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 500, color: intel.wellbeingTrend === 'attention' ? 'var(--accent-red)' : 'var(--accent-green)', display: 'block' }}>{intel.wellbeingScore}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>Wellbeing</span>
                </Card>
              </div>

              {/* Quick teaching recommendation */}
              <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Lightbulb size={14} color="var(--accent-amber)" /> Teaching Recommendations
              </h4>
              {intel.recommendations.map((rec, i) => (
                <Card key={i} padding="sm" style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ padding: '1px 6px', borderRadius: 'var(--radius-pill)', background: `${rec.color}15`, color: rec.color, fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, whiteSpace: 'nowrap', marginTop: 2 }}>{rec.priority}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{rec.text}</span>
                  </div>
                </Card>
              ))}

              {intel.parentFlagged && (
                <Card padding="sm" glow="amber" style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <AlertTriangle size={14} color="var(--accent-amber)" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--accent-amber)', fontWeight: 600 }}>Parent360 flag: engagement concern raised</span>
                  </div>
                </Card>
              )}
            </>
          )}

          {activeTab === 'intelligence' && (
            <>
              <Card glow="purple" padding="md" style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}><Brain size={14} color="var(--accent-purple)" /> CAT4 Profile</span>
                  <Badge variant="excelling" label={`${intel.cat4Percentile}th %ile`} />
                </div>
                {intel.domains.map((d, i) => (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{d.name}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: d.color }}>{d.pct}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 3, background: 'var(--bg-primary)', overflow: 'hidden' }}>
                      <div style={{ width: `${d.pct}%`, height: '100%', borderRadius: 3, background: d.color, transition: 'width 800ms ease-out' }} />
                    </div>
                  </div>
                ))}
              </Card>

              <Card padding="md" style={{ marginBottom: 14 }}>
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}><BookOpen size={14} color="var(--accent-cyan)" /> Learning Style</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 500, color: 'var(--accent-cyan)' }}>{intel.learningPct}%</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{intel.learningStyle} Learner</span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.5 }}>
                  {intel.learningStyle === 'Visual' && 'Use diagrams, charts and colour-coded resources. This student builds mental models visually.'}
                  {intel.learningStyle === 'Read & Write' && 'Provide structured notes and written instructions. This student processes text effectively.'}
                  {intel.learningStyle === 'Kinaesthetic' && 'Include hands-on activities and physical models. This student learns by doing.'}
                  {intel.learningStyle === 'Auditory' && 'Use discussion, verbal explanation and audio resources. This student learns through listening.'}
                </p>
              </Card>

              <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, marginBottom: 8 }}>How to teach this student</h4>
              {[
                { ok: true, text: intel.learningStyle === 'Visual' ? 'Use diagrams and visual organisers' : intel.learningStyle === 'Kinaesthetic' ? 'Include practical demonstrations' : 'Provide structured written notes' },
                { ok: true, text: student.assignmentCompletion > 85 ? 'Ready for extension challenges' : 'Break tasks into smaller steps' },
                { ok: true, text: `Cognitive strength: ${intel.domains.sort((a, b) => b.pct - a.pct)[0].name} reasoning` },
                { ok: false, text: intel.learningStyle === 'Visual' ? 'Avoid long verbal-only explanations' : 'Avoid unstructured group work' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <Check size={12} color={r.ok ? 'var(--accent-green)' : 'var(--accent-red)'} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{r.text}</span>
                </div>
              ))}
            </>
          )}

          {activeTab === 'wellbeing' && (
            <>
              <Card padding="md" style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}><Heart size={14} color="var(--accent-green)" /> Wellbeing Score</span>
                  <Badge variant={intel.wellbeingTrend} />
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 500, color: intel.wellbeingTrend === 'attention' ? 'var(--accent-red)' : 'var(--accent-green)' }}>{intel.wellbeingScore}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: 'var(--text-muted)' }}>/5</span>
                </div>
                <GradientBar value={parseFloat(intel.wellbeingScore)} max={5} gradient={intel.wellbeingTrend === 'attention' ? 'amber-red' : 'green-cyan'} showValue={false} height={6} />
              </Card>

              <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Parent360 Feedback</h4>
              <Card padding="md" style={{ marginBottom: 14 }}>
                {intel.parentFlagged ? (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <AlertTriangle size={14} color="var(--accent-amber)" />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--accent-amber)', fontWeight: 600 }}>Parent raised concern</span>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Parent reported low academic engagement in the most recent Parent360 survey. They've requested a follow-up conversation with the class teacher.
                    </p>
                  </div>
                ) : (
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    No concerns raised in recent Parent360 surveys. Wellbeing trend is {intel.wellbeingTrend === 'improved' ? 'positive' : 'stable'}.
                  </p>
                )}
              </Card>

              <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Recommended Next Steps</h4>
              {[
                intel.wellbeingTrend === 'attention'
                  ? { icon: AlertTriangle, color: 'var(--accent-red)', text: 'Schedule a 1:1 check-in to discuss engagement and any personal barriers' }
                  : { icon: Check, color: 'var(--accent-green)', text: 'Continue current approach — wellbeing is stable or improving' },
                intel.parentFlagged
                  ? { icon: MessageSquare, color: 'var(--accent-amber)', text: 'Respond to parent concern within 2 school days' }
                  : { icon: Heart, color: 'var(--accent-green)', text: 'No parent follow-up needed at this time' },
              ].map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${step.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <Icon size={12} color={step.color} />
                    </div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{step.text}</span>
                  </div>
                )
              })}
            </>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 8, flexShrink: 0 }}>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', background: 'var(--accent-blue)', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600 }}>
            <MessageSquare size={14} /> Message
          </button>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', cursor: 'pointer', color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600 }}>
            <BarChart3 size={14} /> Full Report
          </button>
        </div>
      </div>
    </>
  )
}

export default function ClassRoster() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStudents = mockGraphStudents.filter(s =>
    s.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Stats
  const avgAttendance = Math.round(filteredStudents.reduce((a, s) => a + s.attendance, 0) / filteredStudents.length)
  const flaggedCount = filteredStudents.filter(s => s.attendance < 82 || s.assignmentCompletion < 70).length

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, margin: 0 }}>Class Roster</h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 500, display: 'block' }}>{filteredStudents.length}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>Students</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 500, display: 'block' }}>{avgAttendance}%</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>Avg Attendance</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 500, color: flaggedCount > 0 ? 'var(--accent-amber)' : 'var(--accent-green)', display: 'block' }}>{flaggedCount}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>Need Attention</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: 3, marginBottom: 16, overflowX: 'auto' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '8px 16px', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
            background: activeTab === tab.id ? 'var(--accent-blue)' : 'transparent',
            color: activeTab === tab.id ? '#fff' : 'var(--text-muted)',
            transition: 'all 200ms ease',
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search students..."
          style={{ width: '100%', padding: '10px 12px 10px 36px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, outline: 'none' }}
        />
      </div>

      {/* Table */}
      <div className="responsive-table-wrap">
        <Card padding="sm">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)' }}>
                {['Student Name', 'Last Active', 'Assignments', 'Attendance', 'Wellbeing', ''].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, i) => {
                const intel = getStudentIntel(student)
                const needsAttention = student.attendance < 82 || student.assignmentCompletion < 70
                return (
                  <tr key={student.id} onClick={() => setSelectedStudent(student)}
                    style={{ borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer', transition: 'background 150ms ease' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: '50%', background: `hsl(${i * 15}, 60%, 50%)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 11, color: '#fff',
                        }}>
                          {student.displayName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <span style={{ fontWeight: 500, display: 'block' }}>{student.displayName}</span>
                          {needsAttention && <span style={{ fontSize: 10, color: 'var(--accent-amber)' }}>Needs attention</span>}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-muted)' }}>{student.lastActive}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 48, height: 4, borderRadius: 2, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                          <div style={{ width: `${student.assignmentCompletion}%`, height: '100%', borderRadius: 2, background: student.assignmentCompletion > 85 ? 'var(--accent-green)' : student.assignmentCompletion > 70 ? 'var(--accent-blue)' : 'var(--accent-amber)' }} />
                        </div>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-secondary)' }}>{student.assignmentCompletion}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: student.attendance > 90 ? 'var(--accent-green)' : student.attendance > 80 ? 'var(--text-secondary)' : 'var(--accent-amber)' }}>
                        {student.attendance}%
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <Badge variant={intel.wellbeingTrend} />
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <button style={{ padding: '4px 10px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-subtle)', background: 'transparent', cursor: 'pointer', color: 'var(--accent-blue)', fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600 }}>
                        View
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Student Drawer */}
      {selectedStudent && <StudentDrawer student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
    </div>
  )
}
