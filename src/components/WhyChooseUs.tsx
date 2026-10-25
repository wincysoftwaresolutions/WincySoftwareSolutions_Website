import { forwardRef, useCallback, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react'
import { MotionConfig, motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { whyChooseUs, type WhyChooseItem } from '../utils/siteContent'

const ease = [0.22, 1, 0.36, 1] as const
const CORE_RADIUS = 70 // px; connection paths start just outside the core disc
const CYCLE_S = 4 // shared timeline for comets, flares and the mobile line dot (see index.css keyframes)
const LEFT = [0, 1, 2, 3]
const RIGHT = [4, 5, 6, 7]
// Clockwise wave: right column top→bottom, then left column bottom→top
const WAVE_ORDER = [...RIGHT, ...[...LEFT].reverse()]
const waveDelay = (i: number) => (WAVE_ORDER.indexOf(i) * CYCLE_S) / WAVE_ORDER.length

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

const Core = forwardRef<HTMLDivElement, { compact?: boolean }>(function Core({ compact = false }, ref) {
  const size = compact ? 'h-40 w-40' : 'h-52 w-52'
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease }}
      className={`trust-anim relative flex flex-shrink-0 items-center justify-center ${size}`}
      aria-hidden="true"
    >
      {/* Breathing glow */}
      <div
        className="absolute inset-4 rounded-full bg-[radial-gradient(circle,rgba(214,31,127,0.45),rgba(255,169,64,0.25)_55%,transparent_70%)] blur-xl"
        style={{ animation: 'trust-breathe 4s ease-in-out infinite' }}
      />
      {/* Spinning conic gradient ring */}
      <div
        className="absolute inset-3 animate-spin rounded-full bg-[conic-gradient(from_0deg,#D61F7F,#FFA940,rgba(255,169,64,0)_55%,rgba(214,31,127,0)_75%,#D61F7F)] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-2px))]"
        style={{ animationDuration: '5s' }}
      />
      {/* Counter-rotating dashed ring */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin" style={{ animationDuration: '24s', animationDirection: 'reverse' }}>
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(214,31,127,0.25)" strokeWidth="0.6" strokeDasharray="2 4" />
      </svg>
      {/* Orbiting particles */}
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '7s' }}>
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_3px_rgba(214,31,127,0.6)]" />
      </div>
      <div className="absolute inset-6 animate-spin" style={{ animationDuration: '11s', animationDirection: 'reverse' }}>
        <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-secondary shadow-[0_0_10px_3px_rgba(255,169,64,0.6)]" />
      </div>
      {/* Core disc with shimmering wordmark */}
      <div
        className={`relative flex flex-col items-center justify-center rounded-full border border-primary-100 bg-white shadow-[0_10px_40px_-8px_rgba(214,31,127,0.45)] ${
          compact ? 'h-24 w-24' : 'h-32 w-32'
        }`}
      >
        <span
          className={`bg-[linear-gradient(90deg,#D61F7F,#FFA940,#D61F7F,#FFA940)] bg-[length:200%_100%] bg-clip-text font-heading font-bold tracking-[0.2em] text-transparent ${
            compact ? 'text-lg' : 'text-xl'
          }`}
          style={{ animation: 'trust-shimmer 3s linear infinite' }}
        >
          WINCY
        </span>
        <span className="mt-1 font-mono text-[10px] font-semibold tracking-[0.3em] text-ink-gray">AI CORE</span>
      </div>
    </motion.div>
  )
})

interface TrustCardProps {
  item: WhyChooseItem
  index: number
  from: 'left' | 'right' | 'bottom'
  flareDelay: number // seconds into the shared cycle at which this card flares
}

