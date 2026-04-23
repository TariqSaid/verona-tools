/**
 * ============================================================
 *  VERONA TOOLS — Application Logic
 * ============================================================
 *  Ce fichier ne contient PAS de données produit.
 *  Pour ajouter / modifier des produits, éditez les fichiers
 *  dans le dossier  data/  (electricite.js, outillage.js …)
 *
 *  Pour la configuration (catégories, traductions) : js/config.js
 * ============================================================
 */

'use strict';

/ ─── Global references (set by config.js before this runs) ──────────────
const products          = window.VT_PRODUCTS       || [];
const translations      = window.VT_TRANSLATIONS   || { fr: {}, en: {} };

function getProducts() {
  return Array.isArray(window.VT_PRODUCTS) ? window.VT_PRODUCTS : [];
}

// ─── IDs of the 3 most recent products (largest ids) ────────────────────
const maxIds = products.map(p => p.id).sort((a, b) => b - a).slice(0, 3);
function getMaxIds() {
  return getProducts().map(p => p.id).sort((a, b) => b - a).slice(0, 3);
}

function renderProductCard(p, i) {
  const maxIds         = getMaxIds();
  const brandClass    = getBrandClass(p.brand);
function renderCategorySections() {
  const products   = getProducts();
  const inStockEl  = document.getElementById('in-stock-toggle');
function openProductModal(productId) {
  const products = getProducts();
  const p = products.find(x => x.id === productId);

let catalogReloadAttempted = false;

function reloadCatalogScriptsOnce() {
  if (catalogReloadAttempted) return;
  catalogReloadAttempted = true;

  var files = [
    'data/electricite.js',
    'data/outillage.js',
    'data/quincaillerie.js',
    'data/peinture.js',
    'data/luminaire.js',
    'data/droguerie.js',
    'data/echelles.js',
    'data/rangement.js',
    'data/jardinage.js'
  ];

  window.VT_PRODUCTS = [];

  var index = 0;
  function loadNext() {
    if (index >= files.length) {
      try { renderCategorySections(); } catch (e) { /* silent */ }
      return;
    }

    var script = document.createElement('script');
    script.src = files[index] + '?reload=' + Date.now();
    script.onload = function () {
      index += 1;
      loadNext();
    };
    script.onerror = function () {
      index += 1;
      loadNext();
    };
    document.body.appendChild(script);
  }

  loadNext();
}

// ─── Image zoom (magnifier lens) ─────────────────────────────────────────

if (getProducts().length === 0) {
  setTimeout(reloadCatalogScriptsOnce, 250);
}

// Sync data-cat attributes on pills (in case HTML and JS differ)

// ─── Application state ───────────────────────────────────────────────────
let currentLang = 'fr';
let activeSearch = '';
let activeBrand = '';
let currentCategory = null;

// ─── Translation helper ──────────────────────────────────────────────────
function t(key) {
  return (translations[currentLang] || {})[key]
      || (translations.fr || {})[key]
      || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
}

// ─── Language toggle ─────────────────────────────────────────────────────
const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    const lbl = document.getElementById('lang-label');
    if (lbl) lbl.textContent = currentLang === 'fr' ? 'EN' : 'FR';
    document.documentElement.lang = currentLang;
    applyTranslations();
    renderCategorySections();
  });
}

// ─── Dark mode ───────────────────────────────────────────────────────────
let darkMode = localStorage.getItem('verona_dark') === 'true';

function applyDarkMode() {
  document.body.classList.toggle('dark', darkMode);
  const sun = document.getElementById('icon-sun');
  const moon = document.getElementById('icon-moon');
  if (sun) sun.classList.toggle('hidden', !darkMode);
  if (moon) moon.classList.toggle('hidden', darkMode);
  localStorage.setItem('verona_dark', darkMode);
}

const darkToggle = document.getElementById('dark-toggle');
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    applyDarkMode();
  });
}
applyDarkMode();

// ─── WhatsApp ────────────────────────────────────────────────────────────
function openWhatsApp() {
  var msg = encodeURIComponent('Bonjour Verona Tools, je souhaite obtenir plus d\'informations sur vos produits.');
  window.open('https://wa.me/212600960924?text=' + msg, '_blank');
}

