import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { personas } from '../data/personas'
import ThemeToggle from '../components/common/ThemeToggle'
import gemsEducationLogo from '../assets/images.png'

const tabs = [
  { key: 'student', label: 'Student', color: 'var(--accent-purple)' },
  { key: 'teacher', label: 'Teacher', color: 'var(--accent-cyan)' },
  { key: 'parent', label: 'Parent', color: 'var(--accent-amber)' },
]

const MicrosoftLogo = () => (
  <svg width="20" height="20" viewBox="0 0 21 21" fill="none">
    <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
    <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
    <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
    <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
  </svg>
)

function StudentLogin() {
  const navigate = useNavigate()
  const { setCurrentUser } = useApp()
  const students = personas.filter(p => p.role === 'student')

  const handleMicrosoftLogin = (student) => {
    setCurrentUser(student)
    navigate(student.route)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        color: 'var(--text-secondary)',
        textAlign: 'center',
        marginBottom: 8,
      }}>
        Sign in with your school Microsoft 365 account
      </p>

      {students.map(student => (
        <button
          key={student.id}
          onClick={() => handleMicrosoftLogin(student)}
          style={{
            width: '100%',
            maxWidth: 360,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '14px 20px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = student.color
            e.currentTarget.style.boxShadow = `0 0 16px ${student.color}25`
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-card)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: `linear-gradient(135deg, ${student.color}, ${student.color}88)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff',
            flexShrink: 0,
          }}>
            {student.initials}
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14 }}>
              {student.name}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>
              {student.grade} — {student.school}
            </div>
          </div>
          <MicrosoftLogo />
        </button>
      ))}

      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, width: '100%', maxWidth: 360,
        margin: '4px 0',
      }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
      </div>

      <button
        style={{
          width: '100%',
          maxWidth: 360,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          padding: '14px 20px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          color: 'var(--text-primary)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          fontWeight: 500,
          transition: 'border-color 0.2s ease, background 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-blue)'; e.currentTarget.style.background = 'var(--bg-card-hover)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-card)'; e.currentTarget.style.background = 'var(--bg-card)' }}
        onClick={() => {
          const aisha = personas.find(p => p.id === 'aisha')
          setCurrentUser(aisha)
          navigate(aisha.route)
        }}
      >
        <MicrosoftLogo />
        Sign in with Microsoft
      </button>
    </div>
  )
}

function TeacherLogin() {
  const navigate = useNavigate()
  const { setCurrentUser } = useApp()
  const teachers = personas.filter(p => p.role === 'teacher')

  const handleMicrosoftLogin = (teacher) => {
    setCurrentUser(teacher)
    navigate(teacher.route)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        color: 'var(--text-secondary)',
        textAlign: 'center',
        marginBottom: 8,
      }}>
        Sign in with your GEMS staff Microsoft 365 account
      </p>

      {teachers.map(teacher => (
        <button
          key={teacher.id}
          onClick={() => handleMicrosoftLogin(teacher)}
          style={{
            width: '100%',
            maxWidth: 360,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '14px 20px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = teacher.color
            e.currentTarget.style.boxShadow = `0 0 16px ${teacher.color}25`
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-card)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: `linear-gradient(135deg, ${teacher.color}, ${teacher.color}88)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff',
            flexShrink: 0,
          }}>
            {teacher.initials}
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14 }}>
              {teacher.name}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>
              {teacher.subject}
            </div>
          </div>
          <MicrosoftLogo />
        </button>
      ))}

      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, width: '100%', maxWidth: 360,
        margin: '4px 0',
      }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
      </div>

      <button
        style={{
          width: '100%',
          maxWidth: 360,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          padding: '14px 20px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          color: 'var(--text-primary)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          fontWeight: 500,
          transition: 'border-color 0.2s ease, background 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.background = 'var(--bg-card-hover)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-card)'; e.currentTarget.style.background = 'var(--bg-card)' }}
        onClick={() => {
          const sarah = personas.find(p => p.id === 'sarah')
          setCurrentUser(sarah)
          navigate(sarah.route)
        }}
      >
        <MicrosoftLogo />
        Sign in with Microsoft
      </button>
    </div>
  )
}

