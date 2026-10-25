import { useCallback, useEffect, useRef, useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials, type Testimonial } from '../utils/siteContent'

import SectionHeader from './SectionHeader'
import { easeOutExpo } from '../utils/motion'

const AUTO_ADVANCE_MS = 6000
const SIDE_SPACING = 0.85 // how far side cards sit from the center, as a fraction of card width
const SIDE_SCALE = 0.88

// Illustrated professional avatar (no photo), in brand tones
function Avatar({ variant }: { variant: Testimonial['avatar'] }) {
  return (
    <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary-100 bg-primary-50">
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
        {variant === 'female' && (
          <path d="M18 30c0-11 6-18 14-18s14 7 14 18c0 8-2 14-4 18H22c-2-4-4-10-4-18z" fill="#4a2c2a" />
        )}
        {/* Shoulders: blazer with shirt collar */}
        <path d="M8 64c0-13 10-21 24-21s24 8 24 21z" fill={variant === 'female' ? '#B8176C' : '#3F3F46'} />
        <path d="M25 44l7 9 7-9c-2-1-4.5-1.5-7-1.5s-5 .5-7 1.5z" fill="#fff" />
        {variant === 'male' && <path d="M30.5 47h3l1 9-2.5 3-2.5-3z" fill="#D61F7F" />}
        <rect x="28" y="34" width="8" height="9" rx="3" fill="#E8B796" />
        <circle cx="32" cy="27" r="10" fill="#F2C7A5" />
        {variant === 'male' ? (
          <path d="M22 26c0-7 4.5-11 10-11s10 4 10 11c-1.5-3-4-5-10-5s-8.5 2-10 5z" fill="#3b2a26" />
        ) : (
          <path d="M22 28c0-8 4.5-12 10-12s10 4 10 12c-3-1-6-4-7-7-2 3-7 6-13 7z" fill="#4a2c2a" />
        )}
      </svg>
    </span>
  )
}

