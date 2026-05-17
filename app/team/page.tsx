import { motion } from 'framer-motion'
import { prisma } from '@/lib/prisma'
import { mapEmployee } from '@/lib/db/mappers'
import { TeamGrid } from './TeamGrid'

export const metadata = {
  title: 'Team',
  description: 'Meet the engineers, designers and specialists behind Nordic Devices.',
}

export default async function TeamPage() {
  const rows = await prisma.employee.findMany({ orderBy: { order: 'asc' } })
  const members = rows.map(mapEmployee)

  return (
    <>
      {/* ── Header (static — no client JS needed) ──────────────────────────── */}
      <section className="px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span
            className="mb-3 block text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--accent)' }}
          >
            Our Team
          </span>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1
              className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ color: 'var(--fg)' }}
            >
              The people behind
              <br />
              the hardware
            </h1>
            <p
              className="max-w-sm text-sm leading-relaxed sm:text-right"
              style={{ color: 'var(--muted)' }}
            >
              {members.length} specialists across engineering, design,
              sales and management — all based in Oslo.
            </p>
          </div>
        </div>
      </section>

      {/* ── Interactive grid + filter (client component) ───────────────────── */}
      <TeamGrid members={members} />
    </>
  )
}
