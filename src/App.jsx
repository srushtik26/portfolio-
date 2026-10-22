import { lazy, Suspense, useEffect, useState } from 'react'
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Shuffle,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react'
import { profile, projects, skills, experience, achievements } from './data/portfolio'
import DeveloperActivity from './components/DeveloperActivity'
import AboutPortrait from './components/AboutPortrait'
import ProjectVisual from './components/ProjectVisual'

const HeroScene = lazy(() => import('./components/HeroScene'))

const skillLogos = {
  Java: '/assets/tech-logos/java.svg',
  Python: '/assets/tech-logos/python.svg',
  'Spring Boot': '/assets/tech-logos/spring.svg',
  Django: '/assets/tech-logos/django.svg',
  'Gemini AI': '/assets/tech-logos/gemini.svg',
  React: '/assets/tech-logos/react.svg',
  JavaScript: '/assets/tech-logos/javascript.svg',
  TypeScript: '/assets/tech-logos/typescript.svg',
  'Tailwind CSS': '/assets/tech-logos/tailwindcss.svg',
  PostgreSQL: '/assets/tech-logos/postgresql.svg',
  MySQL: '/assets/tech-logos/mysql.svg',
  SQLite: '/assets/tech-logos/sqlite.svg',
  Git: '/assets/tech-logos/git.svg',
  'GitHub Actions': '/assets/tech-logos/github-actions.svg',
  'Power BI': '/assets/tech-logos/power-bi.svg',
}

const skillConceptIcons = {
  'REST APIs': Code2,
  'AI/ML': BrainCircuit,
  NLP: Sparkles,
  Automation: Layers3,
  Terminal: Code2,
}

const skillConceptClasses = {
  'REST APIs': 'api',
  'AI/ML': 'ai',
  NLP: 'nlp',
  Automation: 'automation',
  Terminal: 'terminal',
}

const navLinks = [
  ['Home', 'hero'],
  ['About', 'about'],
  ['Projects', 'projects'],
  ['Experience', 'experience'],
  ['Skills', 'skills'],
  ['Achievements', 'achievements'],
  ['Contact', 'contact'],
]

function SectionHeading({ number, eyebrow, title, note }) {
  return (
    <div className="section-heading">
      <p className="eyebrow"><span>{number}</span> / {eyebrow}</p>
      <div className="section-heading-row">
        <h2>{title}</h2>
        {note && <p>{note}</p>}
      </div>
    </div>
  )
}

function SkillMark({ name }) {
  const logo = skillLogos[name]
  const Icon = skillConceptIcons[name]

  return (
    <span className={`skill-mark${logo ? '' : ` skill-mark-concept skill-mark-concept-${skillConceptClasses[name]}`}`} aria-hidden="true">
      {logo ? <img src={logo} alt="" loading="lazy" /> : Icon ? <Icon size={17} /> : null}
    </span>
  )
}

const skillItems = skills.flatMap(({ items }) => items)
const currentProject = projects.find((project) => project.status === 'In progress')

function Navbar() {
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = navLinks
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.2, 0.5] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#hero" onClick={closeMenu} aria-label="Srushti Kadam, home">
          <span className="brand-mark">SK</span>
          <span className="brand-name">Srushti Kadam</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-links"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div id="primary-links" className={`nav-links${menuOpen ? ' is-open' : ''}`}>
          {navLinks.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'active' : ''}
              aria-current={active === id ? 'location' : undefined}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
        </div>
        <a className="button button-outline nav-resume" href="#contact">
          <Mail size={14} />
          Contact
        </a>
      </nav>
    </header>
  )
}

