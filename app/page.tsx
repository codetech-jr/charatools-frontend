'use client'

import React, { useState } from 'react'
import { QuotationProvider } from '@/context/QuotationContext'
import { Navbar } from '@/components/global/Navbar'
import { TrustBar } from '@/components/global/TrustBar'
import { HeroSection } from '@/components/hero/HeroSection'
import { CategoryGrid } from '@/components/catalog/CategoryGrid'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { QuotationDrawer } from '@/components/quotation/QuotationDrawer'
import { CombosSection } from '@/components/sections/CombosSection'
import { WhatsAppAdvisorSection } from '@/components/sections/WhatsAppAdvisorSection'
import { InventoryGallerySection } from '@/components/sections/InventoryGallerySection'
import { BrandTicker } from '@/components/sections/BrandTicker'
import { ContactMapSection } from '@/components/sections/ContactMapSection'
// Sample products
const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Bomba de Agua Periférica 1/2 HP',
    shortDescription: 'Bomba potente para riego y abastecimiento de agua',
    category: 'Plomería',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
    status: 'high-demand' as const,
  },
  {
    id: '2',
    name: 'Press Control Automático',
    shortDescription: 'Regulador automático de presión de agua para sistemas residenciales',
    category: 'Plomería',
    image: 'https://images.unsplash.com/photo-1585526881453-899142f58fd0?w=400&q=80',
    status: 'high-demand' as const,
  },
  {
    id: '3',
    name: 'Tubería PPR 1/2 para Aguas Blancas',
    shortDescription: 'Tubería PPR de calidad superior para instalaciones sanitarias',
    category: 'Plomería',
    image: 'https://images.unsplash.com/photo-1581092162562-40038f72742b?w=400&q=80',
    status: 'available' as const,
  },
  {
    id: '4',
    name: 'Llave de Paso PPR',
    shortDescription: 'Válvula de paso para tubería PPR, resistente y duradera',
    category: 'Plomería',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
    status: 'available' as const,
  },
  {
    id: '5',
    name: 'Bombilla LED 9W Cálida',
    shortDescription: 'Bombilla LED de bajo consumo con luz cálida y larga duración',
    category: 'Iluminación',
    image: 'https://images.unsplash.com/photo-1565636192335-14d0f48d7c71?w=400&q=80',
    status: 'available' as const,
  },
  {
    id: '6',
    name: 'Panel LED Rectangular 60W',
    shortDescription: 'Panel LED moderno para iluminación eficiente de espacios',
    category: 'Iluminación',
    image: 'https://images.unsplash.com/photo-1565631969034-0e5c0f0e8c59?w=400&q=80',
    status: 'high-demand' as const,
  },
  {
    id: '7',
    name: 'Cable Eléctrico #2 x 100m',
    shortDescription: 'Cable eléctrico certificado para instalaciones residenciales',
    category: 'Electricidad',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
    status: 'available' as const,
  },
  {
    id: '8',
    name: 'Breaker Termomagnético 30A',
    shortDescription: 'Disyuntor de seguridad para protección de circuitos eléctricos',
    category: 'Electricidad',
    image: 'https://images.unsplash.com/photo-1581092162562-40038f72742b?w=400&q=80',
    status: 'new-batch' as const,
  },
]

export default function Home() {
  const [isQuotationOpen, setIsQuotationOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const handleFilterChange = (slug: string | null) => {
    setActiveFilter(slug)
  }

  const handleOpenCatalog = () => {
    const element = document.getElementById('catalogo')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <QuotationProvider>
      <div className="min-h-screen bg-gray-50">
        {/* ── NEW: Infinite Brand Ticker ── */}
        <BrandTicker />

        {/* Navbar */}
        <Navbar onOpenQuotation={() => setIsQuotationOpen(true)} />

        {/* Hero Section */}
        <HeroSection
          onOpenCatalog={handleOpenCatalog}
          onOpenQuotation={() => setIsQuotationOpen(true)}
        />

        {/* Trust Bar */}
        <TrustBar />

        {/* Category Grid */}
        <CategoryGrid activeFilter={activeFilter} onFilterChange={handleFilterChange} />

        {/* Product Grid */}
        <ProductGrid products={SAMPLE_PRODUCTS} activeFilter={activeFilter} />


        {/* ── NEW: Combos by project ── */}
        <CombosSection />

        {/* ── NEW: WhatsApp photo advisor ── */}
        <WhatsAppAdvisorSection />

        {/* ── NEW: Inventory gallery ── */}
        <InventoryGallerySection />

        {/* ── NEW: Contact and Map ── */}
        <ContactMapSection />

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 px-4 md:px-8 lg:px-16 py-8 text-center text-gray-400 text-sm">
          <p>© 2026 CharaTools - Tu Ferretería Multimarca en Charallave</p>
        </footer>

        {/* Quotation Drawer */}
        <QuotationDrawer isOpen={isQuotationOpen} onOpenChange={setIsQuotationOpen} />
      </div>
    </QuotationProvider>
  )
}
