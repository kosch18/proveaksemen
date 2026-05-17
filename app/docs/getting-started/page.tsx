'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  PackageOpen, Zap, Cable, Thermometer,
  CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, AlertTriangle,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const steps = [
  {
    Icon: PackageOpen,
    number: '01',
    title: 'Unboxing & inspection',
    description: 'Inspect the module for transport damage before installation. Check that the hardware revision label on the PCB matches your order confirmation. Do not power the unit if any physical damage is visible.',
    notes: [
      'Retain the ESD packaging until the module is fitted to your carrier board',
      'Record the serial number (printed on the label) for warranty and support purposes',
    ],
  },
  {
    Icon: Zap,
    number: '02',
    title: 'Power supply requirements',
    description: 'The ND-GW200 requires a 9–36 V DC supply with a minimum 2 A continuous capability. Use screened cable and place the bulk capacitor (≥ 470 µF) close to the input connector. Reverse-polarity protection is built in, but transient suppressors on the supply rail are strongly recommended in industrial environments.',
    notes: [
      'Do not connect supply voltage before completing the wiring inspection',
      'Galvanic isolation between supply and fieldbus is mandatory for IECEx applications',
    ],
  },
  {
    Icon: Cable,
    number: '03',
    title: 'Communication interfaces',
    description: 'Each interface (CAN FD, RS-485, Ethernet) is brought out on M12 connectors. Terminate the CAN bus at both ends with 120 Ω resistors. RS-485 lines longer than 10 m require termination and should use twisted-pair cable with a characteristic impedance of 120 Ω.',
    notes: [
      'CAN FD maximum data-phase bitrate: 8 Mbit/s (ND-GW200 Rev D and later)',
      'Ethernet port supports 10/100 Mbit/s; auto-MDI/X is enabled by default',
    ],
  },
  {
    Icon: Thermometer,
    number: '04',
    title: 'Mounting & thermal management',
    description: 'The module is designed for DIN rail or panel mounting. Maintain a minimum 25 mm clearance above and below the unit for convection cooling. At full load in an enclosure, forced airflow (≥ 1 m/s) is recommended above 55 °C ambient. Apply thermal interface material (≥ 3 W/m·K) if mounting to a heatsink plate.',
    notes: [
      'Operating range: −40 °C to +70 °C (storage: −55 °C to +85 °C)',
      'IP67 rated when M12 connectors are fully mated and dust caps are removed',
    ],
  },
  {
    Icon: CheckCircle2,
    number: '05',
    title: 'First power-on & self-test',
    description: 'Apply power and observe the status LED sequence: solid amber (boot), flashing green (self-test), solid green (ready). If the LED stays amber beyond 30 seconds, check the supply voltage and consult the troubleshooting section of the Integration Manual.',
    notes: [
      'Self-test duration is typically 8–12 seconds at room temperature',
      'The unit logs diagnostics to the RS-485 port at 115200 baud during boot',
    ],
  },
]

const specs = [
  { label: 'Supply voltage',     value: '9–36 V DC' },
  { label: 'Current draw',       value: '280 mA typ. @ 24 V (full load)' },
  { label: 'Operating temp.',    value: '−40 °C to +70 °C' },
  { label: 'Protection class',   value: 'IP67 (connectors mated)' },
  { label: 'Dimensions (W×H×D)', value: '118 × 75 × 45 mm' },
  { label: 'Mounting',           value: 'DIN rail EN 60715 / panel (M4 screws)' },
  { label: 'Certifications',     value: 'CE, DNV GL, IECEx Zone 2, FCC' },
  { label: 'Connector type',     value: 'M12 A-coded (power), M12 D-coded (Ethernet)' },
]

export default function IntegrationGuidePage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b px-4 py-3 sm:px-6 lg:px-8" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 text-xs" style={{ color: 'var(--muted)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Documentation</Link>
          <ChevronRight size={12} />
          <span>Hardware Integration Guide</span>
        </div>
      </div>

      {/* Hero */}
      <section className="px-4 pb-12 pt-12 sm:px-6 lg:px-8">
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
              Integration Manual — ND-GW200
            </span>
            <h1
              className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ color: 'var(--fg)' }}
            >
              Hardware Integration
              <br />
              <span style={{ color: 'var(--accent)' }}>Guide</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
              This guide covers the mechanical, electrical and environmental requirements for integrating
              the ND-GW200 Industrial Gateway into your application. Read all sections before
              applying power for the first time.
            </p>

            {/* Warning */}
            <div
              className="mt-6 flex items-start gap-3 rounded-xl p-5"
              style={{ backgroundColor: 'rgba(202,138,4,0.08)', border: '1px solid rgba(202,138,4,0.25)' }}
            >
              <AlertTriangle size={18} strokeWidth={2} className="mt-0.5 shrink-0" style={{ color: '#ca8a04' }} />
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>
                This document is a summary guide. Always read the full Integration Manual
                (document ND-IM-GW200) before installation in safety-critical or IECEx-rated environments.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick specs */}
      <section
        className="px-4 py-12 sm:px-6 lg:px-8"
        style={{ borderTop: '1px solid var(--border)', backgroundColor: 'rgba(45,95,93,0.02)' }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="mb-6 font-heading text-xl font-bold tracking-tight" style={{ color: 'var(--fg)' }}>
              Key specifications — ND-GW200 Rev D
            </h2>
            <div className="overflow-hidden rounded-xl" style={{ border: '1px solid var(--border)' }}>
              {specs.map(({ label, value }, i) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center"
                  style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border)', backgroundColor: 'var(--bg)' }}
                >
                  <span className="w-40 shrink-0 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
                    {label}
                  </span>
                  <span className="font-mono text-sm" style={{ color: 'var(--fg)' }}>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-4 py-14 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="mb-10"
          >
            <h2 className="font-heading text-2xl font-bold tracking-tight" style={{ color: 'var(--fg)' }}>
              Installation procedure
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {steps.map(({ Icon, number, title, description, notes }) => (
              <motion.div
                key={number}
                variants={fadeUp}
                className="rounded-xl p-7"
                style={{ border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    <Icon size={17} strokeWidth={2} color="#fff" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-semibold" style={{ color: 'var(--muted)' }}>Step {number}</span>
                    <h3 className="font-heading text-lg font-semibold" style={{ color: 'var(--fg)' }}>{title}</h3>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{description}</p>

                <ul className="flex flex-col gap-2">
                  {notes.map((note) => (
                    <li key={note} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} strokeWidth={2} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                      <span className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{note}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nav */}
      <section className="px-4 py-10 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: 'var(--muted)' }}
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to Documentation
          </Link>
          <Link
            href="/support"
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
            style={{ color: 'var(--accent)' }}
          >
            Technical Support
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  )
}
