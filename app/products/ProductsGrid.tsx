'use client'

import { motion } from 'framer-motion'
import {
  Laptop, Monitor, Network, Settings, Cpu, Database,
  type LucideIcon,
} from 'lucide-react'
import type { InventoryItem } from '@/lib/data/types'

// ─── Category config ──────────────────────────────────────────────────────────

const CAT: Record<string, { gradient: string; Icon: LucideIcon }> = {
  'PC':             { gradient: 'linear-gradient(140deg,#1e3a5f,#2D5F5D)', Icon: Laptop   },
  'Stasjonær PC':   { gradient: 'linear-gradient(140deg,#1a3f3d,#2D5F5D)', Icon: Monitor  },
  'Nettverk':       { gradient: 'linear-gradient(140deg,#1e3a5f,#1a5f4a)', Icon: Network  },
  'Tilbehør':       { gradient: 'linear-gradient(140deg,#3b2f1e,#2D5F5D)', Icon: Settings },
  'Utvikling':      { gradient: 'linear-gradient(140deg,#1f2f4a,#2D5F5D)', Icon: Cpu      },
  'Server':         { gradient: 'linear-gradient(140deg,#3b1f5e,#2D5F5D)', Icon: Database },
}

function getCat(cat: string) {
  return CAT[cat] ?? { gradient: 'linear-gradient(140deg,#1a1a1a,#2D5F5D)', Icon: Cpu }
}

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS: Record<InventoryItem['status'], { label: string; bg: string; color: string }> = {
  available:   { label: 'In stock',   bg: 'rgba(34,197,94,0.15)',  color: '#16a34a' },
  rented:      { label: 'On rental',  bg: 'rgba(59,130,246,0.15)', color: '#2563eb' },
  maintenance: { label: 'In service', bg: 'rgba(249,115,22,0.15)', color: '#ea580c' },
}

// ─── Animation variants ───────────────────────────────────────────────────────

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
const card = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function InventoryCard({ item }: { item: InventoryItem }) {
  const { gradient, Icon } = getCat(item.category)
  const status = STATUS[item.status]
  const valueFormatted = item.value_nok.toLocaleString('nb-NO') + ' NOK'

  return (
    <motion.div
      variants={card}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex flex-col overflow-hidden rounded-xl"
      style={{ border: '1px solid var(--border)' }}
    >
      {/* Gradient header */}
      <div
        className="relative flex h-48 items-center justify-center overflow-hidden"
        style={{ background: gradient }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <Icon
          size={52}
          strokeWidth={1}
          className="relative opacity-30 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-50"
          color="#fff"
        />
        <span
          className="absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-medium text-white"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
        >
          {item.category}
        </span>
        <span
          className="absolute right-3 top-3 rounded-md px-2.5 py-1 text-xs font-semibold"
          style={{ backgroundColor: status.bg, color: status.color, backdropFilter: 'blur(4px)' }}
        >
          {status.label}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5" style={{ backgroundColor: 'var(--bg)' }}>
        <h2
          className="font-heading text-base font-semibold leading-snug"
          style={{ color: 'var(--fg)' }}
        >
          {item.name}
        </h2>

        <dl className="mt-auto flex flex-col gap-1.5 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-baseline justify-between gap-2">
            <dt className="shrink-0 text-xs" style={{ color: 'var(--muted)' }}>Location</dt>
            <dd className="truncate text-right font-mono text-xs font-medium" style={{ color: 'var(--fg)' }}>
              {item.location}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <dt className="shrink-0 text-xs" style={{ color: 'var(--muted)' }}>Price</dt>
            <dd className="truncate text-right font-mono text-xs font-medium" style={{ color: 'var(--fg)' }}>
              {valueFormatted}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <dt className="shrink-0 text-xs" style={{ color: 'var(--muted)' }}>Added</dt>
            <dd className="truncate text-right font-mono text-xs font-medium" style={{ color: 'var(--fg)' }}>
              {item.purchase_date}
            </dd>
          </div>
        </dl>
      </div>
    </motion.div>
  )
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

export function ProductsGrid({ items }: { items: InventoryItem[] }) {
  return (
    <>
      {/* Header */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className="mb-2 block text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--accent)' }}
        >
          Product Catalogue
        </span>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h1
            className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ color: 'var(--fg)' }}
          >
            {items.length} products,
            <br />
            ready to order
          </h1>
          <p className="max-w-xs text-sm leading-relaxed sm:text-right" style={{ color: 'var(--muted)' }}>
            Laptops, network equipment and more — available for purchase or rental across Norway.
          </p>
        </div>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {items.map((item) => (
          <InventoryCard key={item.id} item={item} />
        ))}
      </motion.div>
    </>
  )
}