// ─── View switching ──────────────────────────────────────────────────────
function setView(cat) {
  currentCategory = cat || null;
  activeSearch = '';
  activeBrand = '';
  const si = document.getElementById('search-input');
  if (si) si.value = '';
  renderCategorySections();
  updateActivePill(cat || '');
  setTimeout(function () {
    const ps = document.getElementById('products-section');
    if (ps) ps.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 30);
}

function scrollToCategory(cat) { setView(cat); }
function filterByCategory(cat) { setView(cat); }

function filterByBrand(brand) {
  currentCategory = null;
  activeBrand = brand;
  activeSearch = '';
  const si = document.getElementById('search-input');
  if (si) si.value = '';
  renderCategorySections();
  updateActivePill('');
  const ps = document.getElementById('products-section');
  if (ps) ps.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetView() {
  currentCategory = null;
  activeBrand = '';
  activeSearch = '';
  const si = document.getElementById('search-input');
  if (si) si.value = '';
  const st = document.getElementById('in-stock-toggle');
  if (st) st.checked = false;
  const so = document.getElementById('sort-select');
  if (so) so.value = 'default';
  renderCategorySections();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateActivePill('');
}

function scrollToProducts(e) {
  if (e && e.preventDefault) e.preventDefault();
  const ps = document.getElementById('products-section');
  if (ps) ps.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateActivePill(cat) {
  document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
  const sel = cat
    ? document.querySelector(`.pill-btn[data-cat="${cat}"]`)
    : document.querySelector('.pill-btn[data-cat=""]');
  if (sel) sel.classList.add('active');
}

// ─── Debounced search ────────────────────────────────────────────────────
let searchTimer;
const searchInput = document.getElementById('search-input');
if (searchInput) {
  searchInput.addEventListener('input', function (e) {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      activeSearch = e.target.value.toLowerCase().trim();
      activeBrand = '';
      currentCategory = null;
      renderCategorySections();
      if (activeSearch) {
        const ps = document.getElementById('products-section');
        if (ps) ps.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  });
}

// ─── Brand class map ─────────────────────────────────────────────────────
function getBrandClass(brand) {
  const map = {
    'Bosch': 'badge-bosch',
    'Ingco': 'badge-ingco',
    'Stanley': 'badge-stanley',
    'Schneider': 'badge-schneider',
    'Ingelec': 'badge-ingelec',
    'Legrand': 'badge-legrand',
    'Tolsen': 'badge-tolsen',
    'Makita': 'badge-makita',
    'Wokin': 'badge-wokin',
    'Vachette': 'badge-vachette',
  };
  return map[brand] || 'badge-default';
}

// ─── Price formatter — "Prix sur demande" when 0 ────────────────────────
function formatPrice(price_MAD) {
  if (!price_MAD || price_MAD === 0) return null;
  return Number(price_MAD).toLocaleString('fr-MA');
}

// ─── Card variant state (keyed by product id) ────────────────────────────
var _cardState = {};

// ─── Card pill click handler ─────────────────────────────────────────────
function vtCardPill(productId, optIdx, e) {
  if (e) { e.stopPropagation(); e.preventDefault(); }
  var p = products.find(function (x) { return x.id === productId; });
  if (!p || !p.variants || !p.variants.options) return;

  _cardState[productId] = _cardState[productId] || {};
  _cardState[productId].optIdx = optIdx;

  var opt = p.variants.options[optIdx];
  var card = document.querySelector('[data-card-id="' + productId + '"]');
  if (!card) return;

  card.querySelectorAll('.card-pill').forEach(function (btn, i) {
    btn.classList.toggle('active', i === optIdx);
    btn.setAttribute('aria-pressed', i === optIdx ? 'true' : 'false');
  });

  var selLabel = card.querySelector('.card-variant-selected');
  if (selLabel && opt) selLabel.textContent = opt.label;

  if (opt && opt.price_MAD > 0) {
    var priceEl = card.querySelector('.card-price-val');
    if (priceEl) {
      priceEl.innerHTML = Number(opt.price_MAD).toLocaleString('fr-MA') +
        ' <span class="text-sm font-semibold text-slate-400 ml-1">MAD</span>';
    }
  }

  if (opt && opt.image) vtSwapCardImg(card, opt.image);
}

// ─── Card color click handler ────────────────────────────────────────────
function vtCardColor(productId, colorIdx, e) {
  if (e) { e.stopPropagation(); e.preventDefault(); }
  var p = products.find(function (x) { return x.id === productId; });
  if (!p || !p.variants || !p.variants.colors) return;

  _cardState[productId] = _cardState[productId] || {};
  _cardState[productId].colorIdx = colorIdx;

  var color = p.variants.colors[colorIdx];
  var card = document.querySelector('[data-card-id="' + productId + '"]');
  if (!card) return;

  card.querySelectorAll('.card-color-btn').forEach(function (btn, i) {
    btn.classList.toggle('active', i === colorIdx);
    btn.setAttribute('aria-pressed', i === colorIdx ? 'true' : 'false');
  });

  var selLabel = card.querySelector('.card-variant-selected');
  if (selLabel && color) selLabel.textContent = color.name;

  if (color && color.image) vtSwapCardImg(card, color.image);
}

// ─── Card image swap ─────────────────────────────────────────────────────
function vtSwapCardImg(card, url) {
  var img = card.querySelector('.product-img');
  if (!img) return;
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.2s ease';
  setTimeout(function () {
    img.src = url;
    img.onload = function () { img.style.opacity = '1'; };
    img.style.opacity = '1';
  }, 150);
}

// ─── Product card renderer ───────────────────────────────────────────────
function renderProductCard(p, i) {
  const brandClass = getBrandClass(p.brand);
  const stockLabel = p.in_stock ? t('in_stock') : t('out_of_stock');
  const stockBadgeCls = p.in_stock ? 'stock-in' : 'stock-out';
  const imgSrc = (Array.isArray(p.images) && p.images.length > 0)
    ? p.images[0]
    : (Array.isArray(p.image_url) ? p.image_url[0] : (p.image_url || ''));
  const isNew = maxIds.includes(p.id);
  const delay = `animation-delay:${i * 0.04}s`;
  const v = p.variants || null;
  const hasVariants = v && (v.options || v.colors);
  const thumbCount = Array.isArray(p.images) ? p.images.length : (p.image_url ? 1 : 0);

  const priceHtml = formatPrice(p.price_MAD)
    ? `<div class="card-price-val price-tag text-[26px] font-black text-navy leading-none">
         ${formatPrice(p.price_MAD)}
         <span class="text-sm font-semibold text-slate-400 ml-1">MAD</span>
       </div>`
    : `<div class="card-price-val price-tag text-[20px] font-black leading-none">
         <span class="product-price-request">Prix sur demande</span>
       </div>`;

  let specsHtml = '';
  if (p.specs) {
    const tags = [];
    if (p.specs.highlight1_value) tags.push(p.specs.highlight1_value);
    if (p.specs.highlight2_value) tags.push(p.specs.highlight2_value);
    if (p.specs.highlight3_value) tags.push(p.specs.highlight3_value);
    if (tags.length) {
      specsHtml = '<div class="card-specs">' +
        tags.map(tag => `<span class="card-spec-tag">${tag}</span>`).join('') +
        '</div>';
    }
  }

  let variantsHtml = '';
  if (hasVariants) {
    const typeLabel = v.type === 'volume' ? 'Contenance'
      : v.type === 'size' ? 'Taille'
      : v.type === 'length' ? 'Longueur'
      : 'Options';
    const firstLabel = (v.options && v.options[0]) ? v.options[0].label
      : (v.colors && v.colors[0]) ? v.colors[0].name
      : '';

    variantsHtml = `<div class="card-variants" onclick="event.stopPropagation()">`;

    if (v.options && v.options.length) {
      variantsHtml +=
        `<div class="card-variant-label">
          <span>${typeLabel}</span>
          <span class="card-variant-selected">${firstLabel}</span>
        </div>
        <div class="card-pills">`;
      v.options.forEach((opt, idx) => {
        variantsHtml += `<button type="button" class="card-pill${idx === 0 ? ' active' : ''}"
          onclick="vtCardPill(${p.id},${idx},event)"
          aria-pressed="${idx === 0}">${opt.label}</button>`;
      });
      variantsHtml += `</div>`;
    }

    if (v.colors && v.colors.length) {
      variantsHtml += `<div class="card-colors">`;
      v.colors.forEach((c, idx) => {
        variantsHtml += `<button type="button" class="card-color-btn${idx === 0 ? ' active' : ''}"
          onclick="vtCardColor(${p.id},${idx},event)"
          style="background:${c.hex || '#ccc'};"
          title="${c.name}" aria-label="${c.name}"
          aria-pressed="${idx === 0}"></button>`;
      });
      variantsHtml += `</div>`;
    }

    variantsHtml += `</div>`;
  }

  return `
    <article class="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col fade-in"
             style="${delay}" data-card-id="${p.id}">
      <div class="product-card-media relative bg-gray-50 overflow-hidden cursor-pointer" style="padding-top:70%;"
           onclick="openProductModal(${p.id})">
        <img
          src="${imgSrc}"
          alt="${p.title}"
          loading="lazy"
          class="product-img absolute inset-0 w-full h-full object-contain p-3"
          onerror="this.src='https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80'"
        />

        <div class="product-card-topbar">
          <span class="${brandClass} absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm"
                style="${p.brand === 'Stanley' ? 'color:#1a1a1a;' : ''}">
            ${p.brand}
          </span>
          <span class="product-card-cat">${p.subcategory || p.category}</span>
        </div>

        ${isNew ? '<span class="badge-new">Nouveau</span>' : ''}
        ${thumbCount > 1 ? `<span class="product-card-gallery">${thumbCount} vues</span>` : ''}

        <div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200"
             style="background:rgba(30,41,59,0.08);">
          <span style="background:rgba(255,255,255,0.96);color:#1E293B;font-size:12px;font-weight:800;padding:7px 16px;border-radius:20px;letter-spacing:.04em;box-shadow:0 8px 20px rgba(0,0,0,0.10);">
            Voir Produit
          </span>
        </div>
      </div>

      <div class="product-card-body p-4 flex flex-col flex-1">
        <div class="product-card-header">
          <p class="product-card-kicker">${p.category}</p>
          <h3 class="text-[15px] font-extrabold text-navy leading-snug mb-2 line-clamp-2 flex-1 cursor-pointer hover:text-primary transition-colors"
              onclick="openProductModal(${p.id})">${p.title}</h3>
        </div>

        <p class="product-card-desc">${p.description_fr}</p>

        ${specsHtml}
        ${variantsHtml}

        <div class="product-card-meta">
          <span class="product-card-ref">${p.ref || 'VT-' + String(p.id).padStart(4, '0')}</span>
          <span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${stockBadgeCls}">${stockLabel}</span>
        </div>

        <div class="mt-auto pt-3 border-t border-gray-50 space-y-3" style="margin-top:10px;">
          <div class="flex items-end justify-between gap-3">
            <div class="product-card-price">
              <span class="product-price-label">Tarif</span>
              ${priceHtml}
            </div>

            <button onclick="openProductModal(${p.id})" class="product-card-cta">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Détails
            </button>
          </div>
        </div>
      </div>
    </article>`;
}

// ─── Main render function ────────────────────────────────────────────────
function renderCategorySections() {
  const inStockEl = document.getElementById('in-stock-toggle');
  const sortEl = document.getElementById('sort-select');
  const container = document.getElementById('category-sections');
  const emptyEl = document.getElementById('search-empty');
  const bannerEl = document.getElementById('cat-view-banner');
  const gridSec = document.getElementById('cat-grid-section');
  const headingEl = document.getElementById('products-heading');
  const backBtn = document.getElementById('back-to-all');

  if (!container || !empty
