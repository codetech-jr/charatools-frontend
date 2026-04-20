/**
 * @file app/producto/[id]/page.tsx
 * @description Página de Detalle de Producto — SEO-Optimizada.
 *
 * ══ Skills aplicadas ══════════════════════════════════════════════════════
 *
 * seo-structure-architect.md:
 *   - Una sola H1 con el nombre del producto (keyword principal).
 *   - H2 para secciones ("Descripción", "Especificaciones", "Disponibilidad").
 *   - Breadcrumb semántico + Schema BreadcrumbList.
 *   - URL amigable: /producto/[id-slug] (ya usamos IDs tipo slug en el mock).
 *
 * schema-generator.md:
 *   - Schema.org `Product` con `Brand`, `Offer` (B2B sin precio → InStock,
 *     priceCurrency omitido según best practice para catálogos sin precio público).
 *   - Schema `BreadcrumbList` para rich snippets de navegación.
 *   - Inyección via <script type="application/ld+json"> en el body
 *     (Next.js Script component con strategy="beforeInteractive" no disponible
 *     en RSC; usamos dangerouslySetInnerHTML en un <script> dentro del JSX).
 *
 * react-best-practices.md:
 *   - Server Component puro para SEO máximo (sin 'use client' en el layout).
 *   - `generateMetadata` async para títulos/descriptions dinámicos.
 *   - `generateStaticParams` → SSG de todas las páginas de producto.
 *   - Client island mínima (`AddToQuoteButton`) para interacción Zustand
 *     → `bundle-dynamic-imports` + aislamiento de hidratación.
 *   - `server-cache-react` → `React.cache` para deduplicar la búsqueda
 *     del producto entre `generateMetadata` y `Page`.
 *   - `js-index-maps` → lookup O(1) via Map pre-construido.
 * ══════════════════════════════════════════════════════════════════════════
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronRight,
  Tag,
  Zap,
  Weight,
  Wifi,
  Package,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowLeft,
  CreditCard,
} from 'lucide-react'
import { MOCK_PRODUCTS } from '@/lib/catalog.types'
import type { CatalogProduct, StockStatus } from '@/lib/catalog.types'

// ── Importación directa — el 'use client' en AddToQuoteButton crea la
// client boundary automáticamente. Turbopack no permite ssr:false en RSC.
// El mounted guard interno del componente previene cualquier flash SSR.
import AddToQuoteButton from '@/components/catalog/AddToQuoteButton'
import { RelatedProductsCarousel } from '@/components/catalog/RelatedProductsCarousel'
import { DiscoverMoreCategories } from '@/components/catalog/DiscoverMoreCategories'

// ── react-best-practices: js-index-maps ───────────────────────────────────
// Mapa O(1) construido una vez a nivel de módulo (server-side).
const PRODUCT_MAP = new Map<string, CatalogProduct>(
  MOCK_PRODUCTS.map((p) => [p.id, p])
)

// ── react-best-practices: server-cache-react ──────────────────────────────
// React.cache deduplica la llamada entre generateMetadata y Page en la misma
// request, evitando buscar el mismo producto dos veces.
const getProduct = cache((id: string): CatalogProduct | undefined =>
  PRODUCT_MAP.get(id)
)

// ── Helpers de UI ──────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://charatools.com.ve'

const STATUS_CONFIG: Record<
  StockStatus,
  { label: string; color: string; icon: React.ElementType }
> = {
  available: { label: 'Disponible', color: 'text-green-700 bg-green-50 border-green-200', icon: CheckCircle2 },
  'high-demand': { label: 'Alta Rotación', color: 'text-yellow-700 bg-yellow-50 border-yellow-200', icon: Flame },
  'new-batch': { label: 'Nuevo Lote', color: 'text-blue-700 bg-blue-50 border-blue-200', icon: Package },
  'out-of-stock': { label: 'Sin Stock', color: 'text-red-700 bg-red-50 border-red-200', icon: AlertTriangle },
}

/** Availability en schema.org según status */
function toSchemaAvailability(status: StockStatus): string {
  const map: Record<StockStatus, string> = {
    available: 'https://schema.org/InStock',
    'high-demand': 'https://schema.org/InStock',
    'new-batch': 'https://schema.org/InStock',
    'out-of-stock': 'https://schema.org/OutOfStock',
  }
  return map[status]
}

// ── Page Props ──────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ id: string }>
}

