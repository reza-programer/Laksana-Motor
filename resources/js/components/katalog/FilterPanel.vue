<template>
  <div class="space-y-5">
    <!-- Brand -->
    <div>
      <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Merek</label>
      <select
        v-model="store.filters.brand"
        @change="applyFilter"
        class="w-full px-3 py-2 bg-white border border-gray-border rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary"
      >
        <option value="">Semua Merek</option>
        <option v-for="brand in store.brands" :key="brand" :value="brand">{{ brand }}</option>
      </select>
    </div>

    <!-- Price Range -->
    <div>
      <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Rentang Harga</label>
      <div class="grid grid-cols-2 gap-2">
        <input
          v-model.number="store.filters.minPrice"
          type="number"
          placeholder="Min"
          class="w-full px-3 py-2 bg-white border border-gray-border rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary"
          @change="applyFilter"
        />
        <input
          v-model.number="store.filters.maxPrice"
          type="number"
          placeholder="Max"
          class="w-full px-3 py-2 bg-white border border-gray-border rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary"
          @change="applyFilter"
        />
      </div>
    </div>

    <!-- Year Range -->
    <div>
      <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Tahun</label>
      <div class="grid grid-cols-2 gap-2">
        <input
          v-model.number="store.filters.minYear"
          type="number"
          placeholder="Dari"
          class="w-full px-3 py-2 bg-white border border-gray-border rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary"
          @change="applyFilter"
        />
        <input
          v-model.number="store.filters.maxYear"
          type="number"
          placeholder="Sampai"
          class="w-full px-3 py-2 bg-white border border-gray-border rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary"
          @change="applyFilter"
        />
      </div>
    </div>

    <!-- Mileage Range -->
    <div>
      <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Kilometer</label>
      <div class="grid grid-cols-2 gap-2">
        <input
          v-model.number="store.filters.minMileage"
          type="number"
          placeholder="Min"
          class="w-full px-3 py-2 bg-white border border-gray-border rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary"
          @change="applyFilter"
        />
        <input
          v-model.number="store.filters.maxMileage"
          type="number"
          placeholder="Max"
          class="w-full px-3 py-2 bg-white border border-gray-border rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary"
          @change="applyFilter"
        />
      </div>
    </div>

    <!-- Transmission -->
    <div>
      <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Transmisi</label>
      <select
        v-model="store.filters.transmission"
        @change="applyFilter"
        class="w-full px-3 py-2 bg-white border border-gray-border rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary"
      >
        <option value="">Semua</option>
        <option value="Otomatis">Otomatis</option>
        <option value="Manual">Manual</option>
      </select>
    </div>

    <!-- Status -->
    <div>
      <label class="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Status</label>
      <select
        v-model="store.filters.status"
        @change="applyFilter"
        class="w-full px-3 py-2 bg-white border border-gray-border rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary"
      >
        <option value="">Semua</option>
        <option value="Tersedia">Tersedia</option>
        <option value="Booking">Booking</option>
        <option value="Terjual">Terjual</option>
      </select>
    </div>

    <!-- Apply (mobile) -->
    <button
      @click="applyFilter"
      class="w-full lg:hidden py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
    >
      Terapkan Filter
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMotorStore } from '@/stores/motorStore'

const store = useMotorStore()

const emit = defineEmits<{
  applied: []
}>()

function applyFilter() {
  store.loadMotors(1)
  emit('applied')
}
</script>
