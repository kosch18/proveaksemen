'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MapPin, Clock, ArrowRight,
  FlaskConical, Cpu, Headset, BookOpen,
  Users, Globe, GraduationCap, Landmark,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const openings = [
  {
    Icon: Cpu,
    title: 'Senior Embedded Firmware Engineer',
    team: 'Firmware',
    location: 'Oslo, Norway',
    type: 'Full-time',
    description:
      'Design and implement low-level firmware for ARM Cortex-M based industrial modules. We need deep experience with Zephyr RTOS or equivalent, CAN FD, Modbus and LTE-M/NB-IoT. You will own features from architecture through silicon bring-up to customer release.',
  },
  {
    Icon: FlaskConical,
    title: 'Hardware Design Engineer',
    team: 'Hardware',
    location: 'Oslo, Norway',
    type: 'Full-time',
    description:
      'Lead PCB design for new product generations — schematic capture, multi-layer layout (8–12 layers), signal integrity analysis and EMC pre-compliance in our Oslo lab. Experience qualifying designs to DNV GL or IECEx is a strong advantage.',
  },
  {
    Icon: Headset,
    title: 'Field Applications Engineer',
    team: 'Customer Engineering',
    location: 'Remote — Europe',
    type: 'Full-time',
    description:
      'Work directly with OEM customers during hardware evaluation, carrier board design review and production bring-up. Travel to customer sites across Europe accounts for roughly 25% of the role. Solid understanding of industrial fieldbus protocols required.',
  },
  {
    Icon: BookOpen,
    title: 'Technical Writer — Embedded Systems',
    team: 'Engineering',
    location: 'Oslo, Norway / Remote',
    type: 'Full-time',
    description:
      'Produce datasheets, integration manuals and application notes that engineers actually want to read. You must be comfortable reading schematics and firmware source code to write accurately at the hardware/software boundary.',
  },
]

const values = [
  {
    Icon: Cpu,
    title: 'Work on real hardware',
    body: 'Our products run on offshore platforms, inside factory automation lines and onboard commercial vessels. Every design decision has physical consequences.',
  },
  {
    Icon: Users,
    title: 'A small, senior team',
    body: '47 people — no large org layers. You will work directly with the engineers who founded the company and have access to the full technical context of every product.',
  },
  {
    Icon: Globe,
    title: 'International customer base',
    body: '120+ customers across 18 countries. Field Applications Engineers travel across Europe; the rest of the team interacts with customers daily by email and video.',
  },
  {
    Icon: GraduationCap,
    title: 'Learning budget',
    body: 'NOK 20 000 per year for conferences, standards training (IEC 61508, IACS, DNV), specialist courses and technical books.',
  },
  {
    Icon: Landmark,
    title: 'Stability & long-term thinking',
    body: 'We are profitable and investor-backed. Our Long-Term Supply Programme is a public commitment that runs 10 years — the same philosophy applies internally.',
  },
  {
    Icon: FlaskConical,
    title: 'In-house EMC lab',
    body: 'Full EMC pre-compliance capability in Oslo — conducted emissions, ESD, surge, burst. Engineers run their own tests rather than waiting for an external lab slot.',
  },
]

export default function CareersPage() {
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
              Careers
            </span>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <h1
                className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
                style={{ color: 'var(--fg)' }}
              >
                Engineering roles
                <br />
                <span style={{ color: 'var(--accent)' }}>at Nordic Devices</span>
              </h1>
              <p className="max-w-sm text-sm leading-relaxed sm:text-right" style={{ color: 'var(--muted)' }}>
                We hire experienced engineers who care about getting the details right.
                Most of our roles are in Oslo; some are open to remote across Europe.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open positions */}
      <section className="px-4 py-14 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="mb-10"
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              Open Roles
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--fg)' }}>
              {openings.length} open positions
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {openings.map(({ Icon, title, team, location, type, description }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -2, transition: { duration: 0.16 } }}
                className="flex flex-col gap-4 rounded-xl p-7 sm:flex-row sm:items-start sm:gap-8"
                style={{ border: '1px solid var(--border)' }}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: 'rgba(45,95,93,0.1)' }}
                >
                  <Icon size={22} strokeWidth={1.6} style={{ color: 'var(--accent)' }} />
                </div>

                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-heading text-lg font-semibold" style={{ color: 'var(--fg)' }}>{title}</h3>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{ backgroundColor: 'rgba(45,95,93,0.1)', color: 'var(--accent)' }}
                    >
                      {team}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{description}</p>
                  <div className="flex flex-wrap gap-4">
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted)' }}>
                      <MapPin size={12} strokeWidth={2} />{location}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted)' }}>
                      <Clock size={12} strokeWidth={2} />{type}
                    </span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex shrink-0 items-center gap-2 self-start rounded-md px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
                >
                  Apply
                  <ArrowRight size={13} strokeWidth={2} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why work here */}
      <section className="px-4 py-16 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'rgba(45,95,93,0.02)' }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="mb-10"
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              The role
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--fg)' }}>
              What makes Nordic Devices different
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {values.map(({ Icon, title, body }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="flex flex-col gap-4 rounded-xl p-6"
                style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: 'rgba(45,95,93,0.1)' }}>
                  <Icon size={18} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold" style={{ color: 'var(--fg)' }}>{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-14 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)' }}>
        <motion.div
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="font-heading text-xl font-semibold sm:text-2xl" style={{ color: 'var(--fg)' }}>
              No matching role?
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
              We consider speculative applications from experienced embedded and hardware engineers year-round.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Send application
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </motion.div>
      </section>
    </>
  )
}
