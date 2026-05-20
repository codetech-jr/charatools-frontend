'use client'

/**
 * @file CatalogResultsPanel.tsx
 * @description Panel central de resultados del catálogo B2B.
 *
 * Contiene:
 * - [SEO] SeoCategoryHero encima del grid (renderizado defensivo).
 * - Header: Breadcrumbs, total de resultados, dropdown de ordenamiento, toggle list/grid.
 * - Grid/Lista responsive: grid-cols-2 (mobile) → grid-cols-4 (xl).
 * - Empty state con CTA para limpiar filtros.
 * - [SEO] SeoCategoryFooter debajo del grid (renderizado defensivo).
 *
 * Programación defensiva SEO:
 * - Si `activeCategory` no tiene entrada en `seoCategoryData`, los bloques
 *   Hero y Footer simplemente no se renderizan. El grid funciona normal.
 * - NUNCA lanzar error por ausencia de copy SEO.
 *
 * Principios (frontend-ui-engineering.md):
 * - Componente focused: solo presentación del grid de resultados.
 * - Recibe datos filtrados como prop (no filtra internamente).
 */

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { LayoutGrid, List, PackageX, ArrowUpDown, SlidersHorizontal } from 'lucide-react'
import { ProductCard } from './ProductCard'
import { ProductRow } from './ProductRow'
import type { CatalogProduct } from '@/lib/catalog.types'
import { SeoCategoryHero } from '@/components/seo/SeoCategoryHero'
import { SeoCategoryFooter } from '@/components/seo/SeoCategoryFooter'
import { seoCategoryData } from '@/lib/seoCategoryData'

import type { CatalogSidebarProps } from './CatalogSidebar'
import { FiltersContent } from './CatalogSidebar'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader, SheetClose } from '@/components/ui/sheet'

// ── Tipos ──────────────────────────────────────────────────────────────────

type ViewMode = 'list' | 'grid'
type SortOption = 'relevance' | 'name-asc' | 'name-desc' | 'brand'

interface CatalogResultsPanelProps {
  products: CatalogProduct[]
  categoryLabel: string
  activeCategory: string | null
  onClearFilters: () => void
  sidebarProps: CatalogSidebarProps
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'name-asc', label: 'A → Z' },
  { value: 'name-desc', label: 'Z → A' },
  { value: 'brand', label: 'Marca' },
]

// ── Componente Principal ───────────────────────────────────────────────────

