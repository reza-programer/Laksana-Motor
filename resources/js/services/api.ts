import type { Motor, MotorFilter, Promo, Testimonial } from '@/types'
import { mockMotors, mockPromos, mockTestimonials, WHATSAPP_NUMBER } from './mockData'

const API_BASE = '/api'

// ─── Motors ──────────────────────────────────────────────

export async function fetchMotors(
  filters?: Partial<MotorFilter>,
  page: number = 1,
  perPage: number = 9
): Promise<{ data: Motor[]; total: number; lastPage: number }> {
  try {
    const params = new URLSearchParams()
    if (filters?.search) params.append('search', filters.search)
    if (filters?.brand && filters.brand !== 'Semua') params.append('brand', filters.brand)
    if (filters?.status) params.append('status', filters.status)
    if (filters?.transmission) params.append('transmission', filters.transmission)
    if (filters?.minPrice != null) params.append('min_price', String(filters.minPrice))
    if (filters?.maxPrice != null) params.append('max_price', String(filters.maxPrice))
    if (filters?.minYear != null) params.append('min_year', String(filters.minYear))
    if (filters?.maxYear != null) params.append('max_year', String(filters.maxYear))
    if (filters?.minMileage != null) params.append('min_mileage', String(filters.minMileage))
    if (filters?.maxMileage != null) params.append('max_mileage', String(filters.maxMileage))
    params.append('page', String(page))
    params.append('per_page', String(perPage))

    const res = await fetch(`${API_BASE}/motors?${params.toString()}`)
    if (res.ok) {
      const json = await res.json()
      if (json.data && Array.isArray(json.data)) {
        return {
          data: json.data,
          total: json.total ?? json.data.length,
          lastPage: json.last_page ?? 1,
        }
      }
      if (Array.isArray(json)) {
        return { data: json, total: json.length, lastPage: 1 }
      }
    }
  } catch (err) {
    console.warn('API fallback to local data:', err)
  }

  // Fallback to local mockMotors
  let filtered = [...mockMotors]
  if (filters) {
    if (filters.search) {
      const q = filters.search.toLowerCase()
      filtered = filtered.filter(m => m.name.toLowerCase().includes(q) || m.brand.toLowerCase().includes(q))
    }
    if (filters.brand && filters.brand !== 'Semua') {
      filtered = filtered.filter(m => m.brand === filters.brand)
    }
    if (filters.status) {
      filtered = filtered.filter(m => m.status === filters.status)
    }
    if (filters.transmission) {
      filtered = filtered.filter(m => m.transmission === filters.transmission)
    }
    if (filters.minPrice != null) filtered = filtered.filter(m => m.price >= filters.minPrice!)
    if (filters.maxPrice != null) filtered = filtered.filter(m => m.price <= filters.maxPrice!)
    if (filters.minYear != null) filtered = filtered.filter(m => m.year >= filters.minYear!)
    if (filters.maxYear != null) filtered = filtered.filter(m => m.year <= filters.maxYear!)
  }
  const total = filtered.length
  const lastPage = Math.ceil(total / perPage) || 1
  const start = (page - 1) * perPage
  return { data: filtered.slice(start, start + perPage), total, lastPage }
}

export async function fetchMotor(id: number): Promise<Motor | null> {
  try {
    const res = await fetch(`${API_BASE}/motors/${id}`)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API fallback:', err)
  }
  return mockMotors.find(m => m.id === Number(id)) || null
}

export async function fetchFeaturedMotors(): Promise<Motor[]> {
  try {
    const res = await fetch(`${API_BASE}/motors/featured`)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API fallback:', err)
  }
  return mockMotors.filter(m => m.is_featured && m.status !== 'Terjual')
}

export async function fetchMotorBrands(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE}/motors/brands`)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API fallback:', err)
  }
  return [...new Set(mockMotors.map(m => m.brand))].sort()
}

// ─── Admin Motor CRUD ────────────────────────────

export async function createMotor(data: Partial<Motor>): Promise<Motor> {
  try {
    const res = await fetch(`${API_BASE}/motors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API create fallback:', err)
  }
  const newMotor: Motor = {
    id: Date.now(),
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
  mockMotors.unshift(newMotor)
  return newMotor
}

