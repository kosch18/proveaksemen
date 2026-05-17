'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto max-w-7xl overflow-hidden rounded-2xl px-8 py-16 text-center sm:px-16 sm:py-20"
        style={{ backgroundColor: 'var(--accent)' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Decorative circle */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-10"
          style={{ backgroundColor: '#fff' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full opacity-10"
          style={{ backgroundColor: '#fff' }}
          aria-hidden
        />

        <motion.span
          className="mb-4 block text-xs font-semibold uppercase tracking-widest opacity-70"
          style={{ color: '#fff' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Get in touch
        </motion.span>

        <motion.h2
          className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          style={{ color: '#fff' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Let&apos;s build something reliable
          <br className="hidden sm:block" /> together
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed opacity-80"
          style={{ color: '#fff' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          Whether you need a custom embedded platform, help with certification, or
          a long-term production partner — our engineering team is ready to talk.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#fff', color: 'var(--accent)' }}
          >
            Contact our team
            <ArrowRight size={15} strokeWidth={2.25} />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center rounded-md px-7 py-3 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.35)' }}
          >
            Browse products
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
