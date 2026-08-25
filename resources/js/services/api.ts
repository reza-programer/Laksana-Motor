import type { Motor, MotorFilter, Promo, Testimonial } from '@/types'
import { mockMotors, mockPromos, mockTestimonials } from './mockData'

// Simulate API delay
function delay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ─── Motors ──────────────────────────────────────────────

export async function fetchMotors(
  filters?: Partial<MotorFilter>,
  page: number = 1,
  perPage: number = 9
): Promise<{ data: Motor[]; total: number; lastPage: number }> {
  await delay()

  let filtered = [...mockMotors]

  if (filters) {
    if (filters.search) {
      const q = filters.search.toLowerCase()
      filtered = filtered.filter(
        m =>
          m.name.toLowerCase().includes(q) ||
          m.brand.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      )
    }
    if (filters.brand) {
      filtered = filtered.filter(m => m.brand === filters.brand)
    }
    if (filters.minPrice != null) {
      filtered = filtered.filter(m => m.price >= filters.minPrice!)
    }
    if (filters.maxPrice != null) {
      filtered = filtered.filter(m => m.price <= filters.maxPrice!)
    }
    if (filters.minYear != null) {
      filtered = filtered.filter(m => m.year >= filters.minYear!)
    }
    if (filters.maxYear != null) {
      filtered = filtered.filter(m => m.year <= filters.maxYear!)
    }
    if (filters.minMileage != null) {
      filtered = filtered.filter(m => m.mileage >= filters.minMileage!)
    }
    if (filters.maxMileage != null) {
      filtered = filtered.filter(m => m.mileage <= filters.maxMileage!)
    }
    if (filters.transmission) {
      filtered = filtered.filter(m => m.transmission === filters.transmission)
    }
    if (filters.status) {
      filtered = filtered.filter(m => m.status === filters.status)
    }
  }

  const total = filtered.length
  const lastPage = Math.ceil(total / perPage)
  const start = (page - 1) * perPage
  const data = filtered.slice(start, start + perPage)

  return { data, total, lastPage }
}

export async function fetchMotor(id: number): Promise<Motor | null> {
  await delay()
  return mockMotors.find(m => m.id === id) || null
}

export async function fetchFeaturedMotors(): Promise<Motor[]> {
  await delay()
  return mockMotors.filter(m => m.is_featured && m.status !== 'Terjual')
}

export async function fetchMotorBrands(): Promise<string[]> {
  await delay()
  const brands = [...new Set(mockMotors.map(m => m.brand))]
  return brands.sort()
}

// ─── Admin Motor CRUD (mock) ────────────────────────────

export async function createMotor(data: Partial<Motor>): Promise<Motor> {
  await delay()
  const newMotor: Motor = {
    id: mockMotors.length + 1,
    brand: data.brand || '',
    name: data.name || '',
    year: data.year || new Date().getFullYear(),
    price: data.price || 0,
    mileage: data.mileage || 0,
    color: data.color || '',
    transmission: data.transmission || 'Otomatis',
    condition: data.condition || '',
    description: data.description || '',
    status: data.status || 'Tersedia',
    is_featured: data.is_featured || false,
    images: data.images || [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  mockMotors.push(newMotor)
  return newMotor
}

export async function updateMotor(id: number, data: Partial<Motor>): Promise<Motor | null> {
  await delay()
  const idx = mockMotors.findIndex(m => m.id === id)
  if (idx === -1) return null
  mockMotors[idx] = { ...mockMotors[idx], ...data, updated_at: new Date().toISOString() }
  return mockMotors[idx]
}

export async function deleteMotor(id: number): Promise<boolean> {
  await delay()
  const idx = mockMotors.findIndex(m => m.id === id)
  if (idx === -1) return false
  mockMotors.splice(idx, 1)
  return true
}

// ─── Promos ─────────────────────────────────────────────

export async function fetchPromos(activeOnly: boolean = false): Promise<Promo[]> {
  await delay()
  if (activeOnly) return mockPromos.filter(p => p.is_active)
  return [...mockPromos]
}

export async function createPromo(data: Partial<Promo>): Promise<Promo> {
  await delay()
  const newPromo: Promo = {
    id: mockPromos.length + 1,
    title: data.title || '',
    description: data.description || '',
    image: data.image || '',
    start_date: data.start_date || '',
    end_date: data.end_date || '',
    is_active: data.is_active ?? true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  mockPromos.push(newPromo)
  return newPromo
}

export async function updatePromo(id: number, data: Partial<Promo>): Promise<Promo | null> {
  await delay()
  const idx = mockPromos.findIndex(p => p.id === id)
  if (idx === -1) return null
  mockPromos[idx] = { ...mockPromos[idx], ...data, updated_at: new Date().toISOString() }
  return mockPromos[idx]
}

export async function deletePromo(id: number): Promise<boolean> {
  await delay()
  const idx = mockPromos.findIndex(p => p.id === id)
  if (idx === -1) return false
  mockPromos.splice(idx, 1)
  return true
}

// ─── Testimonials ───────────────────────────────────────

export async function fetchTestimonials(activeOnly: boolean = false): Promise<Testimonial[]> {
  await delay()
  if (activeOnly) return mockTestimonials.filter(t => t.is_active)
  return [...mockTestimonials]
}

export async function createTestimonial(data: Partial<Testimonial>): Promise<Testimonial> {
  await delay()
  const newTestimonial: Testimonial = {
    id: mockTestimonials.length + 1,
    name: data.name || '',
    motor: data.motor || '',
    content: data.content || '',
    image: data.image || '',
    is_active: data.is_active ?? true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  mockTestimonials.push(newTestimonial)
  return newTestimonial
}

export async function updateTestimonial(id: number, data: Partial<Testimonial>): Promise<Testimonial | null> {
  await delay()
  const idx = mockTestimonials.findIndex(t => t.id === id)
  if (idx === -1) return null
  mockTestimonials[idx] = { ...mockTestimonials[idx], ...data, updated_at: new Date().toISOString() }
  return mockTestimonials[idx]
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  await delay()
  const idx = mockTestimonials.findIndex(t => t.id === id)
  if (idx === -1) return false
  mockTestimonials.splice(idx, 1)
  return true
}

// ─── Helpers ────────────────────────────────────────────

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatMileage(km: number): string {
  return new Intl.NumberFormat('id-ID').format(km) + ' km'
}

export function generateWhatsAppUrl(motor?: Motor): string {
  const baseUrl = 'https://wa.me/6281234567890'
  if (!motor) {
    return `${baseUrl}?text=${encodeURIComponent('Halo Laksana Motor, saya ingin bertanya tentang stok motor yang tersedia.')}`
  }
  const message = `Halo Laksana Motor, saya tertarik dengan ${motor.brand} ${motor.name} tahun ${motor.year} dengan harga ${formatPrice(motor.price)}. Apakah unitnya masih tersedia?`
  return `${baseUrl}?text=${encodeURIComponent(message)}`
}

export function getPrimaryImage(motor: Motor): string {
  const primary = motor.images.find(img => img.is_primary)
  return primary?.image || motor.images[0]?.image || 'https://placehold.co/800x600/f5f5f4/a8a29e?text=No+Image'
}
