'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Check } from 'lucide-react'

type StockStatus = 'available' | 'high-demand' | 'new-batch' | 'out-of-stock'

interface Product {
  id: string
  name: string
  shortDescription: string
  category: string
  image: string
  status: StockStatus
}

interface ProductCardProps {
  product: Product
  onAddToQuotation: (product: Product) => void
  isInQuotation: boolean
}

const statusBadges: Record<
  StockStatus,
  { label: string; bgColor: string; textColor: string; icon: string }
> = {
  available: {
    label: '✅ Disponible',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    icon: '✓',
  },
  'high-demand': {
    label: '🔥 Alta rotación',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    icon: '🔥',
  },
  'new-batch': {
    label: '📦 Nuevo lote',
    bgColor: 'bg-yellow-200',
    textColor: 'text-yellow-900',
    icon: '📦',
  },
  'out-of-stock': {
    label: '⚠️ Sin stock',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    icon: '⚠️',
  },
}

export function ProductCard({ product, onAddToQuotation, isInQuotation }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const badge = statusBadges[product.status]

  const handleAddClick = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 200))
    onAddToQuotation(product)
    setIsLoading(false)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  const isDisabled = product.status === 'out-of-stock'

  return (
    <article 
      className="flex flex-col rounded-lg bg-white border border-gray-200 overflow-hidden hover:border-yellow-400 transition-all duration-200"
      role="region"
      aria-label={product.name}
    >
      <figure className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        <div className="absolute top-2 right-2 z-10">
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${badge.bgColor} ${badge.textColor}`}
            aria-label={`Estado: ${product.status}`}
          >
            {badge.label}
          </span>
        </div>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="flex flex-col flex-grow p-3 md:p-4 gap-3">
        <p className="text-xs text-gray-600 uppercase tracking-wider">{product.category}</p>

        <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        <p className="text-xs md:text-sm text-gray-700 line-clamp-2 flex-grow">
          {product.shortDescription}
        </p>

        <Button
          onClick={handleAddClick}
          disabled={isDisabled || isInQuotation}
          aria-label={`Agregar ${product.name} a mi cotización`}
          aria-pressed={isInQuotation}
          className={`w-full h-10 md:h-11 font-bold rounded-lg transition-all duration-200 flex items-center justify-center ${
            isInQuotation
              ? 'bg-white border-2 border-yellow-400 text-black hover:bg-yellow-50'
              : isAdded
                ? 'bg-green-500 text-white'
                : isDisabled
                  ? 'bg-gray-300 text-gray-600 opacity-70 cursor-not-allowed'
                  : 'bg-yellow-400 hover:bg-yellow-500 text-black active:scale-95'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isInQuotation ? (
              <>
                <Check className="w-4 h-4" />
                <span>En tu lista</span>
              </>
            ) : isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Agregado</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </>
            )}
          </div>
        </Button>
      </div>
    </article>
  )
}
