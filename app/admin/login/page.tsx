'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const schema = z.object({
  email:    z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

type FormValues = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: FormValues) {
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        email:    values.email,
        password: values.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Invalid email or password')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch {
      toast.error('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="admin-root flex min-h-screen items-center justify-center px-4"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <span className="font-heading text-xl font-bold" style={{ color: 'var(--fg)' }}>
            Nordic Devices
          </span>
          <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
            Admin panel — sign in to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 rounded-xl p-6"
          style={{ border: '1px solid var(--border)', backgroundColor: '#fff' }}
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--fg)' }} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="admin@nordic.local"
              {...register('email')}
              className="rounded-md px-3 py-2.5 text-sm outline-none transition-colors"
              style={{
                border: errors.email ? '1px solid #ef4444' : '1px solid var(--border)',
                color: 'var(--fg)',
                backgroundColor: 'var(--bg)',
              }}
            />
            {errors.email && (
              <p className="text-xs" style={{ color: '#ef4444' }}>{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--fg)' }} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...register('password')}
              className="rounded-md px-3 py-2.5 text-sm outline-none transition-colors"
              style={{
                border: errors.password ? '1px solid #ef4444' : '1px solid var(--border)',
                color: 'var(--fg)',
                backgroundColor: 'var(--bg)',
              }}
            />
            {errors.password && (
              <p className="text-xs" style={{ color: '#ef4444' }}>{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
