import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Layers,
  BrainCircuit,
  ShieldCheck,
  CheckCircle2,
  Circle,
  Wand2,
  WandSparkles,
  Check,
  Loader2,
  ScanSearch,
  Clock3,
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
  state: PipelineState
}

// One row per Tech Stack section; each row links to its section below
const pipeline: PipelineRow[] = [
  { id: 'vb6', legacy: 'VB6', legacyNote: 'COM · Desktop', target: 'React + .NET 10', targetNote: 'Azure Cloud', state: 'done' },
  { id: 'delphi', legacy: 'Delphi', legacyNote: 'VCL · Desktop', target: 'React + Modern .NET', targetNote: 'Azure Cloud', state: 'done' },
  { id: 'powerbuilder', legacy: 'PowerBuilder', legacyNote: 'DataWindow', target: 'React + .NET 10', targetNote: 'REST APIs', state: 'active' },
  { id: 'windows-to-web', legacy: 'Windows App', legacyNote: 'WinForms · WPF', target: 'React Web App', targetNote: 'Cloud Native', state: 'analyzing' },
  { id: 'dotnet', legacy: '.NET Framework', legacyNote: 'v4.x', target: '.NET 10', state: 'queued' },
]

const iconById: Record<string, LucideIcon> = Object.fromEntries(
  techStack.map((tech) => [tech.id, tech.icon]),
)

const statusStyles: Record<PipelineState, { label: string; icon: LucideIcon; className: string }> = {
  done: { label: 'Migrated', icon: Check, className: 'bg-green-50 text-green-600' },
  active: { label: 'Transforming', icon: Loader2, className: 'bg-primary-50 text-primary' },
  analyzing: { label: 'Analyzing', icon: ScanSearch, className: 'bg-amber-50 text-amber-600' },
  queued: { label: 'Queued', icon: Clock3, className: 'bg-black/5 text-ink-gray' },
}

const processSteps = [
  { label: 'Assess', state: 'done' as const },
  { label: 'Transform', state: 'done' as const },
  { label: 'Migrate', state: 'active' as const },
  { label: 'Validate', state: 'pending' as const },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const },
  }),
}

