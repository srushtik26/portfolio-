import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { ExternalLink, Github, Trophy, Award } from 'lucide-react'
import Section from './Section'

const Projects = () => {
  const projects = [
    {
      title: 'Plutus Morning News (Investment News Briefing)',
      description:
        'Automated daily investment news pipeline delivering a curated 5 domestic + 5 global briefing via Gmail and WhatsApp. Uses AI-based classification and cross-source corroboration to reduce noise, plus a 20-point validation and deduplication engine to maintain signal quality across daily runs.',
      tech: ['Python', 'Gemini AI', 'SerpAPI', 'SQLite', 'GitHub Actions'],
      github: 'https://github.com/srushtik26/investment-news-briefing',
      demo: null,
      award: null,
      icon: null,
      iconColor: '',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'AI Stock Prediction',
      description:
        'Predicts next-day stock price movement using historical OHLCV data and technical indicators, leveraging a Python-based ML workflow to detect short-term trend and momentum signals.',
      tech: ['Python', 'Scikit-learn'],
      github: 'https://github.com/srushtik26/[repo-name]',
      demo: null,
      award: null,
      icon: null,
      iconColor: '',
      color: 'from-indigo-500 to-violet-500',
      status: 'In Progress',
    },
    {
      title: 'Wolftor — AI STEM Tutor',
      description:
        'An intelligent tutoring system leveraging AI to provide personalized STEM education. Features adaptive learning paths, real-time problem solving, and comprehensive analytics.',
      tech: ['Python', 'AI/ML', 'React', 'FastAPI'],
      github: 'https://github.com/Sparky17561/CodeCrusaders_OpenInnovation?tab=readme-ov-file',
      demo: 'https://wolftor.vercel.app/',
      award: '1st Place HackAura 2025',
      icon: Trophy,
      iconColor: 'text-yellow-400',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'SHIVA — Voice Task Assistant',
      description:
        'A sophisticated voice-powered task management assistant with natural language processing. Enables hands-free productivity through intelligent voice commands and context awareness.',
      tech: ['Python', 'NLP', 'Voice Recognition'],
      github: 'https://github.com/srushtik26/SHIVA',
      demo: 'https://wolftor.vercel.app/',
      award: 'Gold Trophy QCFI',
      icon: Award,
      iconColor: 'text-purple-400',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'SkillSync is a MERN-stack peer skill exchange platform',
      description:
        'A peer-to-peer skill exchange platform built with MERN stack. Matches users based on skills they offer and want to learn. Includes JWT authentication, protected routes, auto-matching logic, and a Vite-powered React frontend.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/srushtik26/SkillSync-Peer-Skill-Exchange-Platform',
      demo: 'https://wolftor.vercel.app/',
      award: null,
      icon: null,
      iconColor: '',
      color: 'from-blue-500 to-cyan-500',
    },
  ]

  return (
    <Section id="projects">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient text-center mb-16">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const rotateX = useMotionValue(0)
              const rotateY = useMotionValue(0)
              const spotlightX = useMotionValue(50)
              const spotlightY = useMotionValue(50)
              const springX = useSpring(rotateX, { stiffness: 160, damping: 18, mass: 0.8 })
              const springY = useSpring(rotateY, { stiffness: 160, damping: 18, mass: 0.8 })
              const spotlightBackground = useMotionTemplate`radial-gradient(circle at ${spotlightX}% ${spotlightY}%, rgba(96, 165, 250, 0.22), rgba(139, 92, 246, 0.1) 18%, transparent 42%)`

              const handleMouseMove = (event) => {
                const rect = event.currentTarget.getBoundingClientRect()
                const x = (event.clientX - rect.left) / rect.width
                const y = (event.clientY - rect.top) / rect.height

                rotateX.set((0.5 - y) * 12)
                rotateY.set((x - 0.5) * 14)
                spotlightX.set(x * 100)
                spotlightY.set(y * 100)
              }

              const handleMouseLeave = () => {
                rotateX.set(0)
                rotateY.set(0)
                spotlightX.set(50)
                spotlightY.set(50)
              }

              return (
                <motion.div
                  key={project.title}
                  className="glass rounded-2xl p-6 border border-white/10 hover:border-accent-purple/30 transition-all duration-300 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: spotlightBackground }}
                  />

                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                          {project.title}
                        </h3>
                        {project.status && (
                          <span className="mt-2 inline-flex items-center rounded-full border border-amber-400/40 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-300">
                            {project.status}
                          </span>
                        )}
                      </div>
                      {project.icon && (
                        <project.icon
                          className={`${project.iconColor} flex-shrink-0 ml-2`}
                          size={24}
                        />
                      )}
                    </div>

                    {project.award && (
                      <div className="flex items-center gap-2 mb-4">
                        {project.icon && (
                          <project.icon
                            className={project.iconColor}
                            size={18}
                          />
                        )}
                        <span className="text-sm font-semibold text-gradient">
                          {project.award}
                        </span>
                      </div>
                    )}

                    <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 font-medium"
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: index * 0.1 + techIndex * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-accent-blue transition-colors text-sm font-medium"
                        whileHover={{ x: 5 }}
                      >
                        <Github size={18} />
                        Code
                      </motion.a>
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-400 hover:text-accent-purple transition-colors text-sm font-medium"
                          whileHover={{ x: 5 }}
                        >
                          <ExternalLink size={18} />
                          Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

export default Projects