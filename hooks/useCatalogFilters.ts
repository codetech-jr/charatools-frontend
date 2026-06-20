/**
 * @file useCatalogFilters.ts
 * @description Hook que sincroniza los filtros del catálogo con la URL (SearchParams).
 *
 * Beneficio clave: Los filtros son COMPARTIBLES (copiar URL preserva el estado).
 * El filtrado es 100% client-side: sin llamadas al servidor, <50ms en móvil.
 *
 * Soporta: q (búsqueda), marca (multi), potMin/potMax, cat (categoría), stock (multi), sub (subcategoría)
 */

'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import type { CatalogProduct, CatalogFilters, StockStatus } from '@/lib/catalog.types'

// ---------------------------------------------------------------------------
// Parsers de URL → Tipos
// ---------------------------------------------------------------------------

function parseFiltersFromParams(params: URLSearchParams): CatalogFilters & { cat?: string; stock?: StockStatus[] } {
  const marcas = params.getAll('marca').filter(Boolean)
  const potenciaMin = params.get('potMin') ? Number(params.get('potMin')) : undefined
  const potenciaMax = params.get('potMax') ? Number(params.get('potMax')) : undefined
  const q = params.get('q') || undefined
  const cat = params.get('cat') || undefined
  const sub = params.get('sub') || undefined
  const cashea = params.get('cashea') === 'true' ? 'true' : undefined
  const stock = params.getAll('stock').filter(Boolean) as StockStatus[]

  return { marcas, potenciaMin, potenciaMax, q, cat, stock: stock.length > 0 ? stock : undefined, cashea, sub }
}

// ---------------------------------------------------------------------------
// Hook Principal
// ---------------------------------------------------------------------------

