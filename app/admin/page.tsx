import Link from 'next/link'
import { Users, Package, Activity, Plus } from 'lucide-react'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const metadata = { title: 'Dashboard — Admin' }

export default async function AdminDashboard() {
  const [session, employeeCount, productCount, publishedCount] = await Promise.all([
    auth(),
    prisma.employee.count(),
    prisma.product.count(),
    prisma.product.count({ where: { published: true } }),
  ])

  const stats = [
    { label: 'Total employees',    value: employeeCount,  icon: Users,     href: '/admin/employees' },
    { label: 'Total products',     value: productCount,   icon: Package,   href: '/admin/products' },
    { label: 'Published products', value: publishedCount, icon: Activity,  href: '/admin/products' },
  ]

  const quickActions = [
    { label: '+ New employee', href: '/admin/employees/new' },
    { label: '+ New product',  href: '/admin/products/new' },
  ]

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold" style={{ color: 'var(--fg)' }}>
          Dashboard
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
          Welcome back, {session?.user?.name ?? 'Admin'}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-4 rounded-xl p-5 transition-shadow hover:shadow-sm"
            style={{ border: '1px solid var(--border)', backgroundColor: '#fff' }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: 'rgba(45,95,93,0.1)' }}
            >
              <Icon size={18} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <p className="font-heading text-2xl font-bold" style={{ color: 'var(--fg)' }}>
                {value}
              </p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
          Quick actions
        </p>
        <div className="flex flex-wrap gap-3">
          {quickActions.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <Plus size={14} strokeWidth={2.5} />
              {label.replace('+ ', '')}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
