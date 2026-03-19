import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import ThemeToggle from '../components/common/ThemeToggle'
import gemsEducationLogo from '../assets/images.png'
// Hero carousel images — replace these with your actual images in src/assets/
import heroImage1 from '../assets/hero-1.png'
import heroImage2 from '../assets/hero-2.png'
import heroImage3 from '../assets/hero-3.png'

const heroSlides = [
  { src: heroImage1, alt: 'AI-powered personalised learning for every student' },
  { src: heroImage2, alt: 'Real-time intelligence analytics and insights' },
  { src: heroImage3, alt: 'Connected classrooms across the GEMS network' },
]

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 015 5c0 2.76-2.24 5-5 5s-5-2.24-5-5a5 5 0 015-5z"/>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="0.5" fill="var(--accent-purple)"/>
        <path d="M9 12l1.5 1.5L15 9" stroke="var(--accent-green)" strokeWidth="2"/>
      </svg>
    ),
    title: 'AI-Powered Tutoring',
    description: 'Personalised voice-based AI tutors that adapt to each student\'s age, learning style, and curriculum level.',
    color: 'var(--accent-purple)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18"/>
        <path d="M9 21V9"/>
        <circle cx="16" cy="15" r="2" fill="var(--accent-cyan)" opacity="0.3"/>
      </svg>
    ),
    title: 'Intelligence 360',
    description: 'Comprehensive analytics combining CAT4, NGRT, psychometric, and wellbeing data for holistic student profiles.',
    color: 'var(--accent-cyan)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1v4M12 19v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M1 12h4M19 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        <circle cx="12" cy="12" r="4"/>
      </svg>
    ),
    title: 'Adaptive Lessons',
    description: 'AI-generated lesson plans with interactive steps, quizzes, and real-time difficulty adjustment.',
    color: 'var(--accent-green)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: 'Parent Portal',
    description: 'Real-time visibility into academic performance, wellbeing metrics, and actionable insights for parents.',
    color: 'var(--accent-amber)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8"/>
        <path d="M12 17v4"/>
        <path d="M6 8h.01M9 8h.01"/>
        <path d="M6 11h12"/>
      </svg>
    ),
    title: 'Microsoft 365 Integration',
    description: 'Seamlessly connects with Teams, OneDrive, and Outlook for unified classroom collaboration.',
    color: 'var(--accent-blue)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    title: 'Wellbeing Monitoring',
    description: 'Track student emotional and social wellbeing with AI-powered sentiment analysis and early alerts.',
    color: 'var(--accent-red)',
  },
]

const personas = [
  {
    role: 'Students',
    description: 'Voice-guided AI tutors, interactive lessons, gamified learning journeys, and personalised dashboards.',
    color: 'var(--accent-purple)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="1.5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/>
      </svg>
    ),
  },
  {
    role: 'Teachers',
    description: 'AI lesson planning, class intelligence analytics, roster management, and Microsoft 365 tools.',
    color: 'var(--accent-cyan)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 8h5M7 11h8"/>
      </svg>
    ),
  },
  {
    role: 'Parents',
    description: 'Intelligence 360 reports, academic tracking, wellbeing insights, and personalised recommendations.',
    color: 'var(--accent-amber)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-amber)" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
]

const stats = [
  { value: '60+', label: 'Schools Worldwide' },
  { value: '130K+', label: 'Students Enrolled' },
  { value: '12K+', label: 'Educators' },
  { value: '20+', label: 'Countries' },
]

