<template>
  <section class="py-14 lg:py-20 bg-[#FAFAF9]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div v-reveal class="flex items-end justify-between mb-10">
        <div>
          <p class="text-xs font-bold text-[#B91C1C] uppercase tracking-widest mb-1">
            Motor Unggulan
          </p>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Pilihan Motor Terbaik
          </h2>
        </div>
        <RouterLink
          to="/katalog"
          class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-900 hover:text-[#B91C1C] transition-colors"
        >
          <span>Lihat Semua Motor</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </RouterLink>
      </div>

      <!-- Loading skeleton -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="n in 5" :key="n" class="bg-white rounded-2xl border border-stone-200 p-4 animate-pulse">
          <div class="aspect-[4/3] bg-stone-100 rounded-xl mb-3"></div>
          <div class="h-4 bg-stone-100 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-stone-100 rounded w-1/2 mb-3"></div>
          <div class="h-5 bg-stone-100 rounded w-2/3"></div>
        </div>
      </div>

      <!-- Motors Grid (5 Columns with Staggered Scroll Reveal) -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4.5">
        <div
          v-for="(motor, index) in featuredMotors.slice(0, 5)"
          :key="motor.id"
          v-reveal="{ delay: index * 90 }"
        >
          <MotorCard :motor="motor" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { Motor } from '@/types'
import { fetchFeaturedMotors } from '@/services/api'
import MotorCard from '@/components/katalog/MotorCard.vue'

const featuredMotors = ref<Motor[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    featuredMotors.value = await fetchFeaturedMotors()
  } finally {
    loading.value = false
  }
})
</script>
