import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { ProductForm } from '@/components/admin/ProductForm'

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props) {
  const p = await prisma.product.findUnique({
    where:  { id: params.id },
    select: { name: true },
  })
  return { title: p ? `Edit ${p.name} — Admin` : 'Edit Product — Admin' }
}

export default async function EditProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({ where: { id: params.id } })
  if (!product) notFound()

  return (
    <div className="px-8 py-8">
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
          style={{ color: 'var(--muted)' }}
        >
          <ChevronLeft size={13} strokeWidth={2} />
          Back to products
        </Link>
        <h1 className="mt-3 font-heading text-2xl font-bold" style={{ color: 'var(--fg)' }}>
          Edit {product.name}
        </h1>
      </div>

      <ProductForm
        product={{
          id:               product.id,
          slug:             product.slug,
          name:             product.name,
          category:         product.category,
          shortDescription: product.shortDescription,
          fullDescription:  product.fullDescription,
          imageUrl:         product.imageUrl,
          features:         product.features as unknown as string[],
          specs:            product.specs as unknown as { label: string; value: string }[],
          published:        product.published,
          order:            product.order,
        }}
      />
    </div>
  )
}
