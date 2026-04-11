import { readFileSync } from 'fs'
import { join } from 'path'
import { createContext, Script } from 'vm'
import Image from 'next/image'

interface VTProduct {
  id: number
  category: string
  subcategory: string
  brand: string
  title: string
  description_fr: string
  price_MAD: number
  image_url: string
  images?: string[]
  in_stock: boolean
  ref: string
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'Outillage':                    { bg: 'bg-blue-100',   text: 'text-blue-700'   },
  'Électricité':                  { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'Droguerie':                    { bg: 'bg-green-100',  text: 'text-green-700'  },
  'Échelles & Travaux en Hauteur':{ bg: 'bg-orange-100', text: 'text-orange-700' },
  'Jardinage & Plein Air':        { bg: 'bg-emerald-100',text: 'text-emerald-700'},
  'Luminaire':                    { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Peinture':                     { bg: 'bg-pink-100',   text: 'text-pink-700'   },
  'Rangement & Organisation':     { bg: 'bg-slate-100',  text: 'text-slate-700'  },
  'Quincaillerie':                { bg: 'bg-rose-100',   text: 'text-rose-700'   },
}

function loadVTProducts(filename: string): VTProduct[] {
  try {
    const filePath = join(process.cwd(), 'public', 'data', filename)
    const source = readFileSync(filePath, 'utf-8')
    const collected: VTProduct[] = []
    const sandbox = {
      window: {
        VT_PRODUCTS: [] as VTProduct[],
      },
    }
    // make concat push into our collected array
    sandbox.window.VT_PRODUCTS = {
      concat(items: VTProduct[]) {
        collected.push(...items)
        return this
      },
    } as unknown as VTProduct[]

    const ctx = createContext(sandbox)
    const script = new Script(source)
    script.runInContext(ctx)
    return collected
  } catch {
    return []
  }
}

function loadQuincaillerie(): VTProduct[] {
  try {
    const filePath = join(process.cwd(), 'public', 'data', 'quincaillerie.js')
    const source = readFileSync(filePath, 'utf-8')
    // Extract the array literal between the first [ and the last ]
    const match = source.match(/\[[\s\S]*\]/)
    if (!match) return []
    const raw: Array<{
      name?: string; nameFr?: string; description?: string;
      images?: string[]; family?: string; category?: string
    }> = JSON.parse(match[0])
    return raw
      .filter(p => p.images && p.images.length > 0)
      .map((p, i) => ({
        id: 1000 + i,
        category: 'Quincaillerie',
        subcategory: p.family ?? p.category ?? 'Général',
        brand: '',
        title: p.nameFr ?? p.name ?? '',
        description_fr: p.description ?? '',
        price_MAD: 0,
        image_url: p.images![0],
        images: p.images,
        in_stock: true,
        ref: '',
      }))
  } catch {
    return []
  }
}

function getAllProducts(): VTProduct[] {
  const vtFiles = [
    'outillage.js', 'electricite.js', 'droguerie.js',
    'echelles.js', 'jardinage.js', 'luminaire.js',
    'peinture.js', 'rangement.js',
  ]
  const vtProducts = vtFiles.flatMap(loadVTProducts)
  const quincProducts = loadQuincaillerie()
  return [...vtProducts, ...quincProducts]
}

export default function Page() {
  const products = getAllProducts()
  const categories = Array.from(new Set(products.map(p => p.category)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Verona Tools
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Votre distributeur d&apos;outils industriels au Maroc
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
            {products.length} produits
          </span>
        </div>
      </header>

      {/* ── Category pills ─────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map(cat => {
            const colors = CATEGORY_COLORS[cat] ?? { bg: 'bg-gray-100', text: 'text-gray-700' }
            const count = products.filter(p => p.category === cat).length
            return (
              <span
                key={cat}
                className={`inline-flex items-center gap-1 whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
              >
                {cat}
                <span className="opacity-60">({count})</span>
              </span>
            )
          })}
        </div>
      </div>

      {/* ── Grid ───────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categories.map(cat => {
          const catProducts = products.filter(p => p.category === cat)
          const colors = CATEGORY_COLORS[cat] ?? { bg: 'bg-gray-100', text: 'text-gray-700' }
          return (
            <section key={cat} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-xl font-semibold text-gray-800">{cat}</h2>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                  {catProducts.length}
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {catProducts.map(product => (
                  <ProductCard key={product.ref || `${product.id}`} product={product} colors={colors} />
                ))}
              </div>
            </section>
          )
        })}
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-200 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Verona Tools — Tous droits réservés
        </div>
      </footer>
    </div>
  )
}

/* ── Product Card ─────────────────────────────────────────── */
function ProductCard({
  product,
  colors,
}: {
  product: VTProduct
  colors: { bg: string; text: string }
}) {
  const hasLocalImages = Boolean(product.images && product.images.length > 0)
  const hasImage = Boolean(product.image_url)
  const isUnsplash = product.image_url?.startsWith('https://images.unsplash.com')

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        {hasLocalImages ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images![0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : hasImage && isUnsplash ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <PlaceholderIcon />
        )}

        {/* Stock badge */}
        <span
          className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${
            product.in_stock
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {product.in_stock ? 'En stock' : 'Rupture'}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Category tag */}
        <span
          className={`self-start px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
        >
          {product.subcategory}
        </span>

        {/* Brand */}
        {product.brand && (
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            {product.brand}
          </p>
        )}

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
          {product.title}
        </h3>

        {/* Description */}
        {product.description_fr && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">
            {product.description_fr}
          </p>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          {product.price_MAD > 0 ? (
            <span className="text-base font-bold text-gray-900">
              {product.price_MAD.toLocaleString('fr-MA')}&nbsp;MAD
            </span>
          ) : (
            <span className="text-xs text-gray-400 italic">Prix sur demande</span>
          )}
          {product.ref && (
            <span className="text-xs text-gray-300 font-mono">{product.ref}</span>
          )}
        </div>
      </div>
    </div>
  )
}

function PlaceholderIcon() {
  return (
    <svg
      className="w-16 h-16 text-gray-300"
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
