import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { aboutFeatures } from '../utils/siteContent'

const highlights = [
  'AI-assisted assessment & transformation teams',
  'Phased migrations with zero business disruption',
  'Post-modernization support & optimization',
]

function About() {
  return (
    <section id="about" className="section-padding bg-surface-light">
      <div className="container-app grid items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-orange-gradient-soft" />
          <div className="overflow-hidden rounded-card shadow-softLg">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=60"
              alt="Wincy Software Solutions modernization engineering team collaborating"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="glass-card absolute -bottom-6 -right-6 hidden max-w-[220px] p-5 sm:block">
            <p className="font-heading text-3xl font-bold text-primary">40+</p>
            <p className="text-sm text-ink-gray">Enterprise clients modernized worldwide</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">About Us</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Helping Enterprises Modernize Mission-Critical Systems
          </h2>
          <p className="mt-5 text-lg text-ink-gray">
            We help organizations unlock the value hidden inside legacy applications by
            combining artificial intelligence with deep modernization expertise. From assessment
            to transformation, we accelerate digital initiatives while minimizing risk and
            preserving business continuity.
          </p>

          <ul className="mt-6 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-ink-gray">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-2 gap-5">
            {aboutFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="card-surface p-5 hover:-translate-y-1 hover:shadow-softLg"
                >
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-3 font-heading text-base font-semibold text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-gray">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
