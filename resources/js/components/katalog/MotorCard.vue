<template>
  <RouterLink
    :to="`/motor/${motor.id}`"
    class="group relative bg-white rounded-2xl border border-stone-200/90 hover:border-[#B91C1C]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
  >
    <!-- Motor Image Container -->
    <div class="relative aspect-[4/3] bg-[#F5F5F4] overflow-hidden p-3 flex items-center justify-center">
      <img
        :src="primaryImage"
        :alt="motor.name"
        class="w-full h-full object-cover rounded-xl group-hover:scale-108 transition-transform duration-500 ease-out"
        loading="lazy"
      />

      <!-- Subtle Dark Vignette on Hover -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none"></div>

      <!-- Status Badge -->
      <span
        v-if="motor.status !== 'Tersedia'"
        class="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-extrabold rounded-md shadow-md uppercase tracking-wider backdrop-blur-sm"
        :class="motor.status === 'Booking' ? 'bg-amber-500/95 text-white' : 'bg-stone-700/95 text-white'"
      >
        {{ motor.status }}
      </span>

      <!-- Featured Pill -->
      <span
        v-if="motor.is_featured"
        class="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold text-[#B91C1C] bg-red-50/95 border border-red-200/80 rounded-md shadow-sm uppercase tracking-wide"
      >
        ★ Unggulan
      </span>
    </div>

    <!-- Details Area -->
    <div class="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
      <div>
        <p class="text-[11px] font-bold text-stone-400 uppercase tracking-widest">{{ motor.brand }}</p>
        <h3 class="font-extrabold text-stone-900 text-base group-hover:text-[#B91C1C] transition-colors duration-200 line-clamp-1 mt-0.5">
          {{ motor.name }}
        </h3>

        <!-- Specs Row (Year, Mileage, Transmission) -->
        <div class="flex items-center gap-2.5 sm:gap-3 mt-2.5 text-xs text-stone-500 font-medium">
          <div class="flex items-center gap-1 bg-stone-100/70 px-2 py-1 rounded-md">
            <svg class="w-3.5 h-3.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{{ motor.year }}</span>
          </div>
          <div class="flex items-center gap-1 bg-stone-100/70 px-2 py-1 rounded-md">
            <svg class="w-3.5 h-3.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ formatMileage(motor.mileage) }}</span>
          </div>
        </div>

        <!-- Price with subtle highlight -->
        <div class="mt-3.5">
          <p class="text-[11px] text-stone-400 uppercase font-semibold">Harga Cash</p>
          <p class="text-lg font-black text-[#B91C1C] tracking-tight">
            {{ formatPrice(motor.price) }}
          </p>
        </div>
      </div>

      <!-- Action Button -->
      <div class="mt-4 pt-3 border-t border-stone-100">
        <span class="flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-bold text-stone-700 bg-stone-50 group-hover:bg-[#B91C1C] group-hover:text-white border border-stone-200 group-hover:border-[#B91C1C] rounded-xl shadow-xs transition-all duration-300">
          <span>Lihat Detail</span>
          <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Motor } from '@/types'
import { formatPrice, formatMileage, getPrimaryImage } from '@/services/api'

const props = defineProps<{
  motor: Motor
}>()

const primaryImage = computed(() => getPrimaryImage(props.motor))
</script>
