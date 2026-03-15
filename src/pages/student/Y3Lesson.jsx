import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Gem, SkipForward } from 'lucide-react'
import Card from '../../components/common/Card'
import AvatarContainer from '../../components/avatar/AvatarContainer'
import VoiceAgent from '../../components/voice/VoiceAgent'
import { lessons } from '../../data/lessons'

// Confetti burst component
function Confetti({ show }) {
  if (!show) return null
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 300,
    y: (Math.random() - 0.5) * 300 - 100,
    color: ['#FFB800', '#2D7DD2', '#7B5CF0', '#00E5A0', '#FF4757', '#00D4FF'][i % 6],
    size: Math.random() * 8 + 4,
    delay: Math.random() * 200,
    rotation: Math.random() * 360,
  }))

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', width: p.size, height: p.size,
          background: p.color, borderRadius: p.size > 6 ? '50%' : '2px',
          transform: `rotate(${p.rotation}deg)`,
          animation: `confettiBurst 1s ease-out ${p.delay}ms forwards`,
          '--x': `${p.x}px`, '--y': `${p.y}px`,
        }} />
      ))}
      <style>{`
        @keyframes confettiBurst {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--x), var(--y)) scale(0.3); }
        }
      `}</style>
    </div>
  )
}


// AudioWave moved to components/voice/AudioWave.jsx
function InlineAudioWave({ active }) {
  return null // Handled by VoiceAgent now
}

