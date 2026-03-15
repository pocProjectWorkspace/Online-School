import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import ProgressRing from '../../components/common/ProgressRing'
import GaugeChart from '../../components/charts/GaugeChart'
import { ChevronRight, MessageSquare, Sparkles } from 'lucide-react'
import { attendanceData, recentCommunication, todayTimetable, activityData } from '../../data/parentDashboard'
import { academicTrajectoryData, subjectColors, radarData, cat4Data } from '../../data/intelligence360'

function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setValue(target); clearInterval(timer) }
      else setValue(Math.round(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return value
}

function TrajectoryTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)', borderRadius: 'var(--radius-md)', padding: '10px 14px', boxShadow: 'var(--shadow-card)' }}>
      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: entry.color, margin: '3px 0 0' }}>
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  )
}

const subjectLabels = { maths: "Mathematics", science: "Science", english: "English", history: "History", arabic: "Arabic", pe: "PE" }

export default function ParentDashboard() {
  const navigate = useNavigate()
  const [briefVisible, setBriefVisible] = useState(false)
  const attendanceCount = useCountUp(attendanceData.overall)
  const percentileCount = useCountUp(cat4Data.percentileRank)

  useEffect(() => { const t = setTimeout(() => setBriefVisible(true), 200); return () => clearTimeout(t) }, [])

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Intelligence Brief */}
      <div
        style={{
          background: 'var(--gradient-hero)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px 32px',
          marginBottom: 24,
          borderLeft: '4px solid',
          borderImage: 'linear-gradient(180deg, var(--accent-blue), var(--accent-purple), var(--accent-cyan)) 1',
          position: 'relative',
          overflow: 'hidden',
          opacity: briefVisible ? 1 : 0,
          transform: briefVisible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 600ms ease, transform 600ms ease',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'var(--gradient-mesh)', opacity: 0.5, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)' }}>
              GEMS Wellington International School
            </span>
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', marginBottom: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Intelligence Brief · Sunday, 15 March 2026
          </div>
          <blockquote style={{
            fontFamily: "'Sora', sans-serif", fontSize: 15, fontStyle: 'italic', color: 'var(--text-primary)',
            lineHeight: 1.7, padding: '16px 20px', background: 'rgba(255,255,255,0.04)',
            borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', margin: '0 0 16px',
          }}>
            "Rayan is performing in the top 5% globally in quantitative reasoning — a distinction held by fewer than 1 in 20 students worldwide. His wellbeing trend is improving for the third consecutive survey period, with emotional health now rated 4.0/5 by you. One area warrants attention: academic focus has dipped this term. The school has noted this and scheduled a learning support session for 18 March."
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)' }}>Powered by Intelligence360</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)' }}>Updated today</span>
            <button onClick={() => navigate('/parent/holistic-profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: 4 }}>
              View Full Profile <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="kpi-strip" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.25fr 1.25fr 1fr', gap: 16, marginBottom: 28 }}>
        {/* Attendance */}
        <Card padding="md">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <ProgressRing value={attendanceData.overall} size={90} strokeWidth={8} color="var(--accent-blue)" label={`${attendanceCount}%`} sublabel="Attendance" />
            <div>
              {attendanceData.breakdown.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{item.label}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-secondary)', marginLeft: 'auto' }}>{item.value}%</span>
                </div>
              ))}
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--accent-green)', marginTop: 4, display: 'block' }}>&uarr; 3% from last month</span>
            </div>
          </div>
        </Card>

        {/* Intelligence Score */}
        <Card glow="purple" padding="md">
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Intelligence Score</span>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 500, color: 'var(--accent-purple)', lineHeight: 1 }}>{percentileCount}<sup style={{ fontSize: 14 }}>th</sup></div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', display: 'block', margin: '2px 0 8px' }}>Percentile · Globally</span>
          <Badge variant="excelling" label="Top 5% worldwide" />
        </Card>

        {/* Wellbeing */}
        <Card padding="md">
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Wellbeing</span>
          <GaugeChart value={3.8} max={5} label="" size={100} segments={['#FF4757', '#FFB800', '#00E5A0']} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
            <Badge variant="improved" />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)' }}>6 surveys</span>
          </div>
        </Card>

        {/* Academic Standing */}
        <Card padding="md">
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Academic Standing</span>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1 }}>B+</div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', display: 'block', margin: '4px 0 10px' }}>Subject Average</span>
          {[{ s: 'Maths', v: 84, c: subjectColors.maths }, { s: 'Science', v: 76, c: subjectColors.science }, { s: 'English', v: 72, c: subjectColors.english }].map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)', width: 44 }}>{d.s}</span>
              <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                <div style={{ width: `${d.v}%`, height: '100%', borderRadius: 2, background: d.c, transition: 'width 1s ease-out' }} />
              </div>
            </div>
          ))}
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-muted)', marginTop: 6, display: 'block' }}>6 subjects tracked</span>
        </Card>
      </div>

      {/* Feature Panels */}
      <div className="feature-panels" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginBottom: 28 }}>
        {/* Academic Trajectory */}
        <Card padding="lg">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, margin: 0 }}>Academic Trajectory</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--accent-purple)' }}>
              <Sparkles size={12} /> AI Projection
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={academicTrajectoryData} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: 'var(--chart-axis)', fontFamily: "'DM Sans', sans-serif", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[55, 95]} tick={{ fill: 'var(--chart-axis)', fontFamily: "'JetBrains Mono', monospace", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TrajectoryTooltip />} />
              <ReferenceLine x="W8" stroke="var(--text-muted)" strokeDasharray="4 4" label={{ value: "Today", fill: 'var(--text-muted)', fontSize: 10, fontFamily: "'DM Sans', sans-serif" }} />
              {Object.entries(subjectColors).map(([key, color]) => (
                <Line key={key} type="monotone" dataKey={key} name={subjectLabels[key]} stroke={color} strokeWidth={2}
                  dot={false} isAnimationActive animationDuration={1500} animationEasing="ease-out"
                  strokeDasharray={academicTrajectoryData.some(d => d.projected && d[key]) ? undefined : undefined}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
            {Object.entries(subjectColors).map(([key, color]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{subjectLabels[key]}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Intelligence Snapshot (Radar) */}
        <Card glow="purple" padding="lg">
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, margin: '0 0 8px' }}>Intelligence Snapshot</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="domain" tick={{ fill: 'var(--text-secondary)', fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 600 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Global" dataKey="global" stroke="var(--text-muted)" fill="transparent" strokeWidth={1} strokeDasharray="3 3" dot={false}
                isAnimationActive animationDuration={200} />
              <Radar name="Class Avg" dataKey="classAvg" stroke="var(--accent-blue)" fill="transparent" strokeWidth={1.5} strokeDasharray="8 4"
                dot={{ fill: 'var(--accent-blue)', r: 3 }} isAnimationActive animationDuration={600} />
              <Radar name="Rayan" dataKey="rayan" stroke="var(--accent-cyan)" fill="var(--accent-cyan)" fillOpacity={0.15} strokeWidth={2.5}
                dot={{ fill: 'var(--accent-cyan)', r: 5, strokeWidth: 2, stroke: 'var(--accent-cyan)' }}
                isAnimationActive animationDuration={1000} />
            </RadarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
            {[{ label: 'Rayan', color: 'var(--accent-cyan)' }, { label: 'Class Avg', color: 'var(--accent-blue)' }, { label: 'Global', color: 'var(--text-muted)' }].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 8, height: 3, borderRadius: 1, background: l.color }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)' }}>{l.label}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/parent/intelligence360')} style={{
            display: 'flex', alignItems: 'center', gap: 4, margin: '12px auto 0', background: 'none', border: 'none',
            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: 'var(--accent-purple)',
          }}>
            Full Intelligence360 Report <ChevronRight size={14} />
          </button>
        </Card>
      </div>

      {/* Operational Strip */}
      <div className="operational-strip" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {/* Today's Timetable */}
        <Card padding="md">
          <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, margin: '0 0 10px' }}>Today's Timetable</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {todayTimetable.slice(0, 5).map((slot, i) => {
              const subjectKey = slot.subject.toLowerCase().split(' ')[0]
              const color = subjectColors[subjectKey === 'science' ? 'science' : subjectKey] || 'var(--accent-blue)'
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-muted)', minWidth: 38 }}>{slot.time.split(' -')[0]}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-pill)', background: `${color}15`, color, fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500 }}>
                    {slot.subject}
                  </span>
                </div>
              )
            })}
          </div>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--accent-blue)', marginTop: 8, padding: 0 }}>
            View full &rarr;
          </button>
        </Card>

        {/* Recent Communication */}
        <Card padding="md">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, margin: 0 }}>Communications</h4>
            <Badge variant="same" label="2 unread" />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MessageSquare size={14} color="#fff" />
            </div>
            <div>
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 12, display: 'block' }}>{recentCommunication.sender}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', display: 'block', marginTop: 2 }}>{recentCommunication.date}</span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4, margin: '6px 0 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {recentCommunication.preview}
              </p>
            </div>
          </div>
        </Card>

        {/* Tasks & Activities */}
        <Card padding="md">
          <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, margin: '0 0 10px' }}>Tasks & Activities</h4>
          {activityData.map((a, i) => (
            <div key={i} style={{ padding: '6px 0', borderBottom: i === 0 ? '1px solid var(--border-subtle)' : 'none' }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-primary)', fontWeight: 500, display: 'block' }}>{a.title}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--accent-cyan)' }}>{a.date}</span>
            </div>
          ))}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--accent-blue)', marginTop: 8, padding: 0 }}>
            View all &rarr;
          </button>
        </Card>
      </div>
    </div>
  )
}
