'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, animate } from 'framer-motion'

const stats = [
  { end: 12, suffix: '', label: 'Years in business' },
  { end: 34, suffix: '', label: 'Products in portfolio' },
  { end: 120, suffix: '+', label: 'Clients worldwide' },
  { end: 47, suffix: '', label: 'Engineers on staff' },
]

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(triggerRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView || !spanRef.current) return
    const el = spanRef.current
    const ctrl = animate(0, end, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        el.textContent = String(Math.round(v)) + suffix
      },
    })
    return () => ctrl.stop()
  }, [inView, end, suffix])

  return (
    <span ref={triggerRef}>
      <span ref={spanRef}>
        0{suffix}
      </span>
    </span>
  )
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export function Stats() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 gap-y-12 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {stats.map(({ end, suffix, label }, i) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <span
                className="font-heading text-4xl font-bold tabular-nums sm:text-5xl"
                style={{ color: 'var(--fg)' }}
              >
                <Counter end={end} suffix={suffix} />
              </span>
              <span
                className="mt-2 text-sm"
                style={{ color: 'var(--muted)' }}
              >
                {label}
              </span>

              {/* Vertical divider on desktop, hidden on last */}
              {i < stats.length - 1 && (
                <div
                  className="absolute hidden h-10 w-px lg:block"
                  style={{
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'var(--border)',
                  }}
                  aria-hidden
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
