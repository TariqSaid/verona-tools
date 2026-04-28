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

]);
