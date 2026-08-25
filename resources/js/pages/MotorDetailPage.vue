<template>
  <div class="bg-[#FAFAF9] min-h-screen py-8 lg:py-12">
    <!-- Loading -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="animate-pulse space-y-6">
        <div class="h-4 bg-stone-200 rounded w-48"></div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div class="lg:col-span-7 aspect-[4/3] bg-stone-200 rounded-2xl"></div>
          <div class="lg:col-span-5 space-y-4">
            <div class="h-8 bg-stone-200 rounded w-3/4"></div>
            <div class="h-8 bg-stone-200 rounded w-1/2"></div>
            <div class="h-24 bg-stone-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else-if="!motor" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h2 class="text-xl font-bold text-stone-900">Motor tidak ditemukan</h2>
      <p class="text-sm text-stone-500 mt-2">Unit yang Anda cari mungkin sudah terjual atau tidak aktif.</p>
      <RouterLink to="/katalog" class="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-[#B91C1C] text-white text-sm font-semibold rounded-lg shadow-sm">
        Kembali ke Katalog
      </RouterLink>
    </div>

    <!-- Detail Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-400 mb-6">
        <RouterLink to="/" class="hover:text-stone-900 transition-colors">Home</RouterLink>
        <span>/</span>
        <RouterLink to="/katalog" class="hover:text-stone-900 transition-colors">Katalog</RouterLink>
        <span>/</span>
        <span class="text-stone-900 font-semibold truncate">{{ motor.name }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <!-- Left: Image Gallery (Column 7) -->
        <div class="lg:col-span-7 space-y-4">
          <!-- Main Photo -->
          <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm relative">
            <img
              :src="selectedImage"
              :alt="motor.name"
              class="w-full h-full object-cover"
            />
            <!-- Status Badge -->
            <span
              class="absolute top-4 left-4 px-3 py-1 text-xs font-extrabold rounded-md shadow-sm uppercase tracking-wide"
              :class="motor.status === 'Tersedia' ? 'bg-emerald-600 text-white' : (motor.status === 'Booking' ? 'bg-amber-500 text-white' : 'bg-stone-600 text-white')"
            >
              {{ motor.status }}
            </span>
          </div>

          <!-- Thumbnails -->
          <div v-if="motor.images.length > 1" class="flex gap-3 overflow-x-auto pb-1">
            <button
              v-for="img in motor.images"
              :key="img.id"
              @click="selectedImage = img.image"
              class="w-24 h-18 rounded-xl overflow-hidden border-2 shrink-0 transition-all bg-white"
              :class="selectedImage === img.image ? 'border-[#B91C1C] ring-2 ring-[#B91C1C]/20' : 'border-stone-200 hover:border-stone-300'"
            >
              <img :src="img.image" alt="Thumbnail" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Right: Motor Info & Specs (Column 5) -->
        <div class="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <p class="text-xs font-bold text-stone-400 uppercase tracking-widest">{{ motor.brand }}</p>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
              {{ motor.name }}
            </h1>
            <p class="text-2xl sm:text-3xl font-extrabold text-[#B91C1C] mt-2.5">
              {{ formatPrice(motor.price) }}
            </p>
          </div>

          <!-- Key Specs Table / Grid -->
          <div class="grid grid-cols-2 gap-3 pt-4 border-t border-stone-100">
            <div class="p-3 bg-stone-50 rounded-xl border border-stone-100">
              <p class="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Tahun</p>
              <p class="text-sm font-bold text-stone-800 mt-0.5">{{ motor.year }}</p>
            </div>
            <div class="p-3 bg-stone-50 rounded-xl border border-stone-100">
              <p class="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Kilometer</p>
              <p class="text-sm font-bold text-stone-800 mt-0.5">{{ formatMileage(motor.mileage) }}</p>
            </div>
            <div class="p-3 bg-stone-50 rounded-xl border border-stone-100">
              <p class="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Warna</p>
              <p class="text-sm font-bold text-stone-800 mt-0.5">{{ motor.color }}</p>
            </div>
            <div class="p-3 bg-stone-50 rounded-xl border border-stone-100">
              <p class="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Transmisi</p>
              <p class="text-sm font-bold text-stone-800 mt-0.5">{{ motor.transmission }}</p>
            </div>
          </div>

          <!-- Condition & Description -->
          <div class="space-y-4 pt-2 border-t border-stone-100">
            <div>
              <h3 class="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Kondisi Motor</h3>
              <p class="text-xs sm:text-sm text-stone-600 leading-relaxed">{{ motor.condition }}</p>
            </div>

            <div>
              <h3 class="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Deskripsi</h3>
              <p class="text-xs sm:text-sm text-stone-600 leading-relaxed">{{ motor.description }}</p>
            </div>

            <div>
              <h3 class="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Kelengkapan Surat</h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded border border-emerald-200/80">✓ STNK Ada</span>
                <span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded border border-emerald-200/80">✓ BPKB Lengkap</span>
                <span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded border border-emerald-200/80">✓ Faktur Tersedia</span>
              </div>
            </div>
          </div>

          <!-- WhatsApp Direct CTA -->
          <div class="pt-4 border-t border-stone-100 space-y-3">
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-sm font-bold rounded-xl shadow transition-all active:scale-95"
            >
              <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Tanya via WhatsApp
            </a>
            <RouterLink
              to="/katalog"
              class="flex items-center justify-center w-full py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
            >
              ← Lihat Motor Lainnya di Katalog
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import type { Motor } from '@/types'
import { fetchMotor, formatPrice, formatMileage, generateWhatsAppUrl, getPrimaryImage } from '@/services/api'

const route = useRoute()
const motor = ref<Motor | null>(null)
const loading = ref(true)
const selectedImage = ref('')

const whatsappUrl = computed(() => {
  return motor.value ? generateWhatsAppUrl(motor.value) : generateWhatsAppUrl()
})

async function loadMotor() {
  loading.value = true
  try {
    const id = Number(route.params.id)
    motor.value = await fetchMotor(id)
    if (motor.value) {
      selectedImage.value = getPrimaryImage(motor.value)
    }
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id, () => {
  loadMotor()
})

onMounted(() => {
  loadMotor()
})
</script>
