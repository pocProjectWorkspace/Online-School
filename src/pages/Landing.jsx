import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { personas } from '../data/personas'
import ThemeToggle from '../components/common/ThemeToggle'
import gemsLogoDark from '../assets/gems-logo.svg'
import gemsLogoLight from '../assets/gems-logo-light.svg'

const roleBadgeColors = {
  student: 'var(--accent-purple)',
  teacher: 'var(--accent-cyan)',
  parent: 'var(--accent-amber)',
}

function PersonaCard({ persona, index, onClick }) {
  const badgeColor = roleBadgeColors[persona.role]

  return (
    <button
      onClick={onClick}
      className="animate-fade-in-up"
      style={{
        animationDelay: `${index * 100}ms`,
        width: 180,
        height: 220,
        background: 'var(--gradient-card)',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: 16,
        color: 'var(--text-primary)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        position: 'relative',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.05)'
        e.currentTarget.style.boxShadow = `var(--shadow-card), 0 0 20px ${persona.color}40`
        e.currentTarget.style.borderColor = persona.color
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = 'var(--shadow-card)'
        e.currentTarget.style.borderColor = 'var(--border-card)'
      }}
    >
      {/* Avatar circle with initials */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${persona.color}, ${persona.color}99)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Sora', sans-serif",
          fontWeight: 600,
          fontSize: 20,
          color: '#fff',
          boxShadow: `0 0 16px ${persona.color}30`,
        }}
      >
        {persona.initials}
      </div>

      {/* Name */}
      <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, textAlign: 'center', lineHeight: 1.3 }}>
        {persona.name}
      </span>

      {/* Subtitle */}
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.3 }}>
        {persona.grade || persona.subject || `Parent of ${persona.child}`}
      </span>

      {/* School name for students */}
      {persona.school && (
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)', textAlign: 'center' }}>
          {persona.school}
        </span>
      )}

      {/* Role badge */}
      <span
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          padding: '2px 10px',
          borderRadius: 'var(--radius-pill)',
          background: `${persona.color}20`,
          color: badgeColor,
          fontSize: 10,
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          textTransform: 'capitalize',
        }}
      >
        {persona.role}
      </span>
    </button>
  )
}

function Starfield({ isDark }) {
  const count = isDark ? 40 : 20
  const items = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: isDark ? Math.random() * 2 + 1 : Math.random() * 6 + 3,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 3 + 2}s`,
  }))

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {items.map(star => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            backgroundColor: isDark ? '#fff' : 'var(--accent-blue)',
            opacity: isDark ? 0.3 : 0.08,
            animation: isDark
              ? `twinkle ${star.duration} ease-in-out ${star.delay} infinite`
              : `float ${star.duration} ease-in-out ${star.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const { setCurrentUser } = useApp()
  const { isDark } = useTheme()

  const handleSelect = (persona) => {
    setCurrentUser(persona)
    navigate(persona.route)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        position: 'relative',
        background: isDark
          ? 'linear-gradient(135deg, #0B1628 0%, #112040 40%, #1A3A6B 70%, #0B1628 100%)'
          : 'linear-gradient(135deg, #EEF3FB 0%, #D6E4F7 40%, #C8DCF5 70%, #EEF3FB 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
      }}
    >
      <Starfield isDark={isDark} />

      {/* Theme toggle top-right */}
      <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
        <ThemeToggle size="md" />
      </div>

      {/* Logo */}
      <img
        src={isDark ? gemsLogoDark : gemsLogoLight}
        alt="GEMS Global Online School"
        style={{ width: 300, height: 40, marginBottom: 16, position: 'relative', zIndex: 1 }}
      />

      {/* Tagline */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 16,
          color: 'var(--text-secondary)',
          marginBottom: 48,
          letterSpacing: '0.04em',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Personalised. Intelligent. Borderless.
      </p>

      {/* Persona cards grid */}
      <div
        className="landing-cards"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 20,
          maxWidth: 620,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {personas.map((persona, i) => (
          <PersonaCard key={persona.id} persona={persona} index={i} onClick={() => handleSelect(persona)} />
        ))}
      </div>

      {/* CTA text */}
      <p
        className="animate-fade-in-up"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: 'var(--text-muted)',
          marginTop: 40,
          animationDelay: '600ms',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Select your profile to begin &rarr;
      </p>
    </div>
  )
}
