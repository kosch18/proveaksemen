'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { employeeSchema, DEPARTMENTS, type EmployeeFormValues } from '@/app/admin/employees/schema'
import { createEmployee, updateEmployee } from '@/app/admin/employees/actions'
import { ImageUpload } from './ImageUpload'

interface EmployeeData {
  id:         string
  name:       string
  role:       string
  department: string
  bio:        string
  email:      string | null
  imageUrl:   string | null
  order:      number
}

interface Props {
  employee?: EmployeeData
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

export function EmployeeForm({ employee }: Props) {
  const router     = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: employee
      ? {
          name:       employee.name,
          role:       employee.role,
          department: employee.department as EmployeeFormValues['department'],
          bio:        employee.bio,
          email:      employee.email ?? '',
          imageUrl:   employee.imageUrl ?? '',
          order:      employee.order,
        }
      : {
          name:       '',
          role:       '',
          department: 'ENGINEERING' as const,
          bio:        '',
          email:      '',
          imageUrl:   '',
          order:      0,
        },
  })

  async function onSubmit(values: EmployeeFormValues) {
    setLoading(true)
    try {
      const result = employee
        ? await updateEmployee(employee.id, values)
        : await createEmployee(values)

      if (!result.success) {
        toast.error(result.error)
        return
      }

      toast.success(employee ? 'Employee updated' : 'Employee created')
      router.push('/admin/employees')
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
        <input {...register('name')} style={inputStyle(!!errors.name)} placeholder="Ada Lovelace" />
        <FieldError message={errors.name?.message} />
      </div>

      {/* Role + Department */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label required>Role</Label>
          <input {...register('role')} style={inputStyle(!!errors.role)} placeholder="Senior Engineer" />
          <FieldError message={errors.role?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label required>Department</Label>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <select {...field} style={inputStyle(!!errors.department)}>
                {DEPARTMENTS.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            )}
          />
          <FieldError message={errors.department?.message} />
        </div>
      </div>

      {/* Email + Order */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label>Email</Label>
          <input
            {...register('email')}
            type="email"
            style={inputStyle(!!errors.email)}
            placeholder="ada@nordic.no"
          />
          <FieldError message={errors.email?.message} />
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

      {/* Bio */}
      <div className="flex flex-col gap-1.5">
        <Label required>Bio</Label>
        <textarea
          {...register('bio')}
          rows={4}
          style={{ ...inputStyle(!!errors.bio), resize: 'vertical' }}
          placeholder="Brief description of the employee's background and expertise…"
        />
        <FieldError message={errors.bio?.message} />
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
          {employee ? 'Save changes' : 'Create employee'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/employees')}
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
