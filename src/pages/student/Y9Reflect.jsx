import { useState } from 'react'
import { Heart, TrendingUp, Calendar, ChevronLeft, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import { reflectData } from '../../data/microsoft365'

const MOODS = [
  { score: 1, emoji: '😢', label: 'Very Low', color: 'var(--accent-red)' },
  { score: 2, emoji: '😔', label: 'Low',      color: '#FF8C42' },
  { score: 3, emoji: '😐', label: 'Okay',     color: 'var(--accent-amber)' },
  { score: 4, emoji: '😊', label: 'Good',     color: 'var(--accent-green)' },
  { score: 5, emoji: '🤩', label: 'Great',    color: 'var(--accent-cyan)' },
]

function getMoodColor(score) {
  if (score >= 4) return 'var(--accent-green)'
  if (score === 3) return 'var(--accent-amber)'
  return 'var(--accent-red)'
}

function getMoodBgColor(score) {
  if (score >= 4) return 'rgba(0, 229, 160, 0.18)'
  if (score === 3) return 'rgba(255, 184, 0, 0.18)'
  return 'rgba(255, 71, 87, 0.18)'
}

function WeekDots({ history }) {
  // Show the last 7 entries as dots
  const recent = [...history].slice(0, 7).reverse()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      {recent.map((entry, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <div
            title={`${entry.date}: ${entry.emoji} (${entry.mood})`}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: getMoodBgColor(entry.mood),
              border: `2px solid ${getMoodColor(entry.mood)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              boxShadow: `0 0 8px ${getMoodColor(entry.mood)}40`,
              transition: 'transform 200ms ease',
              cursor: 'default',
            }}
          >
            {entry.emoji}
          </div>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
          }}>
            {entry.date.replace('Mar ', 'M')}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function Y9Reflect() {
  const navigate = useNavigate()
  const [selectedMood, setSelectedMood] = useState(null)
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!selectedMood) return
    setSubmitted(true)
  }

  const selectedMoodData = MOODS.find(m => m.score === selectedMood)

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 700, margin: '0 auto' }}>

      {/* Back nav */}
      <button
        onClick={() => navigate('/student/y9/microsoft365')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 24,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          padding: 0,
          transition: 'color 150ms ease',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        <ChevronLeft size={16} />
        Microsoft 365
      </button>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 28 }}>🪞</span>
          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: 26,
            color: 'var(--text-primary)',
            margin: 0,
          }}>
            Reflect
          </h1>
        </div>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: 'var(--text-muted)',
          margin: 0,
          paddingLeft: 4,
        }}>
          How are you feeling today?
        </p>
      </div>

      {/* Today's Check-in Card */}
      <Card glow={submitted ? 'green' : 'blue'} padding="lg" style={{ marginBottom: 20 }}>
        {!submitted ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Heart size={16} color="var(--accent-blue)" />
              <span style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: 'var(--text-primary)',
              }}>
                Today's Check-in
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: 'var(--text-muted)',
                marginLeft: 'auto',
              }}>
                Mar 15, 2026
              </span>
            </div>

            {/* Emoji selector */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 8,
              marginBottom: 20,
            }}>
              {MOODS.map(mood => {
                const isSelected = selectedMood === mood.score
                return (
                  <button
                    key={mood.score}
                    onClick={() => setSelectedMood(mood.score)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      padding: '14px 8px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected
                        ? `2px solid ${mood.color}`
                        : '2px solid transparent',
                      background: isSelected
                        ? `${mood.color}18`
                        : 'var(--bg-secondary)',
                      cursor: 'pointer',
                      transform: isSelected ? 'scale(1.12)' : 'scale(1)',
                      transition: 'transform 200ms cubic-bezier(0.34,1.56,0.64,1), border 200ms ease, background 200ms ease',
                      boxShadow: isSelected ? `0 0 14px ${mood.color}40` : 'none',
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) e.currentTarget.style.transform = 'scale(1.06)'
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) e.currentTarget.style.transform = 'scale(1)'
                    }}
                    title={mood.label}
                  >
                    <span style={{ fontSize: 28, lineHeight: 1 }}>{mood.emoji}</span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      fontWeight: isSelected ? 600 : 400,
                      color: isSelected ? mood.color : 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                    }}>
                      {mood.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Optional note */}
            <div style={{ marginBottom: 18 }}>
              <label style={{
                display: 'block',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: 'var(--text-muted)',
                marginBottom: 8,
                fontWeight: 500,
              }}>
                Add a note <span style={{ opacity: 0.5 }}>(optional)</span>
              </label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="What's on your mind today?"
                rows={2}
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: 'var(--text-primary)',
                  resize: 'none',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 200ms ease',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-card)'}
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!selectedMood}
              style={{
                width: '100%',
                padding: '12px 0',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: selectedMood
                  ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))'
                  : 'var(--bg-secondary)',
                color: selectedMood ? 'var(--text-primary)' : 'var(--text-muted)',
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                cursor: selectedMood ? 'pointer' : 'not-allowed',
                transition: 'opacity 200ms ease, transform 150ms ease',
                opacity: selectedMood ? 1 : 0.5,
              }}
              onMouseEnter={e => { if (selectedMood) e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              Submit Check-in
            </button>
          </>
        ) : (
          /* Success state */
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(0, 229, 160, 0.15)',
              border: '2px solid var(--accent-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: 'var(--shadow-glow-green)',
            }}>
              <CheckCircle size={28} color="var(--accent-green)" />
            </div>
            <div style={{ fontSize: 36, marginBottom: 12 }}>{selectedMoodData?.emoji}</div>
            <h3 style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: 'var(--text-primary)',
              margin: '0 0 8px',
            }}>
              Thanks for sharing, Rayan.
            </h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: 'var(--text-secondary)',
              margin: '0 0 16px',
            }}>
              Your teacher has been notified.
            </p>
            {note && (
              <div style={{
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 16px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: 'var(--text-muted)',
                fontStyle: 'italic',
                textAlign: 'left',
              }}>
                "{note}"
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Weekly Summary */}
      <Card padding="lg" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={16} color="var(--accent-cyan)" />
            <span style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: 15,
              color: 'var(--text-primary)',
            }}>
              Weekly Summary
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 22,
                fontWeight: 500,
                color: 'var(--accent-green)',
                display: 'block',
                lineHeight: 1,
              }}>
                {reflectData.weeklyAvg}
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: 'var(--text-muted)',
              }}>
                avg mood
              </span>
            </div>
            <Badge variant="same" label="→ Stable" />
          </div>
        </div>

        <WeekDots history={reflectData.history} />
      </Card>

      {/* Mood History */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Calendar size={16} color="var(--text-muted)" />
          <h3 style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            color: 'var(--text-primary)',
            margin: 0,
          }}>
            Mood History
          </h3>
        </div>

        <Card padding="sm">
          {reflectData.history.map((entry, i) => {
            const moodColor = getMoodColor(entry.mood)
            const moodBg   = getMoodBgColor(entry.mood)
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '12px 14px',
                  borderBottom: i < reflectData.history.length - 1
                    ? '1px solid var(--border-subtle)'
                    : 'none',
                }}
              >
                {/* Emoji bubble */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: moodBg,
                  border: `1.5px solid ${moodColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  flexShrink: 0,
                }}>
                  {entry.emoji}
                </div>

                {/* Date + note */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      color: 'var(--text-primary)',
                    }}>
                      {entry.date}
                    </span>
                    {entry.note && (
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        color: 'var(--text-muted)',
                        fontStyle: 'italic',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        "{entry.note}"
                      </span>
                    )}
                  </div>
                  {/* Mini dot bar for score */}
                  <div style={{ display: 'flex', gap: 3 }}>
                    {[1, 2, 3, 4, 5].map(dot => (
                      <div
                        key={dot}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: dot <= entry.mood ? moodColor : 'var(--bg-secondary)',
                          border: `1px solid ${dot <= entry.mood ? moodColor : 'var(--border-subtle)'}`,
                          transition: 'background 200ms ease',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Score chip */}
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 18,
                  fontWeight: 500,
                  color: moodColor,
                  flexShrink: 0,
                  minWidth: 28,
                  textAlign: 'right',
                }}>
                  {entry.mood}
                </div>
              </div>
            )
          })}
        </Card>
      </div>

    </div>
  )
}
