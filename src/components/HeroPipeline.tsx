import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  Layers,
  Loader2,
  ScanSearch,
  ShieldCheck,
  Wand2,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react'
import { techStack } from '../utils/techStackData'

type PipelineState = 'done' | 'active' | 'analyzing' | 'queued'

interface PipelineRow {
  id: string
  legacy: string
  legacyNote: string
  target: string
  targetNote?: string
}

// One row per tech stack; each row links to its Tech Stack tab
const pipeline: PipelineRow[] = [
  { id: 'vb6', legacy: 'VB6', legacyNote: 'COM · Desktop', target: 'React + .NET 10', targetNote: 'Azure Cloud' },
  { id: 'delphi', legacy: 'Delphi', legacyNote: 'VCL · Desktop', target: 'React + Modern .NET', targetNote: 'Azure Cloud' },
  { id: 'powerbuilder', legacy: 'PowerBuilder', legacyNote: 'DataWindow', target: 'React + .NET 10', targetNote: 'REST APIs' },
  { id: 'windows-to-web', legacy: 'Windows App', legacyNote: 'WinForms · WPF', target: 'React Web App', targetNote: 'Cloud Native' },
  { id: 'dotnet', legacy: '.NET Framework', legacyNote: 'v4.x', target: '.NET 10' },
]

const INITIAL_STATES: PipelineState[] = ['done', 'done', 'active', 'analyzing', 'queued']
const STEP_MS = 2800 // time each row spends transforming
const RESTART_HOLD_STEPS = 2 // steps to linger on "all migrated" before the cycle restarts

const iconById: Record<string, LucideIcon> = Object.fromEntries(techStack.map((tech) => [tech.id, tech.icon]))

const statusStyles: Record<PipelineState, { label: string; icon: LucideIcon; className: string }> = {
  done: { label: 'Modernized', icon: Check, className: 'bg-green-50 text-green-600' },
  active: { label: 'Transforming', icon: Loader2, className: 'bg-primary-50 text-primary' },
  analyzing: { label: 'Analyzing', icon: ScanSearch, className: 'bg-amber-50 text-amber-600' },
  queued: { label: 'Queued', icon: Clock3, className: 'bg-black/5 text-ink-gray' },
}

const STEP_LABELS = ['Assess', 'Transform', 'Migrate', 'Validate']

// Move every row one stage forward: transforming → migrated, analyzing → transforming, queued → analyzing
function advance(states: PipelineState[]): PipelineState[] {
  const next = [...states]
  const active = next.indexOf('active')
  if (active >= 0) next[active] = 'done'
  const analyzing = next.indexOf('analyzing')
  if (analyzing >= 0) next[analyzing] = 'active'
  const queued = next.indexOf('queued')
  if (queued >= 0) next[queued] = 'analyzing'
  return next
}

function readinessOf(states: PipelineState[]) {
  const score = states.reduce((sum, s) => sum + (s === 'done' ? 1 : s === 'active' ? 0.55 : s === 'analyzing' ? 0.2 : 0), 0)
  return Math.round((score / states.length) * 100)
}

function useTypewriter(text: string, enabled: boolean) {
  const [shown, setShown] = useState(text)
  useEffect(() => {
    if (!enabled) {
      setShown(text)
      return
    }
    let i = 0
    setShown('')
    const timer = window.setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) window.clearInterval(timer)
    }, 22)
    return () => window.clearInterval(timer)
  }, [text, enabled])
  return shown
}

