import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { ProjectVariant } from '../utils/siteContent'

interface ProjectVisualProps {
  legacy: string
  targets: string[]
  variant: ProjectVariant
}

const inView = { once: true, amount: 0.4 } as const
const ease = [0.22, 1, 0.36, 1] as const
// Entrance sequence (seconds): legacy window, then the flow path, then the modern window and its content
const T = { legacy: 0.1, path: 0.4, modern: 0.65, body: 0.9, tags: 1.1 }

// Retro desktop window: grey bevelled form, navy title bar
function LegacyWindow({ label }: { label: string }) {
  return (
    <div className="w-full -rotate-2 overflow-hidden rounded-sm border border-black/30 bg-zinc-300 shadow-lg transition-all duration-500 group-hover:-rotate-3 group-hover:opacity-60">
      <div className="flex items-center justify-between bg-[#0a246a] px-1.5 py-1">
        <span className="h-1 w-8 rounded-full bg-white/70" />
        <span className="flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 border border-black/40 bg-zinc-300" />
          ))}
        </span>
      </div>
      <div className="space-y-1.5 p-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="h-1 w-5 bg-zinc-500/70" />
            <span className="h-2.5 flex-1 border border-t-zinc-500 border-l-zinc-500 border-b-white border-r-white bg-white" />
          </div>
        ))}
        <div className="flex justify-end gap-1 pt-0.5">
          <span className="h-2.5 w-6 border border-t-white border-l-white border-b-zinc-600 border-r-zinc-600 bg-zinc-300" />
          <span className="h-2.5 w-6 border border-t-white border-l-white border-b-zinc-600 border-r-zinc-600 bg-zinc-300" />
        </div>
      </div>
      <p className="truncate border-t border-zinc-400 bg-zinc-200 px-1.5 py-0.5 font-mono text-[8px] text-zinc-600">{label}</p>
    </div>
  )
}

function DashboardBody() {
  const bars = [45, 70, 55, 85, 65, 95]
  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-3 rounded bg-primary-50" />
        ))}
      </div>
      <div className="flex h-10 items-end gap-1">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 origin-bottom rounded-t bg-orange-gradient"
            style={{ height: `${h}%` }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={inView}
            transition={{ duration: 0.6, delay: T.body + i * 0.08, ease: 'easeOut' }}
          />
        ))}
      </div>
    </div>
  )
}

function ServicesBody() {
  const nodes = [
    { x: 18, y: 22 },
    { x: 82, y: 22 },
    { x: 18, y: 78 },
    { x: 82, y: 78 },
  ]
  return (
    <svg viewBox="0 0 100 100" className="h-14 w-full" aria-hidden="true">
      {nodes.map((n, i) => (
        <motion.line
          key={i}
          x1="50"
          y1="50"
          x2={n.x}
          y2={n.y}
          stroke="#F7B8D6"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={inView}
          transition={{ duration: 0.5, delay: T.body + i * 0.1 }}
        />
      ))}
      <circle cx="50" cy="50" r="11" fill="#D61F7F" />
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="8"
          fill="#FFA940"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={inView}
          transition={{ duration: 0.35, delay: T.body + 0.3 + i * 0.1 }}
        />
      ))}
    </svg>
  )
}

function ApiBody() {
  const rows = [
    { method: 'GET', path: '/orders', code: '200' },
    { method: 'POST', path: '/quotes', code: '201' },
    { method: 'PUT', path: '/stock', code: '200' },
  ]
  return (
    <div className="space-y-1 font-mono text-[8px] leading-none">
      {rows.map((r, i) => (
        <motion.div
          key={r.path}
          className="flex items-center gap-1 rounded bg-primary-50/70 px-1 py-1"
          initial={{ opacity: 0, x: 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={inView}
          transition={{ duration: 0.35, delay: T.body + i * 0.12 }}
        >
          <span className="font-bold text-primary">{r.method}</span>
          <span className="truncate text-ink">{r.path}</span>
          <span className="ml-auto text-green-600">{r.code}</span>
        </motion.div>
      ))}
    </div>
  )
}

function WebBody() {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1 rounded-full bg-black/5 px-1.5 py-0.5">
        <span className="h-1 w-1 rounded-full bg-green-500" />
        <span className="font-mono text-[7px] text-ink-gray">https://app</span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className={`h-4 rounded ${i === 0 ? 'bg-orange-gradient' : 'bg-primary-50'}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inView}
            transition={{ duration: 0.3, delay: T.body + i * 0.1 }}
          />
        ))}
      </div>
    </div>
  )
}

