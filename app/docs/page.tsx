'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FileText, Cpu, BookOpen, PenLine,
  ShieldCheck, FolderOpen, Download, ArrowRight,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const sections = [
  {
    Icon: FileText,
    title: 'Product Datasheets',
    description: 'Electrical characteristics, pin-out tables, absolute maximum ratings and ordering information for every active SKU.',
    href: '/docs/datasheets',
    tag: 'PDF',
    count: '34 documents',
  },
  {
    Icon: BookOpen,
    title: 'Integration Manuals',
    description: 'Mechanical drawings, mounting guidance, power supply requirements, thermal management and communication wiring for each product family.',
    href: '/docs/getting-started',
    tag: 'Manual',
    count: '8 manuals',
  },
  {
    Icon: PenLine,
    title: 'Application Notes',
    description: 'Practical engineering guides covering CAN FD configuration, Modbus bridging, IECEx installation, low-power design and more.',
    href: '/docs/app-notes',
    tag: 'Guide',
    count: '22 notes',
  },
  {
    Icon: Cpu,
    title: 'Hardware Revisions',
    description: 'PCB revision history, component change notices and errata. Essential reading before qualifying a new batch for production.',
    href: '/changelog',
    tag: 'Reference',
    count: 'All products',
  },
  {
    Icon: ShieldCheck,
    title: 'Certification Documents',
    description: 'CE declarations of conformity, DNV GL type approval certificates, IECEx CoCs and FCC/IC authorisations — ready to download.',
    href: '/certifications',
    tag: 'Compliance',
    count: '4 schemes',
  },
  {
    Icon: FolderOpen,
    title: 'CAD & Mechanical Files',
    description: 'STEP models, DXF outlines, PCB footprints and 3D component libraries for ND-GW200, ND-CM100, ND-PC300 and ND-SN400.',
    href: '/docs/cad',
    tag: 'Download',
    count: 'STEP / DXF',
  },
]

const popular = [
  { label: 'ND-GW200 Datasheet rev. D',         size: '1.4 MB' },
  { label: 'ND-CM100 Integration Manual',         size: '3.1 MB' },
  { label: 'AN-014 — CAN FD on ND-GW200',        size: '680 KB' },
  { label: 'CE Declaration of Conformity 2025',  size: '210 KB' },
  { label: 'ND-SN400 STEP Model',                size: '5.2 MB' },
]

export default function DocsPage() {
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
              Technical Library
            </span>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <h1
                className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
                style={{ color: 'var(--fg)' }}
              >
                Documentation &
                <br />
                <span style={{ color: 'var(--accent)' }}>Downloads</span>
              </h1>
              <p className="max-w-sm text-sm leading-relaxed sm:text-right" style={{ color: 'var(--muted)' }}>
                Datasheets, integration manuals, application notes and certification
                documents for every Nordic Devices product.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section
        className="px-4 py-14 sm:px-6 lg:px-8"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {sections.map(({ Icon, title, description, href, tag, count }) => (
              <motion.div key={title} variants={fadeUp}>
                <Link
                  href={href}
                  className="group flex h-full flex-col gap-4 rounded-xl p-7 transition-shadow hover:shadow-sm"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ backgroundColor: 'rgba(45,95,93,0.1)' }}
                    >
                      <Icon size={20} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
                    </div>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{ backgroundColor: 'rgba(45,95,93,0.1)', color: 'var(--accent)' }}
                    >
                      {tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <h2 className="font-heading text-lg font-semibold" style={{ color: 'var(--fg)' }}>
                      {title}
                    </h2>
                    <p className="flex-1 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {description}
                    </p>
                    <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{count}</span>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-medium"
                    style={{ color: 'var(--accent)' }}
                  >
                    Browse
                    <ArrowRight size={13} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular downloads */}
      <section
        className="px-4 py-14 sm:px-6 lg:px-8"
        style={{ borderTop: '1px solid var(--border)', backgroundColor: 'rgba(45,95,93,0.02)' }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
          >
            <span
              className="mb-3 block text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--accent)' }}
            >
              Most Downloaded
            </span>
            <h2 className="mb-8 font-heading text-2xl font-bold tracking-tight" style={{ color: 'var(--fg)' }}>
              Popular documents
            </h2>

            <div
              className="overflow-hidden rounded-xl"
              style={{ border: '1px solid var(--border)' }}
            >
              {popular.map(({ label, size }, i) => (
                <button
                  key={label}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:opacity-80"
                  style={{
                    borderTop: i === 0 ? 'none' : '1px solid var(--border)',
                    backgroundColor: 'var(--bg)',
                  }}
                >
                  <span className="flex items-center gap-3 text-sm font-medium" style={{ color: 'var(--fg)' }}>
                    <FileText size={15} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
                    {label}
                  </span>
                  <span className="flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--muted)' }}>
                    {size}
                    <Download size={13} strokeWidth={2} style={{ color: 'var(--accent)' }} />
                  </span>
                </button>
              ))}
            </div>
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
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="font-heading text-xl font-semibold sm:text-2xl" style={{ color: 'var(--fg)' }}>
              Need a document not listed here?
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
              Qualification reports, FMEA documents and custom datasheets are available on request.
            </p>
          </div>
          <Link
            href="/support"
            className="inline-flex shrink-0 items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Contact support
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </motion.div>
      </section>
    </>
  )
}
