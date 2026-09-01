import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

const CustomCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springX = useSpring(mouseX, { stiffness: 400, damping: 28, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28, mass: 0.5 })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')

    const updatePointerSupport = () => {
      setIsDesktop(mediaQuery.matches)
    }

    updatePointerSupport()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePointerSupport)
      return () => mediaQuery.removeEventListener('change', updatePointerSupport)
    }

    mediaQuery.addListener(updatePointerSupport)
    return () => mediaQuery.removeListener(updatePointerSupport)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const handlePointerMove = (event) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }

    const handlePointerOver = (event) => {
      if (event.target.closest('a, button')) {
        setIsHoveringInteractive(true)
      }
    }

    const handlePointerOut = (event) => {
      if (event.target.closest('a, button')) {
        setIsHoveringInteractive(false)
      }
    }

    window.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerover', handlePointerOver)
    document.addEventListener('pointerout', handlePointerOut)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerout', handlePointerOut)
    }
  }, [isDesktop, mouseX, mouseY])

  if (!isDesktop) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        className="h-3 w-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple shadow-[0_0_18px_rgba(59,130,246,0.7)]"
        animate={{
          scale: isHoveringInteractive ? 2.5 : 1,
          opacity: isHoveringInteractive ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
      />
    </motion.div>
  )
}

export default CustomCursor
