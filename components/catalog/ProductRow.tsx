'use client'

/**
 * @file components/catalog/ProductRow.tsx
 * @description Fila de producto para la vista en lista del catálogo.
 * Diseño denso estilo McMaster-Carr: imagen pequeña + datos clave en línea.
 * Comparte el mismo sistema de colores y estados que ProductCard.
 */

import React from 'react'
import Link from 'next/link'
import { Plus, Check, Info, Ruler } from 'lucide-react'
import Image from 'next/image'
import { useQuotationStore } from '@/store/quotationStore'
import type { CatalogProduct, StockStatus } from '@/lib/catalog.types'

const STATUS_DOT: Record<StockStatus, { color: string; label: string }> = {
  available:      { color: 'bg-green-500',  label: 'Disponible' },
  'high-demand':  { color: 'bg-yellow-500', label: 'Alta rotación' },
  'new-batch':    { color: 'bg-blue-500',   label: 'Nuevo lote' },
  'out-of-stock': { color: 'bg-red-400',    label: 'Sin stock' },
}

interface ProductRowProps {
  product: CatalogProduct
}

export function ProductRow({ product }: ProductRowProps) {
  const [addStatus, setAddStatus] = React.useState<'idle' | 'added'>('idle')
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const addItem     = useQuotationStore((s) => s.addItem)
  const isInStore   = useQuotationStore((s) => s.items.some((i) => i.id === product.id))
  const isInQuotation = mounted && isInStore

  const dot = STATUS_DOT[product.status]
  const isDisabled = product.status === 'out-of-stock'
  const hasVariants = product.variants && product.variants.length > 0

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isDisabled || isInQuotation || addStatus === 'added') return
    addItem({
      id:        product.id,
      name:      product.name,
      brand:     product.brand,
      reference: product.reference,
      unit:      product.unit,
      qty:       1,
    })
    setAddStatus('added')
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setAddStatus('idle'), 1200)
  }

  return (
    <article
      className="group flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 hover:bg-yellow-50/50 transition-colors duration-150"
      aria-label={product.name}
    >
      {/* Imagen miniatura */}
      <Link
        href={`/producto/${product.slug}`}
        className="relative shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden bg-white border border-gray-200 group-hover:border-yellow-300 transition-colors"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.image}
          alt=""
          fill
          className="object-contain p-1.5"
          sizes="64px"
        />
      </Link>

      {/* Info principal */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          {/* Dot de estado */}
          <span
            className={`inline-block w-2 h-2 rounded-full shrink-0 ${dot.color}`}
            title={dot.label}
            aria-label={`Estado: ${dot.label}`}
          />
          {/* Marca */}
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {product.brand}
          </span>
          {/* Referencia */}
          {product.reference && (
            <span className="text-[10px] font-mono text-gray-400 hidden sm:inline">
              · {product.reference}
            </span>
          )}
          {/* Badge "Tiene medidas" */}
          {hasVariants && (
            <span
              className="inline-flex items-center gap-0.5 text-[9px] font-bold text-yellow-700 bg-yellow-100 border border-yellow-200 px-1.5 py-0.5 rounded-full"
              title={`Disponible en varias ${product.variantLabel?.toLowerCase() ?? 'medidas'}`}
            >
              <Ruler className="w-2.5 h-2.5" aria-hidden="true" />
              {product.variantLabel ?? 'Medidas'}
            </span>
          )}
        </div>

        {/* Nombre */}
        <Link href={`/producto/${product.slug}`}>
          <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-yellow-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Descripción corta — solo md+ */}
        <p className="text-xs text-gray-400 line-clamp-1 leading-snug mt-0.5 hidden md:block">
          {product.shortDescription}
        </p>
      </div>

      {/* Unidad de venta */}
      <span className="shrink-0 text-[10px] font-mono text-gray-400 hidden lg:block">
        {product.unit}
      </span>

      {/* Botón de cotizar */}
      <button
        onClick={handleAdd}
        disabled={isDisabled || isInQuotation}
        aria-label={
          isInQuotation
            ? `${product.name} ya está en tu lista`
            : isDisabled
              ? 'Sin stock'
              : `Agregar ${product.name} a cotización`
        }
        aria-pressed={isInQuotation}
        className={[
          'shrink-0 h-9 px-3 md:px-4 rounded-lg font-bold text-xs flex items-center gap-1.5',
          'transition-all duration-150 active:scale-95',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400',
          isDisabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : isInQuotation
              ? 'bg-white border-2 border-yellow-400 text-gray-800 cursor-default'
              : addStatus === 'added'
                ? 'bg-neutral-800 text-white cursor-default'
                : 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-sm hover:shadow-yellow-200/60',
        ].join(' ')}
      >
        {isInQuotation ? (
          <Check className="w-3.5 h-3.5 text-yellow-500" aria-hidden="true" />
        ) : isDisabled ? (
          <Info className="w-3.5 h-3.5" aria-hidden="true" />
        ) : addStatus === 'added' ? (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
        )}
        <span className="hidden sm:inline">
          {isInQuotation ? 'En lista' : isDisabled ? 'Sin stock' : addStatus === 'added' ? '¡Listo!' : 'Cotizar'}
        </span>
      </button>
    </article>
  )
}
