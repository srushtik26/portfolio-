import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  BrainCircuit,
  Briefcase,
  HelpCircle,
  Command,
  FileText,
  HeartPulse,
  LayoutDashboard,
  LineChart,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'

function BrowserBar({ title }) {
  return (
    <div className="preview-browser-bar">
      <span className="browser-dots"><i /><i /><i /></span>
      <span className="browser-address"><span className="browser-lock">⌑</span> preview / {title.toLowerCase().replaceAll(' ', '-')}</span>
      <span className="browser-window-actions"><i /><i /><i /></span>
    </div>
  )
}

function PreviewSidebar({ brand, mark, active, links }) {
  return (
    <aside className="preview-sidebar">
      <div className="preview-brand">
        <span className="preview-brand-mark">{mark}</span>
        <span>{brand}</span>
      </div>
      <p className="preview-nav-label">WORKSPACE</p>
      <nav aria-label={`${brand} preview`}>
        {links.map(({ label, icon: Icon }) => (
          <span className={`preview-nav-item${label === active ? ' is-active' : ''}`} key={label}>
            <Icon size={12} />{label}
          </span>
        ))}
      </nav>
      <div className="preview-sidebar-bottom">
        <span className="preview-avatar">{mark.slice(0, 1)}</span>
        <span><b>Workspace</b><small>Personal account</small></span>
        <HelpCircle size={12} />
      </div>
    </aside>
  )
}

function PreviewHeader({ eyebrow, title, subtitle, action }) {
  return (
    <header className="preview-page-heading">
      <div><small>{eyebrow}</small><h4>{title}</h4><p>{subtitle}</p></div>
      <button type="button" tabIndex={-1}><Sparkles size={11} />{action}</button>
    </header>
  )
}

function StatCard({ label, value, delta, icon: Icon, tone = 'pink' }) {
  return (
    <div className={`preview-stat preview-stat-${tone}`}>
      <div className="preview-stat-label"><span>{label}</span><Icon size={12} /></div>
      <strong>{value}</strong>
      <small>{delta}</small>
    </div>
  )
}

function MiniChart({ className = '' }) {
  return (
    <div className={`preview-chart ${className}`}>
      <div className="preview-chart-grid"><i /><i /><i /><i /></div>
      <svg viewBox="0 0 400 90" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="preview-chart-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ff58ab" stopOpacity=".24" />
            <stop offset="1" stopColor="#ff58ab" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="preview-chart-area" d="M0 67 C22 62 24 43 49 51 S79 65 100 46 S131 53 151 34 S181 48 202 37 S229 42 251 25 S279 39 299 22 S326 32 348 18 S377 27 400 9 V90 H0Z" />
        <path className="preview-chart-line" d="M0 67 C22 62 24 43 49 51 S79 65 100 46 S131 53 151 34 S181 48 202 37 S229 42 251 25 S279 39 299 22 S326 32 348 18 S377 27 400 9" />
      </svg>
      <div className="preview-chart-axis"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div>
    </div>
  )
}

