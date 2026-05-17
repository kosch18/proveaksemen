'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ShieldCheck, Award, FileCheck, Globe,
  Download, ArrowRight, CheckCircle2,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const certifications = [
  {
    Icon: ShieldCheck,
    code: 'CE',
    title: 'CE Marking',
    body: 'All products comply with applicable EU directives including EMC Directive 2014/30/EU, RoHS 2011/65/EU, and where applicable the Radio Equipment Directive 2014/53/EU.',
    products: ['ND-GW200', 'ND-CM100', 'ND-PC300', 'ND-SN400'],
    doc: 'Declaration of Conformity',
  },
  {
    Icon: Award,
    code: 'DNV GL',
    title: 'DNV GL Type Approval',
    body: 'Marine-grade type approval for use in commercial shipping, offshore platforms and naval vessels. Covers temperature, vibration, EMI and power quality tests.',
    products: ['ND-GW200', 'ND-CM100'],
    doc: 'Type Approval Certificate',
  },
  {
    Icon: FileCheck,
    code: 'IECEx',
    title: 'IECEx — Explosive Atmospheres',
    body: 'Certification for use in Zone 2 / Division 2 explosive atmospheres (Group IIB+H2, T4). Required for oil & gas, chemical processing and mining applications.',
    products: ['ND-GW200'],
    doc: 'IECEx Certificate of Conformity',
  },
  {
    Icon: Globe,
    code: 'FCC / IC',
    title: 'FCC & Industry Canada',
    body: 'Part 15 Class B certification for the North American market. Required for any product with intentional or unintentional radio frequency emissions.',
    products: ['ND-GW200', 'ND-SN400'],
    doc: 'FCC Grant of Equipment Authorization',
  },
]

const compliance = [
  'RoHS 3 (EU) 2015/863 — restriction of hazardous substances',
  'REACH SVHC — substance of very high concern check',
  'Conflict minerals — Dodd-Frank Section 1502 compliance',
  'WEEE — waste electrical and electronic equipment directive',
  'UL 94 V-0 — PCB substrate flame classification',
]

export default function CertificationsPage() {
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
              Compliance
            </span>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <h1
                className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
                style={{ color: 'var(--fg)' }}
              >
                Certifications &
                <br />
                <span style={{ color: 'var(--accent)' }}>Compliance</span>
              </h1>
              <p className="max-w-sm text-sm leading-relaxed sm:text-right" style={{ color: 'var(--muted)' }}>
                All Nordic Devices products are independently tested and certified for the
                markets and environments in which they operate.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificates */}
      <section
        className="px-4 py-14 sm:px-6 lg:px-8"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="flex flex-col gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {certifications.map(({ Icon, code, title, body, products, doc }) => (
              <motion.div
                key={code}
                variants={fadeUp}
                className="grid grid-cols-1 gap-6 rounded-xl p-7 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-8"
                style={{ border: '1px solid var(--border)' }}
              >
                {/* Icon */}
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{ backgroundColor: 'rgba(45,95,93,0.1)' }}
                >
                  <Icon size={24} strokeWidth={1.6} style={{ color: 'var(--accent)' }} />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="rounded-md px-2.5 py-0.5 font-mono text-xs font-bold"
                      style={{ backgroundColor: 'rgba(45,95,93,0.15)', color: 'var(--accent)' }}
                    >
                      {code}
                    </span>
                    <h2
                      className="font-heading text-lg font-semibold"
                      style={{ color: 'var(--fg)' }}
                    >
                      {title}
                    </h2>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {body}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {products.map((p) => (
                      <span
                        key={p}
                        className="rounded-full px-2.5 py-0.5 font-mono text-xs"
                        style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Download */}
                <button
                  className="inline-flex shrink-0 items-center gap-2 self-start rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
                >
                  <Download size={14} strokeWidth={2} />
                  {doc}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional compliance */}
      <section
        className="px-4 py-14 sm:px-6 lg:px-8"
        style={{ borderTop: '1px solid var(--border)', backgroundColor: 'rgba(45,95,93,0.02)' }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="mb-3 block text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--accent)' }}
            >
              Material & Environmental
            </span>
            <h2
              className="mb-8 font-heading text-2xl font-bold tracking-tight"
              style={{ color: 'var(--fg)' }}
            >
              Additional compliance standards
            </h2>
            <ul className="flex flex-col gap-3">
              {compliance.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={16}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0"
                    style={{ color: 'var(--accent)' }}
                  />
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-4 py-14 sm:px-6 lg:px-8"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <motion.div
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="font-heading text-xl font-semibold sm:text-2xl" style={{ color: 'var(--fg)' }}>
              Need a custom certification?
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
              We support DNV, ABS, BV and other classification societies on request.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Talk to our team
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </motion.div>
      </section>
    </>
  )
}
