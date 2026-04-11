import { readFileSync } from 'fs'
import { join } from 'path'
import { createContext, Script } from 'vm'

/* ─────────────────────────── Types ──────────────────────────── */

interface Product {
  id: string
  category: string
  subcategory: string
  brand: string
  title: string
  description: string
  price: number
  imageUrl: string
  images: string[]
  inStock: boolean
  ref: string
}

/* ────────────────────────── Parsers ─────────────────────────── */

/**
 * Files that use:  window.VT_PRODUCTS = (window.VT_PRODUCTS || []).concat([...]);
 * The array values are JS syntax (unquoted keys, single-quoted strings, comments)
 * so we evaluate them with vm rather than JSON.parse.
 */
function loadVTFile(filename: string): Product[] {
  try {
    const src = readFileSync(join(process.cwd(), 'public', 'data', filename), 'utf-8')
    const collected: Record<string, unknown>[] = []
    const sandbox = {
      window: {
        VT_PRODUCTS: {
          concat(items: Record<string, unknown>[]) {
            collected.push(...items)
            return this
          },
        },
      },
    }
    new Script(src).runInContext(createContext(sandbox))
    return collected.map(normaliseVT)
  } catch {
    return []
  }
}

/**
 * quincaillerie.js uses:  const quincaillerie = [...];
 * Its values are strict JSON so we extract with regex and use JSON.parse.
 */
function loadQuincaillerie(): Product[] {
  try {
    const src = readFileSync(
      join(process.cwd(), 'public', 'data', 'quincaillerie.js'),
      'utf-8',
    )
    const match = src.match(/\[[\s\S]*\]/)
    if (!match) return []
    const raw: Array<{
      name?: string
      nameFr?: string
      description?: string
      images?: string[]
      family?: string
      category?: string
    }> = JSON.parse(match[0])
    return raw
      .filter(p => p.images && p.images.length > 0)
      .map((p, i) => ({
        id: `quinc-${i}`,
        category: 'Quincaillerie',
        subcategory: p.family ?? p.category ?? 'Général',
        brand: '',
        title: p.nameFr ?? p.name ?? '',
        description: p.description ?? '',
        price: 0,
        imageUrl: '',
        images: p.images!,
        inStock: true,
        ref: '',
      }))
  } catch {
    return []
  }
}

function normaliseVT(p: Record<string, unknown>): Product {
  return {
    id: String(p.id ?? Math.random()),
    category: String(p.category ?? ''),
    subcategory: String(p.subcategory ?? ''),
    brand: String(p.brand ?? ''),
    title: String(p.title ?? p.name ?? ''),
    description: String(p.description_fr ?? p.description ?? ''),
    price: Number(p.price_MAD ?? 0),
    imageUrl: String(p.image_url ?? ''),
    images: [],
    inStock: Boolean(p.in_stock ?? true),
    ref: String(p.ref ?? ''),
  }
}

function getAllProducts(): Product[] {
  const vtFiles = [
    'outillage.js',
    'electricite.js',
    'droguerie.js',
    'echelles.js',
    'jardinage.js',
    'luminaire.js',
    'peinture.js',
    'rangement.js',
  ]
  return [...vtFiles.flatMap(loadVTFile), ...loadQuincaillerie()]
}

/* ─────────────────────── Category colours ───────────────────── */

const CAT_STYLE: Record<string, { pill: string; badge: string }> = {
  Outillage:                      { pill: 'bg-blue-600 text-white',        badge: 'bg-blue-100 text-blue-700'    },
  'Électricité':                  { pill: 'bg-yellow-500 text-white',      badge: 'bg-yellow-100 text-yellow-700'},
  Droguerie:                      { pill: 'bg-green-600 text-white',       badge: 'bg-green-100 text-green-700'  },
  'Échelles & Travaux en Hauteur':{ pill: 'bg-orange-500 text-white',      badge: 'bg-orange-100 text-orange-700'},
  'Jardinage & Plein Air':        { pill: 'bg-emerald-600 text-white',     badge: 'bg-emerald-100 text-emerald-700'},
  Luminaire:                      { pill: 'bg-purple-600 text-white',      badge: 'bg-purple-100 text-purple-700'},
  Peinture:                       { pill: 'bg-pink-500 text-white',        badge: 'bg-pink-100 text-pink-700'    },
  'Rangement & Organisation':     { pill: 'bg-slate-600 text-white',       badge: 'bg-slate-100 text-slate-700'  },
  Quincaillerie:                  { pill: 'bg-rose-600 text-white',        badge: 'bg-rose-100 text-rose-700'    },
}
const DEFAULT_STYLE = { pill: 'bg-gray-600 text-white', badge: 'bg-gray-100 text-gray-700' }

