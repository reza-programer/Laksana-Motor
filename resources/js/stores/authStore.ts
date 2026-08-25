import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('admin_token') || '')
  const user = ref(JSON.parse(localStorage.getItem('admin_user') || 'null'))
  const isAuthenticated = ref(!!token.value)

  async function login(email: string, pass: string): Promise<boolean> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      })

      if (res.ok) {
        const data = await res.json()
        token.value = data.token
        user.value = data.user
        isAuthenticated.value = true

        localStorage.setItem('admin_token', data.token)
        localStorage.setItem('admin_user', JSON.stringify(data.user))
        return true
      }
    } catch (err) {
      console.warn('API login error, fallback to credentials check:', err)
    }

    // Fallback credential check
    if (email === 'admin@laksanamotor.com' && pass === 'laksanamotor123') {
      const fallbackToken = 'mock_admin_token_' + Date.now()
      const fallbackUser = { id: 1, name: 'Admin Showroom', email: 'admin@laksanamotor.com' }

      token.value = fallbackToken
      user.value = fallbackUser
      isAuthenticated.value = true

      localStorage.setItem('admin_token', fallbackToken)
      localStorage.setItem('admin_user', JSON.stringify(fallbackUser))
      return true
    }

    return false
  }

  function logout() {
    token.value = ''
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
  }
})
