/**
 * VERONA TOOLS - Unified Product Card Renderer
 * This version fixes the duplicate tags and variable mismatches.
 */
function renderProductCard(p, i) {
  // 1. Logic & Safety Checks
  const brandClass    = getBrandClass(p.brand);
  const stockLabel    = p.in_stock ? t('in_stock') : t('out_of_stock');
  const stockBadgeCls = p.in_stock ? 'stock-in' : 'stock-out';
  
  // Use images array (from your scripts) with a fallback
  const imgSrc = (Array.isArray(p.images) && p.images.length > 0) 
    ? p.images[0] 
    : 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80';

  const isNew = (typeof maxIds !== 'undefined') ? maxIds.includes(p.id) : false;
  const delay = `animation-delay:${i * 0.04}s`;

  // 2. Price Logic: Handle 0 MAD (Price on request)
  const displayPrice = (Number.isFinite(p.price_MAD) && p.price_MAD > 0)
    ? `${p.price_MAD.toLocaleString('fr-MA')} <span class="text-sm font-semibold text-slate-400 ml-1">MAD</span>`
    : '<span class="text-sm font-bold text-primary">Prix sur demande</span>';

  const thumbCount = Array.isArray(p.images) ? p.images.length : 0;

  // 3. The Cleaned HTML Template
  return `
    <article class="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col fade-in" style="${delay}">
      
      <div class="product-card-media relative bg-gray-50 overflow-hidden cursor-pointer" style="padding-top:75%;" onclick="openProductModal(${p.id})">
        <img
          src="${imgSrc}"
          alt="${p.title}"
          loading="lazy"
          class="product-img absolute inset-0 w-full h-full object-contain p-4"
          onerror="this.src='https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80'"
        />
        
        <div class="absolute top-2 left-2 right-2 flex justify-between items-start">
          <span class="${brandClass} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm"
                style="${p.brand === 'Stanley' ? 'background:#FFD700; color:#1a1a1a;' : ''}">
            ${p.brand}
          </span>
          <span class="bg-white/90 backdrop-blur-sm text-[9px] px-2 py-0.5 rounded-full font-bold text-navy shadow-sm">
            ${p.subcategory || p.category}
          </span>
        </div>

        ${isNew ? '<span class="badge-new absolute top-10 left-2">Nouveau</span>' : ''}
        ${thumbCount > 1 ? `<span class="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded">${thumbCount} vues</span>` : ''}

        <div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200 bg-navy/5">
          <span class="bg-white text-navy text-[11px] font-extrabold px-4 py-2 rounded-full shadow-lg transform translate-y-2 hover:translate-y-0 transition-transform">
            Voir Produit
          </span>
        </div>
      </div>

      <div class="product-card-body p-4 flex flex-col flex-1">
        <div class="mb-2">
          <p class="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">${p.category}</p>
          <h3 class="text-[14px] font-bold text-navy leading-snug line-clamp-2 min-h-[40px] cursor-pointer hover:text-primary transition-colors"
              onclick="openProductModal(${p.id})">
            ${p.title}
          </h3>
        </div>

        <p class="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">${p.description_fr || ''}</p>
        
        <div class="flex justify-between items-center mb-4">
          <span class="text-[10px] text-gray-400 font-mono">REF: ${p.ref || 'VT-' + String(p.id).slice(-6)}</span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${stockBadgeCls}">${stockLabel}</span>
        </div>

        <div class="mt-auto pt-3 border-t border-gray-50">
          <div class="flex items-end justify-between gap-2 mb-3">
            <div class="product-card-price">
              <span class="text-[9px] text-gray-400 font-bold uppercase block mb-1">Tarif HT</span>
              <div class="price-tag text-[20px] font-black text-navy leading-none">
                ${displayPrice}
              </div>
            </div>
            <button onclick="openProductModal(${p.id})" class="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors">
              <svg class="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
          </div>
          
          <button onclick="openProductModal(${p.id})" 
                  class="w-full bg-primary hover:bg-primary-dark text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2">
            Consulter la fiche
          </button>
        </div>
      </div>
    </article>`;
}
