/**
 * Data hero slider dan banner promo (data demo).
 */
(function (G) {
  'use strict';
  G.data = G.data || {};

  G.data.heroSlides = [
    {
      image: 'hero1',
      tag: 'Official Beauty Collection',
      title: 'Kembalikan Kilau Alami & Rawat Skin Barrier',
      text: 'Koleksi perawatan dermatologis lembut berformula seimbang. Merawat pertahanan barrier kulit, mengunci hidrasi mendalam, dan menutrisi wajah cerah bercahaya.',
      primary: { label: 'Belanja Sekarang', href: '#katalog-produk' },
      secondary: { label: 'Lihat Promo Flash Sale', href: '#promo' }
    },
    {
      image: 'hero2',
      tag: 'Gentle Radiance Care',
      title: 'Formula Lembut untuk Kulit Sehat & Bersinar',
      text: 'Sentuhan hidrasi esensial tanpa bahan kimia keras. Meratakan tekstur wajah untuk tampilan dewy glass skin yang segar setiap hari.',
      primary: { label: 'Eksplor Produk', href: '#katalog-produk' },
      secondary: { label: 'Promo Spesial', href: '#promo' }
    },
    {
      image: 'hero3',
      tag: 'Halal & Safe Beauty',
      title: 'Perawatan Halal, Lembut & Menenangkan Setiap Hari',
      text: 'Formulasi aman berstandar BPOM dan sertifikasi Halal, untuk wanita Indonesia yang mengutamakan kenyamanan kulit dan ketenangan hati.',
      primary: { label: 'Pilih Skincare Halal', href: '#katalog-produk' },
      secondary: { label: 'Klaim Diskon', href: '#promo' }
    },
    {
      image: 'hero4',
      tag: 'Active Botanical Innovation',
      title: 'Inovasi Aktif Alami untuk Kebutuhan Kulit Indonesia',
      text: 'Perpaduan Centella Asiatica, Niacinamide, dan multi-ceramide yang dirancang tahan iklim tropis dan polusi harian.',
      primary: { label: 'Mulai Belanja', href: '#katalog-produk' },
      secondary: { label: 'Lihat Review', href: '#ulasan-pelanggan' }
    }
  ];

  G.data.promoBanners = [
    {
      variant: 'primary',
      tag: 'Spesial Barrier Recovery',
      title: 'Perbaiki Skin Barrier dalam 14 Hari',
      text: 'Formula Centella & Ceramide yang meredakan kemerahan serta dehidrasi ekstrem.',
      cta: 'Eksplor Sekarang',
      href: '#katalog-produk'
    },
    {
      variant: 'secondary',
      tag: 'Brightening Essentials',
      title: 'Kilau Glass Skin Alami Tanpa Kusam',
      text: 'Kombinasi Niacinamide & Vitamin C untuk memudarkan noda hitam dan meratakan warna kulit.',
      cta: 'Klaim Penawaran',
      href: '#katalog-produk'
    }
  ];
})(window.Glowlyn = window.Glowlyn || {});
