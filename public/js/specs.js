/* ═══════════════════════════════════════════════════════════
   VERONA TOOLS — Product Specs Tabs Logic
   Add this file to your GitHub repo at: js/specs.js
   
   This file renders the "Fiche technique" and "Compatibilité"
   tabs inside the product detail modal when a product has
   a "specs" field in its data.
══════════════════════════════════════════════════════════════ */

/**
 * Main function — call this from openProductModal() in app.js
 * Usage: renderSpecsTabs(product);
 */
function renderSpecsTabs(product) {
  var section = document.getElementById('specs-section');
  if (!section) return;

  // No specs? Hide the entire section
  if (!product || !product.specs) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';

  var s = product.specs;

  // ── HIGHLIGHTS (top 3 key stats) ──
  var hlHTML = '';
  if (s.highlight1_value) {
    hlHTML += buildHighlight(s.highlight1_value, s.highlight1_label);
  }
  if (s.highlight2_value) {
    hlHTML += buildHighlight(s.highlight2_value, s.highlight2_label);
  }
  if (s.highlight3_value) {
    hlHTML += buildHighlight(s.highlight3_value, s.highlight3_label);
  }
  var hlContainer = document.getElementById('specs-highlights');
  if (hlContainer) {
    hlContainer.innerHTML = hlHTML;
    // Hide highlights row if none
    hlContainer.style.display = hlHTML ? 'grid' : 'none';
  }

  // ── DETAIL ROWS (full spec table) ──
  var detHTML = '';
  if (s.details && s.details.length) {
    var icons = getSpecIcons();
    for (var i = 0; i < s.details.length; i++) {
      var icon = icons[i % icons.length];
      detHTML += '<div class="specs-row">' +
        '<span class="specs-label">' + icon + ' ' + escH(s.details[i].label) + '</span>' +
        '<span class="specs-value">' + escH(s.details[i].value) + '</span>' +
        '</div>';
    }
  }
  var detContainer = document.getElementById('specs-details');
  if (detContainer) detContainer.innerHTML = detHTML;

  // ── COMPATIBILITY ──
  var compatHTML = '';
  if (s.compatibles && s.compatibles.length) {
    for (var j = 0; j < s.compatibles.length; j++) {
      compatHTML += '<li class="specs-compat-item">' +
        '<svg class="specs-compat-ok" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>' +
        escH(s.compatibles[j]) + '</li>';
    }
  }
  if (s.incompatibles && s.incompatibles.length) {
    for (var k = 0; k < s.incompatibles.length; k++) {
      compatHTML += '<li class="specs-compat-item">' +
        '<svg class="specs-compat-no" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        escH(s.incompatibles[k]) + '</li>';
    }
  }
  if (!compatHTML) {
    compatHTML = '<div class="specs-empty">' +
      '<svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">' +
      '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>' +
      'Aucune information de compatibilité disponible</div>';
  }
  var compatContainer = document.getElementById('specs-compat');
  if (compatContainer) compatContainer.innerHTML = compatHTML;

  // Reset to first tab
  showSpecsTab('fiche');
}

/**
 * Switch between tabs
 */
function showSpecsTab(tabId) {
  var allTabs = document.querySelectorAll('.specs-tab');
  var allPanels = document.querySelectorAll('.specs-panel');
  for (var i = 0; i < allTabs.length; i++) {
    allTabs[i].classList.remove('active');
  }
  for (var j = 0; j < allPanels.length; j++) {
    allPanels[j].classList.remove('active');
  }
  var btn = document.querySelector('.specs-tab[data-tab="' + tabId + '"]');
  var panel = document.getElementById('specs-panel-' + tabId);
  if (btn) btn.classList.add('active');
  if (panel) panel.classList.add('active');
}

/**
 * Build a highlight card
 */
function buildHighlight(value, label) {
  return '<div class="specs-hl">' +
    '<div class="specs-hl-val">' + escH(value) + '</div>' +
    '<div class="specs-hl-label">' + escH(label || '') + '</div>' +
    '</div>';
}

/**
 * Escape HTML to prevent XSS
 */
function escH(str) {
  if (!str) return '';
  var d = document.createElement('div');
  d.textContent = String(str);
  return d.innerHTML;
}

/**
 * Rotating SVG icons for detail rows
 */
function getSpecIcons() {
  return [
    '<svg width="16" height="16" fill="none" stroke="#94a3b8" stroke-width="1.5" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    '<svg width="16" height="16" fill="none" stroke="#94a3b8" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    '<svg width="16" height="16" fill="none" stroke="#94a3b8" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>',
    '<svg width="16" height="16" fill="none" stroke="#94a3b8" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20"/></svg>',
    '<svg width="16" height="16" fill="none" stroke="#94a3b8" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2"/></svg>',
    '<svg width="16" height="16" fill="none" stroke="#94a3b8" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>',
    '<svg width="16" height="16" fill="none" stroke="#94a3b8" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    '<svg width="16" height="16" fill="none" stroke="#94a3b8" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
  ];
}
