import { z } from 'zod'

export const DEPARTMENTS = [
  { value: 'ENGINEERING', label: 'Engineering' },
  { value: 'DESIGN',      label: 'Design' },
  { value: 'SALES',       label: 'Sales' },
  { value: 'MANAGEMENT',  label: 'Management' },
] as const

export const departmentValues = DEPARTMENTS.map((d) => d.value) as [string, ...string[]]

export const employeeSchema = z.object({
  name:       z.string().min(1, 'Name is required'),
  role:       z.string().min(1, 'Role is required'),
  department: z.enum(['ENGINEERING', 'DESIGN', 'SALES', 'MANAGEMENT']),
  bio:        z.string().min(1, 'Bio is required'),
  email:      z.string().email('Invalid email').or(z.literal('')).optional(),
  imageUrl:   z.string().optional(),
  order:      z.number().int().min(0),
})

export type EmployeeFormValues = z.infer<typeof employeeSchema>
