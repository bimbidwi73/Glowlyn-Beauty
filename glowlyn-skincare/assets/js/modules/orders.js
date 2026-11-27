/**
 * Modul Pesanan — checkout via WhatsApp dan pelacakan pesanan.
 *
 * Alur (arsitektur 5.3): isi data -> validasi -> simpan pesanan dengan status
 * "menunggu_konfirmasi" -> buka WhatsApp berisi ringkasan pesanan.
 * Catatan: ini versi front-end saja. Pesanan disimpan di browser pelanggan;
 * status berikutnya diubah admin melalui backend pada tahap pengembangan lanjut.
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var fmt = G.utils.format;
  var dom = G.utils.dom;
  var storage = G.utils.storage;
  var KEY = G.config.STORAGE_KEYS.ORDERS;

  var STATUS_LABEL = {
    menunggu_konfirmasi: 'Menunggu konfirmasi admin',
    diproses: 'Sedang diproses',
    dikirim: 'Dalam pengiriman',
    selesai: 'Selesai'
  };

  /* ---------- Pesan WhatsApp ---------- */
  function buildMessage(order) {
    var rows = order.lines.map(function (l, i) {
      return (i + 1) + '. ' + l.name + ' x' + l.qty + ' = ' + fmt.rupiah(l.subtotal);
    });
    return [
      'Halo Glowlyn, saya ingin memesan:',
      'No. Pesanan: ' + order.number,
      '',
      rows.join('\n'),
      '',
      'Subtotal: ' + fmt.rupiah(order.subtotal),
      'Ongkir: ' + (order.shipping ? fmt.rupiah(order.shipping) : 'Gratis'),
      'Total: ' + fmt.rupiah(order.total),
      '',
      'Nama: ' + order.customer.name,
      'No. HP: ' + order.customer.phone,
      'Alamat: ' + order.customer.address,
      order.customer.note ? 'Catatan: ' + order.customer.note : ''
    ].join('\n').trim();
  }

  /* ---------- Validasi ---------- */
  function validate(data) {
    var errors = {};
    if (data.name.length < 3) errors.name = 'Nama minimal 3 karakter.';
    if (!/^(\+62|62|0)8\d{7,12}$/.test(data.phone.replace(/[\s-]/g, ''))) errors.phone = 'Nomor HP tidak valid (contoh: 0812xxxxxxx).';
    if (data.address.length < 10) errors.address = 'Alamat minimal 10 karakter.';
    return errors;
  }

  function showErrors(form, errors) {
    ['name', 'phone', 'address'].forEach(function (field) {
      var out = form.querySelector('[data-error="' + field + '"]');
      if (out) out.textContent = errors[field] || '';
    });
  }

  /* ---------- Checkout ---------- */
  function initCheckout() {
    var form = document.getElementById('checkout-form');

    document.getElementById('cart-checkout-btn').addEventListener('click', function () {
      G.modules.cart.openDrawer(false);
      G.modules.modal.open('checkout-modal');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {
        name: form.elements.name.value.trim(),
        phone: form.elements.phone.value.trim(),
        address: form.elements.address.value.trim(),
        note: form.elements.note.value.trim()
      };
      var errors = validate(data);
      showErrors(form, errors);
      if (Object.keys(errors).length) return;

      var lines = G.modules.cart.lines();
      if (!lines.length) { dom.toast('Keranjang masih kosong'); return; }
      var t = G.modules.cart.totals();

      var order = {
        number: fmt.orderNumber(),
        status: 'menunggu_konfirmasi',
        createdAt: new Date().toISOString(),
        customer: data,
        lines: lines.map(function (l) { return { name: l.product.name, qty: l.qty, subtotal: l.subtotal }; }),
        subtotal: t.subtotal,
        shipping: t.shipping,
        total: t.total
      };

      var orders = storage.get(KEY, []);
      orders.push(order);
      storage.set(KEY, orders);

      G.modules.whatsapp.open(buildMessage(order));
      G.modules.cart.clear();
      form.reset();
      G.modules.modal.close('checkout-modal');
      dom.toast('Pesanan ' + order.number + ' dibuat. Lanjutkan di WhatsApp.');
    });
  }

  /* ---------- Lacak pesanan ---------- */
  function initTracking() {
    var form = document.getElementById('track-form');
    var result = document.getElementById('track-result');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var number = form.elements.number.value.trim().toUpperCase();
      var order = storage.get(KEY, []).filter(function (o) { return o.number === number; })[0];

      if (!order) {
        result.innerHTML = 'Nomor pesanan <strong>' + fmt.escapeHtml(number) + '</strong> tidak ditemukan di perangkat ini. Hubungi admin via WhatsApp untuk bantuan.';
        return;
      }
      result.innerHTML =
        '<strong>' + order.number + '</strong><br>' +
        'Status: ' + (STATUS_LABEL[order.status] || order.status) + '<br>' +
        'Total: ' + fmt.rupiah(order.total) + '<br>' +
        'Dipesan: ' + new Date(order.createdAt).toLocaleString('id-ID', { timeZone: G.config.TIMEZONE });
    });
  }

  G.modules.orders = {
    init: function () {
      initCheckout();
      initTracking();
    }
  };
})(window.Glowlyn = window.Glowlyn || {});
