/**
 * Modul Hero Slider — slide otomatis, tombol prev/next, indikator titik.
 * Berhenti sementara saat kursor/fokus berada di atas slider.
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var dom = G.utils.dom;
  var fmt = G.utils.format;

  function slideTemplate(slide, index) {
    var img = G.data.images[slide.image];
    return '' +
      '<div class="hero__slide' + (index === 0 ? ' is-active' : '') + '" role="group" aria-label="Slide ' + (index + 1) + '">' +
        '<img src="' + img.src + '" alt="' + fmt.escapeHtml(img.alt) + '"' + (index === 0 ? '' : ' loading="lazy"') + '>' +
        '<div class="hero__overlay">' +
          '<span class="hero__tag">' + fmt.escapeHtml(slide.tag) + '</span>' +
          (index === 0 ? '<h1 class="hero__title">' : '<h2 class="hero__title">') + fmt.escapeHtml(slide.title) + (index === 0 ? '</h1>' : '</h2>') +
          '<p class="hero__text">' + fmt.escapeHtml(slide.text) + '</p>' +
          '<div class="hero__actions">' +
            '<a class="btn btn--primary" href="' + slide.primary.href + '">' + slide.primary.label + dom.icon('arrow_forward') + '</a>' +
            '<a class="btn btn--light" href="' + slide.secondary.href + '">' + slide.secondary.label + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function init() {
    var viewport = document.getElementById('hero-slides');
    var dotsBox = document.getElementById('hero-dots');
    var carousel = document.getElementById('hero-carousel');
    if (!viewport || !dotsBox) return;

    var slides = G.data.heroSlides;
    var current = 0;
    var timer = null;

    viewport.innerHTML = slides.map(slideTemplate).join('');
    dotsBox.innerHTML = slides.map(function (_, i) {
      return '<button class="hero__dot' + (i === 0 ? ' is-active' : '') + '" type="button" data-index="' + i + '" aria-label="Ke slide ' + (i + 1) + '"></button>';
    }).join('');

    var slideEls = dom.$$('.hero__slide', viewport);
    var dotEls = dom.$$('.hero__dot', dotsBox);

    function show(index) {
      current = (index + slides.length) % slides.length;
      slideEls.forEach(function (el, i) { el.classList.toggle('is-active', i === current); });
      dotEls.forEach(function (el, i) { el.classList.toggle('is-active', i === current); });
    }

    function start() {
      stop();
      timer = setInterval(function () { show(current + 1); }, G.config.HERO_AUTOPLAY_MS);
    }
    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    document.getElementById('hero-prev').addEventListener('click', function () { show(current - 1); start(); });
    document.getElementById('hero-next').addEventListener('click', function () { show(current + 1); start(); });
    dotsBox.addEventListener('click', function (e) {
      var dot = e.target.closest('.hero__dot');
      if (dot) { show(Number(dot.getAttribute('data-index'))); start(); }
    });
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);

    start();
  }

  G.modules.heroSlider = { init: init };
})(window.Glowlyn = window.Glowlyn || {});
