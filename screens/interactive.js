/* ═══════════════════════════════════════════════
   PulseCare — Interactive JS Layer
   Tab switching, ripple, editable fields,
   slot selection, star rating, checklist taps
═══════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Ripple on any clickable ── */
  function addRipple(el) {
    el.style.position = el.style.position || 'relative';
    el.style.overflow = 'hidden';
    el.addEventListener('click', function (e) {
      var r = document.createElement('span');
      r.className = 'pc-ripple';
      var rect = el.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      r.style.cssText = [
        'width:' + size + 'px',
        'height:' + size + 'px',
        'left:' + (e.clientX - rect.left - size / 2) + 'px',
        'top:' + (e.clientY - rect.top - size / 2) + 'px',
      ].join(';');
      el.appendChild(r);
      setTimeout(function () { r.remove(); }, 500);
    });
  }

  /* ── Tab bar switching ── */
  function initTabs() {
    var groups = {};
    var tabEls = document.querySelectorAll('[class*="tab-item"],[class*="nav-item"],[class*="tab-btn"]');
    tabEls.forEach(function (el) {
      var parent = el.parentElement;
      if (!parent) return;
      var key = parent.className || 'root';
      if (!groups[key]) groups[key] = [];
      groups[key].push(el);
    });
    Object.values(groups).forEach(function (tabs) {
      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () {
          tabs.forEach(function (t) {
            t.classList.remove('active');
            t.style.opacity = '0.45';
          });
          tab.classList.add('active');
          tab.style.opacity = '1';
        });
      });
      // mark first active if none
      var hasActive = tabs.some(function (t) { return t.classList.contains('active'); });
      if (!hasActive && tabs[0]) { tabs[0].classList.add('active'); tabs[0].style.opacity = '1'; }
    });
  }

  /* ── Slot / chip single-select ── */
  function initSlots() {
    var slotGroups = {};
    var slots = document.querySelectorAll('[class*="slot"]:not([class*="slot-label"]):not([class*="slot-grid"]):not([class*="slot-section"])');
    slots.forEach(function (s) {
      var parent = s.parentElement;
      if (!parent) return;
      var key = parent.className;
      if (!slotGroups[key]) slotGroups[key] = [];
      slotGroups[key].push(s);
      addRipple(s);
    });
    Object.values(slotGroups).forEach(function (group) {
      group.forEach(function (chip) {
        chip.addEventListener('click', function () {
          group.forEach(function (c) {
            c.style.background = '';
            c.style.borderColor = '';
            c.style.color = '';
            c.dataset.selected = '';
          });
          chip.dataset.selected = '1';
          chip.style.background = 'rgba(91,143,255,0.18)';
          chip.style.borderColor = 'rgba(91,143,255,0.6)';
          chip.style.color = '#8BB4FF';
        });
      });
    });
  }

  /* ── Star rating ── */
  function initStars() {
    var starGroups = {};
    var stars = document.querySelectorAll('[class*="star"]');
    stars.forEach(function (s) {
      var parent = s.parentElement;
      if (!parent) return;
      var key = parent.className;
      if (!starGroups[key]) starGroups[key] = [];
      starGroups[key].push(s);
    });
    Object.values(starGroups).forEach(function (group) {
      group.forEach(function (star, idx) {
        star.addEventListener('click', function () {
          group.forEach(function (s, i) {
            if (i <= idx) {
              s.style.opacity = '1';
              s.style.filter = 'none';
              s.style.color = '#FFD95A';
            } else {
              s.style.opacity = '0.3';
              s.style.filter = 'grayscale(1)';
            }
          });
        });
        star.addEventListener('mouseenter', function () {
          group.forEach(function (s, i) {
            s.style.transform = i <= idx ? 'scale(1.15)' : 'scale(1)';
          });
        });
        star.addEventListener('mouseleave', function () {
          group.forEach(function (s) { s.style.transform = ''; });
        });
      });
    });
  }

  /* ── Checklist checkboxes ── */
  function initChecklist() {
    var checks = document.querySelectorAll('[class*="check"],[class*="checkbox"]');
    checks.forEach(function (el) {
      el.addEventListener('click', function () {
        var isChecked = el.dataset.checked === '1';
        if (isChecked) {
          el.dataset.checked = '';
          el.style.background = '';
          el.style.borderColor = '';
          el.innerHTML = '';
        } else {
          el.dataset.checked = '1';
          el.style.background = 'linear-gradient(135deg,#5B8FFF,#A78BFA)';
          el.style.borderColor = 'transparent';
          el.innerHTML = '<svg viewBox="0 0 12 10" fill="none" style="width:10px;height:8px;display:block;margin:auto"><polyline points="1 5 4.5 8.5 11 1" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        }
      });
    });
  }

  /* ── Editable field divs → contenteditable ── */
  function initFields() {
    var fields = document.querySelectorAll('.field-input,[class*="field-input"],[class*="input-field"]');
    fields.forEach(function (f) {
      if (f.tagName === 'INPUT' || f.tagName === 'TEXTAREA') return;
      f.setAttribute('contenteditable', 'true');
      f.setAttribute('spellcheck', 'false');
      f.addEventListener('focus', function () { f.classList.add('focused'); });
      f.addEventListener('blur', function () { f.classList.remove('focused'); });
    });

    // Actual inputs
    var inputs = document.querySelectorAll('input,textarea');
    inputs.forEach(function (inp) {
      inp.removeAttribute('readonly');
      inp.removeAttribute('disabled');
    });
  }

  /* ── Ripple on primary buttons ── */
  function initButtonRipples() {
    var btns = document.querySelectorAll('.btn-primary,.btn-secondary,.sticky-cta,[class*="btn-"]');
    btns.forEach(addRipple);
  }

  /* ── Search input focus ── */
  function initSearch() {
    var searchBars = document.querySelectorAll('[class*="search-bar"],[class*="search-wrap"],[class*="search-input"]');
    searchBars.forEach(function (bar) {
      var inp = bar.querySelector('input') || bar;
      if (inp.tagName === 'INPUT') {
        inp.addEventListener('focus', function () { bar.classList.add('focused'); });
        inp.addEventListener('blur', function () { bar.classList.remove('focused'); });
      }
    });
  }

  /* ── Payment method selection ── */
  function initPaymentMethods() {
    var methods = document.querySelectorAll('[class*="method-card"],[class*="method"]');
    if (methods.length < 2) return;
    methods.forEach(function (m) {
      m.addEventListener('click', function () {
        methods.forEach(function (x) {
          x.style.borderColor = '';
          x.style.background = '';
          x.dataset.selected = '';
        });
        m.dataset.selected = '1';
        m.style.borderColor = 'rgba(91,143,255,0.6)';
        m.style.background = 'rgba(91,143,255,0.08)';
      });
    });
  }

  /* ── Chat send ── */
  function initChat() {
    var sendBtn = document.querySelector('[class*="send"],[class*="send-btn"]');
    var chatInput = document.querySelector('[class*="chat-input"] input,[class*="compose"] input,[class*="msg-input"] input,input[placeholder*="essage"]');
    var msgList = document.querySelector('[class*="messages"],[class*="chat-body"],[class*="msg-list"]');
    if (!sendBtn || !chatInput || !msgList) return;

    function sendMsg() {
      var txt = chatInput.value.trim();
      if (!txt) return;
      var bubble = document.createElement('div');
      bubble.style.cssText = 'display:flex;justify-content:flex-end;margin:6px 16px;';
      bubble.innerHTML = '<div style="background:linear-gradient(135deg,#5B8FFF,#A78BFA);color:#fff;padding:10px 14px;border-radius:18px 18px 4px 18px;font-size:13px;max-width:75%;line-height:1.4;">' + txt.replace(/</g,'&lt;') + '</div>';
      msgList.appendChild(bubble);
      msgList.scrollTop = msgList.scrollHeight;
      chatInput.value = '';
    }

    sendBtn.addEventListener('click', sendMsg);
    chatInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') sendMsg(); });
  }

  /* ── Init all on DOMContentLoaded ── */
  function init() {
    initTabs();
    initSlots();
    initStars();
    initChecklist();
    initFields();
    initButtonRipples();
    initSearch();
    initPaymentMethods();
    initChat();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
