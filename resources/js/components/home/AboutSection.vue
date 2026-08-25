<template>
  <section id="tentang" class="py-16 lg:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Image -->
        <div class="aspect-[4/3] rounded-xl overflow-hidden bg-gray-bg">
          <img
            src="https://placehold.co/800x600/e7e5e4/78716c?text=Showroom+Laksana+Motor"
            alt="Showroom Laksana Motor"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Content -->
        <div class="space-y-5">
          <h2 class="text-2xl sm:text-3xl font-bold text-charcoal">Tentang Laksana Motor</h2>
          <p class="text-gray-text leading-relaxed">
            Laksana Motor adalah showroom motor bekas terpercaya yang berkomitmen menyediakan unit berkualitas dengan harga yang transparan. Kami percaya bahwa membeli motor bekas seharusnya menjadi pengalaman yang menyenangkan dan bebas kekhawatiran.
          </p>
          <p class="text-gray-text leading-relaxed">
            Setiap unit yang kami jual telah melalui proses seleksi dan pengecekan menyeluruh. Kami memastikan kondisi mesin, body, kelistrikan, dan kelengkapan surat sebelum unit ditawarkan kepada customer.
          </p>
          <ul class="space-y-3">
            <li v-for="point in points" :key="point" class="flex items-start gap-3">
              <svg class="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-gray-text">{{ point }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const points = [
  'Berpengalaman melayani puluhan customer',
  'Unit dicek menyeluruh sebelum dijual',
  'Harga transparan tanpa biaya tersembunyi',
  'Proses pembelian cepat dan mudah',
  'Layanan after-sales yang responsif',
]
</script>
