<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs">
      <div>
        <h1 class="text-lg sm:text-2xl font-black text-stone-900 tracking-tight">Kelola Stok Motor</h1>
        <p class="text-xs sm:text-sm text-stone-500 mt-0.5">Daftar semua inventaris unit motor yang ada di showroom.</p>
      </div>

      <RouterLink
        to="/admin/motors/create"
        class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Tambah Motor Baru</span>
      </RouterLink>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
      <div class="relative w-full sm:w-80">
        <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="search"
          type="text"
          placeholder="Cari motor / merek..."
          class="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#B91C1C]"
        />
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto">
        <select
          v-model="statusFilter"
          class="w-full sm:w-auto px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 focus:outline-none focus:border-[#B91C1C]"
        >
          <option value="">Semua Status Unit</option>
          <option value="Tersedia">Tersedia</option>
          <option value="Booking">Booking</option>
          <option value="Terjual">Terjual</option>
        </select>
      </div>
    </div>

    <!-- 1. MOBILE VIEW: Responsive Card List (Screen < 768px) -->
    <div class="block md:hidden space-y-3">
      <div
        v-for="motor in filteredMotors"
        :key="motor.id"
        class="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3"
      >
        <!-- Motor Thumbnail & Title -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3">
            <img
              :src="getPrimaryImage(motor)"
              :alt="motor.name"
              class="w-16 h-12 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
            />
            <div>
              <p class="font-extrabold text-stone-900 text-xs leading-snug">{{ motor.name }}</p>
              <p class="text-[10px] text-stone-500 mt-0.5">{{ motor.brand }} • {{ motor.year }} • {{ formatMileage(motor.mileage) }}</p>
            </div>
          </div>
          <button
            @click="toggleFeatured(motor)"
            class="px-2 py-0.5 rounded text-[10px] font-bold border transition-all shrink-0"
            :class="motor.is_featured ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-stone-50 text-stone-400 border-stone-200'"
          >
            {{ motor.is_featured ? '★ Unggulan' : 'Standar' }}
          </button>
        </div>

        <!-- Price & Status Dropdown Row -->
        <div class="flex items-center justify-between pt-2 border-t border-stone-100">
          <div>
            <p class="text-[10px] text-stone-400 uppercase font-semibold">Harga Cash</p>
            <p class="text-sm font-extrabold text-[#B91C1C]">{{ formatPrice(motor.price) }}</p>
          </div>

          <select
            v-model="motor.status"
            @change="updateStatus(motor)"
            class="px-2.5 py-1 text-[10px] font-extrabold rounded-lg uppercase tracking-wider border cursor-pointer focus:outline-none"
            :class="motor.status === 'Tersedia' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : (motor.status === 'Booking' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-stone-100 text-stone-600 border-stone-200')"
          >
            <option value="Tersedia">Tersedia</option>
            <option value="Booking">Booking</option>
            <option value="Terjual">Terjual</option>
          </select>
        </div>

        <!-- Actions Row -->
        <div class="flex items-center gap-2 pt-2 border-t border-stone-50">
          <RouterLink
            :to="`/motor/${motor.id}`"
            target="_blank"
            class="flex-1 py-1.5 text-center text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
          >
            Lihat Unit
          </RouterLink>
          <RouterLink
            :to="`/admin/motors/${motor.id}/edit`"
            class="flex-1 py-1.5 text-center text-xs font-bold text-white bg-stone-900 hover:bg-black rounded-xl transition-colors shadow-xs"
          >
            Edit Data
          </RouterLink>
          <button
            @click="handleDelete(motor.id)"
            class="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 rounded-xl transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- 2. DESKTOP VIEW: Full Data Table (Screen >= 768px) -->
    <div class="hidden md:block bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-xs text-left">
          <thead class="bg-stone-50 border-b border-stone-100 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th class="py-4 px-6">Unit Motor</th>
              <th class="py-4 px-4">Tahun / KM</th>
              <th class="py-4 px-4">Harga Cash</th>
              <th class="py-4 px-4">Transmisi</th>
              <th class="py-4 px-4">Status Unit</th>
              <th class="py-4 px-4">Unggulan</th>
              <th class="py-4 px-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100 text-stone-700 font-medium">
            <tr v-for="motor in filteredMotors" :key="motor.id" class="hover:bg-stone-50/80 transition-colors">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <img :src="getPrimaryImage(motor)" :alt="motor.name" class="w-14 h-10 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0" />
                  <div>
                    <p class="font-extrabold text-stone-900 text-xs">{{ motor.name }}</p>
                    <p class="text-[10px] text-stone-400">{{ motor.brand }} • Warna: {{ motor.color }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4">
                <p class="font-bold text-stone-900">{{ motor.year }}</p>
                <p class="text-[10px] text-stone-400">{{ formatMileage(motor.mileage) }}</p>
              </td>
              <td class="py-4 px-4 font-extrabold text-[#B91C1C]">
                {{ formatPrice(motor.price) }}
              </td>
              <td class="py-4 px-4">
                <span class="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-md font-semibold text-[10px]">
                  {{ motor.transmission }}
                </span>
              </td>
              <td class="py-4 px-4">
                <select
                  v-model="motor.status"
                  @change="updateStatus(motor)"
                  class="px-2.5 py-1 text-[10px] font-extrabold rounded-md uppercase tracking-wider border transition-all cursor-pointer focus:outline-none"
                  :class="motor.status === 'Tersedia' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : (motor.status === 'Booking' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-stone-100 text-stone-600 border-stone-200')"
                >
                  <option value="Tersedia">Tersedia</option>
                  <option value="Booking">Booking</option>
                  <option value="Terjual">Terjual</option>
                </select>
              </td>
              <td class="py-4 px-4">
                <button
                  @click="toggleFeatured(motor)"
                  class="px-2.5 py-1 rounded-md text-[10px] font-bold border transition-all"
                  :class="motor.is_featured ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-stone-50 text-stone-400 border-stone-200'"
                >
                  {{ motor.is_featured ? '★ Unggulan' : 'Standar' }}
                </button>
              </td>
              <td class="py-4 px-6 text-right">
                <div class="flex items-center justify-end gap-1.5">
                  <RouterLink
                    :to="`/admin/motors/${motor.id}/edit`"
                    class="px-3 py-1.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                  >
                    Edit
                  </RouterLink>
                  <button
                    @click="handleDelete(motor.id)"
                    class="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="!filteredMotors.length" class="p-12 text-center text-stone-400 text-xs font-semibold">
        Tidak ada data motor yang sesuai dengan pencarian.
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import type { Motor } from '@/types'
import { mockMotors } from '@/services/mockData'
import { formatPrice, formatMileage, getPrimaryImage, deleteMotor, updateMotor } from '@/services/api'

const motors = ref<Motor[]>([])
const search = ref('')
const statusFilter = ref('')

const filteredMotors = computed(() => {
  let result = motors.value
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(m => (m.brand + ' ' + m.name).toLowerCase().includes(q))
  }
  if (statusFilter.value) {
    result = result.filter(m => m.status === statusFilter.value)
  }
  return result
})

async function updateStatus(motor: Motor) {
  await updateMotor(motor.id, { status: motor.status })
}

async function toggleFeatured(motor: Motor) {
  motor.is_featured = !motor.is_featured
  await updateMotor(motor.id, { is_featured: motor.is_featured })
}

async function handleDelete(id: number) {
  if (confirm('Apakah Anda yakin ingin menghapus motor ini dari stok showroom?')) {
    await deleteMotor(id)
    motors.value = motors.value.filter(m => m.id !== id)
  }
}

onMounted(() => {
  motors.value = [...mockMotors]
})
</script>
