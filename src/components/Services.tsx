import { motion } from 'framer-motion'
import { services } from '../utils/siteContent'

function Services() {
  return (
    <section id="services" className="section-padding bg-surface">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">What We Do</span>
          <h2 className="text-3xl font-bold sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-ink-gray">
            End-to-end modernization services that take legacy systems from assessment to
            cloud-ready transformation.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                whileHover={{ y: -8 }}
                className="card-surface group p-8 hover:border-primary-100 hover:shadow-softLg"
              >
                <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary transition-colors duration-300 group-hover:bg-orange-gradient group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </span>
                <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
                <p className="mt-3 text-ink-gray">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
