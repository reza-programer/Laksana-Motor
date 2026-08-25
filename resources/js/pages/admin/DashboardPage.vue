<template>
  <div class="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-10">
    
    <!-- Welcome Header & Quick Action Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs">
      <div>
        <h1 class="text-lg sm:text-2xl font-black text-stone-900 tracking-tight">
          Ringkasan Showroom
        </h1>
        <p class="text-xs sm:text-sm text-stone-500 mt-0.5">
          Pantau ketersediaan stok, nilai inventaris, dan performa showroom.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <RouterLink
          to="/admin/motors/create"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Tambah Motor Baru</span>
        </RouterLink>
      </div>
    </div>

    <!-- 5 Colored Metric Cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      
      <!-- Total Motor -->
      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1.5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] sm:text-[11px] font-bold text-stone-400 uppercase tracking-wider">Total Motor</span>
          <div class="w-6 h-6 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
        <p class="text-2xl sm:text-3xl font-black text-stone-900">{{ stats.total }} <span class="text-xs font-semibold text-stone-400">Unit</span></p>
        <p class="text-[10px] sm:text-[11px] text-stone-500 truncate">Aset: <span class="font-bold text-stone-800">{{ formatPrice(stats.totalValue) }}</span></p>
      </div>

      <!-- Tersedia -->
      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/40 shadow-xs space-y-1.5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] sm:text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Siap Jual</span>
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        <p class="text-2xl sm:text-3xl font-black text-emerald-700">{{ stats.available }} <span class="text-xs font-semibold text-emerald-600">Unit</span></p>
        <p class="text-[10px] sm:text-[11px] text-emerald-600 font-medium truncate">Katalog aktif</p>
      </div>

      <!-- Booking -->
      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-amber-100 bg-gradient-to-br from-white to-amber-50/40 shadow-xs space-y-1.5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] sm:text-[11px] font-bold text-amber-700 uppercase tracking-wider">Booking DP</span>
          <span class="w-2 h-2 rounded-full bg-amber-500"></span>
        </div>
        <p class="text-2xl sm:text-3xl font-black text-amber-700">{{ stats.booking }} <span class="text-xs font-semibold text-amber-600">Unit</span></p>
        <p class="text-[10px] sm:text-[11px] text-amber-600 font-medium truncate">Proses transaksi</p>
      </div>

      <!-- Terjual -->
      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1.5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider">Terjual</span>
          <span class="text-xs font-bold text-stone-400">✓</span>
        </div>
        <p class="text-2xl sm:text-3xl font-black text-stone-800">{{ stats.sold }} <span class="text-xs font-semibold text-stone-400">Unit</span></p>
        <p class="text-[10px] sm:text-[11px] text-stone-500 truncate">Selesai</p>
      </div>

      <!-- Promo Aktif -->
      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-red-100 bg-gradient-to-br from-white to-red-50/30 shadow-xs space-y-1.5 col-span-2 md:col-span-1">
        <div class="flex items-center justify-between">
          <span class="text-[10px] sm:text-[11px] font-bold text-[#B91C1C] uppercase tracking-wider">Promo Banner</span>
          <span class="text-xs">🔥</span>
        </div>
        <p class="text-2xl sm:text-3xl font-black text-[#B91C1C]">{{ stats.activePromos }} <span class="text-xs font-semibold text-red-600">Aktif</span></p>
        <p class="text-[10px] sm:text-[11px] text-red-600 font-medium truncate">Tayang di beranda</p>
      </div>

    </div>

    <!-- Inventory Section (Responsive: Mobile Cards + Desktop Table) -->
    <div class="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
      
      <div class="px-5 sm:px-6 py-4 border-b border-stone-100 flex items-center justify-between">
        <div>
          <h3 class="font-extrabold text-stone-900 text-xs sm:text-sm">Daftar Stok Motor Terbaru</h3>
          <p class="text-[11px] sm:text-xs text-stone-500 mt-0.5">Kelola unit motor aktif di showroom</p>
        </div>
        <RouterLink to="/admin/motors" class="text-xs font-bold text-[#B91C1C] hover:underline shrink-0">
          Lihat Semua →
        </RouterLink>
      </div>

      <!-- 1. MOBILE VIEW: Responsive Card List (Visible on Mobile Screens < 768px) -->
      <div class="block md:hidden divide-y divide-stone-100">
        <div
          v-for="motor in mockMotors.slice(0, 5)"
          :key="motor.id"
          class="p-4 space-y-3 hover:bg-stone-50 transition-colors"
        >
          <!-- Top Row: Thumbnail + Title + Status Badge -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <img
                :src="getPrimaryImage(motor)"
                :alt="motor.name"
                class="w-14 h-11 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
              />
              <div>
                <p class="font-extrabold text-stone-900 text-xs leading-snug">{{ motor.name }}</p>
                <p class="text-[10px] text-stone-500 mt-0.5">{{ motor.brand }} • {{ motor.year }} • {{ formatMileage(motor.mileage) }}</p>
              </div>
            </div>

            <!-- Status Badge -->
            <span
              class="px-2 py-0.5 text-[10px] font-extrabold rounded-md uppercase tracking-wider shrink-0"
              :class="motor.status === 'Tersedia' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : (motor.status === 'Booking' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-stone-100 text-stone-600')"
            >
              {{ motor.status }}
            </span>
          </div>

          <!-- Bottom Row: Price + Action Buttons -->
          <div class="flex items-center justify-between pt-1 border-t border-stone-50">
            <div>
              <p class="text-[10px] text-stone-400 uppercase font-semibold">Harga Cash</p>
              <p class="text-sm font-extrabold text-[#B91C1C]">{{ formatPrice(motor.price) }}</p>
            </div>

            <div class="flex items-center gap-2">
              <RouterLink
                :to="`/motor/${motor.id}`"
                target="_blank"
                class="px-3 py-1 text-[11px] font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                Lihat
              </RouterLink>
              <RouterLink
                :to="`/admin/motors/${motor.id}/edit`"
                class="px-3 py-1 text-[11px] font-bold text-white bg-stone-900 hover:bg-black rounded-lg transition-colors shadow-xs"
              >
                Edit
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. DESKTOP VIEW: Full Data Table (Visible on Tablets & Desktops >= 768px) -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-xs text-left">
          <thead class="bg-stone-50 border-b border-stone-100 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th class="py-3.5 px-6">Unit Motor</th>
              <th class="py-3.5 px-4">Tahun / KM</th>
              <th class="py-3.5 px-4">Harga Cash</th>
              <th class="py-3.5 px-4">Status</th>
              <th class="py-3.5 px-4">Unggulan</th>
              <th class="py-3.5 px-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100 text-stone-700 font-medium">
            <tr v-for="motor in mockMotors.slice(0, 5)" :key="motor.id" class="hover:bg-stone-50/80 transition-colors">
              <td class="py-3.5 px-6">
                <div class="flex items-center gap-3">
                  <img :src="getPrimaryImage(motor)" :alt="motor.name" class="w-12 h-9 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0" />
                  <div>
                    <p class="font-extrabold text-stone-900 text-xs">{{ motor.name }}</p>
                    <p class="text-[10px] text-stone-400">{{ motor.brand }} • {{ motor.transmission }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3.5 px-4">
                <p class="font-bold text-stone-900">{{ motor.year }}</p>
                <p class="text-[10px] text-stone-400">{{ formatMileage(motor.mileage) }}</p>
              </td>
              <td class="py-3.5 px-4 font-extrabold text-[#B91C1C]">
                {{ formatPrice(motor.price) }}
              </td>
              <td class="py-3.5 px-4">
                <span
                  class="px-2.5 py-1 text-[10px] font-extrabold rounded-md uppercase tracking-wider"
                  :class="motor.status === 'Tersedia' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : (motor.status === 'Booking' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-stone-100 text-stone-600')"
                >
                  {{ motor.status }}
                </span>
              </td>
              <td class="py-3.5 px-4">
                <span v-if="motor.is_featured" class="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">★ Ya</span>
                <span v-else class="text-xs text-stone-400">-</span>
              </td>
              <td class="py-3.5 px-6 text-right">
                <div class="flex items-center justify-end gap-1.5">
                  <RouterLink
                    :to="`/admin/motors/${motor.id}/edit`"
                    class="px-2.5 py-1 text-[11px] font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                  >
                    Edit
                  </RouterLink>
                  <RouterLink
                    :to="`/motor/${motor.id}`"
                    target="_blank"
                    class="px-2.5 py-1 text-[11px] font-bold text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    Preview
                  </RouterLink>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Quick Shortcuts Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      <RouterLink
        to="/admin/motors/create"
        class="p-4 sm:p-5 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3.5 transition-all group"
      >
        <div class="w-10 h-10 rounded-xl bg-red-50 text-[#B91C1C] flex items-center justify-center font-black group-hover:scale-110 transition-transform shrink-0">
          +
        </div>
        <div>
          <p class="text-xs font-extrabold text-stone-900">Tambah Unit Motor</p>
          <p class="text-[10px] sm:text-[11px] text-stone-500">Input spesifikasi, harga & foto</p>
        </div>
      </RouterLink>

      <RouterLink
        to="/admin/promos"
        class="p-4 sm:p-5 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3.5 transition-all group"
      >
        <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black group-hover:scale-110 transition-transform shrink-0">
          %
        </div>
        <div>
          <p class="text-xs font-extrabold text-stone-900">Kelola Banner Promo</p>
          <p class="text-[10px] sm:text-[11px] text-stone-500">Pasang promo DP & diskon unit</p>
        </div>
      </RouterLink>

      <RouterLink
        to="/admin/testimonials"
        class="p-4 sm:p-5 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-3.5 transition-all group"
      >
        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black group-hover:scale-110 transition-transform shrink-0">
          ★
        </div>
        <div>
          <p class="text-xs font-extrabold text-stone-900">Kelola Testimoni</p>
          <p class="text-[10px] sm:text-[11px] text-stone-500">Tambah testimoni pembeli baru</p>
        </div>
      </RouterLink>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { mockMotors, mockPromos } from '@/services/mockData'
import { formatPrice, formatMileage, getPrimaryImage } from '@/services/api'

const stats = ref({
  total: 0,
  totalValue: 0,
  available: 0,
  booking: 0,
  sold: 0,
  activePromos: 0,
})

onMounted(() => {
  const totalVal = mockMotors.reduce((acc, m) => acc + m.price, 0)
  stats.value = {
    total: mockMotors.length,
    totalValue: totalVal,
    available: mockMotors.filter(m => m.status === 'Tersedia').length,
    booking: mockMotors.filter(m => m.status === 'Booking').length,
    sold: mockMotors.filter(m => m.status === 'Terjual').length,
    activePromos: mockPromos.filter(p => p.is_active).length,
  }
})
</script>
