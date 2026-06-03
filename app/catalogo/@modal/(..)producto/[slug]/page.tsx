/**
 * @file app/catalogo/@modal/(..)producto/[slug]/page.tsx
 * @description Intercepting Route: abre el modal SOBRE el catálogo.
 *
 * Cuando el usuario toca un producto desde /catalogo/[categoria],
 * Next.js intercepta la navegación a /producto/[slug] y renderiza
 * este componente en el slot @modal — sin abandonar el catálogo.
 *
 * Si el usuario refresca o accede directo a /producto/[slug],
 * Next.js usa el fallback en app/producto/[slug]/page.tsx.
 *
 * Lookup por SLUG (no por UUID/id) para mantener consistencia con el router.
 */

import { notFound } from 'next/navigation'
import { MOCK_PRODUCTS } from '@/lib/catalog.types'
import { ProductDetailModal } from '@/components/catalog/ProductDetailModal'
import { createPublicSupabaseClient } from '@/lib/supabase/server'
import type { CatalogProduct } from '@/lib/catalog.types'

interface PageProps {
  params: Promise<{ slug: string }>
}

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

async function getProductBySlug(slug: string): Promise<CatalogProduct | null> {
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
      const row = data as unknown as SupabaseProductRow
      const specs = row.specs ?? {}
      const product: CatalogProduct = {
        id:               row.id,
        name:             row.name,
        slug:             row.slug,
        shortDescription: row.short_desc ?? '',
        description:      row.description ?? undefined,
        category:         row.categories?.slug ?? 'general',
        categoryLabel:    row.categories?.name ?? 'General',
        brand:            row.brands?.name ?? 'CharaTools',
        unit:             typeof specs['unidad'] === 'string' ? specs['unidad'] : 'und',
        image:            typeof specs['imagen'] === 'string' ? specs['imagen'] : '/placeholder-product.webp',
        status:           (['available','high-demand','new-batch','out-of-stock'].includes(specs['stockStatus'] as string)
                           ? specs['stockStatus'] as CatalogProduct['status']
                           : 'available'),
        tags:             Array.isArray(specs['tags']) ? specs['tags'] as string[] : [],
        isCasheaEligible: row.is_casheable ?? false,
        subcategory:      typeof specs['subcategory'] === 'string' ? specs['subcategory'] : undefined,
        subitem:          typeof specs['subitem'] === 'string' ? specs['subitem'] : undefined,
        variantLabel:     typeof specs['variantLabel'] === 'string' ? specs['variantLabel'] : undefined,
        variants:         Array.isArray(specs['variants']) ? specs['variants'] as CatalogProduct['variants'] : undefined,
      }

      // Resolver nombres legibles de subcategoría y sub-ítem
      const slugsToResolve = [product.subcategory, product.subitem].filter(Boolean) as string[]
      if (slugsToResolve.length > 0) {
        const { data: cats } = await supabase
          .from('categories')
          .select('name, slug')
          .in('slug', slugsToResolve)
        if (cats) {
          if (product.subcategory) {
            product.subcategoryLabel = cats.find(c => c.slug === product.subcategory)?.name
          }
          if (product.subitem) {
            product.subitemLabel = cats.find(c => c.slug === product.subitem)?.name
          }
        }
      }

      return product
    }
  } catch {
    // fallback silencioso
  }

  // 2. Fallback: MOCK_PRODUCTS por slug
  return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null
}

export default async function InterceptedProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  // isModal=true → renderiza con overlay y backdrop
  return <ProductDetailModal product={product} isModal={true} />
}
