export interface MotorImage {
  id: number
  motor_id: number
  image: string
  is_primary: boolean
}

export interface Motor {
  id: number
  brand: string
  name: string
  year: number
  price: number
  mileage: number
  color: string
  transmission: 'Manual' | 'Otomatis'
  condition: string
  description: string
  status: 'Tersedia' | 'Booking' | 'Terjual'
  is_featured: boolean
  images: MotorImage[]
  created_at: string
  updated_at: string
}

export interface Promo {
  id: number
  title: string
  description: string
  image: string
  start_date: string
  end_date: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: number
  name: string
  motor: string
  content: string
  image: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface MotorFilter {
  search: string
  brand: string
  minPrice: number | null
  maxPrice: number | null
  minYear: number | null
  maxYear: number | null
  minMileage: number | null
  maxMileage: number | null
  transmission: string
  status: string
}

export interface PaginationMeta {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
}

export interface AdminUser {
  id: number
  name: string
  email: string
}
