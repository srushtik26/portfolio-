import { Award, BrainCircuit, Code2, Database, Layers3, Star, Trophy, Wrench } from 'lucide-react'

export const profile = {
  email: 'srushtikadam26.sk@gmail.com',
  github: 'https://github.com/srushtik26',
  linkedin: 'https://www.linkedin.com/in/srushti-kadam-838685259/',
  leetcode: 'https://leetcode.com/u/Srushtikadam26/',
  tuf: 'https://takeuforward.org/profile/srushhh26',
  resume: '',
  tufProgress: {
    solved: 41,
    total: 1457,
    verifiedOn: '2026-10-22',
  },
}

export const projects = [
  {
    name: 'Acuvera',
    description: 'An AI-assisted emergency room triage platform designed to support faster, more informed care decisions.',
    technologies: ['AI-assisted triage', 'Healthcare'],
    visual: 'acuvera',
  },
  {
    name: 'Wolftor',
    description: 'An AI STEM tutor that turns equations into visual explanations and interactive learning experiences.',
    technologies: ['React', 'Python', 'AI/ML', 'FastAPI'],
    visual: 'wolftor',
    award: 'HackAura · 1st place',
    demo: 'https://wolftor.vercel.app/',
    repository: 'https://github.com/Sparky17561/CodeCrusaders_OpenInnovation',
  },
  {
    name: 'MarketPulse',
    description: 'Plutus Morning News: an automated pipeline that curates, classifies, and delivers daily investment updates.',
    technologies: ['Python', 'Gemini AI', 'SerpAPI', 'SQLite'],
    visual: 'market',
    repository: 'https://github.com/srushtik26/investment-news-briefing',
  },
  {
    name: 'Portfolio Monitor',
    description: 'A responsive React and TypeScript portfolio-monitoring demo with simulated holdings, market activity, and alerts. In progress; market data is illustrative.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    visual: 'portfolio',
    status: 'In progress',
    repository: 'https://github.com/srushtik26/Portfolio-Monitor',
  },
]

export const experience = [
  {
    company: 'Plutus Wealth Management LLP',
    role: 'AI Automation Intern',
    dates: 'Aug 2026 – Present',
    description: 'Built an automated daily investment-news pipeline using AI classification, cross-source corroboration, deduplication, and email/WhatsApp delivery.',
    technologies: ['Python', 'Gemini AI', 'SerpAPI', 'SQLite', 'GitHub Actions'],
    logo: '/assets/company-logos/plutus-mark.png',
    logoClass: 'plutus',
    website: 'https://plutuswealth.in/',
  },
  {
    company: 'Bombay Stock Exchange (BSE)',
    role: 'SMOP Intern (Java)',
    dates: 'Jan 2026 – Jul 2026',
    description: 'Built Java backend components for derivatives market-data processing and validated uploaded data through production workflows.',
    technologies: ['Java', 'Spring Boot', 'SQL'],
    logo: '/assets/company-logos/bse.png',
    logoClass: 'bse',
    website: 'https://www.bseindia.com/',
  },
]

export const achievements = [
  { title: '1st Place', event: 'HackAura 2025', project: 'Wolftor · AI STEM Tutor', icon: Trophy, mark: 'HA', tone: 'rose' },
  { title: 'Gold Trophy', event: 'QCFI 2024', project: 'SHIVA · Voice Task Assistant', icon: Award, mark: 'QCFI', tone: 'gold' },
  { title: 'Winner', event: 'HackFest Innov8 TMRW 2026', project: 'Innovation & technical excellence', icon: Star, mark: 'HF', tone: 'violet' },
  { title: 'Winner', event: 'VIT CESA-VIT', project: 'Acuvera', icon: Trophy, mark: 'CESA', tone: 'blue' },
]

export const skills = [
  { category: 'Languages & backend', icon: Code2, items: ['Java', 'Python', 'Spring Boot', 'Django', 'REST APIs'] },
  { category: 'AI/ML & automation', icon: BrainCircuit, items: ['AI/ML', 'Gemini AI', 'NLP', 'Automation'] },
  { category: 'Frontend', icon: Layers3, items: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Data & tools', icon: Database, items: ['PostgreSQL', 'MySQL', 'SQLite', 'Git', 'GitHub Actions'] },
  { category: 'Developer tools', icon: Wrench, items: ['Power BI', 'Terminal'] },
]
