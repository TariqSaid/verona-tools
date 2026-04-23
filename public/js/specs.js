/* ═══════════════════════════════════════════════════════════
   VERONA TOOLS — Product Specs Tabs
   Handles both old array format and new object format
   Supports: compatibles, incompatibles, compatibility fields
═══════════════════════════════════════════════════════════ */

function renderSpecsTabs(product) {
  var section = document.getElementById('specs-section');
  if (!section) return;

  if (!product || !product.specs) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  var s = product.specs || {};

  // ── Highlights ─────────────────────────────────────────
  var hlHTML = '';
  if (s.highlight1_value) hlHTML += buildHighlight(s.highlight1_value, s.highlight1_label);
  if (s.highlight2_value) hlHTML += buildHighlight(s.highlight2_value, s.highlight2_label);
  if (s.highlight3_value) hlHTML += buildHighlight(s.highlight3_value, s.highlight3_label);

  var hlContainer = document.getElementById('specs-highlights');
  if (hlContainer) {
    hlContainer.innerHTML = hlHTML;
    hlContainer.style.display = hlHTML ? 'grid' : 'none';
  }

  // ── Details table ──────────────────────────────────────
  var detailItems = normalizeDetails(s.details);
  var detHTML = '';
  if (detailItems.length) {
    var icons = getSpecIcons();
    for (var i = 0; i < detailItems.length; i++) {
      var icon = icons[i % icons.length];
      detHTML += '<div class="specs-row">' +
        '<span class="specs-label">' + icon + ' ' + escH(detailItems[i].label) + '</span>' +
        '<span class="specs-value">' + escH(detailItems[i].value) + '</span>' +
        '</div>';
    }
  }

  var detContainer = document.getElementById('specs-details');
  if (detContainer) detContainer.innerHTML = detHTML;

  // ── Compatibility ──────────────────────────────────────
  // Support both old fields (compatibles/incompatibles) and new (compatibility)
  var compatibles = normalizeList(s.compatibles || s.compatibility || []);
  var incompatibles = normalizeList(s.incompatibles || []);
  var compatHTML = '';

  if (compatibles.length) {
    for (var j = 0; j < compatibles.length; j++) {
      compatHTML += '<li class="specs-compat-item">' +
        '<svg class="specs-compat-ok" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>' +
        escH(compatibles[j]) +
        '</li>';
    }
  }

  if (incompatibles.length) {
    for (var k = 0; k < incompatibles.length; k++) {
      compatHTML += '<li class="specs-compat-item">' +
        '<svg class="specs-compat-no" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        escH(incompatibles[k]) +
        '</li>';
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

  showSpecsTab('fiche');
}

function showSpecsTab(tabId) {
  var allTabs = document.querySelectorAll('.specs-tab');
  var allPanels = document.querySelectorAll('.specs-panel');
  for (var i = 0; i < allTabs.length; i++) allTabs[i].classList.remove('active');
  for (var j = 0; j < allPanels.length; j++) allPanels[j].classList.remove('active');
  var btn = document.querySelector('.specs-tab[data-tab="' + tabId + '"]');
  var panel = document.getElementById('specs-panel-' + tabId);
  if (btn) btn.classList.add('active');
  if (panel) panel.classList.add('active');
}

function buildHighlight(value, label) {
  return '<div class="specs-hl">' +
    '<div class="specs-hl-val">' + escH(value) + '</div>' +
    '<div class="specs-hl-label">' + prettifyKey(label || '') + '</div>' +
    '</div>';
}

/* ── Handles BOTH array [{label,value}] AND object {"key":"value"} ── */
function normalizeDetails(details) {
  var rows = [];
  if (!details) return rows;

  // NEW FORMAT: plain object {"Puissance": "750 W", "Poids": "2.3 Kg"}
  if (!Array.isArray(details) && typeof details === 'object') {
    for (var key in details) {
      if (!Object.prototype.hasOwnProperty.call(details, key)) continue;
      rows.push({
        label: prettifyKey(key),
        value: stringifyValue(details[key])
      });
    }
    return rows;
  }

  // OLD FORMAT: array of objects/strings
  if (!Array.isArray(details)) return rows;

  for (var i = 0; i < details.length; i++) {
    var item = details[i];
    if (item == null) continue;

    if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
      rows.push({ label: 'Détail', value: stringifyValue(item) });
      continue;
    }

    if (typeof item === 'object' && !Array.isArray(item)) {
      var label = item.label || item.name || item.key || item.title || '';
      var value = item.value;
      if (value == null && 'values' in item) value = item.values;
      if (value == null && 'description' in item) value = item.description;

      if (label || value != null) {
        rows.push({
          label: prettifyKey(label || 'Détail'),
          value: stringifyValue(value)
        });
      } else {
        for (var k in item) {
          if (!Object.prototype.hasOwnProperty.call(item, k)) continue;
          rows.push({ label: prettifyKey(k), value: stringifyValue(item[k]) });
        }
      }
    }
  }
  return rows;
}

function normalizeList(items) {
  if (!Array.isArray(items)) return [];
  var out = [];
  for (var i = 0; i < items.length; i++) {
    var v = stringifyValue(items[i]);
    if (v) out.push(v);
  }
  return out;
}

function stringifyValue(value) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) {
    return value.map(function(v) { return stringifyValue(v); }).filter(Boolean).join(' · ');
  }
  if (typeof value === 'object') {
    if (value.label && value.value != null) return stringifyValue(value.value);
    var parts = [];
    for (var k in value) {
      if (!Object.prototype.hasOwnProperty.call(value, k)) continue;
      var pv = stringifyValue(value[k]);
      if (pv) parts.push(prettifyKey(k) + ': ' + pv);
    }
    return parts.join(' · ');
  }
  return String(value);
}

function prettifyKey(key) {
  return String(key || '')
    .replace(/[_-]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/^\w/, function(c) { return c.toUpperCase(); });
}

function escH(str) {
  if (str == null) return '';
  var d = document.createElement('div');
  d.textContent = String(str);
  return d.innerHTML;
}

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
