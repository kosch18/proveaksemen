import type { Employee, Product as DbProduct } from '@prisma/client'
import type { TeamMember, Product, ProductSpec } from '@/lib/data/types'

// ─── Department enum (Prisma uppercase → app title-case) ─────────────────────

const DEPT = {
  ENGINEERING: 'Engineering',
  DESIGN:      'Design',
  SALES:       'Sales',
  MANAGEMENT:  'Management',
} as const satisfies Record<string, TeamMember['department']>

// ─── Mappers ──────────────────────────────────────────────────────────────────

export function mapEmployee(e: Employee): TeamMember {
  return {
    id:         e.id,
    name:       e.name,
    role:       e.role,
    department: DEPT[e.department],
    bio:        e.bio,
    imageUrl:   e.imageUrl ?? '',
  }
}

export function mapProduct(p: DbProduct): Product {
  return {
    id:               p.id,
    slug:             p.slug,
    name:             p.name,
    category:         p.category,
    shortDescription: p.shortDescription,
    fullDescription:  p.fullDescription,
    imageUrl:         p.imageUrl ?? '',
    features:         p.features as unknown as string[],
    specs:            p.specs as unknown as ProductSpec[],
  }
}
