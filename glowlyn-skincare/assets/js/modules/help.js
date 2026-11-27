/**
 * Modul Bantuan — akordeon FAQ dan halaman Kontak (template WhatsApp,
 * formulir konsultasi, alamat, dan peta).
 */
(function (G) {
  'use strict';
  G.modules = G.modules || {};

  var fmt = G.utils.format;
  var dom = G.utils.dom;

  /* ---------- FAQ ---------- */
  function initFaq() {
    var list = document.getElementById('faq-list');
    list.innerHTML = G.data.faq.map(function (item, i) {
      return '' +
        '<div class="faq__item">' +
          '<button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-' + i + '">' +
            '<span>' + fmt.escapeHtml(item.q) + '</span>' + dom.icon('expand_more') +
          '</button>' +
          '<div class="faq__a" id="faq-a-' + i + '">' + fmt.escapeHtml(item.a) + '</div>' +
        '</div>';
    }).join('');

    list.addEventListener('click', function (e) {
      var btn = e.target.closest('.faq__q');
      if (!btn) return;
      var open = btn.parentElement.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open);
    });
  }

  /* ---------- Kontak: info, template, peta ---------- */
  function renderContactInfo() {
    var c = G.data.contact;
    var mapQuery = encodeURIComponent(c.mapQuery);

    document.getElementById('contact-hours').innerHTML = c.hours.map(function (h) {
      return '<p>' + fmt.escapeHtml(h) + '</p>';
    }).join('');

    document.getElementById('contact-address-short').innerHTML =
      '<strong>' + fmt.escapeHtml(c.addressLines[0].split(',')[0]) + ', Madiun</strong>' +
      '<p>Jawa Timur 63125 • Packing aman langsung dari pusat klinik.</p>';

    document.getElementById('contact-address').innerHTML =
      '<strong>' + fmt.escapeHtml(c.clinicName) + '</strong><br>' +
      fmt.escapeHtml(c.addressLines.join(', ')) + '<br>' +
      '<em>' + fmt.escapeHtml(c.landmark) + '</em>';

    document.getElementById('contact-map').src = 'https://www.google.com/maps?q=' + mapQuery + '&output=embed';
    document.getElementById('map-open').href = 'https://www.google.com/maps/search/?api=1&query=' + mapQuery;
    document.getElementById('map-route').href = 'https://www.google.com/maps/dir/?api=1&destination=' + mapQuery;

    document.getElementById('contact-templates').innerHTML = c.templates.map(function (t) {
      return '' +
        '<a class="template-card" data-wa data-wa-text="' + fmt.escapeHtml(t.text) + '" href="#">' +
          '<span class="template-card__tag">' + dom.icon(t.icon) + fmt.escapeHtml(t.tag) + '</span>' +
          '<span class="template-card__title">' + fmt.escapeHtml(t.title) + '</span>' +
          '<span>' + fmt.escapeHtml(t.desc) + '</span>' +
          '<span class="template-card__cta">Pakai Template →</span>' +
        '</a>';
    }).join('');

    document.getElementById('contact-topic').innerHTML = c.topics.map(function (t) {
      return '<option>' + fmt.escapeHtml(t) + '</option>';
    }).join('');
    document.getElementById('contact-message').value = c.defaultMessage;
  }

  /* ---------- Kontak: formulir ---------- */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var phone = form.elements.phone.value.trim();
      var message = form.elements.message.value.trim();

      if (name.length < 3 || !/^(\+62|62|0)8\d{7,12}$/.test(phone.replace(/[\s-]/g, '')) || message.length < 10) {
        dom.toast('Lengkapi nama, nomor WhatsApp (contoh 0812xxxxxxx), dan pesan');
        return;
      }

      G.modules.whatsapp.open(
        'Halo GLOWLYN Beauty, saya ' + name + ' (' + phone + ').\n' +
        'Topik: ' + form.elements.topic.value + '\n\n' + message
      );
    });
  }
  /* ---------- Footer: daftar penawaran (diteruskan ke WhatsApp) ---------- */
  function initFooterForm() {
    var form = document.getElementById('footer-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.elements.email.value.trim();
      if (!email) return;
      G.modules.whatsapp.open('Halo GLOWLYN Beauty, saya ingin mendaftar info promo dan penawaran eksklusif. Email saya: ' + email);
      form.reset();
    });
  }
  G.modules.help = {
    init: function () {
      initFaq();
      renderContactInfo();
      initContactForm();
      initFooterForm();
    }
  };
})(window.Glowlyn = window.Glowlyn || {});
