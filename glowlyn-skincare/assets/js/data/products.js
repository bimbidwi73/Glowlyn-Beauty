/**
 * Data produk. Satu sumber kebenaran untuk harga dan label.
 * Flash sale, Best Seller, New Arrival, dan katalog dihitung dari data ini.
 *
 * Field:
 *  - category : id dari G.data.categories (cleanser, toner, serum, day-cream, ...)
 *  - concerns : daftar id dari G.data.concerns
 *  - price    : harga jual (Rp)    - oldPrice : harga coret (Rp, opsional)
 *  - image    : kunci di G.data.images
 *  - flashSale / newArrival / bestSellerRank : penanda untuk beranda dan filter Status
 *  Filter "Promo" otomatis untuk produk yang punya oldPrice.
 */
(function (G) {
  'use strict';
  G.data = G.data || {};

  G.data.products = [
        { id: 'ceramide-barrier-gel', name: 'Ceramide Barrier Gel', category: 'moisturizer', subtitle: 'Barrier Repair',
      concerns: ['damaged-barrier', 'dehydrated', 'sensitive'], price: 89000, oldPrice: 160000, rating: 5.0, sold: 2400,
      image: 'fotoCeramide', flashSale: true, bestSellerRank: 1 },

    { id: 'niacinamide-10-serum', name: 'Niacinamide 10% Serum', category: 'serum', subtitle: 'Brightening',
      concerns: ['anti-dark-spot', 'bintik-hitam', 'pie-pih'], price: 85000, oldPrice: 130000, rating: 5.0, sold: 2800,
      image: 'fotoNiacinamide', flashSale: true, bestSellerRank: 2 },

    { id: 'luminous-series-set', name: 'Luminous Series Set', category: 'paket', subtitle: 'Full Glow',
      concerns: ['anti-dark-spot', 'dehydrated'], price: 210000, oldPrice: 350000, rating: 5.0, sold: 3400,
      image: 'fotoLuminous', bestSellerRank: 3 },

    { id: 'purifying-cleanser', name: 'Purifying Cleanser', category: 'cleanser', subtitle: 'Deep Gentle',
      concerns: ['acne-prone', 'breakout', 'comedo'], price: 58000, oldPrice: 98000, rating: 5.0, sold: 1600,
      image: 'fotoCleanser', flashSale: true, bestSellerRank: 4 },

    { id: 'uv-watery-sun-shield', name: 'UV Watery Sun Shield SPF 50 PA++++', category: 'sunscreen', subtitle: 'Sensitive Skin',
      concerns: ['sensitive', 'anti-dark-spot'], price: 69000, oldPrice: 110000, rating: 5.0, sold: 1800,
      image: 'fotoSunShield', flashSale: true },

    { id: 'deep-aqua-cream', name: 'Deep Aqua Cream', category: 'moisturizer', subtitle: 'Barrier',
      concerns: ['dehydrated', 'damaged-barrier'], price: 95000, rating: 5.0, sold: 320,
      image: 'fotoDeepAqua' },

    { id: 'multi-hyaluronic-serum', name: 'Multi-Hyaluronic Serum', category: 'serum', subtitle: 'Hyaluronic',
      concerns: ['dehydrated', 'sensitive'], price: 92000, rating: 5.0, sold: 280,
      image: 'fotoHyaluronic', newArrival: true },

    { id: 'cica-clarifying-toner', name: 'Cica Clarifying Toner', category: 'toner', subtitle: 'Clarifying',
      concerns: ['acne-prone', 'breakout', 'sensitive'], price: 75000, rating: 5.0, sold: 260,
      image: 'fotoCicaToner', newArrival: true },

    { id: 'c-glow-vitamin-c', name: 'C-Glow Vitamin C', category: 'serum', subtitle: 'Vit C Active',
      concerns: ['anti-dark-spot', 'bintik-hitam', 'pie-pih'], price: 99000, rating: 5.0, sold: 240,
      image: 'fotoCGlow', newArrival: true },

    { id: 'hydra-glow-toner', name: 'Hydra Glow Toner', category: 'toner', subtitle: 'Hydrating',
      concerns: ['dehydrated'], price: 78000, oldPrice: 98000, rating: 5.0, sold: 900,
      image: 'fotoHydraToner' },

    { id: 'tone-up-spf-50', name: 'Tone-Up SPF 50', category: 'sunscreen', subtitle: 'Shield',
      concerns: ['anti-dark-spot', 'bintik-hitam'], price: 75000, oldPrice: 99000, rating: 5.0, sold: 640,
      image: 'fotoToneUp' },

    { id: 'aha-bha-pha-peeling-mask', name: 'AHA BHA PHA Exfoliating Peeling Mask', category: 'mask', subtitle: 'Anti Dark Spot & PIE/PIH',
      concerns: ['anti-dark-spot', 'pie-pih', 'comedo'], price: 82000, oldPrice: 120000, rating: 5.0, sold: 1500,
      image: 'fotoAhaBhaMask' },

    { id: 'purifying-clay-mask', name: 'Purifying Clay Mask', category: 'mask', subtitle: 'Deep Pore Cleansing',
      concerns: ['comedo', 'acne-prone', 'breakout'], price: 72000, oldPrice: 95000, rating: 5.0, sold: 820,
      image: 'fotoClayMask' },

    { id: 'exfoliating-mask', name: 'Exfoliating Mask', category: 'mask', subtitle: 'Smooth & Bright',
      concerns: ['comedo', 'bintik-hitam'], price: 68000, oldPrice: 90000, rating: 5.0, sold: 560,
      image: 'fotoExfoliatingMask' },

    { id: 'peel-off-mask', name: 'Peel-Off Mask', category: 'mask', subtitle: 'Blackhead Care',
      concerns: ['comedo', 'acne-prone'], price: 55000, oldPrice: 75000, rating: 5.0, sold: 940,
      image: 'fotoPeelOffMask' },

    { id: 'powder-mask', name: 'Powder Mask', category: 'mask', subtitle: 'Calming',
      concerns: ['sensitive', 'breakout'], price: 62000, rating: 5.0, sold: 310,
      image: 'fotoPowderMask' },

    { id: 'sheet-mask', name: 'Sheet Mask', category: 'mask', subtitle: 'Instant Hydration',
      concerns: ['dehydrated', 'sensitive'], price: 15000, rating: 5.0, sold: 2100,
      image: 'fotoSheetMask' },

    { id: 'sleeping-mask', name: 'Sleeping Mask', category: 'mask', subtitle: 'Overnight Repair',
      concerns: ['dehydrated', 'damaged-barrier'], price: 79000, oldPrice: 105000, rating: 5.0, sold: 690,
      image: 'fotoSleepingMask' },

    { id: 'paket-acne-care', name: 'Paket Acne Care', category: 'paket', subtitle: 'Bundling Jerawat',
      concerns: ['acne-prone', 'breakout', 'acne-free'], price: 185000, oldPrice: 270000, rating: 5.0, sold: 740,
      image: 'fotoPaketAcne' },

    { id: 'paket-anti-dark-spot', name: 'Paket Anti Dark Spot', category: 'paket', subtitle: 'Bundling Pencerah',
      concerns: ['anti-dark-spot', 'bintik-hitam'], price: 195000, oldPrice: 285000, rating: 5.0, sold: 680,
      image: 'fotoPaketAntiDarkSpot' },

    { id: 'paket-comedo-control', name: 'Paket Comedo Control', category: 'paket', subtitle: 'Bundling Komedo',
      concerns: ['comedo', 'acne-prone'], price: 175000, oldPrice: 255000, rating: 5.0, sold: 520,
      image: 'fotoPaketComedo' },

    { id: 'paket-pie-pih-care', name: 'Paket PIE & PIH Care', category: 'paket', subtitle: 'Bundling Bekas Jerawat',
      concerns: ['pie-pih', 'anti-dark-spot'], price: 199000, oldPrice: 290000, rating: 5.0, sold: 610,
      image: 'fotoPaketPiePih' },

    { id: 'paket-sensitive-skin', name: 'Paket Sensitive Skin', category: 'paket', subtitle: 'Bundling Kulit Sensitif',
      concerns: ['sensitive', 'damaged-barrier'], price: 189000, oldPrice: 275000, rating: 5.0, sold: 450,
      image: 'fotoPaketSensitive' },

    { id: 'facial-wash-acne-care', name: 'Facial Wash Acne Care', category: 'cleanser', subtitle: 'Acne Cleansing',
      concerns: ['acne-prone', 'breakout', 'acne-free'], price: 65000, oldPrice: 95000, rating: 5.0, sold: 410,
      image: 'fotoFacialWashAcne' },

    { id: 'facial-wash-pie-pih-care', name: 'Facial Wash PIE & PIH Care', category: 'cleanser', subtitle: 'Post-Acne Care',
      concerns: ['pie-pih', 'anti-dark-spot'], price: 65000, oldPrice: 95000, rating: 5.0, sold: 380,
      image: 'fotoFacialWashPiePih', newArrival: true },

    { id: 'facial-wash-dehydrated-skin', name: 'Facial Wash Dehydrated Skin', category: 'cleanser', subtitle: 'Hydrating Cleanser',
      concerns: ['dehydrated', 'damaged-barrier'], price: 65000, oldPrice: 95000, rating: 5.0, sold: 520,
      image: 'fotoFacialWashDehydrated' },

    { id: 'facial-wash-sensitive-skin', name: 'Facial Wash Sensitive Skin', category: 'cleanser', subtitle: 'Calming Cleanser',
      concerns: ['sensitive', 'damaged-barrier'], price: 65000, oldPrice: 95000, rating: 5.0, sold: 290,
      image: 'fotoFacialWashSensitive' },

    { id: 'facial-wash-comedo-control', name: 'Facial Wash Comedo Control', category: 'cleanser', subtitle: 'Pore Cleansing',
      concerns: ['comedo', 'acne-prone'], price: 65000, oldPrice: 95000, rating: 5.0, sold: 450,
      image: 'fotoFacialWashComedo' },

    { id: 'facial-wash-anti-dark-spot', name: 'Facial Wash Anti Dark Spot', category: 'cleanser', subtitle: 'Brightening Cleanser',
      concerns: ['anti-dark-spot', 'bintik-hitam'], price: 65000, oldPrice: 95000, rating: 5.0, sold: 310,
      image: 'fotoFacialWashAntiDarkSpot' }
  ];

  /** Kategori (filter dan kategori cepat). Yang belum punya produk otomatis tidak ditampilkan di filter. */
  G.data.categories = [
    { id: 'cleanser', label: 'Cleanser', icon: 'soap' },
    { id: 'toner', label: 'Toner', icon: 'opacity' },
    { id: 'serum', label: 'Serum', icon: 'water_drop' },
    { id: 'day-cream', label: 'Day Cream', icon: 'light_mode' },
    { id: 'night-cream', label: 'Night Cream', icon: 'bedtime' },
    { id: 'moisturizer', label: 'Moisturizer', icon: 'spa' },
    { id: 'sunscreen', label: 'Sunscreen', icon: 'wb_sunny' },
    { id: 'mask', label: 'Mask', icon: 'face_retouching_natural' },
    { id: 'paket', label: 'Paket Skincare', icon: 'redeem' }
  ];

  /** Masalah kulit (filter). */
  G.data.concerns = [
    { id: 'acne-free', label: 'Acne-Free' },
    { id: 'acne-prone', label: 'Acne Prone Skin' },
    { id: 'anti-dark-spot', label: 'Anti Dark Spot' },
    { id: 'bintik-hitam', label: 'Bintik Hitam' },
    { id: 'breakout', label: 'Breakout' },
    { id: 'comedo', label: 'Comedo' },
    { id: 'damaged-barrier', label: 'Damaged Barrier Skin' },
    { id: 'dehydrated', label: 'Dehydrated Skin' },
    { id: 'pie-pih', label: 'PIE & PIH' },
    { id: 'sensitive', label: 'Sensitive Skin' }
  ];
})(window.Glowlyn = window.Glowlyn || {});