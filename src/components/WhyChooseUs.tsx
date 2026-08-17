import { motion } from 'framer-motion'
import { whyChooseUs } from '../utils/siteContent'

function WhyChooseUs() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">Why Choose Us</span>
          <h2 className="text-3xl font-bold sm:text-4xl">Reasons Enterprises Trust Us</h2>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className="flex items-start gap-4 rounded-card border border-black/5 bg-surface-light p-6 transition-shadow duration-300 hover:shadow-softLg"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-gradient text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-gray">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
