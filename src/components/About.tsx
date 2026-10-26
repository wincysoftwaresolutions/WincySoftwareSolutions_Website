import { motion } from 'framer-motion'
import { Eye, Target, type LucideIcon } from 'lucide-react'
import { aboutFeatures } from '../utils/siteContent'
import AboutVisual from './AboutVisual'
import { fadeUpVariants } from '../utils/motion'

const pillars: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To modernize legacy applications faster and safer, using AI-powered assessment, code transformation and testing to deliver cloud-ready systems with every business rule preserved.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: 'To be the most trusted modernization partner for enterprises that can’t afford downtime, built on transparency, engineering precision and speed.',
  },
]

const fadeUp = fadeUpVariants(24)

function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-surface-light">
      <div className="container-app">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            <motion.span variants={fadeUp} custom={0} className="section-eyebrow">
              About Us
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
              Modernization, Engineered for <span className="text-gradient">Continuity</span>
            </motion.h2>
            <motion.span
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: { duration: 0.6, delay: 0.35, ease: 'easeOut' } },
              }}
              className="mt-3 block h-1 w-16 origin-left rounded-full bg-orange-gradient"
              aria-hidden="true"
            />

            <motion.p variants={fadeUp} custom={2} className="mt-4 text-[1.1833rem] leading-[1.7] text-ink-gray">
              Wincy Software Solutions was founded on a simple belief: legacy applications hold years
              of proven business logic, and modernizing them shouldn&apos;t mean starting over. We are
              a team of engineers and modernization specialists who combine AI agents with deep
              expertise in VB6, Delphi, PowerBuilder and .NET to move mission-critical systems to
              React, .NET 10 and Azure, without disrupting the business.
            </motion.p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-8">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <motion.div
                    key={pillar.title}
                    variants={fadeUp}
                    custom={3 + index}
                    whileHover={{ y: -4 }}
                    className="group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors duration-300 group-hover:bg-orange-gradient group-hover:text-white">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <h3 className="font-heading text-[1.05rem] font-semibold text-ink">{pillar.title}</h3>
                    </div>
                    <p className="mt-3 text-[0.9833rem] leading-relaxed text-ink-gray">{pillar.text}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <AboutVisual />
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
          {aboutFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-surface p-5 hover:-translate-y-1 hover:shadow-softLg"
              >
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-heading text-[1.05rem] font-semibold text-ink">{feature.title}</h3>
                <p className="mt-1 text-[0.9833rem] leading-normal text-ink-gray">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About