/* ─────────────────────────── Page ───────────────────────────── */

export default function Page() {
  const products = getAllProducts()
  const categories = Array.from(new Set(products.map(p => p.category)))

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <header className="sticky top-0 z-20 bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Verona Tools
            </h1>
            <p className="text-amber-100 text-sm mt-0.5">
              Votre distributeur d&apos;outils industriels au Maroc
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {products.length} produits
            </span>
            <span className="text-amber-200 text-xs">
              {categories.length} catégories
            </span>
          </div>
        </div>
      </header>

      {/* ── Category filter pills ── */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto">
          {categories.map(cat => {
            const style = CAT_STYLE[cat] ?? DEFAULT_STYLE
            const count = products.filter(p => p.category === cat).length
            return (
              <span
                key={cat}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold cursor-default ${style.pill}`}
              >
                {cat}
                <span className="bg-white/25 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                  {count}
                </span>
              </span>
            )
          })}
        </div>
      </div>

      {/* ── Product sections ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {categories.map(cat => {
          const catProducts = products.filter(p => p.category === cat)
          const style = CAT_STYLE[cat] ?? DEFAULT_STYLE
          return (
            <section key={cat}>
              {/* Section heading */}
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-gray-800">{cat}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${style.pill}`}>
                  {catProducts.length}
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {catProducts.map(product => (
                  <ProductCard
                    key={product.ref || product.id}
                    product={product}
                    badgeClass={style.badge}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-gray-700">Verona Tools</p>
          <p className="text-xs text-gray-400 mt-1">
            © {new Date().getFullYear()} — Votre distributeur d&apos;outils industriels au Maroc
          </p>
        </div>
      </footer>
    </div>
  )
}

/* ──────────────────────── Product Card ──────────────────────── */

function ProductCard({
  product,
  badgeClass,
}: {
  product: Product
  badgeClass: string
}) {
  // Decide which image src to use for the hero slot
  const heroSrc = product.images.length > 0 ? product.images[0] : product.imageUrl
  const isLocal = heroSrc.startsWith('/')
  const hasHero = Boolean(heroSrc)

  // Thumbnails = remaining images beyond the first (local images only)
  const thumbs = product.images.slice(1)

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col">

      {/* Hero image — always a plain <img> for local paths; <img> for remote too (no next/image) */}
      <div className="relative w-full bg-gray-100 overflow-hidden" style={{ height: '200px' }}>
        {hasHero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroSrc}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PlaceholderIcon />
          </div>
        )}

        {/* Stock badge */}
        <span
          className={`absolute top-2 right-2 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            product.inStock
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {product.inStock ? 'En stock' : 'Rupture'}
        </span>
      </div>

      {/* Thumbnails strip (shown only when there are extra local images) */}
      {thumbs.length > 0 && (
        <div className="flex gap-1.5 px-3 pt-2.5">
          {thumbs.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`${product.title} ${i + 2}`}
              className="w-12 h-12 rounded-md object-cover border border-gray-200"
            />
          ))}
        </div>
      )}

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1 gap-2">

        {/* Category badge */}
        <span className={`self-start text-[11px] font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>
          {product.subcategory || product.category}
        </span>

        {/* Brand */}
        {product.brand && (
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            {product.brand}
          </p>
        )}

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
          {product.title}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 flex-1">
            {product.description}
          </p>
        )}

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          {product.price > 0 ? (
            <span className="text-base font-bold text-gray-900">
              {product.price.toLocaleString('fr-MA')}&nbsp;
              <span className="text-xs font-semibold text-gray-500">MAD</span>
            </span>
          ) : (
            <span className="text-xs text-gray-400 italic">Prix sur demande</span>
          )}
          {product.ref && (
            <span className="text-[10px] font-mono text-gray-300">{product.ref}</span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────── Placeholder ───────────────────────── */

function PlaceholderIcon() {
  return (
    <svg
      className="w-14 h-14 text-gray-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
      />
    </svg>
  )
}
