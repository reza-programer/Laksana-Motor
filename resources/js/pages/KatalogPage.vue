<template>
  <div class="bg-[#FAFAF9] min-h-screen pb-20">
    <!-- Header Hero Banner with subtle dark gradient and overlay -->
    <div class="relative bg-[#1C1917] text-white py-12 lg:py-16 overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&auto=format&fit=crop&q=80"
          alt="Katalog Motor"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-transparent to-black/50"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <p class="text-xs font-extrabold text-[#EF4444] uppercase tracking-widest mb-1.5 animate-fade-in-down">
          Katalog Stok Motor Bekas
        </p>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white animate-fade-in-up">
          Temukan Motor Impian Anda
        </h1>
        <p class="text-xs sm:text-sm text-stone-300 mt-2 max-w-xl animate-fade-in-up delay-100">
          Semua unit bergaransi, surat lengkap, dan telah melewati uji inspeksi menyeluruh.
        </p>
      </div>
    </div>

    <!-- Sticky Smart Filter Bar -->
    <div class="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div class="flex flex-col lg:flex-row gap-3 items-center justify-between">
          
          <!-- Search Input with clear button -->
          <div class="relative w-full lg:w-96">
            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="store.filters.search"
              type="text"
              placeholder="Cari motor... (Vario, NMAX, Beat)"
              class="w-full pl-10 pr-9 py-2 bg-stone-100/80 hover:bg-stone-100 focus:bg-white border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C] transition-all"
              @input="debouncedSearch"
            />
            <button
              v-if="store.filters.search"
              @click="store.filters.search = ''; store.loadMotors(1)"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold"
            >
              ✕
            </button>
          </div>

          <!-- Brand Quick Filter Chips (Horizontal Scrollable) -->
          <div class="flex items-center gap-2 overflow-x-auto w-full lg:w-auto py-1 no-scrollbar">
            <button
              @click="selectBrand('')"
              class="px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200"
              :class="store.filters.brand === '' ? 'bg-[#B91C1C] text-white shadow-sm' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'"
            >
              Semua Unit
            </button>
            <button
              v-for="brand in store.brands"
              :key="brand"
              @click="selectBrand(brand)"
              class="px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200"
              :class="store.filters.brand === brand ? 'bg-[#B91C1C] text-white shadow-sm' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'"
            >
              {{ brand }}
            </button>

            <!-- Price Quick Pills -->
            <button
              @click="togglePriceFilter(0, 15000000)"
              class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all"
              :class="isPriceActive(0, 15000000) ? 'bg-red-50 text-[#B91C1C] border-[#B91C1C]' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'"
            >
              &lt; 15 Juta
            </button>
            <button
              @click="togglePriceFilter(15000000, 20000000)"
              class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all"
              :class="isPriceActive(15000000, 20000000) ? 'bg-red-50 text-[#B91C1C] border-[#B91C1C]' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'"
            >
              15 - 20 Juta
            </button>
            <button
              @click="togglePriceFilter(20000000, null)"
              class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all"
              :class="isPriceActive(20000000, null) ? 'bg-red-50 text-[#B91C1C] border-[#B91C1C]' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'"
            >
              &gt; 20 Juta
            </button>
          </div>

          <!-- Advanced Filters Trigger Button & Reset -->
          <div class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              @click="filterModalOpen = true"
              class="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-all shadow-xs"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filter Lainnya</span>
              <span v-if="store.hasFilters" class="w-2 h-2 bg-[#EF4444] rounded-full animate-pulse"></span>
            </button>

            <button
              v-if="store.hasFilters"
              @click="resetAll"
              class="text-xs font-bold text-[#B91C1C] hover:underline px-2 py-1"
            >
              Reset
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- Main Content Area (Full Width Grid) -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      
      <!-- Counter & Active Filter Tags -->
      <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p class="text-xs sm:text-sm font-medium text-stone-600">
          Menampilkan <span class="font-extrabold text-stone-900">{{ store.totalMotors }}</span> unit motor siap jalan
        </p>

        <!-- Active Filter Badges -->
        <div v-if="store.hasFilters" class="flex flex-wrap items-center gap-2">
          <span v-if="store.filters.brand" class="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-200 text-stone-800 rounded-md text-xs font-semibold">
            Merek: {{ store.filters.brand }}
            <button @click="selectBrand('')" class="hover:text-red-600">✕</button>
          </span>
          <span v-if="store.filters.transmission" class="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-200 text-stone-800 rounded-md text-xs font-semibold">
            Transmisi: {{ store.filters.transmission }}
            <button @click="store.filters.transmission = ''; store.loadMotors(1)" class="hover:text-red-600">✕</button>
          </span>
          <span v-if="store.filters.status" class="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-200 text-stone-800 rounded-md text-xs font-semibold">
            Status: {{ store.filters.status }}
            <button @click="store.filters.status = ''; store.loadMotors(1)" class="hover:text-red-600">✕</button>
          </span>
        </div>
      </div>

      <!-- Loading Skeletons -->
      <div v-if="store.loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div v-for="n in 8" :key="n" class="bg-white rounded-2xl border border-stone-200 p-4 animate-pulse">
          <div class="aspect-[4/3] bg-stone-100 rounded-xl mb-3"></div>
          <div class="h-4 bg-stone-100 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-stone-100 rounded w-1/2 mb-3"></div>
          <div class="h-6 bg-stone-100 rounded w-2/3"></div>
        </div>
      </div>

      <!-- Motor Cards Grid with Stagger Animation -->
      <div v-else-if="store.motors.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div
          v-for="(motor, index) in store.motors"
          :key="motor.id"
          class="animate-fade-in-up"
          :class="`stagger-${(index % 6) + 1}`"
        >
          <MotorCard :motor="motor" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-3xl border border-stone-200/80 text-center py-20 px-6 shadow-sm max-w-lg mx-auto mt-6 animate-scale-in">
        <div class="w-16 h-16 bg-red-50 text-[#B91C1C] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="font-extrabold text-stone-900 text-lg">Unit Motor Tidak Ditemukan</h3>
        <p class="text-xs sm:text-sm text-stone-500 mt-1 max-w-xs mx-auto">
          Tidak ada unit yang cocok dengan kriteria filter pencarian Anda saat ini.
        </p>
        <button
          @click="resetAll"
          class="mt-6 px-6 py-2.5 text-xs font-bold text-white bg-[#B91C1C] hover:bg-[#991B1B] rounded-xl shadow-md transition-all active:scale-95"
        >
          Reset Semua Filter
        </button>
      </div>

      <!-- Pagination -->
      <div v-if="store.lastPage > 1 && !store.loading" class="flex items-center justify-center gap-2 mt-12">
        <button
          :disabled="store.currentPage <= 1"
          @click="goToPage(store.currentPage - 1)"
          class="px-4 py-2 border border-stone-200 bg-white rounded-xl text-xs font-bold text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs hover:bg-stone-50 transition-all"
        >
          ← Sebelumnya
        </button>
        <button
          v-for="page in store.lastPage"
          :key="page"
          @click="goToPage(page)"
          class="w-10 h-10 rounded-xl text-xs font-bold transition-all shadow-xs"
          :class="page === store.currentPage ? 'bg-[#B91C1C] text-white shadow-md' : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'"
        >
          {{ page }}
        </button>
        <button
          :disabled="store.currentPage >= store.lastPage"
          @click="goToPage(store.currentPage + 1)"
          class="px-4 py-2 border border-stone-200 bg-white rounded-xl text-xs font-bold text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs hover:bg-stone-50 transition-all"
        >
          Selanjutnya →
        </button>
      </div>
    </div>

    <!-- Advanced Filter Modal / Drawer -->
    <teleport to="body">
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="filterModalOpen" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" @click.self="filterModalOpen = false">
          
          <div class="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-scale-in border border-stone-200">
            <!-- Modal Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#FAFAF9]">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-lg bg-[#FEF2F2] flex items-center justify-center text-[#B91C1C]">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <h3 class="font-bold text-stone-900 text-sm">Filter Detail Motor</h3>
              </div>
              <button @click="filterModalOpen = false" class="p-1 text-stone-400 hover:text-stone-700 text-sm">
                ✕
              </button>
            </div>

            <!-- Modal Body (Detailed Filters) -->
            <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              
              <!-- Transmisi -->
              <div>
                <label class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Transmisi</label>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    @click="store.filters.transmission = ''"
                    class="py-2 rounded-xl text-xs font-bold border transition-all"
                    :class="store.filters.transmission === '' ? 'bg-[#1C1917] text-white border-[#1C1917]' : 'bg-stone-50 border-stone-200 text-stone-700'"
                  >
                    Semua
                  </button>
                  <button
                    type="button"
                    @click="store.filters.transmission = 'Otomatis'"
                    class="py-2 rounded-xl text-xs font-bold border transition-all"
                    :class="store.filters.transmission === 'Otomatis' ? 'bg-[#1C1917] text-white border-[#1C1917]' : 'bg-stone-50 border-stone-200 text-stone-700'"
                  >
                    Matic
                  </button>
                  <button
                    type="button"
                    @click="store.filters.transmission = 'Manual'"
                    class="py-2 rounded-xl text-xs font-bold border transition-all"
                    :class="store.filters.transmission === 'Manual' ? 'bg-[#1C1917] text-white border-[#1C1917]' : 'bg-stone-50 border-stone-200 text-stone-700'"
                  >
                    Manual
                  </button>
                </div>
              </div>

              <!-- Status Unit -->
              <div>
                <label class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Status Unit</label>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    @click="store.filters.status = ''"
                    class="py-2 rounded-xl text-xs font-bold border transition-all"
                    :class="store.filters.status === '' ? 'bg-[#1C1917] text-white border-[#1C1917]' : 'bg-stone-50 border-stone-200 text-stone-700'"
                  >
                    Semua
                  </button>
                  <button
                    type="button"
                    @click="store.filters.status = 'Tersedia'"
                    class="py-2 rounded-xl text-xs font-bold border transition-all"
                    :class="store.filters.status === 'Tersedia' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-stone-50 border-stone-200 text-stone-700'"
                  >
                    Tersedia
                  </button>
                  <button
                    type="button"
                    @click="store.filters.status = 'Booking'"
                    class="py-2 rounded-xl text-xs font-bold border transition-all"
                    :class="store.filters.status === 'Booking' ? 'bg-amber-500 text-white border-amber-500' : 'bg-stone-50 border-stone-200 text-stone-700'"
                  >
                    Booking
                  </button>
                </div>
              </div>

              <!-- Rentang Tahun -->
              <div>
                <label class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Rentang Tahun</label>
                <div class="grid grid-cols-2 gap-2">
                  <input
                    v-model.number="store.filters.minYear"
                    type="number"
                    placeholder="Tahun Min (misal 2021)"
                    class="px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#B91C1C]"
                  />
                  <input
                    v-model.number="store.filters.maxYear"
                    type="number"
                    placeholder="Tahun Max (misal 2024)"
                    class="px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#B91C1C]"
                  />
                </div>
              </div>

              <!-- Rentang Kilometer -->
              <div>
                <label class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Maksimal Kilometer</label>
                <input
                  v-model.number="store.filters.maxMileage"
                  type="number"
                  placeholder="Contoh: 20000"
                  class="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#B91C1C]"
                />
              </div>

            </div>

            <!-- Modal Footer -->
            <div class="flex items-center justify-between p-4 px-6 border-t border-stone-100 bg-[#FAFAF9]">
              <button
                type="button"
                @click="resetAll(); filterModalOpen = false"
                class="text-xs font-bold text-stone-500 hover:text-stone-900"
              >
                Reset Filter
              </button>
              <button
                type="button"
                @click="applyAdvancedFilters"
                class="px-6 py-2.5 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95"
              >
                Terapkan Filter
              </button>
            </div>

          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMotorStore } from '@/stores/motorStore'
import MotorCard from '@/components/katalog/MotorCard.vue'

const store = useMotorStore()
const filterModalOpen = ref(false)

let searchTimeout: ReturnType<typeof setTimeout>

function debouncedSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    store.loadMotors(1)
  }, 250)
}

function selectBrand(brand: string) {
  store.filters.brand = brand
  store.loadMotors(1)
}

function isPriceActive(min: number, max: number | null): boolean {
  return store.filters.minPrice === min && store.filters.maxPrice === max
}

function togglePriceFilter(min: number, max: number | null) {
  if (isPriceActive(min, max)) {
    store.filters.minPrice = null
    store.filters.maxPrice = null
  } else {
    store.filters.minPrice = min
    store.filters.maxPrice = max
  }
  store.loadMotors(1)
}

function applyAdvancedFilters() {
  store.loadMotors(1)
  filterModalOpen.value = false
}

function resetAll() {
  store.resetFilters()
  store.loadMotors(1)
}

function goToPage(page: number) {
  store.loadMotors(page)
  window.scrollTo({ top: 200, behavior: 'smooth' })
}

onMounted(() => {
  store.loadBrands()
  store.loadMotors(1)
})
</script>

<style scoped>
/* Hide scrollbar for brand chips bar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
