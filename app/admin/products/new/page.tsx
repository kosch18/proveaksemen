import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { ProductForm } from '@/components/admin/ProductForm'

export const metadata = { title: 'New Product — Admin' }

export default function NewProductPage() {
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
          New product
        </h1>
      </div>

      <ProductForm />
    </div>
  )
}
