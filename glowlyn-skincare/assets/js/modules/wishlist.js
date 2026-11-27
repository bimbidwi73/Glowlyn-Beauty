/**
 * Modul Wishlist (Favorit) — simpan produk favorit di localStorage.
 * Tombol hati memakai atribut: data-action="toggle-wishlist" data-id="..."
 * Saat produk disimpan, hati "meledak" menjadi kilauan kecil.
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var dom = G.utils.dom;
  var fmt = G.utils.format;
  var KEY = G.config.STORAGE_KEYS.WISHLIST;
  var ids = null; // dimuat sekali, dibaca secara lazy supaya aman dipanggil kapan saja

  function load() {
    if (ids) return ids;
    var saved = G.utils.storage.get(KEY, []);
    ids = Array.isArray(saved) ? saved : [];
    return ids;
  }

  function has(id) { return load().indexOf(id) !== -1; }
  function save() { G.utils.storage.set(KEY, load()); }

  /** HTML tombol hati (dipakai kartu produk dan halaman detail). */
  function buttonHtml(product, extraClass) {
    var active = has(product.id);
    return '<button class="wish-btn' + (extraClass ? ' ' + extraClass : '') + (active ? ' is-active' : '') + '" type="button"' +
      ' data-action="toggle-wishlist" data-id="' + product.id + '" aria-pressed="' + active + '"' +
      ' aria-label="Simpan ' + fmt.escapeHtml(product.name) + ' ke favorit">' +
      dom.icon('favorite') + '</button>';
  }

  function syncButtons(id) {
    var active = has(id);
    dom.$$('[data-action="toggle-wishlist"][data-id="' + id + '"]').forEach(function (btn) {
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  function updateBadge() {
    var badge = document.getElementById('wish-count');
    if (!badge) return;
    badge.textContent = load().length;
    badge.classList.toggle('hidden', load().length === 0);
  }

  /** Menampilkan daftar favorit di halaman #favorit. */
  function renderView() {
    var grid = document.getElementById('wishlist-grid');
    var empty = document.getElementById('wishlist-empty');
    if (!grid) return;
    var products = load().map(function (id) {
      return G.data.products.filter(function (p) { return p.id === id; })[0];
    }).filter(Boolean);

    if (empty) empty.classList.toggle('hidden', products.length > 0);
    grid.classList.toggle('hidden', products.length === 0);
    G.modules.productCard.renderList('wishlist-grid', products);
    G.modules.whatsapp.init(); // kartu baru: pasang tautan WhatsApp
  }

  function toggle(id, originEl) {
    var product = G.data.products.filter(function (p) { return p.id === id; })[0];
    if (!product) return;
    var list = load();
    var idx = list.indexOf(id);
    if (idx === -1) {
      list.push(id);
      dom.toast(product.name + ' disimpan ke favorit');
      if (originEl && G.modules.sparkles && G.modules.sparkles.burst) {
        var r = originEl.getBoundingClientRect();
        G.modules.sparkles.burst(r.left + r.width / 2, r.top + r.height / 2);
      }
    } else {
      list.splice(idx, 1);
      dom.toast(product.name + ' dihapus dari favorit');
    }
    save();
    syncButtons(id);
    updateBadge();
    if (dom.$('.view.is-active[data-view="wishlist"]')) renderView();
  }

  function init() {
    load();
    updateBadge();
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action="toggle-wishlist"]');
      if (!btn) return;
      e.preventDefault();
      toggle(btn.getAttribute('data-id'), btn);
      btn.classList.remove('is-pop');
      void btn.offsetWidth;
      btn.classList.add('is-pop');
    });
  }

  G.modules.wishlist = { init: init, has: has, toggle: toggle, buttonHtml: buttonHtml, renderView: renderView };
})(window.Glowlyn = window.Glowlyn || {});
