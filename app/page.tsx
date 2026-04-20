'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/global/Navbar'
import { TrustBar } from '@/components/global/TrustBar'
import { HeroSection } from '@/components/hero/HeroSection'
import { CategoryGrid } from '@/components/catalog/CategoryGrid'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { CasheaBanner } from '@/components/sections/CasheaBanner'
import { QuotationDrawer } from '@/components/quotation/QuotationDrawer'
import { CombosSection } from '@/components/sections/CombosSection'
import { WhatsAppAdvisorSection } from '@/components/sections/WhatsAppAdvisorSection'
import { InventoryGallerySection } from '@/components/sections/InventoryGallerySection'
import { BrandTicker } from '@/components/sections/BrandTicker'
import { ContactMapSection } from '@/components/sections/ContactMapSection'
import { CatalogProduct } from '@/lib/catalog.types'

// Sample products
const SAMPLE_PRODUCTS: CatalogProduct[] = [
  {
    id: '1',
    name: 'Bomba de Agua Periférica 1/2 HP',
    shortDescription: 'Bomba potente para riego y abastecimiento de agua',
    category: 'plomeria',
    categoryLabel: 'Plomería',
    brand: 'INGCO',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
    status: 'high-demand',
  },
  {
    id: '2',
    name: 'Press Control Automático',
    shortDescription: 'Regulador automático de presión de agua para sistemas residenciales',
    category: 'plomeria',
    categoryLabel: 'Plomería',
    brand: 'INGCO',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1585526881453-899142f58fd0?w=400&q=80',
    status: 'high-demand',
  },
  {
    id: '3',
    name: 'Tubería PPR 1/2 para Aguas Blancas',
    shortDescription: 'Tubería PPR de calidad superior para instalaciones sanitarias',
    category: 'plomeria',
    categoryLabel: 'Plomería',
    brand: 'Truper',
    unit: 'm',
    image: 'https://images.unsplash.com/photo-1581092162562-40038f72742b?w=400&q=80',
    status: 'available',
  },
  {
    id: '4',
    name: 'Llave de Paso PPR',
    shortDescription: 'Válvula de paso para tubería PPR, resistente y duradera',
    category: 'plomeria',
    categoryLabel: 'Plomería',
    brand: 'Truper',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
    status: 'available',
  },
  {
    id: '5',
    name: 'Bombilla LED 9W Cálida',
    shortDescription: 'Bombilla LED de bajo consumo con luz cálida y larga duración',
    category: 'iluminacion',
    categoryLabel: 'Iluminación',
    brand: 'Philips',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1565636192335-14d0f48d7c71?w=400&q=80',
    status: 'available',
  },
  {
    id: '6',
    name: 'Panel LED Rectangular 60W',
    shortDescription: 'Panel LED moderno para iluminación eficiente de espacios',
    category: 'iluminacion',
    categoryLabel: 'Iluminación',
    brand: 'Philips',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1565631969034-0e5c0f0e8c59?w=400&q=80',
    status: 'high-demand',
  },
  {
    id: '7',
    name: 'Cable Eléctrico #2 x 100m',
    shortDescription: 'Cable eléctrico certificado para instalaciones residenciales',
    category: 'electricidad',
    categoryLabel: 'Electricidad',
    brand: '3M',
    unit: 'rollo',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
    status: 'available',
  },
  {
    id: '8',
    name: 'Breaker Termomagnético 30A',
    shortDescription: 'Disyuntor de seguridad para protección de circuitos eléctricos',
    category: 'electricidad',
    categoryLabel: 'Electricidad',
    brand: 'Schneider Electric',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1581092162562-40038f72742b?w=400&q=80',
    status: 'new-batch',
  },
]

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const handleFilterChange = (slug: string | null) => {
    setActiveFilter(slug)
  }

  const handleOpenCatalog = () => {
    const element = document.getElementById('catalogo')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <HeroSection
          onOpenCatalog={handleOpenCatalog}
        />

        {/* ── NEW: Cashea banner ── */}
        <CasheaBanner />

        {/* Trust Bar */}
        <TrustBar />

        {/* Product Grid Section */}
        <section className="bg-zinc-50 py-12 lg:py-24 border-y border-gray-200/60">
          <header className="max-w-7xl mx-auto px-4 md:px-8 mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              🔥 Los Más Pedidos en Obra
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-600 max-w-2xl mx-auto text-balance">
              Equipamiento industrial y herramientas de alta resistencia seleccionadas específicamente para garantizar durabilidad en el trabajo pesado.
            </p>
          </header>
          
          <ProductGrid products={SAMPLE_PRODUCTS} activeFilter={activeFilter} />
        </section>

        {/* Category Grid (Filters) */}
        <CategoryGrid activeFilter={activeFilter} onFilterChange={handleFilterChange} />

        {/* ── NEW: Combos by project ── */}
        <CombosSection />

        {/* ── NEW: WhatsApp photo advisor ── */}
        <WhatsAppAdvisorSection />

        {/* ── NEW: Inventory gallery ── */}
        <InventoryGallerySection />

        {/* ── NEW: Contact and Map ── */}
        <ContactMapSection />

    </div>
  )
}
