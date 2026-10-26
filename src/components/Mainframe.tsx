import { motion } from 'framer-motion'
import { ArrowRight, Layers, BrainCircuit } from 'lucide-react'
import HeroPipeline from './HeroPipeline'
import { fadeUpVariants } from '../utils/motion'

const fadeUp = fadeUpVariants(28)

function Mainframe() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-orange-gradient-soft pb-10 pt-6 sm:pb-12 sm:pt-8 lg:pb-12 lg:pt-10"
    >
      <div
        className="bg-blob -left-24 -top-24 h-72 w-72 bg-primary-200 animate-blob"
        aria-hidden="true"
      />
      <div
        className="bg-blob -right-16 top-40 h-80 w-80 bg-secondary/40 animate-blob"
        style={{ animationDelay: '4s' }}
        aria-hidden="true"
      />
      <div
        className="bg-blob bottom-0 left-1/3 h-64 w-64 bg-primary-100 animate-blob"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />

      <div className="container-app relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <motion.span
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="section-eyebrow"
          >
            <BrainCircuit className="h-3.5 w-3.5" />
            AI-Powered Legacy Modernization
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-4xl font-bold leading-[1.1] text-ink md:text-5xl lg:text-6xl"
          >
            Modernize Legacy Applications with{' '}
            <span className="text-gradient">
              <span className="whitespace-nowrap">AI-Powered</span> Transformation
            </span>
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mt-5 flex items-center gap-3"
          >
            <span className="h-7 w-1 flex-shrink-0 rounded-full bg-orange-gradient" />
            <p className="font-heading text-lg font-semibold text-ink sm:text-xl">
              From Legacy to Leading-Edge.
            </p>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="mt-5 max-w-xl text-[1.2333rem] leading-relaxed text-ink-gray"
          >
            Accelerate enterprise modernization by transforming legacy applications into
            scalable, cloud-ready, and future-proof solutions using AI-driven automation and
            expert engineering.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <a href="#contact" className="btn-primary">
              Start Modernization
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#services" className="btn-secondary">
              <Layers className="h-4 w-4" />
              Explore Services
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={5}
            className="mt-7 flex items-center gap-8"
          >
            <div>
              <p className="font-heading text-2xl-up font-bold text-ink">10+</p>
              <p className="text-sm-up text-ink-gray">Applications Assessed</p>
            </div>
            <div className="h-10 w-px bg-black/10" />
            <div>
              <p className="font-heading text-2xl-up font-bold text-ink">5+</p>
              <p className="text-sm-up text-ink-gray">Enterprise Clients</p>
            </div>
          </motion.div>
        </div>

        <HeroPipeline />
      </div>
    </section>
  )
}

export default Mainframe