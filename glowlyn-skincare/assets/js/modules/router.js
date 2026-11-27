/**
 * Modul Router — menampilkan satu halaman (view) pada satu waktu,
 * berdasarkan #hash di URL. Menu aktif ikut ditandai.
 *
 * Alias: hash lama (mis. #katalog-produk) diarahkan ke view yang memuatnya.
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var dom = G.utils.dom;
  var DEFAULT_VIEW = 'beranda';

  var ROUTES = {
    beranda: 'beranda',
    'new-arrivals': 'beranda',
    'best-sellers': 'beranda',
    filosofi: 'beranda',
    'katalog-produk': 'belanja',
    promo: 'promo',
    'ulasan-pelanggan': 'ulasan',
    faq: 'faq',
    kontak: 'kontak',
    favorit: 'wishlist'
  };

  function show() {
    var id = window.location.hash.slice(1);
    var productId = id.indexOf('produk/') === 0 ? decodeURIComponent(id.slice(7)) : null;
    var view = productId ? 'detail' : (ROUTES[id] || DEFAULT_VIEW);

    // Halaman detail produk (#produk/<id>); id tidak dikenal -> kembali ke katalog
    if (productId) {
      if (!G.modules.productDetail.show(productId)) {
        window.location.hash = '#katalog-produk';
        return;
      }
    } else {
      G.modules.productDetail.reset();
    }
    if (view === 'wishlist') G.modules.wishlist.renderView();

    // Di halaman detail, menu "Belanja" tetap ditandai aktif
    var navView = view === 'detail' ? 'belanja' : view;

    dom.$$('.view').forEach(function (el) {
      el.classList.toggle('is-active', el.getAttribute('data-view') === view);
    });

    dom.$$('a.nav__link, a.mobile-menu__link').forEach(function (link) {
      var target = ROUTES[link.getAttribute('href').slice(1)];
      link.classList.toggle('is-active', target === navView);
    });

    // Anchor di dalam beranda (mis. #best-sellers) di-scroll; selain itu ke atas.
    var anchor = id && id !== view && document.getElementById(id);
    if (anchor && anchor.closest('.view.is-active')) {
      anchor.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }

  G.modules.router = {
    init: function () {
      window.addEventListener('hashchange', show);
      show();
    },
    go: function (id) { window.location.hash = '#' + id; }
  };
})(window.Glowlyn = window.Glowlyn || {});