function AcuveraPreview() {
  return (
    <div className="project-preview preview-acuvera" aria-hidden="true">
      <BrowserBar title="Acuvera triage" />
      <div className="preview-app-layout">
        <PreviewSidebar
          brand="acuvera"
          mark="A"
          active="Patient queue"
          links={[{ label: 'Patient queue', icon: Users }, { label: 'Triage board', icon: HeartPulse }, { label: 'Clinical notes', icon: FileText }]}
        />
        <div className="preview-main">
          <PreviewHeader eyebrow="CARE WORKSPACE / TRIAGE" title="Patient overview" subtitle="A focused view for faster, more informed care." action="Assist" />
          <div className="preview-patient-banner">
            <span className="patient-avatar"><HeartPulse size={15} /></span>
            <span><b>Patient summary</b><small>Illustrative interface · no real patient data</small></span>
            <span className="preview-priority"><i /> PRIORITY REVIEW</span>
          </div>
          <div className="preview-acuvera-grid">
            <div className="preview-panel">
              <div className="preview-panel-heading"><span>Care overview</span><small>SUMMARY</small></div>
              <div className="preview-vitals">
                <span><small>STATUS</small><b>In review</b></span>
                <span><small>TRIAGE</small><b className="text-pink">Priority</b></span>
                <span><small>NOTES</small><b>Available</b></span>
              </div>
              <div className="preview-review-line"><i /><span>Assessment information</span><b>View</b></div>
              <div className="preview-review-line"><i /><span>Clinical notes</span><b>View</b></div>
              <div className="preview-note"><ShieldCheck size={12} /><span>Designed to support clinical review, not replace professional judgment.</span></div>
            </div>
            <div className="preview-panel preview-queue-panel">
              <div className="preview-panel-heading"><span>Queue status</span><Activity size={12} /></div>
              <div className="preview-queue-ring"><span><b>LIVE</b><small>QUEUE</small></span></div>
              <div className="queue-legend"><span><i /> Review needed</span><span><i /> In progress</span></div>
              <div className="preview-queue-footer"><span>Updated just now</span><ArrowUpRight size={11} /></div>
            </div>
          </div>
        </div>
      </div>
      <span className="preview-disclaimer"><Sparkles size={9} /> Concept preview</span>
    </div>
  )
}

function WolftorPreview() {
  return (
    <div className="project-preview preview-wolftor" aria-hidden="true">
      <BrowserBar title="Wolftor learning lab" />
      <div className="preview-app-layout">
        <PreviewSidebar
          brand="wolftor"
          mark="W"
          active="Learning path"
          links={[{ label: 'Learning path', icon: BookOpen }, { label: 'My concepts', icon: BrainCircuit }, { label: 'Practice', icon: Command }]}
        />
        <div className="preview-main">
          <PreviewHeader eyebrow="YOUR LEARNING SPACE" title="Learn by seeing." subtitle="Concepts made clearer, one step at a time." action="Ask Wolftor" />
          <div className="preview-learning-layout">
            <div className="preview-panel preview-lesson">
              <div className="preview-lesson-top"><span>MATHEMATICS <i /> GEOMETRY</span><span>02 <small>/ 06</small></span></div>
              <h5>The Pythagorean theorem</h5>
              <p>See how the sides of a right triangle relate to one another.</p>
              <div className="preview-diagram">
                <div className="triangle-diagram"><i /><i /><i /><b>a</b><b>b</b><b>c</b></div>
                <div className="formula-card"><small>THE RELATIONSHIP</small><strong>a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></strong><span>Explore the visual proof <ArrowUpRight size={10} /></span></div>
              </div>
              <div className="preview-lesson-progress"><i /><i /><i /><i /><i /><i /><span>Continue lesson <ArrowUpRight size={10} /></span></div>
            </div>
            <div className="preview-panel preview-tutor-panel">
              <span className="tutor-orb"><Sparkles size={13} /></span>
              <small>WOLFTOR EXPLAINS</small>
              <b>Let’s break this down.</b>
              <p>The two shorter sides create squares. Their areas add up to the area on the longest side.</p>
              <button type="button" tabIndex={-1}><Sparkles size={10} /> Show me visually</button>
              <div className="tutor-footer"><span>AI learning companion</span><span><i /> READY</span></div>
            </div>
          </div>
        </div>
      </div>
      <span className="preview-disclaimer"><Sparkles size={9} /> Product concept preview</span>
    </div>
  )
}

