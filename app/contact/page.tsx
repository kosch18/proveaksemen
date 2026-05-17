'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Mail, Phone, Linkedin, Github, Twitter, CheckCircle, Send } from 'lucide-react'
import { company } from '@/lib/data/company'

// ─── Types ────────────────────────────────────────────────────────────────────

type Fields = {
  name: string
  company: string
  email: string
  subject: string
  message: string
}

type Errors = Partial<Record<keyof Fields, string>>

const SUBJECTS = [
  'Custom development',
  'Technical support',
  'Audit & certification',
  'Training',
  'Product enquiry',
  'Other',
]

const EMPTY: Fields = { name: '', company: '', email: '', subject: '', message: '' }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (!f.name.trim())    e.name    = 'Please enter your name'
  if (!f.email.trim())   e.email   = 'Please enter your email'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = 'Enter a valid email address'
  if (!f.message.trim()) e.message = 'Please write a message'
  return e
}

// ─── Field component ──────────────────────────────────────────────────────────

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: 'var(--fg)' }}>
        {label}
        {required && (
          <span style={{ color: 'var(--accent)' }}> *</span>
        )}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="text-xs"
            style={{ color: '#DC2626' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputBase: React.CSSProperties = {
  border: '1px solid var(--border)',
  backgroundColor: 'var(--bg)',
  color: 'var(--fg)',
  borderRadius: '0.5rem',
  fontSize: '0.875rem',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.15s',
}

// ─── Contact form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [fields, setFields]     = useState<Fields>(EMPTY)
  const [errors, setErrors]     = useState<Errors>({})
  const [submitting, setSub]    = useState(false)
  const [submitted, setDone]    = useState(false)

  function set(key: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFields((f) => ({ ...f, [key]: e.target.value }))
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
    }
  }

  function handleFocus(e: React.FocusEvent<HTMLElement>) {
    ;(e.target as HTMLElement).style.borderColor = 'var(--accent)'
  }
  function handleBlur(e: React.FocusEvent<HTMLElement>) {
    ;(e.target as HTMLElement).style.borderColor = 'var(--border)'
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSub(true)
    await new Promise((r) => setTimeout(r, 700))
    console.log('[Contact form submitted]', fields)
    setSub(false)
    setDone(true)
  }

  /* ── Success state ── */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-5 rounded-xl px-8 py-14 text-center"
        style={{ border: '1px solid var(--border)' }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: 'rgba(45,95,93,0.12)' }}
        >
          <CheckCircle size={28} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <p
            className="font-heading text-xl font-semibold"
            style={{ color: 'var(--fg)' }}
          >
            Message sent
          </p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            Thank you, {fields.name.split(' ')[0]}. We&apos;ll get back to you
            within one business day.
          </p>
        </div>
        <button
          onClick={() => { setFields(EMPTY); setDone(false) }}
          className="mt-2 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: 'var(--accent)' }}
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  /* ── Form ── */
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Name + Company */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" required error={errors.name}>
          <input
            type="text"
            value={fields.name}
            onChange={set('name')}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Erik Halvorsen"
            style={{ ...inputBase, padding: '0.625rem 0.875rem' }}
            autoComplete="name"
          />
        </Field>
        <Field label="Company">
          <input
            type="text"
            value={fields.company}
            onChange={set('company')}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Nordic Devices AS"
            style={{ ...inputBase, padding: '0.625rem 0.875rem' }}
            autoComplete="organization"
          />
        </Field>
      </div>

      {/* Email + Subject */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Email" required error={errors.email}>
          <input
            type="email"
            value={fields.email}
            onChange={set('email')}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="erik@example.no"
            style={{ ...inputBase, padding: '0.625rem 0.875rem' }}
            autoComplete="email"
          />
        </Field>
        <Field label="Subject">
          <select
            value={fields.subject}
            onChange={set('subject')}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ ...inputBase, padding: '0.625rem 0.875rem', cursor: 'pointer' }}
          >
            <option value="">Select a topic…</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Message */}
      <Field label="Message" required error={errors.message}>
        <textarea
          value={fields.message}
          onChange={set('message')}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={5}
          placeholder="Describe your project or question…"
          style={{ ...inputBase, padding: '0.625rem 0.875rem', resize: 'vertical', minHeight: '120px' }}
        />
      </Field>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {submitting ? (
            <motion.span
              key="spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Sending…
            </motion.span>
          ) : (
            <motion.span
              key="send"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Send size={15} strokeWidth={2} />
              Send message
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <p className="text-center text-xs" style={{ color: 'var(--muted)' }}>
        We respond within one business day (CET).
      </p>
    </form>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-14 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="mb-3 block text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--accent)' }}
            >
              Contact
            </span>
            <h1
              className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ color: 'var(--fg)' }}
            >
              Let&apos;s build something
              <br />
              <span style={{ color: 'var(--accent)' }}>reliable together</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── Main: info + form ───────────────────────────────────────────────── */}
      <section
        className="px-4 py-14 sm:px-6 lg:px-8"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[2fr_3fr] lg:gap-20">

            {/* ── Info panel ── */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-10"
            >
              <div>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--muted)' }}
                >
                  Whether you need a custom embedded platform, a technical audit or
                  simply want to talk through your requirements — our engineering team
                  is ready to listen. No sales scripts, just honest advice.
                </p>
              </div>

              {/* Contact details */}
              <div className="flex flex-col gap-5">
                <h2
                  className="font-heading text-sm font-semibold uppercase tracking-widest"
                  style={{ color: 'var(--fg)' }}
                >
                  Office
                </h2>

                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={16}
                      strokeWidth={1.75}
                      className="mt-0.5 shrink-0"
                      style={{ color: 'var(--accent)' }}
                    />
                    <div className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                      <p>{company.contact.address}</p>
                      <p>{company.contact.city}, {company.contact.country}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail
                      size={16}
                      strokeWidth={1.75}
                      className="shrink-0"
                      style={{ color: 'var(--accent)' }}
                    />
                    <a
                      href={`mailto:${company.contact.email}`}
                      className="text-sm transition-colors hover:underline"
                      style={{ color: 'var(--muted)' }}
                    >
                      {company.contact.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone
                      size={16}
                      strokeWidth={1.75}
                      className="shrink-0"
                      style={{ color: 'var(--accent)' }}
                    />
                    <a
                      href={`tel:${company.contact.phone.replace(/\s/g, '')}`}
                      className="font-mono text-sm transition-colors hover:underline"
                      style={{ color: 'var(--muted)' }}
                    >
                      {company.contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div
                className="rounded-xl p-5"
                style={{ border: '1px solid var(--border)', backgroundColor: 'rgba(45,95,93,0.03)' }}
              >
                <p
                  className="mb-3 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: 'var(--fg)' }}
                >
                  Office hours
                </p>
                <dl className="flex flex-col gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                  {[
                    { day: 'Mon – Fri', hours: '08:00 – 17:00 CET' },
                    { day: 'Sat – Sun', hours: 'Closed' },
                    { day: 'Critical support', hours: '24 / 7 via SLA' },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between gap-4">
                      <dt>{day}</dt>
                      <dd className="font-mono tabular-nums">{hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Socials */}
              <div className="flex flex-col gap-3">
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: 'var(--fg)' }}
                >
                  Follow us
                </p>
                <div className="flex gap-3">
                  {[
                    { Icon: Linkedin, href: company.socials.linkedin, label: 'LinkedIn' },
                    { Icon: Github,   href: company.socials.github,   label: 'GitHub' },
                    { Icon: Twitter,  href: company.socials.twitter,  label: 'Twitter' },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
                      style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--accent)'
                        e.currentTarget.style.borderColor = 'var(--accent)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--muted)'
                        e.currentTarget.style.borderColor = 'var(--border)'
                      }}
                    >
                      <Icon size={16} strokeWidth={1.75} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="mb-7 font-heading text-xl font-semibold"
                style={{ color: 'var(--fg)' }}
              >
                Send us a message
              </p>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
