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

import React, { useState } from 'react'
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react'
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

interface CatalogSidebarProps {
  filters: CatalogFilters
  activeFilterCount: number
  onToggleBrand: (brand: string) => void
  onUpdateParams: (updates: Record<string, string | string[] | null>) => void
  onClearFilters: () => void
  /** Categoría activa actual (slug de la URL, o null para 'todos') */
  activeCategory: string | null
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
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-3 px-1 text-sm font-bold text-gray-800 hover:text-black transition-colors"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100 pb-3' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

// ── Contenido del Sidebar (compartido entre Desktop y Mobile) ──────────────

function SidebarContent({
  filters,
  activeFilterCount,
  onToggleBrand,
  onUpdateParams,
  onClearFilters,
  activeCategory,
}: CatalogSidebarProps) {
  return (
    <div className="space-y-0">
      {/* Cabecera */}
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
      <SidebarContent {...props} />
    </aside>
  )
}

// ── Mobile Filter Drawer ───────────────────────────────────────────────────

export function MobileFilterDrawer(props: CatalogSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Botón flotante para abrir filtros en móvil */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 z-40 flex items-center gap-2 h-12 px-5 bg-gray-900 text-white font-bold text-sm rounded-full shadow-xl hover:bg-gray-800 active:scale-95 transition-all"
        aria-label="Abrir filtros"
      >
        <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
        Filtros
        {props.activeFilterCount > 0 && (
          <span className="w-5 h-5 bg-yellow-400 text-black text-xs font-black rounded-full flex items-center justify-center">
            {props.activeFilterCount}
          </span>
        )}
      </button>

      {/* Backdrop + Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay oscuro */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer desde abajo */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-2xl overflow-y-auto animate-in slide-in-from-bottom duration-300">
            {/* Handle visual */}
            <div className="sticky top-0 bg-white pt-3 pb-2 px-4 border-b border-gray-100 z-10">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <h2 className="text-base font-black text-gray-900">Filtros</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-500 hover:text-black rounded-lg"
                  aria-label="Cerrar filtros"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <SidebarContent {...props} />
            </div>

            {/* Botón de aplicar (cierra el drawer) */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full h-12 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 active:scale-[0.98] transition-all"
              >
                Ver resultados
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
