/**
 * Modul Menu HP — tombol hamburger yang membuka panel navigasi dari kiri
 * (tampil di layar ≤ 900px, saat menu utama disembunyikan).
 * Tutup dengan: tombol X, klik latar gelap, Escape, atau memilih tautan.
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var dom = G.utils.dom;
  var menu, overlay, toggle;

  function setOpen(open) {
    if (!menu) return;
    menu.classList.toggle('is-open', open);
    overlay.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    dom.lockScroll(open);
    if (open) {
      var first = menu.querySelector('.mobile-menu__link');
      if (first) first.focus({ preventScroll: true });
    } else {
      toggle.focus({ preventScroll: true });
    }
  }

  function init() {
    menu = document.getElementById('mobile-menu');
    overlay = document.getElementById('mobile-overlay');
    toggle = document.getElementById('menu-toggle');
    if (!menu || !overlay || !toggle) return;

    toggle.addEventListener('click', function () { setOpen(!menu.classList.contains('is-open')); });
    overlay.addEventListener('click', function () { setOpen(false); });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('[data-menu-close]')) { setOpen(false); return; }
      // Memilih tautan/tombol di menu: tutup panel (modal Lacak Pesanan dibuka modul modal)
      if (e.target.closest('a, button[data-open-modal]')) {
        menu.classList.remove('is-open');
        overlay.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        // Kunci scroll dilepas, kecuali modal akan dibuka
        if (!e.target.closest('[data-open-modal]')) dom.lockScroll(false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
    });

    // Jika layar diperbesar sampai menu desktop muncul, pastikan panel tertutup
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (m) {
      if (m.matches && menu.classList.contains('is-open')) setOpen(false);
    });
  }

  G.modules.mobileMenu = { init: init, close: function () { setOpen(false); } };
})(window.Glowlyn = window.Glowlyn || {});
