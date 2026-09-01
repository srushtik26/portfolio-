import { motion } from 'framer-motion'
import { Briefcase, Code, Trophy, Calendar } from 'lucide-react'
import Section from './Section'

const Timeline = () => {
  const timelineEvents = [
    {
      date: 'Aug 2026 - Present',
      title: 'AI Automation Intern',
      company: 'Plutus Wealth Management LLP',
      description: 'Building an automated investment news pipeline with AI classification and multi-channel delivery.',
      icon: Briefcase,
      color: 'from-indigo-500 to-blue-500',
    },
    {
      date: 'Jan 2026 - Jul 2026',
      title: 'SMOP Intern (Java)',
      company: 'Bombay Stock Exchange (BSE)',
      description: 'Built Java backend components for derivatives market processing and production data validation in a FinTech environment.',
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      date: '2025',
      title: '1st Place - HackAura 2025',
      company: 'Wolftor AI STEM Tutor',
      description: 'Built an intelligent tutoring system that won first place in the competition.',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      date: '2025',
      title: 'Gold Trophy - QCFI',
      company: 'SHIVA Voice Assistant',
      description: 'Developed a voice-powered task management assistant that received gold recognition.',
      icon: Trophy,
      color: 'from-amber-500 to-yellow-500',
    },
    {
      date: '2025',
      title: 'Winner - Technocrats Hackathon',
      company: 'JobSphere: Revolutionize Your Job Search',
      description: 'Secured top position in competitive hackathon with innovative solutions.',
      icon: Code,
      color: 'from-purple-500 to-pink-500',
    },
    // {
    //   date: '2024 - 2025',
    //   title: 'Personal Finance Tracker',
    //   company: 'Power BI Dashboard',
    //   description: 'Created comprehensive financial analytics dashboard with data visualization.',
    //   icon: Code,
    //   color: 'from-green-500 to-teal-500',
    // },
  ]

  return (
    <Section id="timeline" className="bg-dark-secondary/50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient text-center mb-16">
            Timeline
          </h2>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue via-accent-purple to-accent-blue md:-translate-x-1/2 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-start gap-6 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    {index === 0 && (
                      <motion.div
                        className="absolute inset-[-10px] rounded-full border border-accent-blue/60"
                        animate={{ scale: [1, 1.4, 1.7], opacity: [0.6, 0.25, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                    <motion.div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <event.icon className="text-white" size={24} />
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <motion.div
                    className={`flex-1 glass rounded-xl p-6 border border-white/10 hover:border-accent-purple/30 transition-all duration-300 ${
                      index % 2 === 0 ? 'md:mr-auto md:max-w-[45%]' : 'md:ml-auto md:max-w-[45%]'
                    }`}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm">
                      <Calendar size={16} />
                      <span>{event.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gradient transition-all">
                      {event.title}
                    </h3>
                    <p className="text-accent-blue font-semibold mb-2">{event.company}</p>
                    <p className="text-gray-400 leading-relaxed text-sm">{event.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

export default Timeline