export async function updateMotor(id: number, data: Partial<Motor>): Promise<Motor | null> {
  try {
    const res = await fetch(`${API_BASE}/motors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API update fallback:', err)
  }
  const idx = mockMotors.findIndex(m => m.id === id)
  if (idx === -1) return null
  mockMotors[idx] = { ...mockMotors[idx], ...data, updated_at: new Date().toISOString() }
  return mockMotors[idx]
}

export async function deleteMotor(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/motors/${id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    })
    if (res.ok) {
      return true
    }
  } catch (err) {
    console.warn('API delete fallback:', err)
  }
  const idx = mockMotors.findIndex(m => m.id === id)
  if (idx === -1) return false
  mockMotors.splice(idx, 1)
  return true
}

// ─── Promos ─────────────────────────────────────────────

export async function fetchPromos(activeOnly: boolean = false): Promise<Promo[]> {
  try {
    const url = activeOnly ? `${API_BASE}/promos/active` : `${API_BASE}/promos`
    const res = await fetch(url)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API promo fallback:', err)
  }
  return activeOnly ? mockPromos.filter(p => p.is_active) : [...mockPromos]
}

export async function createPromo(data: Partial<Promo>): Promise<Promo> {
  try {
    const res = await fetch(`${API_BASE}/promos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) return await res.json()
  } catch (err) {
    console.warn('API promo create fallback:', err)
  }
  const newPromo: Promo = {
    id: Date.now(),
    title: data.title || '',
    description: data.description || '',
    image: data.image || '',
    start_date: data.start_date || '',
    end_date: data.end_date || '',
    is_active: data.is_active ?? true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  mockPromos.unshift(newPromo)
  return newPromo
}

export async function updatePromo(id: number, data: Partial<Promo>): Promise<Promo | null> {
  try {
    const res = await fetch(`${API_BASE}/promos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) return await res.json()
  } catch (err) {
    console.warn('API promo update fallback:', err)
  }
  const idx = mockPromos.findIndex(p => p.id === id)
  if (idx === -1) return null
  mockPromos[idx] = { ...mockPromos[idx], ...data, updated_at: new Date().toISOString() }
  return mockPromos[idx]
}

export async function deletePromo(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/promos/${id}`, {
      method: 'DELETE',
    })
    if (res.ok) return true
  } catch (err) {
    console.warn('API promo delete fallback:', err)
  }
  const idx = mockPromos.findIndex(p => p.id === id)
  if (idx === -1) return false
  mockPromos.splice(idx, 1)
  return true
}

// ─── Testimonials ───────────────────────────────────────

export async function fetchTestimonials(activeOnly: boolean = false): Promise<Testimonial[]> {
  try {
    const url = activeOnly ? `${API_BASE}/testimonials/active` : `${API_BASE}/testimonials`
    const res = await fetch(url)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.warn('API testimonials fallback:', err)
  }
  return activeOnly ? mockTestimonials.filter(t => t.is_active) : [...mockTestimonials]
}

export async function createTestimonial(data: Partial<Testimonial>): Promise<Testimonial> {
  try {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) return await res.json()
  } catch (err) {
    console.warn('API testi create fallback:', err)
  }
  const newT: Testimonial = {
    id: Date.now(),
    name: data.name || '',
    motor: data.motor || '',
    content: data.content || '',
    image: data.image || '',
    is_active: data.is_active ?? true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  mockTestimonials.unshift(newT)
  return newT
}

export async function updateTestimonial(id: number, data: Partial<Testimonial>): Promise<Testimonial | null> {
  try {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) return await res.json()
  } catch (err) {
    console.warn('API testi update fallback:', err)
  }
  const idx = mockTestimonials.findIndex(t => t.id === id)
  if (idx === -1) return null
  mockTestimonials[idx] = { ...mockTestimonials[idx], ...data, updated_at: new Date().toISOString() }
  return mockTestimonials[idx]
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: 'DELETE',
    })
    if (res.ok) return true
  } catch (err) {
    console.warn('API testi delete fallback:', err)
  }
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
  const baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`
  if (!motor) {
    return `${baseUrl}?text=${encodeURIComponent('Halo Laksana Motor, saya ingin bertanya tentang stok motor yang tersedia.')}`
  }
  const message = `Halo Laksana Motor, saya tertarik dengan ${motor.brand} ${motor.name} tahun ${motor.year} dengan harga ${formatPrice(motor.price)}. Apakah unitnya masih tersedia?`
  return `${baseUrl}?text=${encodeURIComponent(message)}`
}

export function getPrimaryImage(motor: Motor): string {
  if (!motor.images || !motor.images.length) {
    return 'https://placehold.co/800x600/f5f5f4/a8a29e?text=No+Image'
  }
  const primary = motor.images.find(img => img.is_primary)
  return primary?.image || motor.images[0]?.image || 'https://placehold.co/800x600/f5f5f4/a8a29e?text=No+Image'
}
