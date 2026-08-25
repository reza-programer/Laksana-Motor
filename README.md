# Laksana Motor — Website Showroom Motor Bekas

Aplikasi web showroom motor bekas **Laksana Motor** (Jalaksana, Kuningan, Jawa Barat) modern, profesional, dan responsif.

## 🚀 Tech Stack

- **Backend**: Laravel 12 (REST API ready)
- **Frontend**: Vue 3 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Pinia
- **Routing**: Vue Router (Single Page Application with smooth scroll behavior)

---

## ✨ Fitur Utama

### 1. Halaman Publik (Customer)
- **Full-Width Hero Section**: Latar belakang sinematik, efek zoom halus, headline dinamis, dan tombol aksi langsung.
- **Katalog Motor Pintar**:
  - Filter interaktif (Merek, Transmisi, Rentang Harga, Status, Tahun, Kilometer).
  - Sticky Smart Filter Bar dengan backdrop blur.
  - Animasi kartu muncul bertahap (*staggered scroll reveal*).
- **Detail Motor**: Galeri foto, spesifikasi lengkap, status unit (*Tersedia, Booking, Terjual*), kelengkapan surat (*STNK, BPKB, Faktur*), dan direct call-to-action WhatsApp.
- **Standar & Keunggulan Showroom**: Tata letak editorial 5 pilar kualitas otomotif + checklist inspeksi.
- **Banner Promo**: Banner DP mulai 1 jutaan dengan badge dinamis.
- **Testimoni Pembeli**: Ulasan pelanggan terverifikasi dengan rating bintang.
- **Footer & Lokasi Google Maps**: Terintegrasi langsung dengan titik koordinat resmi Laksana Motor Jalaksana.

### 2. Panel Admin (Backoffice)
- **Autentikasi & Keamanan**: Portal login admin dengan fitur show/hide password, alert verifikasi, dan demo autofill.
- **Dashboard Ringkasan**: 5 kartu metrik aset & unit, daftar inventaris terbaru, dan tombol aksi cepat.
- **Manajemen Stok Motor**: Tambah, edit, hapus, filter status, dan toggle unit unggulan.
- **Kustomisasi Branding & Tampilan**:
  - **Ganti Logo Showroom**: Upload logo custom (PNG transparan/SVG) dengan live preview light & dark mode atau gunakan emblem monogram default LM.
  - **Ganti Background Hero**: Upload file foto (dengan fitur auto-compress kualitas tinggi) atau pilih 4 preset showroom HD.
- **100% Responsif & Mobile-First**: Tampilan mobile otomatis berganti menjadi card feed yang rapi dan mudah dioperasikan dari smartphone.

---

## 🛠️ Instalasi & Menjalankan Project

### 1. Clone Repository
```bash
git clone https://github.com/reza-programer/Laksana-Motor.git
cd Laksana-Motor
```

### 2. Install Dependency
```bash
# Install PHP dependencies
composer install

# Install Frontend dependencies
npm install
```

### 3. Konfigurasi Environment
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Menjalankan Server
```bash
# Terminal 1: Laravel Server
php artisan serve

# Terminal 2: Vite Dev Server
npm run dev
```

Akses aplikasi di browser: `http://localhost:8000`

---

## 🔐 Akun Demo Admin
- **URL**: `http://localhost:8000/admin/login`
- **Email**: `admin@laksanamotor.com`
- **Password**: `password`

---

© 2024 **Laksana Motor**. All Rights Reserved.
