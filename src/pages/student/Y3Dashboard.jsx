import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Star, BookOpen, Award, Search as Magnifier, Gem,
  Video, FolderOpen, Play, Image, FileText, Music,
} from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import ProgressRing from '../../components/common/ProgressRing'

const learningPath = [
  { id: 'water-cycle', emoji: '\uD83C\uDF0A', title: 'The Water Cycle', activities: 3, progress: 60, subject: 'Science', color: '#2D7DD2', action: 'Continue' },
  { id: 'describing-words', emoji: '\u270F\uFE0F', title: 'Describing Words', activities: 2, progress: 30, subject: 'English', color: '#7B5CF0', action: 'Start' },
  { id: 'adding-numbers', emoji: '\uD83D\uDD22', title: 'Adding & Subtracting', activities: 4, progress: 0, subject: 'Maths', color: '#00E5A0', action: 'Start' },
]

const badges = [
  { icon: Star, label: 'Science Star', color: '#FFB800' },
  { icon: BookOpen, label: 'Book Worm', color: '#2D7DD2' },
  { icon: Magnifier, label: 'Explorer', color: '#7B5CF0' },
  { icon: Award, label: 'Top Learner', color: '#00E5A0' },
  { icon: Gem, label: 'Gem Collector', color: '#00D4FF' },
]

const todayClasses = [
  { time: '08:00', subject: 'Science — The Water Cycle', teacher: 'Ms. Mitchell', live: true },
  { time: '09:15', subject: 'English — Describing Words', teacher: 'Ms. Mitchell', live: false },
  { time: '10:30', subject: 'Maths — Adding Numbers', teacher: 'Mr. Thompson', live: false },
]

const resources = [
  { icon: Play, label: 'Water Cycle Video', type: 'Video', color: '#FF4757', subject: 'Science' },
  { icon: Image, label: 'Rainforest Pictures', type: 'Gallery', color: '#00E5A0', subject: 'Science' },
  { icon: FileText, label: 'Describing Words Worksheet', type: 'Worksheet', color: '#7B5CF0', subject: 'English' },
  { icon: Music, label: 'Times Tables Song', type: 'Audio', color: '#FFB800', subject: 'Maths' },
  { icon: Play, label: 'How Clouds Form', type: 'Video', color: '#2D7DD2', subject: 'Science' },
  { icon: FileText, label: 'Number Bonds Practice', type: 'Worksheet', color: '#00D4FF', subject: 'Maths' },
]

export default function Y3Dashboard() {
  const navigate = useNavigate()
  const [greetingVisible, setGreetingVisible] = useState(false)
  const [gems] = useState(1240)
  const [toast, setToast] = useState(null)

  useEffect(() => { setTimeout(() => setGreetingVisible(true), 100) }, [])

  const handleJoinClass = () => {
    setToast('Joining Microsoft Teams...')
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <div className="page-content page-enter" style={{ padding: '28px 24px', maxWidth: 900, margin: '0 auto' }}>
        {/* Greeting */}
        <h1 style={{
          fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 28, marginBottom: 24,
          opacity: greetingVisible ? 1 : 0, transform: greetingVisible ? 'translateX(0)' : 'translateX(-20px)',
          transition: 'all 600ms ease',
        }}>
          Good morning, Aisha! {'\u2B50'}
        </h1>

        {/* Today's Classes — Join Teams */}
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Today's Classes</h2>
        <Card padding="sm" style={{ borderRadius: 'var(--radius-xl)', marginBottom: 28 }}>
          {todayClasses.map((cls, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px',
              borderBottom: i < todayClasses.length - 1 ? '1px solid var(--border-subtle)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: cls.live ? 'var(--accent-blue)' : 'var(--text-muted)', minWidth: 40 }}>{cls.time}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: 15 }}>{cls.subject}</span>
                    {cls.live && <Badge variant="live" />}
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>{cls.teacher}</span>
                </div>
              </div>
              {cls.live && (
                <button onClick={handleJoinClass} style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
                  background: 'var(--accent-blue)', border: 'none', borderRadius: 'var(--radius-pill)',
                  cursor: 'pointer', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                }}>
                  <Video size={16} /> Join Class
                </button>
              )}
            </div>
          ))}
        </Card>

        {/* Today's Learning Path */}
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 18, marginBottom: 16 }}>Today's Learning Path</h2>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8, marginBottom: 28 }}>
          {learningPath.map((lesson, i) => (
            <Card key={lesson.id} padding="lg" style={{
              minWidth: 220, cursor: 'pointer', borderRadius: 'var(--radius-xl)',
              transition: 'transform 250ms ease, box-shadow 250ms ease',
            }}
              onClick={() => lesson.id === 'water-cycle' ? navigate(`/student/y3/lesson/${lesson.id}`) : null}
            >
              <div style={{ fontSize: 40, marginBottom: 12, textAlign: 'center' }}>{lesson.emoji}</div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, textAlign: 'center', marginBottom: 4 }}>{lesson.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 14 }}>
                {lesson.activities} activities · {lesson.subject}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                <ProgressRing value={lesson.progress} size={80} strokeWidth={6} color={lesson.color} label={`${lesson.progress}%`} />
              </div>
              <button style={{
                width: '100%', padding: '10px', borderRadius: 'var(--radius-pill)',
                background: lesson.progress > 0 ? lesson.color : 'var(--bg-secondary)',
                border: lesson.progress > 0 ? 'none' : '1px solid var(--border-subtle)',
                color: lesson.progress > 0 ? '#fff' : 'var(--text-secondary)',
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>
                {lesson.action}
              </button>
            </Card>
          ))}
        </div>

        {/* My Resources */}
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 18, marginBottom: 12 }}>
          <FolderOpen size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />
          My Resources
        </h2>
        <div className="responsive-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 28 }}>
          {resources.map((res, i) => {
            const Icon = res.icon
            return (
              <Card key={i} padding="md" style={{ borderRadius: 'var(--radius-xl)', cursor: 'pointer', transition: 'transform 200ms ease' }}
                onClick={() => {}}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 'var(--radius-md)',
                    background: `${res.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={18} color={res.color} />
                  </div>
                  <div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, display: 'block', lineHeight: 1.3 }}>{res.label}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>{res.type} · {res.subject}</span>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* My Badges */}
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 18, marginBottom: 16 }}>My Badges</h2>
        <div style={{ display: 'flex', gap: 16, marginBottom: 28, overflowX: 'auto', paddingBottom: 4 }}>
          {badges.map((badge, i) => {
            const Icon = badge.icon
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 80 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: `${badge.color}20`, border: `2px solid ${badge.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 12px ${badge.color}30`,
                  animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
                }}>
                  <Icon size={24} color={badge.color} />
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>{badge.label}</span>
              </div>
            )
          })}
        </div>

        {/* Message from Teacher */}
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Message from Teacher</h2>
        <Card padding="lg" style={{ borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', flexShrink: 0,
            }}>SM</div>
            <div>
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 4 }}>Ms. Mitchell</span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Great work on your diagram yesterday, Aisha! {'\u2B50'} Keep it up!
              </p>
            </div>
          </div>
        </Card>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, padding: '12px 20px',
          background: 'var(--bg-card)', border: '1px solid var(--accent-blue)', borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-card)', zIndex: 1000, display: 'flex', alignItems: 'center', gap: 10,
          animation: 'fadeInUp 0.3s ease forwards',
        }}>
          <Video size={16} color="var(--accent-blue)" />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-primary)' }}>{toast}</span>
        </div>
      )}
    </div>
  )
}
