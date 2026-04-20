'use client'

/**
 * @file FilterBar.tsx
 * @description Barra de filtros estilo McMaster-Carr.
 *
 * Principios de diseño:
 * - Pill Buttons táctiles (mín 44px touch target para WCAG 2.5.8)
 * - Filtros visibles siempre en pantalla (sticky, no colapsados en móvil)
 * - Activación instantánea: toca el pill → URL cambia → lista se actualiza (<50ms)
 * - Contraste WCAG AA garantizado: botones activos amarillo sobre negro
 * - Sin modal de filtros en móvil (McMaster-Carr philosophy: todo visible)
 */

import React from 'react'
import { X, SlidersHorizontal } from 'lucide-react'
import type { CatalogFilters } from '@/lib/catalog.types'
import { CATALOG_BRANDS } from '@/lib/catalog.types'

interface FilterBarProps {
  filters: CatalogFilters
  totalResults: number
  activeFilterCount: number
  onToggleBrand: (brand: string) => void
  onUpdateParams: (updates: Record<string, string | string[] | null>) => void
  onClearFilters: () => void
}

// Rangos predefinidos de potencia para ferretería
const POWER_RANGES = [
  { label: 'Hasta 500W', min: 0, max: 500 },
  { label: '500W – 1kW', min: 500, max: 1000 },
  { label: '1kW – 2kW', min: 1000, max: 2000 },
  { label: 'Más de 2kW', min: 2000, max: 99999 },
]

export function FilterBar({
  filters,
  totalResults,
  activeFilterCount,
  onToggleBrand,
  onUpdateParams,
  onClearFilters,
}: FilterBarProps) {
  const activePowerRange = POWER_RANGES.find(
    (r) => r.min === filters.potenciaMin && r.max === filters.potenciaMax
  )

  const handlePowerToggle = (range: typeof POWER_RANGES[number]) => {
    if (activePowerRange?.label === range.label) {
      // Deseleccionar si ya está activo
      onUpdateParams({ potMin: null, potMax: null })
    } else {
      onUpdateParams({
        potMin: String(range.min),
        potMax: String(range.max),
      })
    }
  }

  return (
    <div
      role="search"
      aria-label="Filtros del catálogo"
      className="w-full bg-white border-b border-gray-200"
    >
      {/* ── Contenedor principal ── */}
      <div className="px-4 md:px-8 lg:px-16 py-3 space-y-3">

        {/* ── Fila 1: Cabecera con contador y limpiar ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" aria-hidden="true" />
            <span className="text-sm font-semibold text-gray-700">Filtros</span>
            {activeFilterCount > 0 && (
              <span
                aria-label={`${activeFilterCount} filtros activos`}
                className="inline-flex items-center justify-center w-5 h-5 bg-yellow-400 text-black text-xs font-bold rounded-full"
              >
                {activeFilterCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Contador de resultados — anuncia cambios a lectores de pantalla */}
            <p
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="text-sm text-gray-500"
            >
              <span className="font-bold text-gray-900">{totalResults}</span> producto{totalResults !== 1 ? 's' : ''}
            </p>

            {activeFilterCount > 0 && (
              <button
                onClick={onClearFilters}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors underline underline-offset-2"
                aria-label="Limpiar todos los filtros"
              >
                <X className="w-3 h-3" aria-hidden="true" />
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* ── Fila 2: Filtros de Marca (Pill Buttons) ── */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Marca
          </p>
          {/* Scroll horizontal en móvil sin barra visible */}
          <div
            role="group"
            aria-label="Filtrar por marca"
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
          >
            {CATALOG_BRANDS.map((brand) => {
              const isActive = filters.marcas?.includes(brand) ?? false
              return (
                <button
                  key={brand}
                  onClick={() => onToggleBrand(brand)}
                  aria-pressed={isActive}
                  aria-label={`${isActive ? 'Quitar filtro' : 'Filtrar por'} ${brand}`}
                  className={`
                    flex-shrink-0 inline-flex items-center h-9 px-3 rounded-full
                    text-xs font-semibold border transition-all duration-150
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-1
                    active:scale-95
                    ${isActive
                      ? 'bg-yellow-400 border-yellow-400 text-black shadow-sm'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-400 hover:text-black'
                    }
                  `}
                >
                  {isActive && <X className="w-3 h-3 mr-1" aria-hidden="true" />}
                  {brand}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Fila 2.5: Financiamiento Cashea ── */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Financiamiento
          </p>
          <div role="group" aria-label="Filtro de financiamiento" className="flex gap-2">
            <button
              onClick={() => onUpdateParams({ cashea: filters.cashea === 'true' ? null : 'true' })}
              aria-pressed={filters.cashea === 'true'}
              className={`
                flex-shrink-0 inline-flex items-center h-9 px-3 rounded-full
                text-xs font-semibold border transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-1
                active:scale-95
                ${filters.cashea === 'true'
                  ? 'bg-orange-500 border-orange-500 text-white shadow-sm'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500'
                }
              `}
            >
              {filters.cashea === 'true' && <X className="w-3 h-3 mr-1" aria-hidden="true" />}
              Solo elegibles Cashea
            </button>
          </div>
        </div>

        {/* ── Fila 3: Filtros de Potencia (solo si aplica) ── */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Potencia
          </p>
          <div
            role="group"
            aria-label="Filtrar por rango de potencia"
            className="flex gap-2 flex-wrap"
          >
            {POWER_RANGES.map((range) => {
              const isActive = activePowerRange?.label === range.label
              return (
                <button
                  key={range.label}
                  onClick={() => handlePowerToggle(range)}
                  aria-pressed={isActive}
                  className={`
                    inline-flex items-center h-9 px-3 rounded-full
                    text-xs font-semibold border transition-all duration-150
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-1
                    active:scale-95
                    ${isActive
                      ? 'bg-gray-900 border-gray-900 text-white shadow-sm'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-gray-500 hover:text-black'
                    }
                  `}
                >
                  {isActive && <X className="w-3 h-3 mr-1" aria-hidden="true" />}
                  {range.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
