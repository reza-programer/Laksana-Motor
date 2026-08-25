<template>
  <section class="py-16 lg:py-22 bg-[#FAFAF9] border-b border-stone-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header with Scroll Reveal -->
      <div v-reveal class="flex items-end justify-between mb-10">
        <div>
          <p class="text-xs font-bold text-[#B91C1C] uppercase tracking-widest mb-1">
            Testimoni Customer
          </p>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Apa Kata Mereka?
          </h2>
        </div>
        <span class="text-xs sm:text-sm font-semibold text-stone-500 hidden sm:inline-block">
          Ulasan Pembeli Terverifikasi
        </span>
      </div>

      <!-- Testimonials Grid with Staggered Scroll Reveal -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          v-reveal="{ delay: index * 120 }"
          class="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div>
            <!-- 5 Red Stars -->
            <div class="flex items-center gap-1 text-[#B91C1C] mb-4">
              <svg v-for="s in 5" :key="s" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>

            <!-- Content -->
            <p class="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
              "{{ testimonial.content }}"
            </p>
          </div>

          <!-- Customer Info -->
          <div class="flex items-center gap-3.5 mt-6 pt-5 border-t border-stone-100">
            <img
              :src="testimonial.image"
              :alt="testimonial.name"
              class="w-11 h-11 rounded-full object-cover border border-stone-200 shadow-xs"
            />
            <div>
              <p class="text-sm font-bold text-stone-900 leading-tight">{{ testimonial.name }}</p>
              <p class="text-xs text-stone-500 mt-0.5 font-medium">{{ testimonial.motor }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Testimonial } from '@/types'
import { fetchTestimonials } from '@/services/api'

const testimonials = ref<Testimonial[]>([])

onMounted(async () => {
  testimonials.value = await fetchTestimonials(true)
})
</script>
