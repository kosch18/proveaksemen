'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CircuitBoard, Headset, ShieldCheck, GraduationCap, type LucideIcon } from 'lucide-react'
import { services } from '@/lib/data/services'
import type { Service } from '@/lib/data/types'

const iconMap: Record<string, LucideIcon> = {
  CircuitBoard,
  Headset,
  ShieldCheck,
  GraduationCap,
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

function ServiceItem({ service }: { service: Service }) {
  const Icon = iconMap[service.icon] ?? CircuitBoard
  return (
    <motion.div
      variants={itemVariants}
      className="flex gap-5"
    >
      {/* Icon box */}
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: 'rgba(45,95,93,0.1)' }}
      >
        <Icon size={20} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5">
        <h3
          className="font-heading text-base font-semibold"
          style={{ color: 'var(--fg)' }}
        >
          {service.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--muted)' }}
        >
          {service.description}
        </p>
      </div>
    </motion.div>
  )
}

export function ServicesPreview() {
  return (
    <section
      className="px-4 py-20 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'rgba(45,95,93,0.03)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — header */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="mb-3 block text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--accent)' }}
            >
              What we offer
            </span>
            <h2
              className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: 'var(--fg)' }}
            >
              From concept to
              <br />
              certified product
            </h2>
            <p
              className="mt-5 max-w-md text-base leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              We work alongside engineering teams at every stage — from architecture
              and PCB layout to firmware, compliance testing, and series production.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: 'var(--accent)' }}
            >
              Explore all services
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </motion.div>

          {/* Right — services list */}
          <motion.div
            className="flex flex-col gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
