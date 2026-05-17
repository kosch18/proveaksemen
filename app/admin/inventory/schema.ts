import { z } from 'zod'

export const STATUSES = [
  { value: 'AVAILABLE',   label: 'Available' },
  { value: 'RENTED',      label: 'Rented' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
] as const

export const CATEGORIES = [
  'PC',
  'Stasjonær PC',
  'Nettverk',
  'Tilbehør',
  'Utvikling',
  'Server',
]

export const inventorySchema = z.object({
  name:         z.string().min(1, 'Name is required'),
  category:     z.string().min(1, 'Category is required'),
  status:       z.enum(['AVAILABLE', 'RENTED', 'MAINTENANCE']),
  location:     z.string().min(1, 'Location is required'),
  purchaseDate: z.string().min(1, 'Purchase date is required'),
  valueNok:     z.number().int().min(0, 'Value must be 0 or more'),
})

export type InventoryFormValues = z.infer<typeof inventorySchema>
