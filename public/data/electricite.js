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

  // Ajoutez vos produits Électricité ici

  {
  "id": 1776462100620,
  "category": "Electricite",
  "subcategory": "Accessoires et Plaques Électriques",
  "brand": "Generic/Standard",
  "title": "Plaques de Recouvrement de Boîtier Électrique Ovale",
  "description_fr": "Ensemble de trois plaques de recouvrement pour boîtiers électriques de forme ovale, disponibles en finitions chrome, caoutchouc noir et acier galvanisé. Ces plaques sont conçues pour couvrir et protéger les installations électriques encastrées ou en saillie. Elles permettent une finition professionnelle et sécurisée de vos installations électriques. Compatible avec les boîtiers électriques standards de dimensions ovales.",
  "price_MAD": 45,
  "images": [
    "/images/products/oval-electrical-outlet-box-cover-plates-1-096016.png",
    "/images/products/oval-electrical-outlet-box-cover-plates-2-096016.png"
  ],
  "in_stock": true,
  "ref": "VT-AUTO-1776462100620",
  "specs": {
    "highlight1_label": "Forme",
    "highlight1_value": "Ovale",
    "highlight2_label": "Nombre de pièces",
    "highlight2_value": "3",
    "highlight3_label": "Matériaux",
    "highlight3_value": "Chrome, Caoutchouc, Acier galvanisé",
    "details": [
      {
        "label": "Trous de montage",
        "value": "2-4 trous selon modèle"
      },
      {
        "label": "Diamètre approximatif",
        "value": "60 x 100 mm"
      },
      {
        "label": "Épaisseur",
        "value": "5-8 mm"
      },
      {
        "label": "Type d'installation",
        "value": "Encastrée ou en saillie"
      },
      {
        "label": "Finitions disponibles",
        "value": "Chrome, Noir, Galvanisé"
      },
      {
        "label": "Norme",
        "value": "Conforme aux normes électriques"
      }
    ],
    "compatibles": [
      "Boîtiers électriques ovales standards",
      "Vis de montage M4-M5",
      "Joints d'étanchéité électriques",
      "Câbles électriques standards"
    ],
    "incompatibles": [
      "Boîtiers carrés ou rectangulaires - dimensions incompatibles",
      "Boîtiers ronds - formes différentes"
    ]
  }
},
]);
