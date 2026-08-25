import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Motor, MotorFilter } from '@/types'
import { fetchMotors, fetchMotor, fetchFeaturedMotors, fetchMotorBrands, createMotor, updateMotor, deleteMotor } from '@/services/api'

export const useMotorStore = defineStore('motor', () => {
  // State
  const motors = ref<Motor[]>([])
  const currentMotor = ref<Motor | null>(null)
  const featuredMotors = ref<Motor[]>([])
  const brands = ref<string[]>([])
  const loading = ref(false)
  const totalMotors = ref(0)
  const currentPage = ref(1)
  const lastPage = ref(1)
  const perPage = ref(9)

  const filters = ref<MotorFilter>({
    search: '',
    brand: '',
    minPrice: null,
    maxPrice: null,
    minYear: null,
    maxYear: null,
    minMileage: null,
    maxMileage: null,
    transmission: '',
    status: '',
  })

  // Getters
  const hasFilters = computed(() => {
    return (
      filters.value.search !== '' ||
      filters.value.brand !== '' ||
      filters.value.minPrice != null ||
      filters.value.maxPrice != null ||
      filters.value.minYear != null ||
      filters.value.maxYear != null ||
      filters.value.transmission !== '' ||
      filters.value.status !== ''
    )
  })

  // Actions
  async function loadMotors(page: number = 1) {
    loading.value = true
    try {
      const result = await fetchMotors(filters.value, page, perPage.value)
      motors.value = result.data
      totalMotors.value = result.total
      lastPage.value = result.lastPage
      currentPage.value = page
    } finally {
      loading.value = false
    }
  }

  async function loadMotor(id: number) {
    loading.value = true
    try {
      currentMotor.value = await fetchMotor(id)
    } finally {
      loading.value = false
    }
  }

  async function loadFeatured() {
    featuredMotors.value = await fetchFeaturedMotors()
  }

  async function loadBrands() {
    brands.value = await fetchMotorBrands()
  }

  function resetFilters() {
    filters.value = {
      search: '',
      brand: '',
      minPrice: null,
      maxPrice: null,
      minYear: null,
      maxYear: null,
      minMileage: null,
      maxMileage: null,
      transmission: '',
      status: '',
    }
  }

  async function addMotor(data: Partial<Motor>) {
    return await createMotor(data)
  }

  async function editMotor(id: number, data: Partial<Motor>) {
    return await updateMotor(id, data)
  }

  async function removeMotor(id: number) {
    return await deleteMotor(id)
  }

  return {
    motors,
    currentMotor,
    featuredMotors,
    brands,
    loading,
    totalMotors,
    currentPage,
    lastPage,
    perPage,
    filters,
    hasFilters,
    loadMotors,
    loadMotor,
    loadFeatured,
    loadBrands,
    resetFilters,
    addMotor,
    editMotor,
    removeMotor,
  }
})
