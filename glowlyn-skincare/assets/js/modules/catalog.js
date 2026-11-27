/**
 * Modul Katalog — filter status, kategori, masalah kulit, rentang harga,
 * pencarian, dan pengurutan. Pilihan filter disimpan di URL (arsitektur 5.2):
 *   ?status=promo&kategori=serum&masalah=sensitive&min=50000&max=100000&urut=harga-asc&q=glow
 * Kategori dan masalah kulit yang belum punya produk tidak ditampilkan di filter.
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var dom = G.utils.dom;
  var card = G.modules.productCard;

  var SORTERS = {
    populer: function (a, b) { return b.sold - a.sold; },
    terbaru: function (a, b) { return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0); },
    'harga-asc': function (a, b) { return a.price - b.price; },
    'harga-desc': function (a, b) { return b.price - a.price; }
  };

  /** Filter Status: id -> fungsi pengecek. */
  var STATUS_CHECK = {
    promo: function (p) { return !!p.oldPrice && p.oldPrice > p.price; },
    produk_baru: function (p) { return !!p.newArrival; },
    best_seller: function (p) { return !!p.bestSellerRank; }
  };

  function emptyState() {
    return { status: [], kategori: [], masalah: [], min: null, max: null, urut: 'populer', q: '' };
  }
  var state = emptyState();

  /* ---------- State <-> URL ---------- */
  function list(value) { return value ? value.split(',') : []; }

  function readUrl() {
    var p = new URLSearchParams(window.location.search);
    state.status = list(p.get('status'));
    state.kategori = list(p.get('kategori'));
    state.masalah = list(p.get('masalah'));
    state.min = p.get('min') ? Number(p.get('min')) : null;
    state.max = p.get('max') ? Number(p.get('max')) : null;
    state.urut = SORTERS[p.get('urut')] ? p.get('urut') : 'populer';
    state.q = p.get('q') || '';
  }

  function writeUrl() {
    var p = new URLSearchParams();
    if (state.status.length) p.set('status', state.status.join(','));
    if (state.kategori.length) p.set('kategori', state.kategori.join(','));
    if (state.masalah.length) p.set('masalah', state.masalah.join(','));
    if (state.min !== null) p.set('min', state.min);
    if (state.max !== null) p.set('max', state.max);
    if (state.urut !== 'populer') p.set('urut', state.urut);
    if (state.q) p.set('q', state.q);
    var query = p.toString();
    try {
      history.replaceState(null, '', window.location.pathname + (query ? '?' + query : '') + window.location.hash);
    } catch (e) { /* file:// pada beberapa browser: abaikan */ }
  }

  /* ---------- Filter ---------- */
  function matches(product) {
    if (state.status.length && !state.status.some(function (s) { return STATUS_CHECK[s] && STATUS_CHECK[s](product); })) return false;
    if (state.kategori.length && state.kategori.indexOf(product.category) === -1) return false;
    if (state.masalah.length && !product.concerns.some(function (c) { return state.masalah.indexOf(c) !== -1; })) return false;
    if (state.min !== null && product.price < state.min) return false;
    if (state.max !== null && product.price > state.max) return false;
    if (state.q) {
      var haystack = (product.name + ' ' + product.subtitle + ' ' + product.category).toLowerCase();
      if (haystack.indexOf(state.q.toLowerCase()) === -1) return false;
    }
    return true;
  }

  function render() {
    var results = G.data.products.filter(matches).sort(SORTERS[state.urut]);
    var grid = document.getElementById('catalog-grid');

    if (results.length) {
      card.renderList('catalog-grid', results);
      G.modules.whatsapp.init(); // kartu baru: pasang tautan WhatsApp
    } else {
      grid.innerHTML = '<p class="catalog__empty">Produk tidak ditemukan. Coba ubah atau hapus filter.</p>';
    }
    document.getElementById('catalog-count').innerHTML = 'Menampilkan <strong>' + results.length + '</strong> produk pilihan';
    writeUrl();
  }

  /* ---------- Kontrol filter ---------- */
  /** Hanya tampilkan opsi yang dipakai minimal satu produk. */
  function checkboxGroup(containerId, items, name, usedIds) {
    document.getElementById(containerId).innerHTML = items
      .filter(function (item) { return usedIds.indexOf(item.id) !== -1; })
      .map(function (item) {
        return '<label class="filters__option">' +
          '<input type="checkbox" name="' + name + '" value="' + item.id + '"> ' + item.label +
        '</label>';
      }).join('');
  }

  function syncControls() {
    ['status', 'kategori', 'masalah'].forEach(function (name) {
      dom.$$('input[name="' + name + '"]').forEach(function (cb) { cb.checked = state[name].indexOf(cb.value) !== -1; });
    });
    document.getElementById('filter-min').value = state.min === null ? '' : state.min;
    document.getElementById('filter-max').value = state.max === null ? '' : state.max;
    document.getElementById('catalog-sort').value = state.urut;
    document.getElementById('search-input').value = state.q;
  }

  function checkedValues(name) {
    return dom.$$('input[name="' + name + '"]:checked').map(function (cb) { return cb.value; });
  }

  function numberOrNull(value) {
    return value === '' ? null : Math.max(0, Number(value));
  }

  function bindEvents() {
    document.getElementById('catalog-filters').addEventListener('change', function () {
      state.status = checkedValues('status');
      state.kategori = checkedValues('kategori');
      state.masalah = checkedValues('masalah');
      state.min = numberOrNull(document.getElementById('filter-min').value);
      state.max = numberOrNull(document.getElementById('filter-max').value);
      render();
    });

    document.getElementById('catalog-sort').addEventListener('change', function (e) {
      state.urut = e.target.value;
      render();
    });

    document.getElementById('filter-reset').addEventListener('click', function () {
      state = emptyState();
      syncControls();
      render();
    });

    // Pencarian di header
    var search = document.getElementById('search-input');
    search.addEventListener('input', function () {
      state.q = search.value.trim();
      if (state.q) G.modules.router.go('katalog-produk');
      render();
    });
    search.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') G.modules.router.go('katalog-produk');
    });

    // Kategori cepat dari beranda
    document.addEventListener('click', function (e) {
      var link = e.target.closest('[data-category]');
      if (!link) return;
      state = emptyState();
      state.kategori = [link.getAttribute('data-category')];
      syncControls();
      render();
    });
  }

  function init() {
    var products = G.data.products;
    var usedCategories = products.map(function (p) { return p.category; });
    var usedConcerns = [].concat.apply([], products.map(function (p) { return p.concerns; }));

    checkboxGroup('filter-categories', G.data.categories, 'kategori', usedCategories);
    checkboxGroup('filter-concerns', G.data.concerns, 'masalah', usedConcerns);
    readUrl();
    syncControls();
    bindEvents();
    render();
  }

  G.modules.catalog = { init: init };
})(window.Glowlyn = window.Glowlyn || {});