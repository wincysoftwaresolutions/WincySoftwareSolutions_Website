import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import { stats, type StatItem } from '../utils/siteContent'

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const value = useCountUp({ end: stat.value, start: inView, duration: 1800 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <p className="font-heading text-4xl font-extrabold text-white sm:text-5xl">
        {value}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm font-medium uppercase tracking-widest text-white/80">
        {stat.label}
      </p>
    </motion.div>
  )
}

function Stats() {
  return (
    <section id="achievements" className="relative overflow-hidden bg-orange-gradient py-16 sm:py-20">
      <div className="bg-blob -left-10 -top-10 h-56 w-56 bg-white/10" aria-hidden="true" />
      <div className="bg-blob -right-10 bottom-0 h-56 w-56 bg-white/10" aria-hidden="true" />
      <div className="container-app relative grid grid-cols-2 gap-10 sm:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Stats
