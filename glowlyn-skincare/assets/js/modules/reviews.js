/**
 * Modul Ulasan — ulasan tampil dalam 3 kolom yang bergerak bergantian
 * naik dan turun (animasi CSS), dengan filter bintang dan formulir tambah ulasan.
 * Ulasan baru disimpan di browser pengguna (localStorage).
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var dom = G.utils.dom;
  var fmt = G.utils.format;
  var storage = G.utils.storage;
  var KEY = G.config.STORAGE_KEYS.REVIEWS;

  var COLUMNS = 3;
  var MIN_CARDS_PER_GROUP = 4; // agar loop animasi tidak terlihat kosong
  var state = { filter: 'all' };

  var FILTERS = {
    all: function () { return true; },
    '5': function (r) { return r.rating === 5; },
    '4': function (r) { return r.rating === 4; }
  };

  function allReviews() {
    return storage.get(KEY, []).concat(G.data.reviews);
  }

  function stars(rating) {
    var out = '';
    for (var i = 1; i <= 5; i++) out += dom.icon('star', i <= rating);
    return out;
  }

  function cardTemplate(r) {
    return '' +
      '<article class="review-card">' +
        '<div class="review-card__head">' +
          '<span class="review-card__name">' + fmt.escapeHtml(r.name) + '</span>' +
          '<span class="review-card__stars" aria-label="Bintang ' + r.rating + ' dari 5">' + stars(r.rating) + '</span>' +
        '</div>' +
        '<p class="review-card__product">' + fmt.escapeHtml(r.product) + '</p>' +
        '<p class="review-card__text">' + fmt.escapeHtml(r.text) + '</p>' +
      '</article>';
  }

  /** Membagi ulasan ke kolom secara bergiliran. */
  function splitColumns(list) {
    var cols = [];
    for (var c = 0; c < COLUMNS; c++) cols.push([]);
    list.forEach(function (r, i) { cols[i % COLUMNS].push(r); });
    return cols.filter(function (col) { return col.length; });
  }

  /** Satu grup kartu (diulang sampai cukup panjang), lalu digandakan untuk loop mulus. */
  function trackHtml(items) {
    var group = [];
    while (group.length < MIN_CARDS_PER_GROUP) group = group.concat(items);
    var html = group.map(cardTemplate).join('');
    return html + '<div aria-hidden="true" class="reviews__copy" style="display:contents">' + html + '</div>';
  }

  function render() {
    var filtered = allReviews().filter(FILTERS[state.filter]);
    var box = document.getElementById('reviews-list');

    if (!filtered.length) {
      box.style.height = 'auto';
      box.innerHTML = '<p class="reviews__empty">Belum ada ulasan untuk filter ini.</p>';
    } else {
      box.style.height = '';
      box.innerHTML = splitColumns(filtered).map(function (items, i) {
        var direction = i % 2 === 0 ? 'up' : 'down';
        return '<div class="reviews__col"><div class="reviews__track reviews__track--' + direction + '">' +
          trackHtml(items) + '</div></div>';
      }).join('');
    }

    dom.$$('#reviews-filters .pill-btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-filter') === state.filter);
    });
  }

  function bindEvents() {
    document.getElementById('reviews-filters').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      state.filter = btn.getAttribute('data-filter');
      render();
    });

    var form = document.getElementById('review-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var text = form.elements.text.value.trim();
      if (!name || text.length < 10) {
        dom.toast('Isi nama dan ulasan (minimal 10 karakter)');
        return;
      }
      var saved = storage.get(KEY, []);
      saved.unshift({
        id: 'u' + Date.now(),
        name: name,
        rating: Number(form.elements.rating.value),
        product: form.elements.product.value,
        text: text
      });
      storage.set(KEY, saved);
      form.reset();
      G.modules.modal.close('review-modal');
      state.filter = 'all';
      render();
      dom.toast('Terima kasih atas ulasan Anda');
    });
  }

  function init() {
    document.getElementById('review-product').innerHTML = G.data.products.map(function (p) {
      return '<option value="' + fmt.escapeHtml(p.name) + '">' + fmt.escapeHtml(p.name) + '</option>';
    }).join('');
    bindEvents();
    render();
  }

  G.modules.reviews = { init: init };
})(window.Glowlyn = window.Glowlyn || {});
