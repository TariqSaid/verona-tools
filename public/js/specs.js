/* ═══════════════════════════════════════════════════════════
   VERONA TOOLS — Specs Tabs
   Called from openProductModal(p) in app.js:
     if (typeof renderSpecsTabs === 'function') renderSpecsTabs(p);
   showSpecsTab(tab) is called inline from index.html buttons.
═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─── Entry point ─────────────────────────────────────── */
  window.renderSpecsTabs = function (product) {
    var sec = document.getElementById('specs-section');
    if (!sec) return;

    var specs = product && product.specs;
    if (!specs) { sec.style.display = 'none'; return; }

    var hasHighlights = specs.highlight1_value || specs.highlight2_value || specs.highlight3_value;
    var hasDetails    = specs.details && Object.keys(specs.details).length > 0;
    var hasCompat     = Array.isArray(specs.compatibility) && specs.compatibility.length > 0;

    if (!hasHighlights && !hasDetails && !hasCompat) {
      sec.style.display = 'none';
      return;
    }

    sec.style.display = 'block';

    /* ── Highlight cards ─────────────────────────────────── */
    var hlContainer = document.getElementById('specs-highlights');
    if (hlContainer) {
      var cards = '';
      for (var i = 1; i <= 3; i++) {
        var val = specs['highlight' + i + '_value'];
        var lbl = specs['highlight' + i + '_label'];
        if (val && lbl) {
          cards +=
            '<div class="spec-highlight-card">' +
              '<div class="spec-hl-value">' + esc(val) + '</div>' +
              '<div class="spec-hl-label">' + formatLabel(lbl) + '</div>' +
            '</div>';
        }
      }
      hlContainer.innerHTML = cards;
    }

    /* ── Details table ───────────────────────────────────── */
    var detContainer = document.getElementById('specs-details');
    if (detContainer) {
      if (hasDetails) {
        var rows = Object.keys(specs.details).map(function (key) {
          var val = specs.details[key];
          return '<tr>' +
            '<td class="spec-key">' + formatLabel(key) + '</td>' +
            '<td class="spec-val">' + esc(String(val)) + '</td>' +
          '</tr>';
        }).join('');
        detContainer.innerHTML =
          '<table class="specs-table"><tbody>' + rows + '</tbody></table>';
      } else {
        detContainer.innerHTML = '';
      }
    }

    /* ── Compatibility list ──────────────────────────────── */
    var compatContainer = document.getElementById('specs-compat');
    if (compatContainer) {
      if (hasCompat) {
        compatContainer.innerHTML = specs.compatibility.map(function (item) {
          return '<li class="spec-compat-item">' +
            '<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;color:#22B8CF"><path d="M20 6 9 17l-5-5"/></svg>' +
            '<span>' + esc(item) + '</span>' +
          '</li>';
        }).join('');
      } else {
        compatContainer.innerHTML =
          '<li class="spec-compat-item" style="color:#94a3b8;font-style:italic;">Aucune information de compatibilité disponible.</li>';
      }
    }

    /* Reset to first tab */
    showSpecsTab('fiche');
  };

  /* ─── Tab switcher (called from HTML onclick) ──────────── */
  window.showSpecsTab = function (tab) {
    document.querySelectorAll('.specs-tab').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });
    document.querySelectorAll('.specs-panel').forEach(function (panel) {
      panel.classList.remove('active');
    });
    var active = document.getElementById('specs-panel-' + tab);
    if (active) active.classList.add('active');
  };

  /* ─── Helpers ──────────────────────────────────────────── */

  /**
   * Format spec key label:
   * "Type D'outil" or "type_d_outil" → "Type d'outil"
   * Rule: sentence case (first word capitalised, rest lowercase),
   * underscores → spaces, apostrophes preserved.
   */
  function formatLabel(key) {
    if (!key) return '';
    // Replace underscores/hyphens with space
    var s = String(key).replace(/[_-]/g, ' ').trim();
    // Lowercase everything
    s = s.toLowerCase();
    // Capitalise first character only
    s = s.charAt(0).toUpperCase() + s.slice(1);
    return esc(s);
  }

  function esc(str) {
    if (str === null || str === undefined) return '';
    var d = document.createElement('div');
    d.textContent = String(str);
    return d.innerHTML;
  }
})();
