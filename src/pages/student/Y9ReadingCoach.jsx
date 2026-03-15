import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { BookOpen, Clock, Zap, Target, Flame, Play, Volume2 } from 'lucide-react'
import Card from '../../components/common/Card'
import GradientBar from '../../components/common/GradientBar'
import Badge from '../../components/common/Badge'
import { readingCoachData } from '../../data/microsoft365'

/* ─── Custom Recharts tooltip ─────────────────────────────── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div
      style={{
        background: 'var(--tooltip-bg)',
        border: '1px solid var(--tooltip-border)',
        borderRadius: 'var(--radius-md)',
        padding: '10px 14px',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: 'var(--text-muted)',
          marginBottom: 6,
        }}
      >
        {label}
      </p>
      {payload.map((entry, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: entry.color,
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: 'var(--text-primary)',
              fontWeight: 500,
            }}
          >
            {entry.value}
            {entry.name === 'wpm' ? ' wpm' : '%'}
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>
            {entry.name === 'wpm' ? 'fluency' : 'accuracy'}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ─── Stat strip item ─────────────────────────────────────── */
function StatItem({ icon: Icon, value, label, color }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 20px',
        borderRight: '1px solid var(--border-subtle)',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 'var(--radius-md)',
          background: `color-mix(in srgb, ${color} 15%, transparent)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={16} color={color} />
      </div>
      <div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            fontWeight: 500,
            color,
            display: 'block',
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            color: 'var(--text-muted)',
            marginTop: 2,
            display: 'block',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

/* ─── Main page ───────────────────────────────────────────── */
export default function Y9ReadingCoach() {
  const [practicingWord, setPracticingWord] = useState(null)

  const { totalSessions, avgFluency, avgAccuracy, streak, recentSessions, challengeWords, progress } =
    readingCoachData

  const handleStartSession = () => {
    /* no-op for demo — button is present for stakeholder showcase */
  }

  const handlePracticeWord = (word) => {
    setPracticingWord(word)
    setTimeout(() => setPracticingWord(null), 1500)
  }

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>

      {/* ── Section 1: Header ──────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(45, 125, 210, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BookOpen size={20} color="var(--accent-blue)" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h1
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 700,
                      fontSize: 22,
                      color: 'var(--text-primary)',
                    }}
                  >
                    Reading Coach
                  </h1>
                  <Badge variant="excelling" label="AI" />
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: 'var(--text-muted)',
                    marginTop: 2,
                  }}
                >
                  Microsoft Reading Coach — personalised fluency and accuracy training
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <Card padding="sm" glow="blue" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'stretch',
            }}
          >
            <StatItem
              icon={BookOpen}
              value={totalSessions}
              label="Sessions completed"
              color="var(--accent-blue)"
            />
            <StatItem
              icon={Zap}
              value={`${avgFluency}`}
              label="Avg words per min"
              color="var(--accent-cyan)"
            />
            <StatItem
              icon={Target}
              value={`${avgAccuracy}%`}
              label="Avg accuracy"
              color="var(--accent-green)"
            />
            <StatItem
              icon={Flame}
              value={`${streak}-day`}
              label="Practice streak"
              color="var(--accent-amber)"
            />
          </div>
        </Card>
      </div>

      {/* ── Section 2: Progress chart ──────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Zap size={16} color="var(--accent-cyan)" />
          Progress Over 6 Weeks
        </h2>
        <Card padding="md">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              marginBottom: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  width: 12,
                  height: 3,
                  borderRadius: 2,
                  background: 'var(--accent-cyan)',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                }}
              >
                Words per minute
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  width: 12,
                  height: 3,
                  borderRadius: 2,
                  background: 'var(--accent-green)',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                }}
              >
                Accuracy %
              </span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={progress}
              margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="var(--chart-grid)"
                vertical={false}
              />
              <XAxis
                dataKey="week"
                tick={{
                  fill: 'var(--chart-axis)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="wpm"
                orientation="left"
                domain={[110, 160]}
                tick={{
                  fill: 'var(--chart-axis)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
                width={36}
              />
              <YAxis
                yAxisId="acc"
                orientation="right"
                domain={[80, 100]}
                tick={{
                  fill: 'var(--chart-axis)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
                width={36}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                yAxisId="wpm"
                type="monotone"
                dataKey="wpm"
                stroke="var(--accent-cyan)"
                strokeWidth={2.5}
                dot={{ fill: 'var(--accent-cyan)', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: 'var(--accent-cyan)' }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-out"
              />
              <Line
                yAxisId="acc"
                type="monotone"
                dataKey="accuracy"
                stroke="var(--accent-green)"
                strokeWidth={2.5}
                dot={{ fill: 'var(--accent-green)', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: 'var(--accent-green)' }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* ── Section 3: Recent Sessions ─────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Clock size={16} color="var(--accent-blue)" />
          Recent Sessions
        </h2>

        <div
          className="responsive-grid-3"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}
        >
          {recentSessions.map((session, i) => (
            <Card key={i} padding="md" glow={i === 0 ? 'blue' : undefined}>
              {/* Session header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      color: 'var(--text-primary)',
                      display: 'block',
                      marginBottom: 3,
                    }}
                  >
                    {session.passage}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      color: 'var(--text-muted)',
                    }}
                  >
                    {session.date}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'rgba(90,115,153,0.15)',
                  }}
                >
                  <Clock size={10} color="var(--text-muted)" />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: 'var(--text-muted)',
                    }}
                  >
                    {session.duration}
                  </span>
                </div>
              </div>

              {/* WPM + Accuracy metrics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    background: 'rgba(0, 212, 255, 0.07)',
                    borderRadius: 'var(--radius-md)',
                    padding: '8px 10px',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 20,
                      fontWeight: 500,
                      color: 'var(--accent-cyan)',
                      display: 'block',
                      lineHeight: 1.1,
                    }}
                  >
                    {session.wpm}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 10,
                      color: 'var(--text-muted)',
                      marginTop: 2,
                      display: 'block',
                    }}
                  >
                    wpm
                  </span>
                </div>
                <div
                  style={{
                    background: 'rgba(0, 229, 160, 0.07)',
                    borderRadius: 'var(--radius-md)',
                    padding: '8px 10px',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 20,
                      fontWeight: 500,
                      color: 'var(--accent-green)',
                      display: 'block',
                      lineHeight: 1.1,
                    }}
                  >
                    {session.accuracy}%
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 10,
                      color: 'var(--text-muted)',
                      marginTop: 2,
                      display: 'block',
                    }}
                  >
                    accuracy
                  </span>
                </div>
              </div>

              {/* Progress bars */}
              <div style={{ marginBottom: 12 }}>
                <GradientBar
                  value={session.wpm}
                  max={160}
                  gradient="blue-cyan"
                  label="Fluency"
                  height={5}
                  showValue={false}
                />
                <div style={{ marginTop: 8 }}>
                  <GradientBar
                    value={session.accuracy}
                    max={100}
                    gradient="green-cyan"
                    label="Accuracy"
                    height={5}
                    showValue={false}
                  />
                </div>
              </div>

              {/* Mispronounced words */}
              <div>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  Mispronounced
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {session.mispronounced.map((word, j) => (
                    <span
                      key={j}
                      style={{
                        padding: '2px 10px',
                        borderRadius: 'var(--radius-pill)',
                        background: 'rgba(255, 71, 87, 0.12)',
                        border: '1px solid rgba(255, 71, 87, 0.25)',
                        color: 'var(--accent-red)',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        fontWeight: 500,
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Section 4: Challenge Words ─────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Volume2 size={16} color="var(--accent-purple)" />
          Challenge Words
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: 'var(--text-muted)',
            marginBottom: 14,
          }}
        >
          Words flagged across your recent sessions that need extra practice.
        </p>

        <div
          className="responsive-grid-3"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}
        >
          {challengeWords.map((word, i) => (
            <Card
              key={i}
              padding="md"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                transition: 'box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 15,
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: 4,
                  }}
                >
                  {word}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: 'var(--text-muted)',
                  }}
                >
                  {word.length > 10 ? 'Complex word' : 'Multi-syllable'}
                </span>
              </div>
              <button
                onClick={() => handlePracticeWord(word)}
                style={{
                  flexShrink: 0,
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  background:
                    practicingWord === word
                      ? 'rgba(0, 229, 160, 0.15)'
                      : 'rgba(123, 92, 240, 0.15)',
                  border: `1px solid ${practicingWord === word ? 'var(--accent-green)' : 'rgba(123, 92, 240, 0.35)'}`,
                  color:
                    practicingWord === word ? 'var(--accent-green)' : 'var(--accent-purple)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  transition: 'all 0.2s ease',
                }}
              >
                {practicingWord === word ? (
                  <>
                    <Volume2 size={11} />
                    Playing
                  </>
                ) : (
                  <>
                    <Play size={11} />
                    Practice
                  </>
                )}
              </button>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Section 5: Start New Session button ────────────── */}
      <button
        onClick={handleStartSession}
        style={{
          width: '100%',
          padding: '16px 24px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--gradient-ai)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          boxShadow: 'var(--shadow-glow-blue)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
      >
        <BookOpen size={20} color="#ffffff" />
        <span
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: '#ffffff',
            letterSpacing: '0.01em',
          }}
        >
          Start New Session
        </span>
      </button>
    </div>
  )
}
