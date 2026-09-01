import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import MagneticButton from './MagneticButton'

const useTypewriter = (words, typingSpeed = 100, deletingSpeed = 60, pauseMs = 1200) => {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const activeWord = words[wordIndex % words.length]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const nextText = activeWord.slice(0, text.length + 1)
        setText(nextText)

        if (nextText === activeWord) {
          setIsDeleting(true)
        }
      } else {
        const nextText = activeWord.slice(0, text.length - 1)
        setText(nextText)

        if (nextText === '') {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? deletingSpeed : text === activeWord ? pauseMs : typingSpeed)

    return () => clearTimeout(timeout)
  }, [deletingSpeed, isDeleting, pauseMs, text, typingSpeed, wordIndex, words])

  return { text, isDeleting }
}

const Hero = () => {
  const prefersReducedMotion = useReducedMotion()
  const { text: typingText, isDeleting } = useTypewriter(
    ['Software Engineer', 'AI Automation Builder', 'Hackathon Winner'],
    90,
    50,
    1000,
  )

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                }
          }
          transition={{
            duration: 20,
            repeat: prefersReducedMotion ? 0 : Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, -100, 0],
                  y: [0, 50, 0],
                }
          }
          transition={{
            duration: 25,
            repeat: prefersReducedMotion ? 0 : Infinity,
            ease: 'easeInOut',
          }}
        />
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-20 right-16 w-80 h-80 bg-accent-blue/10 rounded-full blur-3xl"
              animate={{ x: [0, 30, -25, 0], y: [0, -40, 25, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-12 left-16 w-72 h-72 bg-accent-purple/10 rounded-full blur-3xl"
              animate={{ x: [0, -35, 20, 0], y: [0, 30, -20, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hi, I'm{' '}
              <motion.span
                className="text-gradient inline-block"
                style={{ backgroundSize: '200% 200%' }}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
                }
                transition={{
                  duration: 8,
                  repeat: prefersReducedMotion ? 0 : Infinity,
                  ease: 'linear',
                }}
              >
                Srushti Kadam
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-gray-400 mb-4 font-medium h-[3rem] md:h-[4rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span>{typingText}</span>
              {!prefersReducedMotion && (
                <motion.span
                  className="inline-block w-[2px] h-[1.1em] bg-accent-blue align-middle ml-1"
                  animate={{ opacity: [1, 1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </motion.p>

            <motion.p
              className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Building innovative solutions with a passion for clean code,
              elegant design, and impactful technology.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <MagneticButton
                type="button"
                onClick={() => scrollToSection('#projects')}
                className="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg font-semibold shadow-lg shadow-accent-purple/50 hover:shadow-xl hover:shadow-accent-purple/60 transition-all duration-300"
              >
                View Work
              </MagneticButton>
              <MagneticButton
                type="button"
                onClick={() => scrollToSection('#contact')}
                className="px-8 py-4 glass text-white rounded-lg font-semibold border border-white/20 hover:border-accent-purple/50 transition-all duration-300"
              >
                Contact
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-6 justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.a
                href="https://github.com/srushtik26"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-blue transition-colors"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/srushti-kadam-838685259/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-blue transition-colors"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="mailto:srushtikadam26.sk@gmail.com"
                className="text-gray-400 hover:text-accent-blue transition-colors"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={24} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: prefersReducedMotion ? 0 : Infinity }}
        >
          <motion.button
            onClick={() => scrollToSection('#about')}
            className="text-gray-500 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowDown size={32} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero