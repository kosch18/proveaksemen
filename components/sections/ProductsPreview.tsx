'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Tag } from 'lucide-react'

interface PreviewItem {
  id:       string
  name:     string
  category: string
  location: string
  valueNok: number
  status:   string
}

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: PreviewItem }) {
  const price = product.valueNok.toLocaleString('nb-NO') + ' NOK'

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group flex flex-col rounded-xl p-6 transition-shadow hover:shadow-md"
      style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}
    >
      <span
        className="mb-4 inline-flex w-fit rounded-md px-2.5 py-0.5 text-xs font-medium"
        style={{
          color: 'var(--accent)',
          backgroundColor: 'rgba(45,95,93,0.08)',
          border: '1px solid rgba(45,95,93,0.18)',
        }}
      >
        {product.category}
      </span>

      <h3 className="font-heading text-lg font-semibold leading-snug" style={{ color: 'var(--fg)' }}>
        {product.name}
      </h3>

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
          <MapPin size={13} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
          {product.location}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--fg)' }}>
          <Tag size={13} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
          {price}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors group-hover:gap-2.5"
          style={{ color: 'var(--accent)' }}
        >
          View all products
          <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ProductsPreview({ products, total }: { products: PreviewItem[]; total: number }) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              Our Products
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--fg)' }}>
              Quality IT equipment,
              <br />
              ready to order
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: 'var(--accent)' }}
          >
            View all {total} products
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
