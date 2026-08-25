import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Testimonial } from '@/types'
import { fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '@/services/api'

export const useTestimonialStore = defineStore('testimonial', () => {
  const testimonials = ref<Testimonial[]>([])
  const loading = ref(false)

  async function loadTestimonials(activeOnly: boolean = false) {
    loading.value = true
    try {
      testimonials.value = await fetchTestimonials(activeOnly)
    } finally {
      loading.value = false
    }
  }

  async function addTestimonial(data: Partial<Testimonial>) {
    const newItem = await createTestimonial(data)
    testimonials.value.push(newItem)
    return newItem
  }

  async function editTestimonial(id: number, data: Partial<Testimonial>) {
    const updated = await updateTestimonial(id, data)
    if (updated) {
      const idx = testimonials.value.findIndex(t => t.id === id)
      if (idx !== -1) testimonials.value[idx] = updated
    }
    return updated
  }

  async function removeTestimonial(id: number) {
    const success = await deleteTestimonial(id)
    if (success) {
      testimonials.value = testimonials.value.filter(t => t.id !== id)
    }
    return success
  }

  return { testimonials, loading, loadTestimonials, addTestimonial, editTestimonial, removeTestimonial }
})
