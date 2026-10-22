import { useEffect, useState } from 'react'

const photos = [
  { src: '/assets/image/about/srushti-cafe.webp', alt: 'Srushti at a cafe', position: 'center 38%' },
  { src: '/assets/image/about/srushti-celebration.webp', alt: 'Srushti dressed for a celebration', position: 'center 33%' },
  { src: '/assets/image/about/srushti-portrait.webp', alt: 'Srushti smiling for a portrait', position: 'center 32%' },
  { src: '/assets/image/meee.jpeg', alt: 'Srushti, portrait photo', position: 'center 37%' },
]

function AboutPortrait() {
  const [activePhoto, setActivePhoto] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!document.hidden) {
        setActivePhoto((current) => (current + 1) % photos.length)
      }
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div
      className="portrait-frame"
      role="img"
      aria-label="Photos of Srushti"
    >
      <div className="portrait-slides">
        {photos.map((photo, index) => (
          <img
            className={`portrait-slide${index === activePhoto ? ' is-active' : ''}`}
            key={photo.src}
            src={photo.src}
            alt={index === activePhoto ? photo.alt : ''}
            aria-hidden={index !== activePhoto}
            style={{ objectPosition: photo.position }}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
      </div>
      <span className="portrait-corner" aria-hidden="true" />
    </div>
  )
}

export default AboutPortrait
