/**
 * Konten halaman Detail Produk.
 *
 * Struktur:
 *  - concernBenefits : kalimat manfaat per masalah kulit (id dari G.data.concerns)
 *  - categories      : isi standar per jenis produk (cleanser, toner, serum, ...)
 *  - products        : isi khusus per produk (menimpa isi kategori)
 *
 * PENTING: teks ini draf yang disusun dari nama, jenis, dan masalah kulit tiap
 * produk. Sebelum website dipublikasikan, cocokkan kandungan, aturan pakai,
 * dan klaim dengan label kemasan / izin edar BPOM produk yang sebenarnya.
 *
 * Di teks, {name} diganti nama produk.
 */
(function (G) {
  'use strict';
  G.data = G.data || {};

  var PATCH_TEST = 'Lakukan uji tempel (patch test) di area lengan bagian dalam sebelum pemakaian pertama, dan hentikan pemakaian bila timbul iritasi.';
  var STORAGE = 'Simpan di tempat sejuk dan kering, jauhkan dari sinar matahari langsung.';

  G.data.productDetails = {
    concernBenefits: {
      'acne-free': 'Membantu menjaga kulit tetap bersih dan terawat dari jerawat',
      'acne-prone': 'Dirancang untuk kulit yang cenderung berjerawat',
      'anti-dark-spot': 'Membantu menyamarkan noda gelap dan meratakan warna kulit',
      'bintik-hitam': 'Membantu menyamarkan bintik hitam pada wajah',
      'breakout': 'Membantu merawat kulit yang mudah breakout',
      'comedo': 'Membantu membersihkan pori dan merawat komedo',
      'damaged-barrier': 'Membantu memperkuat skin barrier yang lemah',
      'dehydrated': 'Membantu menjaga kelembapan pada kulit yang kurang terhidrasi',
      'pie-pih': 'Membantu memudarkan bekas jerawat (PIE & PIH)',
      'sensitive': 'Formula lembut yang ramah untuk kulit sensitif'
    },

    categories: {
      cleanser: {
        when: 'Pagi & Malam',
        tagline: 'Bersihkan lembut, kulit tetap nyaman setelah dibilas.',
        description: '{name} adalah pembersih wajah yang membantu mengangkat kotoran, minyak berlebih, dan sisa debu tanpa membuat kulit terasa kesat. Cocok dijadikan langkah pertama dalam rutinitas pagi dan malam.',
        benefits: ['Mengangkat kotoran & minyak berlebih', 'Busa lembut dan mudah dibilas', 'Langkah awal rutinitas pagi & malam'],
        howTo: [
          'Basahi wajah dengan air bersih.',
          'Ambil secukupnya, busakan di telapak tangan.',
          'Pijat lembut ke seluruh wajah selama 30–60 detik, hindari area mata.',
          'Bilas hingga bersih, lalu keringkan dengan handuk bersih dengan menepuk.',
          'Lanjutkan dengan toner, serum, dan pelembap.'
        ],
        tips: ['Gunakan 2 kali sehari: pagi dan malam.', 'Gunakan air suhu ruang atau hangat suam-suam kuku.']
      },
      toner: {
        when: 'Pagi & Malam',
        tagline: 'Segarkan kulit dan siapkan untuk langkah perawatan berikutnya.',
        description: '{name} dipakai setelah mencuci wajah untuk membantu menyegarkan kulit dan menyiapkannya agar lebih siap menyerap serum dan pelembap.',
        benefits: ['Menyegarkan kulit setelah cuci muka', 'Membantu persiapan sebelum serum', 'Tekstur ringan, nyaman dipakai harian'],
        howTo: [
          'Setelah mencuci wajah, tuang toner ke telapak tangan atau kapas.',
          'Tepuk-tepuk lembut ke wajah dan leher hingga meresap.',
          'Tunggu sebentar, lalu lanjutkan dengan serum dan pelembap.'
        ],
        tips: ['Gunakan pagi dan malam setelah cuci muka.', 'Menepuk dengan tangan lebih lembut daripada mengusap dengan kapas.']
      },
      serum: {
        when: 'Pagi & Malam',
        tagline: 'Perawatan terkonsentrasi untuk kebutuhan kulitmu.',
        description: '{name} adalah serum bertekstur ringan yang membawa bahan aktif terkonsentrasi untuk merawat kebutuhan spesifik kulit, dipakai setelah toner dan sebelum pelembap.',
        benefits: ['Perawatan bahan aktif terkonsentrasi', 'Tekstur ringan, cepat meresap', 'Dipakai setelah toner, sebelum pelembap'],
        howTo: [
          'Cuci wajah dan gunakan toner terlebih dahulu.',
          'Ambil serum secukupnya (2–3 tetes atau sesuai petunjuk kemasan).',
          'Ratakan dan tepuk lembut ke wajah dan leher hingga meresap.',
          'Lanjutkan dengan pelembap, dan sunscreen di pagi hari.'
        ],
        tips: ['Mulai dengan pemakaian malam hari bila kulitmu baru mencoba bahan aktif.', 'Selalu gunakan sunscreen di pagi hari.']
      },
      'day-cream': {
        when: 'Pagi',
        tagline: 'Pelembap harian untuk kulit lembap sepanjang hari.',
        description: '{name} adalah krim siang yang membantu menjaga kelembapan dan melindungi kulit selama beraktivitas.',
        benefits: ['Menjaga kelembapan sepanjang hari', 'Siap dilapisi sunscreen', 'Nyaman untuk pemakaian harian'],
        howTo: ['Setelah serum, ambil krim secukupnya.', 'Ratakan ke wajah dan leher dengan gerakan lembut.', 'Lanjutkan dengan sunscreen.'],
        tips: ['Gunakan di pagi hari.']
      },
      'night-cream': {
        when: 'Malam',
        tagline: 'Perawatan semalaman agar kulit tampak segar di pagi hari.',
        description: '{name} adalah krim malam yang membantu menjaga kelembapan dan mendukung proses perawatan kulit saat tidur.',
        benefits: ['Mendukung perawatan kulit saat tidur', 'Menjaga kelembapan semalaman', 'Tekstur nyaman untuk malam hari'],
        howTo: ['Bersihkan wajah, lanjutkan toner dan serum.', 'Ratakan krim secukupnya ke wajah dan leher.'],
        tips: ['Gunakan di malam hari.']
      },
      moisturizer: {
        when: 'Pagi & Malam',
        tagline: 'Kunci kelembapan, jaga skin barrier tetap kuat.',
        description: '{name} adalah pelembap yang membantu mengunci kelembapan dan menjaga skin barrier agar kulit terasa nyaman, lembap, dan tidak mudah kering.',
        benefits: ['Mengunci kelembapan kulit', 'Mendukung skin barrier yang sehat', 'Cocok sebelum sunscreen (pagi) atau sebagai langkah akhir (malam)'],
        howTo: [
          'Gunakan setelah toner dan serum.',
          'Ambil secukupnya (sebesar kacang almond).',
          'Ratakan ke wajah dan leher dengan gerakan lembut ke atas.',
          'Pagi hari, lanjutkan dengan sunscreen.'
        ],
        tips: ['Gunakan pagi dan malam.', 'Tambahkan sedikit bila kulit terasa sangat kering.']
      },
      sunscreen: {
        when: 'Pagi (ulangi bila perlu)',
        tagline: 'Langkah wajib pagi hari untuk melindungi kulit dari sinar UV.',
        description: '{name} membantu melindungi kulit dari paparan sinar UV yang dapat memicu noda gelap dan penuaan dini. Sunscreen adalah langkah terakhir rutinitas pagi.',
        benefits: ['Melindungi kulit dari sinar UV', 'Membantu mencegah noda gelap bertambah', 'Langkah terakhir rutinitas pagi'],
        howTo: [
          'Gunakan sebagai langkah terakhir rutinitas pagi, setelah pelembap.',
          'Ambil sunscreen sebanyak dua ruas jari untuk wajah dan leher.',
          'Ratakan hingga seluruh wajah tertutup, termasuk telinga.',
          'Oleskan ulang setiap 2–3 jam bila berada di luar ruangan atau setelah berkeringat.'
        ],
        tips: ['Gunakan setiap hari, termasuk saat mendung atau di dalam ruangan dekat jendela.', 'Bersihkan dengan pembersih wajah di malam hari.']
      },
      mask: {
        when: '1–2× seminggu',
        tagline: 'Perawatan ekstra untuk kulit, ibarat me-time di rumah.',
        description: '{name} adalah masker perawatan ekstra yang dipakai berkala untuk melengkapi rutinitas harian.',
        benefits: ['Perawatan ekstra di luar rutinitas harian', 'Dipakai berkala sesuai kebutuhan kulit', 'Mudah dipakai di rumah'],
        howTo: ['Bersihkan wajah terlebih dahulu.', 'Gunakan sesuai petunjuk pada kemasan.', 'Bilas bersih (kecuali masker yang tidak dibilas), lanjutkan pelembap.'],
        tips: ['Hindari area mata dan bibir.']
      },
      paket: {
        when: 'Sesuai urutan perawatan',
        tagline: 'Bundling hemat dengan kombinasi perawatan yang saling melengkapi.',
        description: '{name} adalah paket perawatan berisi kombinasi produk pilihan GLOWLYN yang saling melengkapi sehingga rutinitasmu lebih praktis dan lebih hemat dibanding membeli satuan.',
        benefits: ['Harga bundling lebih hemat', 'Kombinasi produk saling melengkapi', 'Praktis, rutinitas langsung lengkap'],
        howTo: [
          'Gunakan produk dalam paket sesuai urutan: bersihkan, segarkan, rawat dengan serum, lalu lembapkan.',
          'Pagi hari, tutup rutinitas dengan sunscreen.',
          'Untuk masker atau perawatan ekstra, gunakan berkala sesuai petunjuk pada kemasan masing-masing.'
        ],
        tips: ['Isi lengkap paket dapat dikonfirmasi lewat WhatsApp sebelum memesan.']
      },
      'default': {
        when: 'Sesuai kebutuhan',
        tagline: 'Perawatan lembut dari GLOWLYN.',
        description: '{name} adalah produk perawatan GLOWLYN yang dirancang lembut untuk kulit.',
        benefits: ['Formula lembut', 'Mudah dipakai harian'],
        howTo: ['Gunakan sesuai petunjuk pada kemasan.'],
        tips: []
      }
    },

    commonTips: [PATCH_TEST, STORAGE],

    products: {
      'ceramide-barrier-gel': {
        tagline: 'Gel pelembap ringan untuk skin barrier yang kuat dan kulit yang lembap.',
        ingredients: [{ name: 'Ceramide', benefit: 'Membantu memperkuat skin barrier dan menjaga kelembapan kulit.' }]
      },
      'niacinamide-10-serum': {
        tagline: 'Serum pencerah dengan Niacinamide 10% untuk kulit tampak lebih rata dan cerah.',
        ingredients: [{ name: 'Niacinamide 10%', benefit: 'Membantu mencerahkan, menyamarkan noda gelap, dan meratakan warna kulit.' }]
      },
      'c-glow-vitamin-c': {
        tagline: 'Serum Vitamin C untuk kulit tampak cerah dan bercahaya.',
        ingredients: [{ name: 'Vitamin C', benefit: 'Antioksidan yang membantu mencerahkan kulit dan menyamarkan noda gelap.' }],
        extraTips: ['Gunakan sunscreen setiap pagi saat memakai serum Vitamin C.']
      },
      'multi-hyaluronic-serum': {
        tagline: 'Hidrasi berlapis dari serum hyaluronic untuk kulit kenyal dan lembap.',
        ingredients: [{ name: 'Hyaluronic Acid (Multi-Hydration)', benefit: 'Membantu menarik dan menjaga kelembapan di beberapa lapisan kulit.' }]
      },
      'cica-clarifying-toner': {
        tagline: 'Toner penenang untuk kulit berjerawat dan sensitif.',
        ingredients: [{ name: 'Cica (Centella Asiatica)', benefit: 'Membantu menenangkan kulit yang mudah kemerahan dan sensitif.' }]
      },
      'hydra-glow-toner': { tagline: 'Toner hidrasi untuk kulit lembap dan tampak glowing.' },
      'deep-aqua-cream': { tagline: 'Krim pelembap kaya hidrasi untuk menjaga skin barrier.' },
      'uv-watery-sun-shield': {
        tagline: 'Sunscreen bertekstur watery yang ringan dan nyaman untuk kulit sensitif.',
        ingredients: [{ name: 'SPF 50 PA++++', benefit: 'Perlindungan tinggi dari sinar UVB dan UVA.' }]
      },
      'tone-up-spf-50': {
        tagline: 'Sunscreen SPF 50 dengan efek tone-up yang natural.',
        ingredients: [{ name: 'SPF 50', benefit: 'Melindungi kulit dari paparan sinar UV sekaligus mencerahkan tampilan kulit (tone-up).' }]
      },
      'aha-bha-pha-peeling-mask': {
        tagline: 'Peeling mask AHA BHA PHA untuk kulit tampak lebih halus dan cerah.',
        ingredients: [{ name: 'AHA, BHA, PHA', benefit: 'Kombinasi eksfoliasi kimia yang membantu mengangkat sel kulit mati, merawat noda gelap dan bekas jerawat.' }],
        howTo: [
          'Gunakan pada kulit yang bersih dan kering.',
          'Oleskan tipis dan merata, hindari area mata, bibir, dan kulit yang luka.',
          'Diamkan sesuai waktu pada petunjuk kemasan, lalu bilas bersih.',
          'Lanjutkan dengan pelembap.'
        ],
        extraTips: ['Gunakan maksimal 1–2× seminggu.', 'Wajib memakai sunscreen di pagi hari setelah memakai eksfoliasi.']
      },
      'purifying-clay-mask': {
        tagline: 'Clay mask untuk membersihkan pori secara mendalam.',
        ingredients: [{ name: 'Clay', benefit: 'Membantu menyerap minyak berlebih dan kotoran dari pori.' }],
        howTo: [
          'Oleskan masker merata pada wajah yang bersih, hindari area mata dan bibir.',
          'Diamkan hingga terasa mulai mengering (jangan sampai retak).',
          'Bilas dengan air hangat, lalu lanjutkan dengan toner dan pelembap.'
        ],
        extraTips: ['Gunakan 1–2× seminggu.']
      },
      'exfoliating-mask': {
        tagline: 'Masker eksfoliasi untuk kulit lebih halus dan cerah.',
        howTo: [
          'Oleskan tipis pada wajah yang bersih, hindari area mata dan bibir.',
          'Diamkan sesuai petunjuk pada kemasan.',
          'Bilas bersih, lanjutkan dengan pelembap.'
        ],
        extraTips: ['Gunakan 1–2× seminggu dan pakai sunscreen di pagi hari.']
      },
      'peel-off-mask': {
        tagline: 'Peel-off mask untuk merawat komedo dan pori.',
        howTo: [
          'Oleskan lapisan tipis dan merata pada wajah yang bersih, hindari alis, rambut, dan area mata.',
          'Tunggu hingga mengering sepenuhnya.',
          'Kelupas perlahan dari tepi, lalu bersihkan sisa dengan air.',
          'Lanjutkan dengan toner dan pelembap.'
        ],
        extraTips: ['Gunakan maksimal 1× seminggu agar kulit tidak teriritasi.']
      },
      'powder-mask': {
        tagline: 'Masker bubuk yang menenangkan, dicampur sebelum dipakai.',
        howTo: [
          'Campurkan bubuk dengan air sesuai petunjuk kemasan hingga menjadi pasta halus.',
          'Oleskan merata pada wajah yang bersih, hindari area mata dan bibir.',
          'Diamkan sesuai petunjuk kemasan, lalu bilas bersih.',
          'Lanjutkan dengan pelembap.'
        ],
        extraTips: ['Campur secukupnya setiap kali pakai; jangan disimpan setelah dicampur.']
      },
      'sheet-mask': {
        tagline: 'Hidrasi instan dalam satu lembar.',
        when: '2–3× seminggu',
        howTo: [
          'Setelah mencuci wajah dan memakai toner, buka kemasan dan pasang masker pada wajah.',
          'Diamkan sekitar 10–15 menit.',
          'Lepas masker, tepuk lembut sisa essence hingga meresap (tidak perlu dibilas).',
          'Lanjutkan dengan pelembap.'
        ],
        extraTips: ['Jangan didiamkan hingga masker mengering.']
      },
      'sleeping-mask': {
        tagline: 'Masker tidur untuk perawatan semalaman.',
        when: 'Malam hari',
        howTo: [
          'Gunakan sebagai langkah terakhir rutinitas malam.',
          'Oleskan lapisan tipis dan merata ke wajah dan leher.',
          'Biarkan semalaman, lalu bilas dengan air bersih di pagi hari.'
        ],
        extraTips: ['Gunakan 2–3× seminggu atau sesuai kebutuhan kulit.']
      }
    }
  };
})(window.Glowlyn = window.Glowlyn || {});
