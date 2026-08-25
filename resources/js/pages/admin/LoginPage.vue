<template>
  <div class="min-h-screen bg-[#F8F8F7] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
    <!-- Subtle Background Lighting & Pattern -->
    <div class="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-red-100/50 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-stone-200/60 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Login Container -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Brand Header with LM Monogram (Light Mode) -->
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-flex items-center gap-1.5 leading-none mb-3 group">
          <Logo variant="light" size="lg" />
        </RouterLink>
        <p class="text-xs sm:text-sm font-semibold text-stone-500">Portal Manajemen Showroom Otomotif</p>
      </div>

      <!-- Clean White Card -->
      <div class="bg-white border border-stone-200/80 rounded-3xl p-7 sm:p-9 shadow-xl shadow-stone-200/60 space-y-6">
        <div>
          <h2 class="text-xl font-black text-stone-900 tracking-tight">Masuk ke Dashboard</h2>
          <p class="text-xs text-stone-500 mt-1">Gunakan akun admin showroom untuk mengelola data motor.</p>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-center gap-2.5 animate-scale-in">
          <svg class="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ error }}</span>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Email Admin
            </label>
            <div class="relative">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="admin@laksanamotor.com"
                class="w-full pl-10 pr-4 py-3 bg-stone-50/70 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:border-[#B91C1C] focus:ring-2 focus:ring-red-500/10 transition-all"
              />
              <svg class="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label for="password" class="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                Password
              </label>
            </div>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="w-full pl-10 pr-12 py-3 bg-stone-50/70 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:border-[#B91C1C] focus:ring-2 focus:ring-red-500/10 transition-all"
              />
              <svg class="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <!-- Show/Hide Password Toggle -->
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-semibold"
              >
                {{ showPassword ? 'Sembunyi' : 'Lihat' }}
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full py-3.5 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-sm font-bold rounded-xl shadow-lg shadow-red-900/20 hover:shadow-red-900/30 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 mt-4"
          >
            <span v-if="!submitting">Masuk ke Dashboard</span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memverifikasi...
            </span>
          </button>
        </form>
      </div>

      <!-- Back to website -->
      <div class="text-center mt-6">
        <RouterLink to="/" class="text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors">
          ← Kembali ke Website Showroom
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import Logo from '@/components/Logo.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)
const showPassword = ref(false)

async function handleLogin() {
  error.value = ''
  submitting.value = true
  try {
    const success = await authStore.login(email.value, password.value)
    if (success) {
      router.push('/admin/dashboard')
    } else {
      error.value = 'Email atau password salah. Pastikan kredensial admin benar.'
    }
  } finally {
    submitting.value = false
  }
}
</script>
