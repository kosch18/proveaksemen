import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { LayoutDashboard, Users, Package, Box, LogOut } from 'lucide-react'
import { auth, signOut } from '@/auth'

const navLinks = [
  { href: '/admin',           label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/employees', label: 'Employees', icon: Users },
  { href: '/admin/products',  label: 'Products',  icon: Package },
  { href: '/admin/inventory', label: 'Inventory', icon: Box },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session     = await auth()
  const pathname    = headers().get('x-current-path') ?? ''
  const isLoginPage = pathname === '/admin/login'

  // Login page renders without sidebar.
  if (isLoginPage) {
    return <>{children}</>
  }

  // Any other /admin page requires authentication.
  if (!session?.user) {
    redirect('/admin/login')
  }

  return (
    <div className="admin-root flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* ── Sidebar ──────────────────────────────────────────────────────────── */}
      <aside
        className="flex w-60 shrink-0 flex-col"
        style={{ backgroundColor: 'var(--fg)', color: '#fff' }}
      >
        {/* Brand */}
        <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <span className="font-heading text-sm font-bold tracking-wide text-white">
            Nordic Devices
          </span>
          <span
            className="mt-0.5 block text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Admin Panel
          </span>
        </div>

        {/* User info */}
        <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs font-medium text-white">{session.user.name}</p>
          <p className="mt-0.5 truncate text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {session.user.email}
          </p>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              <Icon size={15} strokeWidth={1.75} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <form
            action={async () => {
              'use server'
              await signOut({ redirectTo: '/admin/login' })
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              <LogOut size={15} strokeWidth={1.75} />
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <main className="flex flex-1 flex-col overflow-auto">
        {children}
      </main>
    </div>
  )
}
