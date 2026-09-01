import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import Logo from './Logo'
import { navLinks } from '../utils/siteContent'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#home')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Dropdown parents (e.g. "Tech Stack") link to "#" rather than a real
    // page section, so they're excluded from scroll-spy tracking.
    const sections = navLinks
      .filter((link) => !link.children && link.href !== '#')
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close an open desktop dropdown on outside click or Escape.
  useEffect(() => {
    if (!openDropdown) return

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [openDropdown])

  const closeMenuAndNavigate = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMobileOpen(false)
    setOpenMobileDropdown(null)
    document.body.style.overflow = ''
    // Wait for the menu's collapse animation to finish so the target's
    // position is measured against the final layout, not the still-open menu.
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 280)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/85 shadow-soft backdrop-blur-xl' : 'bg-white/40 backdrop-blur-md'
      }`}
    >
      <nav
        ref={navRef}
        className="flex h-20 sm:h-24 lg:h-28 items-center justify-between gap-x-4 lg:gap-x-8 pl-2 sm:pl-3 lg:pl-4 pr-5 sm:pr-8 lg:pr-[calc(2.5rem+max(0px,(100vw-1280px)/2))]"
        aria-label="Primary"
      >
        <Logo className="-ml-2 sm:-ml-3 lg:-ml-4" />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <li key={link.label} className="relative">
                <button
                  type="button"
                  className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    openDropdown === link.label ? 'text-primary' : 'text-ink-gray hover:text-primary'
                  }`}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === link.label}
                  onClick={() => setOpenDropdown((prev) => (prev === link.label ? null : link.label))}
                  onMouseEnter={() => setOpenDropdown(link.label)}
                >
                  {link.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      openDropdown === link.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === link.label && (
                    <motion.ul
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      onMouseLeave={() => setOpenDropdown(null)}
                      className="absolute left-0 top-full mt-1 w-48 rounded-2xl border border-black/5 bg-white py-2 shadow-softLg"
                    >
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-2 text-sm font-medium text-ink-gray transition-colors hover:bg-primary-50 hover:text-primary"
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeHref === link.href
                      ? 'text-primary'
                      : 'text-ink-gray hover:text-primary'
                  }`}
                  aria-current={activeHref === link.href ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ),
          )}
        </ul>

        <div className="hidden lg:block">
          <a href="#contact" className="btn-primary">
            Get Started
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-primary-50 lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-black/5 bg-white lg:hidden"
          >
            <ul className="container-app flex flex-col gap-1 py-4">
              {navLinks.map((link) =>
                link.children ? (
                  <li key={link.label}>
                    <button
                      type="button"
                      aria-expanded={openMobileDropdown === link.label}
                      onClick={() =>
                        setOpenMobileDropdown((prev) => (prev === link.label ? null : link.label))
                      }
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        openMobileDropdown === link.label
                          ? 'bg-primary-50 text-primary'
                          : 'text-ink-gray hover:bg-primary-50 hover:text-primary'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openMobileDropdown === link.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openMobileDropdown === link.label && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-4"
                        >
                          {link.children.map((child) => (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                onClick={closeMenuAndNavigate(child.href)}
                                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-ink-gray transition-colors hover:bg-primary-50 hover:text-primary"
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMenuAndNavigate(link.href)}
                      className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        activeHref === link.href
                          ? 'bg-primary-50 text-primary'
                          : 'text-ink-gray hover:bg-primary-50 hover:text-primary'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ),
              )}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={closeMenuAndNavigate('#contact')}
                  className="btn-primary w-full"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
