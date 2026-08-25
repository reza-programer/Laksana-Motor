import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Promo } from '@/types'
import { fetchPromos, createPromo, updatePromo, deletePromo } from '@/services/api'

export const usePromoStore = defineStore('promo', () => {
  const promos = ref<Promo[]>([])
  const loading = ref(false)

  async function loadPromos(activeOnly: boolean = false) {
    loading.value = true
    try {
      promos.value = await fetchPromos(activeOnly)
    } finally {
      loading.value = false
    }
  }

  async function addPromo(data: Partial<Promo>) {
    const newPromo = await createPromo(data)
    promos.value.push(newPromo)
    return newPromo
  }

  async function editPromo(id: number, data: Partial<Promo>) {
    const updated = await updatePromo(id, data)
    if (updated) {
      const idx = promos.value.findIndex(p => p.id === id)
      if (idx !== -1) promos.value[idx] = updated
    }
    return updated
  }

  async function removePromo(id: number) {
    const success = await deletePromo(id)
    if (success) {
      promos.value = promos.value.filter(p => p.id !== id)
    }
    return success
  }

  return { promos, loading, loadPromos, addPromo, editPromo, removePromo }
})
