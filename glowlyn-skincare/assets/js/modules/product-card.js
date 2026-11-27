/**
 * Modul Kartu Produk — satu template yang dipakai flash sale, new arrival,
 * best seller, dan katalog agar tampilan konsisten.
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var fmt = G.utils.format;
  var icon = G.utils.dom.icon;

  function categoryLabel(id) {
    var found = G.data.categories.filter(function (c) { return c.id === id; })[0];
    return found ? found.label : id;
  }

  /** Label status produk (badge kedua di katalog). */
  function statusTag(p) {
    if (p.flashSale) return 'Flash Sale';
    if (p.newArrival) return 'Produk Baru';
    if (p.bestSellerRank) return 'Best Seller';
    if (p.category === 'paket') return 'Bundling';
    return '';
  }

  /** Tombol hati (favorit); aman dipanggil meski modul wishlist belum dimuat. */
  function wishButton(product) {
    return G.modules.wishlist ? G.modules.wishlist.buttonHtml(product) : '';
  }

  /**
   * @param {object} product  data dari G.data.products
   * @param {object} [opts]   { badge: string, cta: string, showSold: boolean }
   */
  function render(product, opts) {
    opts = opts || {};
    var img = G.data.images[product.image];
    var discount = fmt.discountPercent(product.price, product.oldPrice);
    var cta = opts.cta || 'Beli Sekarang';

    var badges = '';
    if (opts.badge) {
      badges = '<span class="badge">' + fmt.escapeHtml(opts.badge) + '</span>';
    } else {
      if (discount) badges += '<span class="badge">-' + discount + '%</span>';
      var tag = statusTag(product);
      if (tag) badges += '<span class="badge badge--dark">' + tag + '</span>';
    }

    return '' +
      '<article class="product-card" data-product-id="' + product.id + '">' +
        '<div class="product-card__media">' +
          (badges ? '<div class="product-card__badges">' + badges + '</div>' : '') +
          wishButton(product) +
          '<a class="product-card__link" href="#produk/' + product.id + '" aria-label="Lihat detail ' + fmt.escapeHtml(product.name) + '">' +
            '<img src="' + img.src + '" alt="' + fmt.escapeHtml(product.name) + '" loading="lazy">' +
          '</a>' +
        '</div>' +
        '<div>' +
          '<span class="product-card__category">' + categoryLabel(product.category) + ' · ' + fmt.escapeHtml(product.subtitle) + '</span>' +
          '<h3 class="product-card__name" title="' + fmt.escapeHtml(product.name) + '">' +
            '<a href="#produk/' + product.id + '">' + fmt.escapeHtml(product.name) + '</a></h3>' +
          '<div class="product-card__rating">' + icon('star', true) +
            '<strong>' + product.rating.toFixed(1) + '</strong>' +
            (opts.showSold === false ? '' : '<span class="product-card__sold">(' + fmt.soldLabel(product.sold) + ')</span>') +
          '</div>' +
          '<div class="product-card__price">' +
            '<span class="product-card__price-now">' + fmt.rupiah(product.price) + '</span>' +
            (product.oldPrice ? '<span class="product-card__price-old">' + fmt.rupiah(product.oldPrice) + '</span>' : '') +
          '</div>' +
          '<div class="product-card__actions">' +
            '<a class="btn btn--primary btn--sm" data-wa data-wa-text="' + fmt.escapeHtml('Halo Glowlyn, saya ingin memesan ' + product.name) + '" href="#">' + cta + '</a>' +
            '<button class="icon-btn" type="button" data-action="add-to-cart" data-id="' + product.id + '" aria-label="Tambah ' + fmt.escapeHtml(product.name) + ' ke keranjang">' + icon('shopping_bag') + '</button>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  /** Menampilkan daftar produk ke dalam elemen berdasarkan id. */
  function renderList(containerId, products, opts) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = products.map(function (p, i) {
      return render(p, typeof opts === 'function' ? opts(p, i) : opts);
    }).join('');
  }

  G.modules.productCard = { render: render, renderList: renderList, categoryLabel: categoryLabel };
})(window.Glowlyn = window.Glowlyn || {});