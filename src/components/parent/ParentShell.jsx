import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Bell, Home, BarChart3, MessageCircle, User } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useTheme } from '../../context/ThemeContext'
import ThemeToggle from '../common/ThemeToggle'
import ParentSidebar from './ParentSidebar'
import gemsLogoDark from '../../assets/gems-logo.svg'
import gemsLogoLight from '../../assets/gems-logo-light.svg'

const mobileNav = [
  { icon: Home, label: 'Home', path: '/parent' },
  { icon: BarChart3, label: 'Intelligence', path: '/parent/intelligence360' },
  { icon: User, label: 'Profile', path: '/parent/holistic-profile' },
  { icon: MessageCircle, label: 'Parent 360', path: '/parent/parent360-survey' },
]

export default function ParentShell() {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useApp()
  const { isDark } = useTheme()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Nav */}
      <header style={{
        height: 56,
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={isDark ? gemsLogoDark : gemsLogoLight} alt="GEMS" style={{ height: 28 }} />
          <span className="portal-label" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)', borderLeft: '1px solid var(--border-subtle)', paddingLeft: 12 }}>
            Parent Portal
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ThemeToggle size="sm" />
          <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }}>
            <Bell size={19} />
            <span style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-red)' }} />
          </button>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-amber), #D9920A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 11, color: '#fff',
          }}>
            {currentUser?.initials || 'PS'}
          </div>
        </div>
      </header>

      {/* Body: Sidebar + Main Canvas */}
      <div style={{ display: 'flex', flex: 1 }}>
        <div className="shell-sidebar">
          <ParentSidebar />
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
