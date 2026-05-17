'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { productSchema, type ProductFormValues } from './schema'

type ActionResult = { success: true } | { success: false; error: string }

async function requireAuth() {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')
}

function revalidate() {
  revalidatePath('/products')
  revalidatePath('/admin/products')
  revalidatePath('/admin')
}

function parseData(values: unknown) {
  const result = productSchema.safeParse(values)
  if (!result.success) {
    throw new Error(result.error.issues[0]?.message ?? 'Validation error')
  }
  return result.data
}

function toDbShape(data: ProductFormValues) {
  return {
    slug:             data.slug,
    name:             data.name,
    category:         data.category,
    shortDescription: data.shortDescription,
    fullDescription:  data.fullDescription,
    imageUrl:         data.imageUrl || null,
    features:         data.features,
    specs:            data.specs,
    published:        data.published,
    order:            data.order,
  }
}

export async function createProduct(values: unknown): Promise<ActionResult> {
  try {
    await requireAuth()
    const data = parseData(values)
    await prisma.product.create({ data: toDbShape(data) })
    revalidate()
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to create product' }
  }
}

export async function updateProduct(id: string, values: unknown): Promise<ActionResult> {
  try {
    await requireAuth()
    const data = parseData(values)
    await prisma.product.update({ where: { id }, data: toDbShape(data) })
    revalidate()
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to update product' }
  }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  try {
    await requireAuth()
    await prisma.product.delete({ where: { id } })
    revalidate()
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to delete product' }
  }
}
