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

  // ── Servante d'atelier Ingco ─────────────────────────────
  {
    id          : 16,
    category    : 'Rangement & Organisation',
    subcategory : 'Servantes & Chariots',
    brand       : 'Ingco',
    title       : 'Servante d\'atelier 7 tiroirs Ingco',
    description_fr: 'Servante d\'atelier en acier. 7 tiroirs à roulements à billes. Tiroir plat supérieur. Roulettes 360°. Serrure centrale.',
    price_MAD   : 3200,
    image_url   : 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0016',
  },

  // ── Boîte à outils Stanley ───────────────────────────────
  {
    id          : 20,
    category    : 'Rangement & Organisation',
    subcategory : 'Boites & Coffrets',
    brand       : 'Stanley',
    title       : 'Boîte à outils Stanley 19" FATMAX',
    description_fr: 'Boite à outils 19" en métal et PP. Couvercle rigide. Rangements internes modulables. Poignée confort. Fermetures métal.',
    price_MAD   : 245,
    image_url   : 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    in_stock    : true,
    ref         : 'VT-0020',
  },

  // ── Ajoutez vos produits Rangement ici ───────────────────
  // {
  //   id          : 28,
  //   category    : 'Rangement & Organisation',
  //   subcategory : 'Étagères d\'atelier',
  //   brand       : 'Ingco',
  //   title       : 'Étagère métallique 5 niveaux 200kg/niveau',
  //   description_fr: 'Étagère en acier 5 niveaux. Charge max 200kg par niveau. Dimensions 200×100×50cm. Montage sans outils. Coloris gris.',
  //   price_MAD   : 890,
  //   image_url   : 'https://images.unsplash.com/photo-XXXXX?w=400&q=80',
  //   in_stock    : true,
  //   ref         : 'VT-0028',
  // },

]);
