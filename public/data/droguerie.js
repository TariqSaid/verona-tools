/**
 * ============================================================
 *  VERONA TOOLS — Catalogue · Droguerie
 * ============================================================
 *  Ajoutez vos produits Droguerie dans ce tableau.
 *
 *  Sous-catégories suggérées :
 *    "Colles & Mastics"        "Silicones"
 *    "Produits d'entretien"    "Dégraissants"
 *    "Imperméabilisants"       "Antirouille & Primaires"
 *    "Résines & Époxy"         "Plâtres & Mortiers"
 *
 *  Marques courantes : Sika, Mapei, Bostik, Tangit, Rubson
 * ============================================================
 */

'use strict';

window.VT_PRODUCTS = (window.VT_PRODUCTS || []).concat([

  // ── Colle silicone Tolsen ────────────────────────────────
  {
    id          : 17,
    category    : 'Droguerie',
    subcategory : 'Colles & Mastics',
    brand       : 'Tolsen',
    title       : 'Colle silicone transparente 280ml',
    description_fr: 'Mastic silicone neutre transparent 280ml. Adhérence verre, métal, céramique, PVC. Résistant eau et UV. -40°C à +200°C.',
    price_MAD   : 35,
    image_url   : 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0017',
  },

  // ── Ajoutez vos produits Droguerie ici ───────────────────
  // {
  //   id          : 26,
  //   category    : 'Droguerie',
  //   subcategory : 'Imperméabilisants',
  //   brand       : 'Sika',
  //   title       : 'Imperméabilisant toiture Sika 5L',
  //   description_fr: 'Imperméabilisant élastomère pour toitures terrasses. Couvrance 1L/m². Résistant UV. Couleur gris clair.',
  //   price_MAD   : 310,
  //   image_url   : 'https://images.unsplash.com/photo-XXXXX?w=400&q=80',
  //   in_stock    : true,
  //   ref         : 'VT-0026',
  // },

]);
