'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

const STORAGE_KEY = 'nd-cookie-consent' // values: 'accepted' | 'declined'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY)
      if (!v) setVisible(true)
    } catch {
      // localStorage unavailable — show banner anyway
      setVisible(true)
    }
  }, [])

  function persist(choice: 'accepted' | 'declined') {
    try {
      localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-xl p-4 shadow-lg sm:p-5"
      style={{
        backgroundColor: 'var(--bg)',
        border: '1px solid var(--border)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
      }}
    >
      <div className="flex items-start gap-3 sm:items-center">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: 'rgba(45,95,93,0.1)' }}
          aria-hidden
        >
          <Cookie size={18} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
        </div>

        <div className="flex-1 text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>
          <p>
            We use cookies to keep you signed in and to understand how the site is used.
            By clicking <strong>Accept</strong> you agree to our use of cookies.{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-2"
              style={{ color: 'var(--accent)' }}
            >
              Learn more
            </Link>
            .
          </p>
        </div>

        <button
          type="button"
          aria-label="Close"
          onClick={() => persist('declined')}
          className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-md transition-opacity hover:opacity-60 sm:flex"
          style={{ color: 'var(--muted)' }}
        >
          <X size={16} strokeWidth={2} />
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => persist('declined')}
          className="rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => persist('accepted')}
          className="rounded-md px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          Accept
        </button>
      </div>
    </div>
  )
}
