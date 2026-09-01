import { motion, useMotionValue, useSpring } from 'framer-motion'
import Section from './Section'

const About = () => {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 160, damping: 18 })
  const springY = useSpring(rotateY, { stiffness: 160, damping: 18 })

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    rotateX.set(y * 10)
    rotateY.set(x * 12)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <Section id="about">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient text-center mb-12">
              About Me
            </h2>
            <motion.div
              className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue mb-12"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ originX: 0.5 }}
            />

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
              {/* Profile Image */}
              <motion.div
                className="flex-shrink-0 w-full sm:w-80 lg:w-96"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="relative group"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ rotateX: springY, rotateY: springX, perspective: 1000 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-accent-blue/20 via-accent-purple/20 to-accent-blue/20 rounded-2xl blur-xl"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Image with premium hover effects */}
                  <img
                    src="/assets/image/meee.jpeg"
                    alt="Srushti Kadam"
                    className="profile-image relative w-full h-auto rounded-2xl object-cover group-hover:shadow-2xl group-hover:shadow-accent-purple/40"
                  />
                </motion.div>
              </motion.div>

              {/* About Text */}
              <div className="flex-1 glass rounded-2xl p-8 md:p-12 border border-white/10">
                <motion.p
                  className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Hi, I'm Srushti 👋 I write code the way some people solve puzzles — with a little too much enthusiasm and an unreasonable amount of joy when a stubborn bug finally gives up.
                </motion.p>

                <motion.p
                  className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Java was where it all started, and I've since grown comfortable moving between backend logic and frontend polish, depending on which one needs my attention that day. I hold a B.Tech with an AI/ML Honors specialization, which mostly means I've traded a lot of sleep for research papers over the years — a trade I don't regret. 🧠
                </motion.p>

                <motion.p
                  className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  My best work usually starts with 'I have an idea' and ends somewhere between 'why isn't this working' and 'okay, this actually works now.' Plans rarely survive contact with reality — and that's exactly what makes building fun.
                </motion.p>

                <motion.p
                  className="text-lg md:text-xl text-gray-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  When I'm not debugging, I'm working through DSA problems, exploring new frameworks, or already thinking about the next build. Always building, always learning. 🚀
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