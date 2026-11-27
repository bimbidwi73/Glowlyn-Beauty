/**
 * Modul Reveal — konten muncul pelan dari bawah saat masuk layar (scroll).
 * Otomatis menangkap judul bagian, blok isi, dan kartu produk (termasuk yang
 * dibuat belakangan oleh katalog/filter). Kartu dalam satu baris muncul
 * bergantian. Dilewati bila pengunjung memilih "kurangi animasi".
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var CARD = '.product-card';
  // Blok yang dianimasikan: anak langsung container + kartu produk
  var TARGETS = '.view .section .container > *, .view .page-head .container > *, ' + CARD;

  var seen = typeof WeakSet === 'function' ? new WeakSet() : null;
  var io = null;

  function prepare(el) {
    if (seen.has(el)) return;
    seen.add(el);

    // Blok yang isinya kartu produk tidak ikut dianimasikan; kartunya yang muncul
    if (!el.matches(CARD) && el.querySelector(CARD)) return;

    // Jeda bertingkat untuk kartu bersaudara (maksimal 4 per baris)
    if (el.matches(CARD) && el.parentElement) {
      var idx = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.setProperty('--reveal-delay', (idx % 4) * 0.09 + 's');
    }

    el.classList.add('reveal');
    io.observe(el);
  }

  function scan(root) {
    (root || document).querySelectorAll(TARGETS).forEach(prepare);
  }

  function init() {
    var reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window) || !seen) return;

    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);
        el.classList.add('is-visible');
        // Setelah selesai, bersihkan kelas supaya tidak mengganggu efek hover
        el.addEventListener('animationend', function done(e) {
          if (e.target !== el) return;
          el.classList.remove('reveal', 'is-visible');
          el.style.removeProperty('--reveal-delay');
          el.removeEventListener('animationend', done);
        });
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    scan();

    // Tangkap kartu/konten yang dibuat setelah halaman dimuat (filter, urut, dll.)
    new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (n) {
          if (n.nodeType !== 1) return;
          if (n.matches && n.matches(TARGETS)) prepare(n);
          if (n.querySelectorAll) n.querySelectorAll(TARGETS).forEach(prepare);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  G.modules.reveal = { init: init };
})(window.Glowlyn = window.Glowlyn || {});
