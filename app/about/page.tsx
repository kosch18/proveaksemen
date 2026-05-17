'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, Layers, Handshake, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { company } from '@/lib/data/company'
import type { CompanyMilestone } from '@/lib/data/types'

// ─── Values ──────────────────────────────────────────────────────────────────

const values = [
  {
    Icon: ShieldCheck,
    title: 'Reliability First',
    description:
      'Every product must work without fault in environments where failure is not an option. We hold ourselves to maritime and industrial safety standards even when regulations don\'t require it.',
  },
  {
    Icon: Layers,
    title: 'Engineering Depth',
    description:
      'We work at the silicon level. Understanding both hardware and software lets us solve problems at the root — not paper over them at the application layer.',
  },
  {
    Icon: Handshake,
    title: 'Long-term Partnership',
    description:
      'We guarantee a minimum 10-year supply lifecycle for all current products and keep our engineering team available for the full lifetime of every deployment.',
  },
]

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
}

const slideItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="mb-3 block text-xs font-semibold uppercase tracking-widest"
      style={{ color: 'var(--accent)' }}
    >
      {children}
    </span>
  )
}

function ValueCard({ Icon, title, description, index }: typeof values[0] & { index: number }) {
  return (
    <motion.div
      variants={slideItem}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className="flex flex-col gap-4 rounded-xl p-7"
      style={{ border: '1px solid var(--border)' }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg"
        style={{ backgroundColor: 'rgba(45,95,93,0.1)' }}
      >
        <Icon size={20} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
      </div>
      <div>
        <h3
          className="font-heading text-base font-semibold"
          style={{ color: 'var(--fg)' }}
        >
          {title}
        </h3>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: 'var(--muted)' }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  )
}

function MilestoneCard({ text, align }: { text: string; align: 'left' | 'right' }) {
  return (
    <div
      className={`rounded-xl p-5 ${align === 'right' ? 'text-right' : ''}`}
      style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}
    >
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
        {text}
      </p>
    </div>
  )
}

function TimelineItem({
  milestone,
  index,
}: {
  milestone: CompanyMilestone
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      animate={inView ? 'show' : 'hidden'}
      initial="hidden"
      variants={fadeUp}
      custom={0}
      className="relative"
    >
      {/* ── Mobile layout (single column, line on left) ── */}
      <div className="flex items-start gap-5 lg:hidden">
        {/* Dot */}
        <div className="relative mt-1.5 flex shrink-0 flex-col items-center">
          <div
            className="relative z-10 h-3 w-3 rounded-full"
            style={{
              backgroundColor: 'var(--accent)',
              boxShadow: '0 0 0 3px var(--bg), 0 0 0 5px var(--accent)',
            }}
          />
        </div>
        {/* Content */}
        <div className="flex-1 pb-10 last:pb-0">
          <span
            className="font-mono text-xs font-semibold"
            style={{ color: 'var(--accent)' }}
          >
            {milestone.year}
          </span>
          <p
            className="mt-1.5 text-sm leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            {milestone.event}
          </p>
        </div>
      </div>

      {/* ── Desktop layout (alternating, center line) ── */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_56px_1fr] lg:items-center lg:pb-12 last:pb-0">
        {/* Left content */}
        <div className="pr-6">
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="font-mono text-xs font-semibold"
                style={{ color: 'var(--accent)' }}
              >
                {milestone.year}
              </span>
              <MilestoneCard text={milestone.event} align="right" />
            </motion.div>
          )}
        </div>

        {/* Center dot */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="relative z-10 h-3.5 w-3.5 rounded-full"
            style={{
              backgroundColor: 'var(--accent)',
              boxShadow: '0 0 0 3px var(--bg), 0 0 0 5px var(--accent)',
            }}
          />
        </div>

        {/* Right content */}
        <div className="pl-6">
          {!isLeft && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="font-mono text-xs font-semibold"
                style={{ color: 'var(--accent)' }}
              >
                {milestone.year}
              </span>
              <MilestoneCard text={milestone.event} align="left" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Hero ────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-16 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
              <SectionLabel>About Us</SectionLabel>
              <h1
                className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
                style={{ color: 'var(--fg)' }}
              >
                Embedded by design,
                <br />
                <span style={{ color: 'var(--accent)' }}>reliable by principle</span>
              </h1>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-col justify-end"
            >
              <p
                className="text-base leading-relaxed sm:text-lg"
                style={{ color: 'var(--muted)' }}
              >
                {company.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Mission & Vision ────────────────────────────────────────────── */}
      <section
        className="px-4 py-16 sm:px-6 lg:px-8"
        style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>Mission</SectionLabel>
              <blockquote
                className="font-heading text-xl font-medium leading-relaxed tracking-tight sm:text-2xl"
                style={{ color: 'var(--fg)' }}
              >
                &ldquo;{company.mission}&rdquo;
              </blockquote>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>Vision</SectionLabel>
              <blockquote
                className="font-heading text-xl font-medium leading-relaxed tracking-tight sm:text-2xl"
                style={{ color: 'var(--fg)' }}
              >
                &ldquo;{company.vision}&rdquo;
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. Values ─────────────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <SectionLabel>Our Values</SectionLabel>
            <h2
              className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: 'var(--fg)' }}
            >
              What we stand for
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {values.map((v, i) => (
              <ValueCard key={v.title} {...v} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. Timeline ───────────────────────────────────────────────────── */}
      <section
        className="px-4 py-20 sm:px-6 lg:px-8"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14 text-center"
          >
            <SectionLabel>Our Journey</SectionLabel>
            <h2
              className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: 'var(--fg)' }}
            >
              A decade of embedded innovation
            </h2>
          </motion.div>

          {/* Timeline container */}
          <div className="relative">
            {/* Mobile left line */}
            <div
              className="absolute bottom-0 top-0 w-px lg:hidden"
              style={{ left: '5px', backgroundColor: 'var(--border)' }}
              aria-hidden
            />

            {/* Desktop center line */}
            <div
              className="absolute bottom-0 top-0 hidden w-px lg:block"
              style={{ left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--border)' }}
              aria-hidden
            />

            <div className="pl-8 lg:pl-0">
              {company.history.map((milestone, i) => (
                <TimelineItem key={milestone.year} milestone={milestone} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CTA strip ──────────────────────────────────────────────────── */}
      <section
        className="px-4 py-14 sm:px-6 lg:px-8"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <motion.div
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left"
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
              Want to work with us?
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
              Meet the team or reach out to our engineering department.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
            <Link
              href="/team"
              className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
            >
              Meet the team
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Contact us
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}
