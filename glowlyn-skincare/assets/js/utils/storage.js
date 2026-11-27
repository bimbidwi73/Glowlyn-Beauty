/**
 * Pembungkus localStorage yang aman (tidak error bila diblokir browser).
 */
(function (G) {
  'use strict';
  G.utils = G.utils || {};

  G.utils.storage = {
    get: function (key, fallback) {
      try {
        var raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },

    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) { /* penyimpanan penuh/diblokir: abaikan */ }
    },

    remove: function (key) {
      try { localStorage.removeItem(key); } catch (e) { /* abaikan */ }
    }
  };
})(window.Glowlyn = window.Glowlyn || {});
