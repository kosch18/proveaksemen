'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Pencil, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { deleteInventoryItem } from './actions'

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  AVAILABLE:   { bg: '#dcfce7', color: '#166534', label: 'In stock' },
  RENTED:      { bg: '#dbeafe', color: '#1e40af', label: 'On rental' },
  MAINTENANCE: { bg: '#ffedd5', color: '#9a3412', label: 'In service' },
}

interface Item {
  id:           number
  name:         string
  category:     string
  status:       string
  location:     string
  purchaseDate: string
  valueNok:     number
}

export function InventoryTable({ items }: { items: Item[] }) {
  const router                  = useRouter()
  const [deleting, setDeleting] = useState<number | null>(null)

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    setDeleting(id)
    try {
      const result = await deleteInventoryItem(id)
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

  if (items.length === 0) {
    return (
      <div
        className="flex h-40 items-center justify-center rounded-xl text-sm"
        style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
      >
        No inventory items yet.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: 'rgba(45,95,93,0.04)', borderBottom: '1px solid var(--border)' }}>
            {['Name', 'Category', 'Status', 'Location', 'Value (NOK)', 'Actions'].map((col, i, arr) => (
              <th
                key={col}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide"
                style={{ color: 'var(--muted)', textAlign: i === arr.length - 1 ? 'right' : 'left' }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            const st = STATUS_STYLE[item.status] ?? STATUS_STYLE.AVAILABLE
            return (
              <tr
                key={item.id}
                style={{
                  borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
                  backgroundColor: '#fff',
                }}
              >
                <td className="px-4 py-3 font-medium" style={{ color: 'var(--fg)' }}>{item.name}</td>
                <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{item.category}</td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: st.bg, color: st.color }}
                  >
                    {st.label}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{item.location}</td>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--fg)' }}>
                  {item.valueNok.toLocaleString('nb-NO')}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/inventory/${item.id}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-opacity hover:opacity-70"
                      style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
                    >
                      <Pencil size={12} strokeWidth={2} />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      disabled={deleting === item.id}
                      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-opacity hover:opacity-70 disabled:opacity-40"
                      style={{ border: '1px solid #fecaca', color: '#ef4444', backgroundColor: '#fef2f2' }}
                    >
                      {deleting === item.id
                        ? <Loader2 size={12} strokeWidth={2} className="animate-spin" />
                        : <Trash2   size={12} strokeWidth={2} />
                      }
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
