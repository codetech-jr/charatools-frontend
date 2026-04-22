/**
 * @file app/catalogo/[categoria]/page.tsx
 * @description Página de catálogo por categoría con filtros instantáneos.
 *
 * Arquitectura:
 * - Async Server Component: llama a Supabase directamente (sin API route).
 * - Fallback transparente al MOCK_PRODUCTS si Supabase devuelve vacío o error.
 * - Los filtros viven en la URL (SearchParams) — compatibles con SSR e indexables.
 * - El filtrado real sucede en el cliente (<CatalogView>) sin round-trips al servidor.
 */

import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CATALOG_CATEGORIES, MOCK_PRODUCTS } from '@/lib/catalog.types'
import { getPublicCatalog } from '@/app/actions/catalogActions'
import { CatalogView } from '@/components/catalog/CatalogView'

interface PageProps {
  params: Promise<{ categoria: string }>
  searchParams: Promise<Record<string, string | string[]>>
}

// ── Metadata dinámica por categoría (SEO) ──────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria } = await params

  if (categoria === 'todos') {
    return {
      title: 'Catálogo Completo | CharaTools',
      description: 'Explora todas las herramientas, repuestos y equipos industriales en CharaTools. Cotización inmediata por WhatsApp.',
    }
  }

  const cat = CATALOG_CATEGORIES.find((c) => c.slug === categoria)
  if (!cat) return { title: 'Catálogo | CharaTools' }

  return {
    title: `${cat.label} | Catálogo CharaTools`,
    description: `${cat.description}. Cotiza por WhatsApp sin esperas. CharaTools Charallave.`,
    openGraph: {
      title: `${cat.label} - CharaTools`,
      description: cat.description,
    },
  }
}

// ── Rutas estáticas pre-generadas (mejora TTFB en Vercel) ─────────────────
export function generateStaticParams() {
  const categories = CATALOG_CATEGORIES.map((cat) => ({ categoria: cat.slug }))
  return [...categories, { categoria: 'todos' }]
}

// ── Página Principal ───────────────────────────────────────────────────────
export default async function CategoriaPage({ params }: PageProps) {
  const { categoria } = await params

  const isAll = categoria === 'todos'
  const category = isAll
    ? { label: 'Todo el Catálogo', slug: 'todos', description: 'Explora nuestra gama completa de productos industriales.', icon: '🛠️' }
    : CATALOG_CATEGORIES.find((c) => c.slug === categoria)

  if (!category) notFound()

  // ── Data Fetching directo en Server Component (patrón App Router) ──────
  const { products: dbProducts, error } = await getPublicCatalog()

  if (error) {
    console.warn('[CategoriaPage] Supabase error, usando MOCK_PRODUCTS:', error)
  }

  // Fuente de productos: Supabase si hay datos, mock como fallback
  const allProducts = dbProducts.length > 0 ? dbProducts : MOCK_PRODUCTS

  // Filtrar por categoría (o todos)
  const products = isAll
    ? allProducts
    : allProducts.filter((p) => p.category === categoria)

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gray-50">
      {/* ── Cabecera de la categoría ── */}
      <div className="bg-gray-900 text-white px-4 md:px-8 lg:px-16 py-6 md:py-8">
        <nav aria-label="Migas de pan" className="mb-2">
          <ol className="flex items-center gap-1 text-xs text-gray-400">
            <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
            <li aria-hidden="true" className="mx-1">›</li>
            <li><a href="/catalogo" className="hover:text-white transition-colors">Catálogo</a></li>
            <li aria-hidden="true" className="mx-1">›</li>
            <li aria-current="page" className="text-yellow-400 font-medium">{category.label}</li>
          </ol>
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">{category.icon}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">{category.label}</h1>
            <p className="text-sm text-gray-400 mt-0.5">{category.description}</p>
          </div>
        </div>

        {/* Indicador de fuente de datos — solo visible en desarrollo */}
        {process.env.NODE_ENV === 'development' && (
          <p className="text-xs mt-3 font-mono" aria-hidden="true">
            {dbProducts.length > 0
              ? <span className="text-green-400">✓ {products.length}/{dbProducts.length} productos desde Supabase</span>
              : <span className="text-yellow-400">⚠ Usando datos mock ({products.length} productos)</span>
            }
          </p>
        )}
      </div>

      {/* CatalogView necesita Suspense porque usa useSearchParams() */}
      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogView products={products} categoryLabel={category.label} />
      </Suspense>
    </main>
  )
}

// ── Skeleton de carga ──────────────────────────────────────────────────────
function CatalogSkeleton() {
  return (
    <div aria-busy="true" aria-label="Cargando productos" className="px-4 md:px-8 lg:px-16 py-4 space-y-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-lg">
          <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
            <div className="h-3 bg-gray-100 rounded animate-pulse w-1/4" />
          </div>
          <div className="w-11 h-11 bg-gray-200 rounded-xl animate-pulse flex-shrink-0" />
        </div>
      ))}
    </div>
  )
}