// ══════════════════════════════════════════════════════════════════════════════
// generateStaticParams — SSG de todos los productos
// react-best-practices: async-parallel — generamos todos los params sin await
// ══════════════════════════════════════════════════════════════════════════════

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ id: p.id }))
}

// ══════════════════════════════════════════════════════════════════════════════
// generateMetadata — Títulos y OpenGraph dinámicos
// seo-structure-architect: título = "{nombre} | CharaTools"
// ══════════════════════════════════════════════════════════════════════════════

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)

  if (!product) {
    return {
      title: 'Producto no encontrado | CharaTools',
      robots: { index: false },
    }
  }

  const title = `${product.name} | CharaTools — Ferretería Charallave`
  const description = `${product.shortDescription} Cotiza por WhatsApp en minutos. Distribuidores oficiales en Charallave, Miranda.`
  const url = `${SITE_URL}/producto/${product.id}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: product.name,
      description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    // schema-generator: datos para Twitter card
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      images: [product.image],
    },
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Schema.org JSON-LD
// schema-generator.md: Product + BreadcrumbList
// B2B sin precio: usamos Offer con priceSpecification vacía y BusinessFunction
// "LeaseOut" (consulta) — best practice para catálogos sin precio público.
// ══════════════════════════════════════════════════════════════════════════════

function buildProductSchema(product: CatalogProduct): string {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? product.shortDescription,
    image: [product.image],
    sku: product.reference ?? product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    manufacturer: {
      '@type': 'Organization',
      name: product.brand,
    },
    category: product.categoryLabel,
    ...(product.weightKg && { weight: { '@type': 'QuantitativeValue', value: product.weightKg, unitCode: 'KGM' } }),
    ...(product.powerWatts && { power: { '@type': 'QuantitativeValue', value: product.powerWatts, unitCode: 'WTT' } }),
    offers: {
      '@type': 'Offer',
      availability: toSchemaAvailability(product.status),
      // B2B: no mostramos precio público. Usamos "priceSpecification" vacía
      // con BusinessFunction = LeaseOut (consulta directa) — válido por schema.org
      businessFunction: 'https://schema.org/LeaseOut',
      seller: {
        '@type': 'LocalBusiness',
        name: 'CharaTools',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Charallave',
          addressRegion: 'Miranda',
          addressCountry: 'VE',
        },
      },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Catálogo', item: `${SITE_URL}/catalogo` },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.categoryLabel,
        item: `${SITE_URL}/catalogo/${product.category}`,
      },
      { '@type': 'ListItem', position: 4, name: product.name, item: `${SITE_URL}/producto/${product.id}` },
    ],
  }

  // Emitimos ambos schemas como array JSON-LD
  return JSON.stringify([productSchema, breadcrumbSchema])
}

// ══════════════════════════════════════════════════════════════════════════════
// Componentes de UI (Server, no client)
// ══════════════════════════════════════════════════════════════════════════════

/** Tabla de especificaciones técnicas */
function SpecTable({ product }: { product: CatalogProduct }) {
  const specs: { icon: React.ElementType; label: string; value: string }[] = []

  if (product.brand) specs.push({ icon: Tag, label: 'Marca', value: product.brand })
  if (product.reference) specs.push({ icon: Package, label: 'Referencia / SKU', value: product.reference })
  if (product.unit) specs.push({ icon: Package, label: 'Unidad de venta', value: product.unit })
  if (product.powerWatts) specs.push({ icon: Zap, label: 'Potencia', value: `${product.powerWatts} W` })
  if (product.voltageVolts) specs.push({ icon: Wifi, label: 'Voltaje', value: `${product.voltageVolts} V` })
  if (product.weightKg) specs.push({ icon: Weight, label: 'Peso', value: `${product.weightKg} kg` })

  if (specs.length === 0) return null

  return (
    <div>
      <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
        Especificaciones Técnicas
      </h2>
      <dl className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
        {specs.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors">
            <dt className="flex items-center gap-2 text-xs text-gray-500">
              <Icon className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
              {label}
            </dt>
            <dd className="text-xs font-bold text-gray-900 text-right">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Page Component — Pure Server Component
// ══════════════════════════════════════════════════════════════════════════════

export default async function ProductoPage({ params }: PageProps) {
  const { id } = await params
  const product = getProduct(id)

  // js-early-exit: falla rápido antes de renderizar nada
  if (!product) notFound()

  const status = STATUS_CONFIG[product.status]
  const StatusIcon = status.icon
  const isOutOfStock = product.status === 'out-of-stock'

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gray-50">

      {/* ── Schema.org JSON-LD (schema-generator.md) ─────────────────────── */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: buildProductSchema(product) }}
      />

      {/* ── Breadcrumb (seo-structure-architect: BreadcrumbList) ─────────── */}
      <nav
        aria-label="Ruta de navegación"
        className="bg-gray-900 border-b border-gray-800 px-4 md:px-8 py-3"
      >
        <ol className="flex items-center flex-wrap gap-1 text-xs text-gray-500" role="list">
          {[
            { label: 'Inicio', href: '/' },
            { label: 'Catálogo', href: '/catalogo' },
            { label: product.categoryLabel, href: `/catalogo/${product.category}` },
          ].map(({ label, href }) => (
            <li key={href} className="flex items-center gap-1">
              <Link href={href} className="hover:text-gray-300 transition-colors">
                {label}
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-700" aria-hidden="true" />
            </li>
          ))}
          <li>
            <span className="text-gray-300 line-clamp-1 max-w-[200px]" aria-current="page">
              {product.name}
            </span>
          </li>
        </ol>
      </nav>

      {/* ── Layout principal ─────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">

        {/* Botón volver (mobile) */}
        <Link
          href={`/catalogo/${product.category}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6 md:hidden"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Volver al catálogo
        </Link>

        {/* ── Split 2 columnas Desktop ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* ── Columna Izquierda: Imagen ─────────────────────────────────── */}
          <div className="space-y-3">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <Image
                src={product.image}
                alt={`Foto de ${product.name} — CharaTools`}
                fill
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Badge de estado flotante */}
              <div className="absolute top-4 left-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${status.color}`}
                >
                  <StatusIcon className="w-3.5 h-3.5" aria-hidden="true" />
                  {status.label}
                </span>
              </div>
            </div>

            {/* Tags del producto */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5" aria-label="Etiquetas del producto">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-100 text-gray-500 text-[10px] font-medium px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── Columna Derecha: Detalles ─────────────────────────────────── */}
          <div className="space-y-6">

            {/* Categoría + Marca */}
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/catalogo/${product.category}`}
                className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-yellow-500 transition-colors"
              >
                {product.categoryLabel}
              </Link>
              <span className="text-gray-300" aria-hidden="true">·</span>
              <span className="text-xs font-bold text-gray-500">{product.brand}</span>
            </div>

            {/* H1 — seo-structure-architect: única H1, keyword principal */}
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Descripción corta */}
            <p className="text-base text-gray-600 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Descripción larga */}
            {product.description && (
              <div>
                <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  Descripción
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Especificaciones técnicas */}
            <SpecTable product={product} />

            {/* ── Disponibilidad + CTA ─────────────────────────────────────── */}
            <div className="space-y-3 pt-2">
              <div>
                <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  Disponibilidad
                </h2>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold border ${status.color}`}
                >
                  <StatusIcon className="w-4 h-4" aria-hidden="true" />
                  {status.label}
                  {!isOutOfStock && (
                    <span className="font-normal text-xs opacity-70 ml-1">
                      — Confirma disponibilidad exacta por WhatsApp
                    </span>
                  )}
                </span>
              </div>

              {/* ── Botón de Cotización (Client Island) ─────────────────────
                  react-best-practices: bundle-dynamic-imports
                  El Server Component NO toca Zustand. Solo el client island.
              ── */}
              <AddToQuoteButton product={product} />

              {/* ── Badge Cashea (pricing-strategy: Mental Accounting) ────── */}
              {!isOutOfStock && (
                <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                  <CreditCard className="w-4 h-4 text-orange-500 flex-shrink-0" aria-hidden="true" />
                  <p className="text-xs text-gray-600 leading-snug">
                    Llévatelo hoy con{' '}
                    <strong className="text-orange-500 font-bold">Cashea</strong>{' '}
                    — cuotas sin interés. Tienda oficial.
                  </p>
                </div>
              )}

              {/* Referencia/SKU visible */}
              {product.reference && (
                <p className="text-[10px] text-gray-400 font-mono">
                  Ref: {product.reference}
                </p>
              )}
            </div>

          </div>
        </div>

        {/* ── Productos Relacionados (Cross-Selling) ─────────────────────── */}
        <RelatedProductsCarousel 
          currentProductId={product.id} 
          category={product.category} 
        />
      </div>

      {/* ── Anti-Dead-End UX: Explorar más categorías ──────────────────── */}
      <DiscoverMoreCategories categorySlug={product.category} />

    </main>
  )
}
