<template>
  <div class="space-y-8 max-w-5xl mx-auto pb-12">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
      <div>
        <h1 class="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
          Pengaturan Tampilan Hero & Background
        </h1>
        <p class="text-xs sm:text-sm text-stone-500 mt-1">
          Upload foto latar belakang (*background*), pilih preset, atau edit teks headline utama di halaman beranda.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="resetDefaults"
          class="px-3.5 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all"
        >
          Reset Default
        </button>
        <button
          @click="saveChanges"
          class="inline-flex items-center gap-2 px-5 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95"
        >
          <span>Simpan Perubahan</span>
        </button>
      </div>
    </div>

    <!-- Success Toast -->
    <div v-if="savedToast" class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-bold flex items-center justify-between shadow-sm animate-scale-in">
      <div class="flex items-center gap-2.5">
        <span class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</span>
        <span>Foto Hero dan teks berhasil disimpan! Tampilan di beranda otomatis terupdate.</span>
      </div>
      <RouterLink to="/" target="_blank" class="underline text-emerald-900">Lihat Halaman Depan →</RouterLink>
    </div>

    <!-- Real-time Live Preview Card -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="text-xs font-bold text-stone-400 uppercase tracking-widest">
          Live Preview Tampilan Beranda
        </h2>
        <span class="text-[11px] font-semibold text-stone-500">Pratinjau Langsung</span>
      </div>

      <div class="relative rounded-2xl overflow-hidden bg-[#0C0A09] text-white p-8 sm:p-10 border border-stone-800 shadow-xl min-h-[280px] flex items-center">
        <!-- Live Image Background -->
        <div class="absolute inset-0 z-0">
          <img
            :src="form.bgImage"
            alt="Hero Preview"
            class="w-full h-full object-cover opacity-45 transition-all duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-[#0C0A09] via-[#0C0A09]/80 to-transparent"></div>
        </div>

        <div class="relative z-10 max-w-lg space-y-3">
          <span class="px-2.5 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-stone-300">
            Showroom Motor Bekas Terpercaya
          </span>
          <h3 class="text-2xl sm:text-3xl font-black text-white leading-tight">
            {{ form.title1 }}<br />
            {{ form.title2 }}<br />
            <span class="text-[#EF4444]">{{ form.accent }}</span>
          </h3>
          <p class="text-xs text-stone-300 line-clamp-2">{{ form.subtitle }}</p>
        </div>
      </div>
    </div>

    <!-- Edit Form Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Left: File Upload & Preset Picker (Col 7) -->
      <div class="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-6">
        <div>
          <h3 class="font-extrabold text-stone-900 text-sm">Upload Foto Background Sendiri</h3>
          <p class="text-xs text-stone-500 mt-0.5">Upload file foto format JPG atau PNG dari komputer/HP (otomatis dioptimalkan kualitas tinggi).</p>
        </div>

        <!-- Drag & Drop Upload Box -->
        <div
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleFileDrop"
          class="relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer"
          :class="isDragging ? 'border-[#B91C1C] bg-red-50/50' : 'border-stone-300 hover:border-stone-400 bg-stone-50/60'"
          @click="fileInputRef?.click()"
        >
          <input
            ref="fileInputRef"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            class="hidden"
            @change="handleFileSelect"
          />

          <div v-if="isProcessing" class="py-4 space-y-3">
            <div class="w-10 h-10 border-3 border-stone-200 border-t-[#B91C1C] rounded-full animate-spin mx-auto"></div>
            <p class="text-xs font-bold text-stone-700">Mengoptimalkan gambar kualitas tinggi...</p>
          </div>

          <div v-else class="space-y-3">
            <div class="w-12 h-12 bg-white text-[#B91C1C] border border-stone-200 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <div>
              <p class="text-xs sm:text-sm font-bold text-stone-800">
                <span class="text-[#B91C1C] underline">Klik untuk pilih foto</span> atau drag & drop file ke sini
              </p>
              <p class="text-[11px] text-stone-500 mt-1">
                Format: <strong>JPG, PNG, atau WebP</strong> (Maksimal 15 MB)
              </p>
            </div>

            <!-- Compression Info Badge -->
            <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[10px] font-bold text-emerald-700">
              <span>⚡ Fitur Auto-Compress HD: Foto dikompres tajam tanpa lemot</span>
            </div>
          </div>
        </div>

        <!-- Uploaded Image Status -->
        <div v-if="uploadSuccessMsg" class="p-3 bg-stone-100 rounded-xl flex items-center justify-between text-xs text-stone-700">
          <span class="font-bold text-stone-900">{{ uploadSuccessMsg }}</span>
          <button type="button" @click="uploadSuccessMsg = ''" class="text-stone-400 hover:text-stone-700 font-bold">✕</button>
        </div>

        <!-- Preset Showroom Picker Section -->
        <div class="space-y-3 pt-4 border-t border-stone-100">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold text-stone-900 uppercase tracking-wider">Atau Pilih Preset Showroom HD:</h4>
            <span class="text-[10px] text-stone-400">4 Pilihan Kategori</span>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="preset in HERO_PRESETS"
              :key="preset.id"
              type="button"
              @click="form.bgImage = preset.url"
              class="group relative aspect-[16/10] rounded-xl overflow-hidden border-2 text-left transition-all"
              :class="form.bgImage === preset.url ? 'border-[#B91C1C] ring-2 ring-red-500/20' : 'border-stone-200 hover:border-stone-300'"
            >
              <img :src="preset.url" :alt="preset.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                <p class="text-[11px] font-bold text-white leading-tight">{{ preset.name }}</p>
              </div>
              <div v-if="form.bgImage === preset.url" class="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#B91C1C] text-white flex items-center justify-center text-[10px] font-bold shadow">
                ✓
              </div>
            </button>
          </div>
        </div>

      </div>

      <!-- Right: Headline & Subheadline Editor (Col 5) -->
      <div class="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div>
          <h3 class="font-extrabold text-stone-900 text-sm">Teks Headline & Slogan</h3>
          <p class="text-xs text-stone-500 mt-0.5">Sesuaikan teks promosi utama di halaman beranda.</p>
        </div>

        <div class="space-y-3 text-xs">
          <div>
            <label class="block font-bold text-stone-700 mb-1">Baris Judul 1</label>
            <input
              v-model="form.title1"
              type="text"
              class="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900 focus:outline-none focus:border-[#B91C1C]"
            />
          </div>

          <div>
            <label class="block font-bold text-stone-700 mb-1">Baris Judul 2</label>
            <input
              v-model="form.title2"
              type="text"
              class="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900 focus:outline-none focus:border-[#B91C1C]"
            />
          </div>

          <div>
            <label class="block font-bold text-stone-700 mb-1">Aksen Warna Merah (Highlight)</label>
            <input
              v-model="form.accent"
              type="text"
              class="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold text-[#B91C1C] focus:outline-none focus:border-[#B91C1C]"
            />
          </div>

          <div>
            <label class="block font-bold text-stone-700 mb-1">Paragraf Deskripsi / Subjudul</label>
            <textarea
              v-model="form.subtitle"
              rows="3"
              class="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-700 leading-relaxed focus:outline-none focus:border-[#B91C1C] resize-none"
            ></textarea>
          </div>
        </div>

        <button
          type="button"
          @click="saveChanges"
          class="w-full py-3 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-98 mt-2"
        >
          Simpan Tampilan Hero
        </button>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useSettingsStore, HERO_PRESETS } from '@/stores/settingsStore'

