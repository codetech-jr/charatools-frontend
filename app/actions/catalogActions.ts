/**
 * @file app/actions/catalogActions.ts
 * @description Data-fetching repository para el catálogo B2B de CharaTools.
 *
 * Server Actions / Server-side fetchers — SIN API Routes.
 * Patrón: "use server" + createPublicSupabaseClient() (sin cookies → SSG friendly).
 *
 * Esquema de la tabla `products` en Supabase (post-migración 001):
 *   ✓ id, name, slug, short_desc, description, specs (JSONB)
 *   ✓ category, brand, unit, image, stock_status
 *   ✓ tags (text[]), is_casheable, is_outlet
 *   ✓ created_at, updated_at
 *
 * Si la migración aún no se ha ejecutado, la función cae en el bloque catch
 * y la página usa MOCK_CATALOG como fallback (ver app/catalogo/page.tsx).
 */

'use server'

import { createPublicSupabaseClient } from '@/lib/supabase/server'
import type { CatalogProduct } from '@/lib/catalog.types'

// ---------------------------------------------------------------------------
// Tipo de fila Supabase (post-migración 001)
// ---------------------------------------------------------------------------

interface ProductRow {
  id:           string
  name:         string
  slug:         string
  short_desc:   string | null
  description:  string | null
  specs:        Record<string, unknown> | null
  category:     string | null
  brand:        string | null
  unit:         string | null
  image:        string | null
  stock_status: string | null
  tags:         string[] | null
  is_casheable: boolean | null
  is_outlet:    boolean | null
}

// ---------------------------------------------------------------------------
// Tipo de retorno
// ---------------------------------------------------------------------------

export interface CatalogResult {
  products:    CatalogProduct[]
  error:       string | null
  /** true si la tabla tiene filas reales de Supabase */
  hasLiveData: boolean
}

// ---------------------------------------------------------------------------
// Helpers de normalización
// ---------------------------------------------------------------------------

const VALID_STATUSES = ['available', 'high-demand', 'new-batch', 'out-of-stock'] as const
type ValidStatus = typeof VALID_STATUSES[number]

function toStockStatus(raw: string | null): ValidStatus {
  if (raw && (VALID_STATUSES as readonly string[]).includes(raw)) {
    return raw as ValidStatus
  }
  return 'available'
}

function toCategoryLabel(slug: string | null): string {
  if (!slug) return 'General'
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

/**
 * Convierte una fila de Supabase al CatalogProduct canónico del frontend.
 */
function toProduct(row: ProductRow): CatalogProduct {
  const categorySlug = row.category ?? 'general'
  return {
    id:               row.id,
    name:             row.name,
    shortDescription: row.short_desc ?? '',
    description:      row.description ?? undefined,
    category:         categorySlug,
    categoryLabel:    toCategoryLabel(categorySlug),
    brand:            row.brand ?? 'CharaTools',
    unit:             row.unit ?? 'und',
    image:            row.image ?? '/placeholder-product.webp',
    status:           toStockStatus(row.stock_status),
    tags:             row.tags ?? [],
    isCasheaEligible: row.is_casheable ?? false,
    isOutlet:         row.is_outlet ?? false,
  }
}

// ---------------------------------------------------------------------------
// Función principal — SSG friendly (sin cookies)
// ---------------------------------------------------------------------------

/**
 * Obtiene el catálogo público de productos desde Supabase.
 *
 * - Compatible con SSG: usa createPublicSupabaseClient() (sin cookies).
 * - Requiere migración 001 ejecutada en Supabase.
 * - Retorna { products, error, hasLiveData } — nunca lanza.
 *
 * @example
 * // En un Server Component:
 * const { products, hasLiveData } = await getPublicCatalog()
 * const displayProducts = hasLiveData ? products : MOCK_CATALOG
 */
export async function getPublicCatalog(): Promise<CatalogResult> {
  try {
    const supabase = createPublicSupabaseClient()

    const { data, error } = await supabase
      .from('products')
      .select(
        'id, name, slug, short_desc, description, specs, category, brand, unit, image, stock_status, tags, is_casheable, is_outlet'
      )
      .order('name', { ascending: true })

    if (error) {
      console.error('[catalogActions] Supabase query error:', error.message)
      return { products: [], error: error.message, hasLiveData: false }
    }

    if (!data || data.length === 0) {
      return { products: [], error: null, hasLiveData: false }
    }

    const products = (data as ProductRow[]).map(toProduct)
    return { products, error: null, hasLiveData: true }

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    console.error('[catalogActions] Unexpected error:', message)
    return { products: [], error: message, hasLiveData: false }
  }
}
