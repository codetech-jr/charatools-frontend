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
import { CATEGORIES, SubItem } from '@/components/global/MegaMenu'

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
  { slug: 'seguridad-industrial', label: 'Seguridad Industrial' },
]

// ── Tipos ──────────────────────────────────────────────────────────────────

export interface CatalogSidebarProps {
  filters: CatalogFilters
  activeFilterCount: number
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
  onUpdateParams,
  onClearFilters,
  activeCategory,
  hideHeader = false,
}: CatalogSidebarProps) {
  const [manuallyToggled, setManuallyToggled] = useState<Record<string, boolean>>({})
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})
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

      {/* ── Filtro: Categorías ── */}
      <FilterAccordion title="Categoría">
        <div className="space-y-2 px-1">
          {SIDEBAR_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.slug
            const catData = CATEGORIES.find(c => c.id === cat.slug)
            const hasSubcategories = catData && catData.subcategories && catData.subcategories.length > 0

            return (
              <div key={cat.slug} className="space-y-1.5">
                <button
                  key={cat.slug}
                  onClick={() => onUpdateParams({ cat: isActive ? null : cat.slug })}
                  aria-pressed={isActive}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    isActive
                      ? 'bg-yellow-400 text-black font-bold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-black font-medium'
                  }`}
                >
                  {cat.label}
                </button>

                {/* Si la categoría está activa, renderizar sus subcategorías anidadas */}
                {isActive && hasSubcategories && (
                  <div className="pl-4 border-l border-gray-200 ml-3.5 py-1 space-y-2">
                    {catData.subcategories.map((sub) => {
                      const urlParts = sub.href.split('sub=')
                      const subSlug = urlParts[1] || ''
                      const isSubActive = filters.sub === subSlug
                      const hasSubItems = sub.items && sub.items.length > 0

                      const hasActiveChild = sub.items?.some(item => {
                        const itemParts = item.href.split('sub=')
                        const itemSubSlug = itemParts[1] || ''
                        return filters.sub === itemSubSlug
                      })

                      const isExpanded = (() => {
                        if (manuallyToggled[subSlug] !== undefined) {
                          return manuallyToggled[subSlug]
                        }
                        return isSubActive || hasActiveChild
                      })()

                      return (
                        <div key={sub.name} className="space-y-1">
                          <div className={`w-full flex items-center justify-between gap-1 rounded-lg transition-all ${
                            isSubActive
                              ? 'bg-yellow-50 border border-yellow-200/50 shadow-sm'
                              : 'hover:bg-gray-50'
                          }`}>
                            <button
                              onClick={() => {
                                onUpdateParams({ sub: isSubActive ? null : subSlug })
                                if (!isSubActive) {
                                  setManuallyToggled(prev => ({ ...prev, [subSlug]: true }))
                                }
                              }}
                              aria-pressed={isSubActive}
                              className={`flex-1 text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                isSubActive ? 'text-yellow-800 font-bold' : 'text-gray-600 hover:text-black'
                              }`}
                            >
                              <span className="whitespace-normal break-words">{sub.name}</span>
                            </button>
                            {hasSubItems && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setManuallyToggled(prev => ({
                                    ...prev,
                                    [subSlug]: !isExpanded
                                  }))
                                }}
                                className="p-1.5 mr-1 hover:bg-gray-200/40 rounded-md transition-colors flex items-center justify-center"
                                aria-label={isExpanded ? "Colapsar subcategoría" : "Expandir subcategoría"}
                              >
                                <ChevronDown
                                  className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                                    isExpanded ? 'rotate-180 text-gray-900' : ''
                                  }`}
                                />
                              </button>
                            )}
                          </div>

                          {/* Mostrar sub-ítems de tercer nivel (líneas) */}
                          {hasSubItems && (
                            <div
                              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                isExpanded ? 'max-h-[800px] opacity-100 mt-1 pl-3 border-l border-gray-200 ml-3 py-0.5 space-y-1' : 'max-h-0 opacity-0'
                              }`}
                            >
                              {(() => {
                                const groupedItems: Array<
                                  | { type: 'flat'; item: SubItem }
                                  | { type: 'group'; header: SubItem; children: SubItem[] }
                                > = []

                                sub.items!.forEach((item) => {
                                  if (item.isHeader) {
                                    groupedItems.push({ type: 'group', header: item, children: [] })
                                  } else if (item.isIndented) {
                                    const lastGroup = groupedItems[groupedItems.length - 1]
                                    if (lastGroup && lastGroup.type === 'group') {
                                      lastGroup.children.push(item)
                                    } else {
                                      groupedItems.push({ type: 'flat', item })
                                    }
                                  } else {
                                    groupedItems.push({ type: 'flat', item })
                                  }
                                })

                                return groupedItems.map((gItem) => {
                                  if (gItem.type === 'flat') {
                                    const item = gItem.item
                                    const itemParts = item.href.split('sub=')
                                    const itemSubSlug = itemParts[1] || ''
                                    const isItemActive = filters.sub === itemSubSlug

                                    return (
                                      <button
                                        key={item.name}
                                        onClick={() => onUpdateParams({ sub: isItemActive ? null : itemSubSlug })}
                                        aria-pressed={isItemActive}
                                        className={`w-full text-left px-2 py-1 rounded-md text-xs transition-all flex items-start gap-1.5 whitespace-normal break-words ${
                                          isItemActive
                                            ? 'text-yellow-600 font-bold bg-yellow-50/50'
                                            : 'text-gray-500 hover:text-black hover:bg-gray-50'
                                        }`}
                                      >
                                        <span className={`w-1 h-1 rounded-full flex-shrink-0 mt-1.5 ${isItemActive ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                                        <span className="whitespace-normal break-words text-left">{item.name}</span>
                                      </button>
                                    )
                                  } else {
                                    const header = gItem.header
                                    const headerParts = header.href.split('sub=')
                                    const headerSubSlug = headerParts[1] || ''
                                    const isHeaderActive = filters.sub === headerSubSlug

                                    const hasActiveChild = gItem.children.some(child => {
                                      const childParts = child.href.split('sub=')
                                      const childSubSlug = childParts[1] || ''
                                      return filters.sub === childSubSlug
                                    })

                                    const isGroupExpanded = (() => {
                                      if (expandedGroups[headerSubSlug] !== undefined) {
                                        return expandedGroups[headerSubSlug]
                                      }
                                      return isHeaderActive || hasActiveChild
                                    })()

                                    return (
                                      <div key={header.name} className="space-y-1">
                                        <div className={`w-full flex items-center justify-between gap-1 rounded-md transition-all ${
                                          isHeaderActive
                                            ? 'bg-yellow-50/50'
                                            : 'hover:bg-gray-50'
                                        }`}>
                                          <button
                                            onClick={() => {
                                              onUpdateParams({ sub: isHeaderActive ? null : headerSubSlug })
                                              if (!isHeaderActive) {
                                                setExpandedGroups(prev => ({ ...prev, [headerSubSlug]: true }))
                                              }
                                            }}
                                            aria-pressed={isHeaderActive}
                                            className={`flex-1 text-left px-2 py-1.5 rounded-md text-[10px] uppercase tracking-wider font-extrabold transition-all ${
                                              isHeaderActive ? 'text-yellow-700' : 'text-gray-900 hover:text-yellow-600'
                                            }`}
                                          >
                                            <span className="whitespace-normal break-words text-left">{header.name}</span>
                                          </button>
                                          {gItem.children.length > 0 && (
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                setExpandedGroups(prev => ({
                                                  ...prev,
                                                  [headerSubSlug]: !isGroupExpanded
                                                }))
                                              }}
                                              className="p-1 mr-1 hover:bg-gray-200/40 rounded-md transition-colors flex items-center justify-center"
                                              aria-label={isGroupExpanded ? "Colapsar grupo" : "Expandir grupo"}
                                            >
                                              <ChevronDown
                                                className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
                                                  isGroupExpanded ? 'rotate-180 text-gray-900' : ''
                                                }`}
                                              />
                                            </button>
                                          )}
                                        </div>

                                        {gItem.children.length > 0 && (
                                          <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                              isGroupExpanded ? 'max-h-[500px] opacity-100 pl-3 border-l border-gray-200 ml-2 py-0.5 space-y-1' : 'max-h-0 opacity-0'
                                            }`}
                                          >
                                            {gItem.children.map((child) => {
                                              const childParts = child.href.split('sub=')
                                              const childSubSlug = childParts[1] || ''
                                              const isChildActive = filters.sub === childSubSlug

                                              return (
                                                <button
                                                  key={child.name}
                                                  onClick={() => onUpdateParams({ sub: isChildActive ? null : childSubSlug })}
                                                  aria-pressed={isChildActive}
                                                  className={`w-full text-left px-2 py-1 rounded-md text-xs transition-all flex items-start gap-1.5 whitespace-normal break-words ${
                                                    isChildActive
                                                      ? 'text-yellow-600 font-bold bg-yellow-50/50'
                                                      : 'text-gray-500 hover:text-black hover:bg-gray-50'
                                                  }`}
                                                >
                                                  <span className={`w-1 h-1 rounded-full flex-shrink-0 mt-1.5 ${isChildActive ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                                                  <span className="whitespace-normal break-words text-left">{child.name}</span>
                                                </button>
                                              )
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    )
                                  }
                                })
                              })()}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
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

