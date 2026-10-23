import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials } from '../utils/siteContent'

const AUTO_ADVANCE_MS = 6000
const SIDE_SPACING = 0.85 // how far side cards sit from the center, as a fraction of card width
const SIDE_SCALE = 0.88

function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const prevIndexRef = useRef(0)
  const total = testimonials.length

  // Remember the previous index after each render so we can detect cards that wrap around.
  useEffect(() => {
    prevIndexRef.current = index
  }, [index])

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [paused, next])

  // Position of card i relative to an active index: 0 = center, -1 = left, 1 = right.
  const getOffset = (i: number, active: number) => {
    let diff = (i - active + total) % total
    if (diff > total / 2) diff -= total
    return diff
  }

  return (
    <section id="testimonials" className="section-padding bg-surface-light">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">Testimonials</span>
          <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">What Our Clients Say</h2>
        </motion.div>

        <div
          className="relative mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          {/* Stage: no overflow clipping, so side cards and their shadows show fully */}
          <div className="relative mx-auto h-[420px] w-full max-w-6xl py-6 sm:h-[360px]">
            {testimonials.map((testimonial, i) => {
              const offset = getOffset(i, index)
              const prevOffset = getOffset(i, prevIndexRef.current)
              const isCenter = offset === 0
              const isVisible = Math.abs(offset) <= 1
              // A card that jumps from one side to the other (3-card wrap-around).
              const wrapped = Math.abs(offset - prevOffset) > 1
              const targetOpacity = isCenter ? 1 : isVisible ? 0.6 : 0

              const spring = { type: 'spring' as const, stiffness: 110, damping: 20, mass: 0.9 }
              const fade = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }

              return (
                <motion.div
                  key={testimonial.name + i}
                  initial={false}
                  animate={{
                    x: `${offset * SIDE_SPACING * 100}%`,
                    scale: isCenter ? 1 : SIDE_SCALE,
                    opacity: wrapped ? [0, targetOpacity] : targetOpacity,
                    filter: isCenter ? 'blur(0px)' : 'blur(4px)',
                  }}
                  transition={
                    wrapped
                      ? {
                          // Teleport while hidden, then fade in at the new spot.
                          x: { duration: 0 },
                          scale: { duration: 0 },
                          filter: { duration: 0 },
                          opacity: { duration: 0.6, delay: 0.25, ease: 'easeOut' },
                        }
                      : { x: spring, scale: spring, opacity: fade, filter: fade }
                  }
                  style={{ zIndex: isCenter ? 10 : isVisible ? 5 : 0 }}
                  onClick={!isCenter && isVisible ? (offset > 0 ? next : prev) : undefined}
                  aria-hidden={!isCenter}
                  aria-live={isCenter ? 'polite' : undefined}
                  className={`absolute inset-y-6 left-0 right-0 mx-auto w-[min(26rem,82vw)] will-change-transform ${
                    isCenter ? '' : isVisible ? 'cursor-pointer' : 'pointer-events-none'
                  }`}
                >
                  <div className="card-surface relative flex h-full flex-col justify-between overflow-hidden px-6 py-8 shadow-softLg sm:px-8 sm:py-9">
                    <Quote
                      className="absolute right-6 top-6 h-14 w-14 text-primary-100"
                      aria-hidden="true"
                    />

                    <div className="relative">
                      <div className="flex gap-1" aria-hidden="true">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star
                            key={s}
                            className={`h-4 w-4 ${
                              s < testimonial.rating ? 'fill-primary text-primary' : 'text-primary-100'
                            }`}
                          />
                        ))}
                      </div>

                      <p className="mt-5 text-base-up leading-relaxed text-ink sm:text-lg-up">
                        “{testimonial.comment}”
                      </p>
                    </div>

                    <div className="relative mt-6 flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt=""
                        loading="lazy"
                        className="h-14 w-14 rounded-full border-2 border-primary-100 object-cover"
                      />
                      <div>
                        <p className="font-heading font-semibold text-ink">{testimonial.name}</p>
                        <p className="text-sm-up text-ink-gray">{testimonial.designation}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary-100 text-primary transition-colors hover:border-primary hover:bg-primary-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name + i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    i === index ? 'w-7 bg-orange-gradient' : 'w-2.5 bg-primary-100'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary-100 text-primary transition-colors hover:border-primary hover:bg-primary-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials