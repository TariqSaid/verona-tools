/* ═══════════════════════════════════════════════════
   VERONA TOOLS — Variants Logic
   Called from openProductModal(product) in app.js:
   if (typeof renderVariants === 'function') renderVariants(p);
═══════════════════════════════════════════════════ */
(function() {
  'use strict';

  var _product = null;
  var _selectedOption = 0;
  var _selectedColor = 0;

  /* ── Main entry point ─────────────────────────── */
  window.renderVariants = function(product) {
    _product = product;
    _selectedOption = 0;
    _selectedColor = 0;

    var container = document.getElementById('variants-section');
    if (!container) return;

    var v = product && product.variants;
    if (!v || (!v.options && !v.colors)) {
      container.style.display = 'none';
      container.innerHTML = '';
      return;
    }

    container.style.display = 'block';
    container.innerHTML = buildHTML(v);
    bindEvents(v);
    applyOptionAt(0, v);
  };

  /* ── HTML builder ─────────────────────────────── */
  function buildHTML(v) {
    var html = '<div class="variants-block">';

    // Volume / size / length pills
    if (v.options && v.options.length) {
      var typeLabel = getTypeLabel(v.type);
      var firstLabel = v.options[0].label || '';

      html += '<div class="variant-group">';
      html += '<div class="variant-label-row">';
      html += '<span class="variant-type-label">' + esc(typeLabel) + '</span>';
      html += '<span class="variant-selected-badge" id="vt-selected-label">' + esc(firstLabel) + '</span>';
      html += '</div>';
      html += '<div class="variant-pills">';
      v.options.forEach(function(opt, i) {
        html += '<button type="button" class="variant-pill' + (i === 0 ? ' active' : '') + '" ' +
          'data-vt-index="' + i + '" aria-pressed="' + (i === 0) + '">' +
          esc(opt.label) + '</button>';
      });
      html += '</div>';

      // Dimension card for size type
      if (v.type === 'size' && v.options[0].width) {
        html += buildDimsCard(v.options[0]);
      }
      html += '</div>';
    }

    // Color swatches
    if (v.colors && v.colors.length) {
      html += '<div class="variant-group">';
      html += '<div class="variant-label-row">';
      html += '<span class="variant-type-label">Couleur</span>';
      html += '<span class="variant-selected-badge" id="vt-selected-color">' + esc(v.colors[0].name) + '</span>';
      html += '</div>';
      html += '<div class="variant-colors">';
      v.colors.forEach(function(c, i) {
        var bg = c.hex || '#ccc';
        html += '<button type="button" class="variant-color-btn' + (i === 0 ? ' active' : '') + '" ' +
          'data-vt-color="' + i + '" ' +
          'style="background:' + bg + ';" ' +
          'title="' + esc(c.name) + '" aria-label="' + esc(c.name) + '" ' +
          'aria-pressed="' + (i === 0) + '"></button>';
      });
      html += '</div>';
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  function buildDimsCard(opt) {
    var html = '<div class="variant-dims-card" id="vt-dims">';
    if (opt.width !== undefined && opt.width !== null) {
      html += dimItem('Largeur', opt.width + ' cm', 'vt-dim-width');
    }
    if (opt.depth !== undefined && opt.depth !== null) {
      html += dimItem('Profondeur', opt.depth + ' cm', 'vt-dim-depth');
    }
    if (opt.slots !== undefined && opt.slots !== null) {
      html += dimItem('Compartiments', opt.slots, 'vt-dim-slots');
    }
    html += '</div>';
    return html;
  }

  function dimItem(label, value, id) {
    return '<div class="variant-dim-item">' +
      '<div class="variant-dim-label">' + esc(label) + '</div>' +
      '<div class="variant-dim-value" id="' + id + '">' + esc(String(value)) + '</div>' +
    '</div>';
  }

  /* ── Event binding ────────────────────────────── */
  function bindEvents(v) {
    var container = document.getElementById('variants-section');
    if (!container) return;

    // Option pills
    container.querySelectorAll('[data-vt-index]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var idx = parseInt(this.getAttribute('data-vt-index'), 10);
        container.querySelectorAll('[data-vt-index]').forEach(function(b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');
        _selectedOption = idx;
        applyOptionAt(idx, v);
      });
    });

    // Color swatches
    container.querySelectorAll('[data-vt-color]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var idx = parseInt(this.getAttribute('data-vt-color'), 10);
        container.querySelectorAll('[data-vt-color]').forEach(function(b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');
        _selectedColor = idx;
        applyColorAt(idx, v);
      });
    });
  }

  /* ── Apply option selection ───────────────────── */
  function applyOptionAt(idx, v) {
    if (!v.options || !v.options[idx]) return;
    var opt = v.options[idx];

    // Update selected label
    var labelEl = document.getElementById('vt-selected-label');
    if (labelEl) labelEl.textContent = opt.label || '';

    // Update price if option has one
    if (opt.price_MAD !== undefined && opt.price_MAD > 0) {
      var priceEl = document.getElementById('modal-price');
      if (priceEl) priceEl.textContent = Number(opt.price_MAD).toLocaleString('fr-MA');
    }

    // Update ref if option has one
    if (opt.ref) {
      var skuEl = document.getElementById('modal-sku');
      if (skuEl && _product) {
        skuEl.textContent = 'Réf. ' + opt.ref +
          (_product.subcategory ? ' · ' + _product.subcategory : '');
      }
    }

    // Update dimension card for size type
    if (v.type === 'size') {
      var w = document.getElementById('vt-dim-width');
      var d = document.getElementById('vt-dim-depth');
      var s = document.getElementById('vt-dim-slots');
      if (w && opt.width != null) w.textContent = opt.width + ' cm';
      if (d && opt.depth != null) d.textContent = opt.depth + ' cm';
      if (s && opt.slots != null) s.textContent = opt.slots;
    }

    // Swap image if option has one
    if (opt.image) swapImage(opt.image);
  }

  /* ── Apply color selection ────────────────────── */
  function applyColorAt(idx, v) {
    if (!v.colors || !v.colors[idx]) return;
    var color = v.colors[idx];

    var labelEl = document.getElementById('vt-selected-color');
    if (labelEl) labelEl.textContent = color.name || '';

    if (color.image) swapImage(color.image);
  }

  /* ── Swap main product image ──────────────────── */
  function swapImage(url) {
    var mainImg = document.getElementById('modal-main-img');
    if (mainImg) {
      mainImg.style.opacity = '0';
      mainImg.style.transition = 'opacity 0.2s ease';
      setTimeout(function() {
        mainImg.src = url;
        mainImg.onload = function() {
          mainImg.style.opacity = '1';
        };
        mainImg.style.opacity = '1';
      }, 150);
    }
  }

  /* ── Helpers ──────────────────────────────────── */
  function getTypeLabel(type) {
    var labels = {
      'volume': 'Contenance',
      'size': 'Taille',
      'length': 'Longueur'
    };
    return labels[type] || 'Options';
  }

  function esc(str) {
    if (str === null || str === undefined) return '';
    var d = document.createElement('div');
    d.textContent = String(str);
    return d.innerHTML;
  }
})();
