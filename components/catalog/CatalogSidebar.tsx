'use client'

/**
 * @file CatalogSidebar.tsx
 * @description Sidebar de filtros B2B estilo Grainger.
 *
 * Principios aplicados (frontend-ui-engineering.md):
 * - Componente focused: solo maneja la presentación de filtros.
 * - Estado en URL (SearchParams) via useCatalogFilters — no estado local duplicado.
 * - < 200 líneas.
 *
 * Principios aplicados (interaction-design.md):
 * - Desktop: columna fija izquierda ~260px con acordeones.
 * - Mobile: Drawer off-canvas accionado por botón flotante "Filtros".
 * - Transiciones suaves 200-300ms para apertura/cierre.
 *
 * Principios aplicados (accessibility-compliance.md):
 * - Todos los controles son <button> nativos.
 * - aria-expanded en acordeones.
 * - aria-pressed en pill buttons.
 * - Focus trap implícito via backdrop click-to-close.
 */

import { useState } from 'react'
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'
import type { CatalogFilters } from '@/lib/catalog.types'
import { CATALOG_BRANDS } from '@/lib/catalog.types'

// ── Constantes ─────────────────────────────────────────────────────────────

const AVAILABILITY_OPTIONS = [
  { value: 'available', label: '✓ Disponible' },
  { value: 'high-demand', label: '🔥 Alta rotación' },
  { value: 'new-batch', label: '📦 Nuevo lote' },
] as const

const SIDEBAR_CATEGORIES = [
  { slug: 'herramientas-general', label: 'Herramientas en General' },
  { slug: 'plomeria', label: 'Plomería' },
  { slug: 'iluminacion', label: 'Iluminación' },
  { slug: 'electricidad', label: 'Electricidad' },
  { slug: 'impermeabilizacion', label: 'Impermeabilización' },
]

// ── Tipos ──────────────────────────────────────────────────────────────────

export interface CatalogSidebarProps {
  filters: CatalogFilters
  activeFilterCount: number
  onToggleBrand: (brand: string) => void
  onUpdateParams: (updates: Record<string, string | string[] | null>) => void
  onClearFilters: () => void
  /** Categoría activa actual (slug de la URL, o null para 'todos') */
  activeCategory: string | null
  hideHeader?: boolean
}

// ── Componente de Acordeón reutilizable ────────────────────────────────────

function FilterAccordion({
  title,
  defaultOpen = true,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-4 px-2 text-sm font-bold text-gray-900 hover:text-black transition-colors"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gray-900' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[800px] opacity-100 pb-5' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-1">
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Contenido del Filtro (compartido entre Desktop y Mobile) ──────────────

export function FiltersContent({
  filters,
  activeFilterCount,
  onToggleBrand,
  onUpdateParams,
  onClearFilters,
  activeCategory,
  hideHeader = false,
}: CatalogSidebarProps) {
  return (
    <div className="space-y-0">
      {/* Cabecera */}
      {!hideHeader && (
        <div className="flex items-center justify-between pb-3 mb-1 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" aria-hidden="true" />
            <span className="text-sm font-black text-gray-900 uppercase tracking-wide">Filtros</span>
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 bg-yellow-400 text-black text-xs font-bold rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={onClearFilters}
              className="text-xs text-gray-500 hover:text-red-500 underline underline-offset-2 transition-colors"
              aria-label="Limpiar todos los filtros"
            >
              Limpiar
            </button>
          )}
        </div>
      )}

      {/* Si el header está oculto pero hay filtros activos, mostramos botón limpiar flotante o en algún lado */}
      {hideHeader && activeFilterCount > 0 && (
        <div className="flex justify-end mb-2">
          <button
            onClick={onClearFilters}
            className="text-xs text-red-500 font-bold hover:underline transition-colors"
          >
            Limpiar filtros ({activeFilterCount})
          </button>
        </div>
      )}

      {/* ── Filtro Especial: Cashea ── */}
      <div className="py-5 border-b border-gray-100">
        <label className="flex items-center justify-between cursor-pointer group px-2">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-yellow-50 rounded-lg border border-yellow-100 shadow-sm">
              <Image 
                src="/Cashea-Icono-Color.svg" 
                alt="Cashea" 
                width={22} 
                height={22} 
                className="rounded-sm" 
              />
            </div>
            <span className="text-sm font-bold text-gray-900 group-hover:text-black transition-colors">Solo Financiables Cashea</span>
          </div>
          {/* Custom Toggle Switch */}
          <div className="relative flex items-center">
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={filters.cashea === 'true'} 
              onChange={(e) => onUpdateParams({ cashea: e.target.checked ? 'true' : null })}
              aria-label="Filtrar solo productos financiables con Cashea"
            />
            <div className={`block w-10 h-6 rounded-full transition-colors duration-300 ${filters.cashea === 'true' ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${filters.cashea === 'true' ? 'translate-x-4' : 'translate-x-0 shadow-sm'}`}></div>
          </div>
        </label>
      </div>

      {/* ── Filtro: Categorías ── */}
      <FilterAccordion title="Categoría">
        <div className="space-y-1 px-1">
          {SIDEBAR_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.slug
            return (
              <button
                key={cat.slug}
                onClick={() => onUpdateParams({ cat: isActive ? null : cat.slug })}
                aria-pressed={isActive}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-yellow-400 text-black font-bold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </FilterAccordion>

      {/* ── Filtro: Marcas ── */}
      <FilterAccordion title="Marca">
        <div className="space-y-1 px-1">
          {CATALOG_BRANDS.map((brand) => {
            const isActive = filters.marcas?.includes(brand) ?? false
            return (
              <label
                key={brand}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-sm hover:bg-gray-100 transition-colors group"
              >
                <span
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    isActive
                      ? 'bg-yellow-400 border-yellow-400'
                      : 'border-gray-300 group-hover:border-gray-400'
                  }`}
                >
                  {isActive && (
                    <svg className="w-3 h-3 text-black" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => onToggleBrand(brand)}
                  className="sr-only"
                  aria-label={`Filtrar por marca ${brand}`}
                />
                <span className={`${isActive ? 'font-semibold text-black' : 'text-gray-600'}`}>
                  {brand}
                </span>
              </label>
            )
          })}
        </div>
      </FilterAccordion>

      {/* ── Filtro: Disponibilidad ── */}
      <FilterAccordion title="Disponibilidad">
        <div className="space-y-1 px-1">
          {AVAILABILITY_OPTIONS.map((opt) => {
            const currentStock = filters.stock ?? []
            const isActive = currentStock.includes(opt.value as CatalogFilters['stock'] extends (infer T)[] | undefined ? T : never)
            return (
              <button
                key={opt.value}
                onClick={() => {
                  const newStock = isActive
                    ? currentStock.filter((s) => s !== opt.value)
                    : [...currentStock, opt.value]
                  onUpdateParams({ stock: newStock.length > 0 ? newStock : null })
                }}
                aria-pressed={isActive}
                className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gray-900 text-white font-bold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </FilterAccordion>
    </div>
  )
}

// ── Desktop Sidebar ────────────────────────────────────────────────────────

export function DesktopCatalogSidebar(props: CatalogSidebarProps) {
  return (
    <aside
      className="hidden lg:block w-[260px] flex-shrink-0 sticky top-20 self-start max-h-[calc(100vh-80px)] overflow-y-auto bg-white border-r border-gray-200 p-4"
      aria-label="Filtros del catálogo"
    >
      <FiltersContent {...props} />
    </aside>
  )
}

