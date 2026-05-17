import Link from 'next/link'
import { Plus } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { EmployeesTable } from './EmployeesTable'

export const metadata = { title: 'Employees — Admin' }

export default async function EmployeesPage() {
  const employees = await prisma.employee.findMany({
    orderBy: { order: 'asc' },
    select: { id: true, name: true, role: true, department: true, imageUrl: true },
  })

  return (
    <div className="px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold" style={{ color: 'var(--fg)' }}>
          Employees
          <span className="ml-2 text-base font-normal" style={{ color: 'var(--muted)' }}>
            ({employees.length})
          </span>
        </h1>
        <Link
          href="/admin/employees/new"
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <Plus size={14} strokeWidth={2.5} />
          New employee
        </Link>
      </div>

      <EmployeesTable employees={employees} />
    </div>
  )
}
