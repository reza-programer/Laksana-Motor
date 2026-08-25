import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AdminUser } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AdminUser | null>(null)
  const token = ref<string | null>(localStorage.getItem('admin_token'))

  const isLoggedIn = computed(() => !!token.value)

  async function login(email: string, password: string): Promise<boolean> {
    // Mock login — replace with real API call later
    if (email === 'admin@laksanamotor.com' && password === 'password') {
      user.value = { id: 1, name: 'Admin', email }
      token.value = 'mock-jwt-token-laksana-motor'
      localStorage.setItem('admin_token', token.value)
      return true
    }
    return false
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('admin_token')
  }

  function checkAuth() {
    const stored = localStorage.getItem('admin_token')
    if (stored) {
      token.value = stored
      user.value = { id: 1, name: 'Admin', email: 'admin@laksanamotor.com' }
    }
  }

  return { user, token, isLoggedIn, login, logout, checkAuth }
})
