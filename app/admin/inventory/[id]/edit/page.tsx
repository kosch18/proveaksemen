import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { InventoryForm } from '@/components/admin/InventoryForm'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const item = await prisma.inventoryItem.findUnique({
    where:  { id: Number(id) },
    select: { name: true },
  })
  return { title: item ? `Edit ${item.name} — Admin` : 'Edit Item — Admin' }
}

export default async function EditInventoryPage({ params }: Props) {
  const { id } = await params
  const item = await prisma.inventoryItem.findUnique({ where: { id: Number(id) } })
  if (!item) notFound()

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
          Edit {item.name}
        </h1>
      </div>

      <InventoryForm
        item={{
          id:           item.id,
          name:         item.name,
          category:     item.category,
          status:       item.status,
          location:     item.location,
          purchaseDate: item.purchaseDate,
          valueNok:     item.valueNok,
        }}
      />
    </div>
  )
}