function Testimonials() {
  const [index, setIndex] = useState(0)
  // Auto-rotation pauses while any of these hold
  const [hovered, setHovered] = useState(false)
  const [keyboardFocused, setKeyboardFocused] = useState(false)
  const [pressing, setPressing] = useState(false)
  const [pageHidden, setPageHidden] = useState(false)
  const paused = hovered || keyboardFocused || pressing || pageHidden
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

  // Time left on the current slide. A new slide (auto or manual) gets the full interval; a pause
  // keeps the remainder so the countdown resumes where it stopped, in step with the progress dot.
  const remainingRef = useRef(AUTO_ADVANCE_MS)
  useEffect(() => {
    remainingRef.current = AUTO_ADVANCE_MS
  }, [index])

  // One timeout at a time, recreated on every slide change or resume, so timers never stack up
  useEffect(() => {
    if (paused) return
    const startedAt = performance.now()
    const timer = window.setTimeout(next, remainingRef.current)
    return () => {
      window.clearTimeout(timer)
      remainingRef.current = Math.max(0, remainingRef.current - (performance.now() - startedAt))
    }
  }, [index, paused, next])

  useEffect(() => {
    const handleVisibility = () => setPageHidden(document.visibilityState === 'hidden')
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // A press can end outside the carousel, so listen on the window while it lasts
  useEffect(() => {
    if (!pressing) return
    const release = () => setPressing(false)
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)
    return () => {
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
    }
  }, [pressing])

  // Position of card i relative to an active index: 0 = center, -1 = left, 1 = right.
  const getOffset = (i: number, active: number) => {
    let diff = (i - active + total) % total
    if (diff > total / 2) diff -= total
    return diff
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next()
    else if (e.key === 'ArrowLeft') prev()
  }

  return (
    // reducedMotion="user": slide/scale motion is skipped for visitors who prefer reduced motion
    <MotionConfig reducedMotion="user">
      <section id="testimonials" className="section-padding bg-surface-light">
        <div className="container-app">
          <SectionHeader
            eyebrow="Testimonials"
            title={
              <>
                What Our <span className="whitespace-nowrap text-gradient">Clients Say</span>
              </>
            }
          />

          <div
            className="relative mt-14"
            onPointerDown={() => setPressing(true)}
            // Pause for keyboard focus only; focus left on a button after a mouse click shouldn't freeze it
            onFocus={(e) => setKeyboardFocused(e.target.matches(':focus-visible'))}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setKeyboardFocused(false)
            }}
            onKeyDown={handleKeyDown}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            {/* Stage: no overflow clipping, so side cards and their shadows show fully */}
            <div className="relative mx-auto h-[480px] w-full max-w-6xl py-6 sm:h-[420px]">
              {testimonials.map((testimonial, i) => {
                const offset = getOffset(i, index)
                const prevOffset = getOffset(i, prevIndexRef.current)
                const isCenter = offset === 0
                const isVisible = Math.abs(offset) <= 1
                // A card that jumps from one side to the other (3-card wrap-around).
                const wrapped = Math.abs(offset - prevOffset) > 1
                const targetOpacity = isCenter ? 1 : isVisible ? 0.6 : 0

                const spring = { type: 'spring' as const, stiffness: 110, damping: 20, mass: 0.9 }
                const fade = { duration: 0.7, ease: easeOutExpo }

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
                    // Hover pause covers only the card being read (mouse only; touch has no matching leave),
                    // so a cursor resting on a side card or empty space doesn't stop the rotation
                    onPointerMove={(e) => e.pointerType === 'mouse' && setHovered(isCenter)}
                    onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
                    aria-hidden={!isCenter}
                    aria-live={isCenter ? 'polite' : undefined}
                    className={`absolute inset-y-6 left-0 right-0 mx-auto w-[min(26rem,82vw)] will-change-transform ${
                      isCenter ? '' : isVisible ? 'cursor-pointer' : 'pointer-events-none'
                    }`}
                  >
                    <div
                      className={`card-surface relative flex h-full flex-col justify-between overflow-hidden px-6 py-8 shadow-softLg sm:px-8 sm:py-9 ${
                        isCenter
                          ? 'hover:-translate-y-1.5 hover:border-primary-100 hover:shadow-[0_22px_50px_-14px_rgba(214,31,127,0.35)] motion-reduce:hover:translate-y-0'
                          : ''
                      }`}
                    >
                      <motion.span
                        className="absolute right-6 top-6"
                        initial={false}
                        animate={{ scale: isCenter ? 1 : 0.8, rotate: isCenter ? 0 : -12, opacity: isCenter ? 1 : 0.5 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 16, delay: isCenter ? 0.2 : 0 }}
                        aria-hidden="true"
                      >
                        <Quote className="h-14 w-14 text-primary-100" />
                      </motion.span>

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
                        <Avatar variant={testimonial.avatar} />
                        <div className="min-w-0">
                          <p className="font-heading font-semibold text-ink">{testimonial.name}</p>
                          <p className="text-sm-up leading-snug text-ink-gray">{testimonial.designation}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div
              className="mx-auto mt-4 flex w-fit items-center justify-center gap-4"
              onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
              onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
            >
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="group flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary-100 text-primary transition-all duration-300 hover:border-primary hover:bg-primary-50 hover:shadow-[0_6px_18px_rgba(214,31,127,0.2)]"
              >
                <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5 motion-reduce:transition-none" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name + i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={i === index}
                    className={`relative h-2.5 overflow-hidden rounded-full transition-all duration-500 ${
                      i === index ? 'w-10 bg-primary-100' : 'w-2.5 bg-primary-100 hover:bg-primary-300'
                    }`}
                  >
                    {i === index && (
                      <span
                        key={index}
                        className="absolute inset-0 origin-left rounded-full bg-orange-gradient"
                        style={{
                          animation: `testi-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
                          animationPlayState: paused ? 'paused' : 'running',
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="group flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary-100 text-primary transition-all duration-300 hover:border-primary hover:bg-primary-50 hover:shadow-[0_6px_18px_rgba(214,31,127,0.2)]"
              >
                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default Testimonials