function ContainersBody({ animate }: { animate: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {['api', 'web', 'jobs'].map((name, i) => (
        <motion.div
          key={name}
          className="flex flex-col items-center gap-0.5 rounded border border-primary-200 bg-primary-50/70 py-1.5"
          animate={animate ? { y: [0, -2, 0] } : undefined}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        >
          <span className="h-2.5 w-2.5 rounded-sm bg-orange-gradient" />
          <span className="font-mono text-[7px] text-ink-gray">{name}</span>
        </motion.div>
      ))}
    </div>
  )
}

function DocsBody() {
  const lines = [100, 80, 92, 60]
  return (
    <div className="flex gap-1.5">
      <div className="flex-1 space-y-1">
        {lines.map((w, i) => (
          <motion.span
            key={i}
            className={`block h-1 origin-left rounded-full ${i === 0 ? 'bg-primary' : 'bg-black/10'}`}
            style={{ width: `${w}%` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inView}
            transition={{ duration: 0.4, delay: T.body + i * 0.1 }}
          />
        ))}
      </div>
      <svg viewBox="0 0 40 40" className="h-9 w-9 flex-shrink-0" aria-hidden="true">
        <path d="M20 9 L8 30 M20 9 L32 30" stroke="#F7B8D6" strokeWidth="2" />
        <rect x="14" y="3" width="12" height="9" rx="2" fill="#D61F7F" />
        <rect x="2" y="27" width="12" height="9" rx="2" fill="#FFA940" />
        <rect x="26" y="27" width="12" height="9" rx="2" fill="#FFA940" />
      </svg>
    </div>
  )
}

// Animated "legacy → modern" illustration used in place of a project photo
function ProjectVisual({ legacy, targets, variant }: ProjectVisualProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      role="img"
      aria-label={`${legacy} modernized to ${targets.join(', ')}`}
      className="relative h-full w-full overflow-hidden bg-[#17121c]"
    >
      {/* Brand glows and a faint grid */}
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/40 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-12 -right-8 h-44 w-44 rounded-full bg-secondary/30 blur-3xl" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex items-center gap-2 px-5 pb-10 pt-10 sm:px-6" aria-hidden="true">
        <motion.div
          className="w-[36%] flex-shrink-0"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, delay: T.legacy, ease }}
        >
          <LegacyWindow label={legacy} />
        </motion.div>

        {/* Flow from legacy to modern: the path draws in, then dashes march and dots travel along it */}
        <div className="relative flex h-6 flex-1 items-center">
          <motion.svg
            className="h-px w-full origin-left overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 100 1"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inView}
            transition={{ duration: 0.5, delay: T.path, ease }}
          >
            <motion.line
              x1="0"
              y1="0.5"
              x2="100"
              y2="0.5"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
              animate={reduceMotion ? undefined : { strokeDashoffset: [0, -16] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.svg>
          {!reduceMotion &&
            [0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(255,169,64,0.8)]"
                initial={{ left: '0%', opacity: 0 }}
                animate={{ left: ['0%', '85%'], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: T.modern + i * 0.6 }}
              />
            ))}
          <motion.span
            className="absolute -right-1 flex"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={inView}
            transition={{ duration: 0.3, delay: T.path + 0.4 }}
          >
            <motion.span
              className="flex"
              animate={reduceMotion ? undefined : { x: [0, 3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="h-3.5 w-3.5 text-secondary" />
            </motion.span>
          </motion.span>
        </div>

        {/* Modern app window */}
        <motion.div
          className="w-[44%] flex-shrink-0"
          initial={{ opacity: 0, y: 12, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={inView}
          transition={{ duration: 0.55, delay: T.modern, ease }}
        >
          {/* Inner element owns the hover lift so it isn't overridden by the entrance animation's transform */}
          <div className="overflow-hidden rounded-lg bg-white shadow-2xl transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.04] group-hover:shadow-[0_12px_36px_rgba(214,31,127,0.45)] motion-reduce:transition-none">
            <div className="flex items-center gap-1 bg-orange-gradient px-2 py-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1 w-1 rounded-full bg-white/80" />
              ))}
            </div>
            <div className="p-2">
              {variant === 'dashboard' && <DashboardBody />}
              {variant === 'services' && <ServicesBody />}
              {variant === 'api' && <ApiBody />}
              {variant === 'web' && <WebBody />}
              {variant === 'containers' && <ContainersBody animate={!reduceMotion} />}
              {variant === 'docs' && <DocsBody />}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Target stack chips */}
      <div className="absolute inset-x-4 bottom-3 flex flex-wrap justify-end gap-1.5" aria-hidden="true">
        {targets.map((target, i) => (
          <motion.span
            key={target}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.35, delay: T.tags + i * 0.1, ease }}
          >
            <span
              className="block rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur transition duration-300 group-hover:-translate-y-0.5 group-hover:border-secondary/50 group-hover:bg-white/15 motion-reduce:transition-none"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {target}
            </span>
          </motion.span>
        ))}
      </div>
    </div>
  )
}

export default ProjectVisual
