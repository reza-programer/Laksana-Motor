<template>
  <div class="h-screen bg-[#F4F4F3] flex overflow-hidden">
    <!-- Desktop Dark Sidebar (Fixed / Sticky - Will NOT scroll with content) -->
    <aside class="hidden lg:flex lg:flex-col w-64 bg-[#141211] text-white border-r border-stone-800 shrink-0 select-none h-screen sticky top-0 z-30">
      <!-- Brand Logo with LM Monogram -->
      <div class="h-20 flex items-center px-6 border-b border-stone-800/80">
        <RouterLink to="/admin/dashboard" class="flex items-center gap-1.5 leading-none">
          <Logo variant="dark" size="sm" />
          <span class="ml-1 text-[9px] font-bold text-stone-400 bg-stone-800/80 px-1.5 py-0.5 rounded uppercase">Admin</span>
        </RouterLink>
      </div>

      <!-- Navigation Section (Separated by Categories) -->
      <div class="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        
        <!-- Category 1: Manajemen Data & Stok -->
        <div>
          <p class="px-3 text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2.5">
            Data & Inventaris Showroom
          </p>
          <nav class="space-y-1">
            <RouterLink
              v-for="item in dataNavItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all"
              :class="isNavActive(item.to) ? 'bg-[#B91C1C] text-white shadow-md shadow-red-900/30' : 'text-stone-400 hover:text-white hover:bg-stone-800/60'"
            >
              <div class="flex items-center gap-3">
                <component :is="item.icon" class="w-4 h-4" />
                <span>{{ item.label }}</span>
              </div>
              <span v-if="item.badge" class="px-2 py-0.5 text-[10px] font-bold bg-stone-800 rounded-full text-stone-300">
                {{ item.badge }}
              </span>
            </RouterLink>
          </nav>
        </div>

        <!-- Category 2: Tampilan & Branding Website -->
        <div>
          <p class="px-3 text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2.5">
            Tampilan & Branding
          </p>
          <nav class="space-y-1">
            <RouterLink
              v-for="item in brandingNavItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all"
              :class="isNavActive(item.to) ? 'bg-[#B91C1C] text-white shadow-md shadow-red-900/30' : 'text-stone-400 hover:text-white hover:bg-stone-800/60'"
            >
              <div class="flex items-center gap-3">
                <component :is="item.icon" class="w-4 h-4" />
                <span>{{ item.label }}</span>
              </div>
              <span v-if="item.badge" class="px-2 py-0.5 text-[10px] font-bold bg-[#EF4444]/20 text-red-300 border border-red-500/30 rounded-full">
                {{ item.badge }}
              </span>
            </RouterLink>
          </nav>
        </div>

        <!-- Quick Info in Sidebar -->
        <div class="px-3 py-3.5 bg-stone-900/60 border border-stone-800/80 rounded-2xl">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p class="text-[11px] font-bold text-stone-300">Sistem Terhubung</p>
          </div>
          <p class="text-[10px] text-stone-500 mt-0.5">Laksana Motor System v2.0</p>
        </div>
      </div>
    </aside>

    <!-- Main Workspace (Independent Scrollable Container) -->
    <div class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      
      <!-- Responsive Top Bar Header (Compact on mobile) -->
      <header class="h-16 sm:h-20 bg-white border-b border-stone-200 px-4 sm:px-8 flex items-center justify-between shadow-xs shrink-0 z-20">
        <!-- Left: Mobile Menu Toggle & Title -->
        <div class="flex items-center gap-2.5 sm:gap-4 min-w-0">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="lg:hidden p-1.5 -ml-1 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 shrink-0"
            aria-label="Menu"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div class="min-w-0">
            <p class="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-widest truncate hidden xs:block">Backoffice</p>
            <h2 class="text-sm sm:text-lg font-extrabold text-stone-900 tracking-tight leading-tight truncate">Laksana Motor</h2>
          </div>
        </div>

        <!-- Right: Action Buttons (Lihat Website & Logout Di Bagian Atas) + User Profile -->
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <!-- Lihat Website Button (Hidden on very small mobile, visible on tablet+) -->
          <RouterLink
            to="/"
            target="_blank"
            class="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200/80 rounded-xl transition-all shadow-xs"
          >
            <svg class="w-3.5 h-3.5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Website</span>
          </RouterLink>

          <!-- Keluar / Logout Button (Compact & Clean on Mobile) -->
          <button
            @click="handleLogout"
            class="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200/80 rounded-xl transition-all shadow-xs"
          >
            <svg class="w-3.5 h-3.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Keluar</span>
          </button>

          <!-- Admin Avatar -->
          <div class="flex items-center gap-2">
            <div class="text-right hidden md:block">
              <p class="text-xs font-bold text-stone-900 leading-tight">Admin</p>
              <p class="text-[10px] text-stone-400">admin@laksanamotor.com</p>
            </div>
            <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-stone-900 text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
              A
            </div>
          </div>
        </div>
      </header>

      <!-- Scrollable Main Content Area with Mobile-Friendly Padding -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <RouterView />
      </main>
    </div>

    <!-- Mobile Drawer Overlay -->
    <teleport to="body">
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="mobileMenuOpen" class="fixed inset-0 z-50 bg-black/60 lg:hidden" @click="mobileMenuOpen = false"></div>
      </transition>
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <div v-if="mobileMenuOpen" class="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-[#141211] text-white shadow-2xl flex flex-col lg:hidden">
          <div class="h-16 flex items-center justify-between px-5 border-b border-stone-800">
            <Logo variant="dark" size="sm" />
            <button @click="mobileMenuOpen = false" class="p-1 text-stone-400 hover:text-white">✕</button>
          </div>
          <nav class="flex-1 p-4 space-y-4 overflow-y-auto">
            <div>
              <p class="px-3 text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Data & Stok</p>
              <div class="space-y-1">
                <RouterLink
                  v-for="item in dataNavItems"
                  :key="item.to"
                  :to="item.to"
                  class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all"
                  :class="isNavActive(item.to) ? 'bg-[#B91C1C] text-white' : 'text-stone-400 hover:text-white'"
                  @click="mobileMenuOpen = false"
                >
                  <component :is="item.icon" class="w-4 h-4" />
                  <span>{{ item.label }}</span>
                </RouterLink>
              </div>
            </div>

            <div>
              <p class="px-3 text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Tampilan & Branding</p>
              <div class="space-y-1">
                <RouterLink
                  v-for="item in brandingNavItems"
                  :key="item.to"
                  :to="item.to"
                  class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all"
                  :class="isNavActive(item.to) ? 'bg-[#B91C1C] text-white' : 'text-stone-400 hover:text-white'"
                  @click="mobileMenuOpen = false"
                >
                  <component :is="item.icon" class="w-4 h-4" />
                  <span>{{ item.label }}</span>
                </RouterLink>
              </div>
            </div>
          </nav>

          <div class="p-4 border-t border-stone-800 space-y-1">
            <RouterLink
              to="/"
              target="_blank"
              class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-stone-300 hover:text-white bg-stone-900/60"
            >
              <span>↗ Lihat Website Showroom</span>
            </RouterLink>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import Logo from '@/components/Logo.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)

const DashboardIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' })
])

const LogoIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' })
])

const HeroSettingIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' })
])

const MotorIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' })
])

const PromoIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' })
])

const TestimonialIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' })
])

const dataNavItems = [
  { to: '/admin/dashboard', label: 'Dashboard Utama', icon: DashboardIcon, badge: '' },
  { to: '/admin/motors', label: 'Kelola Stok Motor', icon: MotorIcon, badge: '6' },
  { to: '/admin/promos', label: 'Kelola Promo', icon: PromoIcon, badge: '1' },
  { to: '/admin/testimonials', label: 'Kelola Testimoni', icon: TestimonialIcon, badge: '3' },
]

const brandingNavItems = [
  { to: '/admin/logo', label: 'Ganti Logo Showroom', icon: LogoIcon, badge: 'Baru' },
  { to: '/admin/settings', label: 'Background & Hero', icon: HeroSettingIcon, badge: '' },
]

function isNavActive(to: string) {
  if (to === '/admin/dashboard') return route.path === '/admin/dashboard' || route.path === '/admin'
  return route.path.startsWith(to)
}

function handleLogout() {
  authStore.logout()
  router.push('/admin/login')
}
</script>
