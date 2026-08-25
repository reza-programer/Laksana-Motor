import type { Motor, MotorFilter, Promo, Testimonial } from '@/types'
import { WHATSAPP_NUMBER } from './mockData'

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
    console.error('Failed to fetch motors from API:', err)
  }

  return { data: [], total: 0, lastPage: 1 }
}

export async function fetchMotor(id: number): Promise<Motor | null> {
  try {
    const res = await fetch(`${API_BASE}/motors/${id}`)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.error('Failed to fetch motor by id:', err)
  }
  return null
}

export async function fetchFeaturedMotors(): Promise<Motor[]> {
  try {
    const res = await fetch(`${API_BASE}/motors/featured`)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.error('Failed to fetch featured motors:', err)
  }
  return []
}

export async function fetchMotorBrands(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE}/motors/brands`)
    if (res.ok) {
      return await res.json()
    }
  } catch (err) {
    console.error('Failed to fetch brands:', err)
  }
  return []
}

// ─── Admin Motor CRUD ────────────────────────────

export async function createMotor(data: Partial<Motor>): Promise<Motor | null> {
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
    console.error('Failed to create motor:', err)
  }
  return null
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
    console.error('Failed to update motor:', err)
  }
  return null
}

export async function deleteMotor(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/motors/${id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    })
    return res.ok
  } catch (err) {
    console.error('Failed to delete motor:', err)
    return false
  }
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
    console.error('Failed to fetch promos:', err)
  }
  return []
}

export async function createPromo(data: Partial<Promo>): Promise<Promo | null> {
  try {
    const res = await fetch(`${API_BASE}/promos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) return await res.json()
  } catch (err) {
    console.error('Failed to create promo:', err)
  }
  return null
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
    console.error('Failed to update promo:', err)
  }
  return null
}

export async function deletePromo(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/promos/${id}`, {
      method: 'DELETE',
    })
    return res.ok
  } catch (err) {
    console.error('Failed to delete promo:', err)
    return false
  }
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
    console.error('Failed to fetch testimonials:', err)
  }
  return []
}

export async function createTestimonial(data: Partial<Testimonial>): Promise<Testimonial | null> {
  try {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) return await res.json()
  } catch (err) {
    console.error('Failed to create testimonial:', err)
  }
  return null
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
    console.error('Failed to update testimonial:', err)
  }
  return null
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: 'DELETE',
    })
    return res.ok
  } catch (err) {
    console.error('Failed to delete testimonial:', err)
    return false
  }
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