function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="art-grid" />
      <div className="hero-fallback">
        <svg viewBox="0 0 500 400" role="presentation">
          <defs>
            <radialGradient id="coder-backdrop"><stop stopColor="#30213f" /><stop offset="1" stopColor="#0b0910" /></radialGradient>
            <linearGradient id="coder-hoodie" x2="1" y2="1"><stop stopColor="#514658" /><stop offset="1" stopColor="#211c2a" /></linearGradient>
            <linearGradient id="coder-hair" x2="1"><stop stopColor="#493447" /><stop offset=".48" stopColor="#17131d" /><stop offset="1" stopColor="#39263a" /></linearGradient>
            <linearGradient id="coder-skin" x2="1" y2="1"><stop stopColor="#f0b28e" /><stop offset="1" stopColor="#cb795f" /></linearGradient>
            <linearGradient id="coder-screen" x2="1" y2="1"><stop stopColor="#171523" /><stop offset="1" stopColor="#0b0d17" /></linearGradient>
            <filter id="coder-glow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          <circle cx="250" cy="199" r="177" fill="url(#coder-backdrop)" stroke="#7b3a68" strokeOpacity=".6" />
          <path d="M118 34v143M389 25v143" stroke="#55cbe9" strokeOpacity=".4" strokeWidth="3" filter="url(#coder-glow)" />
          <path d="M177 24v117M329 28v118" stroke="#ff54a9" strokeOpacity=".53" strokeWidth="3" filter="url(#coder-glow)" />
          <rect x="35" y="157" width="137" height="123" rx="7" fill="#211a2a" stroke="#75405f" />
          <rect x="42" y="164" width="123" height="107" rx="3" fill="url(#coder-screen)" />
          <rect x="181" y="126" width="138" height="154" rx="7" fill="#241b2c" stroke="#985076" />
          <rect x="188" y="133" width="124" height="138" rx="3" fill="url(#coder-screen)" />
          <rect x="328" y="157" width="137" height="123" rx="7" fill="#211a2a" stroke="#75405f" />
          <rect x="335" y="164" width="123" height="107" rx="3" fill="url(#coder-screen)" />
          <g fill="none" strokeLinecap="round" opacity=".84">
            <path d="M52 180h32m-32 10h70m-61 10h47m-56 10h73m-65 10h54m-51 10h66m-58 10h42m-54 10h64" stroke="#74c7c0" strokeWidth="2" />
            <path d="M198 153h49m-39 11h77m-71 11h54m-70 11h79m-60 11h66m-75 11h47m-44 11h80m-69 11h60m-79 11h51m-61 11h82" stroke="#ee7daf" strokeWidth="2" />
            <path d="M345 180h49m-38 10h70m-64 10h52m-65 10h73m-59 10h62m-70 10h44m-56 10h72m-61 10h53" stroke="#a58ddd" strokeWidth="2" />
          </g>
          <path d="M42 284h416l19 14H24z" fill="#362536" stroke="#a75382" />
          <path d="M75 299h344l-16 10H91z" fill="#211a28" stroke="#59364f" />
          <path d="M196 305h111" stroke="#fa70b1" strokeOpacity=".8" strokeWidth="2" />
          <path d="M205 284 218 258h65l18 26" fill="#2a2431" stroke="#7d6683" />
          <path d="M199 284c3-28 12-48 31-58l20-8 29 6c25 10 34 34 38 60" fill="url(#coder-hoodie)" stroke="#9c7592" strokeWidth="2" />
          <path d="M216 232 198 268l-24 14m122-47 19 31 24 8" fill="none" stroke="#514858" strokeWidth="18" strokeLinecap="round" />
          <path d="m174 282 23 3 12 4m130-13-22 7-11 7" fill="none" stroke="url(#coder-skin)" strokeWidth="10" strokeLinecap="round" />
          <path d="M224 175c-11-23-8-59 8-77 11-13 27-20 45-17 18 2 31 13 37 31 9 27 2 60-11 78-13 17-26 27-39 27-18 0-31-18-40-42z" fill="url(#coder-skin)" />
          <path d="M214 167c-10-34-4-69 14-88 16-17 43-24 66-15 15 6 26 19 30 36-11-9-20-11-29-9-7 2-12 8-20 9-15 3-26-9-40-6-10 2-17 12-20 24-3 13-1 30-1 49z" fill="url(#coder-hair)" />
          <path d="M218 145c-16 5-19 34-13 57 6 23 16 42 26 52l12-7c-12-22-15-45-9-65" fill="url(#coder-hair)" />
          <path d="M306 131c17 4 20 28 14 53-6 23-16 39-28 49l-12-9c14-17 18-38 15-59" fill="url(#coder-hair)" />
          <path d="M230 126c12-9 22-10 33-6m13 1c11-6 23-4 31 4" fill="none" stroke="#4b2939" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="245" cy="139" rx="4" ry="5" fill="#28202b" /><ellipse cx="293" cy="139" rx="4" ry="5" fill="#28202b" />
          <path d="M252 174q17 11 34-1" fill="none" stroke="#a65361" strokeWidth="3" strokeLinecap="round" />
          <g fill="none" stroke="#3c2d42" strokeWidth="3">
            <rect x="223" y="124" width="38" height="29" rx="12" />
            <rect x="274" y="124" width="38" height="29" rx="12" />
            <path d="M261 135h13m-50-2-10-4m98 4 9-5" />
          </g>
          <path d="M198 282 187 289m133-7 13 8" stroke="#e4a080" strokeWidth="7" strokeLinecap="round" />
          <path d="M170 306h166" stroke="#f27fb5" strokeWidth="1.5" opacity=".8" />
          <circle cx="108" cy="126" r="2" fill="#ff8fc7" /><circle cx="382" cy="130" r="2" fill="#79d4ea" />
        </svg>
      </div>
      <Suspense fallback={null}><HeroScene /></Suspense>
      <span className="hero-scene-tag"><i /> BUG WHISPERER AT WORK</span>
      <p className="art-caption">IDEAS WELCOME<br />BUGS NOT SO MUCH</p>
    </div>
  )
}

