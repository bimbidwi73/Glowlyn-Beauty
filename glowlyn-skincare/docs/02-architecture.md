# 02. Arsitektur Sistem – GLOWLYN Skincare

**Versi:** 1.0 | Dokumen ini menjelaskan susunan teknis website, alur data, dan keputusan teknologi. Pilihan teknologi bersifat rekomendasi dan bisa disesuaikan dengan kemampuan tim.

## 1. Prinsip Arsitektur

1. **Sederhana dulu.** Satu aplikasi web, satu database, tanpa microservice.
2. **Mobile-first dan cepat.** Mayoritas pengguna remaja memakai HP dengan jaringan seluler.
3. **Satu sumber kebenaran.** Harga, stok, promo, dan nomor WhatsApp dibaca dari database/konfigurasi, tidak ditulis ulang di banyak tempat.
4. **Server menentukan harga dan waktu.** Browser hanya menampilkan.
5. **Mudah dikelola non-programmer** lewat panel admin.

## 2. Rekomendasi Teknologi

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Frontend | Next.js (React) + TypeScript | Render di server untuk SEO dan kecepatan |
| Styling | Tailwind CSS + design token GLOWLYN | Konsisten dan cepat dibuat |
| Carousel | Embla Carousel atau Swiper | Ringan, mendukung sentuhan, aksesibel |
| Backend | Route Handler / API Next.js | Satu kode untuk web dan API |
| Database | PostgreSQL (misalnya Supabase atau Neon) | Relasional, cocok untuk produk, filter, pesanan |
| ORM | Prisma | Skema terdokumentasi, migrasi rapi |
| Penyimpanan gambar | Object storage + CDN (misalnya Cloudinary atau Supabase Storage) | Resize otomatis, format WebP/AVIF |
| Autentikasi | Auth.js atau Supabase Auth | Login pelanggan dan admin |
| Hosting | Vercel (web) | Deploy otomatis dan CDN global |
| Pembayaran (tahap 2) | Midtrans atau Xendit | Metode lokal: QRIS, transfer, e-wallet |
| Analitik | Plausible atau GA4 | Mengukur metrik di PRD |

Alternatif tanpa framework berat: HTML, CSS, dan JavaScript statis dengan backend PHP/Laravel bila tim lebih familiar.

## 3. Gambaran Komponen

```
Pengunjung (HP / Desktop)
        |
        v
[ CDN + Hosting Web ]  <-- gambar dari Object Storage/CDN
        |
        v
[ Aplikasi Web (Next.js) ]
   |-- Halaman publik (SSR/ISR): beranda, katalog, detail, jurnal
   |-- API: produk, filter, keranjang, checkout, promo, pesanan
   |-- Panel Admin (terproteksi login)
        |
        v
[ PostgreSQL ]   +   [ Konfigurasi: WHATSAPP_NUMBER ]
        |
        v
[ Layanan luar ]: WhatsApp (wa.me), Payment Gateway (tahap 2), Email
```

## 4. Modul Aplikasi

| Modul | Tanggung jawab |
|---|---|
| Katalog | Daftar produk, kategori, filter, pencarian, sorting |
| Promo | Flash sale, banner kampanye, harga diskon, countdown |
| Keranjang dan checkout | Item, kuantitas, ongkir, ringkasan, pembuatan pesanan |
| WhatsApp | Membuat tautan dan pesan dari satu konfigurasi |
| Konten | Hero slider, halaman About, FAQ, Glowlyn Journal |
| Pelanggan | Akun, wishlist, riwayat dan pelacakan pesanan |
| Admin | CRUD produk, stok, banner, promo, pesanan, ulasan |

## 5. Alur Utama

### 5.1 Memuat Beranda

1. Browser meminta halaman; server mengambil banner aktif, produk Best Seller, New Arrival, dan flash sale yang masih berlaku.
2. HTML dikirim dengan gambar hero pertama diprioritaskan; gambar lain di-lazy-load.
3. Countdown dihitung dari `ends_at` (waktu server, zona WIB) sehingga tidak berubah saat halaman dimuat ulang.

### 5.2 Filter dan Sorting Katalog

1. Pilihan filter disimpan di URL, misalnya `/produk?kategori=serum&masalah=acne&min=50000&max=100000&urut=harga-asc`.
2. Server menjalankan satu query gabungan sehingga semua filter bekerja bersamaan.
3. Hasil dan jumlah produk dikembalikan; URL dapat dibagikan.

### 5.3 Checkout via WhatsApp

1. Pelanggan mengisi nama, nomor HP, alamat, dan catatan.
2. Server memeriksa stok dan menghitung ulang harga dari database.
3. Pesanan disimpan dengan status `menunggu_konfirmasi` dan nomor pesanan unik.
4. Server membuat pesan WhatsApp berisi ringkasan pesanan, lalu pelanggan diarahkan ke `https://wa.me/6285648720346?text=...`.
5. Admin mengonfirmasi, pesanan berubah status, dan stok berkurang.

## 6. Konfigurasi Terpusat

| Kunci | Contoh | Dipakai oleh |
|---|---|---|
| `WHATSAPP_NUMBER` | `6285648720346` | Tombol mengambang, Beli Sekarang, checkout, footer, halaman kontak |
| `WHATSAPP_DEFAULT_TEXT` | "Halo Glowlyn, saya ingin bertanya mengenai produk dan pemesanan skincare." | Tombol mengambang |
| `TIMEZONE` | `Asia/Jakarta` | Countdown dan laporan |
| `HERO_AUTOPLAY_MS` | `5000` | Hero slider |
| `WHATSAPP_CTA_TEXT` | "Need Help?" | Tombol mengambang dan judul bagian kontak |

Tidak boleh ada nomor WhatsApp yang ditulis langsung di komponen lain.

## 7. Strategi Gambar

- Foto asli disimpan dalam resolusi tinggi di storage, lalu disajikan lewat CDN dengan ukuran responsif (`srcset`).
- Hero: lebar 1600 px (desktop) dan 800 px (mobile); format WebP/AVIF.
- Wajib ada teks alternatif untuk setiap gambar.
- Setiap aset dicatat dengan sumber dan izin pakai (lihat dokumen 06).

## 8. Keamanan dan Privasi

- HTTPS wajib, header keamanan dasar, dan validasi semua input di server.
- Password di-hash; panel admin memakai peran (admin, staf konten).
- Data pelanggan minimal (nama, nomor HP, alamat). Karena ada pengguna remaja, sediakan kebijakan privasi dan hindari pelacakan iklan yang tidak perlu.
- Cadangan database otomatis harian.

## 9. Performa dan Skalabilitas

- Halaman beranda dan katalog memakai caching (ISR) dengan revalidasi saat admin mengubah data.
- Indeks database pada kategori, harga, status, dan tanggal rilis agar filter cepat.
- Gambar lewat CDN dan lazy-load.

## 10. Lingkungan dan Rilis

| Lingkungan | Fungsi |
|---|---|
| Development | Pengembangan lokal dengan data contoh |
| Staging | Uji sebelum rilis dengan salinan data |
| Production | Website publik |

Deploy otomatis dari repositori Git setelah uji lulus.

## 11. Tahapan Pengembangan

1. **Fase 1 (inti):** beranda, katalog dan filter, detail produk, keranjang, checkout via WhatsApp, panel admin dasar.
2. **Fase 2:** akun pelanggan, wishlist, pelacakan pesanan, ulasan asli, Glowlyn Journal.
3. **Fase 3:** pembayaran online, otomatisasi status pesanan, program loyalitas.
