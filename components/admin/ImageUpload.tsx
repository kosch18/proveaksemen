'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ImagePlus, X, Loader2 } from 'lucide-react'

interface Props {
  value:    string
  onChange: (url: string) => void
}

export function ImageUpload({ value, onChange }: Props) {
  const inputRef          = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  async function handleFile(file: File) {
    setError(null)
    setLoading(true)

    const body = new FormData()
    body.append('file', file)

    try {
      const res  = await fetch('/api/upload', { method: 'POST', body })
      const data = await res.json() as { url?: string; error?: string }

      if (!res.ok) {
        setError(data.error ?? 'Upload failed')
        return
      }

      onChange(data.url!)
    } catch {
      setError('Network error — try again')
    } finally {
      setLoading(false)
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Preview */}
      {value ? (
        <div className="relative h-48 w-full overflow-hidden rounded-xl" style={{ border: '1px solid var(--border)' }}>
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 480px"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition-opacity hover:bg-black/80"
            aria-label="Remove image"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>
      ) : (
        /* Drop zone */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          disabled={loading}
          className="flex h-48 w-full flex-col items-center justify-center gap-3 rounded-xl transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          style={{ border: '2px dashed var(--border)', backgroundColor: 'rgba(45,95,93,0.03)' }}
        >
          {loading ? (
            <Loader2 size={22} strokeWidth={1.75} className="animate-spin" style={{ color: 'var(--accent)' }} />
          ) : (
            <ImagePlus size={22} strokeWidth={1.75} style={{ color: 'var(--muted)' }} />
          )}
          <span className="text-xs" style={{ color: 'var(--muted)' }}>
            {loading ? 'Uploading…' : 'Click or drag & drop — JPEG, PNG, WebP · max 5 MB'}
          </span>
        </button>
      )}

      {/* Change button when preview is shown */}
      {value && !loading && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 self-start rounded-md px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-75"
          style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
        >
          <ImagePlus size={13} strokeWidth={1.75} />
          Replace image
        </button>
      )}

      {/* Error */}
      {error && (
        <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={onInputChange}
      />
    </div>
  )
}
