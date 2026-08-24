'use client'

import React, { useMemo } from 'react'
import { ProductCard } from '@/components/catalog/ProductCard'
import { MOCK_PRODUCTS } from '@/lib/catalog.types'
import type { CatalogProduct } from '@/lib/catalog.types'

interface RelatedProductsCarouselProps {
  currentProductId: string
  currentProductSlug?: string
  category: string
  subcategory?: string
  products?: CatalogProduct[]
}

export function RelatedProductsCarousel({
  currentProductId,
  currentProductSlug,
  category,
  subcategory,
  products
}: RelatedProductsCarouselProps) {
  // Lógica inteligente: prioriza productos de la misma subcategoría, luego la misma categoría
  const relatedProducts = useMemo(() => {
    const sourceList = (products && products.length > 0) ? products : MOCK_PRODUCTS

    // 1. Excluir el producto actual (por id o slug)
    const candidates = sourceList.filter(
      (p) =>
        p.id !== currentProductId &&
        p.slug !== currentProductId &&
        (currentProductSlug ? p.slug !== currentProductSlug && p.id !== currentProductSlug : true)
    )

    // 2. Productos de la misma categoría principal
    const sameCategory = candidates.filter((p) => p.category === category)
    
    if (sameCategory.length === 0) return []

    // 3. Preferencia máxima a la misma subcategoría
    const sameSubcategory = subcategory
      ? sameCategory.filter((p) => p.subcategory === subcategory || p.subitem === subcategory)
      : []

    const otherInCat = subcategory
      ? sameCategory.filter((p) => p.subcategory !== subcategory && p.subitem !== subcategory)
      : sameCategory

    // 4. Ordenar determinísticamente por prioridad comercial y luego alfabéticamente
    const sortByPriority = (list: CatalogProduct[]) =>
      [...list].sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999) || a.name.localeCompare(b.name))

    const combined = [...sortByPriority(sameSubcategory), ...sortByPriority(otherInCat)]

    // 5. Retornar hasta 5 productos relacionados relevantes
    return combined.slice(0, 5)
  }, [currentProductId, currentProductSlug, category, subcategory, products])

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
