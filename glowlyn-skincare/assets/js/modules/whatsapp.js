/**
 * Modul WhatsApp — satu-satunya tempat yang membuat tautan wa.me.
 * Elemen HTML cukup diberi atribut data-wa (dan opsional data-wa-text).
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var cfg = G.config;

  function buildLink(text) {
    return 'https://wa.me/' + cfg.WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text || cfg.WHATSAPP_DEFAULT_TEXT);
  }

  /** 6285648720346 -> 0856-4872-0346 */
  function displayNumber() {
    var local = '0' + cfg.WHATSAPP_NUMBER.replace(/^62/, '');
    return local.replace(/^(\d{4})(\d{4})(\d+)$/, '$1-$2-$3');
  }

  function hydrate() {
    G.utils.dom.$$('[data-wa]').forEach(function (el) {
      el.href = buildLink(el.getAttribute('data-wa-text'));
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    });
    G.utils.dom.$$('[data-wa-number]').forEach(function (el) {
      el.textContent = displayNumber();
    });
    G.utils.dom.$$('[data-wa-cta]').forEach(function (el) {
      el.textContent = cfg.WHATSAPP_CTA_TEXT;
    });
  }

  G.modules.whatsapp = {
    init: hydrate,
    buildLink: buildLink,
    open: function (text) {
      window.open(buildLink(text), '_blank', 'noopener');
    }
  };
})(window.Glowlyn = window.Glowlyn || {});
