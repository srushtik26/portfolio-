import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function HeroScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas?.parentElement
    if (!canvas || !container) return undefined

    let renderer
    let frameId = 0
    let isVisible = false
    let isDisposed = false
    let lastFrame = 0
    const resources = { geometries: new Set(), materials: new Set(), textures: new Set() }
    const pointerTarget = new THREE.Vector2()
    const pointerCurrent = new THREE.Vector2()
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30)
    camera.position.set(0, 0.05, 8.5)

    const remember = (geometry, material) => {
      resources.geometries.add(geometry)
      if (Array.isArray(material)) material.forEach((entry) => resources.materials.add(entry))
      else resources.materials.add(material)
    }

    const material = (color, options = {}) => new THREE.MeshStandardMaterial({
      color,
      roughness: 0.68,
      metalness: 0.04,
      ...options,
    })

    const mesh = (parent, geometry, surface, position, scale, rotation) => {
      remember(geometry, surface)
      const object = new THREE.Mesh(geometry, surface)
      object.position.set(...position)
      if (scale) object.scale.set(...scale)
      if (rotation) object.rotation.set(...rotation)
      parent.add(object)
      return object
    }

    const box = (parent, surface, position, size, rotation) => (
      mesh(parent, new THREE.BoxGeometry(...size), surface, position, null, rotation)
    )

    const sphere = (parent, surface, position, scale, segments = 24) => (
      mesh(parent, new THREE.SphereGeometry(1, segments, Math.max(12, Math.floor(segments * 0.72))), surface, position, scale)
    )

    const cylinderBetween = (parent, surface, start, end, radiusTop, radiusBottom = radiusTop, radialSegments = 14) => {
      const direction = new THREE.Vector3(...end).sub(new THREE.Vector3(...start))
      const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, direction.length(), radialSegments)
      const object = mesh(
        parent,
        geometry,
        surface,
        new THREE.Vector3(...start).add(new THREE.Vector3(...end)).multiplyScalar(0.5).toArray(),
      )
      object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())
      return object
    }

    const makeScreenTexture = (index) => {
      const screen = document.createElement('canvas')
      screen.width = 512
      screen.height = 320
      const context = screen.getContext('2d')
      if (!context) return null

      context.fillStyle = '#11101b'
      context.fillRect(0, 0, 512, 320)
      context.fillStyle = '#191724'
      context.fillRect(0, 0, 512, 34)
      context.fillStyle = '#ff73b5'
      context.beginPath()
      context.arc(17, 17, 4, 0, Math.PI * 2)
      context.fill()
      context.fillStyle = '#e6dce9'
      context.font = '11px monospace'
      context.fillText(index === 1 ? 'srushti.dev  /  workspace' : 'project  /  source files', 31, 21)
      context.fillStyle = '#211c2a'
      context.fillRect(0, 34, 112, 286)
      context.fillStyle = '#897895'
      context.font = '9px monospace'
      context.fillText('EXPLORER', 14, 54)
      const files = ['src', 'components', 'activity.jsx', 'dashboard.tsx', 'styles.css', 'README.md']
      files.forEach((file, line) => {
        const y = 76 + line * 25
        if (line === (index + 1) % files.length) {
          context.fillStyle = '#3b263d'
          context.fillRect(7, y - 12, 99, 19)
        }
        context.fillStyle = line % 3 === 0 ? '#f286be' : line % 3 === 1 ? '#b59ae4' : '#91cbbd'
        context.fillText(file, 15 + (line % 2) * 7, y)
      })

      const palette = ['#e482b4', '#91c7c8', '#b39be2', '#d8c1e5', '#8cb998']
      for (let line = 0; line < 13; line += 1) {
        const y = 61 + line * 19
        const indent = line % 4 === 0 ? 0 : line % 3 === 0 ? 46 : 25
        const width = 84 + ((line * 37 + index * 29) % 145)
        context.fillStyle = '#52465b'
        context.fillRect(132 + indent, y, 17, 3)
        context.fillStyle = palette[(line + index) % palette.length]
        context.fillRect(155 + indent, y, Math.min(width, 512 - (155 + indent) - 16), 3)
        if (line % 3 !== 1) {
          context.fillStyle = '#76657d'
          context.fillRect(161 + indent + width * 0.44, y + 7, Math.max(30, width * 0.37), 2)
        }
      }

      context.fillStyle = '#191522'
      context.fillRect(112, 294, 400, 26)
      context.fillStyle = '#a283a4'
      context.font = '8px monospace'
      context.fillText('PROBLEMS   0     OUTPUT   READY', 127, 310)

      const texture = new THREE.CanvasTexture(screen)
      texture.colorSpace = THREE.SRGBColorSpace
      resources.textures.add(texture)
      return texture
    }

    const screenSurface = (index) => {
      const texture = makeScreenTexture(index)
      return material('#ffffff', {
        map: texture || null,
        color: texture ? '#ffffff' : '#211729',
        emissive: '#39213a',
        emissiveIntensity: 0.32,
        roughness: 0.85,
        metalness: 0,
      })
    }

    const sceneLights = new THREE.Group()
    scene.add(sceneLights)
    scene.add(new THREE.AmbientLight('#ffd6e9', 1.65))

    const keyLight = new THREE.PointLight('#ff6cab', 24, 9, 2)
    keyLight.position.set(-2.2, 2, 3.2)
    scene.add(keyLight)

    const coolLight = new THREE.PointLight('#55c8ed', 18, 8, 2)
    coolLight.position.set(2.1, 1.4, -0.3)
    scene.add(coolLight)

    const faceLight = new THREE.PointLight('#ffb47e', 8, 4, 2)
    faceLight.position.set(0.3, 0.6, 2.8)
    scene.add(faceLight)

    const artwork = new THREE.Group()
    scene.add(artwork)

    const backdropCanvas = document.createElement('canvas')
    backdropCanvas.width = 512
    backdropCanvas.height = 512
    const backdropContext = backdropCanvas.getContext('2d')
    let backdropTexture = null
    if (backdropContext) {
      const gradient = backdropContext.createRadialGradient(256, 230, 22, 256, 256, 256)
      gradient.addColorStop(0, '#30213f')
      gradient.addColorStop(0.58, '#171529')
      gradient.addColorStop(1, '#0b0910')
      backdropContext.fillStyle = gradient
      backdropContext.fillRect(0, 0, 512, 512)
      for (let streak = 0; streak < 22; streak += 1) {
        const x = 22 + ((streak * 89) % 468)
        backdropContext.globalAlpha = streak % 4 === 0 ? 0.26 : 0.1
        backdropContext.fillStyle = streak % 3 === 0 ? '#f15cab' : '#58c8e9'
        backdropContext.fillRect(x, 0, streak % 4 === 0 ? 3 : 1, 512)
      }
      backdropContext.globalAlpha = 1
      backdropTexture = new THREE.CanvasTexture(backdropCanvas)
      backdropTexture.colorSpace = THREE.SRGBColorSpace
      resources.textures.add(backdropTexture)
    }

    const backdropMaterial = material('#ffffff', {
      map: backdropTexture,
      color: backdropTexture ? '#ffffff' : '#20172b',
      emissive: '#1d1024',
      emissiveIntensity: 0.32,
      side: THREE.DoubleSide,
      roughness: 1,
      metalness: 0,
    })
    mesh(artwork, new THREE.CircleGeometry(2.18, 72), backdropMaterial, [0, 0.05, -1.35], [1.12, 0.94, 1])

    const portalMaterial = material('#e975b4', {
      color: '#d35b9b',
      emissive: '#8e245f',
      emissiveIntensity: 1.25,
      roughness: 0.36,
      metalness: 0.15,
    })
    const portal = mesh(artwork, new THREE.TorusGeometry(2.05, 0.018, 8, 100), portalMaterial, [0, 0.06, -1.15], [1.12, 0.94, 1])
    portal.rotation.z = -0.12

    const furniture = new THREE.Group()
    artwork.add(furniture)
    const monitorFrame = material('#211c2b', { color: '#211c2b', metalness: 0.35, roughness: 0.4 })
    const frameHighlight = material('#64506b', { color: '#45344d', metalness: 0.48, roughness: 0.38 })
    const monitorStand = material('#332b3b', { color: '#302536', metalness: 0.48, roughness: 0.42 })
    const monitorIndicator = material('#82dfc8', { color: '#6bd3b5', emissive: '#40ccaa', emissiveIntensity: 1.4 })
    const monitors = new THREE.Group()
    furniture.add(monitors)

    const createMonitor = (index, position, size, rotation = 0) => {
      const group = new THREE.Group()
      group.position.set(...position)
      group.rotation.y = rotation
      monitors.add(group)
      box(group, monitorFrame, [0, 0, 0], [size[0] + 0.075, size[1] + 0.075, 0.1])
      box(group, frameHighlight, [0, 0, 0.054], [size[0] + 0.025, size[1] + 0.025, 0.018])
      mesh(group, new THREE.PlaneGeometry(...size), screenSurface(index), [0, 0, 0.066])
      box(group, monitorIndicator, [size[0] * 0.5 - 0.075, -size[1] * 0.5 - 0.027, 0.063], [0.025, 0.012, 0.008])
      box(group, monitorStand, [0, -size[1] * 0.5 - 0.12, -0.005], [0.09, 0.24, 0.08])
      box(group, monitorStand, [0, -size[1] * 0.5 - 0.24, 0.02], [0.48, 0.035, 0.25])
    }

    createMonitor(0, [-1.48, 0.42, -0.55], [1.19, 0.86], 0.19)
    createMonitor(1, [0, 0.59, -0.34], [1.34, 0.97])
    createMonitor(2, [1.48, 0.42, -0.55], [1.19, 0.86], -0.19)

    const chairMaterial = material('#17131e', { color: '#201726', roughness: 0.88 })
    const chairAccent = material('#713354', { color: '#65304f', emissive: '#37142c', emissiveIntensity: 0.45 })
    box(furniture, chairMaterial, [0, -0.43, -0.3], [0.83, 1.05, 0.18], [-0.08, 0, 0])
    box(furniture, chairAccent, [0, -0.15, -0.195], [0.54, 0.055, 0.025])
    box(furniture, chairMaterial, [0, -0.97, -0.05], [1.15, 0.14, 0.52])

    const deskMaterial = material('#30202e', { color: '#352332', metalness: 0.15, roughness: 0.46 })
    const deskEdge = material('#9f4a78', { color: '#773553', emissive: '#57183b', emissiveIntensity: 0.65 })
    const deskLegMaterial = material('#211a27', { color: '#241c29', metalness: 0.38, roughness: 0.5 })
    box(furniture, deskMaterial, [0, -1.12, 0.36], [4.15, 0.12, 1.05])
    box(furniture, deskEdge, [0, -1.055, 0.36], [4.08, 0.018, 1.01])
    box(furniture, deskLegMaterial, [-1.6, -1.48, 0.45], [0.12, 0.63, 0.14])
    box(furniture, deskLegMaterial, [1.6, -1.48, 0.45], [0.12, 0.63, 0.14])
    box(furniture, deskLegMaterial, [0, -1.73, 0.45], [3.28, 0.1, 0.14])

    const keyboardBase = material('#211c29', { color: '#241c2b', metalness: 0.2, roughness: 0.44 })
    const keyMaterial = material('#8d5b7d', { color: '#61405c', emissive: '#431a39', emissiveIntensity: 0.4 })
    box(furniture, keyboardBase, [0, -1.032, 0.73], [0.94, 0.035, 0.31], [-0.07, 0, 0])
    for (let row = 0; row < 3; row += 1) {
      const count = row === 2 ? 8 : 10
      for (let column = 0; column < count; column += 1) {
        const x = (column - (count - 1) / 2) * 0.083
        const z = 0.637 + row * 0.078
        box(furniture, keyMaterial, [x, -1.008, z], [0.061, 0.012, 0.046])
      }
    }
    box(furniture, keyMaterial, [0, -1.006, 0.872], [0.27, 0.014, 0.035])

    const mugMaterial = material('#572943', { color: '#54273e', metalness: 0.2, roughness: 0.26 })
    const mugAccent = material('#f37ab5', { color: '#ee6bac', emissive: '#b52f75', emissiveIntensity: 0.8 })
    mesh(furniture, new THREE.CylinderGeometry(0.12, 0.1, 0.24, 24), mugMaterial, [1.67, -0.93, 0.51])
    mesh(furniture, new THREE.TorusGeometry(0.075, 0.018, 8, 24), mugAccent, [1.79, -0.91, 0.51], [1, 1, 1], [0, Math.PI / 2, 0])

    const character = new THREE.Group()
    artwork.add(character)
    const hoodie = material('#34303f', { color: '#383343', roughness: 0.88 })
    const hoodieLight = material('#595164', { color: '#51495d', roughness: 0.8 })
    const seamMaterial = material('#c05f99', { color: '#a7477a', emissive: '#642042', emissiveIntensity: 0.45 })
    const skin = material('#e6a27d', { color: '#e1a07b', roughness: 0.78 })
    const skinShadow = material('#b96958', { color: '#c67b65', roughness: 0.82 })
    const hair = material('#17131d', { color: '#211a27', roughness: 0.48, metalness: 0.08 })
    const hairHighlight = material('#433044', { color: '#493449', roughness: 0.4, metalness: 0.08 })
    const dark = material('#17131a', { color: '#19141d', roughness: 0.54 })
    const eyeMaterial = material('#211822', { color: '#201820', roughness: 0.35 })
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: '#bc92c2',
      emissive: '#45234b',
      emissiveIntensity: 0.22,
      metalness: 0.45,
      roughness: 0.25,
      transparent: true,
      opacity: 0.24,
    })

    sphere(character, hoodie, [0, -0.4, 0.52], [0.54, 0.66, 0.37], 32)
    sphere(character, hoodieLight, [0, -0.06, 0.52], [0.52, 0.31, 0.37], 32)
    cylinderBetween(character, hoodie, [-0.29, -0.12, 0.52], [0.29, -0.12, 0.52], 0.035)
    box(character, seamMaterial, [0, -0.39, 0.89], [0.018, 0.51, 0.018])
    box(character, hoodieLight, [0.3, -0.48, 0.82], [0.14, 0.2, 0.065], [0, 0, -0.16])
    cylinderBetween(character, dark, [-0.45, -0.5, 0.28], [-0.69, -1.04, 0.55], 0.115, 0.145)
    cylinderBetween(character, dark, [0.45, -0.5, 0.28], [0.69, -1.04, 0.55], 0.115, 0.145)
    sphere(character, skin, [-0.69, -1.01, 0.62], [0.14, 0.07, 0.11])
    sphere(character, skin, [0.69, -1.01, 0.62], [0.14, 0.07, 0.11])

    const typingHands = new THREE.Group()
    character.add(typingHands)
    for (const side of [-1, 1]) {
      const handX = side * 0.28
      sphere(typingHands, skin, [handX, -1.005, 0.74], [0.16, 0.045, 0.072])
      for (let finger = 0; finger < 4; finger += 1) {
        const startX = handX + side * (finger - 1.5) * 0.037
        const start = [startX, -0.993, 0.74]
        const end = [startX + side * 0.01, -1.004, 0.87]
        cylinderBetween(typingHands, skin, start, end, 0.014, 0.011, 8)
      }
    }

    sphere(character, skin, [0, 0.04, 0.55], [0.18, 0.23, 0.18])
    const head = new THREE.Group()
    head.position.set(0, 0.57, 0.45)
    character.add(head)

    sphere(head, skin, [0, 0, 0], [0.38, 0.48, 0.34], 36)
    sphere(head, skinShadow, [0, -0.2, 0.245], [0.17, 0.11, 0.12])
    sphere(head, skin, [-0.37, -0.03, 0.02], [0.075, 0.12, 0.1])
    sphere(head, skin, [0.37, -0.03, 0.02], [0.075, 0.12, 0.1])
    sphere(head, skinShadow, [-0.393, -0.04, 0.089], [0.026, 0.041, 0.014])
    sphere(head, skinShadow, [0.393, -0.04, 0.089], [0.026, 0.041, 0.014])

    sphere(head, hair, [0, 0.24, -0.055], [0.43, 0.43, 0.35], 36)
    sphere(head, hair, [-0.16, 0.41, 0.02], [0.29, 0.2, 0.25], 32)
    sphere(head, hairHighlight, [0.08, 0.45, 0.06], [0.24, 0.13, 0.2], 28)
    sphere(head, hair, [-0.35, -0.03, -0.035], [0.16, 0.52, 0.21], 32)
    sphere(head, hair, [0.35, -0.02, -0.04], [0.16, 0.55, 0.21], 32)
    sphere(head, hairHighlight, [-0.38, -0.24, 0.01], [0.115, 0.32, 0.17], 24)
    sphere(head, hair, [0.37, -0.27, 0], [0.12, 0.34, 0.17], 24)
    sphere(head, hairHighlight, [-0.13, 0.37, 0.2], [0.06, 0.025, 0.018], 16)

    for (const eyeX of [-0.145, 0.145]) {
      sphere(head, skinShadow, [eyeX, 0.045, 0.292], [0.086, 0.055, 0.039], 20)
      sphere(head, eyeMaterial, [eyeX, 0.052, 0.321], [0.038, 0.039, 0.022], 20)
      sphere(head, material('#fff1e9', { color: '#fff0e6', roughness: 0.3 }), [eyeX - 0.009, 0.065, 0.34], [0.009, 0.009, 0.006], 12)
    }

    const glasses = material('#241b2a', { color: '#342337', metalness: 0.55, roughness: 0.28 })
    const glassTint = material('#bb83ad', {
      color: '#b984ac',
      emissive: '#3c1e3c',
      emissiveIntensity: 0.16,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      roughness: 0.2,
      metalness: 0.25,
    })
    for (const lensX of [-0.145, 0.145]) {
      mesh(head, new THREE.TorusGeometry(0.117, 0.012, 8, 36), glasses, [lensX, 0.055, 0.333])
      mesh(head, new THREE.CircleGeometry(0.103, 32), glassTint, [lensX, 0.055, 0.328])
    }
    cylinderBetween(head, glasses, [-0.028, 0.062, 0.337], [0.028, 0.062, 0.337], 0.011, 0.011, 8)
    cylinderBetween(head, glasses, [-0.26, 0.065, 0.29], [-0.36, 0.085, 0.19], 0.01, 0.009, 8)
    cylinderBetween(head, glasses, [0.26, 0.065, 0.29], [0.36, 0.085, 0.19], 0.01, 0.009, 8)

    const smileCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.08, -0.17, 0.327),
      new THREE.Vector3(0, -0.195, 0.343),
      new THREE.Vector3(0.08, -0.17, 0.327),
    ])
    mesh(head, new THREE.TubeGeometry(smileCurve, 12, 0.009, 6, false), skinShadow, [0, 0, 0])
    sphere(head, skinShadow, [0, -0.055, 0.337], [0.026, 0.034, 0.026], 16)
    sphere(head, material('#e59a91', { color: '#da918c', roughness: 0.88, transparent: true, opacity: 0.62 }), [-0.235, -0.1, 0.233], [0.07, 0.036, 0.014], 18)
    sphere(head, material('#e59a91', { color: '#da918c', roughness: 0.88, transparent: true, opacity: 0.62 }), [0.235, -0.1, 0.233], [0.07, 0.036, 0.014], 18)

    const hairStrand = material('#594057', { color: '#493246', roughness: 0.4 })
    for (const side of [-1, 1]) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.12, 0.34, 0.255),
        new THREE.Vector3(side * 0.28, 0.2, 0.24),
        new THREE.Vector3(side * 0.32, -0.04, 0.19),
      ])
      mesh(head, new THREE.TubeGeometry(curve, 18, 0.012, 6, false), hairStrand, [0, 0, 0])
    }

    const rendererOptions = {
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
      preserveDrawingBuffer: false,
    }

    try {
      renderer = new THREE.WebGLRenderer(rendererOptions)
      renderer.setClearColor(0x000000, 0)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.08
      container.classList.add('has-webgl')
    } catch (error) {
      console.error('Unable to initialize the hero WebGL scene; showing the static artwork instead.', error)
      resources.geometries.forEach((geometry) => geometry.dispose())
      resources.materials.forEach((surface) => surface.dispose())
      resources.textures.forEach((texture) => texture.dispose())
      return undefined
    }

    const render = () => {
      if (isDisposed || !renderer) return
      const { width, height } = container.getBoundingClientRect()
      if (width === 0 || height === 0) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }

    const stop = () => {
      window.cancelAnimationFrame(frameId)
      frameId = 0
    }

    const animate = (timestamp) => {
      if (isDisposed || !renderer || document.hidden || !isVisible) return
      frameId = 0
      if (timestamp - lastFrame >= 1000 / 30) {
        lastFrame = timestamp
        pointerCurrent.lerp(pointerTarget, 0.035)
        artwork.rotation.y += (pointerCurrent.x - artwork.rotation.y) * 0.025
        artwork.rotation.x += (pointerCurrent.y - artwork.rotation.x) * 0.025

        if (!prefersReducedMotion.matches) {
          const time = timestamp * 0.001
          character.position.y = Math.sin(time * 1.5) * 0.025
          head.rotation.z = Math.sin(time * 0.62) * 0.025
          typingHands.position.y = Math.sin(time * 12) * 0.014
          monitors.rotation.y = Math.sin(time * 0.28) * 0.012
          portal.rotation.z = -0.12 + Math.sin(time * 0.2) * 0.018
          keyLight.intensity = 22 + Math.sin(time * 1.3) * 1.4
        }

        render()
      }
      if (!prefersReducedMotion.matches) frameId = window.requestAnimationFrame(animate)
    }

    const start = () => {
      if (isDisposed || !renderer || document.hidden || !isVisible) return
      stop()
      if (prefersReducedMotion.matches) render()
      else frameId = window.requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(render)
    resizeObserver.observe(container)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible) start()
      else stop()
    }, { threshold: 0.05 })
    intersectionObserver.observe(container)

    const handlePointerMove = (event) => {
      const bounds = container.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return
      const x = (event.clientX - bounds.left) / bounds.width
      const y = (event.clientY - bounds.top) / bounds.height
      pointerTarget.set((x - 0.5) * 0.18, (y - 0.5) * -0.12)
    }
    const handleVisibilityChange = () => {
      if (document.hidden) stop()
      else start()
    }
    const handleMotionPreferenceChange = () => start()
    const handleContextLost = (event) => {
      event.preventDefault()
      stop()
      container.classList.remove('has-webgl')
      console.warn('The hero WebGL context was lost; the static artwork remains available.')
    }

    container.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    canvas.addEventListener('webglcontextlost', handleContextLost)
    prefersReducedMotion.addEventListener('change', handleMotionPreferenceChange)

    return () => {
      isDisposed = true
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      container.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      prefersReducedMotion.removeEventListener('change', handleMotionPreferenceChange)
      container.classList.remove('has-webgl')
      resources.geometries.forEach((geometry) => geometry.dispose())
      resources.materials.forEach((surface) => surface.dispose())
      resources.textures.forEach((texture) => texture.dispose())
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-scene-canvas" aria-hidden="true" />
}

export default HeroScene
