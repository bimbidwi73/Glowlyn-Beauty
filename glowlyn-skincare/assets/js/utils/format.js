/**
 * Fungsi bantu pemformatan: Rupiah, diskon, escape HTML, singkatan angka.
 */
(function (G) {
  'use strict';
  G.utils = G.utils || {};

  var rupiahFormatter = new Intl.NumberFormat('id-ID');

  G.utils.format = {
    /** 89000 -> "Rp 89.000" */
    rupiah: function (value) {
      return 'Rp ' + rupiahFormatter.format(value);
    },

    /** Persentase diskon dibulatkan ke bawah; 0 bila tidak ada harga coret. */
    discountPercent: function (price, oldPrice) {
      if (!oldPrice || oldPrice <= price) return 0;
      return Math.floor((1 - price / oldPrice) * 100);
    },

    /** 2400 -> "2,4k+" ; angka kecil ditampilkan apa adanya. */
    soldLabel: function (sold) {
      if (sold < 1000) return sold + ' terjual';
      return (sold / 1000).toFixed(1).replace('.', ',') + 'k+ terjual';
    },

    /** Mencegah injeksi HTML dari input pengguna. */
    escapeHtml: function (text) {
      return String(text).replace(/[&<>"']/g, function (ch) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
      });
    },

    /** Nomor pesanan unik, mis. GLW-20261119-4821. */
    orderNumber: function () {
      var d = new Date();
      var pad = function (n) { return String(n).padStart(2, '0'); };
      var date = d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate());
      return 'GLW-' + date + '-' + Math.floor(1000 + Math.random() * 9000);
    }
  };
})(window.Glowlyn = window.Glowlyn || {});