function Starfield({ isDark }) {
  const count = isDark ? 50 : 20
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

export default function MarketingLanding() {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [currentSlide, setCurrentSlide] = useState(0)
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length)
  }, [])

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden' }}>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 40px',
        background: isDark ? 'rgba(11, 22, 40, 0.85)' : 'rgba(240, 244, 250, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src={gemsEducationLogo}
            alt="GEMS Education"
            style={{
              height: 40,
              borderRadius: 6,
              padding: 4,
              background: isDark ? 'rgba(255,255,255,0.95)' : 'transparent',
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <ThemeToggle size="sm" />
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '10px 28px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--gradient-ai)',
              color: '#fff',
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow-blue)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* ─── HERO SECTION — FULL-SCREEN CAROUSEL BACKGROUND ─── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        overflow: 'hidden',
      }}>
        {/* Background carousel images */}
        {heroSlides.map((slide, i) => (
          <img
            key={i}
            src={slide.src}
            alt={slide.alt}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: currentSlide === i ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: 0,
            }}
          />
        ))}

        {/* Dark overlay for text readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(11, 22, 40, 0.7) 0%, rgba(11, 22, 40, 0.55) 40%, rgba(11, 22, 40, 0.75) 100%)',
          zIndex: 1,
        }} />

        {/* Text content on top */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 700 }}>
          <h1
            className="animate-fade-in-up"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 56px)',
              lineHeight: 1.1,
              marginBottom: 12,
              color: '#fff',
            }}
          >
            Global Online School
          </h1>

          <p
            className="animate-fade-in-up"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              color: 'rgba(255, 255, 255, 0.85)',
              marginBottom: 24,
              animationDelay: '100ms',
            }}
          >
            Personalised. Intelligent. Borderless.
          </p>

          <p
            className="animate-fade-in-up"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: 'rgba(255, 255, 255, 0.75)',
              maxWidth: 600,
              margin: '0 auto 40px',
              lineHeight: 1.7,
              animationDelay: '200ms',
            }}
          >
            The next generation of K-12 education — powered by AI tutors, real-time intelligence analytics,
            and seamless Microsoft 365 integration. Designed for students, teachers, and parents across the GEMS network.
          </p>

          <div
            className="animate-fade-in-up"
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', animationDelay: '300ms' }}
          >
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '14px 36px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--gradient-ai)',
                color: '#fff',
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: 16,
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(45, 125, 210, 0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Get Started
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '14px 36px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: 16,
                border: '1px solid rgba(255, 255, 255, 0.25)',
                cursor: 'pointer',
                transition: 'background 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)' }}
            >
              Explore Features
            </button>
          </div>
        </div>

        {/* Carousel dot indicators */}
        <div style={{
          position: 'absolute', bottom: 56, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 10, zIndex: 2,
        }}>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: currentSlide === i ? 28 : 10,
                height: 10,
                borderRadius: 'var(--radius-pill)',
                background: currentSlide === i ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          animation: 'pulse 2s ease-in-out infinite', zIndex: 2,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section style={{
        display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap',
        padding: '48px 24px',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        {stats.map((stat, i) => (
          <div key={i} className="animate-fade-in-up" style={{ textAlign: 'center', animationDelay: `${i * 100}ms` }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: 32,
              color: 'var(--accent-cyan)',
              marginBottom: 4,
            }}>
              {stat.value}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: 'var(--text-secondary)',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* ─── FEATURES GRID ─── */}
      <section id="features" style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(24px, 3vw, 36px)',
          textAlign: 'center',
          marginBottom: 12,
        }}>
          Platform Capabilities
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 16,
          color: 'var(--text-secondary)',
          textAlign: 'center',
          maxWidth: 550,
          margin: '0 auto 48px',
        }}>
          A unified ecosystem connecting every stakeholder in the learning journey.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {features.map((feat, i) => (
            <div
              key={i}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${i * 80}ms`,
                padding: 28,
                background: 'var(--gradient-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-card)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `var(--shadow-card), 0 0 20px ${feat.color}25`
                e.currentTarget.style.borderColor = feat.color
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'var(--shadow-card)'
                e.currentTarget.style.borderColor = 'var(--border-card)'
              }}
            >
              <div style={{ marginBottom: 16 }}>{feat.icon}</div>
              <h3 style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: 18,
                marginBottom: 8,
              }}>
                {feat.title}
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}>
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PERSONAS SECTION ─── */}
      <section style={{
        padding: '80px 24px',
        background: 'var(--bg-secondary)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(24px, 3vw, 36px)',
            textAlign: 'center',
            marginBottom: 12,
          }}>
            Built for Everyone
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: 'var(--text-secondary)',
            textAlign: 'center',
            maxWidth: 500,
            margin: '0 auto 48px',
          }}>
            Tailored experiences for every role in the learning journey.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {personas.map((p, i) => (
              <div
                key={i}
                className="animate-fade-in-up"
                style={{
                  animationDelay: `${i * 120}ms`,
                  padding: 32,
                  background: 'var(--gradient-card)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-card)',
                  textAlign: 'center',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `var(--shadow-card), 0 0 24px ${p.color}30`
                  e.currentTarget.style.borderColor = p.color
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)'
                  e.currentTarget.style.borderColor = 'var(--border-card)'
                }}
              >
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: `${p.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  {p.icon}
                </div>
                <h3 style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 600,
                  fontSize: 20,
                  marginBottom: 12,
                  color: p.color,
                }}>
                  {p.role}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section style={{
        position: 'relative',
        padding: '80px 24px',
        textAlign: 'center',
        background: isDark
          ? 'linear-gradient(135deg, #112040 0%, #1A3A6B 50%, #112040 100%)'
          : 'linear-gradient(135deg, #D6E4F7 0%, #C8DCF5 50%, #D6E4F7 100%)',
      }}>
        <h2 style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(24px, 3vw, 36px)',
          marginBottom: 16,
        }}>
          Ready to Transform Learning?
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 16,
          color: 'var(--text-secondary)',
          maxWidth: 500,
          margin: '0 auto 32px',
        }}>
          Join the GEMS network and experience the future of personalised education.
        </p>
        <button
          onClick={() => navigate('/login')}
          style={{
            padding: '16px 48px',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--gradient-ai)',
            color: '#fff',
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: 18,
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(45, 125, 210, 0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          Sign In Now
        </button>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        padding: '32px 24px',
        textAlign: 'center',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-primary)',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: 'var(--text-muted)',
        }}>
          &copy; 2026 GEMS Education. All rights reserved. &nbsp;|&nbsp; GEMS Global Online School — Demo Portal
        </p>
      </footer>
    </div>
  )
}
