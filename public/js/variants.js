/* ══════════════════════════════════════════════════════════
   VERONA TOOLS — Product Variants Logic
   Renders size pills, color swatches, and texture swatches
   inside the product modal.
   
   Each product can have a "variants" field like:
   variants: {
     sizes:    [{label:"47X49", width:47, depth:49, slots:6, price_MAD:120, ref:"D01-47"}, ...],
     colors:   [{name:"Marbre Blanc", hex:"#f4f4f4", image:"/images/variants/white.jpg"}, ...],
     textures: [{name:"Lisse",   swatch:"/images/variants/smooth.jpg", image:"/images/..."}, ...]
   }
═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // Remember user's current selection per product
  var selection = { size: 0, color: 0, texture: 0 };
  var currentProduct = null;

  /**
   * Main entry point — call from openProductModal(product)
   */
  window.renderVariants = function(product) {
    currentProduct = product;
    selection = { size: 0, color: 0, texture: 0 };

    var container = document.getElementById('variants-section');
    if (!container) return;

    if (!product || !product.variants ||
        (!product.variants.sizes && !product.variants.colors && !product.variants.textures)) {
      container.style.display = 'none';
      container.innerHTML = '';
      return;
    }

    container.style.display = 'block';
    container.innerHTML = buildVariantsHTML(product.variants);
    attachListeners();
    updateSelectedDisplay();
  };

  function buildVariantsHTML(v) {
    var html = '<div class="variants-block">';

    // ── Sizes ──
    if (v.sizes && v.sizes.length) {
      html += '<div class="variant-group">';
      html += '<div class="variant-label">' +
        '<strong>Taille</strong>' +
        '<span class="variant-selected-value" data-selected="size">' + esc(v.sizes[0].label) + '</span>' +
      '</div>';
      html += '<div class="variant-sizes">';
      v.sizes.forEach(function(s, i) {
        html += '<button type="button" class="variant-size ' + (i === 0 ? 'active' : '') + '" ' +
          'data-kind="size" data-index="' + i + '">' +
          esc(s.label) +
        '</button>';
      });
      html += '</div>';

      // Dimension summary
      var first = v.sizes[0];
      if (first.width || first.depth || first.slots !== undefined) {
        html += '<div class="variant-dims" id="variant-dims">';
        if (first.width)  html += dimHTML('Largeur', first.width + ' cm', 'width');
        if (first.depth)  html += dimHTML('Profondeur', first.depth + ' cm', 'depth');
        if (first.slots !== undefined) html += dimHTML('Compartiments', first.slots, 'slots');
        html += '</div>';
      }
      html += '</div>';
    }

    // ── Colors ──
    if (v.colors && v.colors.length) {
      html += '<div class="variant-group">';
      html += '<div class="variant-label">' +
        '<strong>Couleur</strong>' +
        '<span class="variant-selected-value" data-selected="color">' + esc(v.colors[0].name) + '</span>' +
      '</div>';
      html += '<div class="variant-colors">';
      v.colors.forEach(function(c, i) {
        var bg = c.hex || '#ccc';
        html += '<button type="button" class="variant-color ' + (i === 0 ? 'active' : '') + '" ' +
          'data-kind="color" data-index="' + i + '" ' +
          'style="background:' + bg + ';" ' +
          'title="' + esc(c.name) + '" aria-label="' + esc(c.name) + '"></button>';
      });
      html += '</div>';
      html += '</div>';
    }

    // ── Textures ──
    if (v.textures && v.textures.length) {
      html += '<div class="variant-group">';
      html += '<div class="variant-label">' +
        '<strong>Motif</strong>' +
        '<span class="variant-selected-value" data-selected="texture">' + esc(v.textures[0].name) + '</span>' +
      '</div>';
      html += '<div class="variant-textures">';
      v.textures.forEach(function(t, i) {
        var style = t.swatch
          ? ('background-image:url(\'' + t.swatch + '\');')
          : ('background:' + (t.hex || '#eee') + ';');
        html += '<button type="button" class="variant-texture ' + (i === 0 ? 'active' : '') + '" ' +
          'data-kind="texture" data-index="' + i + '" ' +
          'style="' + style + '" ' +
          'title="' + esc(t.name) + '" aria-label="' + esc(t.name) + '"></button>';
      });
      html += '</div>';
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  function dimHTML(label, value, key) {
    return '<div class="variant-dim" data-dim="' + key + '">' +
      '<div class="variant-dim-label">' + esc(label) + '</div>' +
      '<div class="variant-dim-value">' + esc(value) + '</div>' +
    '</div>';
  }

  function attachListeners() {
    var buttons = document.querySelectorAll('#variants-section [data-kind]');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var kind = this.getAttribute('data-kind');
        var idx = parseInt(this.getAttribute('data-index'), 10);

        // Deactivate siblings of same kind
        document.querySelectorAll('#variants-section [data-kind="' + kind + '"]').forEach(function(el) {
          el.classList.remove('active');
        });
        this.classList.add('active');

        selection[kind] = idx;
        applySelection(kind);
      });
    });
  }

  function applySelection(kind) {
    if (!currentProduct || !currentProduct.variants) return;
    var v = currentProduct.variants;

    // Update selected-value label
    var data = null;
    if (kind === 'size' && v.sizes)       data = v.sizes[selection.size];
    if (kind === 'color' && v.colors)     data = v.colors[selection.color];
    if (kind === 'texture' && v.textures) data = v.textures[selection.texture];
    if (data) {
      var labelEl = document.querySelector('#variants-section [data-selected="' + kind + '"]');
      if (labelEl) labelEl.textContent = data.label || data.name || '';
    }

    // Size change → update price, ref, dimensions
    if (kind === 'size') {
      var size = v.sizes[selection.size];
      if (size) {
        if (size.price_MAD !== undefined) {
          var priceEl = document.getElementById('modal-price');
          if (priceEl) priceEl.textContent = Number(size.price_MAD).toLocaleString('fr-MA');
        }
        if (size.ref) {
          var skuEl = document.getElementById('modal-sku');
          if (skuEl) {
            skuEl.textContent = 'Réf. ' + size.ref +
              (currentProduct.subcategory ? ' · ' + currentProduct.subcategory : '');
          }
        }
        var dimBox = document.getElementById('variant-dims');
        if (dimBox) {
          var widthEl  = dimBox.querySelector('[data-dim="width"] .variant-dim-value');
          var depthEl  = dimBox.querySelector('[data-dim="depth"] .variant-dim-value');
          var slotsEl  = dimBox.querySelector('[data-dim="slots"] .variant-dim-value');
          if (widthEl && size.width)  widthEl.textContent = size.width + ' cm';
          if (depthEl && size.depth)  depthEl.textContent = size.depth + ' cm';
          if (slotsEl && size.slots !== undefined) slotsEl.textContent = size.slots;
        }
      }
    }

    // Color/texture change → swap main image if variant has an image
    if (kind === 'color' || kind === 'texture') {
      var arr = kind === 'color' ? v.colors : v.textures;
      var selected = arr[selection[kind]];
      if (selected && selected.image) {
        var mainImg = document.getElementById('modal-main-img');
        if (mainImg) {
          mainImg.src = selected.image;
          mainImg.style.transform = '';
        }
        document.querySelectorAll('.modal-thumb').forEach(function(t) { t.classList.remove('active'); });
      }
    }
  }

  function updateSelectedDisplay() {
    // Initialize price/ref from selected size if sizes exist
    if (currentProduct && currentProduct.variants && currentProduct.variants.sizes) {
      applySelection('size');
    }
  }

  function esc(str) {
    if (str === null || str === undefined) return '';
    var d = document.createElement('div');
    d.textContent = String(str);
    return d.innerHTML;
  }
})();
