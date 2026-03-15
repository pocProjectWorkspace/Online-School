import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users, Video, BookOpen, Mic, Search, Smile, ClipboardList, FileText,
  Calculator, BarChart3, GraduationCap, ChevronRight, MessageSquare, Wifi,
} from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import GradientBar from '../../components/common/GradientBar'
import { myClasses, classmates, assignments, insightsData, notebookSections } from '../../data/microsoft365'

const services = [
  { icon: Users, label: 'Teams — My Classes', desc: '6 classes · 3 unread messages', path: null, color: '#6264A7', badge: '3' },
  { icon: BookOpen, label: 'Reading Coach', desc: '12 sessions · 142 wpm fluency', path: '/student/y9/reading-coach', color: '#2D7DD2', badge: 'AI' },
  { icon: Mic, label: 'Speaker Coach', desc: '4 presentations practised', path: '/student/y9/speaker-coach', color: '#7B5CF0', badge: 'AI' },
  { icon: Search, label: 'Search Coach', desc: '2 research topics · 10 sources', path: null, color: '#00D4FF', badge: 'AI' },
  { icon: Smile, label: 'Reflect', desc: 'Daily wellbeing check-in', path: '/student/y9/reflect', color: '#00E5A0', badge: 'New' },
  { icon: ClipboardList, label: 'Assignments', desc: '3 pending · 4 graded', path: '/student/y9/assignments', color: '#FFB800', badge: '3' },
]

const statusColors = { online: '#00E5A0', away: '#FFB800', offline: '#5A7399' }

export default function Y9Microsoft365() {
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)

  const handleJoinTeams = () => {
    setToast('Joining Microsoft Teams...')
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Microsoft 365</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)' }}>Your learning tools and collaboration hub</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BarChart3 size={14} color="var(--accent-cyan)" />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'var(--accent-cyan)' }}>{insightsData.weeklyTimeSpent.total}</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>this week</span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="responsive-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
        {services.map((svc, i) => {
          const Icon = svc.icon
          return (
            <Card key={i} padding="md" onClick={() => svc.path ? navigate(svc.path) : null}
              style={{ cursor: svc.path ? 'pointer' : 'default', transition: 'transform 200ms ease' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: `${svc.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={svc.color} />
                </div>
                {svc.badge && (
                  <span style={{ padding: '1px 8px', borderRadius: 'var(--radius-pill)', background: svc.badge === 'AI' ? 'rgba(123,92,240,0.15)' : svc.badge === 'New' ? 'rgba(0,229,160,0.15)' : 'rgba(45,125,210,0.15)', color: svc.badge === 'AI' ? 'var(--accent-purple)' : svc.badge === 'New' ? 'var(--accent-green)' : 'var(--accent-blue)', fontSize: 10, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                    {svc.badge}
                  </span>
                )}
              </div>
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 4 }}>{svc.label}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>{svc.desc}</span>
              {svc.path && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: svc.color, fontWeight: 600, display: 'block', marginTop: 8 }}>Open &rarr;</span>}
            </Card>
          )
        })}
      </div>

      <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, marginBottom: 28 }}>
        {/* My Classes */}
        <div>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 12 }}>My Classes</h3>
          <Card padding="sm">
            {myClasses.map((cls, i) => (
              <div key={cls.id} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                borderBottom: i < myClasses.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                cursor: 'pointer',
              }}>
                <div style={{ width: 8, height: 36, borderRadius: 4, background: cls.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: 13 }}>{cls.name}</span>
                    {cls.unread > 0 && <span style={{ padding: '0 6px', borderRadius: 'var(--radius-pill)', background: 'rgba(45,125,210,0.15)', color: 'var(--accent-blue)', fontSize: 10, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{cls.unread}</span>}
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{cls.teacher} · {cls.members} members</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginTop: 2 }}>{cls.recentActivity}</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleJoinTeams() }} style={{
                  padding: '4px 10px', borderRadius: 'var(--radius-pill)', background: `${cls.color}15`, border: 'none',
                  cursor: 'pointer', color: cls.color, fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <Video size={10} /> Join
                </button>
              </div>
            ))}
          </Card>
        </div>

        {/* Classmates */}
        <div>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 12 }}>Classmates</h3>
          <Card padding="sm">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}>
              {classmates.map(mate => (
                <div key={mate.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora', sans-serif", fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)' }}>
                      {mate.avatar}
                    </div>
                    <span style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderRadius: '50%', background: statusColors[mate.status], border: '2px solid var(--bg-secondary)' }} />
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: mate.status === 'offline' ? 'var(--text-muted)' : 'var(--text-secondary)' }}>{mate.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Class Notebook + Insights */}
      <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* OneNote Notebook */}
        <div>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileText size={16} color="var(--accent-purple)" /> Class Notebook
          </h3>
          <Card padding="sm">
            {notebookSections.map((sec, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                borderBottom: i < notebookSections.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <div style={{ width: 6, height: 32, borderRadius: 3, background: sec.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: 13, display: 'block' }}>{sec.subject}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{sec.handouts} handouts · {sec.notes} notes · Edited {sec.lastEdited}</span>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)' }}>{sec.pages} pages</span>
              </div>
            ))}
          </Card>
        </div>

        {/* Learning Insights */}
        <div>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BarChart3 size={16} color="var(--accent-cyan)" /> My Learning Insights
          </h3>
          <Card padding="md" style={{ marginBottom: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14 }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 500, color: 'var(--accent-cyan)', display: 'block' }}>{insightsData.engagementStreak}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>Day Streak</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 500, color: 'var(--accent-green)', display: 'block' }}>{insightsData.completionRate}%</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>Completion</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 500, display: 'block' }}>{insightsData.avgSessionLength}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>Avg Session</span>
              </div>
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Time by subject this week</span>
            {insightsData.weeklyTimeSpent.bySubject.map((s, i) => (
              <GradientBar key={i} value={s.hours} max={4} gradient={s.color} label={s.name} height={5} showValue={false} />
            ))}
          </Card>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, padding: '12px 20px', background: 'var(--bg-card)', border: '1px solid var(--accent-blue)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', zIndex: 1000, display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeInUp 0.3s ease forwards' }}>
          <Video size={16} color="var(--accent-blue)" />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-primary)' }}>{toast}</span>
        </div>
      )}
    </div>
  )
}
