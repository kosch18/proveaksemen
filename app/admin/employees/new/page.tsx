import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { EmployeeForm } from '@/components/admin/EmployeeForm'

export const metadata = { title: 'New Employee — Admin' }

export default function NewEmployeePage() {
  return (
    <div className="px-8 py-8">
      <div className="mb-6">
        <Link
          href="/admin/employees"
          className="inline-flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
          style={{ color: 'var(--muted)' }}
        >
          <ChevronLeft size={13} strokeWidth={2} />
          Back to employees
        </Link>
        <h1 className="mt-3 font-heading text-2xl font-bold" style={{ color: 'var(--fg)' }}>
          New employee
        </h1>
      </div>

      <EmployeeForm />
    </div>
  )
}
