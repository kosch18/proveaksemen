/**
 * Simple in-memory rate limiter — works in both Node.js and Edge runtimes.
 * NOTE: state is per-process. For multi-instance deployments use Redis
 * (@upstash/ratelimit or ioredis).
 */

interface Entry {
  count:   number
  resetAt: number
}

const store = new Map<string, Entry>()

/**
 * Returns true if the request is allowed, false if the limit is exceeded.
 *
 * @param key      Unique identifier, e.g. `login:1.2.3.4` or `upload:user-id`
 * @param limit    Maximum requests allowed in the window
 * @param windowMs Window duration in milliseconds
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now   = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= limit) return false

  entry.count++
  return true
}
