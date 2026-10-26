import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  /** Short gradient bar that draws in under the title */
  underline?: boolean
}

// Centered section intro: eyebrow label, heading and optional subtitle, fading up into view
function SectionHeader({ eyebrow, title, subtitle, underline = false }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-2xl text-center"
    >
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">{title}</h2>
      {underline && (
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mx-auto mt-3 block h-1 w-16 rounded-full bg-orange-gradient"
          aria-hidden="true"
        />
      )}
      {subtitle && (
        <p className={`${underline ? 'mt-3' : 'mt-2'} text-[1.1333rem] leading-normal text-ink-gray`}>{subtitle}</p>
      )}
    </motion.div>
  )
}

export default SectionHeader
