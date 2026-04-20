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
import { Plus, Check, Zap } from 'lucide-react'
import { useQuotationStore } from '@/store/quotationStore'
import type { CatalogProduct } from '@/lib/catalog.types'

interface ProductRowProps {
  product: CatalogProduct
}

const STOCK_BADGE: Record<CatalogProduct['status'], { label: string; className: string }> = {
  available:      { label: '✓ Stock',       className: 'bg-green-100 text-green-800' },
  'high-demand':  { label: '🔥 Alta rot.',  className: 'bg-yellow-100 text-yellow-800' },
  'new-batch':    { label: '📦 Nuevo lote', className: 'bg-blue-100 text-blue-800' },
  'out-of-stock': { label: '✗ Sin stock',   className: 'bg-red-100 text-red-700' },
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
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <article
      className={`
        flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100
        hover:bg-gray-50 transition-colors duration-100
      `}
      aria-label={product.name}
    >
      {/* ── Imagen + Link al modal de detalle ── */}
      <Link
        href={`/producto/${product.id}`}
        className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-100 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
        aria-label={`Ver detalle de ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </Link>

      {/* ── Info central ── */}
      <div className="flex-1 min-w-0">
        {/* Nombre — tappable */}
        <Link
          href={`/producto/${product.id}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
        >
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug hover:text-yellow-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Línea de datos técnicos */}
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="text-xs font-medium text-gray-500">{product.brand}</span>

          {product.reference && (
            <>
              <span className="text-gray-300 text-xs" aria-hidden="true">·</span>
              <span className="text-xs text-gray-400 font-mono">{product.reference}</span>
            </>
          )}

          {product.powerWatts && (
            <>
              <span className="text-gray-300 text-xs" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-0.5 text-xs text-gray-500">
                <Zap className="w-3 h-3 text-yellow-500" aria-hidden="true" />
                <span>{product.powerWatts}W</span>
              </span>
            </>
          )}
        </div>

        {/* Badge de stock y Cashea */}
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${badge.className}`}
            aria-label={`Estado: ${badge.label}`}
          >
            {badge.label}
          </span>
          {!isDisabled && product.isCasheaEligible && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
              <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
              Cashea
            </span>
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
          flex-shrink-0 flex items-center justify-center gap-1
          h-11 w-11 md:w-auto md:px-3 rounded-xl
          text-xs font-bold border-2 transition-all duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-1
          active:scale-95
          ${isInQuotation
            ? 'border-yellow-400 bg-white text-yellow-600'
            : justAdded
              ? 'border-green-500 bg-green-500 text-white'
              : isDisabled
                ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'border-yellow-400 bg-yellow-400 text-black hover:bg-yellow-500 hover:border-yellow-500'
          }
        `}
      >
        {isInQuotation ? (
          <Check className="w-4 h-4" aria-hidden="true" />
        ) : justAdded ? (
          <Check className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Plus className="w-4 h-4" aria-hidden="true" />
        )}
        {/* Texto solo en tablet+ */}
        <span className="hidden md:inline sr-only md:not-sr-only">
          {isInQuotation ? 'En lista' : 'Agregar'}
        </span>
      </button>
    </article>
  )
}
