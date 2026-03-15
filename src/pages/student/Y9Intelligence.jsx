import { useNavigate } from 'react-router-dom'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from 'recharts'
import { ChevronLeft, Brain, BookOpen, Lightbulb, TrendingUp, ExternalLink, Target } from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import GradientBar from '../../components/common/GradientBar'
import DonutChart from '../../components/charts/DonutChart'
import { cat4Data, psychometricData, radarData, wellbeingData } from '../../data/intelligence360'

const improvementPlan = [
  { area: 'Verbal Reasoning', current: '92nd %ile', target: '95th+ %ile', actions: ['Join structured discussion class', 'Daily 15-min reading aloud', 'Vocabulary building exercises'], priority: 'Medium', color: 'var(--accent-amber)', source: 'CAT4' },
  { area: 'History', current: 'C+', target: 'B+', actions: ['Catch up on 3 missed sessions with Ms. Bennett', 'Use timeline visual organisers', 'Weekly revision with BBC Bitesize'], priority: 'High', color: 'var(--accent-red)', source: 'Academics' },
  { area: 'Academic Focus', current: '2.0/5', target: '3.5/5', actions: ['Attend learning support session (18 March)', 'Use timed study blocks (25 min on, 5 min off)', 'Set daily study goals with your form tutor'], priority: 'Urgent', color: 'var(--accent-red)', source: 'Parent360' },
  { area: 'Written Communication', current: 'Developing', target: 'Strong', actions: ['Practice essay structuring with templates', 'Read one non-fiction article per week and summarise', 'Ask teachers for written feedback on drafts'], priority: 'Medium', color: 'var(--accent-amber)', source: 'CAT4 + Psychometric' },
]

const recommendedResources = [
  { title: 'Khan Academy — Verbal Reasoning Practice', subject: 'Reasoning', type: 'Interactive', icon: '🧠' },
  { title: 'Seneca Learning — GCSE History Catch-Up', subject: 'History', type: 'Revision', icon: '📜' },
  { title: 'BBC Bitesize — Study Skills & Focus', subject: 'Skills', type: 'Video', icon: '🎯' },
  { title: 'Dr Frost Maths — Extension Challenges', subject: 'Maths', type: 'Practice', icon: '📐' },
  { title: 'Oak Academy — Advanced Reading Comprehension', subject: 'English', type: 'Lesson', icon: '📖' },
  { title: 'Career Explorer — STEM Pathways Quiz', subject: 'Careers', type: 'Assessment', icon: '🚀' },
]

