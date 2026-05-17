'use client'

import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import type { TeamMember } from '@/lib/data/types'

// ─── Types ────────────────────────────────────────────────────────────────────

type Filter = TeamMember['department'] | 'All'

const FILTERS: Filter[] = ['All', 'Engineering', 'Design', 'Sales', 'Management']

const DEPT: Record<TeamMember['department'], { avatar: string; chip: string; chipText: string }> = {
  Engineering: { avatar: '#2D5F5D', chip: 'rgba(45,95,93,0.10)',   chipText: '#2D5F5D' },
  Design:      { avatar: '#5B21B6', chip: 'rgba(91,33,182,0.08)',  chipText: '#5B21B6' },
  Sales:       { avatar: '#1D4ED8', chip: 'rgba(29,78,216,0.08)',  chipText: '#1D4ED8' },
  Management:  { avatar: '#92400E', chip: 'rgba(146,64,14,0.08)',  chipText: '#92400E' },
}

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function MemberCard({ member }: { member: TeamMember }) {
  const cfg = DEPT[member.department]
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, scale: 0.93, transition: { duration: 0.18 } }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className="flex flex-col rounded-xl p-6"
      style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-heading text-base font-semibold text-white"
          style={{ backgroundColor: cfg.avatar }}
          aria-hidden
        >
          {initials(member.name)}
        </div>
        <span
          className="mt-1 shrink-0 rounded-md px-2.5 py-0.5 text-xs font-medium"
          style={{ backgroundColor: cfg.chip, color: cfg.chipText }}
        >
          {member.department}
        </span>
      </div>

      <h2 className="font-heading text-base font-semibold leading-snug" style={{ color: 'var(--fg)' }}>
        {member.name}
      </h2>
      <p className="mt-0.5 text-sm" style={{ color: 'var(--accent)' }}>
        {member.role}
      </p>
      <p className="mt-3.5 line-clamp-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
        {member.bio}
      </p>
    </motion.article>
  )
}

// ─── Filter chip ──────────────────────────────────────────────────────────────

function FilterChip({
  label, count, active, onClick,
}: { label: Filter; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
      style={{
        color: active ? '#fff' : 'var(--muted)',
        border: active ? 'none' : '1px solid var(--border)',
        backgroundColor: active ? 'var(--accent)' : 'transparent',
      }}
    >
      {active && (
        <motion.span
          layoutId="chip-bg"
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: 'var(--accent)' }}
          transition={{ type: 'spring', stiffness: 380, damping: 36 }}
        />
      )}
      <span className="relative">{label}</span>
      <span className="relative tabular-nums text-xs" style={{ opacity: active ? 0.75 : 1 }}>
        {count}
      </span>
    </button>
  )
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

export function TeamGrid({ members }: { members: TeamMember[] }) {
  const [active, setActive] = useState<Filter>('All')

  const filtered = active === 'All' ? members : members.filter((m) => m.department === active)

  function deptCount(dept: Filter) {
    if (dept === 'All') return members.length
    return members.filter((m) => m.department === dept).length
  }

  return (
    <>
      {/* Sticky filter bar */}
      <section
        className="sticky top-16 z-30 px-4 py-3.5 sm:px-6 lg:px-8"
        style={{
          backgroundColor: 'var(--bg)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="mx-auto max-w-7xl">
          <LayoutGroup id="dept-filter">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((dept) => (
                <FilterChip
                  key={dept}
                  label={dept}
                  count={deptCount(dept)}
                  active={active === dept}
                  onClick={() => setActive(dept)}
                />
              ))}
            </div>
          </LayoutGroup>
        </div>
      </section>

      {/* Cards */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-7 text-sm"
              style={{ color: 'var(--muted)' }}
            >
              {filtered.length === members.length
                ? `All ${members.length} team members`
                : `${filtered.length} member${filtered.length !== 1 ? 's' : ''} in ${active}`}
            </motion.p>
          </AnimatePresence>

          <motion.div
            layout
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center text-sm"
                style={{ color: 'var(--muted)' }}
              >
                No members found in this department.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
