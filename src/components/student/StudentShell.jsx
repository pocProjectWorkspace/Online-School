import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  Home, BookOpen, Video, ClipboardList, Brain, BarChart3, Trophy,
  Bell, Gem, MessageSquare, Calendar, Flame,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useTheme } from '../../context/ThemeContext'
import ThemeToggle from '../common/ThemeToggle'
import gemsLogoDark from '../../assets/gems-logo.svg'
import gemsLogoLight from '../../assets/gems-logo-light.svg'

const y3Nav = [
  { icon: Home, label: 'My Learning', path: '/student/y3' },
  { icon: BookOpen, label: 'Lessons', path: '/student/y3' },
  { icon: Video, label: 'Join Class', path: '/student/y3', badge: { text: 'Live', bg: 'rgba(255,71,87,0.15)', color: 'var(--accent-red)', pulse: true } },
  { icon: Trophy, label: 'My Badges', path: '/student/y3' },
  { icon: MessageSquare, label: 'Messages', path: '/student/y3', badge: { text: '1', bg: 'rgba(45,125,210,0.15)', color: 'var(--accent-blue)' } },
]

const y9Nav = [
  { icon: Home, label: 'Dashboard', path: '/student/y9' },
  { icon: BookOpen, label: 'Lessons', path: '/student/y9' },
  { icon: Video, label: 'Join Class', path: '/student/y9', badge: { text: 'Live', bg: 'rgba(255,71,87,0.15)', color: 'var(--accent-red)', pulse: true } },
  { icon: Brain, label: 'My Profile', path: '/student/y9/intelligence' },
  { icon: ClipboardList, label: 'Assignments', path: '/student/y9', badge: { text: '3', bg: 'rgba(255,184,0,0.15)', color: 'var(--accent-amber)' } },
  { icon: BarChart3, label: 'Progress', path: '/student/y9' },
  { icon: Calendar, label: 'Timetable', path: '/student/y9' },
  { icon: MessageSquare, label: 'Messages', path: '/student/y9' },
]

const y3MobileNav = [
  { icon: Home, label: 'Home', path: '/student/y3' },
  { icon: BookOpen, label: 'Lessons', path: '/student/y3' },
  { icon: Video, label: 'Class', path: '/student/y3' },
  { icon: Trophy, label: 'Badges', path: '/student/y3' },
]

const y9MobileNav = [
  { icon: Home, label: 'Home', path: '/student/y9' },
  { icon: BookOpen, label: 'Lessons', path: '/student/y9' },
  { icon: Brain, label: 'Profile', path: '/student/y9/intelligence' },
  { icon: BarChart3, label: 'Progress', path: '/student/y9' },
]

function StudentSidebar({ variant }) {
  const navigate = useNavigate()
  const location = useLocation()
  const navItems = variant === 'y3' ? y3Nav : y9Nav
  const isY3 = variant === 'y3'

  const studentName = isY3 ? 'Aisha Al Mansoori' : 'Rayan Sharma'
  const studentGrade = isY3 ? 'Year 3 · Section J' : 'Year 9 · Section B'
  const studentSchool = isY3 ? 'GEMS Westminster' : 'GEMS Wellington'
  const initials = isY3 ? 'AA' : 'RS'
  const avatarGrad = isY3 ? 'var(--accent-purple), var(--accent-cyan)' : 'var(--accent-blue), var(--accent-cyan)'

  return (
    <aside style={{
      width: 240, minWidth: 240, height: 'calc(100vh - 56px)',
      background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-subtle)',
      display: 'flex', flexDirection: 'column', position: 'sticky', top: 56,
    }}>
      {/* Student Profile */}
      <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: `linear-gradient(135deg, ${avatarGrad})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff',
          }}>{initials}</div>
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{studentName}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{studentGrade}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>{studentSchool}</div>
          </div>
        </div>
        {isY3 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, padding: '4px 10px', borderRadius: 'var(--radius-pill)', background: 'rgba(255,184,0,0.12)', width: 'fit-content' }}>
            <Gem size={14} color="var(--accent-amber)" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, color: 'var(--accent-amber)' }}>1,240 gems</span>
          </div>
        )}
        {!isY3 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
            <Flame size={14} color="var(--accent-amber)" />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--accent-amber)', fontWeight: 500 }}>7 day streak</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = location.pathname === item.path && item.label === (isY3 ? 'My Learning' : 'Dashboard')
          return (
            <button key={item.label} onClick={() => navigate(item.path)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
              background: isActive ? 'rgba(45,125,210,0.08)' : 'transparent', border: 'none',
              borderLeft: isActive ? '3px solid var(--accent-blue)' : '3px solid transparent',
              cursor: 'pointer', color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
              fontFamily: "'DM Sans', sans-serif", fontSize: isY3 ? 14 : 13, fontWeight: isActive ? 600 : 400,
              transition: 'all 180ms ease',
            }}>
              <Icon size={isY3 ? 20 : 18} />
              <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  padding: '1px 8px', borderRadius: 'var(--radius-pill)',
                  background: item.badge.bg, color: item.badge.color,
                  fontSize: 10, fontWeight: 600,
                  animation: item.badge.pulse ? 'pulse 2s ease-in-out infinite' : undefined,
                }}>
                  {item.badge.text}
                </span>
              )}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default function StudentShell({ variant = 'y3' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useApp()
  const { isDark } = useTheme()
  const isY3 = variant === 'y3'
  const mobileNav = isY3 ? y3MobileNav : y9MobileNav

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Nav */}
      <header style={{
        height: 56, background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
            <img src={isDark ? gemsLogoDark : gemsLogoLight} alt="Global Online School" style={{ height: 28 }} />
          </button>
          <span className="portal-label" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)', borderLeft: '1px solid var(--border-subtle)', paddingLeft: 12 }}>
            {isY3 ? 'Student Portal' : 'Student Portal'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isY3 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: 'rgba(255,184,0,0.12)', color: 'var(--accent-amber)', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 13 }}>
              <Gem size={14} /> 1,240
            </div>
          )}
          <ThemeToggle size="sm" showLabel={isY3} />
          <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }}>
            <Bell size={19} />
            <span style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-red)' }} />
          </button>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: `linear-gradient(135deg, ${isY3 ? 'var(--accent-purple), var(--accent-cyan)' : 'var(--accent-blue), var(--accent-cyan)'})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 11, color: '#fff',
          }}>
            {isY3 ? 'AA' : 'RS'}
          </div>
        </div>
      </header>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1 }}>
        <div className="shell-sidebar">
          <StudentSidebar variant={variant} />
        </div>
        <main className="shell-main" style={{ flex: 1, overflowY: 'auto', height: 'calc(100vh - 56px)' }}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="shell-bottom-nav" style={{
        display: 'none',
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)',
        justifyContent: 'space-around', padding: '8px 0 12px', zIndex: 100,
      }}>
        {mobileNav.map(item => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <button key={item.label} onClick={() => navigate(item.path)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)',
              fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: isActive ? 600 : 400,
            }}>
              <Icon size={20} />
              {item.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
