/**
 * Modul Detail Produk — halaman #produk/<id>, isinya menyesuaikan jenis produk
 * (cleanser, toner, serum, sunscreen, masker, paket, ...). Judul tab & meta
 * deskripsi ikut berubah, dan data produk (JSON-LD) dipasang untuk SEO.
 * Konten ada di assets/js/data/product-details.js.
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var dom = G.utils.dom;
  var fmt = G.utils.format;
  var esc = fmt.escapeHtml;

  var defaultTitle = document.title;
  var metaDesc = document.querySelector('meta[name="description"]');
  var defaultDesc = metaDesc ? metaDesc.getAttribute('content') : '';

  function findProduct(id) {
    return G.data.products.filter(function (p) { return p.id === id; })[0];
  }

  function label(list, id) {
    var f = list.filter(function (x) { return x.id === id; })[0];
    return f ? f.label : id;
  }

  function fill(text, p) { return text.replace(/\{name\}/g, p.name); }

  function list(items, tag) {
    return '<' + tag + ' class="pdp__list">' + items.map(function (t) {
      return '<li>' + esc(t) + '</li>';
    }).join('') + '</' + tag + '>';
  }

  /** Gabungkan isi kategori dan isi khusus produk. */
  function content(p) {
    var D = G.data.productDetails;
    var cat = D.categories[p.category] || D.categories['default'];
    var own = D.products[p.id] || {};
    return {
      when: own.when || cat.when,
      tagline: own.tagline || cat.tagline,
      description: fill(own.description || cat.description, p),
      benefits: own.benefits || cat.benefits,
      howTo: own.howTo || cat.howTo,
      tips: (cat.tips || []).concat(own.extraTips || [], D.commonTips),
      ingredients: own.ingredients || []
    };
  }

  function accordion(title, icon, body, open) {
    return '<details class="pdp-acc"' + (open ? ' open' : '') + '>' +
      '<summary>' + dom.icon(icon) + '<span>' + title + '</span>' + dom.icon('expand_more') + '</summary>' +
      '<div class="pdp-acc__body">' + body + '</div></details>';
  }

  function related(p) {
    var same = G.data.products.filter(function (x) { return x.id !== p.id && x.category === p.category; });
    var shared = G.data.products.filter(function (x) {
      return x.id !== p.id && x.category !== p.category &&
        x.concerns.some(function (c) { return p.concerns.indexOf(c) !== -1; });
    });
    return same.concat(shared).slice(0, 4);
  }

  function setMeta(p, c) {
    document.title = p.name + ' | GLOWLYN Skincare';
    if (metaDesc) metaDesc.setAttribute('content', c.tagline + ' ' + p.name + ' dari GLOWLYN, ' + fmt.rupiah(p.price) + '.');

    var ld = document.getElementById('pdp-jsonld');
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.id = 'pdp-jsonld';
      document.head.appendChild(ld);
    }
    var img = G.data.images[p.image];
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      description: c.tagline,
      image: img ? new URL(img.src, window.location.href).href : undefined,
      brand: { '@type': 'Brand', name: 'GLOWLYN' },
      offers: { '@type': 'Offer', priceCurrency: 'IDR', price: p.price, availability: 'https://schema.org/InStock' }
    });
  }

  function reset() {
    document.title = defaultTitle;
    if (metaDesc) metaDesc.setAttribute('content', defaultDesc);
    var ld = document.getElementById('pdp-jsonld');
    if (ld) ld.remove();
  }

  /** Menggambar halaman. Mengembalikan false bila produk tidak ada. */
  function show(id) {
    var p = findProduct(id);
    var root = document.getElementById('pdp-root');
    if (!p || !root) return false;

    var c = content(p);
    var img = G.data.images[p.image];
    var disc = fmt.discountPercent(p.price, p.oldPrice);
    var catLabel = label(G.data.categories, p.category);
    var D = G.data.productDetails;

    var chips = p.concerns.map(function (cid) {
      return '<span class="chip">' + esc(label(G.data.concerns, cid)) + '</span>';
    }).join('');

    // Kandungan khusus (bila ada) + fokus formula dari masalah kulit
    var ingredientRows = c.ingredients.map(function (i) {
      return '<li><strong>' + esc(i.name) + '</strong><span>' + esc(i.benefit) + '</span></li>';
    });
    var focusRows = p.concerns.map(function (cid) {
      return '<li><strong>' + esc(label(G.data.concerns, cid)) + '</strong><span>' + esc(D.concernBenefits[cid] || '') + '</span></li>';
    });
    var formulaBody = '';
    if (ingredientRows.length) formulaBody += '<h4 class="pdp__sub">Kandungan Utama</h4><ul class="pdp__rows">' + ingredientRows.join('') + '</ul>';
    formulaBody += '<h4 class="pdp__sub">Fokus Perawatan</h4><ul class="pdp__rows">' + focusRows.join('') + '</ul>';

    var waText = 'Halo Glowlyn, saya ingin memesan ' + p.name;
    var askText = 'Halo Glowlyn, saya ingin bertanya tentang ' + p.name;
    var isPaket = p.category === 'paket';

    root.innerHTML =
      '<nav class="breadcrumb" aria-label="Breadcrumb">' +
        '<a href="#beranda">Beranda</a> / <a href="#katalog-produk">Belanja</a> / ' +
        '<a href="#katalog-produk">' + esc(catLabel) + '</a> / <strong>' + esc(p.name) + '</strong></nav>' +

      '<div class="pdp">' +
        '<div class="pdp__media">' +
          '<div class="pdp__image">' +
            ((disc || p.flashSale || p.newArrival) ? '<div class="product-card__badges">' +
              (disc ? '<span class="badge">-' + disc + '%</span>' : '') +
              (p.flashSale ? '<span class="badge badge--dark">Flash Sale</span>' : p.newArrival ? '<span class="badge badge--dark">Produk Baru</span>' : '') +
            '</div>' : '') +
            '<img src="' + img.src + '" alt="' + esc(img.alt || p.name) + '">' +
          '</div>' +
          '<ul class="pdp__trust">' +
            '<li>' + dom.icon('verified') + '<span>Non-komedogenik</span></li>' +
            '<li>' + dom.icon('eco') + '<span>Bebas alkohol &amp; paraben</span></li>' +
            '<li>' + dom.icon('shield') + '<span>Ramah skin barrier</span></li>' +
          '</ul>' +
        '</div>' +

        '<div class="pdp__info">' +
          '<span class="pdp__eyebrow">' + esc(catLabel) + ' · ' + esc(p.subtitle) + '</span>' +
          '<h1 class="pdp__title">' + esc(p.name) + '</h1>' +
          '<div class="pdp__rating">' + dom.icon('star', true) + '<strong>' + p.rating.toFixed(1) + '</strong>' +
            '<span>' + fmt.soldLabel(p.sold) + '</span></div>' +
          '<p class="pdp__tagline">' + esc(c.tagline) + '</p>' +

          '<div class="pdp__price">' +
            '<span class="pdp__price-now">' + fmt.rupiah(p.price) + '</span>' +
            (p.oldPrice ? '<span class="pdp__price-old">' + fmt.rupiah(p.oldPrice) + '</span>' +
              '<span class="pdp__save">Hemat ' + fmt.rupiah(p.oldPrice - p.price) + '</span>' : '') +
          '</div>' +

          '<ul class="pdp__benefits">' + c.benefits.map(function (b) {
            return '<li>' + dom.icon('check_circle', true) + '<span>' + esc(b) + '</span></li>';
          }).join('') + '</ul>' +

          '<div class="pdp__meta"><span>' + dom.icon('schedule') + 'Waktu pakai: <strong>' + esc(c.when) + '</strong></span></div>' +
          '<div class="pdp__chips"><span class="pdp__chips-label">Cocok untuk</span>' + chips + '</div>' +

          '<div class="pdp__actions">' +
            '<button class="btn btn--primary pdp__cart" type="button" data-action="add-to-cart" data-id="' + p.id + '">' +
              dom.icon('shopping_bag') + 'Tambah ke Keranjang</button>' +
            G.modules.wishlist.buttonHtml(p, 'wish-btn--lg') +
          '</div>' +
          '<a class="btn btn--outline btn--block" data-wa data-wa-text="' + esc(waText) + '" href="#">' +
            dom.icon('chat') + 'Beli via WhatsApp</a>' +
          '<p class="pdp__ship">' + dom.icon('local_shipping') + 'Gratis ongkir untuk belanja di atas ' + fmt.rupiah(G.config.FREE_SHIPPING_MIN) + '</p>' +
        '</div>' +
      '</div>' +

      '<div class="pdp__details">' +
        accordion('Deskripsi', 'description', '<p>' + esc(c.description) + '</p>' +
          (isPaket ? '<a class="btn btn--outline btn--sm" data-wa data-wa-text="' + esc(askText + ' (isi paket)') + '" href="#">' +
            dom.icon('chat') + 'Tanya isi paket via WhatsApp</a>' : ''), true) +
        accordion('Cara Pemakaian', 'format_list_numbered', list(c.howTo, 'ol'), true) +
        accordion(isPaket ? 'Fokus Perawatan' : 'Kandungan & Fokus Formula', 'science', formulaBody, false) +
        accordion('Tips & Catatan', 'tips_and_updates', list(c.tips, 'ul'), false) +
      '</div>' +

      '<section class="pdp__related" aria-label="Produk serupa">' +
        '<div class="section__head"><div><span class="section__eyebrow">Mungkin kamu suka</span>' +
        '<h2 class="section__title">Produk Serupa</h2></div>' +
        '<a class="section__link" href="#katalog-produk">Lihat Semua →</a></div>' +
        '<div class="product-grid product-grid--4" id="pdp-related"></div>' +
      '</section>';

    G.modules.productCard.renderList('pdp-related', related(p));
    G.modules.whatsapp.init(); // elemen baru: pasang tautan WhatsApp
    setMeta(p, c);
    return true;
  }

  G.modules.productDetail = { show: show, reset: reset };
})(window.Glowlyn = window.Glowlyn || {});