export default function Y3Lesson() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = lessons[id]
  const [currentStep, setCurrentStep] = useState(0)
  const [avatarState, setAvatarState] = useState('idle')
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizCorrect, setQuizCorrect] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [shakeWrong, setShakeWrong] = useState(false)
  const [lessonComplete, setLessonComplete] = useState(false)
  const [gems, setGems] = useState(1240)
  const [showIntro, setShowIntro] = useState(true)
  const [gemsEarned, setGemsEarned] = useState(0)

  if (!lesson) return <div style={{ padding: 32, fontFamily: "'Sora', sans-serif" }}>Lesson not found</div>

  const totalSteps = lesson.steps.length
  const isLastStep = currentStep >= totalSteps - 1

  // Simulate TTS on step change
  useEffect(() => {
    if (showQuiz || showIntro) return
    setAvatarState('speaking')
    const t = setTimeout(() => setAvatarState('idle'), 3000)
    return () => clearTimeout(t)
  }, [currentStep, showQuiz, showIntro])

  const handleNext = () => {
    if (isLastStep) {
      setShowQuiz(true)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }

  const handleQuizAnswer = (answerIdx) => {
    if (answerIdx === lesson.quiz[quizIndex].answer) {
      setShowConfetti(true)
      setQuizCorrect(prev => prev + 1)
      setGems(prev => prev + 10)
      setGemsEarned(prev => prev + 10)
      setAvatarState('happy')
      setTimeout(() => {
        setShowConfetti(false)
        setAvatarState('idle')
        if (quizIndex < lesson.quiz.length - 1) {
          setQuizIndex(prev => prev + 1)
        } else {
          setGems(prev => prev + 50)
          setGemsEarned(prev => prev + 50)
          setLessonComplete(true)
        }
      }, 1200)
    } else {
      setShakeWrong(true)
      setTimeout(() => setShakeWrong(false), 500)
    }
  }

  const step = lesson.steps[currentStep]

  // Intro overlay
  if (showIntro) {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center',
      }}>
        <AvatarContainer variant="luna" state="happy" size={200} />
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 24, margin: '24px 0 8px' }}>Meet Luna!</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: 'var(--text-secondary)', maxWidth: 400, lineHeight: 1.6, marginBottom: 8 }}>
          Your AI learning buddy
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-muted)', maxWidth: 420, lineHeight: 1.6, fontStyle: 'italic', marginBottom: 28 }}>
          "{lesson.didIntroScript}"
        </p>
        <button onClick={() => setShowIntro(false)} style={{
          padding: '12px 32px', background: 'var(--gradient-ai)', border: 'none',
          borderRadius: 'var(--radius-pill)', color: '#fff', fontFamily: "'DM Sans', sans-serif",
          fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          Let's go! <ChevronRight size={18} />
        </button>
        <button onClick={() => setShowIntro(false)} style={{
          marginTop: 12, background: 'none', border: 'none', color: 'var(--text-muted)',
          fontFamily: "'DM Sans', sans-serif", fontSize: 12, cursor: 'pointer',
        }}>
          <SkipForward size={12} style={{ marginRight: 4 }} /> Skip intro
        </button>
      </div>
    )
  }

  // Lesson complete
  if (lessonComplete) {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center',
      }}>
        <Confetti show={true} />
        <AvatarContainer variant="luna" state="happy" size={200} />
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 28, margin: '24px 0 8px' }}>
          Amazing! {'\uD83C\uDF89'}
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: 'var(--text-secondary)', marginBottom: 4 }}>
          You completed <strong>{lesson.title}</strong>!
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: 'var(--text-secondary)', marginBottom: 4 }}>
          Quiz score: {quizCorrect}/{lesson.quiz.length} correct
        </p>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 'var(--radius-pill)',
          background: 'rgba(255,184,0,0.15)', color: 'var(--accent-amber)',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 500, margin: '16px 0 28px',
        }}>
          <Gem size={20} /> +{gemsEarned} gems earned!
        </div>
        <button onClick={() => navigate('/student/y3')} style={{
          padding: '12px 32px', background: 'var(--gradient-ai)', border: 'none',
          borderRadius: 'var(--radius-pill)', color: '#fff', fontFamily: "'DM Sans', sans-serif",
          fontSize: 16, fontWeight: 600, cursor: 'pointer',
        }}>
          Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      <Confetti show={showConfetti} />

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 20px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)',
      }}>
        <button onClick={() => navigate('/student/y3')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
          <ChevronLeft size={18} /> Back
        </button>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, display: 'block' }}>
            {lesson.emoji} {lesson.title}
          </span>
          {!showQuiz && (
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>
              Step {currentStep + 1} of {totalSteps}
            </span>
          )}
          {showQuiz && (
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--accent-amber)' }}>
              Quiz — Question {quizIndex + 1} of {lesson.quiz.length}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 'var(--radius-pill)', background: 'rgba(255,184,0,0.15)', color: 'var(--accent-amber)', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 13 }}>
          <Gem size={14} /> {gems.toLocaleString()}
        </div>
      </div>

      {/* Progress dots */}
      {!showQuiz && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '12px 0' }}>
          {lesson.steps.map((_, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: i <= currentStep ? 'var(--accent-blue)' : 'var(--border-subtle)',
              transition: 'background 300ms ease',
            }} />
          ))}
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px 24px', gap: 20 }}>
        {/* Voice Agent (avatar + mic + audiowave + transcript) */}
        {!showQuiz && (
          <VoiceAgent
            lesson={lesson}
            currentStep={currentStep}
            grade="y3"
            studentName="Aisha"
            avatarVariant="luna"
            avatarSize={200}
            onAvatarStateChange={setAvatarState}
          />
        )}
        {showQuiz && <AvatarContainer variant="luna" state={avatarState} size={200} />}

        {/* Content card or Quiz */}
        {!showQuiz ? (
          <Card padding="lg" style={{ maxWidth: 520, width: '100%', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{step.icon}</div>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 10, textTransform: 'uppercase', color: 'var(--accent-blue)', letterSpacing: '0.02em' }}>
              {step.keyWord || step.title}
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {step.content}
            </p>
          </Card>
        ) : (
          <div style={{ maxWidth: 520, width: '100%', animation: shakeWrong ? 'shake 0.4s ease' : undefined }}>
            <Card padding="lg" style={{ borderRadius: 'var(--radius-xl)', textAlign: 'center', marginBottom: 16 }}>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 600, lineHeight: 1.5 }}>
                {lesson.quiz[quizIndex].q}
              </p>
            </Card>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {lesson.quiz[quizIndex].options.map((opt, i) => (
                <button key={i} onClick={() => handleQuizAnswer(i)} style={{
                  padding: '14px 16px', borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-card)', border: '2px solid var(--border-card)',
                  cursor: 'pointer', color: 'var(--text-primary)',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500,
                  transition: 'all 200ms ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-blue)'; e.currentTarget.style.transform = 'scale(1.03)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-card)'; e.currentTarget.style.transform = 'scale(1)' }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <style>{`
              @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-8px); }
                50% { transform: translateX(8px); }
                75% { transform: translateX(-4px); }
              }
            `}</style>
          </div>
        )}

      </div>

      {/* Bottom controls */}
      {!showQuiz && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)',
        }}>
          <button onClick={handlePrev} disabled={currentStep === 0} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px',
            borderRadius: 'var(--radius-pill)', border: 'none', cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            background: 'var(--bg-card)',
            color: currentStep === 0 ? 'var(--text-muted)' : 'var(--text-secondary)',
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
            opacity: currentStep === 0 ? 0.5 : 1,
          }}>
            <ChevronLeft size={16} /> Previous
          </button>

          {/* Mic button now handled by VoiceAgent above */}
          <div />{/* spacer */}

          <button onClick={handleNext} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px',
            borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer',
            background: isLastStep ? 'var(--accent-amber)' : 'var(--accent-blue)',
            color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
          }}>
            {isLastStep ? 'Quiz Time!' : 'Next'} <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
