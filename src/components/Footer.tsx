import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import Logo from './Logo'
import { contactInfo, navLinks, services, socialLinks } from '../utils/siteContent'

const socialIcons = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
  Twitter,
} as const

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-white/70">
      <div className="container-app grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="light" />
          <p className="mt-5 text-sm leading-relaxed">
            AI-powered legacy modernization, cloud migration and application transformation — built
            for enterprises that can&apos;t afford downtime.
          </p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.label as keyof typeof socialIcons]
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
            Services
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.slice(0, 6).map((service) => (
              <li key={service.title}>
                <a href="#services" className="transition-colors hover:text-primary">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
            Contact
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
              {contactInfo.address}
            </li>
            <li className="flex items-start gap-3">
              <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
              <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="hover:text-primary">
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-primary">
                {contactInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-app flex flex-col items-center justify-between gap-3 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>&copy; {year} Wincy Software Solutions. All rights reserved.</p>
          <p>Transforming Legacy Systems into Future-Ready Solutions.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
