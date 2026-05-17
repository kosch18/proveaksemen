import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { InventoryForm } from '@/components/admin/InventoryForm'

export const metadata = { title: 'New Item — Admin' }

export default function NewInventoryPage() {
  return (
    <div className="px-8 py-8">
      <div className="mb-6">
        <Link
          href="/admin/inventory"
          className="inline-flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
          style={{ color: 'var(--muted)' }}
        >
          <ChevronLeft size={13} strokeWidth={2} />
          Back to inventory
        </Link>
        <h1 className="mt-3 font-heading text-2xl font-bold" style={{ color: 'var(--fg)' }}>
          New item
        </h1>
      </div>

      <InventoryForm />
    </div>
  )
}
