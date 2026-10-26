import { motion, useReducedMotion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const steps = [
  {
    title: 'Discover & Align',
    text: 'We start with an AI-assisted assessment of your legacy application, mapping code, dependencies and business rules, and align on goals, risks and the target stack. No assumptions, no generic playbooks.',
  },
  {
    title: 'Architect & Prototype',
    text: 'We design the target architecture on React, .NET 10 and Azure and modernize a pilot module first, so you see real, working software early, not just decks or diagrams.',
  },
  {
    title: 'Build & Iterate',
    text: 'AI-powered code transformation and automated testing move the system across module by module in short, transparent cycles, with your feedback built in at every step.',
  },
  {
    title: 'Deploy & Scale',
    text: 'We handle cutover, Azure deployment, monitoring and ongoing optimization, so your modernized system runs reliably at scale from day one with zero business disruption.',
  },
]

// Circle is h-16 (4rem); connectors start/end 0.75rem clear of each circle
const CIRCLE_CLEARANCE = 'calc(2rem + 0.75rem)'

function HowWeWork() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="how-we-work" className="section-padding bg-surface">
      <div className="container-app">
        <SectionHeader
          eyebrow="Our Process"
          title={
            <>
              How We <span className="text-gradient">Work</span>
            </>
          }
          underline
          subtitle="A transparent, iterative process designed to deliver working, modernized software fast, and evolve it intelligently over time."
        />

        <ol className="relative mx-auto mt-10 grid max-w-2xl gap-8 lg:mt-12 lg:max-w-none lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: index * 0.15, ease: 'easeOut' }}
                className="group relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                {/* Connector to the next step: horizontal on desktop, vertical below it */}
                {!isLast && (
                  <>
                    <span
                      className="absolute top-8 hidden h-px lg:block"
                      style={{ left: `calc(50% + ${CIRCLE_CLEARANCE})`, right: `calc(-50% - 2rem + ${CIRCLE_CLEARANCE})` }}
                      aria-hidden="true"
                    >
                      <span className="absolute inset-0 bg-primary-100" />
                      <motion.span
                        className="absolute inset-0 origin-left bg-orange-gradient"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.15, ease: 'easeOut' }}
                      />
                      {!reduceMotion && (
                        <motion.span
                          className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-primary shadow-[0_0_10px_rgba(214,31,127,0.7)]"
                          initial={{ left: '0%', opacity: 0 }}
                          animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1 + index * 0.5 }}
                        />
                      )}
                      <span className="absolute -right-1 -top-[3px] h-[7px] w-[7px] rounded-full bg-primary-300" />
                    </span>
                    <motion.span
                      className="absolute left-8 top-[4.75rem] -bottom-6 w-px origin-top bg-orange-gradient lg:hidden"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.15, ease: 'easeOut' }}
                      aria-hidden="true"
                    />
                  </>
                )}

                <div className="relative h-16 w-16 flex-shrink-0 self-start lg:self-center">
                  {!reduceMotion && (
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-primary/40"
                      animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: index * 0.6 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-orange-gradient font-mono text-lg-up font-bold text-white shadow-[0_0_28px_rgba(214,31,127,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(214,31,127,0.55)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="pt-2 transition-transform duration-300 group-hover:-translate-y-1 lg:mt-6 lg:max-w-[18rem] lg:pt-0">
                  <h3 className="text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.9833rem] leading-relaxed text-ink-gray">{step.text}</p>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default HowWeWork
