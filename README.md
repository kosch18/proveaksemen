# Nordic Devices

Company website for Nordic Devices AS — a fictional Norwegian embedded electronics manufacturer based in Oslo (est. 2014). Built with Next.js 14 App Router, PostgreSQL, Prisma, and NextAuth v5.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, `output: standalone`) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS variables |
| Animation | Framer Motion |
| Database | PostgreSQL 16 (via Docker) |
| ORM | Prisma 5 |
| Auth | NextAuth v5 (Auth.js) — Credentials + JWT |
| Forms | react-hook-form + zod + sonner |
| Icons | lucide-react |

---

## Getting started (local dev)

### Prerequisites

- Node.js 20+
- Docker Desktop

### 1. Clone and install

```bash
git clone <repo-url>
cd site-proveaksemen
npm install
```

### 2. Environment

```bash
cp .env.example .env
```

Edit `.env`:

```
DATABASE_URL="postgresql://nordic:nordic_dev_password@localhost:5432/nordic_devices?schema=public"
AUTH_SECRET="<generate with: openssl rand -base64 32>"
```

### 3. Start database

```bash
npm run db:up          # starts postgres:16-alpine via Docker
npm run db:migrate     # runs Prisma migrations
npm run db:seed        # seeds products, employees, and admin user
```

### 4. Run dev server

```bash
npm run dev
```

Site is at [http://localhost:3000](http://localhost:3000).  
Admin panel is at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## Database

### Useful scripts

| Command | What it does |
|---|---|
| `npm run db:up` | Start the PostgreSQL container |
| `npm run db:down` | Stop the PostgreSQL container |
| `npm run db:migrate` | Apply pending Prisma migrations |
| `npm run db:seed` | Seed demo data + admin user |
| `npm run db:reset` | Drop, recreate, migrate, and seed (destructive) |
| `npm run db:studio` | Open Prisma Studio at localhost:5555 |

### Recreate from scratch

```bash
npm run db:reset    # equivalent to: prisma migrate reset --force
npm run db:seed     # re-seed demo data
```

### Applying a new migration

```bash
npx prisma migrate dev --name describe_what_changed
```

---

## Admin panel

### Accessing

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin).  
If not authenticated, you will be redirected to `/admin/login`.

### Default credentials (seeded by `db:seed`)

| Field | Value |
|---|---|
| Email | `admin@nordic.local` |
| Password | `admin123` |

> **Change these immediately in any non-local environment.**  
> The password is bcrypt-hashed (cost factor 10) in the database.

### Changing the admin password

Connect to the database (e.g. via Prisma Studio) and update the `password` field with a new bcrypt hash. You can generate one:

```bash
node -e "const b=require('bcryptjs');b.hash('newpassword',10).then(console.log)"
```

### Admin features

- **Dashboard** — live counts (employees, total products, published products) + quick-action links
- **Employees** — list, create, edit, delete with photo upload
- **Products** — _(coming soon)_

---

## Deployment (Docker)

Build and run both services with a single command:

```bash
AUTH_SECRET="<your-secret>" docker compose up --build -d
```

The `app` service:
- Builds Next.js in standalone mode (`output: 'standalone'`)
- Runs `prisma generate` before `next build`
- Runs as a non-root user (`nextjs:nodejs`)
- Mounts an `uploads_data` Docker volume at `/app/public/uploads` so uploaded images survive container restarts

After first deploy, run migrations and seed:

```bash
docker compose exec app npx prisma migrate deploy
docker compose exec app npx tsx prisma/seed.ts
```

---

## Security considerations

### What is implemented

| Mechanism | Details |
|---|---|
| **Authentication** | NextAuth v5 — JWT session, bcrypt password verification, server-side `auth()` guard on every mutation |
| **Route protection** | Middleware protects all `/admin/*` routes; unauthenticated requests redirect to `/admin/login` |
| **Auth check on every action** | All Server Actions and API route handlers call `auth()` and return 401/throw before touching the database |
| **Input validation** | zod schemas validated server-side in every action and API route — client-side validation is UX-only |
| **Rate limiting (login)** | 10 POST attempts per IP per 15 minutes to `/api/auth/callback/credentials` — enforced in Edge Middleware |
| **Rate limiting (uploads)** | 20 uploads per minute per IP (middleware) + 20 per minute per user ID (route handler) |
| **Security headers** | `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` applied to every response in middleware |
| **Secret management** | `AUTH_SECRET` and `DATABASE_URL` are in `.env` (gitignored); `.env.example` contains only placeholders |
| **File upload validation** | MIME type allowlist (JPEG/PNG/WebP), 5 MB hard limit, UUID-based filenames to prevent path traversal |
| **Non-root Docker user** | Production container runs as `nextjs:nodejs` (uid 1001) |

### What to add before production

| Gap | Recommended fix |
|---|---|
| **HTTPS / TLS** | Terminate TLS at a reverse proxy (nginx, Caddy, or a load balancer). Never run plain HTTP in prod. |
| **Distributed rate limiting** | The in-memory `Map` does not share state across multiple Node.js processes or pods. Replace with [`@upstash/ratelimit`](https://github.com/upstash/ratelimit) (Redis-backed, edge-compatible). |
| **CSRF protection** | NextAuth v5 includes CSRF token protection for its own endpoints. For custom Server Actions that modify state, add `origin` header validation or use the `x-requested-with` header check. |
| **Content Security Policy** | Add a `Content-Security-Policy` header to restrict script, style, and image sources. Start with `default-src 'self'` and loosen as needed. |
| **Stronger admin password policy** | Enforce minimum length and complexity when creating/changing passwords. Consider time-limited invitation links instead of seeded credentials. |
| **S3 (or compatible) for uploads** | Local disk uploads don't scale and are lost if the container is replaced (even with a Docker volume, they stay on one host). Use AWS S3, Cloudflare R2, or similar with pre-signed PUT URLs. |
| **Audit log** | Record who created/updated/deleted records and when. A simple `AuditLog` Prisma model or a service like Axiom works well. |
| **Database connection pooling** | Prisma opens a new connection per serverless invocation. Use [Prisma Accelerate](https://www.prisma.io/accelerate) or PgBouncer in front of PostgreSQL. |
| **Secrets rotation** | Rotate `AUTH_SECRET` periodically. Invalidate all existing JWT sessions after rotation. |
