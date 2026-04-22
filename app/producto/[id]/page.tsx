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
import { ProductDetailsTemplate } from '@/components/product/ProductDetailsTemplate'

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
// Page Component — Pure Server Component
// ══════════════════════════════════════════════════════════════════════════════

export default async function ProductoPage({ params }: PageProps) {
  const { id } = await params
  const product = getProduct(id)

  // js-early-exit: falla rápido antes de renderizar nada
  if (!product) notFound()

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
      <ProductDetailsTemplate product={product} />

    </main>
  )
}
