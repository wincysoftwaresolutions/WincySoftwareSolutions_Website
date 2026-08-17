import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials } from '../utils/siteContent'

const AUTO_ADVANCE_MS = 6000

function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [paused, next])

  const testimonial = testimonials[index]

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
          <h2 className="text-3xl font-bold sm:text-4xl">What Our Clients Say</h2>
        </motion.div>

        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div className="glass-card relative overflow-hidden px-6 py-10 sm:px-12 sm:py-14">
            <Quote className="absolute right-8 top-8 h-16 w-16 text-primary-100" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                aria-live="polite"
                className="relative"
              >
                <div className="flex gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? 'fill-primary text-primary' : 'text-primary-100'
                      }`}
                    />
                  ))}
                </div>

                <p className="mt-6 text-lg leading-relaxed text-ink sm:text-xl">
                  “{testimonial.comment}”
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt=""
                    loading="lazy"
                    className="h-14 w-14 rounded-full border-2 border-primary-100 object-cover"
                  />
                  <div>
                    <p className="font-heading font-semibold text-ink">{testimonial.name}</p>
                    <p className="text-sm text-ink-gray">{testimonial.designation}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
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
                  className={`h-2.5 rounded-full transition-all duration-300 ${
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