function MarketPulsePreview() {
  return (
    <div className="project-preview preview-market" aria-hidden="true">
      <BrowserBar title="MarketPulse briefing" />
      <div className="preview-app-layout">
        <PreviewSidebar
          brand="marketpulse"
          mark="M"
          active="Morning brief"
          links={[{ label: 'Morning brief', icon: FileText }, { label: 'Market signals', icon: TrendingUp }, { label: 'Saved stories', icon: Bell }]}
        />
        <div className="preview-main">
          <PreviewHeader eyebrow="YOUR DAILY INTELLIGENCE" title="The morning brief." subtitle="A concise view of the stories shaping the day." action="Refresh brief" />
          <div className="preview-market-grid">
            <div className="preview-market-lead">
              <div className="market-lead-image"><div className="market-image-sun" /><div className="market-image-building" /><span>MARKET SIGNAL / 01</span></div>
              <div className="market-lead-copy">
                <span className="market-topic">MARKET PULSE <i /> 4 MIN READ</span>
                <h5>What’s moving markets today</h5>
                <p>Key developments, grouped and summarized for a faster start to the day.</p>
                <div className="market-source"><span className="source-avatar">MP</span><span>Curated briefing<small>Multiple source overview</small></span><ArrowUpRight size={12} /></div>
              </div>
            </div>
            <div className="preview-market-list">
              <div className="preview-panel-heading"><span>In this briefing</span><small>CURATED</small></div>
              <div className="market-story"><span className="story-number">01</span><span><small>MARKETS</small><b>Signals across key indices</b></span><ArrowUpRight size={11} /></div>
              <div className="market-story"><span className="story-number">02</span><span><small>BUSINESS</small><b>Company updates to know</b></span><ArrowUpRight size={11} /></div>
              <div className="market-story"><span className="story-number">03</span><span><small>ECONOMY</small><b>Policy and data watch</b></span><ArrowUpRight size={11} /></div>
              <div className="market-automation"><Sparkles size={11} /><span>AI-assisted sorting<small>Human-readable daily digest</small></span></div>
            </div>
          </div>
        </div>
      </div>
      <span className="preview-disclaimer"><Sparkles size={9} /> Illustrative briefing preview</span>
    </div>
  )
}

function PortfolioMonitorPreview() {
  return (
    <div className="project-preview preview-portfolio" aria-hidden="true">
      <BrowserBar title="Portfolio monitor" />
      <div className="preview-app-layout">
        <PreviewSidebar
          brand="portfolio"
          mark="P"
          active="Overview"
          links={[{ label: 'Overview', icon: LayoutDashboard }, { label: 'Holdings', icon: Briefcase }, { label: 'Activity', icon: Activity }]}
        />
        <div className="preview-main">
          <PreviewHeader eyebrow="MONDAY, OCTOBER 19" title="Portfolio overview" subtitle="A clearer view of your investment mix." action="Add holding" />
          <div className="preview-stat-row">
            <StatCard label="PORTFOLIO VALUE" value="$124,800" delta={<><TrendingUp size={9} /> +2.4% this period</>} icon={Briefcase} />
            <StatCard label="DAY'S CHANGE" value="+$1,284" delta={<><TrendingUp size={9} /> +0.52% today</>} icon={Activity} />
            <StatCard label="HOLDINGS" value="12 assets" delta="Across 4 categories" icon={LineChart} tone="violet" />
          </div>
          <div className="preview-monitor-bottom">
            <div className="preview-panel preview-performance">
              <div className="preview-panel-heading"><span>Portfolio performance</span><span className="preview-select">6 months⌄</span></div>
              <div className="preview-performance-value"><b>$124,800</b><span><TrendingUp size={9} /> 2.4%</span></div>
              <MiniChart />
            </div>
            <div className="preview-panel preview-holdings">
              <div className="preview-panel-heading"><span>Top holdings</span><Search size={11} /></div>
              <div className="holding-row"><i className="holding-icon">N</i><span><b>Northstar</b><small>Equity · 32%</small></span><strong>$42.6k</strong><ArrowUpRight size={10} /></div>
              <div className="holding-row"><i className="holding-icon">A</i><span><b>Atlas Growth</b><small>Equity · 24%</small></span><strong>$31.2k</strong><ArrowUpRight size={10} /></div>
              <div className="holding-row"><i className="holding-icon">C</i><span><b>Core Income</b><small>Fixed · 18%</small></span><strong>$22.4k</strong><ArrowDownRight size={10} /></div>
            </div>
          </div>
        </div>
      </div>
      <span className="preview-disclaimer"><Sparkles size={9} /> Demo interface · simulated market data</span>
    </div>
  )
}

function ProjectVisual({ kind }) {
  if (kind === 'acuvera') return <AcuveraPreview />
  if (kind === 'wolftor') return <WolftorPreview />
  if (kind === 'portfolio') return <PortfolioMonitorPreview />
  return <MarketPulsePreview />
}

export default ProjectVisual