function Hero() {
  const [featuredProject, setFeaturedProject] = useState(currentProject || projects[0])

  const pickAnotherProject = () => {
    const alternatives = projects.filter((project) => project.name !== featuredProject.name)
    setFeaturedProject(alternatives[Math.floor(Math.random() * alternatives.length)])
  }
  const featuredProjectNumber = String(projects.indexOf(featuredProject) + 1).padStart(2, '0')

  return (
    <section id="hero" className="hero section-anchor">
      <div className="page-width hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">Software Engineer <span>·</span> Part-time bug whisperer</p>
          <h1>Srushti Kadam<span className="hero-title-mark">!</span></h1>
          <p className="hero-intro">I turn “what if?” into useful software—from AI tutors to market-news automation. Stubborn bugs occasionally join the adventure.</p>
          <div className="project-roulette">
            <div className="roulette-heading"><span><i /> SIDE-QUEST PICKER</span><span>{featuredProjectNumber} / {String(projects.length).padStart(2, '0')}</span></div>
            <a className="current-build-note" href="#projects">
              <span className="current-build-index">TODAY’S<br />ADVENTURE</span>
              <span className="current-build-copy">
                <strong>{featuredProject.name}</strong>
                <small>{featuredProject.description}</small>
              </span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <button className="roulette-button" type="button" onClick={pickAnotherProject}>
              <Shuffle size={13} /> Deal me another
            </button>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Explore my builds <ArrowRight size={16} /></a>
            <a className="button button-outline" href="#contact"><Mail size={15} /> Say hello</a>
          </div>
        </div>
        <HeroArt />
      </div>
    </section>
  )
}

