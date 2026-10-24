import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { techStack } from '../utils/techStackData'
function TechStack() {
  return (
    <>
      {techStack.map((tech, index) => {
        const Icon = tech.icon
        const reversed = index % 2 === 1

        return (
          <section
            key={tech.id}
            id={tech.id}
            className={`py-14 sm:py-16 lg:py-20 ${index % 2 === 0 ? 'bg-surface' : 'bg-surface-light'}`}
          >
            <div className="container-app grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: reversed ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className={reversed ? 'lg:order-2' : ''}
              >
                <span className="section-eyebrow">Tech Stack</span>
                <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">{tech.title}</h2>
                <p className="mt-5 text-[1.1833rem] leading-[1.7] text-ink-gray">{tech.description}</p>

                <ul className="mt-6 space-y-3">
                  {tech.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-ink-gray">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: reversed ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className={reversed ? 'lg:order-1' : ''}
              >
                <div className="card-surface p-8 sm:p-10">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-gradient text-white">
                    <Icon className="h-8 w-8" />
                  </span>
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
            </div>
          </section>
        )
      })}
    </>
  )
}

export default TechStack