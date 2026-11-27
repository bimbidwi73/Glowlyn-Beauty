/**
 * Modul Modal & Drawer — membuka/menutup lewat atribut data:
 *   data-open-modal="id"   data-close-modal   (modal)
 * Tutup juga dengan tombol Escape atau klik latar gelap.
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var dom = G.utils.dom;

  function open(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.add('is-open');
    dom.lockScroll(true);
    var first = el.querySelector('input, textarea, select, button');
    if (first) first.focus();
  }

  function close(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('is-open');
    if (!dom.$('.modal.is-open') && !dom.$('.drawer.is-open')) dom.lockScroll(false);
  }

  function closeAll() {
    dom.$$('.modal.is-open').forEach(function (m) { close(m.id); });
  }

  function init() {
    document.addEventListener('click', function (e) {
      var opener = e.target.closest('[data-open-modal]');
      if (opener) {
        e.preventDefault();
        open(opener.getAttribute('data-open-modal'));
        return;
      }
      var closer = e.target.closest('[data-close-modal]');
      if (closer) {
        var modal = closer.closest('.modal');
        if (modal) close(modal.id);
        return;
      }
      if (e.target.classList && e.target.classList.contains('modal')) close(e.target.id);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });
  }

  G.modules.modal = { init: init, open: open, close: close };
})(window.Glowlyn = window.Glowlyn || {});
