'use client'

import React, { useMemo } from 'react'
import { ProductCard } from '@/components/catalog/ProductCard'
import { MOCK_CATALOG } from '@/lib/mockCatalog'
import type { CatalogProduct } from '@/lib/catalog.types'

interface RelatedProductsCarouselProps {
  currentProductId: string
  category: string
}

export function RelatedProductsCarousel({ currentProductId, category }: RelatedProductsCarouselProps) {
  // Lógica: 4 a 6 productos de la misma categoría, excluyendo el actual
  const relatedProducts = useMemo(() => {
    const filtered = MOCK_CATALOG.filter(
      (p) => p.category === category && p.id !== currentProductId
    )
    
    // Sort aleatorio y limitamos a 5
    const shuffled = [...filtered].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 5)
  }, [currentProductId, category])

  if (relatedProducts.length === 0) return null

  return (
    <section className="mt-12 lg:mt-16 pt-8 lg:pt-12 border-t border-gray-200">
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>🔥</span> Quienes compraron este producto también cotizaron:
      </h3>
      
      {/* Scroll horizontal nativo para mobile y tablet, flex para desktop */}
      <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {relatedProducts.map((product) => (
          <div key={product.id} className="w-[85vw] sm:w-[280px] md:min-w-[300px] snap-start flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}
