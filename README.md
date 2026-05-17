# Nordic Devices — Full-Stack Web Application

> Corporate website and content management system for **Nordic Devices AS** — a fictional Norwegian embedded electronics manufacturer based in Oslo (est. 2014).

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Architecture](#3-architecture)
4. [Database Schema](#4-database-schema)
5. [Application Routes](#5-application-routes)
6. [API Reference](#6-api-reference)
7. [Directory Structure](#7-directory-structure)
8. [Security Implementation](#8-security-implementation)
9. [Quick Start — Local Development](#9-quick-start--local-development)
10. [Docker Deployment](#10-docker-deployment)
11. [Production Deployment](#11-production-deployment)
12. [Environment Variables](#12-environment-variables)
13. [Admin Panel Guide](#13-admin-panel-guide)
14. [NPM Scripts Reference](#14-npm-scripts-reference)
15. [Development Workflow](#15-development-workflow)

---

## 1. Project Overview

Nordic Devices is a full-stack web application combining a **public-facing corporate website** with a **protected admin CMS**. It demonstrates real-world patterns used in modern production systems:

| Aspect | Description |
|---|---|
| **Purpose** | Company website + internal content management |
| **Public Features** | Product catalog, employee directory, services, about, contact, docs, changelog |
| **Admin Features** | CRUD for employees, products, and inventory items with image upload |
| **Authentication** | Email/password login with JWT sessions and role-based access |
| **Deployment** | Fully containerized — PostgreSQL + Next.js + Nginx + SSL in Docker Compose |

The codebase follows Next.js 14 **App Router** conventions with server components by default, server actions for mutations, and a clear separation between public and protected routes.

---

## 2. Technology Stack

### Frontend

| Technology | Version | Role |
|---|---|---|
| **Next.js** | 14 | React framework (App Router, SSR, server actions) |
| **TypeScript** | 5 | Static typing across the entire codebase (strict mode) |
| **Tailwind CSS** | 3.4 | Utility-first styling + CSS custom properties for theming |
| **Framer Motion** | 11.3 | Declarative animations and page transitions |
| **Lucide React** | 0.400 | Icon library |
| **Google Fonts** | — | Inter, Inter Tight, JetBrains Mono |

### Backend & Data

| Technology | Version | Role |
|---|---|---|
| **Node.js** | 20 | JavaScript runtime (Alpine in Docker) |
| **PostgreSQL** | 16 | Primary relational database |
| **Prisma** | 5.22 | ORM — schema management, migrations, query builder |
| **NextAuth v5** | 5.x (Auth.js) | Authentication — Credentials provider, JWT sessions |
| **bcryptjs** | 2.4 | Password hashing (cost factor 10) |
| **Sharp** | 0.34 | Server-side image processing and optimization |

### Forms & Validation

| Technology | Version | Role |
|---|---|---|
| **react-hook-form** | 7.76 | Client-side form state management |
| **Zod** | 4.4 | Schema validation (server-side enforcement) |
| **Sonner** | 2.0.7 | Toast notification system |

### Infrastructure

| Technology | Role |
|---|---|
| **Docker Compose** | Multi-service container orchestration |
| **Nginx** | Reverse proxy, SSL termination, HTTP→HTTPS redirect |
| **Certbot / Let's Encrypt** | Free TLS certificates with auto-renewal |

---

## 3. Architecture

### High-Level System Diagram

```
┌─────────────────────────────────────────────────────────┐
│                        Internet                         │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS :443 / HTTP :80
                         ▼
              ┌──────────────────────┐
              │        Nginx         │
              │  Reverse Proxy + SSL │
              │  (Let's Encrypt TLS) │
              └──────────┬───────────┘
                         │ HTTP :3000 (internal Docker network)
                         ▼
              ┌──────────────────────┐
              │     Next.js App      │
              │  (standalone output) │
              │                      │
              │  ┌────────────────┐  │
              │  │ App Router     │  │
              │  │ Server Actions │  │
              │  │ API Routes     │  │
              │  │ Middleware     │  │
              │  └───────┬────────┘  │
              └──────────┼───────────┘
                         │ Prisma Client
                         ▼
              ┌──────────────────────┐
              │     PostgreSQL 16    │
              │  (not exposed to     │
              │   the internet)      │
              └──────────────────────┘
```

### Request Flow

```
Browser Request
      │
      ▼
middleware.ts ──── Rate limit check ──── Block (429) if exceeded
      │
      ├── /admin/* ── Auth check ── Redirect to /login if unauthenticated
      │
      ├── Security headers applied to ALL responses
      │
      ▼
Next.js App Router
      │
      ├── Server Components ── Direct Prisma DB queries
      │
      ├── Server Actions ── auth() guard → Zod validation → Prisma mutation
      │
      └── API Routes ── auth() guard → Rate limit → file handling
```

### Design Patterns Used

| Pattern | Where Applied |
|---|---|
| **Server Components (default)** | All pages — data fetching directly in JSX, no useEffect |
| **Client Components (`"use client"`)** | Interactive forms, animations, theme toggle |
| **Server Actions** | All CRUD mutations (employees, products, inventory) |
| **Singleton Prisma Client** | `lib/prisma.ts` — one connection reused across hot reloads |
| **Zod + react-hook-form** | Client validation (UX) + server-side re-validation (security) |
| **Edge Middleware** | Rate limiting and auth guards run at the edge before the app |
| **Standalone Output** | `next build` produces a self-contained Node.js server (ideal for Docker) |

---

## 4. Database Schema

### Entity Relationship Diagram

```
┌──────────────────────────────────┐
│              User                │
├──────────────────────────────────┤
│ id        String   (cuid, PK)    │
│ email     String   (unique)      │
│ password  String   (bcrypt)      │
│ name      String                 │
│ role      Role     (ADMIN/EDITOR)│
│ createdAt DateTime               │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│            Employee              │
├──────────────────────────────────┤
│ id         String   (cuid, PK)   │
│ name       String                │
│ role       String   (job title)  │
│ department Department (enum)     │
│ bio        String   (Text)       │
│ imageUrl   String?               │
│ email      String?               │
│ order      Int      (sort order) │
│ createdAt  DateTime              │
│ updatedAt  DateTime              │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│             Product              │
├──────────────────────────────────┤
│ id               String (cuid)   │
│ slug             String (unique) │
│ name             String          │
│ category         String          │
│ shortDescription String (Text)   │
│ fullDescription  String (Text)   │
│ imageUrl         String?         │
│ features         Json            │
│ specs            Json            │
│ published        Boolean         │
│ order            Int             │
│ createdAt        DateTime        │
│ updatedAt        DateTime        │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│          InventoryItem           │
├──────────────────────────────────┤
│ id           Int  (autoincrement)│
│ name         String              │
│ category     String              │
│ status       ItemStatus (enum)   │
│ location     String              │
│ purchaseDate String              │
│ valueNok     Int                 │
│ createdAt    DateTime            │
│ updatedAt    DateTime            │
└──────────────────────────────────┘
```

### Enums

```prisma
enum Role {
  ADMIN   // Full access to all admin features
  EDITOR  // Limited access (future use)
}

enum Department {
  ENGINEERING
  DESIGN
  SALES
  MANAGEMENT
}

enum ItemStatus {
  AVAILABLE    // In stock at warehouse
  RENTED       // Currently loaned out
  MAINTENANCE  // Under service/repair
}
```

### JSON Field Structures

**Product.features** — array of strings:
```json
["ARM Cortex-A55 Quad-core", "Industrial temp range -40°C to +85°C", "5G / LTE-M / NB-IoT"]
```

**Product.specs** — array of label/value pairs:
```json
[
  { "label": "CPU", "value": "Quad-core 1.8 GHz" },
  { "label": "RAM", "value": "4 GB LPDDR4" },
  { "label": "Storage", "value": "32 GB eMMC" }
]
```

---

## 5. Application Routes

### Public Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero section, company stats, product preview, services |
| `/products` | Full product catalog with category filtering |
| `/team` | Employee directory with photos, titles, and bios |
| `/about` | Company history, mission, and values |
| `/services` | Service offerings overview |
| `/contact` | Contact form and office information |
| `/careers` | Open positions and hiring information |
| `/certifications` | Security and quality certifications |
| `/docs` | Developer documentation hub |
| `/docs/getting-started` | Onboarding guide for new developers |
| `/changelog` | Version history and release notes |
| `/support` | Support resources and ticket submission |

### Admin Pages (Authentication Required)

| Route | Description |
|---|---|
| `/admin` | Dashboard — live statistics + quick-action shortcuts |
| `/admin/login` | Email/password login form |
| `/admin/employees` | Employee list table with edit/delete actions |
| `/admin/employees/new` | Create new employee with photo upload |
| `/admin/employees/[id]/edit` | Edit existing employee record |
| `/admin/products` | Product list table with publish/unpublish toggle |
| `/admin/products/new` | Create new product with features and specs |
| `/admin/products/[id]/edit` | Edit existing product |
| `/admin/inventory` | Inventory item list with status management |
| `/admin/inventory/new` | Add new inventory item |
| `/admin/inventory/[id]/edit` | Edit inventory item details |

---

## 6. API Reference

### Authentication — NextAuth

**Endpoint:** `POST /api/auth/callback/credentials`  
**Rate limit:** 10 requests per IP per 15 minutes  
**Body:**
```json
{
  "email": "admin@nordic.local",
  "password": "admin123"
}
```
**Response (success):** Sets `next-auth.session-token` HTTP-only cookie  
**Response (failure):** `401 Unauthorized` with error message

---

### Image Upload

**Endpoint:** `POST /api/upload`  
**Authentication:** Required (valid session)  
**Rate limit:** 20 requests per minute per IP + 20 per minute per user  
**Content-Type:** `multipart/form-data`  

**Accepted MIME types:** `image/jpeg`, `image/png`, `image/webp`  
**Max file size:** 5 MB  

**Request:**
```
POST /api/upload
Content-Type: multipart/form-data

file: <binary image data>
```

**Response (success):**
```json
{
  "url": "/uploads/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg"
}
```

**Response (errors):**

| Status | Cause |
|---|---|
| `400` | No file, invalid MIME type, file too large |
| `401` | Not authenticated |
| `429` | Rate limit exceeded |
| `500` | Server-side write failure |

**Storage:** Files are saved to `public/uploads/` with UUID filenames to prevent path traversal and naming conflicts.

---

## 7. Directory Structure

```
site-proveaksemen/
│
├── app/                          # Next.js App Router root
│   ├── layout.tsx               # Root layout: <html>, Header, Footer, providers
│   ├── page.tsx                 # Homepage (/)
│   ├── globals.css              # Global CSS, Tailwind directives, CSS variables
│   │
│   ├── about/page.tsx           # /about
│   ├── careers/page.tsx         # /careers
│   ├── certifications/page.tsx  # /certifications
│   ├── changelog/page.tsx       # /changelog
│   ├── contact/page.tsx         # /contact
│   ├── docs/
│   │   ├── page.tsx             # /docs
│   │   └── getting-started/
│   │       └── page.tsx         # /docs/getting-started
│   ├── services/page.tsx        # /services
│   ├── support/page.tsx         # /support
│   │
│   ├── products/
│   │   ├── page.tsx             # /products (server component, fetches from DB)
│   │   └── ProductsGrid.tsx     # Client component (filtering, animation)
│   │
│   ├── team/
│   │   ├── page.tsx             # /team (server component)
│   │   └── TeamGrid.tsx         # Client component (search/filter)
│   │
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.ts         # NextAuth catch-all handler
│   │   └── upload/
│   │       └── route.ts         # Image upload endpoint
│   │
│   └── admin/
│       ├── layout.tsx           # Admin shell: sidebar, nav, logout button
│       ├── page.tsx             # /admin dashboard
│       ├── login/page.tsx       # /admin/login
│       │
│       ├── employees/
│       │   ├── page.tsx         # Employee list
│       │   ├── schema.ts        # Zod schema for employee form
│       │   ├── actions.ts       # Server actions: create, update, delete
│       │   ├── EmployeesTable.tsx
│       │   ├── new/page.tsx
│       │   └── [id]/edit/page.tsx
│       │
│       ├── products/
│       │   ├── page.tsx         # Product list
│       │   ├── schema.ts        # Zod schema for product form
│       │   ├── actions.ts       # Server actions: create, update, delete
│       │   ├── ProductsTable.tsx
│       │   ├── new/page.tsx
│       │   └── [id]/edit/page.tsx
│       │
│       └── inventory/
│           ├── page.tsx         # Inventory list
│           ├── schema.ts        # Zod schema for inventory form
│           ├── actions.ts       # Server actions: create, update, delete
│           ├── InventoryTable.tsx
│           ├── new/page.tsx
│           └── [id]/edit/page.tsx
│
├── components/
│   ├── ui/
│   │   └── button.tsx           # Shared button component
│   ├── layout/
│   │   ├── Header.tsx           # Top navigation bar
│   │   ├── Footer.tsx           # Site footer with links
│   │   ├── Logo.tsx             # SVG logo component
│   │   ├── ThemeProvider.tsx    # Dark/light mode context provider
│   │   ├── ThemeToggle.tsx      # Theme switch button
│   │   └── CookieConsent.tsx    # GDPR cookie banner
│   ├── sections/
│   │   ├── Hero.tsx             # Homepage hero section
│   │   ├── Stats.tsx            # Animated stat counters
│   │   ├── ProductsPreview.tsx  # Homepage product grid preview
│   │   ├── ServicesPreview.tsx  # Homepage services cards
│   │   └── CTA.tsx              # Call-to-action banner
│   └── admin/
│       ├── EmployeeForm.tsx     # Create/edit employee form
│       ├── ProductForm.tsx      # Create/edit product form
│       ├── InventoryForm.tsx    # Create/edit inventory form
│       └── ImageUpload.tsx      # Drag-and-drop image uploader
│
├── lib/
│   ├── prisma.ts                # Singleton Prisma client (prevents connection leaks)
│   ├── utils.ts                 # Shared utility functions (cn, formatters)
│   ├── rateLimit.ts             # In-memory rate limiter (Map-based sliding window)
│   └── data/
│       ├── types.ts             # Shared TypeScript interfaces
│       ├── company.ts           # Static company info (name, address, etc.)
│       ├── services.ts          # Static service definitions
│       └── inventory.ts        # Static inventory category definitions
│
├── prisma/
│   ├── schema.prisma            # Database schema (models, enums, relations)
│   ├── seed.js                  # Plain JS seed (used inside Docker container)
│   └── seed.ts                  # TypeScript seed (used locally with tsx)
│
├── public/
│   ├── uploads/                 # Runtime image uploads (Docker volume mounted here)
│   └── images/team/             # Static team photos (committed to repo)
│
├── auth.ts                      # NextAuth configuration (providers, callbacks)
├── auth.config.ts               # NextAuth authorized callback for edge compatibility
├── middleware.ts                # Edge middleware: auth guard + rate limit + security headers
├── next.config.js               # Next.js config (standalone, image domains, trusted hosts)
├── tailwind.config.ts           # Tailwind: dark mode, custom colors, font families
├── tsconfig.json                # TypeScript: strict mode, path aliases (@/ → root)
├── postcss.config.js            # PostCSS: Tailwind + Autoprefixer
├── Dockerfile                   # Multi-stage Docker build for Next.js
├── docker-compose.yml           # Services: postgres, app, nginx, certbot
├── entrypoint.sh                # Container startup: runs prisma db push before app start
├── nginx.conf                   # Nginx: reverse proxy, SSL, security headers, HTTP redirect
├── .env.example                 # Template for required environment variables
├── package.json                 # Dependencies and NPM scripts
├── README.md                    # This file
└── DEPLOY.md                    # Step-by-step production deployment guide
```

---

## 8. Security Implementation

### Authentication & Authorization

| Layer | Mechanism |
|---|---|
| **Password storage** | bcrypt with cost factor 10 — computationally expensive, resistant to brute force |
| **Session type** | JWT (stateless) — stored in an HTTP-only cookie, never accessible via JavaScript |
| **Route protection** | Edge Middleware intercepts every `/admin/*` request and redirects unauthenticated users to `/admin/login` |
| **Action guards** | Every Server Action and API route handler calls `auth()` before any database access |
| **Role model** | `ADMIN` and `EDITOR` roles defined; currently ADMIN-only access |

### Input Validation

All mutations follow a two-layer validation model:

```
User submits form
      │
      ▼
react-hook-form + Zod (client) ── Immediate feedback, UX only
      │
      ▼ (form submitted via Server Action)
Zod schema (server) ── Authoritative — cannot be bypassed
      │
      ▼
Prisma query with typed parameters ── No raw SQL, no injection risk
```

### Rate Limiting

| Endpoint | Limit | Window | Scope |
|---|---|---|---|
| `POST /api/auth/callback/credentials` | 10 requests | 15 minutes | Per IP |
| `POST /api/upload` | 20 requests | 1 minute | Per IP |
| `POST /api/upload` | 20 requests | 1 minute | Per authenticated user |

Implementation: sliding window counter using an in-memory `Map`. Suitable for single-instance deployments; for multi-process or multi-node setups, replace with a Redis-backed solution (e.g. `@upstash/ratelimit`).

### HTTP Security Headers

Applied to every response by Edge Middleware:

| Header | Value | Purpose |
|---|---|---|
| `X-Frame-Options` | `DENY` | Prevents clickjacking via iframes |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer data leakage |

Additional headers set by Nginx in production:

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=31536000` (HSTS — enforces HTTPS for 1 year) |

### File Upload Security

| Check | Implementation |
|---|---|
| **MIME type allowlist** | Only `image/jpeg`, `image/png`, `image/webp` accepted |
| **File size limit** | 5 MB hard limit enforced server-side |
| **Safe filenames** | UUID v4 filenames — prevents path traversal and filename conflicts |
| **Storage isolation** | Uploads go to `/public/uploads/`, not accessible to the server runtime |

### Infrastructure Security

| Measure | Details |
|---|---|
| **Database isolation** | PostgreSQL port 5432 is NOT exposed outside the Docker network |
| **Non-root Docker user** | App container runs as `nextjs:nodejs` (uid 1001) |
| **Secret management** | All secrets in `.env` (gitignored); `.env.example` contains only placeholders |
| **TLS everywhere** | Nginx terminates SSL; all HTTP traffic redirected to HTTPS |
| **Auto certificate renewal** | Certbot container checks every 12 hours |

### Known Gaps (Recommended Before Production)

| Gap | Recommended Solution |
|---|---|
| In-memory rate limiter doesn't scale | Replace with `@upstash/ratelimit` (Redis-backed, edge-compatible) |
| No audit log | Add `AuditLog` Prisma model or integrate Axiom/Datadog |
| No Content Security Policy | Add `Content-Security-Policy` header starting with `default-src 'self'` |
| No database connection pooling | Use Prisma Accelerate or PgBouncer in front of PostgreSQL |
| Image storage not cloud-backed | Migrate to AWS S3 / Cloudflare R2 for multi-host resilience |

---

## 9. Quick Start — Local Development

### Prerequisites

- **Node.js** 20 or higher (`node -v` to check)
- **Docker Desktop** (for the local PostgreSQL container)
- **npm** (comes with Node.js)

### Step 1 — Clone and Install

```bash
git clone <repo-url> nordic-devices
cd nordic-devices
npm install
```

### Step 2 — Environment Configuration

```bash
cp .env.example .env
```

Open `.env` and fill in the values:

```env
# Database connection
DATABASE_URL="postgresql://nordic:nordic_dev_password@localhost:5432/nordic_devices?schema=public"
POSTGRES_USER=nordic
POSTGRES_PASSWORD=nordic_dev_password
POSTGRES_DB=nordic_devices

# NextAuth — generate with: openssl rand -base64 32
AUTH_SECRET="your-random-secret-here"

# URL where the app runs (for NextAuth redirects)
NEXTAUTH_URL="http://localhost:3000"
```

### Step 3 — Start the Database

```bash
npm run db:up       # Starts postgres:16-alpine in Docker
npm run db:migrate  # Applies all Prisma migrations
npm run db:seed     # Creates admin user + demo employees + inventory
```

### Step 4 — Run the Development Server

```bash
npm run dev
```

| URL | Purpose |
|---|---|
| `http://localhost:3000` | Public website |
| `http://localhost:3000/admin` | Admin panel |
| `http://localhost:5555` | Prisma Studio (after `npm run db:studio`) |

### Default Admin Credentials

| Field | Value |
|---|---|
| Email | `admin@nordic.local` |
| Password | `admin123` |

> These are seeded for local development only. Change them immediately in any shared or production environment.

---

## 10. Docker Deployment

Build and run all services with a single command:

```bash
docker compose up -d --build
```

This starts four services defined in `docker-compose.yml`:

| Service | Image | Role |
|---|---|---|
| `postgres` | `postgres:16-alpine` | Primary database |
| `app` | Custom (Dockerfile) | Next.js application |
| `nginx` | `nginx:alpine` | Reverse proxy + SSL |
| `certbot` | `certbot/certbot` | SSL certificate management |

After first startup, run the seed:

```bash
docker compose exec app node node_modules/.bin/prisma db seed
```

### Docker Build Details

The `Dockerfile` uses a **multi-stage build** to minimize the final image size:

```
Stage 1 (deps)     — installs all npm dependencies
Stage 2 (builder)  — runs prisma generate + next build
Stage 3 (runner)   — copies only the standalone output + public assets
                     runs as non-root user nextjs:nodejs (uid 1001)
```

The `entrypoint.sh` script runs **`prisma db push`** before starting the app on every container launch, ensuring the database schema stays synchronized with the Prisma schema after any update.

### Useful Docker Commands

```bash
# View live logs from the app
docker compose logs -f app

# Restart app without rebuild
docker compose restart app

# Rebuild and restart app only
docker compose up -d --build app

# Open a PostgreSQL shell
docker compose exec postgres psql -U nordic -d nordic_devices

# Stop all services
docker compose down

# Stop all services AND delete database (destructive)
docker compose down -v
```

---

## 11. Production Deployment

See [DEPLOY.md](DEPLOY.md) for the complete step-by-step guide. Summary:

1. Provision a Linux server (Ubuntu 22.04 recommended) with ports 80 and 443 open
2. Install Docker and Docker Compose
3. Clone the repository
4. Configure `.env` with production secrets
5. Set your domain name in `nginx.conf`
6. Issue a TLS certificate via Let's Encrypt / Certbot
7. Start all services: `docker compose up -d --build`
8. Seed the database once: `docker compose exec app node node_modules/.bin/prisma db seed`
9. Change the default admin password immediately

### Updating the Application

```bash
git pull
docker compose up -d --build app
# Schema changes are applied automatically via entrypoint.sh
```

---

## 12. Environment Variables

| Variable | Required | Description | Example |
|---|---|---|---|
| `DATABASE_URL` | Yes | Full PostgreSQL connection string | `postgresql://nordic:pass@localhost:5432/nordic_devices` |
| `POSTGRES_USER` | Yes | PostgreSQL username (Docker Compose) | `nordic` |
| `POSTGRES_PASSWORD` | Yes | PostgreSQL password (Docker Compose) | `strong_password_here` |
| `POSTGRES_DB` | Yes | PostgreSQL database name | `nordic_devices` |
| `AUTH_SECRET` | Yes | Random secret for NextAuth JWT signing | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Yes | Full URL where the app is accessible | `https://your-domain.com` |

Generate a secure `AUTH_SECRET`:
```bash
openssl rand -base64 32
```

---

## 13. Admin Panel Guide

### Dashboard (`/admin`)

Shows live statistics pulled from the database:
- Total employee count
- Total product count
- Published product count

Also displays quick-action buttons for creating employees, products, and inventory items.

### Employee Management (`/admin/employees`)

| Action | Description |
|---|---|
| **List** | Table with name, role, department, and action buttons |
| **Create** | Form with name, role, department (select), bio (textarea), photo upload, email, display order |
| **Edit** | Same form pre-filled with existing data |
| **Delete** | Confirmation prompt → server action → database deletion + redirect |

**Photo upload:** JPEG/PNG/WebP up to 5 MB. Stored in `public/uploads/` and referenced in the database as `/uploads/<uuid>.ext`.

### Product Management (`/admin/products`)

| Field | Type | Notes |
|---|---|---|
| Name | Text | Product display name |
| Slug | Text | URL-safe unique identifier (e.g. `nd-gateway-pro-5g`) |
| Category | Text | Gateways, Compute Modules, Power Management, etc. |
| Short Description | Textarea | Used in product grid cards |
| Full Description | Textarea | Used on the product detail page |
| Features | Dynamic list | Bullet points highlighting key capabilities |
| Specs | Dynamic pairs | Label + value specification table |
| Published | Toggle | Controls visibility on the public `/products` page |
| Display Order | Number | Lower numbers appear first |

### Inventory Management (`/admin/inventory`)

Tracks physical equipment (laptops, network gear, servers):

| Field | Options |
|---|---|
| Category | PC, Stasjonær PC, Nettverk, Tilbehør, Utvikling, Server |
| Status | Available, Rented, Under Maintenance |
| Location | Lager Hamar, Serviceverksted, Kunde - Oslo, etc. |
| Value | Stored in NOK (Norwegian kroner) |

### Changing the Admin Password

Connect via Prisma Studio (`npm run db:studio`) or generate a new hash and update directly:

```bash
# Generate bcrypt hash for new password
node -e "const b=require('bcryptjs'); b.hash('NewPassword123',10).then(console.log)"
```

Then update the `password` field in the `User` table via Prisma Studio.

---

## 14. NPM Scripts Reference

| Script | Command | Description |
|---|---|---|
| `dev` | `next dev` | Start development server with hot reload |
| `build` | `next build` | Compile TypeScript + build production bundle |
| `start` | `next start` | Start production server (requires prior `build`) |
| `lint` | `next lint` | Run ESLint with Next.js rules |
| `db:up` | `docker compose up -d postgres` | Start PostgreSQL container |
| `db:down` | `docker compose down` | Stop all containers |
| `db:migrate` | `prisma migrate dev` | Apply pending migrations + regenerate client |
| `db:seed` | `prisma db seed` | Run seed script (creates admin + demo data) |
| `db:reset` | `prisma migrate reset --force` | Drop DB, re-apply all migrations, re-seed |
| `db:studio` | `prisma studio` | Open Prisma Studio at localhost:5555 |

---

## 15. Development Workflow

### Adding a New Feature

1. **Database changes:** Edit `prisma/schema.prisma`, then run:
   ```bash
   npx prisma migrate dev --name describe_the_change
   ```
2. **Server actions:** Create or edit `app/admin/<feature>/actions.ts` — always call `auth()` at the top
3. **Validation:** Define a Zod schema in `app/admin/<feature>/schema.ts`
4. **UI:** Build the form in `components/admin/<Feature>Form.tsx` using react-hook-form
5. **Pages:** Wire up the form in `app/admin/<feature>/new/page.tsx` and `[id]/edit/page.tsx`

### Seed Data

The seed script (`prisma/seed.js`) creates:
- 1 admin user: `admin@nordic.local` / `admin123`
- 10 employees across Engineering, Design, Sales, and Management departments
- 8 inventory items: laptops, network equipment, accessories, a development board, and a NAS

Re-run the seed at any time (it uses `upsert` so it is safe to run multiple times):
```bash
npm run db:seed
```

### Type Safety

The project uses TypeScript in strict mode with the `@/` path alias mapping to the project root:

```ts
import { prisma } from "@/lib/prisma";
import { type Employee } from "@/lib/data/types";
```

Prisma generates TypeScript types automatically from the schema after each `prisma generate` (this runs automatically on `prisma migrate dev`).

---

*Built with Next.js 14, PostgreSQL, Prisma, and NextAuth v5.*
