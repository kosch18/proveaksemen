'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Tag, Cpu, Layers, AlertTriangle } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

type ChangeType = 'improvement' | 'fix' | 'breaking' | 'new'

const TYPE_LABELS: Record<ChangeType, { label: string; color: string; bg: string }> = {
  new:         { label: 'New',      color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
  improvement: { label: 'Changed',  color: 'var(--accent)', bg: 'rgba(45,95,93,0.1)' },
  fix:         { label: 'Fixed',    color: '#ca8a04', bg: 'rgba(202,138,4,0.1)' },
  breaking:    { label: 'Notice',   color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
}

const releases = [
  {
    ref: 'Rev D',
    date: '2026-02-03',
    product: 'ND-GW200',
    type: 'Hardware',
    Icon: Cpu,
    summary: 'Automotive-grade capacitors on power rail, additional ESD protection on all IO connectors and new hardware CRC accelerator.',
    changes: [
      { type: 'improvement' as ChangeType, text: 'Switched to automotive-grade 105 °C bulk capacitors on the 3V3 power rail for improved high-temperature reliability' },
      { type: 'improvement' as ChangeType, text: 'Added bidirectional TVS diode array (8 V clamping) on all IO connectors — provides robust protection in industrial environments' },
      { type: 'new' as ChangeType,         text: 'Hardware CRC32 accelerator now available, reducing CPU overhead for CAN FD frame validation by approximately 40%' },
      { type: 'breaking' as ChangeType,    text: 'Pin 34 (previously No Connect) is now GPIO_EXT — do not leave floating on custom carrier boards. See errata ND-ER-GW200-004.' },
    ],
  },
  {
    ref: 'Rev C',
    date: '2025-06-11',
    product: 'ND-GW200',
    type: 'Hardware',
    Icon: Cpu,
    summary: 'Updated LTE modem module to EC21-G for broader band coverage and improved cold-start performance.',
    changes: [
      { type: 'improvement' as ChangeType, text: 'Replaced LTE module with Quectel EC21-G: adds Band 28 (700 MHz APT) for improved rural coverage' },
      { type: 'improvement' as ChangeType, text: 'Cold-start GNSS acquisition time reduced from 42 s to 27 s in open-sky conditions' },
      { type: 'fix' as ChangeType,         text: 'Corrected footprint error on U12 (LDO) that caused intermittent 1V8 rail instability on Rev B units above 65 °C ambient' },
    ],
  },
  {
    ref: 'Rev B',
    date: '2025-03-20',
    product: 'ND-CM100',
    type: 'Hardware',
    Icon: Cpu,
    summary: 'Second compute module revision — larger eMMC, additional LPDDR4, and corrected USB 3.0 differential-pair routing.',
    changes: [
      { type: 'improvement' as ChangeType, text: 'eMMC storage increased from 16 GB to 32 GB with no change to BOM cost or footprint' },
      { type: 'improvement' as ChangeType, text: 'LPDDR4 increased from 2 GB to 4 GB — no carrier board changes required' },
      { type: 'fix' as ChangeType,         text: 'USB 3.0 superspeed pairs re-routed to correct impedance (90 Ω ±10%); Rev A units showed eye closure above 2.5 Gbit/s' },
      { type: 'breaking' as ChangeType,    text: 'Board outline expanded by 0.4 mm on the north edge — verify mechanical fit before qualifying Rev B in existing enclosures' },
    ],
  },
  {
    ref: 'v1.6.0',
    date: '2025-01-14',
    product: 'ND-GW200 Firmware',
    type: 'Firmware',
    Icon: Layers,
    summary: 'CAN FD ISO 11898-1:2015 support, improved Modbus robustness and a critical security patch for the HTTP management interface.',
    changes: [
      { type: 'new' as ChangeType,         text: 'CAN FD driver updated to ISO 11898-1:2015; data-phase bitrate now configurable up to 8 Mbit/s on ND-GW200 Rev D' },
      { type: 'improvement' as ChangeType, text: 'Modbus RTU master retransmission timeout made configurable (50–5000 ms); default changed from 200 ms to 500 ms' },
      { type: 'fix' as ChangeType,         text: 'Security patch: buffer overflow in HTTP management interface header parser (CVE-2025-3841) — update strongly recommended for internet-facing deployments' },
      { type: 'fix' as ChangeType,         text: 'Corrected watchdog reset triggered by LTE re-attach at > 65 °C in Rev C hardware' },
    ],
  },
  {
    ref: 'Rev A',
    date: '2024-09-05',
    product: 'ND-SN400',
    type: 'Hardware',
    Icon: Cpu,
    summary: 'Initial production release of the vibration and temperature condition-monitoring sensor.',
    changes: [
      { type: 'new' as ChangeType, text: 'Initial production release — triaxial MEMS accelerometer (±16 g), PT100 temperature input, RS-485 / IO-Link output' },
      { type: 'new' as ChangeType, text: 'On-device FFT engine computes up to 4096-point spectra at 25.6 kHz sample rate without host CPU involvement' },
      { type: 'new' as ChangeType, text: 'IP67 stainless-steel housing rated for direct mounting on rotating machinery; M12 × 1.25 mounting thread' },
    ],
  },
]

export default function ChangelogPage() {
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
              Revision History
            </span>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <h1
                className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
                style={{ color: 'var(--fg)' }}
              >
                Product Revisions &<br />
                <span style={{ color: 'var(--accent)' }}>Firmware Updates</span>
              </h1>
              <p className="max-w-sm text-sm leading-relaxed sm:text-right" style={{ color: 'var(--muted)' }}>
                Hardware revision notices, component change notifications
                and firmware release notes for all active product lines.
              </p>
            </div>

            {/* Notice */}
            <div
              className="mt-8 flex items-start gap-3 rounded-xl p-5"
              style={{ backgroundColor: 'rgba(45,95,93,0.06)', border: '1px solid var(--border)' }}
            >
              <AlertTriangle size={16} strokeWidth={2} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                Component Change Notices (CCN) and Product Change Notices (PCN) are sent directly to registered
                customers 60 days before any hardware revision enters production.{' '}
                <Link href="/contact" className="font-medium underline" style={{ color: 'var(--accent)' }}>
                  Register your product
                </Link>{' '}
                to receive these notifications.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="relative">
            <div
              className="absolute bottom-0 top-0 w-px"
              style={{ left: '20px', backgroundColor: 'var(--border)' }}
              aria-hidden
            />

            <div className="flex flex-col gap-8 pl-14">
              {releases.map(({ ref, date, product, type, Icon, summary, changes }, i) => (
                <motion.div
                  key={`${product}-${ref}`}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Dot */}
                  <div
                    className="absolute -left-[2.15rem] top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ backgroundColor: 'var(--bg)', border: '2px solid var(--accent)' }}
                  >
                    <Icon size={14} strokeWidth={2} style={{ color: 'var(--accent)' }} />
                  </div>

                  <div className="rounded-xl p-6" style={{ border: '1px solid var(--border)' }}>
                    {/* Header */}
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Tag size={13} strokeWidth={2} style={{ color: 'var(--accent)' }} />
                        <span className="font-mono text-sm font-bold" style={{ color: 'var(--fg)' }}>
                          {product} — {ref}
                        </span>
                      </div>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{ backgroundColor: 'rgba(45,95,93,0.1)', color: 'var(--accent)' }}
                      >
                        {type}
                      </span>
                      <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{date}</span>
                    </div>

                    <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {summary}
                    </p>

                    <ul className="flex flex-col gap-2.5">
                      {changes.map(({ type: changeType, text }) => {
                        const { label, color, bg } = TYPE_LABELS[changeType]
                        return (
                          <li key={text} className="flex items-start gap-3">
                            <span
                              className="mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold"
                              style={{ color, backgroundColor: bg }}
                            >
                              {label}
                            </span>
                            <span className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                              {text}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-14 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)' }}>
        <motion.div
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="font-heading text-xl font-semibold sm:text-2xl" style={{ color: 'var(--fg)' }}>
              Qualify a new hardware revision?
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
              Our engineering team can provide a delta analysis and updated test reports on request.
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
