import { useState, useEffect, useCallback } from 'react'
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis'
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition'
import { useClaudeAgent } from '../../hooks/useClaudeAgent'
import AvatarContainer from '../avatar/AvatarContainer'
import MicButton from './MicButton'
import AudioWave from './AudioWave'
import Transcript from './Transcript'

export default function VoiceAgent({
  lesson,
  currentStep,
  grade,
  studentName,
  avatarVariant = 'luna',
  avatarSize = 200,
  onAvatarStateChange,
}) {
  const [avatarState, setAvatarState] = useState('idle')
  const [transcript, setTranscript] = useState([])
  const [micState, setMicState] = useState('idle') // idle | listening | processing | speaking
  const [hasSpokenStep, setHasSpokenStep] = useState(false)

  const { speak, stop: stopSpeaking, isSpeaking, isSupported: ttsSupported } = useSpeechSynthesis()
  const { sendMessage, isLoading: claudeLoading } = useClaudeAgent({ lesson, grade, studentName })

  const voicePreference = avatarVariant === 'luna' ? 'Google UK English Female' : 'Google UK English Male'

  const handleSpeechResult = useCallback(async (text) => {
    setTranscript(prev => [...prev, { role: 'student', text }])
    setAvatarState('thinking')
    setMicState('processing')
    onAvatarStateChange?.('thinking')

    const stepContent = lesson.steps[currentStep]?.content || ''
    const response = await sendMessage(text, stepContent)

    setTranscript(prev => [...prev, { role: 'agent', text: response }])
    setAvatarState('speaking')
    setMicState('speaking')
    onAvatarStateChange?.('speaking')

    speak(response, {
      voice: voicePreference,
      rate: grade === 'y3' ? 0.9 : 1.0,
      onBoundary: () => {
        // Mouth toggle handled by CSS animation state
      },
      onEnd: () => {
        setAvatarState('idle')
        setMicState('idle')
        onAvatarStateChange?.('idle')
      },
    })
  }, [lesson, currentStep, sendMessage, speak, grade, voicePreference, onAvatarStateChange])

  const { start: startListening, stop: stopListening, isListening, isSupported: sttSupported } = useSpeechRecognition({
    onResult: handleSpeechResult,
    onEnd: () => {
      if (micState === 'listening') {
        setMicState('idle')
        setAvatarState('idle')
        onAvatarStateChange?.('idle')
      }
    },
  })

  // Speak step content automatically when step changes
  useEffect(() => {
    setHasSpokenStep(false)
    const timer = setTimeout(() => {
      if (!ttsSupported) return

      const step = lesson.steps[currentStep]
      if (!step) return

      setAvatarState('speaking')
      setMicState('speaking')
      onAvatarStateChange?.('speaking')

      speak(step.content, {
        voice: voicePreference,
        rate: grade === 'y3' ? 0.85 : 0.95,
        onEnd: () => {
          setHasSpokenStep(true)
          setAvatarState('idle')
          setMicState('idle')
          onAvatarStateChange?.('idle')

          // Ask if they have questions
          const promptText = grade === 'y3'
            ? 'Do you have any questions about that?'
            : 'Any questions before we continue?'

          setTimeout(() => {
            setTranscript(prev => [...prev, { role: 'agent', text: promptText }])
          }, 500)
        },
      })
    }, 800)

    return () => {
      clearTimeout(timer)
      stopSpeaking()
    }
  }, [currentStep]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleMicClick = () => {
    if (micState === 'listening') {
      stopListening()
      setMicState('idle')
      setAvatarState('idle')
      onAvatarStateChange?.('idle')
    } else if (micState === 'idle') {
      startListening()
      setMicState('listening')
      setAvatarState('listening')
      onAvatarStateChange?.('listening')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* Avatar */}
      <AvatarContainer variant={avatarVariant} state={avatarState} size={avatarSize} showRing />

      {/* Audio Wave */}
      <AudioWave
        active={avatarState === 'speaking'}
        color={avatarVariant === 'luna' ? 'var(--accent-purple)' : 'var(--accent-blue)'}
      />

      {/* Mic Button */}
      <MicButton
        state={micState}
        onClick={handleMicClick}
        size={grade === 'y3' ? 60 : 50}
      />

      {/* STT not supported fallback */}
      {!sttSupported && (
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>
          Voice input not supported in this browser. Try Chrome.
        </span>
      )}

      {/* Transcript */}
      <Transcript messages={transcript} variant={grade} />
    </div>
  )
}