export default function Y9Intelligence() {
  const navigate = useNavigate()

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 4 }}>My Intelligence Profile</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)' }}>Powered by Intelligence360 · Based on CAT4, Psychometric, and Wellbeing assessments</p>
        </div>
        <Badge variant="excelling" label={`${cat4Data.percentileRank}th Percentile`} />
      </div>

      {/* Cognitive Radar + Summary */}
      <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
        <Card glow="purple" padding="lg">
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Brain size={16} color="var(--accent-purple)" /> Cognitive Profile
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="68%">
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="domain" tick={{ fill: 'var(--text-secondary)', fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 600 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Global" dataKey="global" stroke="var(--text-muted)" fill="transparent" strokeWidth={1} strokeDasharray="3 3" dot={false} isAnimationActive animationDuration={300} />
              <Radar name="Class" dataKey="classAvg" stroke="var(--accent-blue)" fill="transparent" strokeWidth={1.5} strokeDasharray="6 3" dot={{ fill: 'var(--accent-blue)', r: 3 }} isAnimationActive animationDuration={600} />
              <Radar name="You" dataKey="rayan" stroke="var(--accent-cyan)" fill="var(--accent-cyan)" fillOpacity={0.15} strokeWidth={2.5} dot={{ fill: 'var(--accent-cyan)', r: 5 }} isAnimationActive animationDuration={1000} />
            </RadarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 4 }}>
            {[{ l: 'You', c: 'var(--accent-cyan)' }, { l: 'Class Avg', c: 'var(--accent-blue)' }, { l: 'Global', c: 'var(--text-muted)' }].map(i => (
              <div key={i.l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 10, height: 3, borderRadius: 1, background: i.c }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{i.l}</span>
              </div>
            ))}
          </div>
        </Card>

        <div>
          <Card padding="lg" style={{ marginBottom: 14 }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 12 }}>Your Strengths</h3>
            {cat4Data.domains.map((d, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{d.name} Reasoning</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: d.color }}>{d.percentile}th %ile</span>
                </div>
                <GradientBar value={d.percentile} max={100} gradient={d.color} showValue={false} height={6} />
              </div>
            ))}
          </Card>

          <Card padding="md" style={{ background: 'var(--bg-secondary)' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              You're in the <strong style={{ color: 'var(--accent-cyan)' }}>top 5% globally</strong> for quantitative reasoning — that's stronger than 99 out of 100 students your age. Your spatial and non-verbal skills are also exceptional. Your biggest growth opportunity is <strong style={{ color: 'var(--accent-amber)' }}>verbal reasoning</strong> — still strong at 92nd percentile, but with targeted work, you could match your other scores.
            </p>
          </Card>
        </div>
      </div>

      {/* Learning Style */}
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <BookOpen size={16} color="var(--accent-cyan)" /> How You Learn Best
      </h3>
      <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
        <Card padding="lg">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <DonutChart data={psychometricData.learningStyles} size={160} innerLabel="" innerSublabel="Your Style" />
          </div>
          <div>
            {psychometricData.learningStyles.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', flex: 1 }}>{s.name}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
        <Card padding="lg">
          <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Study tips for you</h4>
          {[
            { ok: true, text: 'Use diagrams, flowcharts and colour-coded notes' },
            { ok: true, text: 'Read through structured notes before class' },
            { ok: true, text: 'Solve worked examples step-by-step' },
            { ok: true, text: 'Use timed study sessions with clear goals' },
            { ok: false, text: 'Don\'t just listen — always take visual notes' },
            { ok: false, text: 'Don\'t study in long blocks without breaks' },
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ color: t.ok ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: 12, fontWeight: 700 }}>{t.ok ? '✓' : '✗'}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{t.text}</span>
            </div>
          ))}
          <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-purple)' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>Your optimal environment: </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>Structured, independent, with clear task breakdown and timed goals</span>
          </div>
        </Card>
      </div>

      {/* Improvement Plan */}
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Lightbulb size={16} color="var(--accent-amber)" /> Your Improvement Plan
      </h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>Specific actions based on your intelligence profile</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {improvementPlan.map((item, i) => (
          <Card key={i} padding="lg">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15 }}>{item.area}</span>
                <span style={{ padding: '1px 8px', borderRadius: 'var(--radius-pill)', background: `${item.color}15`, color: item.color, fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600 }}>{item.priority}</span>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)' }}>Source: {item.source}</span>
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
              <div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Current</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 500 }}>{item.current}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>→</div>
              <div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Target</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 500, color: 'var(--accent-green)' }}>{item.target}</span>
              </div>
            </div>
            <div style={{ padding: '10px 12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              {item.actions.map((a, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: j < item.actions.length - 1 ? 6 : 0 }}>
                  <Target size={12} color="var(--accent-blue)" />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>{a}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Recommended Resources */}
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <TrendingUp size={16} color="var(--accent-green)" /> Resources to Help You Improve
      </h3>
      <div className="responsive-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 28 }}>
        {recommendedResources.map((res, i) => (
          <Card key={i} padding="md" style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontSize: 22, lineHeight: 1 }}>{res.icon}</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, display: 'block', lineHeight: 1.3, marginBottom: 4 }}>{res.title}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>{res.type} · {res.subject}</span>
              </div>
              <ExternalLink size={12} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
            </div>
          </Card>
        ))}
      </div>

      {/* Career Direction Preview */}
      <Card glow="purple" padding="lg">
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 8 }}>Where Your Profile Points</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14 }}>
          Based on your cognitive strengths, personality profile, and interests, your top career clusters are:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {psychometricData.selectedCareerClusters.map((c, i) => (
            <span key={i} style={{
              padding: '6px 14px', borderRadius: 'var(--radius-pill)',
              background: 'rgba(123,92,240,0.12)', color: 'var(--accent-purple)',
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              border: '1px solid rgba(123,92,240,0.2)',
            }}>
              {c}
            </span>
          ))}
        </div>
      </Card>
    </div>
  )
}
