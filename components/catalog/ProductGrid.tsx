'use client'

import React from 'react'
import { ProductCard } from './ProductCard'
import { useQuotation } from '@/context/QuotationContext'

interface Product {
  id: string
  name: string
  shortDescription: string
  category: string
  image: string
  status: 'available' | 'high-demand' | 'new-batch' | 'out-of-stock'
}

interface ProductGridProps {
  products: Product[]
  activeFilter: string | null
}

export function ProductGrid({ products, activeFilter }: ProductGridProps) {
  const { items, addItem } = useQuotation()

  const filteredProducts = activeFilter
    ? products.filter((p) => p.category.toLowerCase().includes(activeFilter.toLowerCase()))
    : products

  const handleAddToQuotation = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      quantity: 1,
    })
  }

  return (
    <section className="w-full bg-gray-50 px-4 md:px-8 lg:px-16 py-12 md:py-16">
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-800 text-lg">No hay productos en esta categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {filteredProducts.map((product) => {
            const isInQuotation = items.some((item) => item.id === product.id)
            return (
              <ProductCard
                key={product.id}
                product={product}
                onAddToQuotation={handleAddToQuotation}
                isInQuotation={isInQuotation}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}
