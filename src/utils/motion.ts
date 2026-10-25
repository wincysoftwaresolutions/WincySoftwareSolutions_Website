// Shared Framer Motion settings so sections animate consistently

// Smooth "ease-out-expo"-style curve used by most entrance animations
export const easeOutExpo = [0.22, 1, 0.36, 1] as const

// Fade-and-rise variants; pass the stagger index through `custom`
export function fadeUpVariants(distance: number) {
  return {
    hidden: { opacity: 0, y: distance },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const },
    }),
  }
}
