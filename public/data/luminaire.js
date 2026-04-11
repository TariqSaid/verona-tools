/**
 * ============================================================
 *  VERONA TOOLS — Catalogue · Luminaire
 * ============================================================
 *  Ajoutez vos produits Luminaire dans ce tableau.
 *
 *  Sous-catégories suggérées :
 *    "Spots LED"               "Ampoules & Tubes"
 *    "Appliques Murales"       "Suspensions & Plafonniers"
 *    "Réglettes & Néons"       "Projecteurs Extérieurs"
 *    "Rubans LED"              "Détecteurs de présence"
 *
 *  Marques courantes : Legrand, Philips, Osram, Ingelec, GE
 * ============================================================
 */

'use strict';

window.VT_PRODUCTS = (window.VT_PRODUCTS || []).concat([

  // ── Spot LED encastrable ─────────────────────────────────
  {
    id          : 10,
    category    : 'Luminaire',
    subcategory : 'Spots LED',
    brand       : 'Legrand',
    title       : 'Spot LED encastrable 7W blanc neutre',
    description_fr: 'Spot LED encastrable 7W 4000K. Flux lumineux 630lm. IP44. Finition blanc. Angle 38°. Driver inclus. Ø68-75mm.',
    price_MAD   : 48,
    image_url   : 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0010',
  },

  // ── Ampoule LED E27 ──────────────────────────────────────
  {
    id          : 19,
    category    : 'Luminaire',
    subcategory : 'Ampoules & Tubes',
    brand       : 'Legrand',
    title       : 'Ampoule LED E27 12W Legrand 1055lm',
    description_fr: 'Ampoule LED E27 12W. Équivalent 75W. Flux 1055lm. Couleur 4000K blanc neutre. Durée de vie 15000h. 230V.',
    price_MAD   : 28,
    image_url   : 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0019',
  },

  // ── Ajoutez vos produits Luminaire ici ───────────────────
  // {
  //   id          : 25,
  //   category    : 'Luminaire',
  //   subcategory : 'Réglettes & Néons',
  //   brand       : 'Ingelec',
  //   title       : 'Réglette LED 60cm 18W 4000K Ingelec',
  //   description_fr: 'Réglette LED intégrée 60cm. Puissance 18W. Flux 1620lm. 4000K blanc neutre. IP20. Montage saillie ou câble.',
  //   price_MAD   : 65,
  //   image_url   : 'https://images.unsplash.com/photo-XXXXX?w=400&q=80',
  //   in_stock    : true,
  //   ref         : 'VT-0025',
  // },

]);
