/* Venilicious shared config + chrome (menu drawer, WhatsApp links, toast).
   This is the ONE place to set contact details for the whole site. */
window.SITE = Object.assign(window.SITE || {}, {
  // WhatsApp number (Adriaan), international format, digits only. If it changes, also find/replace it in the HTML hrefs.
  whatsapp: '27711957072',
  email: 'bookings@venilicious.co.za',
  // Optional: Formspree form ID (formspree.io > New form > the ID after /f/). Empty = "Send by email" opens the visitor's email app instead.
  formspreeId: ''
});

(function () {
  var S = window.SITE;
  S.waReady = /^27[1-9]\d{8}$/.test(S.whatsapp);
  S.waLink = function (text) {
    return 'https://wa.me/' + S.whatsapp + (text ? '?text=' + encodeURIComponent(text) : '');
  };
  S.waDisplay = function () {
    return S.whatsapp.replace(/^27/, '0').replace(/^(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3');
  };

  /* ---------- toast ---------- */
  var toastEl, tm;
  S.toast = function (msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'stoast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(tm);
    tm = setTimeout(function () { toastEl.classList.remove('show'); }, 4200);
  };

  /* ---------- WhatsApp links: <a data-wa="prefilled text" data-wa-fallback="/url"> ---------- */
  function wireWa() {
    document.querySelectorAll('[data-wa]').forEach(function (a) {
      var text = a.getAttribute('data-wa') || 'Hi Venilicious';
      if (S.waReady) {
        a.href = S.waLink(text);
        a.target = '_blank';
        a.rel = 'noopener';
        return;
      }
      // Number not set yet: never send people to a dead WhatsApp link.
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var book = document.getElementById('book');
        var fb = a.getAttribute('data-wa-fallback');
        if (book) {
          book.scrollIntoView({ behavior: 'smooth', block: 'start' });
          S.toast('Our WhatsApp line is being set up. Please use the booking form below for now.');
        } else if (fb) {
          location.href = fb;
        } else {
          S.toast('Our WhatsApp line is being set up. Check back soon.');
        }
      });
    });
    if (S.waReady) {
      document.querySelectorAll('[data-wa-display]').forEach(function (el) { el.textContent = S.waDisplay(); });
    }
  }

  /* ---------- menu drawer ---------- */
  function wireMenu() {
    var btn = document.getElementById('menuBtn'), d = document.getElementById('menu'),
        sc = document.getElementById('menuScrim'), x = document.getElementById('menuClose');
    if (!btn || !d || !sc || !x) return;
    var last, t;
    function open() {
      clearTimeout(t);
      last = document.activeElement;
      d.hidden = false; sc.hidden = false;
      void d.offsetWidth;
      d.classList.add('open'); sc.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      x.focus();
    }
    function close() {
      d.classList.remove('open'); sc.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      t = setTimeout(function () { d.hidden = true; sc.hidden = true; }, 320);
      if (last && last.focus) last.focus();
    }
    btn.addEventListener('click', open);
    x.addEventListener('click', close);
    sc.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && d.classList.contains('open')) close(); });
    d.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
  }

  function init() {
    wireWa();
    wireMenu();
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
