<template>
  <footer id="kontak" class="bg-[#110E0D] text-white pt-16 pb-10 border-t border-stone-800 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Grid with Staggered Scroll Reveal -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-stone-800/80">
        
        <!-- Col 1: Brand & Bio (Col 4) -->
        <div v-reveal="{ delay: 0 }" class="lg:col-span-4 space-y-5">
          <RouterLink to="/" class="inline-flex items-center gap-1.5 leading-none">
            <Logo variant="dark" size="lg" />
          </RouterLink>

          <p class="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
            Showroom motor bekas pilihan dan bergaransi di Jalaksana, Kuningan. Menyediakan unit berkualitas prima, harga jujur dan transparan, serta jaminan keaslian surat-surat kendaraan.
          </p>

          <!-- Social / Chat Buttons -->
          <div class="flex items-center gap-2.5 pt-1">
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-400 hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp Showroom</span>
            </a>

            <a
              :href="'https://instagram.com/' + showroomInfo.instagram.replace('@', '')"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/15 border border-white/10 text-stone-300 hover:text-white rounded-xl text-xs font-semibold transition-all"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>{{ showroomInfo.instagram }}</span>
            </a>
          </div>
        </div>

        <!-- Col 2: Navigasi Cepat & Info Showroom (Col 3) -->
        <div v-reveal="{ delay: 100 }" class="lg:col-span-3 space-y-4">
          <h3 class="text-xs font-bold text-white uppercase tracking-widest text-[#EF4444]">
            Navigasi Cepat
          </h3>
          <ul class="space-y-2.5 text-xs sm:text-sm">
            <li>
              <RouterLink to="/" class="text-stone-300 hover:text-white transition-colors">
                Beranda Utama
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/katalog" class="text-stone-300 hover:text-white transition-colors">
                Katalog Stok Motor
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/#promo" class="text-stone-300 hover:text-white transition-colors">
                Promo & Diskon
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/#tentang" class="text-stone-300 hover:text-white transition-colors">
                Keunggulan & Garansi
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/admin/login" class="text-stone-500 hover:text-stone-300 transition-colors">
                Portal Admin
              </RouterLink>
            </li>
          </ul>

          <div class="pt-2">
            <h4 class="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">Jam Buka Showroom</h4>
            <div class="space-y-1 text-xs text-stone-300 bg-white/5 p-3 rounded-xl border border-white/5">
              <p class="flex justify-between"><span class="text-stone-400">Senin - Sabtu:</span> <span class="font-semibold text-white">08.30 - 17.30</span></p>
              <p class="flex justify-between"><span class="text-stone-400">Minggu:</span> <span class="font-semibold text-white">09.00 - 15.00</span></p>
            </div>
          </div>
        </div>

        <!-- Col 3: Lokasi Showroom & Map Card (Col 5) -->
        <div v-reveal="{ delay: 200 }" class="lg:col-span-5 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-bold text-white uppercase tracking-widest text-[#EF4444]">
              Lokasi Showroom Kami
            </h3>
            <span class="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Buka Setiap Hari
            </span>
          </div>

          <!-- Address Box -->
          <div class="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-xl bg-[#B91C1C]/20 border border-[#B91C1C]/40 text-[#EF4444] flex items-center justify-center shrink-0 mt-0.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs sm:text-sm font-bold text-white leading-snug">Laksana Motor Jalaksana</p>
                <p class="text-xs text-stone-400 mt-1 leading-relaxed">{{ showroomInfo.address }}</p>
              </div>
            </div>

            <!-- Mini Map Preview with Exact Google Maps Embed & Direct Link -->
            <div class="relative rounded-xl overflow-hidden aspect-[21/9] bg-stone-900 border border-white/10 group">
              <iframe
                :src="showroomInfo.mapEmbedUrl"
                class="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                style="border: 0"
                allowfullscreen
                loading="lazy"
              ></iframe>
              <a
                :href="showroomInfo.directMapsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 text-white text-xs font-bold gap-1.5 transition-all"
              >
                <span>Buka di Google Maps</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
        <p>© 2024 Laksana Motor. Hak Cipta Dilindungi.</p>
        <div class="flex items-center gap-4">
          <span class="text-stone-400">Motor Bekas Berkualitas, Siap Jalan.</span>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { SHOWROOM_INFO } from '@/services/mockData'
import { generateWhatsAppUrl } from '@/services/api'
import Logo from '@/components/Logo.vue'

const showroomInfo = SHOWROOM_INFO
const whatsappUrl = generateWhatsAppUrl()
</script>
