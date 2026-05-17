'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import {
  productSchema,
  PRODUCT_CATEGORIES,
  type ProductFormValues,
} from '@/app/admin/products/schema'
import { createProduct, updateProduct } from '@/app/admin/products/actions'
import { ImageUpload } from './ImageUpload'

interface ProductData {
  id:               string
  slug:             string
  name:             string
  category:         string
  shortDescription: string
  fullDescription:  string
  imageUrl:         string | null
  features:         string[]
  specs:            { label: string; value: string }[]
  published:        boolean
  order:            number
}

interface Props {
  product?: ProductData
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="text-xs font-medium" style={{ color: 'var(--fg)' }}>
      {children}
      {required && <span className="ml-0.5" style={{ color: '#ef4444' }}>*</span>}
    </label>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-xs" style={{ color: '#ef4444' }}>{message}</p>
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    border: `1px solid ${hasError ? '#ef4444' : 'var(--border)'}`,
    backgroundColor: 'var(--bg)',
    color: 'var(--fg)',
    borderRadius: '0.375rem',
    padding: '0.625rem 0.75rem',
    fontSize: '0.875rem',
    width: '100%',
    outline: 'none',
  }
}

export function ProductForm({ product }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          slug:             product.slug,
          name:             product.name,
          category:         product.category,
          shortDescription: product.shortDescription,
          fullDescription:  product.fullDescription,
          imageUrl:         product.imageUrl ?? '',
          features:         product.features ?? [],
          specs:            product.specs ?? [],
          published:        product.published,
          order:            product.order,
        }
      : {
          slug:             '',
          name:             '',
          category:         PRODUCT_CATEGORIES[0],
          shortDescription: '',
          fullDescription:  '',
          imageUrl:         '',
          features:         [],
          specs:            [],
          published:        true,
          order:            0,
        },
  })

  const featuresArray = useFieldArray({ control, name: 'features' as never })
  const specsArray    = useFieldArray({ control, name: 'specs' })

  async function onSubmit(values: ProductFormValues) {
    setLoading(true)
    try {
      const result = product
        ? await updateProduct(product.id, values)
        : await createProduct(values)

      if (!result.success) {
        toast.error(result.error)
        return
      }

      toast.success(product ? 'Product updated' : 'Product created')
      router.push('/admin/products')
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-3xl flex-col gap-5">
      {/* Name + Slug */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label required>Name</Label>
          <input {...register('name')} style={inputStyle(!!errors.name)} placeholder="ND-MX1 Industrial Gateway" />
          <FieldError message={errors.name?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label required>Slug</Label>
          <input {...register('slug')} style={inputStyle(!!errors.slug)} placeholder="nd-mx1-gateway" />
          <FieldError message={errors.slug?.message} />
        </div>
      </div>

      {/* Category + Order */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label required>Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <select {...field} style={inputStyle(!!errors.category)}>
                {PRODUCT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}
          />
          <FieldError message={errors.category?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Display order</Label>
          <input
            {...register('order', { valueAsNumber: true })}
            type="number"
            min={0}
            style={inputStyle(!!errors.order)}
            placeholder="0"
          />
          <FieldError message={errors.order?.message} />
        </div>
      </div>

      {/* Published */}
      <div className="flex items-center gap-2">
        <input type="checkbox" id="published" {...register('published')} />
        <label htmlFor="published" className="text-sm" style={{ color: 'var(--fg)' }}>
          Published (visible on public catalog)
        </label>
      </div>

      {/* Short description */}
      <div className="flex flex-col gap-1.5">
        <Label required>Short description</Label>
        <textarea
          {...register('shortDescription')}
          rows={2}
          style={{ ...inputStyle(!!errors.shortDescription), resize: 'vertical' }}
          placeholder="One-line product summary…"
        />
        <FieldError message={errors.shortDescription?.message} />
      </div>

      {/* Full description */}
      <div className="flex flex-col gap-1.5">
        <Label required>Full description</Label>
        <textarea
          {...register('fullDescription')}
          rows={5}
          style={{ ...inputStyle(!!errors.fullDescription), resize: 'vertical' }}
          placeholder="Detailed product overview, use cases, benefits…"
        />
        <FieldError message={errors.fullDescription?.message} />
      </div>

      {/* Photo */}
      <div className="flex flex-col gap-1.5">
        <Label>Photo</Label>
        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <ImageUpload value={field.value ?? ''} onChange={field.onChange} />
          )}
        />
      </div>

      {/* Features */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label>Features</Label>
          <button
            type="button"
            onClick={() => featuresArray.append('' as never)}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-opacity hover:opacity-70"
            style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
          >
            <Plus size={12} /> Add feature
          </button>
        </div>
        {featuresArray.fields.map((field, i) => (
          <div key={field.id} className="flex gap-2">
            <input
              {...register(`features.${i}` as const)}
              style={inputStyle(false)}
              placeholder="Feature description"
            />
            <button
              type="button"
              onClick={() => featuresArray.remove(i)}
              className="rounded-md px-2 text-xs"
              style={{ border: '1px solid #fecaca', color: '#ef4444', backgroundColor: '#fef2f2' }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Specs */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label>Specifications</Label>
          <button
            type="button"
            onClick={() => specsArray.append({ label: '', value: '' })}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-opacity hover:opacity-70"
            style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
          >
            <Plus size={12} /> Add spec
          </button>
        </div>
        {specsArray.fields.map((field, i) => (
          <div key={field.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
            <input
              {...register(`specs.${i}.label` as const)}
              style={inputStyle(false)}
              placeholder="Label (e.g. Processor)"
            />
            <input
              {...register(`specs.${i}.value` as const)}
              style={inputStyle(false)}
              placeholder="Value (e.g. ARM Cortex-A53)"
            />
            <button
              type="button"
              onClick={() => specsArray.remove(i)}
              className="rounded-md px-2 text-xs"
              style={{ border: '1px solid #fecaca', color: '#ef4444', backgroundColor: '#fef2f2' }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div
        className="flex items-center gap-3 border-t pt-5"
        style={{ borderColor: 'var(--border)' }}
      >
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          {product ? 'Save changes' : 'Create product'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          disabled={loading}
          className="rounded-md px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-70 disabled:opacity-40"
          style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
