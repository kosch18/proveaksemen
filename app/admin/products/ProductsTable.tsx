'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Pencil, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { deleteProduct } from './actions'

interface Product {
  id:        string
  slug:      string
  name:      string
  category:  string
  imageUrl:  string | null
  published: boolean
  order:     number
}

export function ProductsTable({ products }: { products: Product[] }) {
  const router                  = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    setDeleting(id)
    try {
      const result = await deleteProduct(id)
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

  if (products.length === 0) {
    return (
      <div
        className="flex h-40 items-center justify-center rounded-xl text-sm"
        style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
      >
        No products yet.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: 'rgba(45,95,93,0.04)', borderBottom: '1px solid var(--border)' }}>
            {['Name', 'Slug', 'Category', 'Status', 'Order', 'Actions'].map((col, i, arr) => (
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
          {products.map((p, i) => (
            <tr
              key={p.id}
              style={{
                borderBottom: i < products.length - 1 ? '1px solid var(--border)' : 'none',
                backgroundColor: '#fff',
              }}
            >
              <td className="px-4 py-3 font-medium" style={{ color: 'var(--fg)' }}>{p.name}</td>
              <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--muted)' }}>{p.slug}</td>
              <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{p.category}</td>
              <td className="px-4 py-3">
                <span
                  className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
                  style={
                    p.published
                      ? { backgroundColor: '#dcfce7', color: '#166534' }
                      : { backgroundColor: '#fee2e2', color: '#991b1b' }
                  }
                >
                  {p.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{p.order}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-opacity hover:opacity-70"
                    style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
                  >
                    <Pencil size={12} strokeWidth={2} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id, p.name)}
                    disabled={deleting === p.id}
                    className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-opacity hover:opacity-70 disabled:opacity-40"
                    style={{ border: '1px solid #fecaca', color: '#ef4444', backgroundColor: '#fef2f2' }}
                  >
                    {deleting === p.id
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
