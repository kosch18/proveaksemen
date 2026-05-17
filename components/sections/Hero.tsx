'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { company } from '@/lib/data/company'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.11,
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:pt-36">
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          opacity: 0.65,
        }}
        aria-hidden
      />
      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-7 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
          style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
            aria-hidden
          />
          {company.headquarters} · Est. {company.founded}
        </motion.div>

        {/* Heading */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-heading text-[2.6rem] font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.75rem]"
          style={{ color: 'var(--fg)' }}
        >
          Electronics that perform
          <br />
          <span style={{ color: 'var(--accent)' }}>when it counts</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{ color: 'var(--muted)' }}
        >
          Nordic Devices designs and manufactures embedded computing platforms, industrial
          gateways and IoT sensors for mission-critical applications in maritime, oil&nbsp;&amp;&nbsp;gas
          and industrial automation.
        </motion.p>

        {/* Buttons */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-md px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Explore Products
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center rounded-md px-6 py-2.5 text-sm font-medium transition-colors hover:opacity-80"
            style={{
              color: 'var(--fg)',
              border: '1px solid var(--border)',
            }}
          >
            Our Story
          </Link>
        </motion.div>

        {/* Trust strip */}
        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 text-xs tracking-wide"
          style={{ color: 'var(--muted)' }}
        >
          Certified&nbsp;
          <span style={{ color: 'var(--fg)' }}>DNV GL · CE · IECEx Zone&nbsp;2</span>
          &nbsp;·&nbsp;Ships to 18 countries
        </motion.p>
      </div>
    </section>
  )
}
