import React from 'react'
import { PromoSection } from '@/components/sections/PromoSection'
import { Metadata } from 'next'

import { getPublicCatalog } from '@/app/actions/catalogActions'
import { MOCK_CATALOG } from '@/lib/mockCatalog'
import { ProductGrid } from '@/components/catalog/ProductGrid'

export const metadata: Metadata = {
  title: 'Promociones y Regalos | Charatools',
  description: 'Aprovecha nuestros combos y regalos cruzados. Equipa tu obra hoy con las mejores herramientas e insumos del mercado.',
  openGraph: {
    title: 'Promociones Especiales Charatools',
    description: 'Equipa tu obra hoy con las mejores herramientas y obtén regalos cruzados para tu instalación.',
  }
}

export default async function PromocionesPage() {
  // Fetch products (fallback to mock)
  const { products: dbProducts } = await getPublicCatalog()
  const allProducts = dbProducts.length > 0 ? dbProducts : MOCK_CATALOG

  // For demonstration, let's pick products that are 'high-demand' or 'new-batch' as our "promotional" products
  // In a real database, you might filter by a `isPromo` flag or a specific `promo` tag.
  const promoProducts = allProducts.filter(p => p.status === 'high-demand' || p.status === 'new-batch')

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center pt-8 pb-20">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          🔥 Zona de Promociones
        </h1>
        <p className="mt-2 text-gray-600 text-balance">
          Descubre nuestros combos diseñados para proyectos industriales y residenciales.
        </p>
      </div>
      
      <PromoSection />
      
      {/* ── Productos en Promoción ── */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-16 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Productos Destacados en Oferta
            </h2>
            <p className="text-gray-500 mt-1">
              Añádelos a tu cotización para aprovechar beneficios exclusivos
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <ProductGrid products={promoProducts} activeFilter={null} />
      </div>
    </main>
  )
}
