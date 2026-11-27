/**
 * Modul Fly-to-Cart — gambar produk mengecil dan melayang (melengkung) ke ikon
 * keranjang di navbar, meninggalkan jejak bintang kecil. Ikon keranjang lalu
 * bergetar. Berjalan berdampingan dengan modul cart (hanya efek visual).
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var DURATION = 750;
  var SIZE = 64;

  function cartButton() {
    var badge = document.getElementById('cart-count');
    return badge ? badge.closest('button, a') : null;
  }

  function center(rect) {
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  function trail(x, y) {
    var s = document.createElement('span');
    s.className = 'fly-spark';
    s.textContent = '✦';
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    s.style.fontSize = (8 + Math.random() * 8) + 'px';
    document.body.appendChild(s);
    setTimeout(function () { s.remove(); }, 750);
  }

  function bump(btn) {
    btn.classList.remove('is-bump');
    void btn.offsetWidth; // mulai ulang animasi bila ditekan beruntun
    btn.classList.add('is-bump');
    setTimeout(function () { btn.classList.remove('is-bump'); }, 600);
  }

  function fly(source) {
    var target = cartButton();
    var card = source.closest('.product-card, .pdp, article, .cart-item');
    var img = card && card.querySelector('img');
    if (!target || !img) return;

    var from = img.getBoundingClientRect();
    var to = target.getBoundingClientRect();
    if (!to.width || !from.width) { return; }

    var start = center(from);
    var end = center(to);
    var dx = end.x - start.x;
    var dy = end.y - start.y;

    var outer = document.createElement('div');
    outer.className = 'fly-item';
    outer.style.width = outer.style.height = SIZE + 'px';
    outer.style.left = (start.x - SIZE / 2) + 'px';
    outer.style.top = (start.y - SIZE / 2) + 'px';
    var inner = document.createElement('div');
    inner.className = 'fly-item__inner';
    var clone = document.createElement('img');
    clone.src = img.currentSrc || img.src;
    clone.alt = '';
    inner.appendChild(clone);
    outer.appendChild(inner);
    document.body.appendChild(outer);

    // Sumbu X dan Y memakai easing berbeda sehingga lintasannya melengkung
    var opts = { duration: DURATION, fill: 'forwards' };
    var ax = outer.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(' + dx + 'px)' }],
      Object.assign({ easing: 'cubic-bezier(0.45, 0, 0.75, 0.6)' }, opts));
    inner.animate(
      [{ transform: 'translateY(0) scale(1)', opacity: 1 },
       { transform: 'translateY(' + dy + 'px) scale(0.3)', opacity: 0.9 }],
      Object.assign({ easing: 'cubic-bezier(0.3, -0.7, 0.7, 1)' }, opts));

    // Jejak bintang selama melayang
    var timer = setInterval(function () {
      var r = inner.getBoundingClientRect();
      trail(r.left + r.width / 2, r.top + r.height / 2);
    }, 70);

    ax.onfinish = function () {
      clearInterval(timer);
      outer.remove();
      bump(target);
    };
  }

  function init() {
    var reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !Element.prototype.animate) return;

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action="add-to-cart"]');
      if (btn) fly(btn);
    });
  }

  G.modules.flyToCart = { init: init };
})(window.Glowlyn = window.Glowlyn || {});
