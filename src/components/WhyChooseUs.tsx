import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { MotionConfig, motion, useInView, useReducedMotion } from 'framer-motion'
import { whyChooseUs, type WhyChooseItem } from '../utils/siteContent'

const ease = [0.22, 1, 0.36, 1] as const
const CORE_RADIUS = 66 // px; connection paths start on the core's inner circle
const PULSE_MS = 900 // pulse travel time from core to card
const LIT_MS = 800 // how long a card stays highlighted once the pulse arrives
const STEP_MS = 1400 // gap between pulses; cards are visited in order, looping
const LEFT = [0, 1, 2, 3]
const RIGHT = [4, 5, 6, 7]
const BOTTOM = 8

const desktopQuery = '(min-width: 1024px)'
function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(desktopQuery)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(desktopQuery).matches,
  )
}

// Layout position of el inside ancestor, ignoring transforms (entrance animations would skew it)
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== ancestor) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight }
}

const Core = forwardRef<HTMLDivElement, { compact?: boolean; pulseKey: number }>(function Core(
  { compact = false, pulseKey },
  ref,
) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease }}
      className={`relative flex flex-shrink-0 items-center justify-center ${compact ? 'h-36 w-36' : 'h-48 w-48'}`}
      aria-hidden="true"
    >
      <div className="absolute inset-6 rounded-full bg-primary-200/60 blur-2xl" />
      {!reduceMotion &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-4 rounded-full border border-primary/25"
            animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: i }}
          />
        ))}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <linearGradient id={compact ? 'core-ring-sm' : 'core-ring'} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D61F7F" />
            <stop offset="100%" stopColor="#E8891A" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={`url(#${compact ? 'core-ring-sm' : 'core-ring'})`}
          strokeWidth="1.2"
          strokeDasharray="14 8"
          strokeLinecap="round"
        />
      </motion.svg>
      {/* Inner disc flashes softly each time a pulse leaves the core */}
      <motion.div
        key={pulseKey}
        initial={{ scale: 1 }}
        animate={reduceMotion || !pulseKey ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`relative flex flex-col items-center justify-center rounded-full border border-primary-100 bg-white shadow-softLg ${
          compact ? 'h-24 w-24' : 'h-32 w-32'
        }`}
      >
        <span className={`font-heading font-bold tracking-[0.2em] text-gradient ${compact ? 'text-lg' : 'text-xl'}`}>
          WINCY
        </span>
        <span className="mt-1 font-mono text-[10px] font-semibold tracking-[0.3em] text-ink-gray">AI CORE</span>
      </motion.div>
    </motion.div>
  )
})

interface TrustCardProps {
  item: WhyChooseItem
  index: number
  from: 'left' | 'right' | 'bottom'
  lit: boolean
}

