import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Github, Linkedin, Mail, MessageCircle } from 'lucide-react'
import Section from './Section'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

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
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus(null)
      }, 3000)
    }, 1000)
  }

  return (
    <Section id="contact">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 focus:ring-2 focus:ring-accent-purple/20 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 focus:ring-2 focus:ring-accent-purple/20 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 focus:ring-2 focus:ring-accent-purple/20 transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg font-semibold shadow-lg shadow-accent-purple/50 hover:shadow-xl hover:shadow-accent-purple/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
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
                      href="https://linkedin.com"
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
                      href="https://github.com"
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
                      href="mailto:srushti@example.com"
                      className="flex items-center gap-4 p-4 glass rounded-lg border border-white/10 hover:border-accent-blue/50 transition-all duration-300 group"
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      <div className="p-2 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                        <Mail className="text-cyan-400" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Email</p>
                        <p className="text-sm text-gray-400">srushti@example.com</p>
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