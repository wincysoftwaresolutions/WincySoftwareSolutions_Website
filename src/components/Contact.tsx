import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Loader2, type LucideIcon } from 'lucide-react'
import { contactInfo, socialLinks } from '../utils/siteContent'
import { externalLinkProps } from '../utils/links'
import SectionHeader from './SectionHeader'

interface FormState {
  name: string
  email: string
  phone: string
  message: string
  _gotcha: string
}

const initialState: FormState = { name: '', email: '', phone: '', message: '', _gotcha: '' }

// Google Apps Script web app URL, read from .env / .env.local (VITE_SHEETS_URL)
const FORM_ENDPOINT: string | undefined = import.meta.env.VITE_SHEETS_URL

// Give up on a stalled request so the button never spins forever
const SUBMIT_TIMEOUT_MS = 15000

// Basic format check: something@something.tld (no spaces, commas or extra @).
const EMAIL_PATTERN = /^[^\s@,;<>]+@[^\s@,;<>]+\.[A-Za-z]{2,}$/

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'invalid' | 'badEmail' | 'mailFailed'

const STATUS_ID = 'contact-form-status'

const inputClass =
  'w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm-up text-ink outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-100 aria-[invalid=true]:border-red-400'

const mailLink = (
  <a href={`mailto:${contactInfo.email}`} className="underline">
    {contactInfo.email}
  </a>
)

function FormAlert({ children }: { children: ReactNode }) {
  return (
    <motion.p
      id={STATUS_ID}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      role="alert"
      className="flex items-start gap-2 text-sm-up font-medium text-red-600"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
      <span>{children}</span>
    </motion.p>
  )
}

function ContactRow({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="font-heading font-semibold text-ink">{label}</p>
        {children}
      </div>
    </div>
  )
}

function Contact() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<Status>('idle')

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

  // Close the success popup with the Escape key.
  useEffect(() => {
    if (status !== 'success') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setStatus('idle')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [status])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot: real users never fill this hidden field, bots often do.
    if (form._gotcha) return

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('invalid')
      return
    }

    if (!EMAIL_PATTERN.test(form.email.trim())) {
      setStatus('badEmail')
      return
    }

    if (!FORM_ENDPOINT) {
      console.error('VITE_SHEETS_URL is not set. Add it to your .env file and restart the dev server.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS)

    try {
      // text/plain keeps this a "simple" request, so the browser doesn't
      // send a CORS preflight that Apps Script can't answer.
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
        signal: controller.signal,
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const result = await response.json()
      if (result.result !== 'success') throw new Error('Script returned an error')

      if (result.mailSent === true) {
        setStatus('success')
        setForm(initialState)
      } else {
        // Saved in the sheet, but the acknowledgement mail could not be sent.
        setStatus('mailFailed')
      }
    } catch (err) {
      console.error('Form submit failed:', err)
      setStatus('error')
    } finally {
      window.clearTimeout(timeout)
    }
  }

  // Which fields to flag for assistive tech after a failed validation
  const invalid = {
    name: status === 'invalid' && !form.name.trim(),
    email: (status === 'invalid' && !form.email.trim()) || status === 'badEmail',
    message: status === 'invalid' && !form.message.trim(),
  }
  const fieldA11y = (field: keyof typeof invalid) =>
    invalid[field] ? { 'aria-invalid': true, 'aria-describedby': STATUS_ID } : {}

  return (
    <section id="contact" className="section-padding bg-surface-light">
      <div className="container-app">
        <SectionHeader
          eyebrow="Get In Touch"
          title={
            <>
              Let&apos;s Discuss Your <span className="text-gradient">Modernization Journey</span>
            </>
          }
          subtitle="Connect with our modernization specialists to evaluate your existing systems and build a transformation roadmap tailored to your business."
        />

        <div className="mt-6 grid grid-cols-1 gap-5 lg:mt-8 lg:grid-cols-5 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="card-surface flex h-full flex-col gap-6 p-6 sm:p-8">
              <ContactRow icon={MapPin} label="Address">
                <p className="mt-1 text-sm-up text-ink-gray">{contactInfo.address}</p>
              </ContactRow>
              <ContactRow icon={Phone} label="Phone">
                <a
                  href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                  className="mt-1 block text-sm-up text-ink-gray hover:text-primary"
                >
                  {contactInfo.phone}
                </a>
              </ContactRow>
              <ContactRow icon={Mail} label="Email">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="mt-1 block text-sm-up text-ink-gray [overflow-wrap:anywhere] hover:text-primary"
                >
                  {contactInfo.email}
                </a>
              </ContactRow>

              <div className="mt-auto">
                <p className="font-heading text-sm-up font-semibold text-ink">Follow Us</p>
                <div className="mt-3 flex gap-3">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      {...externalLinkProps(href)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-100 text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
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
            <form onSubmit={handleSubmit} className="card-surface space-y-4 p-6 sm:space-y-5 sm:p-8" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm-up font-medium text-ink">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={handleChange('name')}
                    className={inputClass}
                    placeholder="Your full name"
                    {...fieldA11y('name')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm-up font-medium text-ink">
                    Business Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange('email')}
                    className={inputClass}
                    placeholder="you@company.com"
                    {...fieldA11y('email')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm-up font-medium text-ink">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  className={inputClass}
                  placeholder="+91 00000 00000"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm-up font-medium text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  autoComplete="off"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange('message')}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about the systems you're looking to modernize..."
                  {...fieldA11y('message')}
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

              {status === 'invalid' && <FormAlert>Please fill in your name, email and message.</FormAlert>}
              {status === 'badEmail' && <FormAlert>Please enter a valid email address.</FormAlert>}
              {status === 'mailFailed' && (
                <FormAlert>
                  The mail could not be sent to this address. Kindly enter a valid email id and try
                  again, or write to us at {mailLink}.
                </FormAlert>
              )}
              {status === 'error' && (
                <FormAlert>Something went wrong — please email us directly at {mailLink}.</FormAlert>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success popup, drawn into document.body so it centers on the whole screen */}
      {createPortal(
        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setStatus('idle')}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5"
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="success-title"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-card bg-white p-8 text-center shadow-softLg"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary">
                  <CheckCircle2 className="h-9 w-9" />
                </span>
                <h3 id="success-title" className="mt-5 text-2xl font-bold text-ink">
                  Request Sent <span className="text-gradient">Successfully</span>
                </h3>
                <p className="mt-2 text-ink-gray">
                  Thank you — a confirmation has been sent to your email, and our modernization
                  specialists will be in touch shortly.
                </p>
                {/* Focus moves here so keyboard and screen-reader users land in the dialog */}
                <button type="button" autoFocus onClick={() => setStatus('idle')} className="btn-primary mt-7 w-full">
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}

export default Contact
