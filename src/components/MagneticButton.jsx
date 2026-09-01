import { motion, useMotionValue, useSpring } from 'framer-motion'

const MagneticButton = ({ children, className = '', ...props }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 })

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const offsetX = event.clientX - (rect.left + rect.width / 2)
    const offsetY = event.clientY - (rect.top + rect.height / 2)

    const distance = Math.hypot(offsetX, offsetY)
    if (distance > 60) return

    x.set(offsetX * 0.3)
    y.set(offsetY * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <button className={className} {...props}>
        {children}
      </button>
    </motion.div>
  )
}

export default MagneticButton
