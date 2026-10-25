import { MotionConfig, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../utils/siteContent'
import ProjectVisual from './ProjectVisual'

const ease = [0.22, 1, 0.36, 1] as const

const headerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

function Projects() {
  return (
    // reducedMotion="user": transform animations are skipped for visitors who prefer reduced motion
    <MotionConfig reducedMotion="user">
      <section id="projects" className="section-padding bg-surface">
        <div className="container-app">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.12 }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span variants={headerItem} className="section-eyebrow">
              Our Work
            </motion.span>
            <motion.h2 variants={headerItem} className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
              Featured <span className="text-gradient">Projects</span>
            </motion.h2>
            <motion.p variants={headerItem} className="mt-4 text-[1.1333rem] leading-normal text-ink-gray">
              How we take each legacy stack from assessment to a modern, cloud-ready application on
              Azure.
            </motion.p>
          </motion.div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease }}
                whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.3, ease } }}
                className="card-surface group relative overflow-hidden transition-[box-shadow,border-color] duration-300 hover:border-primary-100 hover:shadow-[0_18px_50px_-12px_rgba(214,31,127,0.28)]"
              >
                {/* Accent glow ring and bottom gradient bar, revealed on hover */}
                <span
                  className="pointer-events-none absolute inset-0 z-20 rounded-card ring-1 ring-inset ring-primary/0 transition duration-300 group-hover:ring-primary/25"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-0.5 origin-left scale-x-0 bg-orange-gradient transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                  aria-hidden="true"
                />

                <div className="relative aspect-[16/10] overflow-hidden">
                  <ProjectVisual legacy={project.legacy} targets={project.targets} variant={project.variant} />
                  <motion.span
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.25 + (index % 3) * 0.12, ease }}
                    className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs-up font-semibold text-primary-700 backdrop-blur transition-shadow duration-300 group-hover:shadow-[0_0_16px_rgba(255,255,255,0.45)]"
                  >
                    {project.category}
                  </motion.span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium leading-[1.4] text-ink transition-colors duration-300 group-hover:text-primary-700">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-[1.0333rem] leading-relaxed text-ink-gray">{project.description}</p>
                  <a
                    href={project.href}
                    className="relative mt-4 inline-flex items-center gap-1.5 text-sm-up font-semibold text-primary transition-colors hover:text-primary-700"
                  >
                    Read More
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 motion-reduce:transition-none" />
                    <span
                      className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-orange-gradient transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default Projects
