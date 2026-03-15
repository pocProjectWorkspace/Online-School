import { useState, useCallback } from 'react'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function useDID() {
  const [videoUrl, setVideoUrl] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)

  const generateVideo = useCallback(async (script, presenterImageUrl, voiceId = 'en-US-JennyNeural') => {
    const apiKey = import.meta.env.VITE_DID_API_KEY
    if (!apiKey) {
      setError('D-ID API key not configured')
      return null
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Step 1: Create talk
      const createRes = await fetch('https://api.d-id.com/talks', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          script: {
            type: 'text',
            input: script,
            provider: { type: 'microsoft', voice_id: voiceId },
          },
          source_url: presenterImageUrl,
          config: { fluent: true, pad_audio: 0 },
        }),
      })

      if (!createRes.ok) {
        throw new Error(`D-ID create failed: ${createRes.status}`)
      }

      const { id } = await createRes.json()

      // Step 2: Poll for completion
      let status = 'created'
      let resultUrl = null
      let attempts = 0
      const maxAttempts = 30 // 60 seconds max

      while (status !== 'done' && status !== 'error' && attempts < maxAttempts) {
        await sleep(2000)
        attempts++

        const pollRes = await fetch(`https://api.d-id.com/talks/${id}`, {
          headers: { 'Authorization': `Basic ${apiKey}` },
        })

        if (!pollRes.ok) {
          throw new Error(`D-ID poll failed: ${pollRes.status}`)
        }

        const data = await pollRes.json()
        status = data.status

        if (status === 'done') {
          resultUrl = data.result_url
        }
      }

      if (resultUrl) {
        setVideoUrl(resultUrl)
        return resultUrl
      }

      // Silently fall back — no error shown to user
      return null
    } catch (err) {
      console.error('D-ID error:', err)
      // Silent fallback — SVG avatar + browser TTS
      return null
    } finally {
      setIsGenerating(false)
    }
  }, [])

  return { generateVideo, videoUrl, isGenerating, error }
}
