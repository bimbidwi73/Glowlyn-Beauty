/**
 * Modul Sparkles — kilauan berbentuk bintang yang terus melayang di seluruh
 * layar (semua halaman), plus cipratan kilau kecil saat layar diklik/diketuk.
 * Memakai satu <canvas> dengan sprite yang digambar sekali, sehingga ringan.
 * Otomatis mati bila config dimatikan atau pengunjung memilih "kurangi animasi".
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var PALETTE = ['#b74e62', '#e8899b', '#ffc9d3', '#f3c98b', '#ffffff'];
  var SPRITE = 64;

  var canvas, ctx, w = 0, h = 0, dpr = 1;
  var sprites = [];
  var floaters = [];
  var bursts = [];
  var last = 0;

  function rand(a, b) { return a + Math.random() * (b - a); }

  /* Gambar satu bintang 4 sudut + cahaya lembut ke sprite kecil */
  function makeSprite(color) {
    var c = document.createElement('canvas');
    c.width = c.height = SPRITE;
    var g = c.getContext('2d');
    var m = SPRITE / 2;

    var halo = g.createRadialGradient(m, m, 0, m, m, m);
    halo.addColorStop(0, color);
    halo.addColorStop(0.35, color + '55');
    halo.addColorStop(1, color + '00');
    g.globalAlpha = 0.45;
    g.fillStyle = halo;
    g.fillRect(0, 0, SPRITE, SPRITE);

    var r = SPRITE * 0.36;
    var k = r * 0.12; // makin kecil = bintang makin ramping
    g.globalAlpha = 1;
    g.fillStyle = color;
    g.beginPath();
    g.moveTo(m, m - r);
    g.quadraticCurveTo(m + k, m - k, m + r, m);
    g.quadraticCurveTo(m + k, m + k, m, m + r);
    g.quadraticCurveTo(m - k, m + k, m - r, m);
    g.quadraticCurveTo(m - k, m - k, m, m - r);
    g.closePath();
    g.fill();
    return c;
  }

  function newFloater(anywhere) {
    return {
      x: rand(0, w),
      y: anywhere ? rand(0, h) : h + 20,
      size: rand(8, 26),
      vx: rand(-12, 12),
      vy: rand(-28, -8),        // melayang pelan ke atas
      sway: rand(0.4, 1.2),
      swayAmp: rand(8, 22),
      phase: rand(0, 6.28),
      twinkle: rand(0.8, 2.2),
      rot: rand(0, 6.28),
      spin: rand(-0.6, 0.6),
      sprite: sprites[Math.floor(Math.random() * sprites.length)]
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var want = Math.round(Math.min(46, Math.max(16, (w * h) / 32000)));
    while (floaters.length < want) floaters.push(newFloater(true));
    if (floaters.length > want) floaters.length = want;
  }

  function drawStar(img, x, y, size, rot, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  function frame(t) {
    var dt = Math.min((t - last) / 1000 || 0.016, 0.05);
    last = t;
    var time = t / 1000;
    ctx.clearRect(0, 0, w, h);

    floaters.forEach(function (p, i) {
      p.y += p.vy * dt;
      p.x += (p.vx + Math.sin(time * p.sway + p.phase) * p.swayAmp) * dt;
      p.rot += p.spin * dt;
      if (p.y < -30 || p.x < -30 || p.x > w + 30) floaters[i] = newFloater(false);
      var tw = 0.5 + 0.5 * Math.sin(time * p.twinkle * 2 + p.phase); // berkedip
      drawStar(p.sprite, p.x, p.y, p.size * (0.7 + 0.5 * tw), p.rot, 0.25 + 0.65 * tw);
    });

    for (var i = bursts.length - 1; i >= 0; i--) {
      var b = bursts[i];
      b.life -= dt;
      if (b.life <= 0) { bursts.splice(i, 1); continue; }
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.vx *= 0.96;
      b.vy = b.vy * 0.96 + 40 * dt; // jatuh pelan seperti cipratan
      b.rot += b.spin * dt;
      var a = Math.min(1, b.life / b.max * 1.6);
      drawStar(b.sprite, b.x, b.y, b.size * (0.5 + 0.5 * a), b.rot, a);
    }

    requestAnimationFrame(frame);
  }

  /* Cipratan kilau di titik klik/ketuk */
  function burst(x, y) {
    for (var i = 0; i < 12; i++) {
      var ang = rand(0, 6.28), sp = rand(60, 220), life = rand(0.7, 1.3);
      bursts.push({
        x: x, y: y,
        vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 40,
        size: rand(10, 24), rot: rand(0, 6.28), spin: rand(-4, 4),
        life: life, max: life,
        sprite: sprites[Math.floor(Math.random() * sprites.length)]
      });
    }
    if (bursts.length > 120) bursts.splice(0, bursts.length - 120);
  }

  function init() {
    var cfg = G.config || {};
    var reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (cfg.SPARKLES_ENABLED === false || reduce) return;

    canvas = document.createElement('canvas');
    canvas.className = 'sparkle-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    if (!ctx) return;

    sprites = PALETTE.map(makeSprite);
    resize();
    window.addEventListener('resize', resize);

    if (cfg.SPARKLES_CLICK_BURST !== false) {
      document.addEventListener('pointerdown', function (e) {
        // Tombol hati punya cipratan sendiri (lihat modul wishlist)
        if (e.target.closest && e.target.closest('[data-action="toggle-wishlist"]')) return;
        burst(e.clientX, e.clientY);
      });
    }

    requestAnimationFrame(frame);
  }

  G.modules.sparkles = { init: init, burst: function (x, y) { if (ctx) burst(x, y); } };
})(window.Glowlyn = window.Glowlyn || {});
