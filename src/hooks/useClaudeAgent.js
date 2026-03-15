import { useState, useRef, useCallback } from 'react'

function buildY3SystemPrompt(lesson, studentName) {
  return `You are ${studentName}'s friendly AI learning assistant called Luna.
You are teaching: ${lesson.title}
Lesson content for this step: provided in user message context.
Full lesson: ${JSON.stringify(lesson.steps.map(s => s.title))}
Rules: max 2 sentences. Simple vocabulary. Warm and encouraging.
If off-topic, gently redirect back to the lesson.
Never say you are an AI. You are Luna, her learning buddy.`
}

function buildY9SystemPrompt(lesson, studentName) {
  return `You are an expert AI tutor helping ${studentName}, a Year 9 student, understand ${lesson.title}.
Full lesson sections: ${JSON.stringify(lesson.steps.map(s => s.title))}
Rules: max 4 sentences. Accurate and clear. Use one example or analogy if helpful.
Offer to go deeper if they want. Tone: knowledgeable but approachable.
Never say you are an AI. You are Alex, his AI tutor.`
}

export function useClaudeAgent({ lesson, grade, studentName }) {
  const [isLoading, setIsLoading] = useState(false)
  const conversationHistoryRef = useRef([])

  const sendMessage = useCallback(async (userMessage, stepContent) => {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    if (!apiKey) {
      return "I'm sorry, the AI service is not configured right now. Please check the API key."
    }

    const systemPrompt = grade === 'y3'
      ? buildY3SystemPrompt(lesson, studentName)
      : buildY9SystemPrompt(lesson, studentName)

    const contextMessage = stepContent
      ? `[Current lesson step content: ${stepContent}]\n\nStudent says: ${userMessage}`
      : userMessage

    conversationHistoryRef.current.push({ role: 'user', content: contextMessage })

    setIsLoading(true)
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: systemPrompt,
          messages: conversationHistoryRef.current,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      const text = data.content?.[0]?.text || "I'm not sure how to answer that. Let's continue with the lesson!"

      conversationHistoryRef.current.push({ role: 'assistant', content: text })
      return text
    } catch (err) {
      console.error('Claude API error:', err)
      return grade === 'y3'
        ? "Hmm, I'm having a little trouble right now. Let's keep going with the lesson!"
        : "I'm experiencing a connection issue. Let's continue with the lesson material."
    } finally {
      setIsLoading(false)
    }
  }, [lesson, grade, studentName])

  const resetHistory = useCallback(() => {
    conversationHistoryRef.current = []
  }, [])

  return {
    sendMessage,
    isLoading,
    conversationHistory: conversationHistoryRef.current,
    resetHistory,
  }
}
