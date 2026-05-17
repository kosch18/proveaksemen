'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Pencil, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { deleteEmployee } from './actions'

const DEPT_LABEL: Record<string, string> = {
  ENGINEERING: 'Engineering',
  DESIGN:      'Design',
  SALES:       'Sales',
  MANAGEMENT:  'Management',
}

interface Employee {
  id:         string
  name:       string
  role:       string
  department: string
  imageUrl:   string | null
}

export function EmployeesTable({ employees }: { employees: Employee[] }) {
  const router                      = useRouter()
  const [deleting, setDeleting]     = useState<string | null>(null)

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    setDeleting(id)
    try {
      const result = await deleteEmployee(id)
      if (!result.success) {
        toast.error(result.error)
      } else {
        toast.success(`${name} deleted`)
        router.refresh()
      }
    } finally {
      setDeleting(null)
    }
  }

  if (employees.length === 0) {
    return (
      <div
        className="flex h-40 items-center justify-center rounded-xl text-sm"
        style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
      >
        No employees yet.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: 'rgba(45,95,93,0.04)', borderBottom: '1px solid var(--border)' }}>
            {['Photo', 'Name', 'Role', 'Department', 'Actions'].map((col, i) => (
              <th
                key={col}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide"
                style={{ color: 'var(--muted)', textAlign: i === 4 ? 'right' : 'left' }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, i) => (
            <tr
              key={emp.id}
              style={{
                borderBottom: i < employees.length - 1 ? '1px solid var(--border)' : 'none',
                backgroundColor: '#fff',
              }}
            >
              {/* Photo */}
              <td className="px-4 py-3">
                <div
                  className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-[11px] font-semibold"
                  style={{ backgroundColor: 'rgba(45,95,93,0.12)', color: 'var(--accent)' }}
                >
                  {emp.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={emp.imageUrl}
                      alt={emp.name}
                      className="h-full w-full object-cover"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                    />
                  ) : (
                    emp.name.split(' ').map((p) => p[0]).slice(0, 2).join('')
                  )}
                </div>
              </td>

              {/* Name */}
              <td className="px-4 py-3 font-medium" style={{ color: 'var(--fg)' }}>
                {emp.name}
              </td>

              {/* Role */}
              <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>
                {emp.role}
              </td>

              {/* Department */}
              <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>
                {DEPT_LABEL[emp.department] ?? emp.department}
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/employees/${emp.id}/edit`}
                    className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-opacity hover:opacity-70"
                    style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
                  >
                    <Pencil size={12} strokeWidth={2} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(emp.id, emp.name)}
                    disabled={deleting === emp.id}
                    className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-opacity hover:opacity-70 disabled:opacity-40"
                    style={{ border: '1px solid #fecaca', color: '#ef4444', backgroundColor: '#fef2f2' }}
                  >
                    {deleting === emp.id
                      ? <Loader2 size={12} strokeWidth={2} className="animate-spin" />
                      : <Trash2   size={12} strokeWidth={2} />
                    }
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
