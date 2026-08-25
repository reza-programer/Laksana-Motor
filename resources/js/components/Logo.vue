<template>
  <div class="inline-flex items-center gap-2.5 select-none">
    <!-- 1. If Custom Logo is uploaded -->
    <div
      v-if="settingsStore.customLogoUrl"
      class="relative flex items-center justify-center rounded-xl overflow-hidden shrink-0"
      :class="badgeSizeClasses"
    >
      <img
        :src="settingsStore.customLogoUrl"
        alt="Logo Showroom"
        class="w-full h-full object-contain"
      />
    </div>

    <!-- 2. Otherwise Render Default LM Monogram Emblem Badge -->
    <div
      v-else
      class="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#DC2626] via-[#B91C1C] to-[#7F1D1D] shadow-md shadow-red-950/20 shrink-0 transform transition-transform group-hover:scale-105"
      :class="badgeSizeClasses"
    >
      <!-- Metallic sheen line -->
      <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-xl pointer-events-none"></div>

      <!-- LM Monogram SVG -->
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-full p-1.5"
      >
        <!-- Letter L (Left italic wing) -->
        <path
          d="M20 22 H34 V64 H60 V76 H20 V22 Z"
          fill="white"
          fill-rule="evenodd"
          class="drop-shadow-sm"
        />
        <!-- Letter M (Right sharp dynamic wing) -->
        <path
          d="M44 22 H56 L68 52 L80 22 H92 V76 H80 V42 L71 65 H65 L56 42 V76 H44 V22 Z"
          fill="#FEE2E2"
          class="drop-shadow-sm"
        />
        <!-- Speed accent slash -->
        <polygon
          points="20,82 85,82 82,87 17,87"
          fill="white"
          opacity="0.9"
        />
      </svg>
    </div>

    <!-- Text Brand (Optional & Dynamic from settingsStore) -->
    <div v-if="showText" class="flex flex-col leading-none">
      <div class="flex items-center gap-1.5">
        <span
          class="font-black tracking-tight"
          :class="variant === 'dark' ? 'text-white' : 'text-stone-900', textSizeClasses"
        >
          {{ settingsStore.logoText1 || 'LAKSANA' }}
        </span>
        <span
          class="font-black tracking-tight text-[#EF4444]"
          :class="textSizeClasses"
        >
          {{ settingsStore.logoText2 || 'MOTOR' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settingsStore'

const settingsStore = useSettingsStore()

const props = withDefaults(
  defineProps<{
    variant?: 'light' | 'dark'
    size?: 'sm' | 'md' | 'lg'
    showText?: boolean
  }>(),
  {
    variant: 'light',
    size: 'md',
    showText: true,
  }
)

const badgeSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-7 h-7'
    case 'lg':
      return 'w-12 h-12'
    case 'md':
    default:
      return 'w-9 h-9'
  }
})

const textSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-base'
    case 'lg':
      return 'text-2xl'
    case 'md':
    default:
      return 'text-xl'
  }
})
</script>
