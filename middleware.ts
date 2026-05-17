import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextResponse, type NextRequest } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'

const { auth } = NextAuth(authConfig)

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

function addSecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set('X-Frame-Options',            'DENY')
  res.headers.set('X-Content-Type-Options',     'nosniff')
  res.headers.set('Referrer-Policy',            'strict-origin-when-cross-origin')
  return res
}

// Inner handler: sets x-current-path + security headers on every allowed request.
// Cast needed because auth(callback) types target App Router handlers, not middleware.
const authMiddleware = auth((req) => {
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-current-path', req.nextUrl.pathname)
  return addSecurityHeaders(NextResponse.next({ request: { headers: requestHeaders } }))
}) as unknown as (req: NextRequest) => Promise<Response | undefined>

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ── Rate limit: login (10 attempts / 15 min per IP) ──────────────────────
  if (pathname === '/api/auth/callback/credentials' && req.method === 'POST') {
    const ip = getIp(req)
    if (!rateLimit(`login:${ip}`, 10, 15 * 60 * 1_000)) {
      return addSecurityHeaders(
        NextResponse.json(
          { error: 'Too many login attempts. Please try again in 15 minutes.' },
          { status: 429 },
        ),
      )
    }
  }

  // ── Rate limit: image upload (20 uploads / min per IP) ───────────────────
  if (pathname === '/api/upload' && req.method === 'POST') {
    const ip = getIp(req)
    if (!rateLimit(`upload:${ip}`, 20, 60 * 1_000)) {
      return addSecurityHeaders(
        NextResponse.json(
          { error: 'Upload limit reached. Please wait before uploading again.' },
          { status: 429 },
        ),
      )
    }
  }

  return authMiddleware(req)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
}
