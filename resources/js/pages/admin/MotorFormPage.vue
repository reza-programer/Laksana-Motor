<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <RouterLink to="/admin/motors" class="p-1.5 text-gray-muted hover:text-charcoal transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </RouterLink>
      <h1 class="text-2xl font-bold text-charcoal">{{ isEdit ? 'Edit Motor' : 'Tambah Motor' }}</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-lg border border-gray-border">
      <div class="p-6 space-y-5">
        <!-- Brand & Name -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Merek</label>
            <input v-model="form.brand" type="text" required placeholder="Honda" class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Nama / Tipe</label>
            <input v-model="form.name" type="text" required placeholder="Beat CBS 2022" class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
        </div>

        <!-- Year, Price, Mileage -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Tahun</label>
            <input v-model.number="form.year" type="number" required class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Harga (Rp)</label>
            <input v-model.number="form.price" type="number" required class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Kilometer</label>
            <input v-model.number="form.mileage" type="number" required class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
        </div>

        <!-- Color, Transmission, Status -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Warna</label>
            <input v-model="form.color" type="text" required placeholder="Merah" class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Transmisi</label>
            <select v-model="form.transmission" class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary">
              <option value="Otomatis">Otomatis</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Status</label>
            <select v-model="form.status" class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary">
              <option value="Tersedia">Tersedia</option>
              <option value="Booking">Booking</option>
              <option value="Terjual">Terjual</option>
            </select>
          </div>
        </div>

        <!-- Condition -->
        <div>
          <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Kondisi (singkat)</label>
          <input v-model="form.condition" type="text" placeholder="Mulus, body ori, mesin halus..." class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary" />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Deskripsi Lengkap</label>
          <textarea v-model="form.description" rows="4" placeholder="Deskripsi lengkap motor..." class="w-full px-3 py-2.5 border border-gray-border rounded-lg text-sm focus:outline-none focus:border-primary resize-none"></textarea>
        </div>

        <!-- Featured -->
        <div class="flex items-center gap-3">
          <input v-model="form.is_featured" type="checkbox" id="featured" class="w-4 h-4 rounded border-gray-border text-primary focus:ring-primary" />
          <label for="featured" class="text-sm text-charcoal">Tampilkan sebagai motor unggulan</label>
        </div>

        <!-- Image Upload Placeholder -->
        <div>
          <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Foto Motor</label>
          <div class="border-2 border-dashed border-gray-border rounded-lg p-8 text-center">
            <svg class="w-10 h-10 mx-auto text-gray-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-sm text-gray-muted">Upload foto akan tersedia setelah backend selesai</p>
            <p class="text-xs text-gray-muted mt-1">Saat ini menggunakan placeholder images</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-border bg-gray-bg/30">
        <RouterLink to="/admin/motors" class="px-4 py-2 text-sm text-gray-text hover:text-charcoal transition-colors">
          Batal
        </RouterLink>
        <button
          type="submit"
          :disabled="submitting"
          class="px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light disabled:opacity-50 transition-colors"
        >
          {{ submitting ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Motor') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { fetchMotor, createMotor, updateMotor } from '@/services/api'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)
const submitting = ref(false)

const form = ref({
  brand: '',
  name: '',
  year: new Date().getFullYear(),
  price: 0,
  mileage: 0,
  color: '',
  transmission: 'Otomatis' as 'Otomatis' | 'Manual',
  condition: '',
  description: '',
  status: 'Tersedia' as 'Tersedia' | 'Booking' | 'Terjual',
  is_featured: false,
})

async function handleSubmit() {
  submitting.value = true
  try {
    if (isEdit.value) {
      await updateMotor(Number(route.params.id), form.value)
    } else {
      await createMotor(form.value)
    }
    router.push('/admin/motors')
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  if (isEdit.value) {
    const motor = await fetchMotor(Number(route.params.id))
    if (motor) {
      form.value = {
        brand: motor.brand,
        name: motor.name,
        year: motor.year,
        price: motor.price,
        mileage: motor.mileage,
        color: motor.color,
        transmission: motor.transmission,
        condition: motor.condition,
        description: motor.description,
        status: motor.status,
        is_featured: motor.is_featured,
      }
    }
  }
})
</script>
