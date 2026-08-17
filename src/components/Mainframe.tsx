import { motion } from 'framer-motion'
import { ArrowRight, Layers, BrainCircuit, ShieldCheck, CheckCircle2, Circle, Wand2 } from 'lucide-react'

interface RiskModule {
  name: string
  grade: string
  status: string
  color: string
}

const riskModules: RiskModule[] = [
  { name: 'Core Billing Engine', grade: 'D', status: 'Critical Risk', color: '#EF4444' },
  { name: 'Auth & Session Mgmt', grade: 'C', status: 'Needs Refactor', color: '#F59E0B' },
  { name: 'Reporting Module', grade: 'B', status: 'In Progress', color: '#FF7A00' },
  { name: 'API Gateway', grade: 'A', status: 'Modernized', color: '#22C55E' },
]

const processSteps = [
  { label: 'Assess', state: 'done' as const },
  { label: 'Refactor', state: 'done' as const },
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

      <div className="container-app relative grid items-center gap-16 lg:grid-cols-2">
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
            className="text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl"
          >
            Modernize Legacy Applications
            <span className="text-gradient"> with AI-Powered Transformation</span>
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
            className="mt-5 max-w-xl text-lg text-ink-gray"
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
              <p className="font-heading text-2xl font-bold text-ink">500+</p>
              <p className="text-sm text-ink-gray">Applications Assessed</p>
            </div>
            <div className="h-10 w-px bg-black/10" />
            <div>
              <p className="font-heading text-2xl font-bold text-ink">40+</p>
              <p className="text-sm text-ink-gray">Enterprise Clients</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-md pb-10 pt-12 sm:pb-14 sm:pt-14 lg:max-w-lg"
        >
          <div
            className="absolute inset-x-8 top-4 h-3/4 rounded-[3rem] bg-primary-200/50 opacity-70 blur-3xl"
            aria-hidden="true"
          />

          {/* Legacy code assessment mockup — makes the modernization process tangible */}
          <div className="card-surface relative z-10 overflow-hidden shadow-softLg">
            <div className="flex items-center gap-2 border-b border-black/5 bg-surface-light px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <span className="ml-2 font-mono text-xs text-ink-gray">legacy-assessment.ai</span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-semibold text-primary">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-1.5 w-1.5 rounded-full bg-primary"
                />
                Live Scan
              </span>
            </div>

            <div className="divide-y divide-black/5 px-5">
              {riskModules.map((module, index) => (
                <motion.div
                  key={module.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.12 }}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{module.name}</p>
                    <p className="text-xs text-ink-gray">{module.status}</p>
                  </div>
                  <span
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: module.color }}
                  >
                    {module.grade}
                  </span>
                </motion.div>
              ))}
            </div>

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
                      <span className="text-[10px] font-medium text-ink-gray">{step.label}</span>
                    </div>
                    {index < processSteps.length - 1 && (
                      <span className="mx-1 mb-4 h-px flex-1 bg-black/10" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs">
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

          <motion.div
            initial={{ opacity: 0, y: -16, x: 8 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
            className="glass-card absolute -top-2 right-2 z-20 hidden items-center gap-3 px-4 py-3 sm:-top-4 sm:right-0 sm:flex"
          >
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.7 }}
              className="flex items-center gap-3"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
                <BrainCircuit className="h-4 w-4" />
              </span>
              <span>
                <p className="text-xs text-ink-gray">AI-Powered</p>
                <p className="font-heading text-sm font-bold text-ink">Real-Time Analysis</p>
              </span>
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16, x: -8 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.6, delay: 1.7, ease: 'easeOut' }}
            className="glass-card absolute -bottom-8 left-2 z-20 flex items-center gap-3 px-4 py-3 sm:-bottom-4 sm:left-0"
          >
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.3 }}
              className="flex items-center gap-3"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <span>
                <p className="text-xs text-ink-gray">Secure &amp; Reliable</p>
                <p className="font-heading text-sm font-bold text-ink">Enterprise Ready</p>
              </span>
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Mainframe
