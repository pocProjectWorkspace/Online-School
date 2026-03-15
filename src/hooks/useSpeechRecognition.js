import { useState, useRef, useCallback } from 'react'

export function useSpeechRecognition({ onResult, onEnd, onError } = {}) {
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)

  const SpeechRecognition = typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null

  const isSupported = !!SpeechRecognition

  const start = useCallback(() => {
    if (!isSupported || isListening) return

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-GB'

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onResult?.(transcript)
    }

    recognition.onend = () => {
      setIsListening(false)
      onEnd?.()
    }

    recognition.onerror = (event) => {
      setIsListening(false)
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        onError?.(event.error)
      }
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }, [isSupported, isListening, onResult, onEnd, onError])

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setIsListening(false)
  }, [])

  return { start, stop, isListening, isSupported }
}