function ParentLogin() {
  const navigate = useNavigate()
  const { setCurrentUser } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    // Dummy validation — accept any non-empty input
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }
    const priya = personas.find(p => p.id === 'priya')
    setCurrentUser(priya)
    navigate(priya.route)
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        color: 'var(--text-secondary)',
        textAlign: 'center',
        marginBottom: 8,
      }}>
        Sign in with your GEMS parent account
      </p>

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{
            display: 'block',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--text-secondary)',
            marginBottom: 6,
          }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="parent@example.com"
            style={inputStyle}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-amber)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 184, 0, 0.15)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-card)'; e.currentTarget.style.boxShadow = 'none' }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--text-secondary)',
            marginBottom: 6,
          }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={inputStyle}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-amber)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 184, 0, 0.15)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-card)'; e.currentTarget.style.boxShadow = 'none' }}
          />
        </div>

        {error && (
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: 'var(--accent-red)',
            margin: 0,
          }}>
            {error}
          </p>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)',
            cursor: 'pointer',
          }}>
            <input type="checkbox" style={{ accentColor: 'var(--accent-amber)' }} />
            Remember me
          </label>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            color: 'var(--accent-amber)', cursor: 'pointer',
          }}>
            Forgot password?
          </span>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--accent-amber), #E5A600)',
            color: '#0B1628',
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 184, 0, 0.3)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          Sign In
        </button>
      </form>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        color: 'var(--text-muted)',
        textAlign: 'center',
        marginTop: 4,
      }}>
        Demo: Use any email and password to sign in
      </p>
    </div>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState('student')

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      position: 'relative',
      background: isDark
        ? 'linear-gradient(135deg, #0B1628 0%, #112040 40%, #1A3A6B 70%, #0B1628 100%)'
        : 'linear-gradient(135deg, #EEF3FB 0%, #D6E4F7 40%, #C8DCF5 70%, #EEF3FB 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
    }}>
      {/* Theme toggle */}
      <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
        <ThemeToggle size="sm" />
      </div>

      {/* Back to landing */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', top: 24, left: 24, zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-secondary)',
          fontFamily: "'DM Sans', sans-serif", fontSize: 14,
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>

      {/* Login card */}
      <div style={{
        width: '100%',
        maxWidth: 440,
        background: 'var(--gradient-card)',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-card)',
        padding: '40px 32px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <img
            src={gemsEducationLogo}
            alt="GEMS Education"
            style={{
              height: 48,
              borderRadius: 6,
              padding: 6,
              background: isDark ? 'rgba(255,255,255,0.95)' : 'transparent',
            }}
          />
        </div>

        <h1 style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 700,
          fontSize: 22,
          textAlign: 'center',
          marginBottom: 4,
        }}>
          Global Online School
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: 'var(--text-muted)',
          textAlign: 'center',
          marginBottom: 28,
        }}>
          Sign in to your learning portal
        </p>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: 0,
          marginBottom: 28,
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: 4,
        }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Sora', sans-serif",
                fontWeight: activeTab === tab.key ? 600 : 400,
                fontSize: 13,
                color: activeTab === tab.key ? '#fff' : 'var(--text-muted)',
                background: activeTab === tab.key
                  ? `linear-gradient(135deg, ${tab.color}, ${tab.color}CC)`
                  : 'transparent',
                transition: 'all 0.25s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Login content */}
        {activeTab === 'student' && <StudentLogin />}
        {activeTab === 'teacher' && <TeacherLogin />}
        {activeTab === 'parent' && <ParentLogin />}
      </div>

      {/* Footer text */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        color: 'var(--text-muted)',
        marginTop: 24,
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        &copy; 2026 GEMS Education &nbsp;|&nbsp; Privacy Policy &nbsp;|&nbsp; Terms of Use
      </p>
    </div>
  )
}