export function CatalogResultsPanel({
  products,
  categoryLabel,
  activeCategory,
  onClearFilters,
  sidebarProps,
}: CatalogResultsPanelProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [sortBy, setSortBy] = useState<SortOption>('relevance')

  // Ordenar productos client-side
  const sortedProducts = useMemo(() => {
    const sorted = [...products]
    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name, 'es'))
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name, 'es'))
      case 'brand':
        return sorted.sort((a, b) => a.brand.localeCompare(b.brand, 'es'))
      default:
        return sorted
    }
  }, [products, sortBy])

  // ── Lookup defensivo de datos SEO ──────────────────────────────────────
  // `seoData` será `undefined` si la categoría aún no tiene copy redactado.
  // Los componentes Hero/Footer solo se montan si `seoData` existe.
  const seoData = activeCategory ? seoCategoryData[activeCategory] : undefined

  return (
    <div className="flex-1 min-w-0">
      {/* ── [SEO] Hero de Categoría ─────────────────────────────────────
           Renderizado defensivo: solo aparece si hay copy para este slug.
           El H1 reemplaza visualmente al título del header anterior.
      ── */}
      {seoData && (
        <SeoCategoryHero
          title={seoData.title}
          description={seoData.description}
        />
      )}

      {/* ── Header: Breadcrumbs + Controles ── */}
      <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3">
        {/* Breadcrumbs */}
        <nav aria-label="Migas de pan" className="mb-2">
          <ol className="flex items-center gap-1 text-xs text-gray-400">
            <li><Link href="/" className="hover:text-gray-700 transition-colors">Inicio</Link></li>
            <li aria-hidden="true" className="mx-0.5">›</li>
            <li>
              {activeCategory ? (
                <Link href="/catalogo" className="hover:text-gray-700 transition-colors">Catálogo</Link>
              ) : (
                <span aria-current="page" className="text-gray-700 font-medium">Catálogo</span>
              )}
            </li>
            {activeCategory && (
              <>
                <li aria-hidden="true" className="mx-0.5">›</li>
                <li aria-current="page" className="text-gray-700 font-medium">{categoryLabel}</li>
              </>
            )}
          </ol>
        </nav>

        {/* Toolbar: Contador + Sort + Toggle + Filtros Mobile */}
        <div className="flex items-center justify-between gap-3">
          {/* Contador de resultados */}
          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="text-sm text-gray-500"
          >
            <span className="font-bold text-gray-900">{sortedProducts.length}</span>{' '}
            producto{sortedProducts.length !== 1 ? 's' : ''}
          </p>

          <div className="flex items-center gap-2">
            {/* Filtros Mobile Trigger (Solo visible en pantallas pequeñas) */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg px-3 h-10 text-xs font-black text-gray-900 shadow-sm transition-all active:scale-95"
                    aria-label="Abrir filtros"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-gray-500" aria-hidden="true" />
                    <span>Filtros</span>
                    {sidebarProps.activeFilterCount > 0 && (
                      <span className="flex items-center justify-center min-w-[18px] h-[18px] bg-yellow-400 text-black text-[10px] font-black rounded-full px-1">
                        {sidebarProps.activeFilterCount}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85%] sm:max-w-sm p-0 bg-white border-r border-gray-200 shadow-2xl flex flex-col h-full">
                  <SheetHeader className="px-5 pt-6 pb-4 border-b border-gray-100 bg-white flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="text-xl font-black text-gray-900 tracking-tight">Filtros</SheetTitle>
                    </div>
                    <SheetDescription className="sr-only">
                      Opciones para filtrar productos en el catálogo
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto px-5 py-2 bg-white">
                    <FiltersContent {...sidebarProps} hideHeader={true} />
                  </div>
                  <div className="p-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
                    <SheetClose asChild>
                      <button 
                        className="w-full h-12 bg-yellow-400 text-black font-black text-sm rounded-xl hover:bg-yellow-500 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                        aria-label="Aplicar filtros y cerrar"
                      >
                        Ver {products.length} producto{products.length !== 1 ? 's' : ''}
                      </button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Dropdown Ordenar */}
            <div className="relative">
              <label htmlFor="sort-select" className="sr-only">Ordenar por</label>
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 h-9">
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent text-xs font-medium text-gray-700 focus:outline-none cursor-pointer pr-1"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Toggle Lista / Grid */}
            <div
              role="group"
              aria-label="Modo de visualización"
              className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5 gap-0.5"
            >
              <button
                onClick={() => setViewMode('list')}
                aria-pressed={viewMode === 'list'}
                aria-label="Vista en lista"
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-400 hover:text-gray-700'
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
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                <LayoutGrid className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Resultados ── */}
      <div className="px-0 lg:px-2 py-2">
        {sortedProducts.length === 0 ? (
          <div
            role="status"
            className="flex flex-col items-center justify-center py-20 gap-3 text-center"
          >
            <PackageX className="w-12 h-12 text-gray-300" aria-hidden="true" />
            <h2 className="text-base font-semibold text-gray-700">Sin resultados</h2>
            <p className="text-sm text-gray-500 max-w-xs">
              Ningún producto coincide con los filtros seleccionados. Intenta con menos restricciones.
            </p>
            <button
              onClick={onClearFilters}
              className="mt-2 px-5 py-2.5 bg-yellow-400 text-black text-sm font-bold rounded-lg hover:bg-yellow-500 active:scale-95 transition-all"
            >
              Quitar todos los filtros
            </button>
          </div>
        ) : viewMode === 'list' ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 bg-white lg:rounded-lg lg:overflow-hidden lg:border lg:border-gray-200"
          >
            {sortedProducts.map((product) => (
              <li key={product.id}>
                <ProductRow product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 p-2">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* ── [SEO] Footer de Categoría ─────────────────────────────────────
           Renderizado defensivo: solo aparece si hay copy para este slug.
           Texto siempre en DOM (max-height CSS) → indexable por Googlebot.
      ── */}
      {seoData && (
        <SeoCategoryFooter
          blocks={seoData.blocks}
          ctaSection={{
            closingText: `${seoData.ctaSection.title} — ${seoData.ctaSection.text}`,
            ctaLabel: seoData.ctaSection.btnText,
            ctaHref:
              'https://api.whatsapp.com/send?phone=584220148405&text=' +
              encodeURIComponent(
                `¡Hola! Estoy viendo la categoría "${categoryLabel}" en Charatools y necesito asesoría.`
              ),
          }}
        />
      )}
    </div>
  )
}
