'use server'

import { revalidatePath } from 'next/cache'
import { Department } from '@prisma/client'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { employeeSchema, type EmployeeFormValues } from './schema'

type ActionResult = { success: true } | { success: false; error: string }

async function requireAuth() {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')
}

function revalidate() {
  revalidatePath('/team')
  revalidatePath('/admin/employees')
}

function parseData(values: unknown) {
  const result = employeeSchema.safeParse(values)
  if (!result.success) {
    throw new Error(result.error.issues[0]?.message ?? 'Validation error')
  }
  return result.data
}

function toDbShape(data: EmployeeFormValues) {
  return {
    name:       data.name,
    role:       data.role,
    department: data.department as Department,
    bio:        data.bio,
    email:      data.email || null,
    imageUrl:   data.imageUrl || null,
    order:      data.order,
  }
}

export async function createEmployee(values: unknown): Promise<ActionResult> {
  try {
    await requireAuth()
    const data = parseData(values)
    await prisma.employee.create({ data: toDbShape(data) })
    revalidate()
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to create employee' }
  }
}

export async function updateEmployee(id: string, values: unknown): Promise<ActionResult> {
  try {
    await requireAuth()
    const data = parseData(values)
    await prisma.employee.update({ where: { id }, data: toDbShape(data) })
    revalidate()
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to update employee' }
  }
}

export async function deleteEmployee(id: string): Promise<ActionResult> {
  try {
    await requireAuth()
    await prisma.employee.delete({ where: { id } })
    revalidate()
    return { success: true }
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to delete employee' }
  }
}