// Small radial burst played on a status pill when its row finishes migrating
function Sparkles() {
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <motion.span
            key={i}
            className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full ${i % 2 ? 'bg-secondary' : 'bg-green-500'}`}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(angle) * 22, y: Math.sin(angle) * 14, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        )
      })}
    </span>
  )
}

function FlowLine({ state, index }: { state: PipelineState; index: number }) {
  return (
    <span className="relative flex h-4 items-center" aria-hidden="true">
      {state === 'queued' && <span className="w-full border-t border-dashed border-black/15" />}
      {state === 'analyzing' && (
        <span
          className="h-0.5 w-full rounded-full bg-[length:12px_2px] bg-[linear-gradient(90deg,rgba(245,158,11,0.7)_50%,transparent_50%)]"
          style={{ animation: 'hero-march 0.8s linear infinite' }}
        />
      )}
      {state === 'active' && (
        <>
          <span className="h-0.5 w-full rounded-full bg-primary-100" />
          <motion.span
            className="absolute h-[3px] w-7 rounded-full bg-gradient-to-r from-transparent via-primary to-primary shadow-[0_0_10px_rgba(214,31,127,0.7)]"
            initial={{ left: '-30%' }}
            animate={{ left: ['-30%', '85%'] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeIn' }}
          />
        </>
      )}
      {state === 'done' && (
        <span className="relative h-0.5 w-full overflow-hidden rounded-full bg-orange-gradient">
          <span
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ animation: `hero-shine 2.6s ease-in-out ${index * 0.35}s infinite` }}
          />
        </span>
      )}
      <ArrowRight className={`absolute -right-1 h-3 w-3 ${state === 'done' ? 'text-primary' : state === 'active' ? 'text-primary/60' : 'text-black/20'}`} />
    </span>
  )
}

function HeroPipeline() {
  const reduceMotion = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { amount: 0.3 })
  const [states, setStates] = useState<PipelineState[]>(INITIAL_STATES)
  const [tick, setTick] = useState(0)
  const [bursts, setBursts] = useState<Record<number, number>>({})
  const prevStates = useRef(states)

  const statesRef = useRef(states)
  useEffect(() => {
    statesRef.current = states
  }, [states])

  // Drive the live pipeline while the panel is on screen
  useEffect(() => {
    if (reduceMotion || !inView) return
    let hold = 0
    const timer = window.setInterval(() => {
      const current = statesRef.current
      let next = current
      if (current.every((s) => s === 'done')) {
        hold += 1
        if (hold > RESTART_HOLD_STEPS) {
          hold = 0
          next = INITIAL_STATES
        }
      } else {
        next = advance(current)
      }
      setStates(next)
      setTick((t) => t + 1)
    }, STEP_MS)
    return () => window.clearInterval(timer)
  }, [reduceMotion, inView])

  // Celebrate rows that just finished
  useEffect(() => {
    const finished = states.map((s, i) => (s === 'done' && prevStates.current[i] !== 'done' ? i : -1)).filter((i) => i >= 0)
    prevStates.current = states
    if (finished.length) setBursts((b) => ({ ...b, ...Object.fromEntries(finished.map((i) => [i, Date.now()])) }))
  }, [states])

  const readiness = readinessOf(states)
  const readinessMv = useMotionValue(0)
  const readinessText = useTransform(readinessMv, (v) => `${Math.round(v)}%`)
  const readinessWidth = useTransform(readinessMv, (v) => `${v}%`)
  useEffect(() => {
    const controls = animate(readinessMv, readiness, { duration: reduceMotion ? 0 : 1.2, ease: 'easeOut', delay: tick === 0 ? 1 : 0 })
    return () => controls.stop()
  }, [readiness, readinessMv, reduceMotion, tick])

  // Process steps: Assess is always done; the rest follow overall readiness
  const activeStep = readiness >= 100 ? 4 : readiness >= 85 ? 2 : 1
  const allDone = readiness >= 100

  const activeIdx = states.indexOf('active')
  const logText = allDone
    ? 'validation passed · all systems ready to deploy'
    : activeIdx >= 0
      ? `transforming ${pipeline[activeIdx].legacy} → ${pipeline[activeIdx].target}`
      : 'analyzing legacy dependencies'
  const typed = useTypewriter(logText, !reduceMotion)

  // 3D tilt toward the pointer, with the floating cards moving at a different depth
  const rotX = useSpring(0, { stiffness: 120, damping: 18 })
  const rotY = useSpring(0, { stiffness: 120, damping: 18 })
  const parallaxX = useTransform(rotY, (v) => v * 1.6)
  const parallaxY = useTransform(rotX, (v) => v * -1.6)
  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    rotY.set(((e.clientX - r.left) / r.width - 0.5) * 8)
    rotX.set((0.5 - (e.clientY - r.top) / r.height) * 8)
  }
  const handleLeave = () => {
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="hero-anim relative mx-auto w-full max-w-md pb-10 pt-12 sm:max-w-lg sm:pb-14 sm:pt-14 lg:mr-0 lg:max-w-[36rem]"
    >
      <div className="absolute inset-x-8 top-4 h-3/4 rounded-[3rem] bg-primary-200/50 opacity-70 blur-3xl" aria-hidden="true" />

      <motion.div style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }} className="relative z-10">
        {/* Glowing border: a conic light circles the panel edge */}
        <div className="relative rounded-card p-[1.5px] shadow-softLg">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-card" aria-hidden="true">
            <div
              className="absolute left-1/2 top-1/2 aspect-square w-[170%] -translate-x-1/2 -translate-y-1/2 animate-spin bg-[conic-gradient(from_0deg,rgba(0,0,0,0.06)_0%,#D61F7F_8%,#FFA940_16%,rgba(0,0,0,0.06)_26%,rgba(0,0,0,0.06)_100%)]"
              style={{ animationDuration: '6s' }}
            />
          </div>

          {/* Modernization pipeline mockup: each supported tech stack moving from legacy to modern */}
          <div className="relative overflow-hidden rounded-[15px] bg-white">
            <div className="flex items-center gap-2 border-b border-black/5 bg-surface-light px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <span className="ml-2 min-w-0 truncate font-mono text-[0.9167rem] leading-4 text-ink-gray">modernization-pipeline</span>
              <span className="ml-auto flex flex-shrink-0 items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-1 text-[13.67px] font-semibold text-primary">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-1.5 w-1.5 rounded-full bg-primary"
                />
                AI Transform
              </span>
            </div>

            {/* Live activity log */}
            <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#17121c] px-5 py-1.5 font-mono text-[12.67px] text-white/80" aria-live="polite">
              <span className="text-secondary">›</span>
              <span className="min-w-0 truncate">{typed}</span>
              <span className="h-3.5 w-[7px] flex-shrink-0 bg-secondary/80" style={{ animation: 'hero-caret 1s steps(1) infinite' }} />
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_1.75rem_minmax(0,1fr)_auto] items-center gap-2 px-5 pb-1 pt-3 font-mono text-[12.67px] font-medium uppercase tracking-[0.08em] text-ink-gray sm:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)_7.25rem] xl:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)_7.25rem] sm:gap-3">
              <span>Legacy</span>
              <span />
              <span>Modern target</span>
              <span className="text-right">Status</span>
            </div>

            <ul className="relative overflow-hidden px-3 pb-2">
              {/* AI scan beam sweeping over the rows */}
              {!reduceMotion && (
                <span
                  className="pointer-events-none absolute inset-x-0 z-0 h-16 bg-gradient-to-b from-transparent via-primary/[0.07] to-transparent"
                  style={{ animation: 'hero-scan 4.2s ease-in-out infinite' }}
                  aria-hidden="true"
                >
                  <span className="absolute inset-x-6 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                </span>
              )}
              {pipeline.map((row, index) => {
                const state = states[index]
                const LegacyIcon = iconById[row.id] ?? Layers
                const status = statusStyles[state]
                const StatusIcon = status.icon

                return (
                  <motion.li
                    key={row.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="relative z-10"
                  >
                    <a
                      href={`#${row.id}`}
                      className={`relative grid grid-cols-[minmax(0,1fr)_1.75rem_minmax(0,1fr)_auto] items-center gap-2 overflow-hidden rounded-xl px-2 py-2.5 transition-colors duration-500 hover:bg-primary-50/60 sm:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)_7.25rem] xl:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)_7.25rem] sm:gap-3 ${
                        state === 'active' ? 'bg-primary-50/50' : ''
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-500 xl:flex ${
                            state === 'active' ? 'bg-orange-gradient text-white' : 'bg-black/5 text-ink-gray'
                          }`}
                        >
                          <LegacyIcon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[15.67px] font-medium leading-snug text-ink [overflow-wrap:anywhere] sm:text-[1.0417rem] sm:leading-5">
                            {row.legacy}
                          </span>
                          <span className="block font-mono text-[12.67px] leading-snug text-ink-gray">{row.legacyNote}</span>
                        </span>
                      </span>

                      <FlowLine state={state} index={index} />

                      <span className="min-w-0">
                        <span
                          className={`block text-[15.67px] font-semibold leading-snug transition-colors duration-500 sm:text-[1.0417rem] sm:leading-5 ${
                            state === 'queued' ? 'text-ink-gray' : 'text-gradient'
                          }`}
                        >
                          {row.target}
                        </span>
                        {row.targetNote && (
                          <span className="block font-mono text-[12.67px] leading-snug text-ink-gray">{row.targetNote}</span>
                        )}
                      </span>

                      <span className="relative justify-self-end">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={state}
                            initial={{ opacity: 0, scale: 0.6, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.6, filter: 'blur(4px)' }}
                            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                            className={`inline-flex items-center gap-1 rounded-full px-1.5 py-1 text-[12.67px] font-semibold sm:px-2 ${status.className}`}
                            title={status.label}
                          >
                            <StatusIcon className={`h-3 w-3 ${state === 'active' && !reduceMotion ? 'animate-spin' : ''}`} />
                            <span className="sr-only sm:not-sr-only">{status.label}</span>
                          </motion.span>
                        </AnimatePresence>
                        {bursts[index] && <Sparkles key={bursts[index]} />}
                      </span>

                      {/* Progress of the row currently transforming */}
                      {state === 'active' && !reduceMotion && (
                        <motion.span
                          key={tick}
                          className="absolute inset-x-2 bottom-0 h-[2px] origin-left rounded-full bg-orange-gradient"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </motion.li>
                )
              })}
            </ul>

            <div className="border-t border-black/5 bg-surface-light px-5 py-4">
              <div className="flex items-center justify-between">
                {STEP_LABELS.map((label, index) => {
                  const done = index < activeStep
                  const active = index === activeStep
                  return (
                    <div key={label} className="flex flex-1 items-center last:flex-none">
                      <div className="flex flex-col items-center gap-1.5">
                        <span
                          className={`relative flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-500 ${
                            done || active ? 'bg-orange-gradient text-white' : 'bg-black/5 text-ink-gray'
                          }`}
                        >
                          {active && !reduceMotion && (
                            <motion.span
                              className="absolute inset-0 rounded-full border-2 border-primary/50"
                              animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
                              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                            />
                          )}
                          {done && <CheckCircle2 className="h-3.5 w-3.5" />}
                          {active && (
                            <motion.span
                              animate={reduceMotion ? undefined : { scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                            >
                              <Wand2 className="h-3.5 w-3.5" />
                            </motion.span>
                          )}
                          {!done && !active && <Circle className="h-3 w-3" />}
                        </span>
                        <span className="text-[12.67px] font-medium text-ink-gray">{label}</span>
                      </div>
                      {index < STEP_LABELS.length - 1 && (
                        <span className="relative mx-1 mb-4 h-px flex-1 bg-black/10">
                          <motion.span
                            className="absolute inset-0 origin-left bg-orange-gradient"
                            initial={false}
                            animate={{ scaleX: index < activeStep ? 1 : 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-[0.9167rem] leading-4">
                  <span className="font-medium text-ink-gray">Modernization Readiness</span>
                  <motion.span className="font-heading font-bold tabular-nums text-primary">{readinessText}</motion.span>
                </div>
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-primary-50">
                  <motion.div style={{ width: readinessWidth }} className="relative h-full overflow-hidden rounded-full bg-orange-gradient">
                    <span
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                      style={{ animation: 'hero-shine 2.2s ease-in-out infinite' }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating widget 1: AI-Assisted / Code Transformation */}
      <motion.div
        initial={{ opacity: 0, y: -16, x: 8 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
        className="absolute -top-2 right-2 z-20 hidden sm:-top-4 sm:right-0 sm:block"
      >
        <motion.div style={{ x: parallaxX, y: parallaxY }}>
          <div
            className="glass-card relative flex animate-float-up items-center gap-3 overflow-hidden bg-white/95 px-4 py-3 backdrop-blur-none will-change-transform motion-reduce:animate-none"
            style={{ animationDelay: '1.7s' }}
          >
            <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
              {!reduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-primary/40"
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <motion.span
                animate={reduceMotion ? undefined : { rotate: [0, -12, 10, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
                className="flex"
              >
                <WandSparkles className="h-5 w-5" />
              </motion.span>
            </span>
            <div>
              <p className="text-[0.9167rem] leading-4 text-ink-gray">AI-Assisted</p>
              <p className="font-heading text-[1.0417rem] font-bold leading-5 text-ink">Code Transformation</p>
            </div>
            <span
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              style={{ animation: 'hero-shine 4s ease-in-out 1s infinite' }}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating widget 2: Business Logic / 100% Preserved */}
      <motion.div
        initial={{ opacity: 0, y: 16, x: -8 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, delay: 1.7, ease: 'easeOut' }}
        className="absolute -bottom-8 left-2 z-20 sm:-bottom-4 sm:left-0"
      >
        <motion.div style={{ x: parallaxX, y: parallaxY }}>
          <div
            className="glass-card relative flex animate-float-down items-center gap-3 overflow-hidden bg-white/95 px-4 py-3 backdrop-blur-none will-change-transform motion-reduce:animate-none"
            style={{ animationDelay: '2.3s' }}
          >
            <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
              {!reduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-green-500/40"
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
                />
              )}
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="text-[0.9167rem] leading-4 text-ink-gray">Business Logic</p>
              <p className="font-heading text-[1.0417rem] font-bold leading-5 text-ink">100% Preserved</p>
            </div>
            <span
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              style={{ animation: 'hero-shine 4s ease-in-out 3s infinite' }}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default HeroPipeline
