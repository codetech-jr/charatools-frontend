'use client'

import React from 'react'
import { ProductCard } from './ProductCard'
import type { CatalogProduct } from '@/lib/catalog.types'

interface ProductGridProps {
  products: CatalogProduct[]
  activeFilter: string | null
}

export function ProductGrid({ products, activeFilter }: ProductGridProps) {
  const filteredProducts = activeFilter
    ? products.filter((p) => p.category.toLowerCase().includes(activeFilter.toLowerCase()))
    : products

  return (
    <section
      id="catalogo"
      className="w-full bg-gray-50 px-4 md:px-8 lg:px-16 py-12 md:py-16"
    >
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-800 text-lg">No hay productos en esta categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  )
}