const TrustCard = forwardRef<HTMLDivElement, TrustCardProps>(function TrustCard({ item, index, from, lit }, ref) {
  const Icon = item.icon
  const offset = from === 'left' ? { x: -28 } : from === 'right' ? { x: 28 } : { y: 24 }
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: 0.1 + (index % 4) * 0.1, ease }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease } }}
      className={`group relative z-10 flex items-start gap-4 rounded-card border bg-surface-light p-6 transition-[box-shadow,border-color,background-color] duration-500 hover:border-primary-100 hover:shadow-softLg ${
        lit ? 'border-primary-200 bg-white shadow-[0_0_0_4px_rgba(214,31,127,0.08),0_14px_40px_-12px_rgba(214,31,127,0.35)]' : 'border-black/5'
      }`}
    >
      <span
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-gradient text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transition-none ${
          lit ? 'scale-110' : ''
        }`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <h3 className="font-heading text-[1.05rem] font-semibold text-ink">{item.title}</h3>
        <p className="mt-1 text-[0.9833rem] leading-normal text-ink-gray">{item.description}</p>
      </div>
    </motion.div>
  )
})

function WhyChooseUs() {
  const isDesktop = useIsDesktop()
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const hubRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const inView = useInView(sectionRef, { amount: 0.2 })
  const entered = useInView(hubRef, { once: true, amount: 0.2 })

  const [size, setSize] = useState({ w: 0, h: 0 })
  const [paths, setPaths] = useState<string[]>([])
  const [pulse, setPulse] = useState({ index: -1, key: 0 })
  const [lit, setLit] = useState<number | null>(null)

  // Curved connection from the core's edge to each card's inner edge
  const measure = useCallback(() => {
    const hub = hubRef.current
    const core = coreRef.current
    if (!hub || !core) return
    const c = offsetWithin(core, hub)
    const cx = c.x + c.w / 2
    const cy = c.y + c.h / 2
    const next = whyChooseUs.map((_, i) => {
      const el = cardRefs.current[i]
      if (!el) return ''
      const r = offsetWithin(el, hub)
      const vertical = i === BOTTOM
      const end = vertical
        ? { x: r.x + r.w / 2, y: r.y }
        : { x: i < 4 ? r.x + r.w : r.x, y: r.y + r.h / 2 }
      const angle = Math.atan2(end.y - cy, end.x - cx)
      const sx = cx + CORE_RADIUS * Math.cos(angle)
      const sy = cy + CORE_RADIUS * Math.sin(angle)
      if (vertical) {
        const my = (sy + end.y) / 2
        return `M${sx.toFixed(1)} ${sy.toFixed(1)} C${sx.toFixed(1)} ${my.toFixed(1)} ${end.x.toFixed(1)} ${my.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`
      }
      const mx = (sx + end.x) / 2
      return `M${sx.toFixed(1)} ${sy.toFixed(1)} C${mx.toFixed(1)} ${sy.toFixed(1)} ${mx.toFixed(1)} ${end.y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`
    })
    setSize({ w: hub.offsetWidth, h: hub.offsetHeight })
    setPaths(next)
  }, [])

  useLayoutEffect(() => {
    if (!isDesktop) return
    measure()
    const observer = new ResizeObserver(measure)
    if (hubRef.current) observer.observe(hubRef.current)
    return () => observer.disconnect()
  }, [isDesktop, measure])

  // Visit each card in turn: pulse travels out, then the card lights up briefly
  useEffect(() => {
    if (reduceMotion || !inView || !entered) return
    const timers: number[] = []
    let i = -1
    const step = () => {
      i = (i + 1) % whyChooseUs.length
      const index = i
      setPulse({ index, key: Date.now() })
      timers.push(window.setTimeout(() => setLit(index), PULSE_MS))
      timers.push(window.setTimeout(() => setLit((cur) => (cur === index ? null : cur)), PULSE_MS + LIT_MS))
    }
    const start = window.setTimeout(step, 1200) // let the entrance animation finish first
    const interval = window.setInterval(step, STEP_MS)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
      timers.forEach(window.clearTimeout)
      setLit(null)
    }
  }, [reduceMotion, inView, entered])

  const card = (i: number, from: TrustCardProps['from']) => (
    <TrustCard
      key={whyChooseUs[i].title}
      ref={(el) => {
        cardRefs.current[i] = el
      }}
      item={whyChooseUs[i]}
      index={i}
      from={from}
      lit={lit === i}
    />
  )

  return (
    <MotionConfig reducedMotion="user">
      <section ref={sectionRef} className="section-padding overflow-hidden bg-surface">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="section-eyebrow">Why Choose Us</span>
            <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
              Reasons Enterprises <span className="whitespace-nowrap text-gradient">Trust Us</span>
            </h2>
          </motion.div>

          {isDesktop ? (
            // Desktop: hub-and-spoke — 4 cards each side, the ninth below the core
            <div ref={hubRef} className="relative mt-16">
              <svg
                className="pointer-events-none absolute left-0 top-0 overflow-visible"
                width={size.w}
                height={size.h}
                aria-hidden="true"
              >
                {paths.map((d, i) =>
                  d ? (
                    <g key={i}>
                      {/* Draw-in runs on a mask so the visible path keeps its dashes */}
                      <mask id={`trust-path-${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width={size.w} height={size.h}>
                        <motion.path
                          d={d}
                          fill="none"
                          stroke="#fff"
                          strokeWidth="8"
                          initial={{ pathLength: 0 }}
                          animate={entered ? { pathLength: 1 } : undefined}
                          transition={{ duration: 0.8, delay: 0.5 + i * 0.07, ease }}
                        />
                      </mask>
                      <path
                        d={d}
                        fill="none"
                        stroke="rgba(214,31,127,0.35)"
                        strokeWidth="1.5"
                        strokeDasharray="4 6"
                        mask={`url(#trust-path-${i})`}
                      />
                      <path
                        d={d}
                        fill="none"
                        stroke="#D61F7F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="transition-opacity duration-500"
                        style={{ opacity: lit === i ? 0.7 : 0 }}
                      />
                    </g>
                  ) : null,
                )}
              </svg>

              {/* Light pulse travelling along the active path from the core to its card */}
              {!reduceMotion && pulse.index >= 0 && paths[pulse.index] && (
                <motion.span
                  key={pulse.key}
                  className="pointer-events-none absolute left-0 top-0 z-20 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_4px_rgba(214,31,127,0.55)]"
                  style={{ offsetPath: `path('${paths[pulse.index]}')`, offsetRotate: '0deg' }}
                  initial={{ offsetDistance: '0%', opacity: 0 }}
                  animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: PULSE_MS / 1000, ease: 'easeInOut' }}
                  aria-hidden="true"
                />
              )}

              <div className="grid grid-cols-[minmax(0,1fr)_minmax(13rem,16rem)_minmax(0,1fr)] gap-x-12">
                <div className="space-y-5">{LEFT.map((i) => card(i, 'left'))}</div>
                <div className="flex items-center justify-center">
                  <Core ref={coreRef} pulseKey={pulse.key} />
                </div>
                <div className="space-y-5">{RIGHT.map((i) => card(i, 'right'))}</div>
              </div>
              <div className="mx-auto mt-12 max-w-md">{card(BOTTOM, 'bottom')}</div>
            </div>
          ) : (
            // Tablet / mobile: core on top, cards stacked along a connecting line
            <div className="mt-12">
              <div className="flex justify-center">
                <Core compact pulseKey={pulse.key} />
              </div>
              <div className="relative mx-auto mt-8 max-w-2xl">
                <motion.span
                  className="absolute -top-8 bottom-12 left-12 w-px origin-top bg-gradient-to-b from-primary-200 via-primary/40 to-secondary/50"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 1.4, ease }}
                  aria-hidden="true"
                />
                {!reduceMotion && (
                  <motion.span
                    className="absolute left-12 z-0 -ml-[3px] h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_3px_rgba(214,31,127,0.5)]"
                    animate={{ top: ['0%', '96%'], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden="true"
                  />
                )}
                <div className="space-y-5">{whyChooseUs.map((_, i) => card(i, 'bottom'))}</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </MotionConfig>
  )
}

export default WhyChooseUs
