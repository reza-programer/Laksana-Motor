<template>
  <div class="space-y-8 max-w-4xl mx-auto pb-12">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
      <div>
        <h1 class="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
          Pengaturan Logo Showroom
        </h1>
        <p class="text-xs sm:text-sm text-stone-500 mt-1">
          Upload file logo custom showroom Anda atau gunakan logo standar emblem LM.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="resetDefaultLogo"
          class="px-3.5 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all"
        >
          Reset Logo Default LM
        </button>
        <button
          @click="saveLogoChanges"
          class="inline-flex items-center gap-2 px-5 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95"
        >
          <span>Simpan Logo</span>
        </button>
      </div>
    </div>

    <!-- Success Toast -->
    <div v-if="savedToast" class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-bold flex items-center justify-between shadow-sm animate-scale-in">
      <div class="flex items-center gap-2.5">
        <span class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</span>
        <span>Logo showroom berhasil disimpan! Tampilan di seluruh website & admin otomatis terupdate.</span>
      </div>
      <RouterLink to="/" target="_blank" class="underline text-emerald-900">Lihat Halaman Depan →</RouterLink>
    </div>

    <!-- Live Preview Comparison Card (Light Navbar vs Dark Footer/Sidebar) -->
    <div class="space-y-3">
      <h2 class="text-xs font-bold text-stone-400 uppercase tracking-widest">
        Live Pratinjau Logo di Website
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Light Mode Preview (Navbar) -->
        <div class="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Preview di Navbar Putih</span>
            <span class="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-[10px] font-semibold">Header Utama</span>
          </div>
          <div class="h-16 flex items-center px-4 bg-stone-50/80 rounded-xl border border-stone-100">
            <Logo variant="light" size="md" />
          </div>
        </div>

        <!-- Dark Mode Preview (Footer & Admin Sidebar) -->
        <div class="p-6 bg-[#141211] text-white rounded-2xl border border-stone-800 shadow-xs space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Preview di Background Gelap</span>
            <span class="px-2 py-0.5 bg-stone-800 text-stone-300 rounded text-[10px] font-semibold">Footer / Admin</span>
          </div>
          <div class="h-16 flex items-center px-4 bg-black/40 rounded-xl border border-white/5">
            <Logo variant="dark" size="md" />
          </div>
        </div>
      </div>
    </div>

    <!-- Upload & Text Customizer -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Upload Logo Box (Col 7) -->
      <div class="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-5">
        <div>
          <h3 class="font-extrabold text-stone-900 text-sm">Upload File Logo Baru</h3>
          <p class="text-xs text-stone-500 mt-0.5">Disarankan file logo berformat PNG transparan atau SVG/JPG persegi.</p>
        </div>

        <!-- Dropzone -->
        <div
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleFileDrop"
          class="relative border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer"
          :class="isDragging ? 'border-[#B91C1C] bg-red-50/50' : 'border-stone-300 hover:border-stone-400 bg-stone-50/60'"
          @click="fileInputRef?.click()"
        >
          <input
            ref="fileInputRef"
            type="file"
            accept="image/png, image/jpeg, image/webp, image/svg+xml"
            class="hidden"
            @change="handleFileSelect"
          />

          <div v-if="isProcessing" class="py-4 space-y-2">
            <div class="w-8 h-8 border-3 border-stone-200 border-t-[#B91C1C] rounded-full animate-spin mx-auto"></div>
            <p class="text-xs font-bold text-stone-700">Memproses logo...</p>
          </div>

          <div v-else class="space-y-2.5">
            <div class="w-10 h-10 bg-white text-[#B91C1C] border border-stone-200 rounded-xl flex items-center justify-center mx-auto shadow-xs">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p class="text-xs font-bold text-stone-800">
              <span class="text-[#B91C1C] underline">Pilih file logo</span> atau drag file ke sini
            </p>
            <p class="text-[10px] text-stone-400">
              Mendukung: <strong>PNG Transparan, JPG, SVG, WebP</strong>
            </p>
          </div>
        </div>

        <div v-if="uploadStatus" class="p-3 bg-stone-100 rounded-xl text-xs text-stone-800 font-bold flex items-center justify-between">
          <span>{{ uploadStatus }}</span>
          <button type="button" @click="uploadStatus = ''" class="text-stone-400 hover:text-stone-700">✕</button>
        </div>
      </div>

      <!-- Text Brand Customizer (Col 5) -->
      <div class="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div>
          <h3 class="font-extrabold text-stone-900 text-sm">Teks Nama Showroom</h3>
          <p class="text-xs text-stone-500 mt-0.5">Teks yang mendampingi logo di seluruh header website.</p>
        </div>

        <div class="space-y-3 text-xs">
          <div>
            <label class="block font-bold text-stone-700 mb-1">Nama Depan (Hitam/Putih)</label>
            <input
              v-model="text1"
              type="text"
              class="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900 focus:outline-none focus:border-[#B91C1C]"
            />
          </div>

          <div>
            <label class="block font-bold text-stone-700 mb-1">Nama Belakang (Aksen Merah)</label>
            <input
              v-model="text2"
              type="text"
              class="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold text-[#B91C1C] focus:outline-none focus:border-[#B91C1C]"
            />
          </div>
        </div>

        <button
          type="button"
          @click="saveLogoChanges"
          class="w-full py-3 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-98 mt-2"
        >
          Simpan Logo & Teks
        </button>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useSettingsStore } from '@/stores/settingsStore'
import Logo from '@/components/Logo.vue'

const settingsStore = useSettingsStore()
const savedToast = ref(false)
const isDragging = ref(false)
const isProcessing = ref(false)
const uploadStatus = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

const text1 = ref(settingsStore.logoText1)
const text2 = ref(settingsStore.logoText2)

function processLogoFile(file: File) {
  isProcessing.value = true
  const reader = new FileReader()

  reader.onload = (e) => {
    const dataUrl = e.target?.result as string
    settingsStore.updateLogoSettings({
      logoUrl: dataUrl,
      text1: text1.value,
      text2: text2.value,
    })
    uploadStatus.value = `✓ Logo "${file.name}" berhasil dimuat.`
    isProcessing.value = false
    savedToast.value = true
    setTimeout(() => {
      savedToast.value = false
    }, 4000)
  }

  reader.readAsDataURL(file)
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    processLogoFile(target.files[0])
  }
}

function handleFileDrop(event: DragEvent) {
  isDragging.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    processLogoFile(event.dataTransfer.files[0])
  }
}

function saveLogoChanges() {
  settingsStore.updateLogoSettings({
    text1: text1.value,
    text2: text2.value,
  })

  savedToast.value = true
  setTimeout(() => {
    savedToast.value = false
  }, 4000)
}

function resetDefaultLogo() {
  if (confirm('Kembalikan logo ke emblem default LM?')) {
    settingsStore.resetLogoSettings()
    text1.value = 'LAKSANA'
    text2.value = 'MOTOR'
    uploadStatus.value = '✓ Logo direset ke emblem default LM.'
  }
}
</script>
