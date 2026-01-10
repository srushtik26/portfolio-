import { motion } from 'framer-motion'
import Section from './Section'

const About = () => {
  return (
    <Section id="about">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient text-center mb-12">
              About Me
            </h2>

            <div className="glass rounded-2xl p-8 md:p-12 border border-white/10">
              <motion.p
                className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                I'm a passionate Software Engineer with a strong foundation in Java development
                and a growing expertise in frontend technologies. Currently interning at the Bombay
                Stock Exchange, I'm working on critical financial systems that process millions of
                transactions daily, which has taught me the importance of writing robust, scalable,
                and performant code.
              </motion.p>

              <motion.p
                className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                My journey in tech has been driven by curiosity and a desire to solve real-world
                problems. From building AI-powered educational tools that won hackathons to
                developing voice assistants and financial analytics dashboards, I enjoy the
                challenge of turning complex ideas into elegant, user-friendly solutions.
              </motion.p>

              <motion.p
                className="text-lg md:text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                When I'm not coding, you'll find me exploring new frameworks, contributing to
                open-source projects, or diving deep into algorithms and data structures. I believe
                in continuous learning and staying updated with the latest industry trends, whether
                it's FinTech innovations, modern frontend patterns, or cutting-edge AI technologies.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

export default About