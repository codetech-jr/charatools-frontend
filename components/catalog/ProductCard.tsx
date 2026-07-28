'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Check, Info } from 'lucide-react'
import Image from 'next/image'
import { useQuotationStore } from '@/store/quotationStore'
import type { CatalogProduct, StockStatus } from '@/lib/catalog.types'

interface ProductCardProps {
  product: CatalogProduct
}

const statusBadges: Record<
  StockStatus,
  { label: string; bgClass: string; textClass: string; icon: string }
> = {
  available: {
    label: 'Disponible',
    bgClass: 'bg-green-100/90 backdrop-blur-sm border-green-200',
    textClass: 'text-green-800',
    icon: '✓',
  },
  'high-demand': {
    label: 'Alta rotación',
    bgClass: 'bg-yellow-100/90 backdrop-blur-sm border-yellow-200',
    textClass: 'text-yellow-800',
    icon: '🔥',
  },
  'new-batch': {
    label: 'Nuevo lote',
    bgClass: 'bg-blue-100/90 backdrop-blur-sm border-blue-200',
    textClass: 'text-blue-800',
    icon: '📦',
  },
  'out-of-stock': {
    label: 'Sin stock',
    bgClass: 'bg-red-100/90 backdrop-blur-sm border-red-200',
    textClass: 'text-red-800',
    icon: '⚠️',
  },
}

export function ProductCard({ product }: ProductCardProps) {
  const [status, setStatus] = useState<'idle' | 'added'>('idle')
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])
  
  const addItem = useQuotationStore((s) => s.addItem)
  const isInQuotationStore = useQuotationStore((s) => 
    s.items.some(item => item.id === product.id)
  )
  const isInQuotation = mounted && isInQuotationStore

  const badge = statusBadges[product.status]

  const handleAddClick = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault() // Prevenir navegación si se hace clic en el botón
    if (status === 'added') return

    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      reference: product.reference,
      unit: product.unit,
      qty: 1
    })

    setStatus('added')
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setStatus('idle'), 1000)
  }, [status, product, addItem])

  const isDisabled = product.status === 'out-of-stock'

  return (
    <article 
      className="group relative flex flex-col h-full bg-white border border-neutral-200 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md hover:border-neutral-300"
      role="region"
      aria-label={product.name}
    >
      {/* ── Área de Imagen con Overlay ── */}
      <Link href={`/producto/${product.slug}`} className="relative aspect-[4/3] bg-gray-50 overflow-hidden block">
        {/* Badges superiores */}
        <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide border shadow-sm ${badge.bgClass} ${badge.textClass}`}
            aria-label={`Estado: ${product.status}`}
          >
            <span aria-hidden="true">{badge.icon}</span>
            {badge.label}
          </span>


        </div>

        {/* Imagen del Producto */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        
        {/* Gradiente inferior suave para contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* ── Contenido de la Tarjeta ── */}
      <div className="flex flex-col flex-grow p-4 md:p-5 grid grid-rows-[auto_1fr_auto] gap-3">
        {/* Metadatos: Marca y SKU (Vital para B2B) */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-sm">
            {product.brand}
          </span>
          {product.reference && (
            <span className="text-[11px] font-mono text-gray-500 truncate" title={`SKU / Ref: ${product.reference}`}>
              Ref: {product.reference}
            </span>
          )}
        </div>

        {/* Título Principal */}
        <Link href={`/producto/${product.slug}`} className="block group/title mt-1">
          <h3 className="text-sm md:text-base font-bold text-gray-900 min-h-[2.5rem] md:min-h-[2.8rem] leading-tight group-hover/title:text-yellow-600 transition-colors text-left">
            {product.name}
          </h3>
        </Link>

        {/* Descripción Corta - Forzamos text-left para escaneo rápido */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed text-left">
          {product.shortDescription}
        </p>



        {/* Contenedor del Botón - Anclado al fondo por el grid */}
        <div className="pt-2 border-t border-gray-50">
          <Button
            onClick={handleAddClick}
            disabled={isDisabled || isInQuotation}
            aria-live="polite"
            aria-label={
              status === 'added' ? 'Producto añadido a la cotización' : `Agregar ${product.name} a mi cotización`
            }
            aria-pressed={isInQuotation}
            className={`w-full py-2.5 px-4 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ease-out active:scale-95 ${
              isInQuotation
                ? 'bg-yellow-50 border-2 border-yellow-400 text-yellow-800 hover:bg-yellow-100 cursor-default'
                : status === 'added'
                  ? 'bg-neutral-800 text-white cursor-default shadow-md'
                  : isDisabled
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                    : 'bg-yellow-400 hover:bg-yellow-300 text-neutral-900 shadow-sm hover:shadow-md'
            }`}
          >
            {isInQuotation ? (
              <>
                <Check className="w-4 h-4" />
                <span>Agregado a Cotización</span>
              </>
            ) : status === 'added' ? (
              <>
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>¡Añadido!</span>
              </>
            ) : isDisabled ? (
              <>
                <Info className="w-4 h-4" />
                <span>Agotado temporalmente</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Cotizar Ahora</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  )
}

