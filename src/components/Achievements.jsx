import { motion } from 'framer-motion'
import { Trophy, Award, Medal } from 'lucide-react'
import Section from './Section'

const Achievements = () => {
  const achievements = [
    {
      title: '1st Place',
      event: 'HackAura 2025',
      description: 'Won first place for Wolftor — AI STEM Tutor project',
      icon: Trophy,
      color: 'from-yellow-400 to-orange-500',
      date: '2025',
    },
    {
      title: 'Gold Trophy',
      event: 'QCFI Competition',
      description: 'Achieved gold trophy for SHIVA — Voice Task Assistant',
      icon: Medal,
      color: 'from-amber-400 to-yellow-500',
      date: '2025',
    },
    {
      title: 'Winner',
      event: 'Technocrats Hackathon',
      description: 'Secured top position in competitive hackathon event',
      icon: Award,
      color: 'from-purple-400 to-pink-500',
      date: '2025',
    },
  ]

  return (
    <Section id="achievements">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient text-center mb-16">
            Achievements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.event}
                className="glass rounded-2xl p-8 border border-white/10 hover:border-accent-purple/30 transition-all duration-300 group text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.03 }}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <motion.div
                    className={`inline-flex p-4 rounded-full bg-gradient-to-br ${achievement.color} mb-6`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <achievement.icon className="text-white" size={32} />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                    {achievement.title}
                  </h3>
                  <p className="text-lg font-semibold text-accent-blue mb-3">
                    {achievement.event}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {achievement.description}
                  </p>
                  <span className="text-xs text-gray-500 font-medium">
                    {achievement.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

export default Achievements