function Highlights() {
  return (
    <section className="highlights" aria-label="Professional highlights">
      <div className="page-width highlight-grid">
        <div className="highlight-item">
          <Trophy aria-hidden="true" />
          <div><span>RECENT WIN</span><strong>HackAura · 1st place</strong></div>
        </div>
        <div className="highlight-item">
          <BrainCircuit aria-hidden="true" />
          <div><span>WORKING AT</span><strong>Plutus Wealth Management</strong></div>
        </div>
        <div className="highlight-item">
          <MapPin aria-hidden="true" />
          <div><span>BASED IN</span><strong>Mumbai, India</strong></div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="content-section section-anchor">
      <div className="page-width">
        <SectionHeading number="01" eyebrow="Selected projects" title="Things I’ve built" note={<a href={profile.github} target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={14} /></a>} />
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <ProjectVisual kind={project.visual} />
              <div className="project-body">
                <div className="project-title-row">
                  <h3>{project.name}</h3>
                  {project.award && <span className="award-tag"><Trophy size={12} /> {project.award}</span>}
                  {project.status && <span className="project-status"><i />{project.status}</span>}
                </div>
                <p>{project.description}</p>
                <ul className="pill-list project-tags">{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
                <div className="project-links">
                  {project.demo && <a href={project.demo} target="_blank" rel="noreferrer"><ExternalLink size={14} /> Live demo</a>}
                  {project.repository && <a href={project.repository} target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a>}
                  {!project.demo && !project.repository && <span className="link-unavailable">Project links not listed</span>}
                  <ArrowUpRight className="project-arrow" size={17} aria-hidden="true" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="content-section career-section section-anchor">
      <div className="page-width career-grid">
        <div>
          <SectionHeading number="03" eyebrow="Experience" title="Where I’ve worked" />
          <div className="experience-list">
            {experience.map((role) => (
              <article className="experience-item" key={role.company}>
                <span className="timeline-dot" aria-hidden="true" />
                <div className="experience-card">
                  <div className="experience-card-heading">
                    <span className={`company-logo company-logo-${role.logoClass}`}>
                      <img src={role.logo} alt={`${role.company} logo`} />
                    </span>
                    <span className="experience-date">{role.dates}</span>
                  </div>
                  <h3>{role.role}</h3>
                  <a className="experience-company" href={role.website} target="_blank" rel="noreferrer">
                    {role.company}<ArrowUpRight size={12} />
                  </a>
                  <p className="experience-description">{role.description}</p>
                  <ul className="pill-list">{role.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
        <section id="achievements" className="achievements-column section-anchor">
          <SectionHeading number="04" eyebrow="Achievements" title="Hackathon wins" />
          <div className="achievement-list">
            {achievements.map((item) => (
              <article className={`achievement-card achievement-card-${item.tone}`} key={item.event}>
                <span className="achievement-emblem" aria-hidden="true">
                  <span className="achievement-emblem-label">{item.mark}</span>
                  <item.icon size={17} />
                </span>
                <div><h3>{item.title}</h3><p>{item.event}</p><span>{item.project}</span></div>
              </article>
            ))}
          </div>
        </section>
        <section id="skills" className="skills-column section-anchor">
          <SectionHeading number="05" eyebrow="Skills" title="Tech stack" />
          <div className="skill-list" aria-label="Scrolling technology stack">
            <div className="skill-marquee-track">
              {[0, 1].map((copy) => (
                <ul className="skill-marquee-set" key={copy} aria-hidden={copy === 1}>
                  {skillItems.map((item) => (
                    <li className="skill-tile" key={item} title={item} aria-label={copy === 0 ? item : undefined}>
                      <SkillMark name={item} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="content-section about-section section-anchor">
      <div className="page-width">
        <SectionHeading number="06" eyebrow="About & education" title="A little about my journey" />
        <div className="about-grid">
          <AboutPortrait />
          <div className="about-copy">
            <p>Hi, I’m Srushti. I write code the way some people solve puzzles—with a little too much enthusiasm and a disproportionate amount of joy when a stubborn bug finally gives up.</p>
            <p>Java was where it all started. Since then, I’ve enjoyed moving between backend logic and frontend polish, and exploring AI/ML through my Electronics & Computer Science degree and honours specialization. I’m always learning, building, and thinking about what to make next.</p>
            <div className="education-block">
              <span className="education-icon"><GraduationCap size={19} /></span>
              <div><h3>Shah & Anchor Kutchhi Engineering College</h3><p>B.Tech · Electronics & Computer Science · 2022–2026</p><p>AI/ML Honours</p></div>
            </div>
          </div>
          <aside className="quote-card">
            <span className="quote-mark">“</span>
            <blockquote>I love turning ideas into working systems, especially when they involve AI, clean code, and real-world impact.</blockquote>
            <p>— Srushti Kadam</p>
            <div className="quote-art" aria-hidden="true"><span /><span /><span /><Code2 /></div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const socials = [
    { label: 'Email', href: `mailto:${profile.email}`, value: profile.email, icon: Mail },
    { label: 'LinkedIn', href: profile.linkedin, value: 'Connect professionally', icon: Linkedin },
    { label: 'GitHub', href: profile.github, value: 'Explore my repositories', icon: Github },
  ]

  return (
    <section id="contact" className="contact-section section-anchor">
      <div className="page-width contact-layout">
        <div>
          <SectionHeading number="07" eyebrow="Get in touch" title="Let’s build something great together." />
          <p className="contact-intro">I’m always open to discussing new opportunities, collaborations, or just a good tech conversation.</p>
        </div>
        <div className="contact-links">
          {socials.map(({ label, href, value, icon: Icon }) => (
            <a className="contact-link" href={href} key={label} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noreferrer'}>
              <span className="contact-link-icon"><Icon size={17} /></span>
              <span><strong>{label}</strong><small>{value}</small></span>
              <ArrowUpRight size={16} />
            </a>
          ))}
          <a className="contact-link" href={profile.resume || `mailto:${profile.email}?subject=Resume%20request`}>
            <span className="contact-link-icon"><ArrowDownToLine size={17} /></span>
            <span><strong>Résumé</strong><small>{profile.resume ? 'Download PDF' : 'Available on request'}</small></span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="page-width contact-signoff"><span>Thanks for visiting!</span><Sparkles size={17} /></div>
    </section>
  )
}

function App() {
  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <Projects />
        <DeveloperActivity />
        <Experience />
        <About />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="page-width footer-inner">
          <p>© {new Date().getFullYear()} Srushti Kadam. Designed & built with care.</p>
          <a href="#hero">Back to top <ArrowUp size={14} /></a>
        </div>
      </footer>
    </>
  )
}

export default App
