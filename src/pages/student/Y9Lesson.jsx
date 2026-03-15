import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, BookOpen, FileText, SkipForward, Check } from 'lucide-react'
import Card from '../../components/common/Card'
import AvatarContainer from '../../components/avatar/AvatarContainer'
import VoiceAgent from '../../components/voice/VoiceAgent'
import { lessons } from '../../data/lessons'


export default function Y9Lesson() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = lessons[id]
  const [currentStep, setCurrentStep] = useState(0)
  const [avatarState, setAvatarState] = useState('idle')
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [lessonComplete, setLessonComplete] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [toast, setToast] = useState(null)

  if (!lesson) return <div style={{ padding: 32, fontFamily: "'Sora', sans-serif" }}>Lesson not found</div>

  const totalSteps = lesson.steps.length
  const isLastStep = currentStep >= totalSteps - 1
  const step = lesson.steps[currentStep]

  useEffect(() => {
    if (showQuiz || showIntro) return
    setAvatarState('speaking')
    const t = setTimeout(() => setAvatarState('idle'), 3500)
    return () => clearTimeout(t)
  }, [currentStep, showQuiz, showIntro])

  const handleNext = () => {
    if (isLastStep) setShowQuiz(true)
    else setCurrentStep(p => p + 1)
  }

  const handleAddToNotes = () => {
    setToast('Added to OneNote')
    setTimeout(() => setToast(null), 2000)
  }

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    setTimeout(() => setLessonComplete(true), 1500)
  }

  // Intro
  if (showIntro) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
        <AvatarContainer variant="alex" state="idle" size={180} />
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, margin: '20px 0 8px' }}>Meet Alex</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-secondary)', maxWidth: 480, lineHeight: 1.6, marginBottom: 8 }}>Your AI tutor</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-muted)', maxWidth: 480, lineHeight: 1.6, fontStyle: 'italic', marginBottom: 24 }}>
          "{lesson.didIntroScript}"
        </p>
        <button onClick={() => setShowIntro(false)} style={{
          padding: '10px 28px', background: 'var(--accent-blue)', border: 'none',
          borderRadius: 'var(--radius-md)', color: '#fff', fontFamily: "'DM Sans', sans-serif",
          fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          Begin Lesson <ChevronRight size={16} />
        </button>
        <button onClick={() => setShowIntro(false)} style={{ marginTop: 10, background: 'none', border: 'none', color: 'var(--text-muted)', fontFamily: "'DM Sans', sans-serif", fontSize: 12, cursor: 'pointer' }}>
          <SkipForward size={12} style={{ marginRight: 4 }} /> Skip
        </button>
      </div>
    )
  }

  // Lesson Complete
  if (lessonComplete) {
    const answered = Object.keys(quizAnswers).length
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Check size={32} color="#fff" />
        </div>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24, marginBottom: 8 }}>Lesson Complete</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: 'var(--text-secondary)', marginBottom: 4 }}>{lesson.title}</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>{totalSteps} sections covered · {answered} practice questions attempted</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => navigate('/student/y9')} style={{
            padding: '10px 24px', background: 'var(--accent-blue)', border: 'none',
            borderRadius: 'var(--radius-md)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}>
            Back to Dashboard
          </button>
          <button onClick={handleAddToNotes} style={{
            padding: '10px 24px', background: 'var(--bg-card)', border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}>
            Add to Notes
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)',
      }}>
        <button onClick={() => navigate('/student/y9')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
          <ChevronLeft size={18} /> Back
        </button>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15 }}>{lesson.title}</span>
          {!showQuiz && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', display: 'block' }}>Step {currentStep + 1} of {totalSteps}</span>}
          {showQuiz && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--accent-purple)', display: 'block' }}>Practice Questions</span>}
        </div>
        <button onClick={handleAddToNotes} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--text-muted)', fontFamily: "'DM Sans', sans-serif", fontSize: 11 }}>
          <FileText size={12} /> Add to Notes
        </button>
      </div>

      {/* Progress bar */}
      {!showQuiz && (
        <div style={{ height: 3, background: 'var(--bg-secondary)' }}>
          <div style={{ width: `${((currentStep + 1) / totalSteps) * 100}%`, height: '100%', background: 'var(--accent-blue)', transition: 'width 400ms ease' }} />
        </div>
      )}

      {/* Main content area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 32px', overflowY: 'auto' }}>
          {!showQuiz ? (
            <>
              {/* Avatar */}
              <VoiceAgent
                lesson={lesson}
                currentStep={currentStep}
                grade="y9"
                studentName="Rayan"
                avatarVariant="alex"
                avatarSize={180}
                onAvatarStateChange={setAvatarState}
              />

              {/* Content Card */}
              <Card padding="lg" style={{ maxWidth: 600, width: '100%', marginTop: 20 }}>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{step.content}</p>
                {step.formula && (
                  <div style={{ margin: '14px 0', padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: 'var(--accent-cyan)', fontWeight: 500 }}>{step.formula}</span>
                  </div>
                )}
                {step.example && (
                  <div style={{ padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-blue)' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)' }}>Example: </span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'var(--text-secondary)' }}>{step.example}</span>
                  </div>
                )}
              </Card>
            </>
          ) : (
            /* Quiz / Practice Questions */
            <div style={{ maxWidth: 600, width: '100%' }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 16 }}>Practice Questions</h3>
              {lesson.quiz.map((q, i) => (
                <Card key={i} padding="lg" style={{ marginBottom: 14 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Question {i + 1}</span>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 500, marginBottom: 12, lineHeight: 1.5 }}>{q.q}</p>
                  <textarea
                    placeholder="Type your answer..."
                    value={quizAnswers[i] || ''}
                    onChange={e => setQuizAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                    disabled={quizSubmitted}
                    rows={2}
                    style={{
                      width: '100%', padding: '10px 12px', background: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)', fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                      outline: 'none', resize: 'vertical',
                    }}
                  />
                  {quizSubmitted && (
                    <div style={{ marginTop: 8, padding: '8px 12px', background: 'rgba(0,229,160,0.08)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-green)' }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--accent-green)', fontWeight: 600 }}>Answer: </span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-secondary)' }}>{q.answer}</span>
                    </div>
                  )}
                </Card>
              ))}
              <button onClick={quizSubmitted ? () => setLessonComplete(true) : handleQuizSubmit} style={{
                width: '100%', padding: '12px', background: 'var(--accent-blue)', border: 'none',
                borderRadius: 'var(--radius-md)', color: '#fff', fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>
                {quizSubmitted ? 'Complete Lesson' : 'Submit Answers'}
              </button>
            </div>
          )}
        </div>

        {/* Key Terms Sidebar (lesson mode only) */}
        {!showQuiz && (
          <aside className="lesson-sidebar" style={{
            width: 220, background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-subtle)',
            padding: '20px 16px', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
              <BookOpen size={14} color="var(--accent-cyan)" />
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13 }}>Key Terms</span>
            </div>
            {lesson.steps.map((s, i) => (
              <div key={i} style={{
                padding: '8px 10px', marginBottom: 6, borderRadius: 'var(--radius-sm)',
                background: i === currentStep ? 'rgba(45,125,210,0.08)' : 'transparent',
                borderLeft: i === currentStep ? '2px solid var(--accent-blue)' : '2px solid transparent',
                cursor: 'pointer', transition: 'all 200ms ease',
              }} onClick={() => setCurrentStep(i)}>
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: 12, color: i === currentStep ? 'var(--accent-blue)' : 'var(--text-secondary)', display: 'block' }}>
                  {s.title}
                </span>
                {s.formula && (
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-muted)', display: 'block', marginTop: 2 }}>{s.formula}</span>
                )}
              </div>
            ))}
          </aside>
        )}
      </div>

      {/* Bottom controls (lesson mode only) */}
      {!showQuiz && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 24px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)',
        }}>
          <button onClick={() => currentStep > 0 && setCurrentStep(p => p - 1)} disabled={currentStep === 0} style={{
            display: 'flex', alignItems: 'center', gap: 4, padding: '8px 16px',
            borderRadius: 'var(--radius-sm)', border: 'none', cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            background: 'var(--bg-card)', color: currentStep === 0 ? 'var(--text-muted)' : 'var(--text-secondary)',
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, opacity: currentStep === 0 ? 0.5 : 1,
          }}>
            <ChevronLeft size={14} /> Previous
          </button>

          <div />{/* Mic now in VoiceAgent */}

          <button onClick={handleNext} style={{
            display: 'flex', alignItems: 'center', gap: 4, padding: '8px 16px',
            borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer',
            background: isLastStep ? 'var(--accent-purple)' : 'var(--accent-blue)',
            color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
          }}>
            {isLastStep ? 'Practice Questions' : 'Next'} <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, padding: '10px 18px',
          background: 'var(--bg-card)', border: '1px solid var(--accent-green)',
          borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', zIndex: 1000,
          fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-primary)',
          display: 'flex', alignItems: 'center', gap: 8,
          animation: 'fadeInUp 0.3s ease forwards',
        }}>
          <Check size={14} color="var(--accent-green)" /> {toast}
        </div>
      )}
    </div>
  )
}
