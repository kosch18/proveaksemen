'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CircuitBoard, Headset, ShieldCheck, GraduationCap,
  Search, PenLine, FlaskConical, Wrench,
  ArrowRight, type LucideIcon,
} from 'lucide-react'
import { services } from '@/lib/data/services'
import type { Service } from '@/lib/data/types'

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  CircuitBoard,
  Headset,
  ShieldCheck,
  GraduationCap,
}

// ─── Process steps ────────────────────────────────────────────────────────────

const PROCESS = [
  {
    Icon: Search,
    step: '01',
    title: 'Requirements Analysis',
    body: 'We map your hardware constraints, target environment, certification requirements and programme timeline before a single schematic is drawn.',
  },
  {
    Icon: PenLine,
    step: '02',
    title: 'Design & Prototyping',
    body: 'Schematic capture, multi-layer PCB layout, BSP development and firmware architecture — reviewed with your team at every milestone.',
  },
  {
    Icon: FlaskConical,
    step: '03',
    title: 'Validation & Certification',
    body: 'EMC pre-compliance and full testing in our Oslo lab, followed by DNV GL, CE, IECEx or domain-specific type approval.',
  },
  {
    Icon: Wrench,
    step: '04',
    title: 'Production & Lifetime Support',
    body: 'EMS coordination, incoming quality control and a dedicated support engineer available for the full operational lifetime of your product.',
  },
]

// ─── Animation variants ───────────────────────────────────────────────────────

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

// ─── Service card ─────────────────────────────────────────────────────────────

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = ICON_MAP[service.icon] ?? CircuitBoard
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className="group flex flex-col gap-5 rounded-xl p-7"
      style={{ border: '1px solid var(--border)' }}
    >
      {/* Number + icon row */}
      <div className="flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: 'rgba(45,95,93,0.1)' }}
        >
          <Icon size={22} strokeWidth={1.6} style={{ color: 'var(--accent)' }} />
        </div>
        <span
          className="font-mono text-xs font-semibold tabular-nums"
          style={{ color: 'var(--border)' }}
        >
          {num}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3">
        <h2
          className="font-heading text-xl font-semibold leading-snug"
          style={{ color: 'var(--fg)' }}
        >
          {service.title}
        </h2>
        <p
          className="flex-1 text-sm leading-relaxed"
          style={{ color: 'var(--muted)' }}
        >
          {service.description}
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/contact"
        className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors group-hover:gap-2.5"
        style={{ color: 'var(--accent)' }}
      >
        Get in touch
        <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  )
}

// ─── Process step ─────────────────────────────────────────────────────────────

function ProcessStep({
  step, Icon, title, body, last,
}: typeof PROCESS[0] & { last: boolean }) {
  return (
    <motion.div variants={fadeUp} className="relative flex flex-col gap-4">
      {/* Connector line (desktop) */}
      {!last && (
        <div
          className="absolute left-5 top-10 hidden h-full w-px lg:block"
          style={{ backgroundColor: 'var(--border)' }}
          aria-hidden
        />
      )}

      <div className="flex items-center gap-4">
        <div
          className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <Icon size={17} strokeWidth={2} color="#fff" />
        </div>
        <span
          className="font-mono text-xs font-semibold"
          style={{ color: 'var(--muted)' }}
        >
          Step {step}
        </span>
      </div>

      <div className="pl-14">
        <h3
          className="font-heading text-base font-semibold"
          style={{ color: 'var(--fg)' }}
        >
          {title}
        </h3>
        <p
          className="mt-1.5 text-sm leading-relaxed"
          style={{ color: 'var(--muted)' }}
        >
          {body}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
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
              What we offer
            </span>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <h1
                className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
                style={{ color: 'var(--fg)' }}
              >
                From concept to
                <br />
                certified product
              </h1>
              <p
                className="max-w-sm text-sm leading-relaxed sm:text-right"
                style={{ color: 'var(--muted)' }}
              >
                We work alongside your engineering team at every stage —
                architecture, firmware, compliance and long-term production support.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services grid ───────────────────────────────────────────────────── */}
      <section
        className="px-4 py-14 sm:px-6 lg:px-8"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {services.map((svc, i) => (
              <ServiceCard key={svc.id} service={svc} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How we work ─────────────────────────────────────────────────────── */}
      <section
        className="px-4 py-16 sm:px-6 lg:px-8"
        style={{ borderTop: '1px solid var(--border)', backgroundColor: 'rgba(45,95,93,0.02)' }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <span
              className="mb-3 block text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--accent)' }}
            >
              Our Process
            </span>
            <h2
              className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: 'var(--fg)' }}
            >
              How a project unfolds
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {PROCESS.map((step, i) => (
              <ProcessStep key={step.step} {...step} last={i === PROCESS.length - 1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
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
            <p
              className="font-heading text-xl font-semibold sm:text-2xl"
              style={{ color: 'var(--fg)' }}
            >
              Ready to start a project?
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
              Tell us about your requirements and we&apos;ll respond within one business day.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Contact our team
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </motion.div>
      </section>
    </>
  )
}
