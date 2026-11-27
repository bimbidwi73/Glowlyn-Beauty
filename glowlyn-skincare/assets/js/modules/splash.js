/**
 * Modul Splash — animasi pembuka logo GLOWLYN.
 * Animasinya berjalan lewat CSS (assets/css/splash.css); modul ini hanya:
 *  - menghapus splash setelah animasi keluar selesai,
 *  - menangani tombol "Lewati",
 *  - melewati splash bila dimatikan di config, sudah pernah tampil di sesi ini
 *    (opsional), atau pengunjung memilih mengurangi animasi (reduced motion).
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var SEEN_KEY = 'glowlyn.splash-seen';

  function wasSeen() {
    try { return sessionStorage.getItem(SEEN_KEY) === '1'; } catch (e) { return false; }
  }

  function markSeen() {
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch (e) { /* abaikan */ }
  }

  function remove(el) {
    document.body.classList.remove('is-locked');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function init() {
    var el = document.getElementById('splash');
    if (!el) return;

    var cfg = G.config || {};
    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (cfg.SPLASH_ENABLED === false || reduceMotion ||
        (cfg.SPLASH_ONCE_PER_SESSION && wasSeen())) {
      remove(el);
      return;
    }

    var done = false;
    function finish() {
      if (done) return;
      done = true;
      markSeen();
      remove(el);
    }

    document.body.classList.add('is-locked'); // cegah scroll selama splash

    // Selesai saat animasi keluar (splash-exit / splash-exit-fast) berakhir
    el.addEventListener('animationend', function (e) {
      if (e.target === el && e.animationName.indexOf('splash-exit') === 0) finish();
    });

    var skip = document.getElementById('splash-skip');
    if (skip) {
      skip.addEventListener('click', function () { el.classList.add('is-leaving'); });
    }

    // Jaring pengaman bila animationend tidak pernah terpicu
    setTimeout(finish, cfg.SPLASH_MAX_MS || 5000);
  }

  G.modules.splash = { init: init };
})(window.Glowlyn = window.Glowlyn || {});
