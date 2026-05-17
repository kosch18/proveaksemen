export interface TeamMember {
  id: string
  name: string
  role: string
  department: 'Engineering' | 'Design' | 'Sales' | 'Management'
  bio: string
  imageUrl: string
}

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: string
  shortDescription: string
  fullDescription: string
  specs: ProductSpec[]
  imageUrl: string
  features: string[]
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export interface CompanyStats {
  label: string
  value: string
}

export interface CompanyContact {
  address: string
  city: string
  country: string
  email: string
  phone: string
  mapUrl: string
}

export interface CompanyMilestone {
  year: number
  event: string
}

export interface InventoryItem {
  id: number
  name: string
  category: string
  status: 'available' | 'rented' | 'maintenance'
  location: string
  purchase_date: string
  value_nok: number
}

export interface CompanyData {
  name: string
  tagline: string
  founded: number
  headquarters: string
  mission: string
  vision: string
  description: string
  stats: CompanyStats[]
  history: CompanyMilestone[]
  contact: CompanyContact
  socials: {
    linkedin: string
    github: string
    twitter: string
  }
}
