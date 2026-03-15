import { useNavigate } from 'react-router-dom'
import {
  Mic, Check, AlertTriangle, Clock, TrendingDown, Volume2,
  ChevronLeft, Zap, Activity, BarChart2, MessageSquare,
} from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import GradientBar from '../../components/common/GradientBar'
import { speakerCoachData } from '../../data/microsoft365'

const tips = [
  {
    icon: MessageSquare,
    title: 'Pause Instead of Filler Words',
    body: 'When you feel the urge to say "um" or "like", take a deliberate pause. Silence gives your audience time to absorb what you just said and makes you sound more confident.',
    color: 'var(--accent-purple)',
  },
  {
    icon: Activity,
    title: 'Vary Your Pitch to Emphasise Key Points',
    body: 'Monotone delivery makes it hard for listeners to know what matters. Raise your pitch slightly when introducing a key idea, and lower it to signal a conclusion.',
    color: 'var(--accent-blue)',
  },
  {
    icon: Volume2,
    title: 'Make Eye Contact with Your Audience',
    body: 'Scan the room in a Z-pattern — left to right across the front, then diagonally to the back. Hold each gaze for 2–3 seconds before moving on.',
    color: 'var(--accent-cyan)',
  },
]

export default function Y9SpeakerCoach() {
  const navigate = useNavigate()
  const { sessionsCompleted, avgPace, fillerWordReduction, recentSession } = speakerCoachData

  const statStrip = [
    {
      icon: Mic,
      label: 'Sessions Completed',
      value: sessionsCompleted,
      unit: '',
      color: 'var(--accent-purple)',
    },
    {
      icon: Activity,
      label: 'Avg Pace Rating',
      value: avgPace,
      unit: '',
      color: 'var(--accent-green)',
    },
    {
      icon: TrendingDown,
      label: 'Filler Word Reduction',
      value: `${fillerWordReduction}%`,
      unit: '',
      color: 'var(--accent-cyan)',
    },
    {
      icon: BarChart2,
      label: 'Ideal Pace Range',
      value: '120–150',
      unit: 'wpm',
      color: 'var(--accent-blue)',
    },
  ]

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 900, margin: '0 auto' }}>

      {/* Back nav */}
      <button
        onClick={() => navigate('/student/y9/microsoft365')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          marginBottom: 20,
          padding: 0,
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        <ChevronLeft size={16} />
        Back to Microsoft 365
      </button>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(123, 92, 240, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Mic size={18} color="var(--accent-purple)" />
            </div>
            <h1
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: 22,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              Speaker Coach
            </h1>
            <span
              style={{
                padding: '2px 10px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(123, 92, 240, 0.15)',
                color: 'var(--accent-purple)',
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.04em',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Zap size={10} />
              AI
            </span>
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: 'var(--text-muted)',
              margin: 0,
            }}
          >
            Practise presentations and get real-time feedback on your delivery
          </p>
        </div>
      </div>

      {/* ── Stats Strip ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          marginBottom: 24,
        }}
      >
        {statStrip.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i} padding="md">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Icon size={14} color={stat.color} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {stat.label}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 500,
                    fontSize: 22,
                    color: stat.color,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                {stat.unit && (
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      color: 'var(--text-muted)',
                    }}
                  >
                    {stat.unit}
                  </span>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {/* ── Most Recent Session ── */}
      <h2
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 600,
          fontSize: 16,
          marginBottom: 12,
          color: 'var(--text-primary)',
        }}
      >
        Most Recent Session
      </h2>
      <Card glow="purple" padding="lg" style={{ marginBottom: 24 }}>
        {/* Topic + duration row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: 16,
                color: 'var(--text-primary)',
                display: 'block',
                marginBottom: 4,
              }}
            >
              {recentSession.topic}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={13} color="var(--text-muted)" />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: 'var(--text-muted)',
                }}
              >
                {recentSession.duration}
              </span>
            </div>
          </div>
          <Badge variant="secure" label="Completed" />
        </div>

        {/* Metrics grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {/* Pace */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: 'var(--text-muted)',
                }}
              >
                Pace
              </span>
              <Badge variant="secure" label={recentSession.paceRating} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                  fontSize: 26,
                  color: 'var(--accent-green)',
                }}
              >
                {recentSession.pace}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: 'var(--text-muted)',
                }}
              >
                wpm
              </span>
            </div>
            <GradientBar
              value={recentSession.pace}
              max={200}
              gradient="green-cyan"
              showValue={false}
              height={6}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                color: 'var(--text-muted)',
                display: 'block',
                marginTop: 4,
              }}
            >
              Target: 120–150 wpm
            </span>
          </div>

          {/* Filler Words */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: 10,
              }}
            >
              Filler Words
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                  fontSize: 26,
                  color: 'var(--accent-amber)',
                }}
              >
                {recentSession.fillerWords}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: 'var(--text-muted)',
                }}
              >
                detected
              </span>
            </div>
            <GradientBar
              value={recentSession.fillerWords}
              max={20}
              gradient="amber-red"
              showValue={false}
              height={6}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                color: 'var(--text-muted)',
                display: 'block',
                marginTop: 4,
              }}
            >
              Down {fillerWordReduction}% from baseline
            </span>
          </div>

          {/* Monotone */}
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: 10,
              }}
            >
              Monotone
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                  fontSize: 26,
                  color: 'var(--accent-blue)',
                }}
              >
                {recentSession.monotone}
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: 'var(--text-muted)',
                    marginLeft: 2,
                  }}
                >
                  %
                </span>
              </span>
            </div>
            <GradientBar
              value={recentSession.monotone}
              max={100}
              gradient="purple-blue"
              showValue={false}
              height={6}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                color: 'var(--text-muted)',
                display: 'block',
                marginTop: 4,
              }}
            >
              of delivery time
            </span>
          </div>
        </div>
      </Card>

      {/* ── AI Feedback ── */}
      <h2
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 600,
          fontSize: 16,
          marginBottom: 12,
          color: 'var(--text-primary)',
        }}
      >
        AI Feedback
      </h2>
      <Card padding="md" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {recentSession.feedback.map((item, i) => {
            const isPositive = item.type === 'positive'
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: isPositive
                    ? 'rgba(0, 229, 160, 0.06)'
                    : 'rgba(255, 184, 0, 0.06)',
                  border: `1px solid ${isPositive ? 'rgba(0, 229, 160, 0.15)' : 'rgba(255, 184, 0, 0.15)'}`,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 'var(--radius-sm)',
                    background: isPositive
                      ? 'rgba(0, 229, 160, 0.15)'
                      : 'rgba(255, 184, 0, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {isPositive ? (
                    <Check size={14} color="var(--accent-green)" />
                  ) : (
                    <AlertTriangle size={14} color="var(--accent-amber)" />
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                  }}
                >
                  {item.text}
                </span>
              </div>
            )
          })}
        </div>
      </Card>

      {/* ── Tips ── */}
      <h2
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 600,
          fontSize: 16,
          marginBottom: 12,
          color: 'var(--text-primary)',
        }}
      >
        Speaking Tips
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
          marginBottom: 28,
        }}
      >
        {tips.map((tip, i) => {
          const Icon = tip.icon
          return (
            <Card key={i} padding="md">
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-md)',
                  background: `color-mix(in srgb, ${tip.color} 15%, transparent)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}
              >
                <Icon size={18} color={tip.color} />
              </div>
              <span
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: 'var(--text-primary)',
                  display: 'block',
                  marginBottom: 8,
                  lineHeight: 1.35,
                }}
              >
                {tip.title}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: 'var(--text-muted)',
                  lineHeight: 1.55,
                }}
              >
                {tip.body}
              </span>
            </Card>
          )
        })}
      </div>

      {/* ── Practice CTA ── */}
      <button
        style={{
          width: '100%',
          padding: '14px 24px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--gradient-ai)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          fontFamily: "'Sora', sans-serif",
          fontWeight: 600,
          fontSize: 15,
          color: 'var(--text-primary)',
          letterSpacing: '0.01em',
          boxShadow: 'var(--shadow-glow-purple)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.opacity = '0.9'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.opacity = '1'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <Mic size={18} />
        Practice New Presentation
      </button>
    </div>
  )
}
