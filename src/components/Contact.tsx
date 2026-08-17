import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react'
import { contactInfo, socialLinks } from '../utils/siteContent'

const socialIcons = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
  Twitter,
} as const

interface FormState {
  name: string
  email: string
  phone: string
  message: string
  _gotcha: string
}

const initialState: FormState = { name: '', email: '', phone: '', message: '', _gotcha: '' }

// Formspree keeps the recipient inbox private — the ID below is a public
// form endpoint, not a secret, but it's still read from an env var so each
// deployment (staging/prod) can point at its own form without a code change.
// See README "Contact Form" section for setup + why this approach is secure.
const FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ID
  ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
  : null

type Status = 'idle' | 'submitting' | 'success' | 'error'

function Contact() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot: real users never fill this hidden field, bots often do.
    if (form._gotcha) return

    if (!FORM_ENDPOINT) {
      setStatus('error')
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      })

      if (!response.ok) throw new Error('Submission failed')

      setStatus('success')
      setForm(initialState)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-padding bg-surface-light">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="text-3xl font-bold sm:text-4xl">Let&apos;s Discuss Your Modernization Journey</h2>
          <p className="mt-4 text-lg text-ink-gray">
            Connect with our modernization specialists to evaluate your existing systems and
            build a transformation roadmap tailored to your business.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="card-surface flex h-full flex-col gap-8 p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading font-semibold text-ink">Address</p>
                  <p className="mt-1 text-sm text-ink-gray">{contactInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading font-semibold text-ink">Phone</p>
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                    className="mt-1 block text-sm text-ink-gray hover:text-primary"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading font-semibold text-ink">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="mt-1 block text-sm text-ink-gray hover:text-primary"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="mt-auto">
                <p className="font-heading text-sm font-semibold text-ink">Follow Us</p>
                <div className="mt-3 flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = socialIcons[social.label as keyof typeof socialIcons]
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-100 text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="card-surface space-y-5 p-8" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange('name')}
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-100"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                    Business Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange('email')}
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-100"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-100"
                  placeholder="+91 00000 00000"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange('message')}
                  className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-100"
                  placeholder="Tell us about the systems you're looking to modernize..."
                />
              </div>

              {/* Honeypot: hidden from sighted users and screen readers, bots fill it anyway */}
              <input
                type="text"
                name="_gotcha"
                value={form._gotcha}
                onChange={handleChange('_gotcha')}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === 'submitting' ? 'Sending...' : 'Request Consultation'}
                {status === 'submitting' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  className="flex items-center gap-2 text-sm font-medium text-primary-700"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Thank you — our modernization specialists will be in touch shortly.
                </motion.p>
              )}

              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="flex items-center gap-2 text-sm font-medium text-red-600"
                >
                  <AlertCircle className="h-4 w-4" />
                  Something went wrong — please email us directly at{' '}
                  <a href={`mailto:${contactInfo.email}`} className="underline">
                    {contactInfo.email}
                  </a>
                  .
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
