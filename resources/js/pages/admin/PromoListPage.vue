<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-charcoal">Kelola Promo</h1>
      <RouterLink
        to="/admin/promos/create"
        class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Promo
      </RouterLink>
    </div>

    <div class="bg-white rounded-lg border border-gray-border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-border bg-gray-bg/50">
              <th class="text-left px-4 py-3 font-semibold text-charcoal">Promo</th>
              <th class="text-left px-4 py-3 font-semibold text-charcoal hidden sm:table-cell">Periode</th>
              <th class="text-left px-4 py-3 font-semibold text-charcoal">Status</th>
              <th class="text-right px-4 py-3 font-semibold text-charcoal">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="promo in promos" :key="promo.id" class="border-b border-gray-border last:border-0 hover:bg-gray-bg/30 transition-colors">
              <td class="px-4 py-3">
                <p class="font-medium text-charcoal">{{ promo.title }}</p>
                <p class="text-xs text-gray-muted mt-0.5 line-clamp-1">{{ promo.description }}</p>
              </td>
              <td class="px-4 py-3 text-xs text-gray-text hidden sm:table-cell">
                {{ promo.start_date }} — {{ promo.end_date }}
              </td>
              <td class="px-4 py-3">
                <button @click="toggleActive(promo)" class="px-2 py-0.5 text-xs font-medium rounded" :class="promo.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-600'">
                  {{ promo.is_active ? 'Aktif' : 'Nonaktif' }}
                </button>
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-2">
                  <RouterLink :to="`/admin/promos/${promo.id}/edit`" class="px-2.5 py-1 text-xs font-medium text-primary border border-primary/30 rounded hover:bg-primary-50 transition-colors">
                    Edit
                  </RouterLink>
                  <button @click="handleDelete(promo.id)" class="px-2.5 py-1 text-xs font-medium text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors">
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!promos.length" class="p-8 text-center text-gray-muted text-sm">Belum ada promo.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import type { Promo } from '@/types'
import { fetchPromos, updatePromo, deletePromo } from '@/services/api'

const promos = ref<Promo[]>([])

async function toggleActive(promo: Promo) {
  promo.is_active = !promo.is_active
  await updatePromo(promo.id, { is_active: promo.is_active })
}

async function handleDelete(id: number) {
  if (confirm('Yakin ingin menghapus promo ini?')) {
    await deletePromo(id)
    promos.value = promos.value.filter(p => p.id !== id)
  }
}

onMounted(async () => {
  promos.value = await fetchPromos()
})
</script>
