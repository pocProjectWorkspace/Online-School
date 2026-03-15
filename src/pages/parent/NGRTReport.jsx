import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import AnimatedBarChart from '../../components/charts/AnimatedBarChart'
import { ngrtData } from '../../data/intelligence360'

function BandSpectrum({ bandRank, maxBand = 9 }) {
  const position = ((bandRank - 1) / (maxBand - 1)) * 100

  return (
    <div style={{ margin: '16px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        {Array.from({ length: maxBand }, (_, i) => (
          <span key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-muted)', width: 20, textAlign: 'center' }}>{i + 1}</span>
        ))}
      </div>
      <div style={{ position: 'relative', height: 10, borderRadius: 5, background: 'linear-gradient(90deg, #FF4757, #FFB800, #2D7DD2, #00E5A0)' }}>
        <div style={{
          position: 'absolute', top: -5, left: `${position}%`, transform: 'translateX(-50%)',
          width: 20, height: 20, borderRadius: '50%', background: '#fff',
          border: '3px solid var(--accent-blue)', boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          transition: 'left 1s ease-out',
        }} />
      </div>
    </div>
  )
}

export default function NGRTReport() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('sas')
  const [showSummary, setShowSummary] = useState(false)

  const barData = ngrtData.domains.map(d => ({ name: d.name, value: d.score }))

  return (
    <div className="page-content page-enter" style={{ padding: '28px 32px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button onClick={() => navigate('/parent/intelligence360')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <ChevronLeft size={20} />
        </button>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20, margin: 0 }}>NGRT Performance</h1>
      </div>

      {/* Overall Performance */}
      <Card padding="lg" style={{ marginBottom: 20 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)', display: 'block', marginBottom: 12 }}>Overall Performance</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div style={{ textAlign: 'center', padding: 16, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>SAS First</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 500, color: 'var(--text-primary)' }}>{ngrtData.firstSAS}</span>
          </div>
          <div style={{ textAlign: 'center', padding: 16, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>SAS Recent</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 500, color: 'var(--accent-blue)' }}>{ngrtData.recentSAS}</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 20 }}>
            <div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Tests Taken</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>{ngrtData.testsTaken}</span>
            </div>
            <div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Last Test</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>{ngrtData.lastTestDate}</span>
            </div>
          </div>
          <Badge variant={ngrtData.movement} />
        </div>
      </Card>

      {/* SAS / Band Rank Toggle */}
      <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: 3, marginBottom: 20 }}>
        {['sas', 'band'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            flex: 1, padding: '8px 16px', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
            background: activeTab === tab ? 'var(--accent-blue)' : 'transparent',
            color: activeTab === tab ? '#fff' : 'var(--text-muted)',
            transition: 'all 200ms ease',
          }}>
            {tab === 'sas' ? 'SAS Score' : 'Band Rank'}
          </button>
        ))}
      </div>

      {/* Comparison Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <Card padding="md">
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Global Average</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 500 }}>{ngrtData.globalSAS}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: 'var(--accent-red)' }}>{ngrtData.globalDelta}</span>
          </div>
        </Card>
        <Card padding="md">
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Regional (UAE)</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 500 }}>{ngrtData.regionalSAS}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: 'var(--accent-red)' }}>{ngrtData.regionalDelta}</span>
          </div>
        </Card>
      </div>

      {/* Band Rank Spectrum */}
      {activeTab === 'band' && (
        <Card padding="md" style={{ marginBottom: 20 }}>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 4 }}>Band Rank Spectrum</span>
          <BandSpectrum bandRank={ngrtData.bandRank} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
            Current: Band {ngrtData.bandRank} &middot; Global Avg: {ngrtData.globalAvgBand}
          </p>
        </Card>
      )}

      {/* Skill Chart */}
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 12 }}>Skill Interpretation</h3>
      <Card padding="md" style={{ marginBottom: 20 }}>
        <AnimatedBarChart data={barData} yDomain={[0, 5]} color="multi" height={240} />
      </Card>

      {/* Parent Summary Toggle */}
      <button
        onClick={() => setShowSummary(!showSummary)}
        style={{
          width: '100%', padding: '12px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', color: 'var(--accent-cyan)', fontFamily: "'DM Sans', sans-serif",
          fontSize: 14, fontWeight: 600, marginBottom: 20,
        }}
      >
        Parent Summary
        {showSummary ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {showSummary && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          {Object.entries(ngrtData.parentSummary).map(([key, data]) => (
            <Card key={key} padding="md">
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--accent-blue)', textTransform: 'capitalize', display: 'block', marginBottom: 4 }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
                {data.stanine && <span style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)', fontWeight: 400 }}> &middot; Stanine {data.stanine}</span>}
              </span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{data.advice}</p>
            </Card>
          ))}
        </div>
      )}

      {/* Recommended Focus */}
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 12 }}>Recommended Focus</h3>
      <Card padding="md">
        {ngrtData.recommendedFocus.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < ngrtData.recommendedFocus.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
            <CheckCircle size={16} color="var(--accent-green)" />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)' }}>{item}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}
