'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Mail, Phone, FileText, Users,
  Clock, ShieldCheck, ArrowRight, ChevronDown,
} from 'lucide-react'
import { useState } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const channels = [
  {
    Icon: Mail,
    title: 'Engineering Support',
    description: 'For technical queries — wiring, integration, protocol configuration, firmware issues. Handled directly by Nordic Devices engineers, not a helpdesk.',
    detail: 'support@nordicdevices.no',
    cta: 'Send email',
    href: 'mailto:support@nordicdevices.no',
  },
  {
    Icon: FileText,
    title: 'Document Requests',
    description: 'Request qualification reports, FMEA documentation, PCN notifications, test certificates or custom datasheets not listed in the Technical Library.',
    detail: 'docs@nordicdevices.no',
    cta: 'Request document',
    href: 'mailto:docs@nordicdevices.no',
  },
  {
    Icon: Phone,
    title: 'Critical Incidents',
    description: 'For production-down situations with an active SLA. Available 24/7 to customers on the Enterprise support plan. Others: use email — we monitor outside business hours.',
    detail: '+47 22 00 12 34',
    cta: 'View SLA terms',
    href: '/contact',
  },
]

const tiers = [
  {
    name: 'Standard',
    subtitle: 'Included with every purchase',
    sla: '1 business day',
    features: [
      'Email support during CET business hours',
      'Access to full Technical Library',
      'Firmware update notifications',
      'Hardware revision / PCN notifications',
      '12-month coverage from shipment date',
    ],
    accent: false,
  },
  {
    name: 'Extended',
    subtitle: 'Available for active customers',
    sla: '4 business hours',
    features: [
      'Everything in Standard',
      'Dedicated support engineer',
      'Scheduled video or on-site sessions',
      'Priority firmware patch requests',
      '36-month coverage',
      'Quarterly product roadmap briefings',
    ],
    accent: true,
  },
  {
    name: 'Lifetime',
    subtitle: 'Long-Term Supply Programme',
    sla: '4 business hours',
    features: [
      'Everything in Extended',
      '10-year minimum supply guarantee',
      '24/7 critical incident line',
      'Source code escrow',
      'Last-time buy and lifetime stock options',
    ],
    accent: false,
  },
]

const faqs = [
  {
    q: 'What information should I include in a support request?',
    a: 'Include the product model, hardware revision (printed on the PCB label), firmware version, a description of the observed behaviour and, where possible, oscilloscope captures or log output from the RS-485 diagnostic port. This allows our engineers to reproduce the issue without a round-trip for more information.',
  },
  {
    q: 'How do I receive Product Change Notices (PCNs)?',
    a: 'PCNs are issued by email to registered contacts 60 days before any component change enters production. Register your product and contact details using the form on our Contact page, or email docs@nordicdevices.no with your order number.',
  },
  {
    q: 'Can you provide a hardware delta report between two revisions?',
    a: 'Yes. Send a request to support@nordicdevices.no with the product model and the two revision codes (e.g. Rev C → Rev D). We will provide a written delta analysis and flag any items requiring re-qualification on your carrier board.',
  },
  {
    q: 'What is covered by the 10-year supply guarantee?',
    a: 'Under the Long-Term Supply Programme, we commit to keeping the product in production and providing firmware security patches for a minimum of 10 years from the release date. End-of-life notices are issued no less than 2 years in advance. Last-time buy quantities and source code escrow are also available.',
  },
  {
    q: 'Do you offer on-site technical support?',
    a: 'On-site visits are available under the Extended and Lifetime support tiers for customers in Europe. For initial integration projects, on-site bring-up sessions can also be arranged as a paid engagement — contact your account manager or email contact@nordicdevices.no.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="overflow-hidden rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <button
        className="flex w-full items-center justify-between px-6 py-5 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="pr-4 text-sm font-semibold" style={{ color: 'var(--fg)' }}>{q}</span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className="shrink-0 transition-transform duration-200"
          style={{ color: 'var(--muted)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      {open && (
        <div className="border-t px-6 pb-5 pt-4" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{a}</p>
        </div>
      )}
    </div>
  )
}

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
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
              After-Sales
            </span>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <h1
                className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
                style={{ color: 'var(--fg)' }}
              >
                Technical
                <br />
                <span style={{ color: 'var(--accent)' }}>Support</span>
              </h1>
              <p className="max-w-sm text-sm leading-relaxed sm:text-right" style={{ color: 'var(--muted)' }}>
                Every Nordic Devices product comes with direct access to the engineering
                team that designed it — not a tier-1 helpdesk.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
              {[
                { Icon: Clock,       stat: '< 1 day',  label: 'Standard response time' },
                { Icon: Users,       stat: '120+',     label: 'Customers in 18 countries' },
                { Icon: ShieldCheck, stat: '10 yr',    label: 'Minimum supply guarantee' },
              ].map(({ Icon, stat, label }) => (
                <div key={label} className="flex flex-col gap-2 rounded-xl p-5" style={{ border: '1px solid var(--border)' }}>
                  <Icon size={18} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
                  <p className="font-heading text-2xl font-bold" style={{ color: 'var(--fg)' }}>{stat}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Channels */}
      <section className="px-4 py-14 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="mb-10"
          >
            <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--fg)' }}>
              Contact channels
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {channels.map(({ Icon, title, description, detail, cta, href }) => (
              <motion.div key={title} variants={fadeUp}
                className="flex flex-col gap-5 rounded-xl p-7"
                style={{ border: '1px solid var(--border)' }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: 'rgba(45,95,93,0.1)' }}>
                  <Icon size={20} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="font-heading text-lg font-semibold" style={{ color: 'var(--fg)' }}>{title}</h3>
                  <p className="flex-1 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{description}</p>
                  <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>{detail}</span>
                </div>
                <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-80" style={{ color: 'var(--accent)' }}>
                  {cta} <ArrowRight size={13} strokeWidth={2} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tiers */}
      <section className="px-4 py-14 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'rgba(45,95,93,0.02)' }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="mb-10"
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              Support Plans
            </span>
            <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--fg)' }}>
              Service levels
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {tiers.map(({ name, subtitle, sla, features, accent }) => (
              <motion.div key={name} variants={fadeUp}
                className="flex flex-col gap-5 rounded-xl p-7"
                style={{ border: accent ? '2px solid var(--accent)' : '1px solid var(--border)' }}
              >
                <div>
                  <p className="font-heading text-lg font-bold" style={{ color: 'var(--fg)' }}>{name}</p>
                  <p className="mt-0.5 text-xs" style={{ color: 'var(--muted)' }}>{subtitle}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs font-semibold" style={{ backgroundColor: 'rgba(45,95,93,0.1)', color: 'var(--accent)' }}>
                    <Clock size={11} strokeWidth={2} /> SLA: {sla}
                  </div>
                </div>
                <ul className="flex flex-1 flex-col gap-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <ArrowRight size={12} strokeWidth={2.5} className="mt-1 shrink-0" style={{ color: 'var(--accent)' }} />
                      <span className="text-sm" style={{ color: 'var(--muted)' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-14 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="mb-8"
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>FAQ</span>
            <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--fg)' }}>
              Common support questions
            </h2>
          </motion.div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => <FaqItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>
    </>
  )
}
