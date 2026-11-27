/**
 * Fungsi bantu DOM: pemilih elemen, toast, dan kunci scroll.
 */
(function (G) {
  'use strict';
  G.utils = G.utils || {};

  var toastRegion = null;

  G.utils.dom = {
    $: function (selector, root) {
      return (root || document).querySelector(selector);
    },

    $$: function (selector, root) {
      return Array.prototype.slice.call((root || document).querySelectorAll(selector));
    },

    /** Ikon Material Symbols. */
    icon: function (name, filled) {
      return '<span class="icon' + (filled ? ' icon--filled' : '') + '" aria-hidden="true">' + name + '</span>';
    },

    /** Menampilkan notifikasi singkat. */
    toast: function (message) {
      if (!toastRegion) toastRegion = document.getElementById('toast-region');
      if (!toastRegion) return;
      var el = document.createElement('div');
      el.className = 'toast';
      el.textContent = message;
      toastRegion.appendChild(el);
      setTimeout(function () { el.remove(); }, 2600);
    },

    lockScroll: function (locked) {
      document.body.classList.toggle('is-locked', locked);
    }
  };
})(window.Glowlyn = window.Glowlyn || {});
