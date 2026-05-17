import { z } from 'zod'

export const PRODUCT_CATEGORIES = [
  'Gateways',
  'Compute Modules',
  'Power Management',
  'Sensors & Monitors',
  'HMI & Displays',
  'I/O Modules',
] as const

export const productSpecSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  value: z.string().min(1, 'Value is required'),
})

export const productSchema = z.object({
  slug:             z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Lowercase letters, digits and dashes only'),
  name:             z.string().min(1, 'Name is required'),
  category:         z.string().min(1, 'Category is required'),
  shortDescription: z.string().min(1, 'Short description is required'),
  fullDescription:  z.string().min(1, 'Full description is required'),
  imageUrl:         z.string().optional(),
  features:         z.array(z.string().min(1)),
  specs:            z.array(productSpecSchema),
  published:        z.boolean(),
  order:            z.number().int().min(0),
})

export type ProductFormValues = z.infer<typeof productSchema>
