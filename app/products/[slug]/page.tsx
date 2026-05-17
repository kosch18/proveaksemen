import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Check, ArrowRight, FileText } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { mapProduct } from '@/lib/db/mappers'
import { ProductGallery } from './ProductGallery'

type Props = { params: { slug: string } }

// ─── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const rows = await prisma.product.findMany({
    where:  { published: true },
    select: { slug: true },
  })
  return rows.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const row = await prisma.product.findUnique({
    where:  { slug: params.slug },
    select: { name: true, shortDescription: true },
  })
  if (!row) return {}
  return { title: row.name, description: row.shortDescription }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({ params }: Props) {
  const row = await prisma.product.findUnique({ where: { slug: params.slug } })
  if (!row) notFound()

  const product = mapProduct(row)

  return (
    <>
      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <nav
        className="px-4 py-4 sm:px-6 lg:px-8"
        style={{ borderBottom: '1px solid var(--border)' }}
        aria-label="Breadcrumb"
      >
        <ol className="mx-auto flex max-w-7xl items-center gap-1.5 text-xs" style={{ color: 'var(--muted)' }}>
          <li>
            <Link href="/" className="transition-colors hover:underline" style={{ color: 'var(--muted)' }}>
              Home
            </Link>
          </li>
          <li aria-hidden><ChevronRight size={12} strokeWidth={2} /></li>
          <li>
            <Link href="/products" className="transition-colors hover:underline" style={{ color: 'var(--muted)' }}>
              Products
            </Link>
          </li>
          <li aria-hidden><ChevronRight size={12} strokeWidth={2} /></li>
          <li style={{ color: 'var(--fg)' }} aria-current="page">{product.name}</li>
        </ol>
      </nav>

      {/* ── Hero: gallery + info ────────────────────────────────────────────── */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <ProductGallery product={product} />

            <div className="flex flex-col">
              <span
                className="mb-4 inline-flex w-fit rounded-md px-2.5 py-1 text-xs font-medium"
                style={{
                  color: 'var(--accent)',
                  backgroundColor: 'rgba(45,95,93,0.09)',
                  border: '1px solid rgba(45,95,93,0.2)',
                }}
              >
                {product.category}
              </span>

              <h1
                className="font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
                style={{ color: 'var(--fg)' }}
              >
                {product.name}
              </h1>

              <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                {product.shortDescription}
              </p>

              <dl
                className="mt-7 flex flex-col divide-y rounded-xl"
                style={{ border: '1px solid var(--border)' }}
              >
                {product.specs.slice(0, 4).map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-4 px-4 py-3">
                    <dt className="text-sm" style={{ color: 'var(--muted)' }}>{label}</dt>
                    <dd className="text-right font-mono text-sm font-medium" style={{ color: 'var(--fg)' }}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  Request a quote
                  <ArrowRight size={15} strokeWidth={2} />
                </Link>
                <button
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md py-3 text-sm font-medium transition-opacity hover:opacity-75"
                  style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
                >
                  <FileText size={15} strokeWidth={1.75} />
                  Download datasheet
                </button>
              </div>

              <p className="mt-5 text-center text-xs sm:text-left" style={{ color: 'var(--muted)' }}>
                10-year supply lifecycle guarantee · CE &amp; DNV GL certified
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full description ────────────────────────────────────────────────── */}
      <section className="px-4 py-14 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr]">
            <div>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                Overview
              </span>
              <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--fg)' }}>
                Product description
              </h2>
            </div>
            <p className="self-center text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
              {product.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ── Specs table ─────────────────────────────────────────────────────── */}
      <section
        className="px-4 py-14 sm:px-6 lg:px-8"
        style={{ borderTop: '1px solid var(--border)', backgroundColor: 'rgba(45,95,93,0.02)' }}
      >
        <div className="mx-auto max-w-7xl">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
            Technical Specifications
          </span>
          <h2 className="mb-8 font-heading text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--fg)' }}>
            Full spec sheet
          </h2>
          <div className="overflow-hidden rounded-xl" style={{ border: '1px solid var(--border)' }}>
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map(({ label, value }, i) => (
                  <tr
                    key={label}
                    style={{
                      backgroundColor: i % 2 === 0 ? 'var(--bg)' : 'rgba(45,95,93,0.03)',
                      borderBottom: i < product.specs.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <th className="w-2/5 px-5 py-3.5 text-left font-medium" style={{ color: 'var(--fg)' }} scope="row">
                      {label}
                    </th>
                    <td className="px-5 py-3.5 font-mono" style={{ color: 'var(--muted)' }}>
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Features list ───────────────────────────────────────────────────── */}
      <section className="px-4 py-14 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="mx-auto max-w-7xl">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
            Features
          </span>
          <h2 className="mb-8 font-heading text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--fg)' }}>
            What makes it stand out
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {product.features.map((feat) => (
              <li key={feat} className="flex items-start gap-3 rounded-xl p-4" style={{ border: '1px solid var(--border)' }}>
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: 'rgba(45,95,93,0.12)' }}
                >
                  <Check size={12} strokeWidth={2.5} style={{ color: 'var(--accent)' }} />
                </span>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="px-4 py-14 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="font-heading text-xl font-semibold sm:text-2xl" style={{ color: 'var(--fg)' }}>
              Interested in {product.name}?
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
              Our engineers will help you evaluate fit for your application.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Link
              href="/products"
              className="inline-flex items-center rounded-md px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-75"
              style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
            >
              ← All products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Contact us
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
