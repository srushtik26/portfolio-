import { motion } from 'framer-motion'
import {
  Code2,
  Database,
  Layers,
  Brain,
  Server,
  Zap,
  Terminal,
  GitBranch,
} from 'lucide-react'
import Section from './Section'

const Skills = () => {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', icon: Code2, color: 'from-blue-400 to-cyan-400' },
        { name: 'Tailwind CSS', icon: Layers, color: 'from-cyan-400 to-teal-400' },
        { name: 'JavaScript', icon: Code2, color: 'from-yellow-400 to-orange-400' },
        { name: 'TypeScript', icon: Code2, color: 'from-blue-500 to-indigo-500' },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Java', icon: Server, color: 'from-orange-400 to-red-400' },
        { name: 'Spring Boot', icon: Server, color: 'from-green-400 to-emerald-400' },
        { name: 'Django', icon: Server, color: 'from-green-500 to-teal-500' },
        { name: 'Python', icon: Code2, color: 'from-yellow-400 to-blue-400' },
        { name: 'REST APIs', icon: Server, color: 'from-sky-400 to-cyan-400' },
      ],
    },
    {
      category: 'Database & Tools',
      skills: [
        { name: 'MySQL', icon: Database, color: 'from-blue-400 to-indigo-400' },
        { name: 'SQLite', icon: Database, color: 'from-green-400 to-emerald-400' },
        { name: 'Git', icon: GitBranch, color: 'from-orange-400 to-red-400' },
        { name: 'GitHub Actions', icon: Zap, color: 'from-violet-400 to-purple-500' },
        { name: 'Power BI', icon: Zap, color: 'from-yellow-400 to-amber-400' },
        { name: 'Terminal', icon: Terminal, color: 'from-gray-400 to-gray-600' },
      ],
    },
    {
      category: 'Algorithms & AI',
      skills: [
        { name: 'DSA', icon: Brain, color: 'from-purple-400 to-pink-400' },
        { name: 'AI/ML Tools', icon: Brain, color: 'from-indigo-400 to-purple-400' },
      ],
    },
  ]

  return (
    <Section id="skills" className="bg-dark-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient text-center mb-16">
            Skills & Technologies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-6">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="glass rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300 group cursor-pointer"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 15,
                        delay: index * 0.08,
                      }}
                      whileHover={{ y: -5, scale: 1.05 }}
                    >
                      <div className="flex flex-col items-center gap-3 min-w-[100px]">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-br ${skill.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                        >
                          <skill.icon className="text-white" size={24} />
                        </div>
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors text-center">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
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

export default Skills