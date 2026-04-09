/**
 * ============================================================
 *  VERONA TOOLS — Catalogue · Quincaillerie
 * ============================================================
 *  Ajoutez vos produits Quincaillerie dans ce tableau.
 *
 *  Sous-catégories suggérées :
 *    "Serrures & Sécurité"     "Visserie & Boulonnerie"
 *    "Fixations & Chevilles"   "Charnières & Pentures"
 *    "Profilés & Cornières"    "Grillages & Filets"
 *
 *  Marques courantes : Tolsen, Wokin, Stanley, Ingco, Vachette
 * ============================================================
 */

'use strict';

window.VT_PRODUCTS = (window.VT_PRODUCTS || []).concat([

  // ── Serrure Wokin ────────────────────────────────────────
  {
    id          : 7,
    category    : 'Quincaillerie',
    subcategory : 'Serrures & Sécurité',
    brand       : 'Wokin',
    title       : 'Serrure encastrée 3 points — Anti-effraction',
    description_fr: 'Serrure encastrée multipoints 3 pênes. Entrée canon. Protection anti-effraction. Corps acier. Certifiée A2P.',
    price_MAD   : 680,
    image_url   : 'https://images.unsplash.com/photo-1558002038-1055e2dae1d7?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0007',
  },

  // ── Coffret visserie Tolsen ──────────────────────────────
  {
    id          : 8,
    category    : 'Quincaillerie',
    subcategory : 'Visserie & Boulonnerie',
    brand       : 'Tolsen',
    title       : 'Coffret assortiment visserie 300 pièces Tolsen',
    description_fr: 'Kit visserie 300 pièces : vis, boulons, rondelles, écrous, chevilles. Rangement plastique avec couvercle. Acier zingué.',
    price_MAD   : 135,
    image_url   : 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0008',
  },

  // ── Ajoutez vos produits Quincaillerie ici ───────────────
  // {
  //   id          : 23,
  //   category    : 'Quincaillerie',
  //   subcategory : 'Fixations & Chevilles',
  //   brand       : 'Tolsen',
  //   title       : 'Cheville universelle nylon 8×40mm (100 pcs)',
  //   description_fr: 'Chevilles universelles nylon 8×40mm pour béton, brique, parpaing. Lot de 100 pièces. Charge max 40kg.',
  //   price_MAD   : 28,
  //   image_url   : 'https://images.unsplash.com/photo-XXXXX?w=400&q=80',
  //   in_stock    : true,
  //   ref         : 'VT-0023',
  // },

]);
