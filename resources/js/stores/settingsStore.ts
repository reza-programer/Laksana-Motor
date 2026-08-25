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
  // Hero settings
  const savedBg = localStorage.getItem('hero_bg_image') || HERO_PRESETS[0].url
  const savedTitle1 = localStorage.getItem('hero_title_1') || 'Motor Bekas'
  const savedTitle2 = localStorage.getItem('hero_title_2') || 'Berkualitas,'
  const savedAccent = localStorage.getItem('hero_accent') || 'Siap Jalan.'
  const savedSubtitle = localStorage.getItem('hero_subtitle') || 'Temukan motor bekas pilihan dengan kondisi terbaik, harga transparan, dan proses pembelian yang mudah di Laksana Motor.'

  // Logo settings
  const savedCustomLogo = localStorage.getItem('custom_logo_url') || ''
  const savedLogoText1 = localStorage.getItem('logo_text_1') || 'LAKSANA'
  const savedLogoText2 = localStorage.getItem('logo_text_2') || 'MOTOR'

  const heroBgImage = ref(savedBg)
  const heroTitle1 = ref(savedTitle1)
  const heroTitle2 = ref(savedTitle2)
  const heroAccent = ref(savedAccent)
  const heroSubtitle = ref(savedSubtitle)

  const customLogoUrl = ref(savedCustomLogo)
  const logoText1 = ref(savedLogoText1)
  const logoText2 = ref(savedLogoText2)

  function updateHeroSettings(newSettings: {
    bgImage?: string
    title1?: string
    title2?: string
    accent?: string
    subtitle?: string
  }) {
    if (newSettings.bgImage) {
      heroBgImage.value = newSettings.bgImage
      localStorage.setItem('hero_bg_image', newSettings.bgImage)
    }
    if (newSettings.title1) {
      heroTitle1.value = newSettings.title1
      localStorage.setItem('hero_title_1', newSettings.title1)
    }
    if (newSettings.title2) {
      heroTitle2.value = newSettings.title2
      localStorage.setItem('hero_title_2', newSettings.title2)
    }
    if (newSettings.accent) {
      heroAccent.value = newSettings.accent
      localStorage.setItem('hero_accent', newSettings.accent)
    }
    if (newSettings.subtitle) {
      heroSubtitle.value = newSettings.subtitle
      localStorage.setItem('hero_subtitle', newSettings.subtitle)
    }
  }

  function updateLogoSettings(newSettings: {
    logoUrl?: string
    text1?: string
    text2?: string
  }) {
    if (newSettings.logoUrl !== undefined) {
      customLogoUrl.value = newSettings.logoUrl
      localStorage.setItem('custom_logo_url', newSettings.logoUrl)
    }
    if (newSettings.text1) {
      logoText1.value = newSettings.text1
      localStorage.setItem('logo_text_1', newSettings.text1)
    }
    if (newSettings.text2) {
      logoText2.value = newSettings.text2
      localStorage.setItem('logo_text_2', newSettings.text2)
    }
  }

  function resetHeroSettings() {
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
  }

  function resetLogoSettings() {
    customLogoUrl.value = ''
    logoText1.value = 'LAKSANA'
    logoText2.value = 'MOTOR'
    localStorage.removeItem('custom_logo_url')
    localStorage.removeItem('logo_text_1')
    localStorage.removeItem('logo_text_2')
  }

  return {
    heroBgImage,
    heroTitle1,
    heroTitle2,
    heroAccent,
    heroSubtitle,
    customLogoUrl,
    logoText1,
    logoText2,
    updateHeroSettings,
    updateLogoSettings,
    resetHeroSettings,
    resetLogoSettings,
  }
})
