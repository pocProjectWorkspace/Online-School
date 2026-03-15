import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Video, FileText, ExternalLink, Users, ClipboardCheck, MessageSquare } from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import {
  mockGraphMe, mockGraphCalendarEvents, mockAssignments, mockOneDriveFiles,
} from '../../data/mockGraph'

function formatTime(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  return (bytes / 1024).toFixed(0) + ' KB'
}

export default function TeacherDashboard() {
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)

  const activeAssignments = mockAssignments.filter(a => a.status === 'active')

  const handleJoinTeams = () => {
    setToast('Joining Microsoft Teams...')
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px' }}>
      <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 4 }}>
        Good morning, {mockGraphMe.displayName.split(' ')[1]}
      </h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
        {mockGraphMe.officeLocation} · Sunday, 15 March 2026
      </p>

      {/* Stats Strip */}
      <div className="responsive-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Classes Today', value: '3', icon: Users, color: 'var(--accent-blue)' },
          { label: 'To Review', value: '4', icon: ClipboardCheck, color: 'var(--accent-amber)' },
          { label: 'Messages', value: '2', icon: MessageSquare, color: 'var(--accent-cyan)' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i} padding="md">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={stat.color} />
                </div>
                <div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 500, display: 'block', lineHeight: 1 }}>{stat.value}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>{stat.label}</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Today's Classes */}
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 12 }}>Today's Classes</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        {mockGraphCalendarEvents.value.map((evt, i) => {
          const isNow = i === 0
          return (
            <Card key={evt.id} padding="md">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 55 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 500, color: isNow ? 'var(--accent-blue)' : 'var(--text-primary)' }}>{formatTime(evt.start.dateTime)}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)' }}>{formatTime(evt.end.dateTime)}</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14 }}>{evt.subject}</span>
                      {isNow && <Badge variant="live" />}
                    </div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>
                      {evt.location.displayName} · {evt.attendees[0].count} students
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={handleJoinTeams} style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px',
                    background: 'rgba(45,125,210,0.15)', border: 'none', borderRadius: 'var(--radius-pill)',
                    cursor: 'pointer', color: 'var(--accent-blue)', fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
                  }}>
                    <Video size={14} /> Join Teams
                  </button>
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px',
                    background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-pill)',
                    cursor: 'pointer', color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                  }}>
                    View Plan
                  </button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Two columns: Assignments + Files */}
      <div className="teacher-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 12 }}>Assignments to Review</h3>
          <Card padding="sm">
            {activeAssignments.map((a, i) => (
              <div key={a.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px',
                borderBottom: i < activeAssignments.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, display: 'block' }}>{a.displayName}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{a.class} · {a.submitted}/{a.total} submitted</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 50, height: 4, borderRadius: 2, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                    <div style={{ width: `${(a.submitted / a.total) * 100}%`, height: '100%', borderRadius: 2, background: a.submitted === a.total ? 'var(--accent-green)' : 'var(--accent-amber)', transition: 'width 800ms ease-out' }} />
                  </div>
                  <button style={{ padding: '4px 10px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-subtle)', background: 'transparent', cursor: 'pointer', color: 'var(--accent-blue)', fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600 }}>
                    Review
                  </button>
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 12 }}>Lesson Files</h3>
          <Card padding="sm">
            {mockOneDriveFiles.value.map((file, i) => (
              <div key={file.id} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                borderBottom: i < mockOneDriveFiles.value.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <FileText size={18} color="var(--accent-blue)" />
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, display: 'block' }}>{file.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-muted)' }}>{formatFileSize(file.size)}</span>
                </div>
                <ExternalLink size={14} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, padding: '12px 20px',
          background: 'var(--bg-card)', border: '1px solid var(--accent-blue)', borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-card)', zIndex: 1000,
          display: 'flex', alignItems: 'center', gap: 10,
          animation: 'fadeInUp 0.3s ease forwards',
        }}>
          <Video size={16} color="var(--accent-blue)" />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-primary)' }}>{toast}</span>
        </div>
      )}
    </div>
  )
}
