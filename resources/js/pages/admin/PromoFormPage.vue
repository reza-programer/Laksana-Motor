<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <RouterLink to="/admin/promos" class="p-1.5 text-gray-muted hover:text-charcoal transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </RouterLink>
      <h1 class="text-2xl font-bold text-charcoal">{{ isEdit ? 'Edit Promo' : 'Tambah Promo' }}</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-lg border border-gray-border">
      <div class="p-6 space-y-5">
        <div>
          <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Judul Promo</label>
          <input v-model="form.title" type="text" required placeholder="Promo Akhir Bulan" class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Deskripsi</label>
          <textarea v-model="form.description" rows="3" placeholder="Deskripsi promo..." class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary resize-none"></textarea>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Tanggal Mulai</label>
            <input v-model="form.start_date" type="date" required class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Tanggal Selesai</label>
            <input v-model="form.end_date" type="date" required class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
        </div>
        <div class="flex items-center gap-3">
          <input v-model="form.is_active" type="checkbox" id="promo-active" class="w-4 h-4 rounded border-gray-border text-primary focus:ring-primary" />
          <label for="promo-active" class="text-sm text-charcoal">Aktifkan promo</label>
        </div>
        <!-- Banner Upload Placeholder -->
        <div>
          <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Banner</label>
          <div class="border-2 border-dashed border-gray-border rounded-lg p-6 text-center">
            <p class="text-sm text-gray-muted">Upload banner akan tersedia setelah backend selesai</p>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-border bg-gray-bg/30">
        <RouterLink to="/admin/promos" class="px-4 py-2 text-sm text-gray-text hover:text-charcoal transition-colors">Batal</RouterLink>
        <button type="submit" :disabled="submitting" class="px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light disabled:opacity-50 transition-colors">
          {{ submitting ? 'Menyimpan...' : (isEdit ? 'Simpan' : 'Tambah Promo') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { fetchPromos, createPromo, updatePromo } from '@/services/api'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)
const submitting = ref(false)

const form = ref({
  title: '',
  description: '',
  start_date: '',
  end_date: '',
  is_active: true,
})

async function handleSubmit() {
  submitting.value = true
  try {
    if (isEdit.value) {
      await updatePromo(Number(route.params.id), form.value)
    } else {
      await createPromo(form.value)
    }
    router.push('/admin/promos')
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  if (isEdit.value) {
    const promos = await fetchPromos()
    const promo = promos.find(p => p.id === Number(route.params.id))
    if (promo) {
      form.value = {
        title: promo.title,
        description: promo.description,
        start_date: promo.start_date,
        end_date: promo.end_date,
        is_active: promo.is_active,
      }
    }
  }
})
</script>
