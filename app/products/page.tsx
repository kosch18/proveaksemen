import { prisma } from '@/lib/prisma'
import type { InventoryItem } from '@/lib/data/types'
import { ProductsGrid } from './ProductsGrid'

export const metadata = {
  title: 'Products',
  description: 'Browse our full product catalogue — laptops, network gear, servers and accessories available for purchase or rental.',
}

export default async function ProductsPage() {
  const rows = await prisma.inventoryItem.findMany({
    orderBy: { id: 'asc' },
  })

  const items: InventoryItem[] = rows.map((r) => ({
    id:            r.id,
    name:          r.name,
    category:      r.category,
    status:        r.status.toLowerCase() as InventoryItem['status'],
    location:      r.location,
    purchase_date: r.purchaseDate,
    value_nok:     r.valueNok,
  }))

  return (
    <section className="px-4 pb-24 pt-16 sm:px-6 sm:pt-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ProductsGrid items={items} />
      </div>
    </section>
  )
}
