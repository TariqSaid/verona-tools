/**
 * ============================================================
 *  VERONA TOOLS — Configuration Globale
 * ============================================================
 *  Ce fichier contient :
 *    - Les traductions FR / EN (translations)
 *    - La configuration des 9 catégories (CATEGORY_CONFIG)
 *
 *  Pour ajouter une nouvelle catégorie :
 *    1. Ajoutez une entrée dans CATEGORY_CONFIG ci-dessous
 *    2. Créez un fichier data/nomcategorie.js
 *    3. Référencez-le dans index.html avant app.js
 * ============================================================
 */

'use strict';

// ─── TRANSLATIONS (FR / EN) ──────────────────────────────────
window.VT_TRANSLATIONS = {
  fr: {
    search_placeholder : 'Rechercher un produit, une marque...',
    categories         : 'Catégories',
    see_catalog        : 'Voir le Catalogue',
    request_quote      : 'Demander un Devis',
    shop_by_cat        : 'Parcourir par Catégorie',
    our_products       : 'Nos Produits',
    all                : 'Tout voir',
    category           : 'Catégorie',
    brand              : 'Marque',
    price_range        : 'Gamme de Prix (MAD)',
    in_stock_only      : 'En stock',
    reset              : 'Tout voir',
    load_more          : 'Charger Plus',
    view_product       : 'Voir Produit',
    in_stock           : 'En Stock',
    out_of_stock       : 'Rupture',
    products_found     : 'produits',
  },
  en: {
    search_placeholder : 'Search a product, a brand...',
    categories         : 'Categories',
    see_catalog        : 'View Catalog',
    request_quote      : 'Request a Quote',
    shop_by_cat        : 'Shop by Category',
    our_products       : 'Our Products',
    all                : 'View All',
    category           : 'Category',
    brand              : 'Brand',
    price_range        : 'Price Range (MAD)',
    in_stock_only      : 'In stock',
    reset              : 'View All',
    load_more          : 'Load More',
    view_product       : 'View Product',
    in_stock           : 'In Stock',
    out_of_stock       : 'Out of Stock',
    products_found     : 'products',
  }
};

// ─── CATEGORY CONFIGURATION ──────────────────────────────────
//  name    : must exactly match the "category" field in product data files
//  icon    : inline SVG string
//  bg      : light background colour for the section header
window.VT_CATEGORY_CONFIG = [
  {
    name: 'Électricité',
    bg: '#EFF6FF',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>'
  },
  {
    name: 'Outillage',
    bg: '#FEF2F2',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>'
  },
  {
    name: 'Quincaillerie',
    bg: '#F0FDF4',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/></svg>'
  },
  {
    name: 'Peinture',
    bg: '#FFF7ED',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M2 13.5V20a2 2 0 002 2h16a2 2 0 002-2v-6.5"/><path d="M12 2v13"/><path d="M8 6l4-4 4 4"/></svg>'
  },
  {
    name: 'Luminaire',
    bg: '#FEFCE8',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 006 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/></svg>'
  },
  {
    name: 'Droguerie',
    bg: '#F5F3FF',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 11-4 0"/></svg>'
  },
  {
    name: 'Échelles & Travaux en Hauteur',
    bg: '#FEF2F2',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="18" x2="16" y2="18"/><line x1="6" y1="3" x2="6" y2="21"/><line x1="18" y1="3" x2="18" y2="21"/></svg>'
  },
  {
    name: 'Rangement & Organisation',
    bg: '#F0F9FF',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>'
  },
  {
    name: 'Jardinage & Plein Air',
    bg: '#F0FDF4',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M12 22V12M12 12C12 7 7 3 2 3c0 5 4 9 10 9M12 12c0-5 5-9 10-9-1 5-5 9-10 9"/></svg>'
  },
];
