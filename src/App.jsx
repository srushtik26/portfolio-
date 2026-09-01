import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import FeaturedExperience from './components/FeaturedExperience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'

function App() {
  const { scrollYProgress } = useScroll()
  const progressBarScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.25,
  })

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const element = document.querySelector(href)
        if (element) {
          const offsetTop = element.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return (
    <div className="min-h-screen bg-dark">
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-accent-blue to-accent-purple"
        style={{ scaleX: progressBarScale }}
      />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <FeaturedExperience />
        <Projects />
        <Skills />
        <Achievements />
        <Timeline />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-20">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Srushti Kadam. Built with React, Tailwind CSS & Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App