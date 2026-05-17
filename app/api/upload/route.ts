import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { auth } from '@/auth'
import { rateLimit } from '@/lib/rateLimit'

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const MAX_BYTES      = 5 * 1024 * 1024 // 5 MB

const EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png':  'png',
  'image/webp': 'webp',
}

export async function POST(req: NextRequest) {
  // ── Auth ─────────────────────────────────────────────────────────────────
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── Per-user rate limit: 20 uploads / minute ──────────────────────────
  if (!rateLimit(`upload:user:${session.user.id}`, 20, 60 * 1_000)) {
    return NextResponse.json(
      { error: 'Upload limit reached. Please wait before uploading again.' },
      { status: 429 },
    )
  }

  // ── Parse & validate ─────────────────────────────────────────────────────
  const formData = await req.formData()
  const file     = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: 'Only JPEG, PNG and WebP images are allowed' },
      { status: 415 },
    )
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File exceeds 5 MB limit' }, { status: 413 })
  }

  // ── Save ─────────────────────────────────────────────────────────────────
  const ext      = EXT[file.type]
  const filename = `${crypto.randomUUID()}.${ext}`
  const dest     = join(process.cwd(), 'public', 'uploads', filename)

  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(dest, buffer)

  return NextResponse.json({ url: `/uploads/${filename}` })
}
