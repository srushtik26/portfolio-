import { motion } from 'framer-motion'
import { Calendar, MapPin, Briefcase } from 'lucide-react'
import Section from './Section'

const FeaturedExperience = () => {
  const experiences = [
    {
      company: 'Plutus Wealth Management LLP',
      role: 'AI Automation Intern',
      dates: 'Aug 2026 – Present',
      location: 'Mumbai, India',
      description:
        'Built and deployed "Plutus Morning News," a production Python pipeline that scrapes, classifies, and delivers a daily 5+5 investment news briefing via Gmail and WhatsApp, fully automated on GitHub Actions. Designed a multi-stage content quality architecture combining Gemini AI classification, SerpAPI cross-source corroboration, and SQLite deduplication. Implemented a 20-check validation engine and owns end-to-end scheduling, delivery, and error handling for a live daily-run system used by the investment team.',
      tech: ['Python', 'Gemini AI', 'SerpAPI', 'SQLite', 'GitHub Actions', 'Gmail API'],
    },
    {
      company: 'Bombay Stock Exchange (BSE)',
      role: 'SMOP Intern (Java)',
      dates: 'Jan 2026 – Jul 2026',
      location: 'Mumbai, India',
      description:
        'Built Java backend components for processing Derivatives market data, implementing business logic for Futures and Options contracts including expiry, strike price, and symbol resolution. Validated and processed uploaded market data files end-to-end into production databases. Debugged and resolved data-processing issues across real trading system workflows.',
      tech: ['Java', 'Spring Boot', 'SQL', 'FinTech'],
    },
  ]

  return (
    <Section id="experience" className="bg-dark-secondary/50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient text-center mb-12">
            Featured Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.company}
                className="glass rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10 hover:border-accent-purple/30 transition-all duration-300 group"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                      {experience.company}
                    </h3>
                    <p className="text-lg text-accent-blue font-semibold">
                      {experience.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Briefcase size={20} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 mb-6 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{experience.dates}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>{experience.location}</span>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed text-lg">
                  {experience.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {experience.tech.map((tech) => (
                    <motion.span
                      key={tech}
                      className="px-4 py-2 bg-accent-blue/10 border border-accent-blue/30 rounded-full text-sm text-accent-blue font-medium"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

export default FeaturedExperience