/**
 * ============================================================
 *  VERONA TOOLS — Catalogue · Électricité
 * ============================================================
 *  Ajoutez vos produits Électricité dans ce tableau.
 *  Copiez un bloc { ... } existant, modifiez les champs,
 *  puis sauvegardez — le site se met à jour automatiquement.
 *
 *  Sous-catégories suggérées :
 *    "Câbles & Fils"           "Disjoncteurs & Coffrets"
 *    "Interrupteurs & Prises"  "Tableaux Électriques"
 *    "Gaines & Conduits"       "Éclairage Technique"
 *
 *  Marques courantes : Schneider, Legrand, Ingelec, Hager, ABB
 *
 *  Champs obligatoires :
 *    id           Number   — Identifiant unique sur tout le catalogue
 *    category     String   — Doit être exactement "Électricité"
 *    subcategory  String   — Voir suggestions ci-dessus
 *    brand        String   — Marque du produit
 *    title        String   — Nom complet affiché sur la fiche
 *    description_fr String — Description courte (2-3 phrases)
 *    price_MAD    Number   — Prix en Dirhams (sans symbole)
 *    image_url    String   — URL image (Unsplash, chemin local, etc.)
 *    in_stock     Boolean  — true = disponible · false = rupture
 *    ref          String   — Référence interne (ex: "VT-0004")
 * ============================================================
 */

'use strict';

window.VT_PRODUCTS = (window.VT_PRODUCTS || []).concat([

  // ── Câble Ingelec ────────────────────────────────────────
  {
    id          : 4,
    category    : 'Électricité',
    subcategory : 'Câbles & Fils',
    brand       : 'Ingelec',
    title       : 'Câble rigide H07V-U 1.5mm² Ingelec 100m',
    description_fr: 'Câble rigide isolé PVC 1.5mm² rouge. Bobine 100m. Conforme NM CEI 60227. Usage intérieur. Normes Ingelec Maroc.',
    price_MAD   : 195,
    image_url   : 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0004',
  },

  // ── Disjoncteur Schneider ────────────────────────────────
  {
    id          : 5,
    category    : 'Électricité',
    subcategory : 'Disjoncteurs & Coffrets',
    brand       : 'Schneider',
    title       : 'Disjoncteur Schneider iC60N 16A',
    description_fr: 'Disjoncteur modulaire 1P+N 16A, courbe C. Pouvoir de coupure 6kA. Gamme Acti9 Schneider Electric.',
    price_MAD   : 78,
    image_url   : 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0005',
  },

  // ── Interrupteur Legrand ─────────────────────────────────
  {
    id          : 6,
    category    : 'Électricité',
    subcategory : 'Interrupteurs & Prises',
    brand       : 'Legrand',
    title       : 'Interrupteur double Legrand Mosaic',
    description_fr: 'Interrupteur double va-et-vient Legrand Mosaic. Finition blanc. 10A 250V. Montage 45×45mm.',
    price_MAD   : 55,
    image_url   : 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0006',
  },

  // ── Ajoutez vos produits Électricité ici ─────────────────
  // {
  //   id          : 21,
  //   category    : 'Électricité',
  //   subcategory : 'Tableaux Électriques',
  //   brand       : 'Schneider',
  //   title       : 'Coffret 13 modules avec porte Schneider',
  //   description_fr: 'Coffret électrique encastré 13 modules. Porte transparente. Livré avec peigne de câblage.',
  //   price_MAD   : 145,
  //   image_url   : 'https://images.unsplash.com/photo-XXXXX?w=400&q=80',
  //   in_stock    : true,
  //   ref         : 'VT-0021',
  // },

]);
