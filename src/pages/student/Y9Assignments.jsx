import { useState } from 'react'
import { ClipboardList, Clock, Check, Award } from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import { assignments } from '../../data/microsoft365'

const TABS = ['All', 'Pending', 'Submitted', 'Graded']

const subjectColors = {
  Mathematics: '#2D7DD2',
  Science: '#00E5A0',
  English: '#7B5CF0',
  History: '#FFB800',
  Arabic: '#FF4757',
}

function StatusBadge({ assignment }) {
  if (assignment.status === 'pending') {
    return (
      <Badge
        variant="developing"
        label="Due"
        style={{ background: 'rgba(255,184,0,0.15)', color: 'var(--accent-amber)' }}
      />
    )
  }
  if (assignment.status === 'submitted') {
    return (
      <Badge
        variant="excelling"
        label="Submitted"
        style={{ background: 'rgba(45,125,210,0.15)', color: 'var(--accent-blue)' }}
      />
    )
  }
  if (assignment.status === 'graded') {
    return (
      <Badge
        variant="secure"
        label="Graded"
        style={{ background: 'rgba(0,229,160,0.15)', color: 'var(--accent-green)' }}
      />
    )
  }
  return null
}

function AssignmentCard({ assignment }) {
  const subjectColor = subjectColors[assignment.subject] || 'var(--accent-blue)'

  return (
    <Card padding="md" style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        {/* Left colour bar */}
        <div style={{
          width: 4,
          alignSelf: 'stretch',
          borderRadius: 2,
          background: subjectColor,
          flexShrink: 0,
        }} />

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: 'var(--text-primary)',
                display: 'block',
                marginBottom: 3,
              }}>
                {assignment.title}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: subjectColor,
                  fontWeight: 600,
                }}>
                  {assignment.subject}
                </span>
                <span style={{ color: 'var(--border-subtle)', fontSize: 12 }}>·</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: 'var(--text-muted)',
                }}>
                  {assignment.teacher}
                </span>
              </div>
            </div>

            {/* Grade score for graded assignments */}
            {assignment.status === 'graded' && assignment.grade && (
              <div style={{
                textAlign: 'right',
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 22,
                  fontWeight: 500,
                  color: 'var(--accent-green)',
                  display: 'block',
                  lineHeight: 1,
                }}>
                  {assignment.grade}
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  color: 'var(--text-muted)',
                  marginTop: 2,
                  display: 'block',
                }}>
                  points
                </span>
              </div>
            )}
          </div>

          {/* Footer row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {/* Status badge */}
            <StatusBadge assignment={assignment} />

            {/* Due date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={11} color="var(--text-muted)" />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: assignment.status === 'pending' ? 'var(--accent-amber)' : 'var(--text-muted)',
              }}>
                {assignment.due}
              </span>
            </div>

            {/* Points possible */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Award size={11} color="var(--text-muted)" />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: 'var(--text-muted)',
              }}>
                {assignment.points} pts
              </span>
            </div>

            {/* Submitted grade for submitted (not yet returned) */}
            {assignment.status === 'submitted' && assignment.grade && (
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: 'var(--accent-blue)',
              }}>
                {assignment.grade}
              </span>
            )}

            {/* Rubric pill */}
            {assignment.rubric && (
              <span style={{
                padding: '2px 8px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(123,92,240,0.12)',
                color: 'var(--accent-purple)',
                fontSize: 10,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Rubric
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function Y9Assignments() {
  const [activeTab, setActiveTab] = useState('All')

  const pendingCount = assignments.filter(a => a.status === 'pending').length
  const submittedCount = assignments.filter(a => a.status === 'submitted').length
  const gradedCount = assignments.filter(a => a.status === 'graded').length

  const tabCounts = {
    All: assignments.length,
    Pending: pendingCount,
    Submitted: submittedCount,
    Graded: gradedCount,
  }

  const filtered = activeTab === 'All'
    ? assignments
    : assignments.filter(a => a.status === activeTab.toLowerCase())

  // Summary: total points earned vs possible across graded assignments
  const gradedAssignments = assignments.filter(a => a.status === 'graded' && a.grade)
  const totalEarned = gradedAssignments.reduce((sum, a) => {
    const earned = parseInt(a.grade.split('/')[0], 10)
    return sum + (isNaN(earned) ? 0 : earned)
  }, 0)
  const totalPossible = gradedAssignments.reduce((sum, a) => sum + a.points, 0)
  const percentage = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 900, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255,184,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <ClipboardList size={18} color="var(--accent-amber)" />
            </div>
            <h1 style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: 22,
              margin: 0,
              color: 'var(--text-primary)',
            }}>
              Assignments
            </h1>
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: 'var(--text-muted)',
            margin: 0,
          }}>
            Track your work across all subjects
          </p>
        </div>

        {/* Stat pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(255,184,0,0.10)',
            border: '1px solid rgba(255,184,0,0.2)',
          }}>
            <Clock size={12} color="var(--accent-amber)" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--accent-amber)', fontWeight: 600 }}>
              {pendingCount}
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>pending</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(45,125,210,0.10)',
            border: '1px solid rgba(45,125,210,0.2)',
          }}>
            <Check size={12} color="var(--accent-blue)" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--accent-blue)', fontWeight: 600 }}>
              {submittedCount}
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>submitted</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(0,229,160,0.10)',
            border: '1px solid rgba(0,229,160,0.2)',
          }}>
            <Award size={12} color="var(--accent-green)" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--accent-green)', fontWeight: 600 }}>
              {gradedCount}
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>graded</span>
          </div>
        </div>
      </div>

      {/* Tab filter */}
      <div style={{
        display: 'flex',
        gap: 6,
        marginBottom: 20,
        background: 'var(--bg-secondary)',
        padding: 4,
        borderRadius: 'var(--radius-md)',
        width: 'fit-content',
      }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                background: isActive ? 'var(--bg-card)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                boxShadow: isActive ? 'var(--shadow-card)' : 'none',
                transition: 'all 200ms ease',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {tab}
              {tabCounts[tab] > 0 && (
                <span style={{
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-pill)',
                  background: isActive ? 'rgba(45,125,210,0.15)' : 'rgba(90,115,153,0.15)',
                  color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  lineHeight: 1.6,
                }}>
                  {tabCounts[tab]}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Assignment list */}
      <div style={{ marginBottom: 32 }}>
        {filtered.length === 0 ? (
          <Card padding="lg" style={{ textAlign: 'center' }}>
            <ClipboardList size={32} color="var(--text-muted)" style={{ marginBottom: 10, opacity: 0.5 }} />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
              No {activeTab.toLowerCase()} assignments
            </p>
          </Card>
        ) : (
          filtered.map(assignment => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))
        )}
      </div>

      {/* Summary section */}
      <Card padding="md" glow="green">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Award size={16} color="var(--accent-green)" />
              <span style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: 'var(--text-primary)',
              }}>
                Points Summary — Graded Assignments
              </span>
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: 'var(--text-muted)',
              margin: 0,
            }}>
              Based on {gradedAssignments.length} returned assignment{gradedAssignments.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 28,
                fontWeight: 500,
                color: 'var(--accent-green)',
                display: 'block',
                lineHeight: 1,
              }}>
                {totalEarned}/{totalPossible}
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: 'var(--text-muted)',
                marginTop: 4,
                display: 'block',
              }}>
                total points
              </span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 28,
                fontWeight: 500,
                color: percentage >= 80
                  ? 'var(--accent-green)'
                  : percentage >= 60
                  ? 'var(--accent-amber)'
                  : 'var(--accent-red)',
                display: 'block',
                lineHeight: 1,
              }}>
                {percentage}%
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: 'var(--text-muted)',
                marginTop: 4,
                display: 'block',
              }}>
                overall
              </span>
            </div>

            {/* Mini progress bar */}
            <div style={{ width: 120 }}>
              <div style={{
                height: 6,
                borderRadius: 'var(--radius-pill)',
                background: 'var(--bg-primary)',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${percentage}%`,
                  borderRadius: 'var(--radius-pill)',
                  background: percentage >= 80
                    ? 'var(--accent-green)'
                    : percentage >= 60
                    ? 'var(--accent-amber)'
                    : 'var(--accent-red)',
                  transition: 'width 800ms ease-out',
                }} />
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 4,
              }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>0</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>{totalPossible} pts</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
