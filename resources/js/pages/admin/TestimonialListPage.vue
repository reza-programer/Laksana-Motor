<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-charcoal">Kelola Testimoni</h1>
      <RouterLink
        to="/admin/testimonials/create"
        class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Testimoni
      </RouterLink>
    </div>

    <div class="bg-white rounded-lg border border-gray-border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-border bg-gray-bg/50">
              <th class="text-left px-4 py-3 font-semibold text-charcoal">Customer</th>
              <th class="text-left px-4 py-3 font-semibold text-charcoal hidden sm:table-cell">Motor</th>
              <th class="text-left px-4 py-3 font-semibold text-charcoal hidden md:table-cell">Testimoni</th>
              <th class="text-left px-4 py-3 font-semibold text-charcoal">Status</th>
              <th class="text-right px-4 py-3 font-semibold text-charcoal">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in testimonials" :key="t.id" class="border-b border-gray-border last:border-0 hover:bg-gray-bg/30 transition-colors">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-gray-bg overflow-hidden shrink-0">
                    <img :src="t.image" :alt="t.name" class="w-full h-full object-cover" />
                  </div>
                  <span class="font-medium text-charcoal">{{ t.name }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-gray-text hidden sm:table-cell">{{ t.motor }}</td>
              <td class="px-4 py-3 text-gray-text hidden md:table-cell">
                <span class="line-clamp-1">{{ t.content }}</span>
              </td>
              <td class="px-4 py-3">
                <button @click="toggleActive(t)" class="px-2 py-0.5 text-xs font-medium rounded" :class="t.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-600'">
                  {{ t.is_active ? 'Aktif' : 'Nonaktif' }}
                </button>
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-2">
                  <RouterLink :to="`/admin/testimonials/${t.id}/edit`" class="px-2.5 py-1 text-xs font-medium text-primary border border-primary/30 rounded hover:bg-primary-50 transition-colors">
                    Edit
                  </RouterLink>
                  <button @click="handleDelete(t.id)" class="px-2.5 py-1 text-xs font-medium text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors">
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!testimonials.length" class="p-8 text-center text-gray-muted text-sm">Belum ada testimoni.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import type { Testimonial } from '@/types'
import { fetchTestimonials, updateTestimonial, deleteTestimonial } from '@/services/api'

const testimonials = ref<Testimonial[]>([])

async function toggleActive(t: Testimonial) {
  t.is_active = !t.is_active
  await updateTestimonial(t.id, { is_active: t.is_active })
}

async function handleDelete(id: number) {
  if (confirm('Yakin ingin menghapus testimoni ini?')) {
    await deleteTestimonial(id)
    testimonials.value = testimonials.value.filter(t => t.id !== id)
  }
}

onMounted(async () => {
  testimonials.value = await fetchTestimonials()
})
</script>
