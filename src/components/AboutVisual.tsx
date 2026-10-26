import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const POINT_COUNT = 72
const RADIUS = 34
const HUB_LINKS = 16

// Points spread evenly over a unit sphere (Fibonacci lattice)
const points = Array.from({ length: POINT_COUNT }, (_, i) => {
  const y = 1 - (i / (POINT_COUNT - 1)) * 2
  const r = Math.sqrt(1 - y * y)
  const theta = Math.PI * (3 - Math.sqrt(5)) * i
  return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r, accent: i % 5 === 0 }
})
const HUB = 8
const linkTargets = Array.from({ length: HUB_LINKS }, (_, i) => (HUB + 1 + i * 4) % POINT_COUNT)

function project(p: { x: number; y: number; z: number }, yaw: number, pitch: number) {
  const x1 = p.x * Math.cos(yaw) + p.z * Math.sin(yaw)
  const z1 = -p.x * Math.sin(yaw) + p.z * Math.cos(yaw)
  const y2 = p.y * Math.cos(pitch) - z1 * Math.sin(pitch)
  const z2 = p.y * Math.sin(pitch) + z1 * Math.cos(pitch)
  return { x: x1 * RADIUS, y: y2 * RADIUS, depth: (z2 + 1) / 2 }
}

// Rotating 3D network globe; speeds up and tilts toward the pointer on hover
function AboutVisual() {
  const reduceMotion = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(SVGCircleElement | null)[]>([])
  const lineRefs = useRef<(SVGLineElement | null)[]>([])
  const state = useRef({ yaw: 0, pitch: 0.35, targetPitch: 0.35, speed: 0.25, targetSpeed: 0.25, visible: true })

  useEffect(() => {
    const draw = () => {
      const { yaw, pitch } = state.current
      const projected = points.map((p) => project(p, yaw, pitch))
      projected.forEach((p, i) => {
        const dot = dotRefs.current[i]
        if (!dot) return
        dot.setAttribute('cx', p.x.toFixed(2))
        dot.setAttribute('cy', p.y.toFixed(2))
        dot.setAttribute('r', (0.5 + p.depth * 1.1).toFixed(2))
        dot.setAttribute('opacity', (0.2 + p.depth * 0.8).toFixed(2))
      })
      const hub = projected[HUB]
      linkTargets.forEach((t, i) => {
        const line = lineRefs.current[i]
        if (!line) return
        const p = projected[t]
        line.setAttribute('x1', hub.x.toFixed(2))
        line.setAttribute('y1', hub.y.toFixed(2))
        line.setAttribute('x2', p.x.toFixed(2))
        line.setAttribute('y2', p.y.toFixed(2))
        line.setAttribute('opacity', (0.08 + ((hub.depth + p.depth) / 2) * 0.45).toFixed(2))
      })
    }

    draw()
    if (reduceMotion) return

    const observer = new IntersectionObserver(([entry]) => {
      state.current.visible = entry.isIntersecting
    })
    if (wrapRef.current) observer.observe(wrapRef.current)

    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const s = state.current
      if (s.visible) {
        s.speed += (s.targetSpeed - s.speed) * 0.05
        s.pitch += (s.targetPitch - s.pitch) * 0.05
        s.yaw += s.speed * dt
        draw()
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [reduceMotion])

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetY = (e.clientY - rect.top) / rect.height - 0.5
    state.current.targetPitch = 0.35 + offsetY * 0.8
    state.current.targetSpeed = 0.7
  }
  const handlePointerLeave = () => {
    state.current.targetPitch = 0.35
    state.current.targetSpeed = 0.25
  }

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto aspect-square w-full max-w-[16rem] sm:max-w-xs lg:max-w-md"
      role="img"
      aria-label="Animated network globe representing connected, modernized systems"
    >
      <div className="absolute inset-[18%] rounded-full bg-primary-200/50 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-[30%] rounded-full bg-secondary/25 blur-2xl" aria-hidden="true" />

      <svg viewBox="-50 -50 100 100" className="relative h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="about-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D61F7F" />
            <stop offset="100%" stopColor="#E8891A" />
          </linearGradient>
        </defs>

        <circle r="47" fill="none" stroke="rgba(26,26,26,0.08)" strokeWidth="0.3" />
        <motion.circle
          r="47"
          fill="none"
          stroke="url(#about-ring)"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeDasharray="20 275"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
        <circle r="22" fill="none" stroke="rgba(214,31,127,0.25)" strokeWidth="0.4" />

        {linkTargets.map((t, i) => (
          <line
            key={t}
            ref={(el) => {
              lineRefs.current[i] = el
            }}
            stroke="#D61F7F"
            strokeWidth="0.25"
          />
        ))}
        {points.map((p, i) => (
          <circle
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el
            }}
            fill={p.accent ? '#FFA940' : '#D61F7F'}
          />
        ))}
      </svg>
    </motion.div>
  )
}

export default AboutVisual
