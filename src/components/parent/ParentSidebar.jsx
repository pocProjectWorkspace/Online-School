import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home, Calendar, CheckSquare, BookOpen, Brain, User, MessageCircle,
  Smile, UtensilsCrossed, CreditCard, Megaphone, ClipboardList, Target,
  ChevronLeft, ChevronRight
} from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Overview', path: '/parent', badge: null },
  { icon: Calendar, label: 'Timetable', path: '/parent', badge: null },
  { icon: CheckSquare, label: 'Attendance', path: '/parent', badge: { text: '80%', bg: 'rgba(255,184,0,0.15)', color: 'var(--accent-amber)' } },
  { icon: BookOpen, label: 'Academics', path: '/parent', badge: null },
  { icon: Brain, label: 'Intelligence360', path: '/parent/intelligence360', badge: { text: 'AI', bg: 'rgba(123,92,240,0.2)', color: 'var(--accent-purple)', glow: true } },
  { icon: User, label: 'Student Profile', path: '/parent/holistic-profile', badge: { text: 'NEW', bg: 'rgba(0,212,255,0.15)', color: 'var(--accent-cyan)', pulse: true } },
  { icon: MessageCircle, label: 'Parent 360', path: '/parent/parent360-survey', badge: { dot: true } },
  { icon: Smile, label: 'Reflection', path: '/parent', badge: null },
  { icon: UtensilsCrossed, label: 'Catering', path: '/parent', badge: null },
  { icon: CreditCard, label: 'Fees', path: '/parent', badge: { text: '1 Pending', bg: 'rgba(255,71,87,0.15)', color: 'var(--accent-red)' } },
  { icon: Megaphone, label: 'Communications', path: '/parent', badge: { text: '2', bg: 'rgba(45,125,210,0.15)', color: 'var(--accent-blue)' } },
  { icon: ClipboardList, label: 'Tasks', path: '/parent', badge: null },
  { icon: Target, label: 'Activities', path: '/parent', badge: null },
]

export default function ParentSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('gems-sidebar-collapsed') === 'true')

  useEffect(() => {
    localStorage.setItem('gems-sidebar-collapsed', collapsed)
  }, [collapsed])

  const width = collapsed ? 72 : 260

  return (
    <aside
      style={{
        width,
        minWidth: width,
        height: 'calc(100vh - 56px)',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 280ms ease, min-width 280ms ease',
        overflow: 'hidden',
        position: 'sticky',
        top: 56,
      }}
    >
      {/* Child Profile Block */}
      <div style={{ padding: collapsed ? '16px 12px' : '20px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14, color: '#fff',
          }}>RS</div>
          {!collapsed && (
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', opacity: collapsed ? 0 : 1, transition: 'opacity 200ms ease' }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>Rayan Sharma</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>Year 9 · Section B</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>GEMS Wellington</div>
              <span style={{
                display: 'inline-block', marginTop: 4, padding: '1px 8px', borderRadius: 'var(--radius-pill)',
                background: 'rgba(0,229,160,0.12)', color: 'var(--accent-green)',
                fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600,
              }}>Transcript Available</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: collapsed ? '10px 0' : '10px 16px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: isActive ? 'rgba(45,125,210,0.08)' : 'transparent',
                border: 'none',
                borderLeft: isActive ? '3px solid var(--accent-blue)' : '3px solid transparent',
                cursor: 'pointer',
                color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                transition: 'all 180ms ease',
                position: 'relative',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  const icon = e.currentTarget.querySelector('.sidebar-icon')
                  if (icon) icon.style.transform = 'translateX(4px)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  const icon = e.currentTarget.querySelector('.sidebar-icon')
                  if (icon) icon.style.transform = 'translateX(0)'
                }
              }}
            >
              <span className="sidebar-icon" style={{ transition: 'transform 180ms ease', display: 'flex', flexShrink: 0 }}>
                <Icon size={18} />
              </span>
              {!collapsed && (
                <>
                  <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
                  {item.badge && !item.badge.dot && (
                    <span style={{
                      padding: '1px 8px', borderRadius: 'var(--radius-pill)',
                      background: item.badge.bg, color: item.badge.color,
                      fontSize: 10, fontWeight: 600, whiteSpace: 'nowrap',
                      boxShadow: item.badge.glow ? `0 0 8px ${item.badge.color}` : undefined,
                      animation: item.badge.pulse ? 'pulse 2s ease-in-out infinite' : undefined,
                    }}>
                      {item.badge.text}
                    </span>
                  )}
                  {item.badge?.dot && (
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: 'var(--accent-green)',
                      animation: 'pulse 2s ease-in-out infinite',
                    }} />
                  )}
                </>
              )}
            </button>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <div style={{ padding: 12, borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end' }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)', cursor: 'pointer', padding: '6px 8px',
            color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  )
}
