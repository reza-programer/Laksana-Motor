<template>
  <section id="tentang" class="py-16 lg:py-22 bg-white border-y border-stone-200 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header with Scroll Reveal -->
      <div v-reveal class="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-stone-200 gap-4">
        <div>
          <p class="text-xs font-bold text-[#B91C1C] uppercase tracking-widest mb-1">
            Standar Kualitas & Layanan
          </p>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Kenapa Beli di Laksana Motor?
          </h2>
        </div>
        <p class="text-xs sm:text-sm text-stone-500 max-w-md">
          Komitmen kami memberikan rasa aman, transparansi penuh, dan kepuasan bagi setiap pembeli motor bekas.
        </p>
      </div>

      <!-- 5-Column Editorial Grid with Staggered Scroll Reveal -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-200">
        <div
          v-for="(item, index) in advantages"
          :key="item.title"
          v-reveal="{ delay: index * 80 }"
          class="pt-6 md:pt-0 md:px-4 first:pl-0 last:pr-0 space-y-3"
        >
          <!-- Structured Step Number with Red Accent -->
          <div class="flex items-center gap-2">
            <span class="text-xs font-black text-[#B91C1C] tracking-widest font-mono">
              0{{ index + 1 }}
            </span>
            <div class="h-px bg-stone-300 w-6"></div>
          </div>

          <h3 class="font-extrabold text-stone-900 text-base tracking-tight leading-snug">
            {{ item.title }}
          </h3>

          <p class="text-xs text-stone-600 leading-relaxed font-normal">
            {{ item.description }}
          </p>
        </div>
      </div>

      <!-- Trust Bar / Checklist Footer with Scroll Reveal -->
      <div v-reveal="{ delay: 350 }" class="mt-14 pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-stone-700 bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200/60 shadow-xs">
        <div class="flex items-center gap-2.5">
          <span class="w-5 h-5 rounded-full bg-red-100 text-[#B91C1C] flex items-center justify-center text-xs font-black">✓</span>
          <span>Pengecekan Mesin & Rangka</span>
        </div>
        <div class="flex items-center gap-2.5">
          <span class="w-5 h-5 rounded-full bg-red-100 text-[#B91C1C] flex items-center justify-center text-xs font-black">✓</span>
          <span>Bukan Bekas Tabrakan / Banjir</span>
        </div>
        <div class="flex items-center gap-2.5">
          <span class="w-5 h-5 rounded-full bg-red-100 text-[#B91C1C] flex items-center justify-center text-xs font-black">✓</span>
          <span>Keabsahan STNK & BPKB 100% Sah</span>
        </div>
        <div class="flex items-center gap-2.5">
          <span class="w-5 h-5 rounded-full bg-red-100 text-[#B91C1C] flex items-center justify-center text-xs font-black">✓</span>
          <span>Bisa Test Drive di Tempat</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const advantages = [
  {
    title: 'Unit Pilihan & Teruji',
    description: 'Semua motor diseleksi ketat melalui proses inspeksi mekanik berpengalaman sebelum masuk showroom.',
  },
  {
    title: 'Kondisi Transparan',
    description: 'Foto asli dan riwayat unit dijelaskan apa adanya tanpa ada cacat atau minus yang ditutup-tutupi.',
  },
  {
    title: 'Dokumen Sah & Lengkap',
    description: 'STNK, BPKB, dan Faktur terjamin asli, legal, dan siap untuk proses balik nama pembeli.',
  },
  {
    title: 'Harga Jujur & Bersaing',
    description: 'Harga realistis sesuai kondisi fisik dan mesin kendaraan tanpa biaya tersembunyi.',
  },
  {
    title: 'Proses Cepat & Mudah',
    description: 'Bisa langsung cek unit, negosiasi langsung, dan bawa pulang motor di hari yang sama.',
  },
]
</script>
