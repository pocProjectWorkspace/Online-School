import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, ClipboardCheck, BookOpen, MessageSquare, Bell, Brain,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useTheme } from '../../context/ThemeContext'
import ThemeToggle from '../common/ThemeToggle'
import { mockGraphMe } from '../../data/mockGraph'
import gemsLogoDark from '../../assets/gems-logo.svg'
import gemsLogoLight from '../../assets/gems-logo-light.svg'

const sidebarNav = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/teacher' },
  { icon: Users, label: 'My Classes', path: '/teacher/roster/class-y3j' },
  { icon: Brain, label: 'Class Intelligence', path: '/teacher/intelligence', badge: 'AI', badgeBg: 'rgba(123,92,240,0.2)', badgeColor: 'var(--accent-purple)' },
  { icon: ClipboardCheck, label: 'Assignments', path: '/teacher' },
  { icon: BookOpen, label: 'Lesson Library', path: '/teacher/lesson/new' },
  { icon: MessageSquare, label: 'Messages', path: '/teacher', badge: '2' },
]

const mobileNav = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/teacher' },
  { icon: Users, label: 'Classes', path: '/teacher/roster/class-y3j' },
  { icon: Brain, label: 'Intelligence', path: '/teacher/intelligence' },
  { icon: BookOpen, label: 'Lessons', path: '/teacher/lesson/new' },
]

function TeacherSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActivePath = (navPath) => {
    if (navPath === '/teacher' && location.pathname === '/teacher') return true
    if (navPath.startsWith('/teacher/roster') && location.pathname.startsWith('/teacher/roster')) return true
    if (navPath.startsWith('/teacher/intelligence') && location.pathname.startsWith('/teacher/intelligence')) return true
    if (navPath.startsWith('/teacher/lesson') && location.pathname.startsWith('/teacher/lesson')) return true
    return false
  }

  return (
    <aside style={{
      width: 240, minWidth: 240, height: 'calc(100vh - 56px)',
      background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-subtle)',
      display: 'flex', flexDirection: 'column', position: 'sticky', top: 56,
    }}>
      {/* Profile */}
      <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff',
          }}>SM</div>
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{mockGraphMe.displayName}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{mockGraphMe.jobTitle}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>{mockGraphMe.officeLocation}</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '8px 0' }}>
        {sidebarNav.map(item => {
          const Icon = item.icon
          const isActive = isActivePath(item.path)
          return (
            <button key={item.label} onClick={() => navigate(item.path)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
              background: isActive ? 'rgba(45,125,210,0.08)' : 'transparent', border: 'none',
              borderLeft: isActive ? '3px solid var(--accent-blue)' : '3px solid transparent',
              cursor: 'pointer', color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: isActive ? 600 : 400,
              transition: 'all 180ms ease',
            }}>
              <Icon size={18} />
              <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
              {item.badge && (
                <span style={{ padding: '1px 8px', borderRadius: 'var(--radius-pill)', background: item.badgeBg || 'rgba(45,125,210,0.15)', color: item.badgeColor || 'var(--accent-blue)', fontSize: 10, fontWeight: 600 }}>{item.badge}</span>
              )}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default function TeacherShell() {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useApp()
  const { isDark } = useTheme()

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
            <img src={isDark ? gemsLogoDark : gemsLogoLight} alt="GEMS" style={{ height: 28 }} />
          </button>
          <span className="portal-label" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)', borderLeft: '1px solid var(--border-subtle)', paddingLeft: 12 }}>Teacher Portal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ThemeToggle size="sm" />
          <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }}>
            <Bell size={19} />
            <span style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-red)' }} />
          </button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 11, color: '#fff' }}>
            {currentUser?.initials || 'SM'}
          </div>
        </div>
      </header>

      {/* Body: Sidebar + Main */}
      <div style={{ display: 'flex', flex: 1 }}>
        <div className="shell-sidebar">
          <TeacherSidebar />
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
          const isActive = location.pathname === item.path ||
            (item.path.includes('roster') && location.pathname.includes('roster')) ||
            (item.path.includes('lesson') && location.pathname.includes('lesson'))
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
