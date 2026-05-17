import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { EmployeeForm } from '@/components/admin/EmployeeForm'

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props) {
  const emp = await prisma.employee.findUnique({
    where:  { id: params.id },
    select: { name: true },
  })
  return { title: emp ? `Edit ${emp.name} — Admin` : 'Edit Employee — Admin' }
}

export default async function EditEmployeePage({ params }: Props) {
  const employee = await prisma.employee.findUnique({ where: { id: params.id } })
  if (!employee) notFound()

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
          Edit {employee.name}
        </h1>
      </div>

      <EmployeeForm
        employee={{
          id:         employee.id,
          name:       employee.name,
          role:       employee.role,
          department: employee.department,
          bio:        employee.bio,
          email:      employee.email,
          imageUrl:   employee.imageUrl,
          order:      employee.order,
        }}
      />
    </div>
  )
}
