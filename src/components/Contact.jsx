import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Send, Github, Linkedin, Mail, MessageCircle, Check } from 'lucide-react'
import Section from './Section'
import MagneticButton from './MagneticButton'

const Contact = () => {
  const submitButtonRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [showSuccessState, setShowSuccessState] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setShowSuccessState(true)
      setFormData({ name: '', email: '', message: '' })

      if (submitButtonRef.current) {
        const rect = submitButtonRef.current.getBoundingClientRect()
        const originX = (rect.left + rect.width / 2) / window.innerWidth
        const originY = (rect.top + rect.height / 2) / window.innerHeight

        confetti({
          particleCount: 90,
          spread: 65,
          origin: { x: originX, y: originY },
          colors: ['#60a5fa', '#a78bfa', '#f0abfc', '#ffffff'],
        })
      }

      setTimeout(() => {
        setShowSuccessState(false)
        setSubmitStatus(null)
      }, 2000)
    }, 1000)
  }

  return (
    <Section id="contact">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient text-center mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-400 text-center mb-12 text-lg">
              I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 border border-white/10 space-y-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="peer w-full px-4 pt-6 pb-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-accent-purple/50 focus:ring-2 focus:ring-accent-purple/20 transition-all"
                  />
                  <label
                    htmlFor="name"
                    className={`pointer-events-none absolute left-4 top-3 text-gray-400 transition-all duration-200 ${
                      formData.name ? 'top-2 text-xs text-accent-blue' : 'peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent-blue'
                    }`}
                  >
                    Name
                  </label>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-accent-blue to-accent-purple origin-left scale-x-0 transition-transform duration-300 peer-focus:scale-x-100" />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="peer w-full px-4 pt-6 pb-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-accent-purple/50 focus:ring-2 focus:ring-accent-purple/20 transition-all"
                  />
                  <label
                    htmlFor="email"
                    className={`pointer-events-none absolute left-4 top-3 text-gray-400 transition-all duration-200 ${
                      formData.email ? 'top-2 text-xs text-accent-blue' : 'peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent-blue'
                    }`}
                  >
                    Email
                  </label>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-accent-blue to-accent-purple origin-left scale-x-0 transition-transform duration-300 peer-focus:scale-x-100" />
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder=" "
                    className="peer w-full px-4 pt-6 pb-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-accent-purple/50 focus:ring-2 focus:ring-accent-purple/20 transition-all resize-none"
                  />
                  <label
                    htmlFor="message"
                    className={`pointer-events-none absolute left-4 top-3 text-gray-400 transition-all duration-200 ${
                      formData.message ? 'top-2 text-xs text-accent-blue' : 'peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent-blue'
                    }`}
                  >
                    Message
                  </label>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-accent-blue to-accent-purple origin-left scale-x-0 transition-transform duration-300 peer-focus:scale-x-100" />
                </div>

                <div ref={submitButtonRef}>
                  {showSuccessState ? (
                    <motion.div
                      className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-semibold shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <motion.svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                      >
                        <motion.path d="M5 12.5l4.2 4.2L19 2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                      </motion.svg>
                      Sent!
                    </motion.div>
                  ) : (
                    <MagneticButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg font-semibold shadow-lg shadow-accent-purple/50 hover:shadow-xl hover:shadow-accent-purple/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                        </>
                      )}
                    </MagneticButton>
                  )}
                </div>

                {submitStatus === 'success' && !showSuccessState && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-sm text-center"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.p>
                )}
              </motion.form>

              {/* Social Links & Info */}
              <motion.div
                className="flex flex-col justify-center space-y-8"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="glass rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <MessageCircle size={24} className="text-accent-blue" />
                    Let's Connect
                  </h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    Feel free to reach out through any of these platforms. I'm always interested in
                    hearing about new opportunities and interesting projects.
                  </p>

                  <div className="space-y-4">
                    <motion.a
                      href="https://www.linkedin.com/in/srushti-kadam-838685259/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 glass rounded-lg border border-white/10 hover:border-accent-blue/50 transition-all duration-300 group"
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                        <Linkedin className="text-blue-400" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">LinkedIn</p>
                        <p className="text-sm text-gray-400">Connect professionally</p>
                      </div>
                    </motion.a>

                    <motion.a
                      href="https://github.com/srushtik26"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 glass rounded-lg border border-white/10 hover:border-accent-purple/50 transition-all duration-300 group"
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                        <Github className="text-purple-400" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">GitHub</p>
                        <p className="text-sm text-gray-400">View my code</p>
                      </div>
                    </motion.a>

                    <motion.a
                      href="mailto:srushtikadam26.sk@gmail.com"
                      className="flex items-center gap-4 p-4 glass rounded-lg border border-white/10 hover:border-accent-blue/50 transition-all duration-300 group"
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      <div className="p-2 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                        <Mail className="text-cyan-400" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Email</p>
                        <p className="text-sm text-gray-400">srushtikadam26.sk@gmail.com</p>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

export default Contact