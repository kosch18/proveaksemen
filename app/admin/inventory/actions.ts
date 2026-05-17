'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { inventorySchema } from './schema'

type ActionResult = { success: true } | { success: false; error: string }

async function requireAuth() {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')
}

function revalidate() {
  revalidatePath('/products')
  revalidatePath('/admin/inventory')
}

function parseData(values: unknown) {
  const result = inventorySchema.safeParse(values)
  if (!result.success) {
    throw new Error(result.error.issues[0]?.message ?? 'Validation error')
  }
  return result.data
}

export async function createInventoryItem(values: unknown): Promise<ActionResult> {
  try {
    await requireAuth()
    const data = parseData(values)
    await prisma.inventoryItem.create({ data })
    revalidate()
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to create item' }
  }
}

export async function updateInventoryItem(id: number, values: unknown): Promise<ActionResult> {
  try {
    await requireAuth()
    const data = parseData(values)
    await prisma.inventoryItem.update({ where: { id }, data })
    revalidate()
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to update item' }
  }
}

export async function deleteInventoryItem(id: number): Promise<ActionResult> {
  try {
    await requireAuth()
    await prisma.inventoryItem.delete({ where: { id } })
    revalidate()
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to delete item' }
  }
}
