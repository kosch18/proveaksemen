'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Network, Cpu, Zap, Activity, Monitor, Cable,
  type LucideIcon,
} from 'lucide-react'
import type { Product } from '@/lib/data/types'

type CatCfg = { gradient: string; Icon: LucideIcon }

const CAT: Record<string, CatCfg> = {
  'Gateways':           { gradient: 'linear-gradient(140deg,#1e3a5f,#2D5F5D)', Icon: Network },
  'Compute Modules':    { gradient: 'linear-gradient(140deg,#1a3f3d,#2D5F5D)', Icon: Cpu },
  'Power Management':   { gradient: 'linear-gradient(140deg,#3b1f5e,#2D5F5D)', Icon: Zap },
  'Sensors & Monitors': { gradient: 'linear-gradient(140deg,#1f4a38,#2D5F5D)', Icon: Activity },
  'HMI & Displays':     { gradient: 'linear-gradient(140deg,#3d3000,#2D5F5D)', Icon: Monitor },
  'I/O Modules':        { gradient: 'linear-gradient(140deg,#2a1f4f,#2D5F5D)', Icon: Cable },
}

const VIEWS = ['Front', 'Side', 'Connectors', 'PCB']

export function ProductGallery({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0)
  const { gradient, Icon } = CAT[product.category] ?? {
    gradient: 'linear-gradient(140deg,#1a1a1a,#2D5F5D)',
    Icon: Cpu,
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ aspectRatio: '4/3' }}
      >
        <div
          className="absolute inset-0"
          style={{ background: gradient }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
          aria-hidden
        />

        {/* View label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            <Icon
              size={80}
              strokeWidth={0.75}
              className="opacity-25"
              color="#fff"
            />
            <span
              className="rounded-full px-3 py-1 font-mono text-xs text-white"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)' }}
            >
              {VIEWS[selected]} view
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Category badge */}
        <span
          className="absolute left-4 top-4 rounded-md px-2.5 py-1 text-xs font-medium text-white"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
        >
          {product.category}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2.5">
        {VIEWS.map((view, i) => (
          <button
            key={view}
            onClick={() => setSelected(i)}
            className="relative overflow-hidden rounded-lg transition-transform active:scale-95"
            style={{
              aspectRatio: '1',
              background: gradient,
              outline: selected === i ? '2px solid var(--accent)' : '2px solid transparent',
              outlineOffset: '2px',
            }}
            aria-label={`${view} view`}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '10px 10px',
              }}
              aria-hidden
            />
            <Icon
              size={22}
              strokeWidth={0.9}
              className="absolute inset-0 m-auto opacity-30"
              color="#fff"
            />
            {selected === i && (
              <motion.div
                layoutId="thumb-ring"
                className="absolute inset-0 rounded-lg"
                style={{ boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.3)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 36 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
