<template>
  <div class="min-h-screen bg-white">
    <HeroSection />
    <FeaturedMotors />
    <PromoSection />
    <AdvantagesSection />
    <TestimonialSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import FeaturedMotors from '@/components/home/FeaturedMotors.vue'
import PromoSection from '@/components/home/PromoSection.vue'
import AdvantagesSection from '@/components/home/AdvantagesSection.vue'
import TestimonialSection from '@/components/home/TestimonialSection.vue'
</script>
