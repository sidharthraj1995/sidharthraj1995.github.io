document.addEventListener('DOMContentLoaded', function () {

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.tabs');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* ---------- boot sequence type-in ---------- */
  var bootLines = document.querySelectorAll('.boot-line[data-text]');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typeLine(el, text, speed, cb) {
    if (prefersReduced) { el.textContent = text; if (cb) cb(); return; }
    var i = 0;
    el.textContent = '';
    var iv = setInterval(function () {
      el.textContent = text.slice(0, i + 1);
      i++;
      if (i >= text.length) { clearInterval(iv); if (cb) cb(); }
    }, speed);
  }

  function runBoot(index) {
    if (index >= bootLines.length) {
      var last = bootLines[bootLines.length - 1];
      if (last) last.classList.add('cursor');
      startTelemetry();
      return;
    }
    var el = bootLines[index];
    var text = el.getAttribute('data-text');
    typeLine(el, text, 14, function () {
      setTimeout(function () { runBoot(index + 1); }, 180);
    });
  }
  if (bootLines.length) runBoot(0);
  else startTelemetry();

  /* ---------- ambient telemetry readouts ---------- */
  function startTelemetry() {
    var uptimeEl = document.querySelector('[data-readout="uptime"]');
    var startTime = Date.now();
    if (uptimeEl) {
      setInterval(function () {
        var s = Math.floor((Date.now() - startTime) / 1000);
        var hh = String(Math.floor(s / 3600)).padStart(2, '0');
        var mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
        var ss = String(s % 60).padStart(2, '0');
        uptimeEl.textContent = hh + ':' + mm + ':' + ss;
      }, 1000);
    }

    var jitterTargets = [
      { sel: '[data-readout="temp"]', base: 22.4, range: 0.6, decimals: 1, unit: '°C' },
      { sel: '[data-readout="rh"]', base: 41, range: 3, decimals: 0, unit: '%' },
      { sel: '[data-readout="co2"]', base: 512, range: 40, decimals: 0, unit: 'ppm' }
    ];
    if (!prefersReduced) {
      jitterTargets.forEach(function (t) {
        var el = document.querySelector(t.sel);
        if (!el) return;
        setInterval(function () {
          var v = t.base + (Math.random() * 2 - 1) * t.range;
          el.textContent = v.toFixed(t.decimals);
        }, 2400);
      });
    }
  }

  /* ---------- oscilloscope trace ---------- */
  var scopePath = document.querySelector('.scope-line');
  if (scopePath && !prefersReduced) {
    var t = 0;
    setInterval(function () {
      var pts = [];
      var w = 300, h = 56, steps = 40;
      for (var i = 0; i <= steps; i++) {
        var x = (i / steps) * w;
        var y = h / 2 + Math.sin((i / steps) * Math.PI * 4 + t) * 14 + Math.sin((i / steps) * Math.PI * 11 + t * 1.7) * 4;
        pts.push(x.toFixed(1) + ',' + y.toFixed(1));
      }
      scopePath.setAttribute('points', pts.join(' '));
      t += 0.35;
    }, 90);
  }

  /* ---------- gallery lightbox ---------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
  var lightbox = document.querySelector('.lightbox');
  if (galleryItems.length && lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbCaption = lightbox.querySelector('.lb-caption');
    var lbCounter = lightbox.querySelector('.lb-counter');
    var current = 0;

    function openAt(i) {
      current = (i + galleryItems.length) % galleryItems.length;
      var item = galleryItems[current];
      var img = item.querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      lbCaption.textContent = img.alt || '';
      lbCounter.textContent = (current + 1) + ' / ' + galleryItems.length;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    galleryItems.forEach(function (item, i) {
      item.addEventListener('click', function () { openAt(i); });
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAt(i); }
      });
    });

    lightbox.querySelector('.lb-close').addEventListener('click', close);
    lightbox.querySelector('.lb-prev').addEventListener('click', function () { openAt(current - 1); });
    lightbox.querySelector('.lb-next').addEventListener('click', function () { openAt(current + 1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') openAt(current + 1);
      if (e.key === 'ArrowLeft') openAt(current - 1);
    });
  }

  /* ---------- contact form placeholder ---------- */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if (note) note.textContent = 'This form needs an email service connected before it will actually send — see setup notes.';
    });
  }
});
