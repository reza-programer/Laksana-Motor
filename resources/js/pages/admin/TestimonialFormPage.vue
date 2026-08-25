<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <RouterLink to="/admin/testimonials" class="p-1.5 text-gray-muted hover:text-charcoal transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </RouterLink>
      <h1 class="text-2xl font-bold text-charcoal">{{ isEdit ? 'Edit Testimoni' : 'Tambah Testimoni' }}</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-lg border border-gray-border">
      <div class="p-6 space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Nama Customer</label>
            <input v-model="form.name" type="text" required placeholder="Budi Santoso" class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Motor yang Dibeli</label>
            <input v-model="form.motor" type="text" required placeholder="Honda Vario 125 2022" class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Testimoni</label>
          <textarea v-model="form.content" rows="4" required placeholder="Isi testimoni customer..." class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary resize-none"></textarea>
        </div>
        <div class="flex items-center gap-3">
          <input v-model="form.is_active" type="checkbox" id="testi-active" class="w-4 h-4 rounded border-gray-border text-primary focus:ring-primary" />
          <label for="testi-active" class="text-sm text-charcoal">Tampilkan di website</label>
        </div>
        <!-- Photo Upload Placeholder -->
        <div>
          <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Foto Customer</label>
          <div class="border-2 border-dashed border-gray-border rounded-lg p-6 text-center">
            <p class="text-sm text-gray-muted">Upload foto akan tersedia setelah backend selesai</p>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-border bg-gray-bg/30">
        <RouterLink to="/admin/testimonials" class="px-4 py-2 text-sm text-gray-text hover:text-charcoal transition-colors">Batal</RouterLink>
        <button type="submit" :disabled="submitting" class="px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light disabled:opacity-50 transition-colors">
          {{ submitting ? 'Menyimpan...' : (isEdit ? 'Simpan' : 'Tambah Testimoni') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { fetchTestimonials, createTestimonial, updateTestimonial } from '@/services/api'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)
const submitting = ref(false)

const form = ref({
  name: '',
  motor: '',
  content: '',
  is_active: true,
})

async function handleSubmit() {
  submitting.value = true
  try {
    if (isEdit.value) {
      await updateTestimonial(Number(route.params.id), form.value)
    } else {
      await createTestimonial(form.value)
    }
    router.push('/admin/testimonials')
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  if (isEdit.value) {
    const testimonials = await fetchTestimonials()
    const t = testimonials.find(t => t.id === Number(route.params.id))
    if (t) {
      form.value = {
        name: t.name,
        motor: t.motor,
        content: t.content,
        is_active: t.is_active,
      }
    }
  }
})
</script>
