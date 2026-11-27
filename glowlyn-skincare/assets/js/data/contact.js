/**
 * Data halaman Kontak (data demo): alamat klinik, jam operasional,
 * template pesan WhatsApp, dan pilihan topik konsultasi.
 * Nomor WhatsApp TIDAK ditulis di sini; selalu dari config/app-config.js.
 */
(function (G) {
  'use strict';
  G.data = G.data || {};

  G.data.contact = {
    clinicName: 'GLOWLYN Beauty Care Madiun',
    addressLines: ['Jl. Anggrek No. 12, Oro-oro Ombo, Kec. Kartoharjo, Kota Madiun, Jawa Timur 63125'],
    landmark: 'Patokan: 300 meter timur perempatan Jl. Pahlawan, sebelah barat Apotek Madiun Sehat.',
    /** Dipakai untuk peta, tombol "Buka di Google Maps", dan "Petunjuk Rute". */
    mapQuery: 'Jl. Anggrek No. 12, Oro-oro Ombo, Kartoharjo, Madiun, Jawa Timur 63125',
    hours: [
      'Senin – Sabtu: 08.30 – 21.00 WIB',
      'Minggu & Tanggal Merah: 10.00 – 17.00 WIB (Respon Terjadwal).'
    ],

    templates: [
      { icon: 'face', tag: 'Rutinitas Remaja', title: 'Konsultasi Rutinitas Dasar Remaja',
        desc: 'Pilihan facial wash gentle & sunscreen ringan anti-komedo.',
        text: 'Halo GLOWLYN Beauty, saya ingin konsultasi rutinitas dasar skincare untuk kulit remaja pemula.' },
      { icon: 'inventory_2', tag: 'Cek Paket & Stok', title: 'Tanya Paket Skincare & Stok',
        desc: 'Tanyakan stok Luminous Series, Starter Pack, atau Day-Night Cream.',
        text: 'Halo GLOWLYN Beauty, saya ingin menanyakan ketersediaan stok dan isi paket skincare.' },
      { icon: 'payments', tag: 'Pembayaran & Ongkir', title: 'Bantuan Bayar & Ongkir',
        desc: 'Kirim bukti transfer bank / e-wallet dan cek estimasi kurir.',
        text: 'Halo GLOWLYN Beauty, saya ingin menanyakan metode pembayaran dan estimasi ongkir ke alamat saya.' },
      { icon: 'shield', tag: 'Masalah Barrier', title: 'Kulit Sensitif / Rusak',
        desc: 'Solusi cepat kemerahan dengan Centella Asiatica & Ceramide Complex.',
        text: 'Halo GLOWLYN Beauty, kulit saya sensitif dan skin barrier terasa rusak. Mohon rekomendasi produknya.' }
    ],

    topics: [
      'Kulit Kering & Barrier Rusak',
      'Kulit Berminyak & Berjerawat',
      'Kulit Kusam & Flek',
      'Kulit Sensitif',
      'Rutinitas Pemula',
      'Pesanan & Pengiriman'
    ],

    defaultMessage: 'Halo GLOWLYN Beauty, saya ingin konsultasi rutinitas dasar skincare untuk kulit remaja pemula.'
  };
})(window.Glowlyn = window.Glowlyn || {});
