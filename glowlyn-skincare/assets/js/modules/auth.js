/**
 * Modul Akun — login DEMO (hanya menyimpan nama di browser).
 * Autentikasi sungguhan (Auth.js / Supabase Auth) dikerjakan pada Fase 2.
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var storage = G.utils.storage;
  var KEY = G.config.STORAGE_KEYS.USER;

  function updateLabel() {
    var user = storage.get(KEY, null);
    document.getElementById('header-user-label').textContent = user ? user.name : 'Masuk';
    document.getElementById('logout-btn').classList.toggle('hidden', !user);
  }

  function init() {
    var form = document.getElementById('login-form');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      if (!name) return;
      storage.set(KEY, { name: name });
      updateLabel();
      form.reset();
      G.modules.modal.close('login-modal');
      G.utils.dom.toast('Halo, ' + name + '!');
    });

    document.getElementById('logout-btn').addEventListener('click', function () {
      storage.remove(KEY);
      updateLabel();
      G.modules.modal.close('login-modal');
    });

    updateLabel();
  }

  G.modules.auth = { init: init };
})(window.Glowlyn = window.Glowlyn || {});
