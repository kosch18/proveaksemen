import { prisma } from '@/lib/prisma'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { ProductsPreview } from '@/components/sections/ProductsPreview'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { CTA } from '@/components/sections/CTA'

export default async function Home() {
  const [previewRows, totalCount] = await Promise.all([
    prisma.inventoryItem.findMany({
      where:   { status: 'AVAILABLE' },
      orderBy: { id: 'asc' },
      take:    3,
    }),
    prisma.inventoryItem.count(),
  ])

  const previewItems = previewRows.map((r) => ({
    id:       String(r.id),
    name:     r.name,
    category: r.category,
    location: r.location,
    valueNok: r.valueNok,
    status:   r.status,
  }))

  return (
    <>
      <Hero />
      <Stats />
      <ProductsPreview products={previewItems} total={totalCount} />
      <ServicesPreview />
      <CTA />
    </>
  )
}
