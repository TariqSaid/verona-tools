/**
 * ============================================================
 * VERONA TOOLS — Application Logic (COMPLETE FIX)
 * ============================================================
 */

'use strict';

// ─── Global references (Logic to merge all categories from n8n) ──────────
const catalog = window.VT_CATALOG || {};

// This ensures all products from all category files are merged into one list
const products = Object.values(catalog).flat().length > 0 
    ? Object.values(catalog).flat() 
    : (window.VT_PRODUCTS || []);

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

// ─── View switching (core navigation) ───────────────────────────────────
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

function resetView() {
  currentCategory = null;
  activeBrand     = '';
  activeSearch    = '';
  const si = document.getElementById('search-input');
  if (si) si.value = '';
  renderCategorySections();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateActivePill('');
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

// ─── Product card renderer ───────────────────────────────────────────────
function renderProductCard(p, i) {
  const brandClass    = getBrandClass(p.brand);
  const stockLabel    = p.in_stock ? t('in_stock') : t('out_of_stock');
  const stockBadgeCls = p.in_stock ? 'stock-in' : 'stock-out';
  const imgSrc        = (Array.isArray(p.images) && p.images.length > 0) ? p.images[0] : '';
  const isNew         = maxIds.includes(p.id);
  const delay         = `animation-delay:${i * 0.04}s`;

  return `
    <article class="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col fade-in" style="${delay}">
      <div class="relative bg-gray-50 overflow-hidden cursor-pointer" style="padding-top:70%;" onclick="openProductModal(${p.id})">
        <img src="${imgSrc}" alt="${p.title}" loading="lazy" class="product-img absolute inset-0 w-full h-full object-contain p-3" onerror="this.src='https://via.placeholder.com/400'"/>
        <span class="${brandClass} absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
          ${p.brand}
        </span>
        ${isNew ? '<span class="badge-new">Nouveau</span>' : ''}
      </div>
      <div class="p-3.5 flex flex-col flex-1">
        <p class="text-gray-400 text-[10px] uppercase tracking-widest font-semibold mb-1">${p.subcategory || p.category}</p>
        <h3 class="text-sm font-bold text-navy leading-tight mb-2 line-clamp-2 flex-1">${p.title}</h3>
        <p class="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">${p.description_fr}</p>
        <div class="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
          <div>
            <span class="price-tag text-xl font-black text-navy">${p.price_MAD.toLocaleString('fr-MA')}</span>
            <span class="text-xs font-bold text-gray-400 ml-1">MAD</span>
          </div>
          <span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${stockBadgeCls}">${stockLabel}</span>
        </div>
      </div>
    </article>`;
}

// ─── Main render function ────────────────────────────────────────────────
function renderCategorySections() {
  const container  = document.getElementById('category-sections');
  const emptyEl    = document.getElementById('search-empty');
  const gridSec    = document.getElementById('cat-grid-section');

  if (!container || !emptyEl) return;

  const inCatView   = !!currentCategory;
  if (gridSec) gridSec.style.display = inCatView ? 'none' : '';

  const filtered = products.filter(p => {
    if (currentCategory && p.category !== currentCategory) return false;
    if (activeBrand && p.brand !== activeBrand) return false;
    if (activeSearch) {
      const hay = `${p.title} ${p.brand} ${p.category} ${p.description_fr}`.toLowerCase();
      if (!hay.includes(activeSearch)) return false;
    }
    return true;
  });

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
      if (catProds.length > 0) {
        html += `<section class="cat-section-block mb-8 bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
          <div class="flex items-center gap-3 px-6 py-4 border-b border-gray-100" style="background:${cfg.bg};">
            <span class="text-primary">${cfg.icon}</span>
            <h2 class="font-black text-navy text-lg tracking-tight">${cfg.name}</h2>
          </div>
          <div class="p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            ${catProds.map((p, i) => renderProductCard(p, i)).join('')}
          </div>
        </section>`;
      }
    });
  }
  container.innerHTML = html;
}

// ─── Modal & UI Helpers ──────────────────────────────────────────────────
function openProductModal(productId) {
  const p = products.find(x => x.id === productId);
  if (!p) return;
  // Your original modal logic would go here
  console.log("Opening modal for:", p.title);
}

function ensureLoaderHidden() {
  const loader = document.getElementById('page-loader');
  if (loader) loader.classList.add('hidden');
}

// ─── Initialization ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderCategorySections();
    applyTranslations();
    setTimeout(ensureLoaderHidden, 500);
});

window.addEventListener('load', ensureLoaderHidden);
