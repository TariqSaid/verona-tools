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

// ─── Global references (set by config.js before this runs) ──────────────
const products          = window.VT_PRODUCTS       || [];
const translations      = window.VT_TRANSLATIONS   || { fr: {}, en: {} };
const CATEGORY_CONFIG   = window.VT_CATEGORY_CONFIG || [];

// ─── IDs of the 3 most recent products (largest ids) ────────────────────
const maxIds = products.map(p => p.id).sort((a, b) => b - a).slice(0, 3);

// ─── Application state ───────────────────────────────────────────────────
let currentLang     = 'fr';
let activeSearch    = '';
let activeBrand     = '';
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
  const sun  = document.getElementById('icon-sun');
  const moon = document.getElementById('icon-moon');
  if (sun)  sun.classList.toggle('hidden', !darkMode);
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
  activeSearch    = '';
  activeBrand     = '';
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
  activeBrand     = brand;
  activeSearch    = '';
  const si = document.getElementById('search-input');
  if (si) si.value = '';
  renderCategorySections();
  updateActivePill('');
  const ps = document.getElementById('products-section');
  if (ps) ps.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetView() {
  currentCategory = null;
  activeBrand     = '';
  activeSearch    = '';
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
      activeSearch    = e.target.value.toLowerCase().trim();
      activeBrand     = '';
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
    'Bosch'    : 'badge-bosch',
    'Ingco'    : 'badge-ingco',
    'Stanley'  : 'badge-stanley',
    'Schneider': 'badge-schneider',
    'Ingelec'  : 'badge-ingelec',
    'Legrand'  : 'badge-legrand',
    'Tolsen'   : 'badge-tolsen',
    'Makita'   : 'badge-makita',
    'Wokin'    : 'badge-wokin',
    'Vachette' : 'badge-vachette',
  };
  return map[brand] || 'badge-default';
}

// ─── Card variant state (keyed by product id) ────────────────────────────
var _cardState = {};

// ─── Card pill click handler ─────────────────────────────────────────────
function vtCardPill(productId, optIdx, e) {
  if (e) { e.stopPropagation(); e.preventDefault(); }
  var p = products.find(function(x) { return x.id === productId; });
  if (!p || !p.variants || !p.variants.options) return;

  _cardState[productId] = _cardState[productId] || {};
  _cardState[productId].optIdx = optIdx;

  var opt = p.variants.options[optIdx];
  var card = document.querySelector('[data-card-id="' + productId + '"]');
  if (!card) return;

  card.querySelectorAll('.card-pill').forEach(function(btn, i) {
    btn.classList.toggle('active', i === optIdx);
    btn.setAttribute('aria-pressed', i === optIdx ? 'true' : 'false');
  });

  var selLabel = card.querySelector('.card-variant-selected');
  if (selLabel && opt) selLabel.textContent = opt.label;

  if (opt && opt.price_MAD > 0) {
    var priceEl = card.querySelector('.card-price-val');
    if (priceEl) priceEl.textContent = Number(opt.price_MAD).toLocaleString('fr-MA');
  }

  if (opt && opt.image) vtSwapCardImg(card, opt.image);
}

