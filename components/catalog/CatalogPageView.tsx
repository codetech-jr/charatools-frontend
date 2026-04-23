'use client'

/**
 * @file CatalogPageView.tsx
 * @description Orquestador de la página del catálogo B2B.
 *
 * Composición (frontend-ui-engineering.md pattern: Container/Presentation):
 * - Este componente ORQUESTA el layout (Sidebar + ResultsPanel).
 * - No contiene lógica de filtrado (delegada a useCatalogFilters).
 * - No contiene lógica de renderizado de productos (delegada a CatalogResultsPanel).
 *
 * Layout:
 * - Desktop: Sidebar izquierda (260px) + Panel de resultados (flex-1)
 * - Mobile: Solo panel de resultados + Drawer flotante de filtros
 */

import React, { Suspense } from 'react'
import { DesktopCatalogSidebar } from './CatalogSidebar'
import type { CatalogSidebarProps } from './CatalogSidebar'
import { CatalogResultsPanel } from './CatalogResultsPanel'
import { useCatalogFilters } from '@/hooks/useCatalogFilters'
import type { CatalogProduct } from '@/lib/catalog.types'

interface CatalogPageViewProps {
  products: CatalogProduct[]
}

function CatalogPageViewInner({ products }: CatalogPageViewProps) {
  const {
    filters,
    filteredProducts,
    toggleBrand,
    updateParams,
    clearFilters,
    activeFilterCount,
    activeCategory,
  } = useCatalogFilters(products)

  // Determinar label de la categoría activa
  const categoryLabel = activeCategory
    ? products.find(p => p.category === activeCategory)?.categoryLabel ?? 'Catálogo'
    : 'Todo el Catálogo'

  const sidebarProps: CatalogSidebarProps = {
    filters,
    activeFilterCount,
    onToggleBrand: toggleBrand,
    onUpdateParams: updateParams,
    onClearFilters: clearFilters,
    activeCategory,
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ── Sidebar Desktop ── */}
      <DesktopCatalogSidebar {...sidebarProps} />

      {/* ── Panel Central de Resultados ── */}
      <CatalogResultsPanel
        products={filteredProducts}
        categoryLabel={categoryLabel}
        activeCategory={activeCategory}
        onClearFilters={clearFilters}
        sidebarProps={sidebarProps}
      />
    </div>
  )
}

// Wrapping con Suspense por useSearchParams()
export function CatalogPageView({ products }: CatalogPageViewProps) {
  return (
    <Suspense fallback={<CatalogPageSkeleton />}>
      <CatalogPageViewInner products={products} />
    </Suspense>
  )
}

// ── Skeleton de carga ──────────────────────────────────────────────────────

function CatalogPageSkeleton() {
  return (
    <div className="flex min-h-screen bg-gray-50" aria-busy="true" aria-label="Cargando catálogo">
      {/* Sidebar skeleton (desktop) */}
      <div className="hidden lg:block w-[260px] bg-white border-r border-gray-200 p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
      {/* Grid skeleton */}
      <div className="flex-1 p-4 space-y-3">
        <div className="h-10 bg-gray-100 rounded-lg animate-pulse w-64" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-lg">
            <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