function Mainframe() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-orange-gradient-soft pb-20 pt-16 sm:pb-28 sm:pt-20 lg:pt-28"
    >
      <div
        className="bg-blob -left-24 -top-24 h-72 w-72 bg-primary-200 animate-blob"
        aria-hidden="true"
      />
      <div
        className="bg-blob -right-16 top-40 h-80 w-80 bg-secondary/40 animate-blob"
        style={{ animationDelay: '4s' }}
        aria-hidden="true"
      />
      <div
        className="bg-blob bottom-0 left-1/3 h-64 w-64 bg-primary-100 animate-blob"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />

      <div className="container-app relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <motion.span
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="section-eyebrow"
          >
            <BrainCircuit className="h-3.5 w-3.5" />
            AI-Powered Legacy Modernization
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-4xl font-bold leading-[1.1] text-ink md:text-5xl lg:text-6xl"
          >
            Modernize Legacy Applications with{' '}
            <span className="text-gradient">
              <span className="whitespace-nowrap">AI-Powered</span> Transformation
            </span>
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mt-5 flex items-center gap-3"
          >
            <span className="h-7 w-1 flex-shrink-0 rounded-full bg-orange-gradient" />
            <p className="font-heading text-lg font-semibold text-ink sm:text-xl">
              From Legacy to Leading-Edge.
            </p>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="mt-5 max-w-xl text-[1.2333rem] leading-relaxed text-ink-gray"
          >
            Accelerate enterprise modernization by transforming legacy applications into
            scalable, cloud-ready, and future-proof solutions using AI-driven automation and
            expert engineering.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#contact" className="btn-primary">
              Start Modernization
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#services" className="btn-secondary">
              <Layers className="h-4 w-4" />
              Explore Services
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={5}
            className="mt-12 flex items-center gap-8"
          >
            <div>
              <p className="font-heading text-2xl-up font-bold text-ink">10+</p>
              <p className="text-sm-up text-ink-gray">Applications Assessed</p>
            </div>
            <div className="h-10 w-px bg-black/10" />
            <div>
              <p className="font-heading text-2xl-up font-bold text-ink">5+</p>
              <p className="text-sm-up text-ink-gray">Enterprise Clients</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-md sm:max-w-lg pb-10 pt-12 sm:pb-14 sm:pt-14 lg:mr-0 lg:max-w-[35rem]"
        >
          <div
            className="absolute inset-x-8 top-4 h-3/4 rounded-[3rem] bg-primary-200/50 opacity-70 blur-3xl"
            aria-hidden="true"
          />

          {/* Modernization pipeline mockup: each supported tech stack moving from legacy to modern */}
          <div className="card-surface relative z-10 overflow-hidden shadow-softLg">
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

            <div className="grid grid-cols-[minmax(0,1fr)_1.75rem_minmax(0,1fr)_auto] items-center gap-2 px-5 pb-1 pt-3 font-mono text-[12.67px] font-medium uppercase tracking-[0.08em] text-ink-gray sm:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)_auto] sm:gap-3">
              <span>Legacy</span>
              <span />
              <span>Modern target</span>
              <span className="text-right">Status</span>
            </div>

            <ul className="px-3 pb-2">
              {pipeline.map((row, index) => {
                const LegacyIcon = iconById[row.id] ?? Layers
                const status = statusStyles[row.state]
                const StatusIcon = status.icon

                return (
                  <motion.li
                    key={row.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <a
                      href={`#${row.id}`}
                      className="grid grid-cols-[minmax(0,1fr)_1.75rem_minmax(0,1fr)_auto] items-center gap-2 rounded-xl px-2 py-2.5 transition-colors hover:bg-primary-50/60 sm:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)_auto] sm:gap-3"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span className="hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-black/5 text-ink-gray xl:flex">
                          <LegacyIcon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[15.67px] font-medium leading-snug text-ink [overflow-wrap:anywhere] sm:text-[1.0417rem] sm:leading-5">
                            {row.legacy}
                          </span>
                          <span className="block font-mono text-[12.67px] leading-snug text-ink-gray">
                            {row.legacyNote}
                          </span>
                        </span>
                      </span>

                      {/* Flow line: solid when migrated, animated while in flight, dashed when queued */}
                      <span className="relative flex h-4 items-center" aria-hidden="true">
                        {row.state === 'queued' ? (
                          <span className="w-full border-t border-dashed border-black/15" />
                        ) : (
                          <span
                            className={`h-0.5 w-full rounded-full ${
                              row.state === 'done' ? 'bg-orange-gradient' : 'bg-black/10'
                            }`}
                          />
                        )}
                        {(row.state === 'active' || row.state === 'analyzing') && !reduceMotion && (
                          <motion.span
                            className="absolute h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(214,31,127,0.6)]"
                            initial={{ left: '0%', opacity: 0 }}
                            animate={{ left: ['0%', '90%'], opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                          />
                        )}
                        <ArrowRight
                          className={`absolute -right-1 h-3 w-3 ${
                            row.state === 'done' ? 'text-primary' : 'text-black/20'
                          }`}
                        />
                      </span>

                      <span className="min-w-0">
                        <span
                          className={`block text-[15.67px] font-semibold leading-snug sm:text-[1.0417rem] sm:leading-5 ${
                            row.state === 'queued' ? 'text-ink-gray' : 'text-gradient'
                          }`}
                        >
                          {row.target}
                        </span>
                        {row.targetNote && (
                          <span className="block font-mono text-[12.67px] leading-snug text-ink-gray">
                            {row.targetNote}
                          </span>
                        )}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 justify-self-end rounded-full px-1.5 py-1 text-[12.67px] font-semibold sm:px-2 ${status.className}`}
                        title={status.label}
                      >
                        <StatusIcon
                          className={`h-3 w-3 ${row.state === 'active' && !reduceMotion ? 'animate-spin' : ''}`}
                        />
                        <span className="sr-only sm:not-sr-only">{status.label}</span>
                      </span>
                    </a>
                  </motion.li>
                )
              })}
            </ul>

            <div className="border-t border-black/5 bg-surface-light px-5 py-4">
              <div className="flex items-center justify-between">
                {processSteps.map((step, index) => (
                  <div key={step.label} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center gap-1.5">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          step.state === 'pending'
                            ? 'bg-black/5 text-ink-gray'
                            : 'bg-orange-gradient text-white'
                        }`}
                      >
                        {step.state === 'done' && <CheckCircle2 className="h-3.5 w-3.5" />}
                        {step.state === 'active' && (
                          <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <Wand2 className="h-3.5 w-3.5" />
                          </motion.span>
                        )}
                        {step.state === 'pending' && <Circle className="h-3 w-3" />}
                      </span>
                      <span className="text-[12.67px] font-medium text-ink-gray">{step.label}</span>
                    </div>
                    {index < processSteps.length - 1 && (
                      <span className="mx-1 mb-4 h-px flex-1 bg-black/10" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-[0.9167rem] leading-4">
                  <span className="font-medium text-ink-gray">Modernization Readiness</span>
                  <span className="font-heading font-bold text-primary">84%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '84%' }}
                    transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-orange-gradient"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating widget 1: AI-Assisted / Code Transformation */}
          <motion.div
            initial={{ opacity: 0, y: -16, x: 8 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
            className="absolute -top-2 right-2 z-20 hidden sm:-top-4 sm:right-0 sm:block"
          >
            <div
              className="glass-card flex animate-float-up items-center gap-3 bg-white/95 px-4 py-3 backdrop-blur-none will-change-transform motion-reduce:animate-none"
              style={{ animationDelay: '1.7s' }}
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
                <WandSparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[0.9167rem] leading-4 text-ink-gray">AI-Assisted</p>
                <p className="font-heading text-[1.0417rem] leading-5 font-bold text-ink">Code Transformation</p>
              </div>
            </div>
          </motion.div>

          {/* Floating widget 2: Business Logic / 100% Preserved */}
          <motion.div
            initial={{ opacity: 0, y: 16, x: -8 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.6, delay: 1.7, ease: 'easeOut' }}
            className="absolute -bottom-8 left-2 z-20 sm:-bottom-4 sm:left-0"
          >
            <div
              className="glass-card flex animate-float-down items-center gap-3 bg-white/95 px-4 py-3 backdrop-blur-none will-change-transform motion-reduce:animate-none"
              style={{ animationDelay: '2.3s' }}
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <p className="text-[0.9167rem] leading-4 text-ink-gray">Business Logic</p>
                <p className="font-heading text-[1.0417rem] leading-5 font-bold text-ink">100% Preserved</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Mainframe