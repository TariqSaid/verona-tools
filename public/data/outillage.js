/**
 * ============================================================
 *  VERONA TOOLS — Catalogue · Outillage
 * ============================================================
 *  Ajoutez vos produits Outillage dans ce tableau.
 *
 *  Sous-catégories suggérées :
 *    "Perceuses & Visseuses"   "Meuleuses"
 *    "Tournevis & Clés"        "Scies & Découpe"
 *    "Mesure & Traçage"        "Marteaux & Masses"
 *    "Pistolets à colle"       "Ponceuses"
 *
 *  Marques courantes : Bosch, Makita, Ingco, Stanley, Tolsen, Wokin
 * ============================================================
 */

'use strict';

window.VT_PRODUCTS = (window.VT_PRODUCTS || []).concat([

  // ── Perceuse Bosch ───────────────────────────────────────
  {
    id          : 1,
    category    : 'Outillage',
    subcategory : 'Perceuses & Visseuses',
    brand       : 'Bosch',
    title       : 'Perceuse visseuse Bosch GSR 12V-15',
    description_fr: 'Perceuse-visseuse sans fil compacte 12V. Couple max 30 Nm. Mandrin 10mm. Idéale pour travaux intérieurs.',
    price_MAD   : 890,
    image_url   : 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0001',
  },

  // ── Meuleuse Ingco ───────────────────────────────────────
  {
    id          : 2,
    category    : 'Outillage',
    subcategory : 'Meuleuses',
    brand       : 'Ingco',
    title       : 'Meuleuse angulaire Ingco 125mm 850W',
    description_fr: 'Meuleuse d\'angle 125mm, moteur 850W, 11000 tr/min. Protection anti-recul. Idéale pour la coupe et le ponçage.',
    price_MAD   : 320,
    image_url   : 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0002',
  },

  // ── Tournevis Stanley ────────────────────────────────────
  {
    id          : 3,
    category    : 'Outillage',
    subcategory : 'Tournevis & Clés',
    brand       : 'Stanley',
    title       : 'Jeu de tournevis Stanley 10 pièces',
    description_fr: 'Set de 10 tournevis professionnels. Manches bi-matière anti-dérapants. Pointes Phillips et plat. Résistants aux chocs.',
    price_MAD   : 185,
    image_url   : 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0003',
  },

  // ── Clé à molette Wokin ──────────────────────────────────
  {
    id          : 9,
    category    : 'Outillage',
    subcategory : 'Tournevis & Clés',
    brand       : 'Wokin',
    title       : 'Clé à molette Wokin 250mm',
    description_fr: 'Clé à molette réglable 250mm. Corps acier chromé. Ouverture max 30mm. Manche ergonomique. Usage professionnel.',
    price_MAD   : 65,
    image_url   : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0009',
  },

  // ── Mètre ruban Stanley ──────────────────────────────────
  {
    id          : 13,
    category    : 'Outillage',
    subcategory : 'Mesure & Traçage',
    brand       : 'Stanley',
    title       : 'Mètre ruban Stanley FatMax 5m',
    description_fr: 'Mètre ruban 5m×25mm. Lame Mylar renforcée. Crochet magnétique. Boîtier bi-matière. Blocage automatique.',
    price_MAD   : 95,
    image_url   : 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0013',
  },

  // ── Scie circulaire Makita ───────────────────────────────
  {
    id          : 14,
    category    : 'Outillage',
    subcategory : 'Scies & Découpe',
    brand       : 'Makita',
    title       : 'Scie circulaire Makita 5007MGA 185mm',
    description_fr: 'Scie circulaire filaire 1800W. Disque 185mm. Profondeur de coupe 66mm. Semelle aluminium. Inclinaison 0-56°.',
    price_MAD   : 1850,
    image_url   : 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0014',
  },

  // ── Ajoutez vos produits Outillage ici ───────────────────
  // {
  //   id          : 22,
  //   category    : 'Outillage',
  //   subcategory : 'Ponceuses',
  //   brand       : 'Bosch',
  //   title       : 'Ponceuse excentrique Bosch GEX 125-1 AE',
  //   description_fr: 'Ponceuse excentrique 250W. Plateau 125mm. Vitesse variable. Microfiltre intégré. Livraison rapide.',
  //   price_MAD   : 750,
  //   image_url   : 'https://images.unsplash.com/photo-XXXXX?w=400&q=80',
  //   in_stock    : true,
  //   ref         : 'VT-0022',
  // },

]);
