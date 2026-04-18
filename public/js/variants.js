/**
 * ============================================================
 *  VERONA TOOLS — Product Variants System
 * ============================================================
 *  Handles size, color, and texture variants in product modal.
 *  Products with a "variants" field auto-show the selector.
 *  Products without variants display normally.
 *
 *  Data model:
 *  variants: {
 *    sizes:    [{ label, price_MAD, width?, depth?, slots?, ref? }],
 *    colors:   [{ name, hex, image? }],
 *    textures: [{ name, swatch, image? }]
 *  }
 * ============================================================
 */

'use strict';

var variantState = { size: 0, color: 0, texture: 0 };

function renderVariants(product) {
  var section = document.getElementById('variants-section');
  if (!section) return;

  if (!product || !product.variants) {
    section.style.display = 'none';
    return;
  }

  var v = product.variants;
  var hasSizes = v.sizes && v.sizes.length > 0;
  var hasColors = v.colors && v.colors.length > 0;
  var hasTextures = v.textures && v.textures.length > 0;

  if (!hasSizes && !hasColors && !hasTextures) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  variantState = { size: 0, color: 0, texture: 0 };

  var html = '';

  // === SIZE SELECTOR ===
  if (hasSizes) {
    html += '<div class="vr-group">';
    html += '<div class="vr-label">';
    html += (v.sizes[0].width ? 'Taille' : 'Volume');
    html += ' <span id="vr-size-label">' + escV(v.sizes[0].label) + '</span></div>';
    html += '<div class="vr-sizes" id="vr-sizes">';
    v.sizes.forEach(function(s, i) {
      html += '<button class="vr-sz' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '" onclick="selectVariantSize(' + i + ')">' + escV(s.label) + '</button>';
    });
    html += '</div>';

    // Dimension summary (if sizes have width/depth)
    if (v.sizes[0].width) {
      html += '<div class="vr-dims" id="vr-dims">';
      html += '<div class="vr-dim"><div class="vr-dim-val" id="vr-dim-w">' + v.sizes[0].width + '</div><div class="vr-dim-lbl">Largeur (cm)</div></div>';
      html += '<div class="vr-dim"><div class="vr-dim-val" id="vr-dim-d">' + (v.sizes[0].depth || '') + '</div><div class="vr-dim-lbl">Profondeur (cm)</div></div>';
      if (v.sizes[0].slots) {
        html += '<div class="vr-dim"><div class="vr-dim-val" id="vr-dim-s">' + v.sizes[0].slots + '</div><div class="vr-dim-lbl">Compartiments</div></div>';
      }
      html += '</div>';
    }
    html += '</div>';
  }

  // === COLOR SELECTOR ===
  if (hasColors) {
    html += '<div class="vr-group">';
    html += '<div class="vr-label">Couleur <span id="vr-color-label">' + escV(v.colors[0].name) + '</span></div>';
    html += '<div class="vr-colors" id="vr-colors">';
    v.colors.forEach(function(c, i) {
      html += '<div class="vr-clr' + (i === 0 ? ' active' : '') + '" style="background:' + c.hex + '" title="' + escV(c.name) + '" onclick="selectVariantColor(' + i + ')"></div>';
    });
    html += '</div>';
    html += '</div>';
  }

  // === TEXTURE SELECTOR ===
  if (hasTextures) {
    html += '<div class="vr-group">';
    html += '<div class="vr-label">Finition <span id="vr-tex-label">' + escV(v.textures[0].name) + '</span></div>';
    html += '<div class="vr-textures" id="vr-textures">';
    v.textures.forEach(function(t, i) {
      var bg = t.swatch
        ? 'background-image:url(' + t.swatch + ')'
        : 'background:' + (t.hex || '#ccc');
      html += '<div class="vr-tex' + (i === 0 ? ' active' : '') + '" style="' + bg + '" title="' + escV(t.name) + '" onclick="selectVariantTexture(' + i + ')"></div>';
    });
    html += '</div>';
    html += '</div>';
  }

  section.innerHTML = html;
  applyVariantToModal(product);
}

function selectVariantSize(idx) {
  variantState.size = idx;
  var product = window.modalCurrentProduct;
  if (!product || !product.variants || !product.variants.sizes) return;
  var v = product.variants;
  var s = v.sizes[idx];

  // Update active button
  var btns = document.querySelectorAll('#variants-section .vr-sz');
  btns.forEach(function(b, i) { b.classList.toggle('active', i === idx); });

  // Update label
  var lbl = document.getElementById('vr-size-label');
  if (lbl) lbl.textContent = s.label;

  // Update dimensions
  var dw = document.getElementById('vr-dim-w');
  var dd = document.getElementById('vr-dim-d');
  var ds = document.getElementById('vr-dim-s');
  if (dw && s.width) dw.textContent = s.width;
  if (dd && s.depth) dd.textContent = s.depth;
  if (ds && s.slots) ds.textContent = s.slots;

  applyVariantToModal(product);
}

function selectVariantColor(idx) {
  variantState.color = idx;
  var product = window.modalCurrentProduct;
  if (!product || !product.variants || !product.variants.colors) return;
  var c = product.variants.colors[idx];

  // Update active swatch
  var swatches = document.querySelectorAll('#variants-section .vr-clr');
  swatches.forEach(function(s, i) { s.classList.toggle('active', i === idx); });

  // Update label
  var lbl = document.getElementById('vr-color-label');
  if (lbl) lbl.textContent = c.name;

  applyVariantToModal(product);
}

function selectVariantTexture(idx) {
  variantState.texture = idx;
  var product = window.modalCurrentProduct;
  if (!product || !product.variants || !product.variants.textures) return;
  var t = product.variants.textures[idx];

  // Update active swatch
  var swatches = document.querySelectorAll('#variants-section .vr-tex');
  swatches.forEach(function(s, i) { s.classList.toggle('active', i === idx); });

  // Update label
  var lbl = document.getElementById('vr-tex-label');
  if (lbl) lbl.textContent = t.name;

  applyVariantToModal(product);
}

function applyVariantToModal(product) {
  if (!product || !product.variants) return;
  var v = product.variants;

  // Update price from selected size (sizes usually carry different prices)
  if (v.sizes && v.sizes[variantState.size]) {
    var selectedSize = v.sizes[variantState.size];
    if (selectedSize.price_MAD !== undefined) {
      var priceEl = document.getElementById('modal-price');
      if (priceEl) priceEl.textContent = selectedSize.price_MAD.toLocaleString('fr-MA');
    }
    // Update ref if variant has one
    if (selectedSize.ref) {
      var skuEl = document.getElementById('modal-sku');
      if (skuEl) skuEl.textContent = 'Réf. ' + selectedSize.ref + ' · ' + (product.subcategory || '');
    }
  }

  // Update image from selected color or texture (if they have images)
  var newImage = null;
  if (v.colors && v.colors[variantState.color] && v.colors[variantState.color].image) {
    newImage = v.colors[variantState.color].image;
  }
  if (v.textures && v.textures[variantState.texture] && v.textures[variantState.texture].image) {
    newImage = v.textures[variantState.texture].image;
  }
  if (newImage) {
    var mainImg = document.getElementById('modal-main-img');
    if (mainImg) mainImg.src = newImage;
  }
}

function escV(str) {
  if (!str) return '';
  var d = document.createElement('div');
  d.textContent = String(str);
  return d.innerHTML;
}
