'use client'

/**
 * @file CatalogView.tsx
 * @description Vista de cliente del catálogo.
 * Orquesta FilterBar + lista de productos usando el hook useCatalogFilters.
 * Este es el único punto donde los SearchParams se leen en el cliente.
 */

import React, { useState } from 'react'
import { LayoutGrid, List, PackageX } from 'lucide-react'
import { FilterBar } from './FilterBar'
import { ProductRow } from './ProductRow'
import { ProductCard } from '@/components/catalog/ProductCard'
import { useCatalogFilters } from '@/hooks/useCatalogFilters'
import type { CatalogProduct } from '@/lib/catalog.types'

type ViewMode = 'list' | 'grid'

interface CatalogViewProps {
  products: CatalogProduct[]
  categoryLabel: string
}

export function CatalogView({ products, categoryLabel }: CatalogViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list')

  const {
    filters,
    filteredProducts,
    updateParams,
    clearFilters,
    activeFilterCount,
  } = useCatalogFilters(products)

  return (
    <div>
      {/* ── Barra de Filtros (Sticky debajo del Navbar en scroll) ── */}
      <div className="sticky top-16 z-40">
        <FilterBar
          filters={filters}
          totalResults={filteredProducts.length}
          activeFilterCount={activeFilterCount}
          onUpdateParams={updateParams}
          onClearFilters={clearFilters}
        />
      </div>

      {/* ── Toolbar: Vista y ordenamiento ── */}
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-2 bg-gray-50 border-b border-gray-200">
        <p className="text-xs text-gray-400 hidden md:block">
          Mostrando <strong className="text-gray-700">{categoryLabel}</strong>
        </p>

        {/* Toggle vista Lista / Grid */}
        <div
          role="group"
          aria-label="Modo de visualización"
          className="flex items-center bg-white border border-gray-200 rounded-lg p-0.5 gap-0.5"
        >
          <button
            onClick={() => setViewMode('list')}
            aria-pressed={viewMode === 'list'}
            aria-label="Vista en lista"
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-yellow-400 text-black'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <List className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
            aria-label="Vista en cuadrícula"
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-yellow-400 text-black'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Lista / Grid de Productos ── */}
      <div className="md:px-8 lg:px-16">
        {filteredProducts.length === 0 ? (
          /* Estado vacío */
          <div
            role="status"
            className="flex flex-col items-center justify-center py-20 gap-3 text-center"
          >
            <PackageX className="w-12 h-12 text-gray-300" aria-hidden="true" />
            <h2 className="text-base font-semibold text-gray-700">Sin resultados</h2>
            <p className="text-sm text-gray-500">
              Ningún producto coincide con los filtros seleccionados.
            </p>
            <button
              onClick={clearFilters}
              className="mt-2 px-4 py-2 bg-yellow-400 text-black text-sm font-bold rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Quitar filtros
            </button>
          </div>
        ) : viewMode === 'list' ? (
          /* Vista Lista — densa, McMaster-Carr */
          <ul role="list" className="divide-y divide-gray-100 bg-white md:rounded-lg md:overflow-hidden md:border md:border-gray-200">
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <ProductRow product={product} />
              </li>
            ))}
          </ul>
        ) : (
          /* Vista Grid — Grainger style cards */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 py-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
