import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function CTA() {
  return (
    <section className="relative overflow-hidden bg-orange-gradient py-16 sm:py-20">
      <div className="bg-blob -left-16 top-1/2 h-72 w-72 -translate-y-1/2 bg-white/10" aria-hidden="true" />
      <div className="bg-blob -right-16 top-1/2 h-72 w-72 -translate-y-1/2 bg-white/10" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="container-app relative flex flex-col items-center gap-6 text-center"
      >
        <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl">
          Ready to Modernize Your Legacy Applications?
        </h2>
        <p className="max-w-xl text-white/90">
          Discover how AI-powered modernization can reduce costs, improve agility, and
          accelerate digital transformation.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-card bg-white px-8 py-3.5 font-heading text-sm font-semibold text-primary-700 shadow-softLg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
        >
          Book a Consultation
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </section>
  )
}

export default CTA
