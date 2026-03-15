import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Bell, Gem } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import ThemeToggle from './ThemeToggle'
import gemsLogoDark from '../../assets/gems-logo.svg'
import gemsLogoLight from '../../assets/gems-logo-light.svg'

export default function NavBar({ variant = 'default', title, user, onBack }) {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const gemsLogo = isDark ? gemsLogoDark : gemsLogoLight

  const handleBack = onBack || (() => navigate('/'))

  if (variant === 'student-y3') {
    return (
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <button
          onClick={handleBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          <ChevronLeft size={22} />
          Back
        </button>

        <span
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: 18,
            color: 'var(--text-primary)',
          }}
        >
          {title}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Gems counter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255, 184, 0, 0.15)',
              color: 'var(--accent-amber)',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            <Gem size={16} />
            {user?.gems || 1240}
          </div>

          <ThemeToggle size="sm" showLabel={true} />

          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <Bell size={20} />
            <span
              style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--accent-red)',
              }}
            />
          </button>
        </div>
      </nav>
    )
  }

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={handleBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
          }}
        >
          <img src={gemsLogo} alt="GEMS" style={{ height: 32 }} />
        </button>
      </div>

      <span
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 600,
          fontSize: 16,
          color: 'var(--text-primary)',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {title}
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${user.color}, ${user.color}99)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: 12,
                color: '#fff',
              }}
            >
              {user.initials}
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: 'var(--text-secondary)',
              }}
            >
              {user.name}
            </span>
          </div>
        )}

        <ThemeToggle size="sm" />

        <button
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <Bell size={20} />
          <span
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--accent-red)',
            }}
          />
        </button>
      </div>
    </nav>
  )
}
