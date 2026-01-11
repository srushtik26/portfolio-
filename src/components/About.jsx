import { motion } from 'framer-motion'
import Section from './Section'

const About = () => {
  return (
    <Section id="about">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient text-center mb-12">
              About Me
            </h2>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
              {/* Profile Image */}
              <motion.div
                className="flex-shrink-0 w-full sm:w-80 lg:w-96"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative group">
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue/20 via-accent-purple/20 to-accent-blue/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"></div>
                  {/* Image with premium hover effects */}
                  <img
                    src="/assets/image/meee.jpeg"
                    alt="Srushti Kadam"
                    className="profile-image relative w-full h-auto rounded-2xl object-cover group-hover:scale-[1.05] group-hover:shadow-2xl group-hover:shadow-accent-purple/40"
                  />
                </div>
              </motion.div>

              {/* About Text */}
              <div className="flex-1 glass rounded-2xl p-8 md:p-12 border border-white/10">
                <motion.p
                  className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                Hi, I’m a Software Engineer who gets way too excited when a bug finally disappears.
                 I started with Java, fell in love with problem-solving, and somehow ended up enjoying 
                 both backend logic and frontend polish. Curiosity is my default mode, and breaking
                  things (then fixing them) is how I learn best.
                </motion.p>

                <motion.p
                  className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                I like turning wild ideas into working, shippable products.
                Think AI-powered tools that win hackathons, voice assistants that actually listen,
                 and financial dashboards that make numbers make sense.
                Currently interning at the Bombay Stock Exchange, where I help build systems that 
                handle millions of transactions daily — aka code where mistakes are ✨not✨ allowed.
                                </motion.p>

                <motion.p
                  className="text-lg md:text-xl text-gray-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
              When I’m not coding, I’m probably exploring a new framework, diving into DSA, or obsessing over FinTech, 
              frontend trends, and AI — always learning, building, and trying not to break production 🚀
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

export default About