/**
 * Data ulasan (DATA DEMO — bukan ulasan pelanggan asli).
 * Ganti dengan ulasan asli sebelum website dipublikasikan.
 *
 * rating : 1-5
 */
(function (G) {
  'use strict';
  G.data = G.data || {};

  G.data.reviews = [
    { id: 'r1', name: 'Sinta', rating: 5, product: 'Ceramide Barrier Gel',
      text: 'Teksturnya ringan, kulit terasa lembap seharian dan tidak perih.' },
    { id: 'r2', name: 'Rani', rating: 5, product: 'Niacinamide 10% Serum',
      text: 'Pemakaian dua minggu, kulit terlihat lebih cerah dan merata.' },
    { id: 'r3', name: 'Dewi', rating: 4, product: 'Purifying Cleanser',
      text: 'Busanya lembut dan bersih, tapi aromanya agak kuat buat saya.' },
    { id: 'r4', name: 'Aisyah', rating: 5, product: 'UV Watery Sun Shield',
      text: 'Tidak lengket dan tidak meninggalkan white cast, cocok dipakai sebelum makeup.' },
    { id: 'r5', name: 'Maya', rating: 5, product: 'Hydra Glow Toner',
      text: 'Kulit kering saya terasa lebih segar setelah pakai toner ini.' },
    { id: 'r6', name: 'Putri', rating: 4, product: 'Cica Calming Gel',
      text: 'Cukup menenangkan kemerahan, kemasannya praktis dibawa bepergian.' },
    { id: 'r7', name: 'Nadia', rating: 5, product: 'Luminous Series Set',
      text: 'Paketnya lengkap untuk pemula, rutinitas jadi simpel.' },
    { id: 'r8', name: 'Fitri', rating: 5, product: 'C-Glow Vitamin C',
      text: 'Bekas jerawat terlihat lebih samar setelah rutin pemakaian malam.' },
    { id: 'r9', name: 'Laras', rating: 4, product: 'Multi-Hyaluronic Serum',
      text: 'Menghidrasi dengan baik, pengiriman cepat dan packing aman.' }
  ];
})(window.Glowlyn = window.Glowlyn || {});
