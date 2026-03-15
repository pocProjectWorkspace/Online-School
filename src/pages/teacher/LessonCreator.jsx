import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Save, Eye, Bot } from 'lucide-react'
import Card from '../../components/common/Card'
import { lessons } from '../../data/lessons'

const genStages = [
  "Analysing curriculum standards...",
  "Structuring content for Year 3...",
  "Generating lesson plan...",
]

export default function LessonCreator() {
  const navigate = useNavigate()
  const [topic, setTopic] = useState('The Water Cycle')
  const [yearGroup, setYearGroup] = useState('Year 3')
  const [duration, setDuration] = useState('45 minutes')
  const [objectives, setObjectives] = useState('Students will be able to describe the four stages of the water cycle: evaporation, condensation, precipitation, and collection.')
  const [generating, setGenerating] = useState(false)
  const [genStage, setGenStage] = useState(0)
  const [genProgress, setGenProgress] = useState(0)
  const [generated, setGenerated] = useState(false)

  const lesson = lessons['water-cycle']

  const handleGenerate = () => {
    setGenerating(true)
    setGenStage(0)
    setGenProgress(0)

    const dur = 3000
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      setGenProgress(Math.min((elapsed / dur) * 100, 100))
      setGenStage(Math.min(Math.floor((elapsed / dur) * genStages.length), genStages.length - 1))
      if (elapsed >= dur) {
        clearInterval(interval)
        setGenerating(false)
        setGenerated(true)
      }
    }, 50)
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', background: 'var(--bg-input)',
    border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)', fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: 'none',
  }

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 800 }}>
      <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Create New Lesson</h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
        Fill in the details and let AI generate a structured lesson plan
      </p>

      {/* Form */}
      <Card padding="lg" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Topic</label>
            <input value={topic} onChange={e => setTopic(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Year Group</label>
              <select value={yearGroup} onChange={e => setYearGroup(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option>Year 3</option><option>Year 4</option><option>Year 5</option><option>Year 9</option>
              </select>
            </div>
            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Duration</label>
              <select value={duration} onChange={e => setDuration(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option>30 minutes</option><option>45 minutes</option><option>60 minutes</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Learning Objectives</label>
            <textarea value={objectives} onChange={e => setObjectives(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
        </div>

        <button onClick={handleGenerate} disabled={generating || generated} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          width: '100%', padding: '12px', marginTop: 20,
          background: generating || generated ? 'var(--bg-secondary)' : 'var(--gradient-ai)',
          border: 'none', borderRadius: 'var(--radius-md)', cursor: generating ? 'wait' : 'pointer',
          color: generating || generated ? 'var(--text-muted)' : '#fff',
          fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
        }}>
          <Sparkles size={16} />
          {generating ? genStages[genStage] : generated ? 'Lesson Generated' : 'Generate with AI'}
        </button>

        {generating && (
          <div style={{ marginTop: 12, height: 4, borderRadius: 2, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
            <div style={{ width: `${genProgress}%`, height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))', transition: 'width 100ms linear' }} />
          </div>
        )}
      </Card>

      {/* Generated Lesson Plan */}
      {generated && (
        <>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={16} color="var(--accent-purple)" /> Generated Lesson Plan
          </h3>

          <Card glow="blue" padding="lg" style={{ marginBottom: 14 }}>
            <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{lesson.emoji} {lesson.title}</h4>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)' }}>{lesson.grade}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)' }}>{lesson.subject}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)' }}>{lesson.duration}</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{lesson.didIntroScript}"
            </p>
          </Card>

          <Card padding="md" style={{ marginBottom: 14 }}>
            <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Teaching Steps</h4>
            {lesson.steps.map((step, i) => (
              <div key={step.id} style={{
                display: 'flex', gap: 12, padding: '10px 0',
                borderBottom: i < lesson.steps.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-blue)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500, color: '#fff', flexShrink: 0,
                }}>{step.id}</span>
                <div>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 4 }}>
                    {step.icon && `${step.icon} `}{step.title}
                  </span>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{step.content}</p>
                </div>
              </div>
            ))}
          </Card>

          <Card padding="md" style={{ marginBottom: 14 }}>
            <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Assessment — Quiz Questions</h4>
            {lesson.quiz.map((q, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < lesson.quiz.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>Q{i + 1}: {q.q}</span>
                {q.options && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                    {q.options.map((opt, j) => (
                      <span key={j} style={{
                        padding: '3px 10px', borderRadius: 'var(--radius-pill)',
                        background: j === q.answer ? 'rgba(0,229,160,0.15)' : 'var(--bg-secondary)',
                        color: j === q.answer ? 'var(--accent-green)' : 'var(--text-muted)',
                        fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: j === q.answer ? 600 : 400,
                      }}>
                        {opt}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Card>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <button style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px',
              background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)',
              cursor: 'pointer', color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
            }}>
              <Save size={14} /> Save to Library
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px',
              background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)',
              cursor: 'pointer', color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
            }}>
              <Eye size={14} /> Preview Lesson
            </button>
            <button onClick={() => navigate('/student/y3/lesson/water-cycle')} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px',
              background: 'var(--gradient-ai)', border: 'none', borderRadius: 'var(--radius-md)',
              cursor: 'pointer', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
            }}>
              <Bot size={14} /> Send to Avatar
            </button>
          </div>
        </>
      )}
    </div>
  )
}
