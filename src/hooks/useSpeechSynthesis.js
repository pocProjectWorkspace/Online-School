import { useState, useRef, useCallback, useEffect } from 'react'

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utteranceRef = useRef(null)
  const [voices, setVoices] = useState([])

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  useEffect(() => {
    if (!isSupported) return
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices())
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [isSupported])

  const findVoice = useCallback((preference) => {
    if (!voices.length) return null
    // Try to find preferred voice
    const preferred = voices.find(v => v.name.includes(preference))
    if (preferred) return preferred
    // Fallback to any English voice
    const english = voices.find(v => v.lang.startsWith('en'))
    return english || voices[0]
  }, [voices])

  const speak = useCallback((text, options = {}) => {
    if (!isSupported || !text) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = options.rate || 1.0
    utterance.pitch = options.pitch || 1.0

    // Set voice if preference given
    if (options.voice) {
      const voice = findVoice(options.voice)
      if (voice) utterance.voice = voice
    }

    utterance.onboundary = (event) => {
      options.onBoundary?.(event)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      options.onEnd?.()
    }

    utterance.onerror = () => {
      setIsSpeaking(false)
    }

    utteranceRef.current = utterance
    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }, [isSupported, findVoice])

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }, [isSupported])

  return { speak, stop, isSpeaking, isSupported }
}
