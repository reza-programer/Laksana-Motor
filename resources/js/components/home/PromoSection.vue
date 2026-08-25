<template>
  <section v-if="promo" id="promo" class="py-12 bg-white scroll-mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Promo Banner Card with Scroll Reveal -->
      <div v-reveal class="relative rounded-3xl overflow-hidden bg-[#1C1917] text-white shadow-xl border border-stone-800">
        <!-- Background motorbike collage with gradient fade -->
        <div class="absolute inset-0 z-0">
          <img
            :src="promo.image || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&auto=format&fit=crop&q=80'"
            alt="Promo background"
            class="w-full h-full object-cover object-right opacity-35"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-[#1C1917] via-[#1C1917]/90 to-transparent"></div>
        </div>

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-14">
          <!-- Text Content -->
          <div class="lg:col-span-8 space-y-4 max-w-xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full">
              <span class="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-ping"></span>
              <span class="text-[11px] font-bold text-[#F87171] uppercase tracking-widest">Promo Spesial Showroom</span>
            </div>

            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {{ promo.title }}
            </h2>
            <p class="text-xs sm:text-base text-stone-300 leading-relaxed font-normal">
              {{ promo.description }}
            </p>
            <div class="pt-2">
              <a
                :href="whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-sm font-bold rounded-xl shadow-lg shadow-red-900/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Klaim Promo via WhatsApp</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Right Badge Visual -->
          <div class="lg:col-span-4 flex justify-center lg:justify-end">
            <div class="w-40 h-48 bg-gradient-to-b from-[#DC2626] to-[#991B1B] border-2 border-white/25 rounded-2xl flex flex-col items-center justify-center text-center p-4 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-300">
              <span class="text-[10px] font-extrabold text-white/90 uppercase tracking-widest bg-black/20 px-2 py-0.5 rounded-md mb-1">PROMO TERBATAS</span>
              <span class="text-[11px] font-bold text-white uppercase tracking-wider mt-1">SPESIAL DEAL</span>
              <span class="text-3xl font-black text-white my-1 drop-shadow-md">LAKSANA</span>
              <span class="text-xs font-black text-white uppercase tracking-widest bg-white/20 px-3 py-1 rounded-md">MOTOR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Promo } from '@/types'
import { fetchPromos, generateWhatsAppUrl } from '@/services/api'

const promo = ref<Promo | null>(null)
const whatsappUrl = generateWhatsAppUrl()

onMounted(async () => {
  const list = await fetchPromos(true)
  if (list && list.length > 0) {
    promo.value = list[0]
  }
})
</script>
