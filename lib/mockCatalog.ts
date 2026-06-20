/**
 * @file mockCatalog.ts
 * @description Mock data centralizado del catálogo CharaTools B2B.
 *
 * Productos ultra-realistas repartidos entre las 5 categorías oficiales.
 *
 * Sin precios (modelo B2B: el precio se negocia por WhatsApp).
 * Reemplazar por fetch a API/CMS cuando esté listo.
 */

import type { CatalogProduct } from './catalog.types'
import { MOCK_PRODUCTS } from './catalog.types'

export const MOCK_CATALOG: CatalogProduct[] = MOCK_PRODUCTS

// ── Helpers de consulta ────────────────────────────────────────────────────

/** Obtener todas las marcas únicas del catálogo */
export function getUniqueBrands(): string[] {
  return [...new Set(MOCK_CATALOG.map(p => p.brand))].sort()
}

/** Obtener todas las categorías únicas del catálogo */
export function getUniqueCategories(): { slug: string; label: string }[] {
  const seen = new Map<string, string>()
  MOCK_CATALOG.forEach(p => {
    if (!seen.has(p.category)) seen.set(p.category, p.categoryLabel)
  })
  return Array.from(seen.entries()).map(([slug, label]) => ({ slug, label }))
}

/** Buscar un producto por ID */
export function findProductById(id: string): CatalogProduct | undefined {
  return MOCK_CATALOG.find(p => p.id === id)
}
