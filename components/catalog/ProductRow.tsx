'use client'

/**
 * @file ProductRow.tsx
 * @description Ítem de producto en formato lista densa (McMaster-Carr style).
 *
 * Diseño orientado a operarios B2B en móvil:
 * - Imagen pequeña (64x64) a la izquierda — identificación rápida visual
 * - Datos técnicos clave en una línea (marca, ref, potencia)
 * - Badge de stock claramente visible con alto contraste
 * - Botón "+ Agregar" grande (44px mín) con feedback inmediato
 * - Tap en nombre/imagen → abre modal de detalle (Intercepting Route)
 * - Sin hover effects innecesarios en móvil
 */

import React, { useState } from 'react'
import Link from 'next/link'
import { Plus, Check, Zap, Info } from 'lucide-react'
import Image from 'next/image'
import { useQuotationStore } from '@/store/quotationStore'
import type { CatalogProduct } from '@/lib/catalog.types'

interface ProductRowProps {
  product: CatalogProduct
}

const STOCK_BADGE: Record<CatalogProduct['status'], { label: string; className: string }> = {
  available:      { label: 'Stock',       className: 'bg-green-100 text-green-800 border-green-200' },
  'high-demand':  { label: 'Alta rot.',  className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  'new-batch':    { label: 'Nuevo lote', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  'out-of-stock': { label: 'Sin stock',   className: 'bg-red-100 text-red-700 border-red-200' },
}

export function ProductRow({ product }: ProductRowProps) {
  const [justAdded, setJustAdded] = useState(false)
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])
  const addItem = useQuotationStore((s) => s.addItem)
  const isInQuotationStore = useQuotationStore((s) => 
    s.items.some(item => item.id === product.id)
  )
  const isInQuotation = mounted && isInQuotationStore

  const badge = STOCK_BADGE[product.status]
  const isDisabled = product.status === 'out-of-stock'

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault() // No navegar si el click fue en el botón
    if (isDisabled || isInQuotation) return

    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      reference: product.reference,
      unit: product.unit,
      qty: 1,
    })

    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  return (
    <article
      className={`
        flex items-center gap-3 px-4 py-3.5 bg-white border-b border-gray-100
        hover:bg-gray-50/80 transition-colors duration-200 group
      `}
      aria-label={product.name}
    >
      {/* ── Imagen + Link al modal de detalle ── */}
      <Link
        href={`/producto/${product.slug}`}
        className="flex-shrink-0 w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 relative"
        aria-label={`Ver detalle de ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* ── Info central ── */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {/* Línea de datos técnicos */}
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-1.5 py-0.5 rounded-sm">
            {product.brand}
          </span>
          {product.reference && (
            <span className="text-[11px] text-gray-400 font-mono truncate" title={`SKU / Ref: ${product.reference}`}>
              Ref: {product.reference}
            </span>
          )}
        </div>

        {/* Nombre — tappable */}
        <Link
          href={`/producto/${product.slug}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
        >
          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-yellow-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Detalles extras y badges */}
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          {/* Badge de stock */}
          <span
            className={`inline-flex items-center text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full border shadow-sm ${badge.className}`}
            aria-label={`Estado: ${badge.label}`}
          >
            {badge.label}
          </span>
          
          {product.powerWatts && (
            <>
              <span className="text-gray-200 text-xs" aria-hidden="true">|</span>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-gray-500">
                <Zap className="w-3.5 h-3.5 text-yellow-500" aria-hidden="true" />
                <span>{product.powerWatts}W</span>
              </span>
            </>
          )}

          {!isDisabled && product.isCasheaEligible && (
            <>
              <span className="text-gray-200 text-xs" aria-hidden="true">|</span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100 shadow-sm" title="Facilidad Cashea">
                <Image 
                  src="/cashea.svg" 
                  alt="Cashea" 
                  width={14} 
                  height={14} 
                  className="flex-shrink-0" 
                />
                Cashea
              </span>
            </>
          )}
        </div>
      </div>

      {/* ── Botón Agregar (siempre a la derecha) ── */}
      <button
        onClick={handleAdd}
        disabled={isDisabled}
        aria-label={
          isInQuotation
            ? `${product.name} ya está en tu lista`
            : `Agregar ${product.name} a mi cotización`
        }
        aria-pressed={isInQuotation}
        className={`
          relative flex-shrink-0 flex items-center justify-center gap-1.5
          h-11 w-11 md:w-auto md:px-4 rounded-xl shadow-sm
          text-xs font-bold border-2 transition-all duration-300 overflow-hidden
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-1
          active:scale-95 group/btn
          ${isInQuotation
            ? 'border-yellow-400 bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
            : justAdded
              ? 'border-green-500 bg-green-500 text-white shadow-green-500/30 shadow-lg'
              : isDisabled
                ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'border-yellow-400 bg-yellow-400 text-black hover:bg-yellow-500 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-400/20'
          }
        `}
      >
        {!isDisabled && !isInQuotation && !justAdded && (
          <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        )}

        <div className="relative z-10 flex items-center justify-center gap-1.5">
          {isInQuotation ? (
            <Check className="w-4.5 h-4.5" aria-hidden="true" />
          ) : justAdded ? (
            <Check className="w-4.5 h-4.5 animate-in zoom-in duration-300" aria-hidden="true" />
          ) : isDisabled ? (
             <Info className="w-4.5 h-4.5" aria-hidden="true" />
          ) : (
            <Plus className="w-4.5 h-4.5 group-hover/btn:scale-110 transition-transform" aria-hidden="true" />
          )}
          {/* Texto solo en tablet+ */}
          <span className="hidden md:inline sr-only md:not-sr-only">
            {isInQuotation ? 'En lista' : justAdded ? '¡Añadido!' : 'Agregar'}
          </span>
        </div>
      </button>
    </article>
  )
}
