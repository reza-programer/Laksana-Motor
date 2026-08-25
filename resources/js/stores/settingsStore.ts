import { defineStore } from 'pinia'
import { ref } from 'vue'

export const HERO_PRESETS = [
  {
    id: 'showroom-1',
    name: 'Showroom Lineup (Utama)',
    url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&auto=format&fit=crop&q=85',
  },
  {
    id: 'showroom-2',
    name: 'Modern Dealership Hall',
    url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1920&auto=format&fit=crop&q=85',
  },
  {
    id: 'showroom-3',
    name: 'Sportbike Studio Showcase',
    url: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1920&auto=format&fit=crop&q=85',
  },
  {
    id: 'showroom-4',
    name: 'Scooter & Matic Lineup',
    url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1920&auto=format&fit=crop&q=85',
  },
]

export const useSettingsStore = defineStore('settings', () => {
  // Initial state from localStorage or defaults
  const heroBgImage = ref(localStorage.getItem('hero_bg_image') || HERO_PRESETS[0].url)
  const heroTitle1 = ref(localStorage.getItem('hero_title_1') || 'Motor Bekas')
  const heroTitle2 = ref(localStorage.getItem('hero_title_2') || 'Berkualitas,')
  const heroAccent = ref(localStorage.getItem('hero_accent') || 'Siap Jalan.')
  const heroSubtitle = ref(localStorage.getItem('hero_subtitle') || 'Temukan motor bekas pilihan dengan kondisi terbaik, harga transparan, dan proses pembelian yang mudah di Laksana Motor.')

  const customLogoUrl = ref(localStorage.getItem('custom_logo_url') || '')
  const logoText1 = ref(localStorage.getItem('logo_text_1') || 'LAKSANA')
  const logoText2 = ref(localStorage.getItem('logo_text_2') || 'MOTOR')

  // Sync settings with MySQL backend API
  async function fetchRemoteSettings() {
    try {
      const res = await fetch('/api/settings')
      if (res.ok) {
        const data = await res.json()
        if (data.hero_bg_image) {
          heroBgImage.value = data.hero_bg_image
          localStorage.setItem('hero_bg_image', data.hero_bg_image)
        }
        if (data.hero_title_1) {
          heroTitle1.value = data.hero_title_1
          localStorage.setItem('hero_title_1', data.hero_title_1)
        }
        if (data.hero_title_2) {
          heroTitle2.value = data.hero_title_2
          localStorage.setItem('hero_title_2', data.hero_title_2)
        }
        if (data.hero_accent) {
          heroAccent.value = data.hero_accent
          localStorage.setItem('hero_accent', data.hero_accent)
        }
        if (data.hero_subtitle) {
          heroSubtitle.value = data.hero_subtitle
          localStorage.setItem('hero_subtitle', data.hero_subtitle)
        }
        if (data.custom_logo_url !== undefined) {
          customLogoUrl.value = data.custom_logo_url
          localStorage.setItem('custom_logo_url', data.custom_logo_url)
        }
        if (data.logo_text_1) {
          logoText1.value = data.logo_text_1
          localStorage.setItem('logo_text_1', data.logo_text_1)
        }
        if (data.logo_text_2) {
          logoText2.value = data.logo_text_2
          localStorage.setItem('logo_text_2', data.logo_text_2)
        }
      }
    } catch (err) {
      console.warn('Could not fetch remote settings:', err)
    }
  }

  async function updateHeroSettings(newSettings: {
    bgImage?: string
    title1?: string
    title2?: string
    accent?: string
    subtitle?: string
  }) {
    const payload: Record<string, string> = {}

    if (newSettings.bgImage) {
      heroBgImage.value = newSettings.bgImage
      localStorage.setItem('hero_bg_image', newSettings.bgImage)
      payload['hero_bg_image'] = newSettings.bgImage
    }
    if (newSettings.title1) {
      heroTitle1.value = newSettings.title1
      localStorage.setItem('hero_title_1', newSettings.title1)
      payload['hero_title_1'] = newSettings.title1
    }
    if (newSettings.title2) {
      heroTitle2.value = newSettings.title2
      localStorage.setItem('hero_title_2', newSettings.title2)
      payload['hero_title_2'] = newSettings.title2
    }
    if (newSettings.accent) {
      heroAccent.value = newSettings.accent
      localStorage.setItem('hero_accent', newSettings.accent)
      payload['hero_accent'] = newSettings.accent
    }
    if (newSettings.subtitle) {
      heroSubtitle.value = newSettings.subtitle
      localStorage.setItem('hero_subtitle', newSettings.subtitle)
      payload['hero_subtitle'] = newSettings.subtitle
    }

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      console.warn('API update error:', err)
    }
  }

  async function updateLogoSettings(newSettings: {
    logoUrl?: string
    text1?: string
    text2?: string
  }) {
    const payload: Record<string, string> = {}

    if (newSettings.logoUrl !== undefined) {
      customLogoUrl.value = newSettings.logoUrl
      localStorage.setItem('custom_logo_url', newSettings.logoUrl)
      payload['custom_logo_url'] = newSettings.logoUrl
    }
    if (newSettings.text1) {
      logoText1.value = newSettings.text1
      localStorage.setItem('logo_text_1', newSettings.text1)
      payload['logo_text_1'] = newSettings.text1
    }
    if (newSettings.text2) {
      logoText2.value = newSettings.text2
      localStorage.setItem('logo_text_2', newSettings.text2)
      payload['logo_text_2'] = newSettings.text2
    }

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      console.warn('API logo update error:', err)
    }
  }

  async function resetHeroSettings() {
    heroBgImage.value = HERO_PRESETS[0].url
    heroTitle1.value = 'Motor Bekas'
    heroTitle2.value = 'Berkualitas,'
    heroAccent.value = 'Siap Jalan.'
    heroSubtitle.value = 'Temukan motor bekas pilihan dengan kondisi terbaik, harga transparan, dan proses pembelian yang mudah di Laksana Motor.'

    localStorage.removeItem('hero_bg_image')
    localStorage.removeItem('hero_title_1')
    localStorage.removeItem('hero_title_2')
    localStorage.removeItem('hero_accent')
    localStorage.removeItem('hero_subtitle')

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hero_bg_image: HERO_PRESETS[0].url,
          hero_title_1: 'Motor Bekas',
          hero_title_2: 'Berkualitas,',
          hero_accent: 'Siap Jalan.',
          hero_subtitle: 'Temukan motor bekas pilihan dengan kondisi terbaik, harga transparan, dan proses pembelian yang mudah di Laksana Motor.',
        }),
      })
    } catch (err) {
      console.warn('API reset error:', err)
    }
  }

  async function resetLogoSettings() {
    customLogoUrl.value = ''
    logoText1.value = 'LAKSANA'
    logoText2.value = 'MOTOR'
    localStorage.removeItem('custom_logo_url')
    localStorage.removeItem('logo_text_1')
    localStorage.removeItem('logo_text_2')

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          custom_logo_url: '',
          logo_text_1: 'LAKSANA',
          logo_text_2: 'MOTOR',
        }),
      })
    } catch (err) {
      console.warn('API logo reset error:', err)
    }
  }

  // Fetch remote settings on startup
  fetchRemoteSettings()

  return {
    heroBgImage,
    heroTitle1,
    heroTitle2,
    heroAccent,
    heroSubtitle,
    customLogoUrl,
    logoText1,
    logoText2,
    fetchRemoteSettings,
    updateHeroSettings,
    updateLogoSettings,
    resetHeroSettings,
    resetLogoSettings,
  }
})