const settingsStore = useSettingsStore()
const savedToast = ref(false)
const isDragging = ref(false)
const isProcessing = ref(false)
const uploadSuccessMsg = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

const form = ref({
  bgImage: settingsStore.heroBgImage,
  title1: settingsStore.heroTitle1,
  title2: settingsStore.heroTitle2,
  accent: settingsStore.heroAccent,
  subtitle: settingsStore.heroSubtitle,
})

// Auto High-Quality Image Compressor (Canvas-based)
function compressAndSetImage(file: File) {
  if (!file.type.match(/image\/(jpeg|png|webp)/)) {
    alert('Harap pilih file gambar dengan format JPG, PNG, atau WebP.')
    return
  }

  isProcessing.value = true
  const reader = new FileReader()

  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // Max resolution 1920px width for crystal clear sharpness without excess file size
      const maxW = 1920
      const maxH = 1080
      let { width, height } = img

      if (width > maxW) {
        height = Math.round((height * maxW) / width)
        width = maxW
      }

      canvas.width = width
      canvas.height = height

      if (ctx) {
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, width, height)

        // Compress to high quality WebP/JPEG (85% quality is visually indistinguishable from raw but ~80% smaller)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85)
        form.value.bgImage = compressedDataUrl

        const origSizeKb = (file.size / 1024).toFixed(0)
        uploadSuccessMsg.value = `✓ Foto "${file.name}" berhasil diunggah dan dioptimalkan (asli: ${origSizeKb} KB).`
      }
      isProcessing.value = false
    }
    img.src = e.target?.result as string
  }

  reader.readAsDataURL(file)
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    compressAndSetImage(target.files[0])
  }
}

function handleFileDrop(event: DragEvent) {
  isDragging.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    compressAndSetImage(event.dataTransfer.files[0])
  }
}

function saveChanges() {
  settingsStore.updateHeroSettings({
    bgImage: form.value.bgImage,
    title1: form.value.title1,
    title2: form.value.title2,
    accent: form.value.accent,
    subtitle: form.value.subtitle,
  })

  savedToast.value = true
  setTimeout(() => {
    savedToast.value = false
  }, 4000)
}

function resetDefaults() {
  if (confirm('Reset pengaturan hero ke default awal?')) {
    settingsStore.resetHeroSettings()
    form.value = {
      bgImage: settingsStore.heroBgImage,
      title1: settingsStore.heroTitle1,
      title2: settingsStore.heroTitle2,
      accent: settingsStore.heroAccent,
      subtitle: settingsStore.heroSubtitle,
    }
    uploadSuccessMsg.value = ''
  }
}
</script>
