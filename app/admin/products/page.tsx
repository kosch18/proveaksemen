import Link from 'next/link'
import { Plus } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { ProductsTable } from './ProductsTable'

export const metadata = { title: 'Products — Admin' }

export default async function ProductsAdminPage() {
  const products = await prisma.product.findMany({
    orderBy: { order: 'asc' },
    select: {
      id: true, slug: true, name: true, category: true,
      imageUrl: true, published: true, order: true,
    },
  })

  return (
    <div className="px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold" style={{ color: 'var(--fg)' }}>
          Products
          <span className="ml-2 text-base font-normal" style={{ color: 'var(--muted)' }}>
            ({products.length})
          </span>
        </h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <Plus size={14} strokeWidth={2.5} />
          New product
        </Link>
      </div>

      <ProductsTable products={products} />
    </div>
  )
}
