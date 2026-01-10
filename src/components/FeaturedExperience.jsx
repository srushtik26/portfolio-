import { motion } from 'framer-motion'
import { Calendar, MapPin, Briefcase } from 'lucide-react'
import Section from './Section'

const FeaturedExperience = () => {
  return (
    <Section id="experience" className="bg-dark-secondary/50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient text-center mb-12">
            Featured Experience
          </h2>

          <motion.div
            className="glass rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10 hover:border-accent-purple/30 transition-all duration-300 group"
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                  Bombay Stock Exchange (BSE)
                </h3>
                <p className="text-lg text-accent-blue font-semibold">
                  Software Engineering Intern
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Briefcase size={20} />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mb-6 text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>Jan 2026 – Jun 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>Mumbai, India</span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed text-lg">
              Contributing to critical financial systems and infrastructure at India's premier stock exchange.
              Working on high-performance applications, optimizing trading platforms, and implementing
              robust solutions for real-time data processing in a mission-critical FinTech environment.
              Gaining hands-on experience with enterprise Java development, microservices architecture,
              and financial market technologies.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Java', 'Spring Boot', 'Microservices', 'FinTech', 'SQL'].map((tech) => (
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
        </motion.div>
      </div>
    </Section>
  )
}

export default FeaturedExperience