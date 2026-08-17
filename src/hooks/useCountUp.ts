import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  start?: boolean
}

export function useCountUp({ end, duration = 2000, start = false }: UseCountUpOptions) {
  const [value, setValue] = useState(0)
  const frameRef = useRef<number | undefined>(undefined)
  const hasRunRef = useRef(false)

  useEffect(() => {
    if (!start || hasRunRef.current) return
    hasRunRef.current = true

    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * end))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [start, end, duration])

  return value
}