export function useCatalogFilters(allProducts: CatalogProduct[]) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Parsear filtros actuales de la URL
  const filters = useMemo(
    () => parseFiltersFromParams(searchParams),
    [searchParams]
  )

  // Categoría activa (extraída de los filtros o del pathname)
  const activeCategory = useMemo(() => {
    if (filters.cat) return filters.cat
    const segments = pathname.split('/').filter(Boolean)
    // segments: ['catalogo', 'plomeria']
    if (segments[0] === 'catalogo' && segments[1]) {
      return segments[1]
    }
    return null
  }, [filters.cat, pathname])

  // ── Filtrado instantáneo (client-side) ──────────────────────────────────

  const filteredProducts = useMemo(() => {
    let result = allProducts

    // Filtro por categoría
    if (filters.cat) {
      result = result.filter((p) => p.category === filters.cat)
    }

    // Filtro por subcategoría o sub-ítem (con soporte de unificación para plomería)
    if (filters.sub) {
      const SUBITEM_UNIFICATION: Record<string, string[]> = {
        'linea-sanitaria-estandar': ['tuberia-sanitaria-estandar', 'conexiones-sanitarias-estandar'],
        'linea-sanitaria-reforzada': ['tuberia-sanitaria-reforzada', 'conexiones-sanitarias-reforzadas'],
        'linea-agua-fria': ['tuberia-agua-fria', 'conexiones-agua-fria'],
        'linea-galvanizada': ['conexiones-galvanizadas'],
        'linea-termofusion-ppr': ['tuberia-termofusion-ppr', 'conexiones-termofusion-ppr'],
        'griferia': [
          'monomandos-estandar',
          'monomandos-altos',
          'grifos-individuales',
          'juegos-twin',
          'griferia-institucional',
          'monomandos-profesionales',
          'monomandos-extensibles',
          'cuello-cisne-tradicional',
          'griferias-instalacion-pared',
          'mezcladoras-grifos-individuales',
          'llaves-arresto',
          'valvulas-industriales-pesadas',
          'valvulas-pvc',
          'valvulas-retencion-especiales',
          'llaves-chorro-manguera'
        ],
        'griferia-lavamanos': [
          'monomandos-estandar',
          'monomandos-altos',
          'grifos-individuales',
          'juegos-twin',
          'griferia-institucional'
        ],
        'griferia-fregadores': [
          'monomandos-profesionales',
          'monomandos-extensibles',
          'cuello-cisne-tradicional',
          'griferias-instalacion-pared',
          'mezcladoras-grifos-individuales'
        ],
        'valvulas-llaves': [
          'llaves-arresto',
          'valvulas-industriales-pesadas',
          'valvulas-pvc',
          'valvulas-retencion-especiales',
          'llaves-chorro-manguera'
        ]
      }
      const unified = SUBITEM_UNIFICATION[filters.sub]
      if (unified) {
        result = result.filter(
          (p) => p.subitem && unified.includes(p.subitem)
        )
      } else {
        result = result.filter(
          (p) => p.subcategory === filters.sub || p.subitem === filters.sub
        )
      }
    }

    // Filtro por marcas (multi-select OR)
    if (filters.marcas && filters.marcas.length > 0) {
      result = result.filter((p) =>
        filters.marcas!.includes(p.brand)
      )
    }

    // Filtro por potencia mínima
    if (filters.potenciaMin !== undefined) {
      result = result.filter(
        (p) => p.powerWatts !== undefined && p.powerWatts >= filters.potenciaMin!
      )
    }

    // Filtro por potencia máxima
    if (filters.potenciaMax !== undefined) {
      result = result.filter(
        (p) => p.powerWatts !== undefined && p.powerWatts <= filters.potenciaMax!
      )
    }

    // Filtro por disponibilidad (stock multi-select OR)
    if (filters.stock && filters.stock.length > 0) {
      result = result.filter((p) => filters.stock!.includes(p.status))
    }

    // Filtro por búsqueda libre (q)
    if (filters.q) {
      const term = filters.q.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.shortDescription.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.categoryLabel.toLowerCase().includes(term) ||
          p.reference?.toLowerCase().includes(term) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(term))
      )
    }

    // Filtro por Cashea
    if (filters.cashea === 'true') {
      result = result.filter((p) => p.isCasheaEligible)
    }

    // Ordenar por prioridad (tuberías primero, luego conexiones) y por nombre alfabéticamente
    return [...result].sort((a, b) => {
      const prioA = a.priority ?? 999
      const prioB = b.priority ?? 999
      if (prioA !== prioB) {
        return prioA - prioB
      }
      return a.name.localeCompare(b.name)
    })
  }, [allProducts, filters])

  // ── Mutadores de URL ────────────────────────────────────────────────────

  /**
   * Actualiza un SearchParam y navega (soft navigation = sin recarga).
   * Preserva todos los otros params existentes.
   */
  const updateParams = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      let targetPathname = pathname

      Object.entries(updates).forEach(([key, value]) => {
        if (key === 'cat') {
          // Si estamos cambiando de categoría principal
          if (value === null) {
            targetPathname = '/catalogo'
          } else if (typeof value === 'string') {
            targetPathname = `/catalogo/${value}`
          }
          // Limpiar subcategoría al cambiar de categoría
          params.delete('sub')
          params.delete('cat')
          return
        }

        // Eliminar el param si el valor es null o array vacío
        if (value === null || (Array.isArray(value) && value.length === 0)) {
          params.delete(key)
          return
        }
        if (Array.isArray(value)) {
          params.delete(key)
          value.forEach((v) => params.append(key, v))
        } else {
          params.set(key, value)
        }
      })

      router.push(`${targetPathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams]
  )

  /** Toggle de una marca en el filtro multi-select */
  const toggleBrand = useCallback(
    (brand: string) => {
      const currentBrands = filters.marcas ?? []
      const newBrands = currentBrands.includes(brand)
        ? currentBrands.filter((b) => b !== brand)
        : [...currentBrands, brand]
      updateParams({ marca: newBrands })
    },
    [filters.marcas, updateParams]
  )

  /** Limpiar todos los filtros */
  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [router, pathname])

  /** Contar filtros activos (para badge visual en botón de filtros) */
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.marcas?.length) count += filters.marcas.length
    if (filters.potenciaMin !== undefined) count++
    if (filters.potenciaMax !== undefined) count++
    if (filters.q) count++
    if (filters.cat) count++
    if (filters.sub) count++
    if (filters.cashea === 'true') count++
    if (filters.stock?.length) count += filters.stock.length
    return count
  }, [filters])

  return {
    filters,
    filteredProducts,
    toggleBrand,
    updateParams,
    clearFilters,
    activeFilterCount,
    activeCategory,
  }
}
