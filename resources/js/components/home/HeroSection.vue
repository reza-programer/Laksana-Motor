<template>
  <section class="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-[#0C0A09] text-white overflow-hidden">
    <!-- Full-Width Background from Store with smooth cinematic zoom -->
    <div class="absolute inset-0 z-0">
      <img
        :src="settingsStore.heroBgImage"
        alt="Showroom Laksana Motor"
        class="w-full h-full object-cover object-center scale-105 animate-subtle-zoom opacity-45 transition-all duration-700"
      />
      <!-- Gradient Overlays for readability -->
      <div class="absolute inset-0 bg-gradient-to-r from-[#0C0A09] via-[#0C0A09]/80 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#0C0A09] via-transparent to-black/40"></div>
    </div>

    <!-- Content Container -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full">
      <div class="max-w-2xl space-y-6">
        <!-- Floating Animated Badge -->
        <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-full backdrop-blur-md transition-all animate-fade-in-down shadow-lg">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-[#B91C1C]"></span>
          </span>
          <span class="text-xs font-bold text-stone-200 tracking-wider uppercase">Showroom Motor Bekas Terpercaya</span>
        </div>

        <!-- Headline with gradient glow accent (Dynamic from settingsStore) -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] animate-fade-in-up">
          {{ settingsStore.heroTitle1 }}<br />
          {{ settingsStore.heroTitle2 }}<br />
          <span class="bg-gradient-to-r from-[#EF4444] via-[#F87171] to-[#FCA5A5] bg-clip-text text-transparent drop-shadow-sm">
            {{ settingsStore.heroAccent }}
          </span>
        </h1>

        <!-- Subheadline (Dynamic from settingsStore) -->
        <p class="text-base sm:text-lg text-stone-300 leading-relaxed font-normal max-w-xl animate-fade-in-up delay-100">
          {{ settingsStore.heroSubtitle }}
        </p>

        <!-- CTA Buttons with Micro-interactions -->
        <div class="flex flex-wrap items-center gap-4 pt-2 animate-fade-in-up delay-200">
          <RouterLink
            to="/katalog"
            class="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-sm font-bold rounded-xl shadow-lg shadow-red-900/40 hover:shadow-red-900/60 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Lihat Stok Motor</span>
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </RouterLink>

          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white text-sm font-bold rounded-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
          >
            <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Chat WhatsApp</span>
          </a>
        </div>

        <!-- Floating Glassmorphic Trust Stats -->
        <div class="grid grid-cols-3 gap-3 sm:gap-4 pt-6 max-w-lg animate-fade-in-up delay-300">
          <div class="p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-md transition-colors">
            <p class="text-xl sm:text-2xl font-extrabold text-white">50+</p>
            <p class="text-[11px] font-medium text-stone-400 mt-0.5">Unit Siap Pakai</p>
          </div>
          <div class="p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-md transition-colors">
            <p class="text-xl sm:text-2xl font-extrabold text-white">100%</p>
            <p class="text-[11px] font-medium text-stone-400 mt-0.5">Surat Lengkap</p>
          </div>
          <div class="p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-md transition-colors">
            <div class="flex items-center gap-1">
              <span class="text-xl sm:text-2xl font-extrabold text-white">4.9</span>
              <span class="text-amber-400 text-sm">★</span>
            </div>
            <p class="text-[11px] font-medium text-stone-400 mt-0.5">Rating Customer</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { generateWhatsAppUrl } from '@/services/api'
import { useSettingsStore } from '@/stores/settingsStore'

const settingsStore = useSettingsStore()
const whatsappUrl = generateWhatsAppUrl()
</script>

<style scoped>
@keyframes subtleZoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.06);
  }
  100% {
    transform: scale(1);
  }
}

.animate-subtle-zoom {
  animation: subtleZoom 20s ease-in-out infinite alternate;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-100 {
  animation-delay: 100ms;
}
.delay-200 {
  animation-delay: 200ms;
}
.delay-300 {
  animation-delay: 300ms;
}
</style>
