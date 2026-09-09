import type { MetadataRoute } from 'next'
import { CATALOG_CATEGORIES, CATALOG_BRANDS, MOCK_PRODUCTS } from '@/lib/catalog.types'
import { createPublicSupabaseClient } from '@/lib/supabase/server'

/**
 * @file app/sitemap.ts
 * @description Generador dinámico de Sitemap XML profesional para CharaTools.
 * Conforme a Next.js App Router MetadataRoute y directrices SEO de site-architecture.md.
 * 
 * Jerarquía y Prioridades:
 * - L0 (Homepage): 1.0, daily
 * - L1 (Catálogo, Categorías, Ofertas, Contacto): 0.85 - 0.9, daily/weekly
 * - L2 (Marcas, Promociones, Institucional): 0.7 - 0.75, weekly/monthly
 * - L3 (Productos individuales): 0.8, weekly
 * - Legal (Políticas y Términos): 0.4, yearly
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://charatools.com.ve').replace(/\/$/, '')
  const currentDate = new Date()

  // ── 1. Rutas Estáticas Principales (L0 y L1 Core) ──────────────────────────
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ofertas`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/promociones`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/membresia`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/quienes-somos`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // ── 2. Silos de Categorías (L1 Temáticos) ──────────────────────────────────
  const categoryRoutes: MetadataRoute.Sitemap = CATALOG_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/catalogo/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // ── 3. Landing Pages de Marcas y Promociones (L2) ──────────────────────────
  const brandRoutes: MetadataRoute.Sitemap = CATALOG_BRANDS.map((brand) => {
    const brandSlug = brand.toLowerCase().replace(/\s+/g, '-')
    return {
      url: `${baseUrl}/promociones/${brandSlug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    }
  })

  // ── 4. Páginas de Detalle de Producto (L3 - Catálogo Dinámico) ─────────────
  // Consultamos Supabase live con fallback robusto a MOCK_PRODUCTS
  const productSlugMap = new Map<string, Date>()

  try {
    const supabase = createPublicSupabaseClient()
    const { data: dbProducts, error } = await supabase
      .from('products')
      .select('slug, updated_at, created_at')

    if (!error && dbProducts) {
      for (const item of dbProducts) {
        if (item.slug) {
          const modDate = item.updated_at ? new Date(item.updated_at) : (item.created_at ? new Date(item.created_at) : currentDate)
          productSlugMap.set(item.slug, modDate)
        }
      }
    }
  } catch {
    // Si la conexión a base de datos falla durante la compilación, se continúa con MOCK_PRODUCTS
  }

  // Aseguramos que los productos del catálogo base también estén presentes
  for (const mockItem of MOCK_PRODUCTS) {
    if (!productSlugMap.has(mockItem.slug)) {
      productSlugMap.set(mockItem.slug, currentDate)
    }
  }

  const productRoutes: MetadataRoute.Sitemap = Array.from(productSlugMap.entries()).map(([slug, lastMod]) => ({
    url: `${baseUrl}/producto/${slug}`,
    lastModified: lastMod,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // ── 5. Páginas Legales y de Cumplimiento ────────────────────────────────────
  const legalPages = [
    'terminos-y-condiciones',
    'politica-de-privacidad',
    'politica-de-envios',
    'politica-de-pagos',
    'politica-de-devoluciones',
    'politica-de-garantia',
    'politica-de-cookies',
  ]

  const legalRoutes: MetadataRoute.Sitemap = legalPages.map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: currentDate,
    changeFrequency: 'yearly',
    priority: 0.4,
  }))

  return [
    ...coreRoutes,
    ...categoryRoutes,
    ...brandRoutes,
    ...productRoutes,
    ...legalRoutes,
  ]
}
