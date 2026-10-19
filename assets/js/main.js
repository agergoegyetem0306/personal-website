/* Nyelvváltás, világos/sötét mód, mobil menü */
(function () {
  'use strict';

  var root = document.documentElement;
  var dict = window.I18N || {};

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }
  function load(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  /* ---------- Nyelv ---------- */
  function detectLang() {
    var saved = load('lang');
    if (saved && dict[saved]) return saved;
    var nav = (navigator.language || 'hu').toLowerCase();
    return nav.indexOf('hu') === 0 ? 'hu' : 'en';
  }

  function applyLang(lang) {
    var t = dict[lang];
    if (!t) return;
    root.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = t[el.getAttribute('data-i18n')];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var v = t[el.getAttribute('data-i18n-aria')];
      if (v != null) el.setAttribute('aria-label', v);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var v = t[el.getAttribute('data-i18n-alt')];
      if (v != null) el.setAttribute('alt', v);
    });
    document.querySelectorAll('[data-i18n-href]').forEach(function (el) {
      var v = t[el.getAttribute('data-i18n-href')];
      if (v != null) el.setAttribute('href', v);
    });

    if (t['meta.title']) document.title = t['meta.title'];
    var desc = document.querySelector('meta[name="description"]');
    if (desc && t['meta.description']) desc.setAttribute('content', t['meta.description']);

    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });
  }

  document.querySelectorAll('[data-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang');
      store('lang', lang);
      applyLang(lang);
    });
  });

  applyLang(detectLang());

  /* ---------- Téma ---------- */
  var themeBtn = document.querySelector('.theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store('theme', next);
    });
  }

  // Ha a felhasználó még nem választott, kövesse a rendszer beállítását
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) {
      if (!load('theme')) root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
  }

  /* ---------- Mobil menü ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('nav-links');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- E-mail másolása ---------- */
  function t(key) {
    var lang = root.lang in dict ? root.lang : 'hu';
    return (dict[lang] && dict[lang][key]) || '';
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'absolute'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    return ok;
  }
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    var status = btn.parentNode.querySelector('.copy-status');
    var timer;
    function done(ok) {
      btn.classList.toggle('copied', ok);
      if (status) status.textContent = t(ok ? 'copy.done' : 'copy.fail');
      clearTimeout(timer);
      timer = setTimeout(function () { btn.classList.remove('copied'); if (status) status.textContent = ''; }, 2000);
    }
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); });
      } else {
        done(fallbackCopy(text));
      }
    });
  });

  /* ---------- Évszám a láblécben ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
