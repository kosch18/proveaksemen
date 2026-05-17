import Link from 'next/link'
import { Plus } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { InventoryTable } from './InventoryTable'

export const metadata = { title: 'Inventory — Admin' }

export default async function InventoryAdminPage() {
  const items = await prisma.inventoryItem.findMany({
    orderBy: { id: 'asc' },
  })

  return (
    <div className="px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold" style={{ color: 'var(--fg)' }}>
          Inventory
          <span className="ml-2 text-base font-normal" style={{ color: 'var(--muted)' }}>
            ({items.length})
          </span>
        </h1>
        <Link
          href="/admin/inventory/new"
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <Plus size={14} strokeWidth={2.5} />
          New item
        </Link>
      </div>

      <InventoryTable items={items} />
    </div>
  )
}
