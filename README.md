# Global Online School — Portal Demo

> Powered by GEMS Education

A self-contained React SPA demonstrating the AI-powered hybrid learning platform for GEMS Global Online School. Built for stakeholder showcase and investor demo.

## Setup

```bash
cd gems-portal
cp .env.example .env
# Add your API keys to .env:
#   VITE_ANTHROPIC_API_KEY=your-claude-api-key
#   VITE_DID_API_KEY=your-did-api-key (base64 encoded)
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS + CSS Variables |
| Charts | Recharts |
| Routing | React Router v6 |
| Icons | Lucide React |
| Fonts | Sora + DM Sans + JetBrains Mono |
| AI Agent | Claude API (claude-sonnet-4-20250514) |
| Avatar Video | D-ID API |
| Voice | Web Speech API (STT + TTS) |

## Demo Script (8-12 minutes)

1. **Landing** — 5 persona cards
2. **Parent (Priya)** — Overview — Intelligence360 radar — Holistic Profile — Parent360 survey
3. **Teacher (Sarah)** — Dashboard — Class Intelligence — Roster (click student) — Lesson Creator — Generate with AI — Send to Avatar
4. **Student Y3 (Aisha)** — Dashboard — Join Class — Water Cycle lesson — Voice agent — Quiz with confetti
5. **Student Y9 (Rayan)** — Dashboard — Intelligence Profile — Quadratic Equations — Key terms — Practice questions
6. **Side-by-side** Y3 vs Y9 UX differentiation

## Portals

### Parent Portal
- Overview dashboard with Intelligence Brief, KPIs, trajectory chart, radar snapshot
- Intelligence360 with animated radar, 4 deep-dive tiles, AI connection layer
- Holistic Student Profile (cognitive fingerprint, learning blueprint, career constellation)
- CAT4, NGRT, Psychometric full reports
- Parent360 survey (5-star rating) + wellbeing trends + AI summary

### Teacher Portal
- Dashboard with Graph API mock data (calendar, assignments, OneDrive)
- Class Intelligence (aggregate CAT4, learning styles, wellbeing flags)
- Class Roster with rich student drawer (Intelligence, Wellbeing, Teaching recommendations)
- Lesson Creator with AI generation pipeline and Send to Avatar

### Student Portals
- **Year 3 (Aisha)**: Gamified, emoji-friendly, progress rings, confetti, Luna avatar
- **Year 9 (Rayan)**: Data-dense, professional, Intelligence360 view, Alex avatar, key terms sidebar

## Theme System

Dark (default) + Light theme. Toggle available on every page. Persisted to localStorage.

## Environment Variables

```
VITE_ANTHROPIC_API_KEY=   # Claude API key for voice agent
VITE_DID_API_KEY=         # D-ID API key (base64 encoded email:key)
```

Both are optional — the app works without them using fallback UI.
