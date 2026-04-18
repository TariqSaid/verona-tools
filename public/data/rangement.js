/**
 * ============================================================
 *  VERONA TOOLS — Catalogue · Rangement & Organisation
 * ============================================================
 *  Ajoutez vos produits Rangement & Organisation dans ce tableau.
 *
 *  Sous-catégories suggérées :
 *    "Servantes & Chariots"    "Boites & Coffrets"
 *    "Étagères d'atelier"      "Armoires métalliques"
 *    "Bacs à bec"              "Tableaux d'outils"
 *    "Housses & Sacoches"      "Établis"
 *
 *  Marques courantes : Ingco, Stanley, Facom, Beta, Würth
 * ============================================================
 */

'use strict';

window.VT_PRODUCTS = (window.VT_PRODUCTS || []).concat([

  // Ajoutez vos produits Rangement & Organisation ici

  
 {
    id          : 1776472001,
    category    : 'Rangement & Organisation',
    subcategory : 'Organiseurs de tiroir',
    brand       : 'Generic',
    title       : 'Organiseur de Tiroir Marbré',
    description_fr: "Organiseur de tiroir en plastique ABS avec finition marbrée dorée. Plusieurs tailles disponibles.",
    price_MAD   : 189,
    in_stock    : true,
    ref         : 'VT-ORG-001',
    images      : ['/images/products/organizer-gold-1.png'],
    specs       : null,
    variants    : {
      sizes: [
        { label: '47 x 49', width: 47, depth: 49, slots: 8, price_MAD: 189, ref: 'D01' },
        { label: '55 x 49', width: 55, depth: 49, slots: 10, price_MAD: 219, ref: 'F01' },
        { label: '62 x 49', width: 62, depth: 49, slots: 12, price_MAD: 249, ref: 'G01' },
        { label: '75 x 49', width: 75, depth: 49, slots: 16, price_MAD: 329, ref: 'NCR811' }
      ],
      colors: [
        { name: 'Or marbré', hex: '#c4a882' },
        { name: 'Blanc pur', hex: '#f0f0f0' },
        { name: 'Noir mat', hex: '#2a2a2a' },
        { name: 'Gris perle', hex: '#b0b0b0' }
      ]
    },
  },
]);
