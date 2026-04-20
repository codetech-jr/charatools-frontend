'use client'

/**
 * @file components/catalog/AddToQuoteButton.tsx
 * @description Client Island — Botón de cotización para la página de detalle.
 *
 * react-best-practices:
 *   - 'rerender-derived-state': suscripción a selector booleano derivado
 *     (isInQuotation) en lugar del array completo de items → O(1) re-renders.
 *   - 'rerender-functional-setstate': addItem usa setState funcional en el store.
 *   - 'bundle-dynamic-imports': este componente es importado con next/dynamic
 *     en el Server Component padre → no bloquea el parse del HTML inicial.
 *
 * UX:
 *   - Estado visual: Agregar / ✓ En tu lista / Sin stock
 *   - Al agregar, abre el QuotationDrawer automáticamente (UX B2B: confirmación
 *     inmediata sin abandonar la página).
 *   - Feedback micro-animación: escala al presionar (active:scale-95).
 */

import React from 'react'
import { Plus, Check, ShoppingCart } from 'lucide-react'
import { useQuotationStore } from '@/store/quotationStore'
import type { CatalogProduct } from '@/lib/catalog.types'

interface AddToQuoteButtonProps {
  product: CatalogProduct
}

export default function AddToQuoteButton({ product }: AddToQuoteButtonProps) {
  const [mounted, setMounted] = React.useState(false)
  const [justAdded, setJustAdded] = React.useState(false)

  // react-best-practices: rerender-derived-state
  // Suscripción a selector booleano derivado — evita re-render completo
  const isInQuotation = useQuotationStore(
    (s) => s.items.some((i) => i.id === product.id)
  )

  const addItem = useQuotationStore((s) => s.addItem)
  const setDrawerOpen = useQuotationStore((s) => s.setDrawerOpen)

  // Evitar flash de hidratación
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isOutOfStock = product.status === 'out-of-stock'

  const handleAdd = () => {
    if (isOutOfStock || isInQuotation) return

    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      reference: product.reference,
      unit: product.unit,
      qty: 1,
    })

    // Micro-feedback visual
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)

    // Abre el drawer para confirmar la cotización (UX B2B)
    setTimeout(() => setDrawerOpen(true), 250)
  }

  // Skeleton mientras hidrata (previene layout shift)
  if (!mounted) {
    return (
      <div
        className="w-full h-14 bg-gray-100 rounded-xl animate-pulse"
        aria-hidden="true"
      />
    )
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleAdd}
        disabled={isOutOfStock || isInQuotation}
        aria-label={
          isOutOfStock
            ? 'Sin stock — no disponible para cotizar'
            : isInQuotation
              ? `${product.name} ya está en tu lista`
              : `Agregar ${product.name} a mi cotización`
        }
        aria-pressed={isInQuotation}
        className={`
          w-full h-14 rounded-xl font-bold text-base flex items-center justify-center gap-2.5
          transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400
          ${isOutOfStock
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : isInQuotation
              ? 'bg-white border-2 border-yellow-400 text-gray-900 cursor-default'
              : justAdded
                ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                : 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg shadow-yellow-200/50 hover:shadow-yellow-300/50'
          }
        `}
      >
        {isOutOfStock ? (
          <>
            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
            Sin stock
          </>
        ) : isInQuotation ? (
          <>
            <Check className="w-5 h-5 text-yellow-500" aria-hidden="true" />
            En tu lista de cotización
          </>
        ) : justAdded ? (
          <>
            <Check className="w-5 h-5" aria-hidden="true" />
            ¡Agregado!
          </>
        ) : (
          <>
            <Plus className="w-5 h-5" aria-hidden="true" />
            Agregar a mi cotización
          </>
        )}
      </button>

      {/* Ayuda contextual */}
      {!isOutOfStock && !isInQuotation && (
        <p className="text-[11px] text-gray-400 text-center leading-snug">
          Agrega varios productos y cotiza todo por WhatsApp de una sola vez.
        </p>
      )}
      {isInQuotation && (
        <p className="text-[11px] text-green-600 text-center font-medium leading-snug">
          ✓ Revisa tu lista en el carrito para ajustar cantidades.
        </p>
      )}
    </div>
  )
}
