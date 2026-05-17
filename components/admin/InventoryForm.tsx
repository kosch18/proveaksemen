'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { inventorySchema, STATUSES, CATEGORIES, type InventoryFormValues } from '@/app/admin/inventory/schema'
import { createInventoryItem, updateInventoryItem } from '@/app/admin/inventory/actions'

interface ItemData {
  id:           number
  name:         string
  category:     string
  status:       string
  location:     string
  purchaseDate: string
  valueNok:     number
}

interface Props {
  item?: ItemData
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

export function InventoryForm({ item }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema),
    defaultValues: item
      ? {
          name:         item.name,
          category:     item.category,
          status:       item.status as InventoryFormValues['status'],
          location:     item.location,
          purchaseDate: item.purchaseDate,
          valueNok:     item.valueNok,
        }
      : {
          name:         '',
          category:     CATEGORIES[0],
          status:       'AVAILABLE',
          location:     '',
          purchaseDate: new Date().toISOString().split('T')[0],
          valueNok:     0,
        },
  })

  async function onSubmit(values: InventoryFormValues) {
    setLoading(true)
    try {
      const result = item
        ? await updateInventoryItem(item.id, values)
        : await createInventoryItem(values)

      if (!result.success) {
        toast.error(result.error)
        return
      }

      toast.success(item ? 'Item updated' : 'Item created')
      router.push('/admin/inventory')
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-2xl flex-col gap-5">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <Label required>Name</Label>
        <input
          {...register('name')}
          style={inputStyle(!!errors.name)}
          placeholder="Laptop Dell Latitude 5440"
        />
        <FieldError message={errors.name?.message} />
      </div>

      {/* Category + Status */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label required>Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <select {...field} style={inputStyle(!!errors.category)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}
          />
          <FieldError message={errors.category?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label required>Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <select {...field} style={inputStyle(!!errors.status)}>
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            )}
          />
          <FieldError message={errors.status?.message} />
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-1.5">
        <Label required>Location</Label>
        <input
          {...register('location')}
          style={inputStyle(!!errors.location)}
          placeholder="Lager Hamar"
        />
        <FieldError message={errors.location?.message} />
      </div>

      {/* Purchase date + Value */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label required>Purchase date</Label>
          <input
            {...register('purchaseDate')}
            type="date"
            style={inputStyle(!!errors.purchaseDate)}
          />
          <FieldError message={errors.purchaseDate?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label required>Value (NOK)</Label>
          <input
            {...register('valueNok', { valueAsNumber: true })}
            type="number"
            min={0}
            style={inputStyle(!!errors.valueNok)}
            placeholder="14500"
          />
          <FieldError message={errors.valueNok?.message} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 border-t pt-5" style={{ borderColor: 'var(--border)' }}>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          {item ? 'Save changes' : 'Create item'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/inventory')}
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
