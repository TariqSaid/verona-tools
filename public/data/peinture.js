/**
 * ============================================================
 *  VERONA TOOLS — Catalogue · Peinture
 * ============================================================
 *  Ajoutez vos produits Peinture dans ce tableau.
 *
 *  Sous-catégories suggérées :
 *    "Peinture Acrylique"      "Peinture Epoxy"
 *    "Peinture Façade"         "Peinture Laque"
 *    "Rouleaux & Pinceaux"     "Enduits & Apprêts"
 *    "Décapants & Diluants"    "Bâches de protection"
 *
 *  Marques courantes : Tollens, Valentine, CIB Unikem, Seigneurie
 * ============================================================
 */

'use strict';

window.VT_PRODUCTS = (window.VT_PRODUCTS || []).concat([

  // ── Peinture acrylique blanche ───────────────────────────
  {
    id          : 11,
    category    : 'Peinture',
    subcategory : 'Peinture Acrylique',
    brand       : 'Tolsen',
    title       : 'Peinture acrylique blanche 10L — Murs & Plafonds',
    description_fr: 'Peinture acrylique mate blanche 10L. Couvrance optimale 2 couches. Séchage 2h. Lessivable. Pour murs & plafonds intérieurs.',
    price_MAD   : 290,
    image_url   : 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0011',
  },

  // ── Kit rouleau Ingco ────────────────────────────────────
  {
    id          : 12,
    category    : 'Peinture',
    subcategory : 'Rouleaux & Pinceaux',
    brand       : 'Ingco',
    title       : 'Kit peinture Ingco 3 pièces — rouleau 25cm + plateau + manche',
    description_fr: 'Kit peinture professionnel 3 pièces. Rouleau laine 25cm, plateau plastique et manche télescopique. Compatible toutes peintures acryliques.',
    price_MAD   : 88,
    image_url   : 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0012',
  },

  // ── Ajoutez vos produits Peinture ici ────────────────────
  // {
  //   id          : 24,
  //   category    : 'Peinture',
  //   subcategory : 'Peinture Façade',
  //   brand       : 'Tollens',
  //   title       : 'Peinture façade hydrofuge 15L — Blanc Cassé',
  //   description_fr: 'Peinture façade hydrofuge. Résistante aux intempéries. Couvrance 10m²/L. Séchage 4h. Anti-mousse intégré.',
  //   price_MAD   : 520,
  //   image_url   : 'https://images.unsplash.com/photo-XXXXX?w=400&q=80',
  //   in_stock    : true,
  //   ref         : 'VT-0024',
  // },

  {
    id          : 1776015601032,
    category    : 'Peinture',
    subcategory : 'Peintures Décoratives',
    brand       : 'Atlas',
    title       : 'Peinture Décorative Khayat Atlas Blanc',
    description_fr: 'Peinture décorative de couleur blanche de la gamme Khayat pour la finition des murs intérieurs.',
    price_MAD   : 0,
    in_stock    : true,
    ref         : 'VT-AUTO-1032',
    images      : [
      '/images/products/atlas-khayat-decorative-paint-white-1.png',
      '/images/products/atlas-khayat-decorative-paint-white-2.png'
    ],
  },
  {
    id          : 1776023449799,
    category    : 'Peinture',
    subcategory : 'Peintures & Vernis',
    brand       : 'Atlas',
    title       : 'Peinture Décorative Khayat Atlas Blanc',
    description_fr: 'Peinture décorative blanche pour murs et surfaces intérieures avec finition de qualité supérieure.',
    price_MAD   : 0,
    in_stock    : true,
    ref         : 'VT-AUTO-9799',
    images      : [
      '/images/products/atlas-khayat-decorative-paint-white-1.png',
      '/images/products/atlas-khayat-decorative-paint-white-2.png'
    ],
  },
  {
    id          : 1776024630064,
    category    : 'Peinture',
    subcategory : 'Peintures décoratives',
    brand       : 'Atlas',
    title       : 'Peinture Décorative Khayat Atlas Blanc',
    description_fr: 'Peinture décorative intérieure de couleur blanche pour murs et plafonds avec design élégant de ciel étoilé.',
    price_MAD   : 0,
    in_stock    : true,
    ref         : 'VT-AUTO-0064',
    images      : [
      '/images/products/atlas-khayat-decorative-paint-white-1.png',
      '/images/products/atlas-khayat-decorative-paint-white-2.png'
    ],
  },
  {
    id          : 1776028525159,
    category    : 'Peinture',
    subcategory : 'Peintures Décoratives',
    brand       : 'Atlas Khayat',
    title       : 'Peinture Décorative Atlas Khayat Blanc',
    description_fr: 'Peinture décorative d\'intérieur en finition blanche pour applications murales et mobilières résidentielles.',
    price_MAD   : 0,
    in_stock    : true,
    ref         : 'VT-AUTO-5159',
    images      : [
      '/images/products/atlas-khayat-decorative-paint-white-1-521246.png',
      '/images/products/atlas-khayat-decorative-paint-white-2-521246.png'
    ],
  },
]);