/**
 * Modul Promo — flash sale, countdown, New Arrival, Best Seller, banner promo,
 * dan strip kategori cepat. Semua dihitung dari G.data.products.
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var dom = G.utils.dom;
  var fmt = G.utils.format;
  var card = G.modules.productCard;

  function pad(n) { return String(n).padStart(2, '0'); }

  /* ---------- Countdown ---------- */
  function initCountdown() {
    var section = document.getElementById('promo');
    var ids = { day: 'timer-day', hour: 'timer-hour', min: 'timer-min', sec: 'timer-sec' };
    var endsAt = new Date(G.config.FLASH_SALE_ENDS_AT).getTime();
    var interval = null;

    function tick() {
      var diff = endsAt - Date.now();
      if (diff <= 0) {
        clearInterval(interval);
        if (section) section.classList.add('hidden');
        return;
      }
      var s = Math.floor(diff / 1000);
      document.getElementById(ids.day).textContent = pad(Math.floor(s / 86400));
      document.getElementById(ids.hour).textContent = pad(Math.floor((s % 86400) / 3600));
      document.getElementById(ids.min).textContent = pad(Math.floor((s % 3600) / 60));
      document.getElementById(ids.sec).textContent = pad(s % 60);
    }

    tick();
    interval = setInterval(tick, 1000);
  }

  /* ---------- Daftar produk beranda ---------- */
  function renderProductSections() {
    var products = G.data.products;

    card.renderList('flash-grid',
      products.filter(function (p) { return p.flashSale; }),
      { cta: 'Klaim Flash Sale' });

    card.renderList('new-arrivals-grid',
      products.filter(function (p) { return p.newArrival; }),
      { badge: 'BARU', showSold: false });

    card.renderList('best-sellers-grid',
      products
        .filter(function (p) { return p.bestSellerRank; })
        .sort(function (a, b) { return a.bestSellerRank - b.bestSellerRank; }),
      function (p) { return { badge: 'TOP #' + p.bestSellerRank }; });
  }

  /* ---------- Banner promo ---------- */
  function renderBanners() {
    var box = document.getElementById('promo-banners');
    if (!box) return;
    box.innerHTML = G.data.promoBanners.map(function (b) {
      return '' +
        '<div class="promo-banner promo-banner--' + b.variant + '">' +
          '<div>' +
            '<span class="promo-banner__tag">' + fmt.escapeHtml(b.tag) + '</span>' +
            '<h3 class="promo-banner__title">' + fmt.escapeHtml(b.title) + '</h3>' +
            '<p class="promo-banner__text">' + fmt.escapeHtml(b.text) + '</p>' +
          '</div>' +
          '<a class="btn" href="' + b.href + '">' + fmt.escapeHtml(b.cta) + dom.icon('arrow_forward') + '</a>' +
        '</div>';
    }).join('');
  }

  /* ---------- Kategori cepat ---------- */
  function renderQuickCategories() {
    var box = document.getElementById('quick-cats');
    if (!box) return;
    box.innerHTML = G.data.categories.map(function (c) {
      return '' +
        '<a class="quick-cat" href="#katalog-produk" data-category="' + c.id + '">' +
          '<span class="quick-cat__icon">' + dom.icon(c.icon) + '</span>' +
          '<span class="quick-cat__label">' + c.label + '</span>' +
        '</a>';
    }).join('');
  }

  /* ---------- Gambar filosofi ---------- */
  function renderPhilosophyImage() {
    var el = document.getElementById('philosophy-img');
    var img = G.data.images.philosophy;
    if (!el || !img) return;
    el.src = img.src;
    el.alt = img.alt;
  }

  G.modules.promo = {
    init: function () {
      renderPhilosophyImage();
      renderQuickCategories();
      renderProductSections();
      renderBanners();
      initCountdown();
    }
  };
})(window.Glowlyn = window.Glowlyn || {});
