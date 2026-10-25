import { useSyncExternalStore } from 'react'
import { techStack } from '../utils/techStackData'

// Which tech stack the Tech Stack section is showing. Shared by the section,
// the navbar dropdown and any `#<tech-id>` link on the page.
let selectedId = techStack[0].id
const listeners = new Set<() => void>()

export const TECH_SECTION_ID = 'tech-stack'

export function isTechId(id: string) {
  return techStack.some((tech) => tech.id === id)
}

export function selectTech(id: string, { scroll = true }: { scroll?: boolean } = {}) {
  if (!isTechId(id)) return
  if (id !== selectedId) {
    selectedId = id
    listeners.forEach((listener) => listener())
  }
  // Reflect the selection in the URL like other section links, without triggering an anchor jump
  history.replaceState(null, '', `#${id}`)
  if (scroll) {
    document.getElementById(TECH_SECTION_ID)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useSelectedTech() {
  return useSyncExternalStore(subscribe, () => selectedId)
}
