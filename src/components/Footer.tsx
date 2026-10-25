import FooterLogo from './FooterLogo'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
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
    <footer className="bg-ink text-white/85">
      <div className="container-app grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          {/* Logo sits beside the heading; on 2xl it spans heading + text and is vertically centred on both */}
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 2xl:gap-x-6">
            <FooterLogo className="2xl:row-span-2" />
            <p className="text-sm font-semibold text-white">
              VISION
            </p>
            <p className="col-span-2 mt-3 text-sm-up leading-relaxed 2xl:col-span-1 2xl:col-start-2">
              Wincy Software Solutions delivers AI-powered legacy modernization, cloud migration, and
              application transformation for enterprises that can&apos;t afford downtime. Our unified
              platform uses intelligent agents to assess and document legacy applications, recommend
              modern technology stacks, refactor or rehost code, generate tests, validate performance, and
              prepare applications for production deployment.
            </p>
          </div>
          {/* 2xl: indent past the logo (178px) + gap (24px) so the icons line up with the text */}
          <div className="mt-6 flex gap-3 2xl:ml-[202px]">
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
          <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
            Quick Links
          </h2>
          <ul className="mt-5 space-y-3 text-sm-up">
            {navLinks.map((link) => {
              return (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
            Services
          </h2>
          <ul className="mt-5 space-y-3 text-sm-up">
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
          <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
            Contact
          </h2>
          <ul className="mt-5 space-y-4 text-sm-up">
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
              <a href={`mailto:${contactInfo.email}`} className="min-w-0 [overflow-wrap:anywhere] hover:text-primary">
                {contactInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-app flex flex-col items-center justify-between gap-3 text-center text-xs-up text-white/70 sm:flex-row sm:text-left">
          <p>&copy; {year} Wincy Software Solutions. All rights reserved.</p>
          <p>Transforming Legacy Systems into Future-Ready Solutions.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer