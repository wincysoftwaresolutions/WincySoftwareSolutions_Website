import { motion } from 'framer-motion'
import { services } from '../utils/siteContent'
import SectionHeader from './SectionHeader'

function Services() {
  return (
    <section id="services" className="section-padding bg-surface">
      <div className="container-app">
        <SectionHeader
          eyebrow="What We Do"
          title={
            <>
              Our <span className="text-gradient">Services</span>
            </>
          }
          subtitle="End-to-end modernization services that take legacy systems from assessment to cloud-ready transformation."
        />

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-6">
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
                className="card-surface group p-6 hover:border-primary-100 sm:p-7 hover:shadow-softLg"
              >
                <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary transition-colors duration-300 group-hover:bg-orange-gradient group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </span>
                <h3 className="text-2xl font-medium leading-[1.4] text-ink">{service.title}</h3>
                <p className="mt-3 text-[1.0333rem] leading-relaxed text-ink-gray">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
