'use client'

/**
 * @file components/product/ProductVariantSelector.tsx
 * @description Selector de variantes de producto (medidas, diámetros, calibres).
 *
 * Renderiza pills seleccionables para que el usuario elija una medida antes de cotizar.
 * La selección es OPCIONAL — el botón de cotizar no se deshabilita.
 *
 * Accesibilidad:
 *   - Contenedor con role="radiogroup" + aria-labelledby
 *   - Cada pill tiene role="radio" + aria-checked + aria-disabled
 *   - Navegable con Tab (los pills individuales son focusables)
 *   - Pills agotados: aria-disabled="true", tabIndex=-1, estilo tachado
 */

import React from 'react'
import type { ProductVariant } from '@/lib/catalog.types'

interface ProductVariantSelectorProps {
  /** Lista de variantes a mostrar */
  variants: ProductVariant[]
  /** Etiqueta del selector (ej: "Diámetro", "Calibre"). Default: "Medida" */
  variantLabel?: string
  /** Variante actualmente seleccionada (null si ninguna) */
  selectedVariant: string | null
  /** Callback cuando el usuario elige una variante */
  onSelect: (value: string) => void
}

export function ProductVariantSelector({
  variants,
  variantLabel = 'Medida',
  selectedVariant,
  onSelect,
}: ProductVariantSelectorProps) {
  const labelId = React.useId()

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    value: string,
    outOfStock: boolean,
  ) => {
    if (outOfStock) return
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      // Toggle: si ya está seleccionado, deseleccionar
      onSelect(selectedVariant === value ? '' : value)
    }
  }

  return (
    <div className="space-y-2.5">
      {/* Encabezado del selector */}
      <div className="flex items-center gap-2">
        <h2
          id={labelId}
          className="text-xs font-black text-gray-400 uppercase tracking-widest"
        >
          {variantLabel}
        </h2>
        {selectedVariant && (
          <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-200">
            {selectedVariant}
          </span>
        )}
      </div>

      {/* Pills */}
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        className="flex flex-wrap gap-2"
      >
        {variants.map((variant) => {
          const isSelected = selectedVariant === variant.value
          const isDisabled = variant.outOfStock === true
          const displayLabel = variant.label ?? variant.value

          return (
            <button
              key={variant.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isDisabled}
              disabled={isDisabled}
              tabIndex={isDisabled ? -1 : 0}
              onClick={() => {
                if (isDisabled) return
                // Toggle: click en seleccionado → deselecciona
                onSelect(isSelected ? '' : variant.value)
              }}
              onKeyDown={(e) => handleKeyDown(e, variant.value, isDisabled)}
              title={isDisabled ? `${displayLabel} — Sin stock` : displayLabel}
              className={[
                // Base
                'relative inline-flex items-center justify-center',
                'min-w-[52px] h-10 px-3.5 rounded-xl',
                'text-sm font-bold',
                'border-2 transition-all duration-150',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-yellow-400',
                // Estados
                isDisabled
                  ? // Agotado
                    'bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed line-through decoration-gray-300'
                  : isSelected
                    ? // Seleccionado
                      'bg-yellow-400 border-yellow-400 text-black shadow-md shadow-yellow-200/60 scale-[1.04]'
                    : // Normal hover
                      'bg-white border-gray-200 text-gray-700 hover:border-yellow-400 hover:text-yellow-700 hover:bg-yellow-50 active:scale-95',
              ].join(' ')}
            >
              {displayLabel}

              {/* Badge "agotado" */}
              {isDisabled && (
                <span className="sr-only"> — Sin stock</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Hint de disponibilidad si hay agotados */}
      {variants.some((v) => v.outOfStock) && (
        <p className="text-[10px] text-gray-400 leading-snug">
          Las medidas tachadas están temporalmente sin stock.
        </p>
      )}
    </div>
  )
}
