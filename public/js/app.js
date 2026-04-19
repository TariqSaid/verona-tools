/**
 * ============================================================
 * VERONA TOOLS — Application Logic (FULL RESTORATION)
 * ============================================================
 */

'use strict';

// ─── Global Variables ────────────────────────────────────────────────────
let products = [];
let translations = window.VT_TRANSLATIONS || { fr: {}, en: {} };
let CATEGORY_CONFIG = window.VT_CATEGORY_CONFIG || [];
let maxIds = [];

// ─── Application state ───────────────────────────────────────────────────
let currentLang     = 'fr';
let activeSearch    = '';
let activeBrand     = '';
let currentCategory = null; 

// ─── INITIALIZATION LOGIC (The Fix) ──────────────────────────────────────
function initApp() {
  // Merge all categories from VT_CATALOG into the products list
  const catalog = window.VT_CATALOG || {};
  const mergedProducts = Object.values(catalog).flat();
  
  // Use merged products, or fallback to the old VT_PRODUCTS array
  products = mergedProducts.length > 0 ? mergedProducts : (window.VT_PRODUCTS || []);
  
  // Update recent IDs for "Nouveau" badge
  maxIds = products.map(p => p.id).sort((a, b) => b - a).slice(0, 3);

  renderCategorySections();
  applyTranslations();
  startHeroSlider();
  ensureLoaderHidden();
}

// ─── Translation helper ──────────────────────────────────────────────────
function t(key) {
  return (translations[currentLang] || {})[key] || (translations.fr || {})[key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
}

// ─── Dark Mode & Controls ────────────────────────────────────────────────
let darkMode = localStorage.getItem('verona_dark') === 'true';
function applyDarkMode() {
  document.body.classList.toggle('dark', darkMode);
  localStorage.setItem('verona_dark', darkMode);
}
const darkToggle = document.getElementById('dark-toggle');
if (darkToggle) darkToggle.addEventListener('click', () => { darkMode = !darkMode; applyDarkMode(); });
applyDarkMode();

// ─── View Management ─────────────────────────────────────────────────────
function setView(cat) {
  currentCategory = cat || null;
  activeSearch = '';
  activeBrand = '';
  renderCategorySections();
  updateActivePill(cat || '');
}

function resetView() {
  currentCategory = null;
  activeBrand = '';
  activeSearch = '';
  renderCategorySections();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateActivePill(cat) {
  document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
  const sel = cat ? document.querySelector(`.pill-btn[data-cat="${cat}"]`) : document.querySelector('.pill-btn[data-cat=""]');
  if (sel) sel.classList.add('active');
}

// ─── Brand Class Map ─────────────────────────────────────────────────────
function getBrandClass(brand) {
  const map = {
    'Bosch': 'badge-bosch', 'Ingco': 'badge-ingco', 'Stanley': 'badge-stanley',
    'Schneider': 'badge-schneider', 'Ingelec': 'badge-ingelec', 'Legrand': 'badge-legrand',
    'Makita': 'badge-makita', 'Makule': 'badge-default'
  };
  return map[brand] || 'badge-default';
}

// ─── Renderers ───────────────────────────────────────────────────────────
function renderProductCard(p, i) {
  const brandClass = getBrandClass(p.brand);
  const stockLabel = p.in_stock ? t('in_stock') : t('out_of_stock');
  const stockBadgeCls = p.in_stock ? 'stock-in' : 'stock-out';
  const imgSrc = (p.images && p.images.length > 0) ? p.images[0] : '';
  const isNew = maxIds.includes(p.id);

  return `
    <article class="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col fade-in">
      <div class="relative bg-gray-50 overflow-hidden cursor-pointer" style="padding-top:70%;" onclick="openProductModal(${p.id})">
        <img src="${imgSrc}" alt="${p.title}" class="product-img absolute inset-0 w-full h-full object-contain p-3" onerror="this.src='https://via.placeholder.com/400'"/>
        <span class="${brandClass} absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow-sm">
          ${p.brand}
        </span>
        ${isNew ? '<span class="badge-new">Nouveau</span>' : ''}
      </div>
      <div class="p-3.5 flex flex-col flex-1">
        <p class="text-gray-400 text-[10px] uppercase font-semibold mb-1">${p.subcategory || p.category}</p>
        <h3 class="text-sm font-bold text-navy mb-2 line-clamp-2">${p.title}</h3>
        <div class="mt-auto pt-2 border-t flex items-center justify-between">
          <span class="price-tag text-lg font-black text-navy">${p.price_MAD.toLocaleString('fr-MA')} MAD</span>
          <span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${stockBadgeCls}">${stockLabel}</span>
        </div>
      </div>
    </article>`;
}

function renderCategorySections() {
  const container = document.getElementById('category-sections');
  if (!container) return;

  const filtered = products.filter(p => {
    if (currentCategory && p.category !== currentCategory) return false;
    if (activeSearch && !`${p.title} ${p.brand}`.toLowerCase().includes(activeSearch)) return false;
    return true;
  });

  let html = '';
  if (currentCategory) {
    html = '<div class="grid grid-cols-2 md:grid-cols-4 gap-4">';
    filtered.forEach((p, i) => { html += renderProductCard(p, i); });
    html += '</div>';
  } else {
    CATEGORY_CONFIG.forEach(cfg => {
      const catProds = filtered.filter(p => p.category === cfg.name);
      if (catProds.length > 0) {
        html += `<section class="mb-8"><h2 class="font-black text-navy text-lg px-2 mb-4">${cfg.name}</h2>
                 <div class="grid grid-cols-2 md:grid-cols-4 gap-4">${catProds.map((p, i) => renderProductCard(p, i)).join('')}</div></section>`;
      }
    });
  }
  container.innerHTML = html;
}

// ─── Search Logic ────────────────────────────────────────────────────────
const searchInput = document.getElementById('search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    activeSearch = e.target.value.toLowerCase().trim();
    renderCategorySections();
  });
}

// ─── Modal & Utilities ───────────────────────────────────────────────────
function openProductModal(id) {
  const p = products.find(x => x.id === id);
  if (p) alert("Détails: " + p.title + "\n\nRéf: " + p.ref);
}

function ensureLoaderHidden() {
  const loader = document.getElementById('page-loader');
  if (loader) loader.classList.add('hidden');
}

function startHeroSlider() { /* Hero logic */ }

// ─── BOOTSTRAP ───────────────────────────────────────────────────────────
// We wait for the window to load so that all .js data files are present
window.addEventListener('load', initApp);
// Fallback if load is too slow
setTimeout(initApp, 1500);
