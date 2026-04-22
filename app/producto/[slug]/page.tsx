/**
 * @file app/producto/[slug]/page.tsx
 * @description Página de Detalle de Producto — SEO-Optimizada.
 *
 * Lookup por SLUG (no por UUID) para URLs legibles y SEO-friendly.
 * Prioridad: Supabase live → MOCK_PRODUCTS fallback.
 *
 * Skills aplicadas:
 *   - seo-structure-architect: H1 único, BreadcrumbList, canonical por slug.
 *   - react-best-practices: React.cache para deduplicar fetch entre
 *     generateMetadata y Page. generateStaticParams por slug.
 *   - Server Component puro (sin 'use client').
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { MOCK_PRODUCTS } from '@/lib/catalog.types'
import type { CatalogProduct, StockStatus } from '@/lib/catalog.types'
import { ProductDetailsTemplate } from '@/components/product/ProductDetailsTemplate'
import { createPublicSupabaseClient } from '@/lib/supabase/server'

// ── Tipos ──────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://charatools.com.ve'

// ── Supabase fetch por slug ────────────────────────────────────────────────

interface SupabaseProductRow {
  id:          string
  name:        string
  slug:        string
  sku:         string
  short_desc:  string | null
  description: string | null
  specs:       Record<string, unknown> | null
  is_casheable: boolean | null
  brands:      { name: string; slug: string } | null
  categories:  { name: string; slug: string } | null
}

const VALID_STATUSES = ['available', 'high-demand', 'new-batch', 'out-of-stock'] as const

function toStockStatus(raw: unknown): CatalogProduct['status'] {
  if (typeof raw === 'string' && (VALID_STATUSES as readonly string[]).includes(raw)) {
    return raw as CatalogProduct['status']
  }
  return 'available'
}

function rowToProduct(row: SupabaseProductRow): CatalogProduct {
  const specs = row.specs ?? {}
  const categorySlug  = row.categories?.slug ?? 'general'
  const categoryLabel = row.categories?.name ?? 'General'
  return {
    id:               row.id,
    name:             row.name,
    slug:             row.slug,
    shortDescription: row.short_desc ?? '',
    description:      row.description ?? undefined,
    category:         categorySlug,
    categoryLabel,
    brand:            row.brands?.name ?? 'CharaTools',
    unit:             typeof specs['unidad'] === 'string' ? specs['unidad'] : 'und',
    image:            typeof specs['imagen'] === 'string' ? specs['imagen'] : '/placeholder-product.webp',
    status:           toStockStatus(specs['stockStatus']),
    tags:             Array.isArray(specs['tags']) ? specs['tags'] as string[] : [],
    isCasheaEligible: row.is_casheable ?? false,
  }
}

// ── React.cache: deduplicar entre generateMetadata y Page ─────────────────

const getProductBySlug = cache(async (slug: string): Promise<CatalogProduct | null> => {
  // 1. Intentar Supabase live
  try {
    const supabase = createPublicSupabaseClient()
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, name, slug, sku, short_desc, description, specs, is_casheable,
        brands   ( name, slug ),
        categories ( name, slug )
      `)
      .eq('slug', slug)   // ← filtro por SLUG, no por UUID
      .single()

    if (!error && data) {
      return rowToProduct(data as unknown as SupabaseProductRow)
    }
  } catch {
    // fallback silencioso al mock
  }

  // 2. Fallback: MOCK_PRODUCTS por slug
  return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null
})

// ══════════════════════════════════════════════════════════════════════════════
// generateStaticParams — SSG por slug
// ══════════════════════════════════════════════════════════════════════════════

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ slug: p.slug }))
}

// ══════════════════════════════════════════════════════════════════════════════
// generateMetadata
// ══════════════════════════════════════════════════════════════════════════════

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Producto no encontrado | CharaTools',
      robots: { index: false },
    }
  }

  const url = `${SITE_URL}/producto/${product.slug}`
  const title = `${product.name} | CharaTools — Ferretería Charallave`
  const description = `${product.shortDescription} Cotiza por WhatsApp en minutos. Distribuidores oficiales en Charallave, Miranda.`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: product.name,
      description,
      images: [{ url: product.image, width: 800, height: 600, alt: product.name }],
    },
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
// ══════════════════════════════════════════════════════════════════════════════

function toSchemaAvailability(status: StockStatus): string {
  const map: Record<StockStatus, string> = {
    available:      'https://schema.org/InStock',
    'high-demand':  'https://schema.org/InStock',
    'new-batch':    'https://schema.org/InStock',
    'out-of-stock': 'https://schema.org/OutOfStock',
  }
  return map[status]
}

function buildProductSchema(product: CatalogProduct): string {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type':    'Product',
    name:        product.name,
    description: product.description ?? product.shortDescription,
    image:       [product.image],
    sku:         (product as CatalogProduct & { reference?: string }).reference ?? product.slug,
    brand:       { '@type': 'Brand', name: product.brand },
    category:    product.categoryLabel,
    offers: {
      '@type':          'Offer',
      availability:     toSchemaAvailability(product.status),
      businessFunction: 'https://schema.org/LeaseOut',
      seller: {
        '@type':          'LocalBusiness',
        name:             'CharaTools',
        address: {
          '@type':         'PostalAddress',
          addressLocality: 'Charallave',
          addressRegion:   'Miranda',
          addressCountry:  'VE',
        },
      },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio',    item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Catálogo',  item: `${SITE_URL}/catalogo` },
      { '@type': 'ListItem', position: 3, name: product.categoryLabel, item: `${SITE_URL}/catalogo/${product.category}` },
      { '@type': 'ListItem', position: 4, name: product.name,          item: `${SITE_URL}/producto/${product.slug}` },
    ],
  }

  return JSON.stringify([productSchema, breadcrumbSchema])
}

// ══════════════════════════════════════════════════════════════════════════════
// Page Component — Pure Server Component
// ══════════════════════════════════════════════════════════════════════════════

export default async function ProductoPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gray-50">

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: buildProductSchema(product) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Ruta de navegación" className="bg-gray-900 border-b border-gray-800 px-4 md:px-8 py-3">
        <ol className="flex items-center flex-wrap gap-1 text-xs text-gray-500" role="list">
          {[
            { label: 'Inicio',    href: '/' },
            { label: 'Catálogo', href: '/catalogo' },
            { label: product.categoryLabel, href: `/catalogo/${product.category}` },
          ].map(({ label, href }) => (
            <li key={href} className="flex items-center gap-1">
              <Link href={href} className="hover:text-gray-300 transition-colors">{label}</Link>
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

      {/* Contenido principal */}
      <ProductDetailsTemplate product={product} />

    </main>
  )
}
