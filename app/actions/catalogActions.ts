/**
 * @file app/actions/catalogActions.ts
 * @description Data-fetching repository para el catálogo B2B de CharaTools.
 *
 * Server Actions / Server-side fetchers — SIN API Routes.
 * Patrón: "use server" + createPublicSupabaseClient() (sin cookies → SSG friendly).
 *
 * Esquema REAL de la tabla `products` (confirmado con DB probe + migración 002):
 *   ✓ id, name, slug, sku, short_desc, description, specs (JSONB)
 *   ✓ brand_id  (FK NOT NULL → public.brands)
 *   ✓ category_id (FK NOT NULL → public.categories)
 *   ✓ is_casheable, created_at, updated_at
 *
 * Metadata extra (image, tags, stock_status, unit) vive en specs JSONB:
 *   specs.imagen       → URL de imagen del producto
 *   specs.tags         → string[] para búsqueda y filtros
 *   specs.stockStatus  → 'available' | 'high-demand' | 'new-batch' | 'out-of-stock'
 *   specs.unidad       → 'und' | 'm' | 'rollo' | 'pack' | 'cuñete'
 *
 * Si Supabase falla o la tabla está vacía → páginas usan MOCK_CATALOG de fallback.
 */

'use server'

import { createPublicSupabaseClient } from '@/lib/supabase/server'
import type { CatalogProduct } from '@/lib/catalog.types'

// ---------------------------------------------------------------------------
// Tipo de fila Supabase — JOIN brands + categories (select anidado de Supabase)
// ---------------------------------------------------------------------------

interface ProductRow {
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

// ---------------------------------------------------------------------------
// Tipo de retorno público
// ---------------------------------------------------------------------------

export interface CatalogResult {
  products:    CatalogProduct[]
  error:       string | null
  /** true si la tabla tiene filas reales de Supabase (no mock) */
  hasLiveData: boolean
}

// ---------------------------------------------------------------------------
// Helpers de normalización
// ---------------------------------------------------------------------------

const VALID_STATUSES = ['available', 'high-demand', 'new-batch', 'out-of-stock'] as const
type ValidStatus = typeof VALID_STATUSES[number]

/** Extrae un string del JSONB specs de forma segura */
function specStr(specs: Record<string, unknown> | null, key: string): string | undefined {
  if (!specs) return undefined
  const v = specs[key]
  return typeof v === 'string' ? v : undefined
}

/** Extrae un string[] del JSONB specs de forma segura */
function specArr(specs: Record<string, unknown> | null, key: string): string[] {
  if (!specs) return []
  const v = specs[key]
  return Array.isArray(v) ? (v as string[]) : []
}

function toStockStatus(raw: string | undefined): ValidStatus {
  if (raw && (VALID_STATUSES as readonly string[]).includes(raw)) {
    return raw as ValidStatus
  }
  return 'available'
}

/**
 * Convierte una fila de Supabase (con JOIN brands + categories)
 * al tipo canónico CatalogProduct del frontend.
 */
function toProduct(row: ProductRow): CatalogProduct {
  const categorySlug  = row.categories?.slug ?? 'general'
  const categoryLabel = row.categories?.name ?? 'General'
  const brandName     = row.brands?.name ?? 'CharaTools'

  return {
    id:               row.id,
    slug:             row.slug ?? row.id,
    name:             row.name,
    shortDescription: row.short_desc ?? '',
    description:      row.description ?? undefined,
    category:         categorySlug,
    categoryLabel,
    brand:            brandName,
    unit:             specStr(row.specs, 'unidad') ?? 'und',
    image:            specStr(row.specs, 'imagen') ?? '/placeholder-product.webp',
    status:           toStockStatus(specStr(row.specs, 'stockStatus')),
    tags:             specArr(row.specs, 'tags'),
    isCasheaEligible: row.is_casheable ?? false,
  }
}

// ---------------------------------------------------------------------------
// Función principal — SSG friendly (sin cookies)
// ---------------------------------------------------------------------------

/**
 * Obtiene el catálogo público de productos desde Supabase.
 *
 * Usa JOIN automático de Supabase (select anidado) para obtener
 * nombre/slug de brand y category en una sola query — sin N+1.
 *
 * - SSG friendly: sin cookies, pre-renderable en build time.
 * - Requiere migración 002 ejecutada en Supabase.
 * - Nunca lanza: retorna { products, error, hasLiveData }.
 *
 * @example
 * const { products, hasLiveData } = await getPublicCatalog()
 * const display = hasLiveData ? products : MOCK_CATALOG
 */
export async function getPublicCatalog(): Promise<CatalogResult> {
  try {
    const supabase = createPublicSupabaseClient()

    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        slug,
        sku,
        short_desc,
        description,
        specs,
        is_casheable,
        brands   ( name, slug ),
        categories ( name, slug )
      `)
      .order('name', { ascending: true })

    if (error) {
      console.error('[catalogActions] Supabase query error:', error.message)
      return { products: [], error: error.message, hasLiveData: false }
    }

    if (!data || data.length === 0) {
      return { products: [], error: null, hasLiveData: false }
    }

    const products = (data as unknown as ProductRow[]).map(toProduct)
    return { products, error: null, hasLiveData: true }

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    console.error('[catalogActions] Unexpected error:', message)
    return { products: [], error: message, hasLiveData: false }
  }
}
