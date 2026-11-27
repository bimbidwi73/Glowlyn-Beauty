/**
 * Modul Keranjang — tambah/ubah/hapus item, hitung total, simpan di localStorage.
 * Harga selalu dibaca ulang dari G.data.products (bukan disimpan di keranjang).
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var dom = G.utils.dom;
  var fmt = G.utils.format;
  var storage = G.utils.storage;
  var KEY = G.config.STORAGE_KEYS.CART;

  var items = []; // [{ id, qty }]

  function findProduct(id) {
    return G.data.products.filter(function (p) { return p.id === id; })[0];
  }

  function save() { storage.set(KEY, items); }

  /* ---------- Operasi ---------- */
  function add(id) {
    var product = findProduct(id);
    if (!product) return;
    var line = items.filter(function (i) { return i.id === id; })[0];
    if (line) line.qty += 1; else items.push({ id: id, qty: 1 });
    save();
    render();
    dom.toast(product.name + ' ditambahkan ke keranjang');
  }

  function setQty(id, qty) {
    if (qty <= 0) {
      items = items.filter(function (i) { return i.id !== id; });
    } else {
      items.forEach(function (i) { if (i.id === id) i.qty = qty; });
    }
    save();
    render();
  }

  function clear() {
    items = [];
    save();
    render();
  }

  /** Mengembalikan baris lengkap dengan data produk dan subtotal. */
  function lines() {
    return items.map(function (i) {
      var p = findProduct(i.id);
      return { product: p, qty: i.qty, subtotal: p.price * i.qty };
    }).filter(function (l) { return l.product; });
  }

  function totals() {
    var subtotal = lines().reduce(function (sum, l) { return sum + l.subtotal; }, 0);
    var shipping = subtotal === 0 || subtotal >= G.config.FREE_SHIPPING_MIN ? 0 : G.config.SHIPPING_FEE;
    return { subtotal: subtotal, shipping: shipping, total: subtotal + shipping };
  }

  function count() {
    return items.reduce(function (sum, i) { return sum + i.qty; }, 0);
  }

  /* ---------- Tampilan ---------- */
  function render() {
    var list = lines();
    var body = document.getElementById('cart-items');
    var badge = document.getElementById('cart-count');
    var t = totals();

    badge.textContent = count();
    badge.classList.toggle('hidden', count() === 0);

    if (!list.length) {
      body.innerHTML = '<p class="drawer__empty">Keranjang masih kosong.</p>';
    } else {
      body.innerHTML = list.map(function (l) {
        var p = l.product;
        var img = G.data.images[p.image];
        var id = fmt.escapeHtml(p.id);
        var name = fmt.escapeHtml(p.name);
        var cat = G.data.categories.filter(function (c) { return c.id === p.category; })[0];
        var variant = [p.subtitle, cat && cat.label].filter(Boolean).join(' \u00b7 ');
        var oldPrice = p.oldPrice && p.oldPrice > p.price
          ? '<span class="cart-item__old">' + fmt.rupiah(p.oldPrice) + '</span>' : '';
        return '' +
          '<div class="cart-item">' +
            '<img class="cart-item__img" src="' + img.src + '" alt="' + name + '">' +
            '<div class="cart-item__info">' +
              '<p class="cart-item__name">' + name + '</p>' +
              (variant ? '<span class="cart-item__variant">' + fmt.escapeHtml(variant) + '</span>' : '') +
              '<p class="cart-item__price">' + fmt.rupiah(p.price) + oldPrice + '</p>' +
              '<div class="cart-item__actions">' +
                '<div class="qty">' +
                  '<button class="qty__btn" type="button" data-cart="dec" data-id="' + id + '" aria-label="Kurangi jumlah"' + (l.qty <= 1 ? ' disabled' : '') + '>\u2212</button>' +
                  '<span class="qty__value" aria-live="polite">' + l.qty + '</span>' +
                  '<button class="qty__btn" type="button" data-cart="inc" data-id="' + id + '" aria-label="Tambah jumlah">+</button>' +
                '</div>' +
                '<button class="cart-item__remove" type="button" data-cart="remove" data-id="' + id + '" aria-label="Hapus ' + name + ' dari keranjang">' +
                  dom.icon('delete') + '<span>Hapus</span>' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</div>';
      }).join('');
    }

    document.getElementById('cart-subtotal').textContent = fmt.rupiah(t.subtotal);
    document.getElementById('cart-shipping').textContent = t.shipping ? fmt.rupiah(t.shipping) : 'Gratis';
    document.getElementById('cart-total').textContent = fmt.rupiah(t.total);
    document.getElementById('cart-checkout-btn').disabled = !list.length;
  }

  function openDrawer(open) {
    document.getElementById('cart-drawer').classList.toggle('is-open', open);
    document.getElementById('cart-overlay').classList.toggle('is-open', open);
    dom.lockScroll(open);
  }

  /* ---------- Event ---------- */
  function bindEvents() {
    document.addEventListener('click', function (e) {
      var addBtn = e.target.closest('[data-action="add-to-cart"]');
      if (addBtn) {
        add(addBtn.getAttribute('data-id'));
        return;
      }

      var cartBtn = e.target.closest('[data-cart]');
      if (cartBtn) {
        var id = cartBtn.getAttribute('data-id');
        var line = items.filter(function (i) { return i.id === id; })[0];
        var action = cartBtn.getAttribute('data-cart');
        if (action === 'inc') setQty(id, line.qty + 1);
        if (action === 'dec') setQty(id, line.qty - 1);
        if (action === 'remove') setQty(id, 0);
        return;
      }

      if (e.target.closest('[data-cart-open]')) { e.preventDefault(); openDrawer(true); }
      if (e.target.closest('[data-cart-close]')) openDrawer(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') openDrawer(false);
    });
  }

  function init() {
    items = storage.get(KEY, []).filter(function (i) { return findProduct(i.id); });
    bindEvents();
    render();
  }

  G.modules.cart = {
    init: init,
    lines: lines,
    totals: totals,
    clear: clear,
    openDrawer: openDrawer
  };
})(window.Glowlyn = window.Glowlyn || {});