// Card with a 3D tilt toward the pointer, a cursor spotlight and a timed flare when its comet arrives
const TrustCard = forwardRef<HTMLDivElement, TrustCardProps>(function TrustCard({ item, index, from, flareDelay }, ref) {
  const Icon = item.icon
  const reduceMotion = useReducedMotion()
  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 })
  const offset = from === 'left' ? { x: -40 } : from === 'right' ? { x: 40 } : { y: 28 }
  const timeline: CSSProperties = { animationDelay: `${flareDelay}s`, animationDuration: `${CYCLE_S}s` }

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    e.currentTarget.style.setProperty('--mx', `${px * 100}%`)
    e.currentTarget.style.setProperty('--my', `${py * 100}%`)
    if (reduceMotion || e.pointerType !== 'mouse') return
    rotateY.set((px - 0.5) * 10)
    rotateX.set((0.5 - py) * 10)
  }
  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: 'blur(6px)', ...offset }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: 0.15 + (index % 4) * 0.12, ease }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="trust-anim group relative z-10 flex items-start gap-4 overflow-hidden rounded-card border border-black/5 bg-surface-light p-6 transition-[box-shadow,border-color] duration-300 hover:border-primary-100 hover:shadow-[0_18px_44px_-14px_rgba(214,31,127,0.35)]"
    >
      {/* Cursor spotlight */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(214,31,127,0.12), transparent 65%)' }}
        aria-hidden="true"
      />
      {/* Flare, timed to the arrival of this card's comet */}
      <span
        className="pointer-events-none absolute inset-0 rounded-card opacity-0 ring-1 ring-inset ring-primary/40 [background:linear-gradient(120deg,rgba(214,31,127,0.10),rgba(255,169,64,0.10))]"
        style={{ ...timeline, animationName: 'trust-flare', animationIterationCount: 'infinite', animationTimingFunction: 'ease-out' }}
        aria-hidden="true"
      />
      <span className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-gradient text-white shadow-[0_6px_16px_-4px_rgba(214,31,127,0.5)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transition-none">
        <span
          className="flex"
          style={{ ...timeline, animationName: 'trust-icon-pop', animationIterationCount: 'infinite', animationTimingFunction: 'ease-out' }}
        >
          <Icon className="h-6 w-6" />
        </span>
      </span>
      <div className="relative">
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
  const inView = useInView(sectionRef, { amount: 0.15 })
  const entered = useInView(hubRef, { once: true, amount: 0.2 })

  const [size, setSize] = useState({ w: 0, h: 0 })
  const [paths, setPaths] = useState<string[]>([])

  // Curved connection from the core's edge to each card's inner edge
  const measure = useCallback(() => {
    const hub = hubRef.current
    const core = coreRef.current
    if (!hub || !core) return
    const c = offsetWithin(core, hub)
    const cx = c.x + c.w / 2
    const cy = c.y + c.h / 2
    setPaths(
      whyChooseUs.map((_, i) => {
        const el = cardRefs.current[i]
        if (!el) return ''
        const r = offsetWithin(el, hub)
        const end = { x: i < 4 ? r.x + r.w : r.x, y: r.y + r.h / 2 }
        const angle = Math.atan2(end.y - cy, end.x - cx)
        const sx = cx + CORE_RADIUS * Math.cos(angle)
        const sy = cy + CORE_RADIUS * Math.sin(angle)
        const mx = (sx + end.x) / 2
        return `M${sx.toFixed(1)} ${sy.toFixed(1)} C${mx.toFixed(1)} ${sy.toFixed(1)} ${mx.toFixed(1)} ${end.y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`
      }),
    )
    setSize({ w: hub.offsetWidth, h: hub.offsetHeight })
  }, [])

  useLayoutEffect(() => {
    if (!isDesktop) return
    measure()
    const observer = new ResizeObserver(measure)
    if (hubRef.current) observer.observe(hubRef.current)
    return () => observer.disconnect()
  }, [isDesktop, measure])

  // Comets start once the paths have drawn in; everything pauses while the section is off-screen
  const running = entered && inView && !reduceMotion
  const playState = running ? '' : '[&_*]:[animation-play-state:paused]'

  const card = (i: number, from: TrustCardProps['from'], flareDelay: number) => (
    <TrustCard
      key={whyChooseUs[i].title}
      ref={(el) => {
        cardRefs.current[i] = el
      }}
      item={whyChooseUs[i]}
      index={i}
      from={from}
      flareDelay={flareDelay}
    />
  )

  return (
    <MotionConfig reducedMotion="user">
      <section ref={sectionRef} className="section-padding relative overflow-hidden bg-surface">
        {/* Faint dot grid with a glow behind the hub */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(rgba(214,31,127,0.14)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,#000_15%,transparent_65%)]"
          aria-hidden="true"
        />
        <div className="container-app relative">
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
            // Desktop: hub-and-spoke — four cards each side of the core
            <div ref={hubRef} className={`trust-anim relative mt-16 ${playState}`}>
              <svg className="pointer-events-none absolute left-0 top-0 overflow-visible" width={size.w} height={size.h} aria-hidden="true">
                <defs>
                  <linearGradient id="trust-comet-grad" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FFA940" />
                    <stop offset="100%" stopColor="#D61F7F" />
                  </linearGradient>
                </defs>
                {paths.map((d, i) =>
                  d ? (
                    <g key={i}>
                      {/* Draw-in runs on a mask so the visible path keeps its dashes */}
                      <mask id={`trust-path-${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width={size.w} height={size.h}>
                        <motion.path
                          d={d}
                          fill="none"
                          stroke="#fff"
                          strokeWidth="10"
                          initial={{ pathLength: 0 }}
                          animate={entered ? { pathLength: 1 } : undefined}
                          transition={{ duration: 0.9, delay: 0.6 + WAVE_ORDER.indexOf(i) * 0.08, ease }}
                        />
                      </mask>
                      <g mask={`url(#trust-path-${i})`}>
                        {/* Slowly flowing dashed track */}
                        <path
                          d={d}
                          fill="none"
                          stroke="rgba(214,31,127,0.3)"
                          strokeWidth="1.5"
                          strokeDasharray="4 6"
                          style={{ animation: 'trust-flow 1.6s linear infinite' }}
                        />
                        {/* Path glows as its comet passes */}
                        <path
                          d={d}
                          fill="none"
                          stroke="#D61F7F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          opacity="0"
                          style={{ animation: `trust-path-glow ${CYCLE_S}s ease-out ${waveDelay(i)}s infinite` }}
                        />
                        {/* Comet: a short glowing dash travelling from the core to the card */}
                        {!reduceMotion && (
                          <path
                            d={d}
                            pathLength={1}
                            fill="none"
                            stroke="url(#trust-comet-grad)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeDasharray="0.14 1.2"
                            strokeDashoffset="0.2"
                            style={{
                              animation: `trust-comet ${CYCLE_S}s cubic-bezier(0.45,0,0.25,1) ${waveDelay(i)}s infinite`,
                              filter: 'drop-shadow(0 0 4px rgba(214,31,127,0.8))',
                            }}
                          />
                        )}
                      </g>
                    </g>
                  ) : null,
                )}
              </svg>

              <div className="grid grid-cols-[minmax(0,1fr)_minmax(14rem,17rem)_minmax(0,1fr)] gap-x-12">
                <div className="space-y-5">{LEFT.map((i) => card(i, 'left', waveDelay(i)))}</div>
                <div className="flex items-center justify-center">
                  <Core ref={coreRef} />
                </div>
                <div className="space-y-5">{RIGHT.map((i) => card(i, 'right', waveDelay(i)))}</div>
              </div>
            </div>
          ) : (
            // Tablet / mobile: core on top, cards stacked along a connecting line
            <div ref={hubRef} className={`trust-anim mt-12 ${playState}`}>
              <div className="flex justify-center">
                <Core compact />
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
                  <span className="absolute -top-8 bottom-12 left-12 w-px" aria-hidden="true">
                    <span
                      className="absolute -ml-[3px] h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_3px_rgba(214,31,127,0.55)]"
                      style={{ animation: `trust-line-dot ${CYCLE_S}s linear infinite`, opacity: 0 }}
                    />
                  </span>
                )}
                <div className="space-y-5">
                  {/* Each card flares as the line dot passes it (dot travels 0–90% of the cycle) */}
                  {whyChooseUs.map((_, i) =>
                    card(i, 'bottom', (CYCLE_S * 0.9 * (i + 0.5)) / whyChooseUs.length - CYCLE_S * 0.5),
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </MotionConfig>
  )
}

export default WhyChooseUs
