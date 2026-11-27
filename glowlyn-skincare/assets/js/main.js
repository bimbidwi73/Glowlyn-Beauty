/**
 * Titik masuk aplikasi — menjalankan semua modul setelah DOM siap.
 * Urutan penting: modal dan whatsapp dulu, lalu konten, lalu transaksi.
 */
(function (G) {
  'use strict';

  var order = [
    'splash', // pertama: animasi pembuka logo
    'sparkles', // kilauan melayang di semua halaman
    'modal',
    'mobileMenu', // hamburger menu untuk layar HP
    'wishlist',   // dimuat sebelum konten agar kartu produk tahu status favorit
    'heroSlider',
    'promo',
    'catalog',
    'cart',
    'flyToCart', // efek produk terbang ke keranjang
    'orders',
    'reviews',
    'help',
    'whatsapp', // terakhir: mengisi tautan wa.me ke elemen yang dibuat modul lain
    'router',
    'reveal' // terakhir: setelah semua konten dibuat, pasang animasi muncul saat scroll
  ];

  function start() {
    order.forEach(function (name) {
      var mod = G.modules[name];
      if (mod && typeof mod.init === 'function') mod.init();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})(window.Glowlyn = window.Glowlyn || {});
