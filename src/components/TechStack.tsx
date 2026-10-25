import { useEffect, useRef } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { techStack } from '../utils/techStackData'
import { TECH_SECTION_ID, isTechId, selectTech, useSelectedTech } from '../hooks/useTechSelection'
import { easeOutExpo } from '../utils/motion'

const ease = easeOutExpo

const panel = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, ease } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease } },
}
const fromLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
}
const fromRight = {
  hidden: { opacity: 0, x: 24, scale: 0.97 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease } },
}

// Shows one technology at a time; switched by the tabs here, the navbar dropdown or any `#<tech-id>` link
function TechStack() {
  const selectedId = useSelectedTech()
  const tech = techStack.find((t) => t.id === selectedId) ?? techStack[0]
  const Icon = tech.icon
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Route `#vb6`-style links (hero panel, back/forward) to this section instead of a missing anchor
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]')
      const id = link?.getAttribute('href')?.slice(1) ?? ''
      if (!isTechId(id)) return
      e.preventDefault()
      selectTech(id)
    }
    const handleHash = () => {
      const id = location.hash.slice(1)
      if (isTechId(id)) selectTech(id)
    }

    // No initial-hash handling: main.tsx deliberately strips the hash and starts at the top on load
    document.addEventListener('click', handleClick)
    window.addEventListener('hashchange', handleHash)
    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('hashchange', handleHash)
    }
  }, [])

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    const offset = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!offset) return
    e.preventDefault()
    const next = (index + offset + techStack.length) % techStack.length
    selectTech(techStack[next].id, { scroll: false })
    tabRefs.current[next]?.focus()
  }

  return (
    <MotionConfig reducedMotion="user">
      <section id={TECH_SECTION_ID} className="section-padding bg-surface">
        <div className="container-app">
          <motion.div
            role="tablist"
            aria-label="Technology stacks"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            {techStack.map((item, index) => {
              const TabIcon = item.icon
              const active = item.id === tech.id
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[index] = el
                  }}
                  type="button"
                  role="tab"
                  id={`tech-tab-${item.id}`}
                  aria-selected={active}
                  aria-controls="tech-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => selectTech(item.id, { scroll: false })}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm-up font-semibold transition-colors duration-300 sm:px-5 sm:py-2.5 ${
                    active
                      ? 'border-transparent text-white'
                      : 'border-black/5 bg-white text-ink-gray shadow-soft hover:border-primary-200 hover:text-primary'
                  }`}
                >
                  {/* Active highlight slides between tabs */}
                  {active && (
                    <motion.span
                      layoutId="tech-tab-active"
                      className="absolute inset-0 rounded-full bg-orange-gradient shadow-softLg"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <TabIcon className="relative h-4 w-4" />
                  <span className="relative">{item.label}</span>
                </button>
              )
            })}
          </motion.div>

          <div className="mt-12 lg:mt-14">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tech.id}
                id="tech-panel"
                role="tabpanel"
                aria-labelledby={`tech-tab-${tech.id}`}
                variants={panel}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
              >
                <motion.div variants={fromLeft}>
                  <span className="section-eyebrow">Tech Stack</span>
                  <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
                    {/* Highlight the final word of each title with the brand gradient */}
                    {tech.title.slice(0, tech.title.lastIndexOf(' ') + 1)}
                    <span className="text-gradient">{tech.title.slice(tech.title.lastIndexOf(' ') + 1)}</span>
                  </h2>
                  <p className="mt-5 text-[1.1833rem] leading-[1.7] text-ink-gray">{tech.description}</p>

                  <ul className="mt-6 space-y-3">
                    {tech.points.map((point, i) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease }}
                        className="flex items-start gap-3 text-ink-gray"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={fromRight}>
                  <div className="card-surface p-8 sm:p-10">
                    <motion.span
                      initial={{ scale: 0.6, rotate: -12, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
                      className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-gradient text-white"
                    >
                      <Icon className="h-8 w-8" />
                    </motion.span>
                    <h3 className="mt-6 text-2xl font-bold text-ink">{tech.label}</h3>
                    <p className="mt-5 text-xs-up font-semibold uppercase tracking-widest text-primary-600">
                      Modernized to
                    </p>
                    <p className="mt-1 text-ink-gray">{tech.target}</p>
                    <a href="#contact" className="btn-primary mt-8">
                      Discuss your {tech.label} project
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default TechStack