// ─── Card color click handler ────────────────────────────────────────────
function vtCardColor(productId, colorIdx, e) {
  if (e) { e.stopPropagation(); e.preventDefault(); }
  var p = products.find(function(x) { return x.id === productId; });
  if (!p || !p.variants || !p.variants.colors) return;

  _cardState[productId] = _cardState[productId] || {};
  _cardState[productId].colorIdx = colorIdx;

  var color = p.variants.colors[colorIdx];
  var card = document.querySelector('[data-card-id="' + productId + '"]');
  if (!card) return;

  card.querySelectorAll('.card-color-btn').forEach(function(btn, i) {
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
  setTimeout(function() {
    img.src = url;
    img.onload = function() { img.style.opacity = '1'; };
    img.style.opacity = '1';
  }, 150);
}

// ─── Product card renderer ───────────────────────────────────────────────
function renderProductCard(p, i) {
  const brandClass    = getBrandClass(p.brand);
  const stockLabel    = p.in_stock ? t('in_stock') : t('out_of_stock');
  const stockBadgeCls = p.in_stock ? 'stock-in' : 'stock-out';
  const imgSrc        = (Array.isArray(p.images) && p.images.length > 0)
                          ? p.images[0]
                          : (Array.isArray(p.image_url) ? p.image_url[0] : (p.image_url || ''));
  const isNew         = maxIds.includes(p.id);
  const delay         = `animation-delay:${i * 0.04}s`;
  const v             = p.variants || null;
  const hasVariants   = v && (v.options || v.colors);

  // ── Spec highlight tags ──────────────────────────────────
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

  // ── Card variants HTML ───────────────────────────────────
  let variantsHtml = '';
  if (hasVariants) {
    const typeLabel = v.type === 'volume' ? 'Contenance' :
                     v.type === 'size'   ? 'Taille' :
                     v.type === 'length' ? 'Longueur' : 'Options';
    const firstLabel = (v.options && v.options[0]) ? v.options[0].label :
                       (v.colors  && v.colors[0])  ? v.colors[0].name  : '';

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

      <div class="relative bg-gray-50 overflow-hidden cursor-pointer" style="padding-top:70%;"
           onclick="openProductModal(${p.id})">
        <img src="${imgSrc}" alt="${p.title}" loading="lazy"
             class="product-img absolute inset-0 w-full h-full object-contain p-3"
             onerror="this.src='https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80'" />
        <span class="${brandClass} absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm"
              style="${p.brand === 'Stanley' ? 'color:#1a1a1a;' : ''}">
          ${p.brand}
        </span>
        ${isNew ? '<span class="badge-new">Nouveau</span>' : ''}
        <div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200"
             style="background:rgba(30,41,59,0.08);">
          <span style="background:rgba(255,255,255,0.95);color:#1E293B;font-size:12px;font-weight:700;padding:6px 16px;border-radius:20px;letter-spacing:.04em;box-shadow:0 2px 8px rgba(0,0,0,0.10);">
            Voir Produit
          </span>
        </div>
      </div>

      <div class="p-3.5 flex flex-col flex-1">
        <p class="text-gray-400 text-[10px] uppercase tracking-widest font-semibold mb-1">${p.subcategory || p.category}</p>
        <h3 class="text-sm font-bold text-navy leading-tight mb-1.5 line-clamp-2 flex-1 cursor-pointer hover:text-primary transition-colors"
            onclick="openProductModal(${p.id})">${p.title}</h3>
        <p class="text-gray-500 text-xs leading-relaxed mb-2 line-clamp-2">${p.description_fr}</p>
        ${specsHtml}
        ${variantsHtml}
        <div class="mt-auto pt-2 border-t border-gray-50 space-y-2" style="margin-top:10px;">
          <div class="flex items-center justify-between gap-2">
            <div>
              <span class="card-price-val price-tag text-xl font-black text-navy">${p.price_MAD.toLocaleString('fr-MA')}</span>
              <span class="text-sm font-semibold text-gray-400 ml-1">MAD</span>
            </div>
            <span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${stockBadgeCls}">${stockLabel}</span>
          </div>
          <button onclick="openProductModal(${p.id})"
            class="w-full bg-primary hover:bg-primary-dark text-white text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Voir Produit
          </button>
        </div>
      </div>
    </article>`;
}

// ─── Main render function ────────────────────────────────────────────────
function renderCategorySections() {
  const inStockEl  = document.getElementById('in-stock-toggle');
  const sortEl     = document.getElementById('sort-select');
  const container  = document.getElementById('category-sections');
  const emptyEl    = document.getElementById('search-empty');
  const bannerEl   = document.getElementById('cat-view-banner');
  const gridSec    = document.getElementById('cat-grid-section');
  const headingEl  = document.getElementById('products-heading');
  const backBtn    = document.getElementById('back-to-all');

  if (!container || !emptyEl || !inStockEl || !sortEl) return;

  const inStockOnly = inStockEl.checked;
  const sortVal     = sortEl.value;
  const inCatView   = !!currentCategory;

  if (gridSec) gridSec.style.display = inCatView ? 'none' : '';
  if (backBtn) backBtn.classList.toggle('visible', inCatView);
  if (headingEl) headingEl.textContent = currentCategory || t('our_products');

  const filtered = products.filter(p => {
    if (currentCategory && p.category !== currentCategory) return false;
    if (activeBrand     && p.brand    !== activeBrand)     return false;
    if (inStockOnly     && !p.in_stock)                    return false;
    if (activeSearch) {
      const hay = `${p.title} ${p.brand} ${p.category} ${p.description_fr}`.toLowerCase();
      if (!hay.includes(activeSearch)) return false;
    }
    return true;
  });

  if      (sortVal === 'price-asc')  filtered.sort((a, b) => a.price_MAD - b.price_MAD);
  else if (sortVal === 'price-desc') filtered.sort((a, b) => b.price_MAD - a.price_MAD);
  else if (sortVal === 'name')       filtered.sort((a, b) => a.title.localeCompare(b.title, 'fr'));

  const rc = document.getElementById('result-count');
  if (rc) rc.textContent = `${filtered.length} ${t('products_found')}`;

  if (bannerEl) {
    if (inCatView) {
      const cfg        = CATEGORY_CONFIG.find(c => c.name === currentCategory) || {};
      const totalInCat = products.filter(p => p.category === currentCategory).length;
      const inStockCnt = products.filter(p => p.category === currentCategory && p.in_stock).length;
      const brandList  = [...new Set(products.filter(p => p.category === currentCategory).map(p => p.brand))];
      const largeIcon  = (cfg.icon || '').replace('class="w-6 h-6"', 'class="w-9 h-9"');

      bannerEl.innerHTML = `
        <div class="cat-view-banner view-enter">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 md:p-7">
            <div style="background:rgba(192,57,43,0.16);border-radius:16px;padding:16px;flex-shrink:0;display:flex;">
              <span class="text-primary">${largeIcon}</span>
            </div>
            <div class="flex-1 min-w-0">
              <nav class="view-breadcrumb" aria-label="Fil d'Ariane">
                <button onclick="resetView()">Accueil</button>
                <svg class="w-3 h-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
                <span style="color:#C0392B;">${currentCategory}</span>
              </nav>
              <h2 class="text-2xl md:text-3xl font-black text-white tracking-tight leading-none mt-1">${currentCategory}</h2>
              <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                <span class="text-gray-400 text-xs font-medium">${totalInCat} produit${totalInCat !== 1 ? 's' : ''}</span>
                <span class="text-gray-600 text-xs">·</span>
                <span class="text-green-400 text-xs font-medium">${inStockCnt} en stock</span>
                <span class="text-gray-600 text-xs">·</span>
                <span class="text-gray-400 text-xs font-medium">${brandList.join(' · ')}</span>
              </div>
            </div>
            <button onclick="resetView()"
              class="flex-shrink-0 hidden sm:inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white border border-white/10 hover:border-white/25 rounded-xl px-4 py-2.5 transition-all">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
              Toutes catégories
            </button>
          </div>
        </div>`;
    } else {
      bannerEl.innerHTML = '';
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = '';
    emptyEl.classList.remove('hidden');
    return;
  }
  emptyEl.classList.add('hidden');

  let html = '';

  if (inCatView) {
    html = '<div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 view-enter">';
    filtered.forEach((p, i) => { html += renderProductCard(p, i); });
    html += '</div>';
  } else {
    CATEGORY_CONFIG.forEach(cfg => {
      const catProds = filtered.filter(p => p.category === cfg.name);
      const safeId   = cfg.name.replace(/[^a-zA-Z0-9]/g, '-');

      html += `<section class="cat-section-block bg-white shadow-sm border border-gray-100" id="cat-block-${safeId}" style="scroll-margin-top:90px;">`;
      html += `
        <div class="cat-section-header flex items-center gap-3 px-6 py-4 border-b border-gray-100" style="background:${cfg.bg};">
          <span class="text-primary">${cfg.icon}</span>
          <h2 class="font-black text-navy text-lg tracking-tight">${cfg.name}</h2>
          <button class="cat-count-link ml-auto" onclick="setView('${cfg.name.replace(/'/g, "\\'")}')">
            ${catProds.length} produit${catProds.length !== 1 ? 's' : ''}
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>`;

      if (catProds.length === 0) {
        html += `
          <div class="cat-section-empty">
            <svg class="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 01-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 011-.99 11.39 11.39 0 0014 0A1 1 0 0120 6z"/>
            </svg>
            <p class="text-sm font-semibold">Produits bientôt disponibles</p>
          </div>`;
      } else {
        html += '<div class="p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">';
        catProds.forEach((p, i) => { html += renderProductCard(p, i); });
        html += '</div>';
      }
      html += '</section>';
    });
  }

  container.innerHTML = html;
}

function updateResultCount() { renderCategorySections(); }

// ─── Toast notification ──────────────────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast) return;
  if (toastMsg) toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ─── Mobile nav ──────────────────────────────────────────────────────────
function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  if (!nav) return;
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}

// ─── Hero slider ─────────────────────────────────────────────────────────
const heroSlides = [
  { title: 'VERONA<br><span class="text-primary">TOOLS</span>',
    subtitle: 'Quincaillerie &amp; Outillage Professionnel — Casablanca, Maroc.' },
  { title: 'Matériel<br><span class="text-primary">Électrique</span>',
    subtitle: 'Les Meilleures Marques — Schneider, Legrand, Ingelec.' },
  { title: 'Outillage<br><span class="text-primary">à Main</span>',
    subtitle: 'Qualité Professionnelle — Bosch, Makita, Stanley, Ingco.' },
  { title: 'Peinture &amp;<br><span class="text-primary">Rénovation</span>',
    subtitle: 'Tout Pour Vos Projets — Large Choix à Prix Compétitifs.' },
];
let currentSlide = 0;
let heroInterval;

function goToSlide(idx) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-nav-dot');
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = ((idx % slides.length) + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  const titleEl = document.getElementById('hero-title');
  const subEl   = document.getElementById('hero-subtitle');
  if (titleEl && heroSlides[currentSlide]) titleEl.innerHTML  = heroSlides[currentSlide].title;
  if (subEl   && heroSlides[currentSlide]) subEl.innerHTML    = heroSlides[currentSlide].subtitle;
}

function heroSlide(dir) {
  clearInterval(heroInterval);
  goToSlide(currentSlide + dir);
  heroInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

function startHeroSlider() {
  heroInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

// ─── Back to top ─────────────────────────────────────────────────────────
window.addEventListener('scroll', function () {
  const btn = document.getElementById('back-to-top');
  if (btn) btn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

// ─── Page loader ─────────────────────────────────────────────────────────
function ensureLoaderHidden() {
  try {
    const loader = document.getElementById('page-loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(function () {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 650);
    }
  } catch (e) { /* silent */ }
}
function hideLoader() { ensureLoaderHidden(); }

// ─── Product detail modal ────────────────────────────────────────────────
let modalCurrentProduct = null;

function getProductImages(p) {
  if (Array.isArray(p.images) && p.images.length > 0) return p.images;
  if (Array.isArray(p.image_url) && p.image_url.length > 0) return p.image_url;
  const raw = typeof p.image_url === 'string' ? p.image_url : '';
  if (!raw) return [''];
  if (raw.startsWith('/')) return [raw];
  const base = raw.split('?')[0];
  return [raw, base + '?w=400&q=75&crop=entropy', base + '?w=400&q=70&fit=crop'];
}

function openProductModal(productId) {
  const p = products.find(x => x.id === productId);
  if (!p) return;
  modalCurrentProduct = p;

  const modal      = document.getElementById('product-modal');
  const imgs       = getProductImages(p);
  const brandClass = getBrandClass(p.brand);

  const bcCat = document.getElementById('modal-bc-cat');
  if (bcCat) {
    bcCat.textContent = p.category;
    bcCat.onclick     = () => { closeProductModal(); filterByCategory(p.category); };
  }
  const bcSub   = document.getElementById('modal-bc-sub');
  const bcTitle = document.getElementById('modal-bc-title');
  if (bcSub)   bcSub.textContent   = p.subcategory;
  if (bcTitle) bcTitle.textContent = p.title;

  const brandTag = document.getElementById('modal-brand-tag');
  if (brandTag) {
    brandTag.textContent  = p.brand;
    brandTag.className    = 'modal-brand-tag ' + brandClass;
    brandTag.style.color  = p.brand === 'Stanley' ? '#1a1a1a' : '#fff';
  }

  const titleEl = document.getElementById('modal-product-title');
  if (titleEl) titleEl.textContent = p.title;
  const skuEl = document.getElementById('modal-sku');
  if (skuEl) skuEl.textContent = `Réf. ${p.ref || 'VT-' + String(p.id).padStart(4, '0')} · ${p.subcategory}`;

  const priceEl = document.getElementById('modal-price');
  if (priceEl) priceEl.textContent = p.price_MAD.toLocaleString('fr-MA');

  const stockEl = document.getElementById('modal-stock');
  if (stockEl) {
    if (p.in_stock) {
      stockEl.textContent  = 'EN STOCK';
      stockEl.style.cssText= 'font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding:4px 12px;border-radius:20px;width:fit-content;background:#D4EDDA;color:#155724;';
    } else {
      stockEl.textContent  = 'RUPTURE DE STOCK';
      stockEl.style.cssText= 'font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding:4px 12px;border-radius:20px;width:fit-content;background:#F8D7DA;color:#721C24;';
    }
  }

  const descEl = document.getElementById('modal-desc');
  if (descEl) descEl.textContent = p.description_fr;

  const mainImg = document.getElementById('modal-main-img');
  if (mainImg) {
    mainImg.src   = imgs[0];
    mainImg.alt   = p.title;
    mainImg.style.transform       = '';
    mainImg.style.transformOrigin = '0 0';
  }

  const thumbsEl = document.getElementById('modal-thumbs');
  if (thumbsEl) {
    if (imgs.length > 1) {
      thumbsEl.style.display = 'flex';
      thumbsEl.innerHTML = imgs.map((url, idx) => `
        <div class="modal-thumb ${idx === 0 ? 'active' : ''}" onclick="switchModalImage('${url}', this)">
          <img src="${url}" alt="${p.title} vue ${idx + 1}"
               onerror="this.parentElement.style.display='none'" loading="lazy" />
        </div>`).join('');
    } else {
      thumbsEl.style.display = 'none';
      thumbsEl.innerHTML     = '';
    }
  }

  if (typeof renderSpecsTabs === 'function') renderSpecsTabs(p);
  if (typeof renderVariants  === 'function') renderVariants(p);

  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(initImageZoom);
  }
}

function switchModalImage(url, thumbEl) {
  const mainImg = document.getElementById('modal-main-img');
  if (mainImg) {
    mainImg.src   = url;
    mainImg.style.transform = '';
  }
  document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
  requestAnimationFrame(initImageZoom);
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
  modalCurrentProduct = null;
}

// ─── Image zoom ──────────────────────────────────────────────────────────
function initImageZoom() {
  const container = document.getElementById('zoom-container');
  const img  = document.getElementById('modal-main-img');
  const lens = document.getElementById('zoom-lens');
  if (!container || !img || !lens) return;

  const fresh = container.cloneNode(true);
  container.parentNode.replaceChild(fresh, container);

  const c    = document.getElementById('zoom-container');
  const i    = document.getElementById('modal-main-img');
  const l    = document.getElementById('zoom-lens');
  const ZOOM = 2.5;

  function onMove(e) {
    e.preventDefault();
    const rect    = c.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(clientY - rect.top,  rect.height));
    l.style.left = x + 'px';
    l.style.top  = y + 'px';
    i.style.transformOrigin = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
    i.style.transform       = `scale(${ZOOM})`;
  }
  function onLeave() { l.style.display = 'none'; i.style.transform = ''; i.style.transformOrigin = '0 0'; }
  function onEnter() { l.style.display = 'block'; }

  c.addEventListener('mousemove',  onMove);
  c.addEventListener('mouseleave', onLeave);
  c.addEventListener('mouseenter', onEnter);
}

// ─── WhatsApp from modal ─────────────────────────────────────────────────
function modalSendWhatsApp() {
  if (!modalCurrentProduct) return;
  var p   = modalCurrentProduct;
  var ref = p.ref || 'VT-' + String(p.id).padStart(4, '0');
  var msg = encodeURIComponent(
    'Bonjour Verona Tools,\n\nJe souhaite avoir plus d\'informations sur le produit suivant :\n\n' +
    '*' + p.title + '*\n' +
    'Prix affiché : ' + p.price_MAD.toLocaleString('fr-MA') + ' MAD\n' +
    'Réf. : ' + ref + '\n\n' +
    'Merci de me contacter dès que possible.'
  );
  window.open('https://wa.me/212600960924?text=' + msg, '_blank');
}

// ─── Keyboard shortcuts ──────────────────────────────────────────────────
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('product-modal');
    if (modal && modal.classList.contains('open')) { closeProductModal(); return; }
    const nav = document.getElementById('mobile-nav');
    if (nav && nav.classList.contains('open')) toggleMobileNav();
  }
});

// ─── Initialisation ──────────────────────────────────────────────────────
try { renderCategorySections(); } catch (e) { console.error('renderCategorySections:', e); }
try { applyTranslations(); }      catch (e) { /* silent */ }
try { startHeroSlider(); }        catch (e) { /* silent */ }

try {
  document.querySelectorAll('.pill-btn').forEach(function (btn) {
    var match = (btn.getAttribute('onclick') || '').match(/scrollToCategory\('([^']+)'\)/);
    if (match) btn.setAttribute('data-cat', match[1]);
  });
} catch (e) { /* silent */ }

setTimeout(ensureLoaderHidden, 800);
window.addEventListener('load', function () { setTimeout(ensureLoaderHidden, 400); });
