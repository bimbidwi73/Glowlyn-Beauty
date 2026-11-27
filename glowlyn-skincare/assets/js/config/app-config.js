/**
 * Konfigurasi terpusat GLOWLYN.
 * Sesuai dokumen arsitektur (bagian 6): nomor WhatsApp dan pengaturan lain
 * hanya ditulis di sini, tidak boleh ditulis langsung di modul lain.
 */
(function (G) {
  'use strict';

  G.config = Object.freeze({
    WHATSAPP_NUMBER: '6285648720346',
    WHATSAPP_DEFAULT_TEXT: 'Halo Glowlyn, saya ingin bertanya mengenai produk dan pemesanan skincare.',
    WHATSAPP_CTA_TEXT: 'Need Help? Chat WA',

    TIMEZONE: 'Asia/Jakarta',
    HERO_AUTOPLAY_MS: 5000,

    /** Animasi pembuka logo. Ubah ONCE_PER_SESSION ke true agar hanya tampil sekali per kunjungan. */
    SPLASH_ENABLED: true,
    SPLASH_ONCE_PER_SESSION: false,
    SPLASH_MAX_MS: 5000, // batas aman: splash pasti tertutup walau animasi bermasalah

    /** Kilauan (sparkle) yang melayang di semua halaman. */
    SPARKLES_ENABLED: true,
    SPARKLES_CLICK_BURST: true, // cipratan kilau saat layar diklik/diketuk

    /** Waktu berakhir flash sale (data demo, ubah sesuai kebutuhan). */
    FLASH_SALE_ENDS_AT: '2026-12-31T23:59:59+07:00',

    /** Ongkos kirim demo (Rp). Gratis ongkir bila belanja di atas batas. */
    SHIPPING_FEE: 15000,
    FREE_SHIPPING_MIN: 150000,

    /** Kunci penyimpanan di localStorage. */
    STORAGE_KEYS: Object.freeze({
      CART: 'glowlyn.cart',
      ORDERS: 'glowlyn.orders',
      USER: 'glowlyn.user',
      REVIEWS: 'glowlyn.reviews',
      WISHLIST: 'glowlyn.wishlist'
    })
  });
})(window.Glowlyn = window.Glowlyn || {});
