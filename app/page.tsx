'use client'

import React, { useState } from 'react'
import { CasheaAlertBar } from '@/components/global/CasheaAlertBar'

import { TrustBar } from '@/components/global/TrustBar'
import { HeroSlider } from '@/components/hero/HeroSlider'
import { CategoryGrid } from '@/components/catalog/CategoryGrid'
import { ProductGrid } from '@/components/catalog/ProductGrid'

import { QuotationDrawer } from '@/components/quotation/QuotationDrawer'
/*import { CombosSection } from '@/components/sections/CombosSection'*/
/*import { WhatsAppAdvisorSection } from '@/components/sections/WhatsAppAdvisorSection'*/
 /*import { InventoryGallerySection } from '@/components/sections/InventoryGallerySection' */
import { BrandTicker } from '@/components/sections/BrandTicker'
import { ContactMapSection } from '@/components/sections/ContactMapSection'
/*import { SpecificSolutions } from '@/components/sections/SpecificSolutions'*/
/* import { SeoBomb } from '@/components/seo/SeoBomb' */
import { CatalogProduct } from '@/lib/catalog.types'

// Sample products
const SAMPLE_PRODUCTS: CatalogProduct[] = [
  {
    id: '1',
    slug: 'bomba-de-agua-periferica-1-2-hp',
    name: 'Bomba de Agua Periférica 1/2 HP',
    shortDescription: 'Bomba potente pa\' resolver problemas de riego y abastecimiento de agua en la casa.',
    category: 'plomeria',
    categoryLabel: 'Plomería',
    brand: 'INGCO',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
    status: 'high-demand',
  },
  {
    id: '2',
    slug: 'press-control-automatico',
    name: 'Press Control Automático',
    shortDescription: 'El regulador automático que no te puede faltar pa\' que la bomba trabaje fino.',
    category: 'plomeria',
    categoryLabel: 'Plomería',
    brand: 'INGCO',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1585526881453-899142f58fd0?w=400&q=80',
    status: 'high-demand',
  },

  {
    id: '5',
    slug: 'bombilla-led-9w-calida',
    name: 'Bombilla LED 9W Cálida',
    shortDescription: 'Bombillo LED rendidor pa\' iluminar cualquier cuarto.',
    category: 'iluminacion',
    categoryLabel: 'Iluminación',
    brand: 'Philips',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1565636192335-14d0f48d7c71?w=400&q=80',
    status: 'available',
  },
  {
    id: '6',
    slug: 'panel-led-rectangular-60w',
    name: 'Panel LED Rectangular 60W',
    shortDescription: 'Tremendo panel LED moderno para iluminar oficinas o talleres.',
    category: 'iluminacion',
    categoryLabel: 'Iluminación',
    brand: 'Philips',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1565631969034-0e5c0f0e8c59?w=400&q=80',
    status: 'high-demand',
  },
  {
    id: '7',
    slug: 'cable-electrico-2-100m',
    name: 'Cable Eléctrico #2 x 100m',
    shortDescription: 'Cable eléctrico 100% cobre pa\' que el trabajo te quede al pelo.',
    category: 'electricidad',
    categoryLabel: 'Electricidad',
    brand: '3M',
    unit: 'rollo',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
    status: 'available',
  },

]

export default function Home() {
  const handleOpenCatalog = () => {
    const element = document.getElementById('catalogo')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>

      {/* Schema Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HardwareStore",
            "name": "Charatools",
            "image": "https://charatools.com/logo_chara_tools_con_borde_fdo_blanco_png.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Charallave",
              "addressRegion": "Miranda",
              "addressCountry": "VE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 10.2359,
              "longitude": -66.8653
            },
            "telephone": "+58 424-XXXXXXX",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "08:00",
                "closes": "18:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "08:00",
                "closes": "13:00"
              }
            ],
            "priceRange": "$$",
            "paymentAccepted": "Efectivo, Pago Móvil, Zelle, Transferencia Bancaria",
            "areaServed": [
              {
                "@type": "City",
                "name": "Cúa"
              },
              {
                "@type": "City",
                "name": "Ocumare del Tuy"
              },
              {
                "@type": "City",
                "name": "Santa Teresa del Tuy"
              },
              {
                "@type": "City",
                "name": "Yare"
              }
            ],
            "brand": [
              {
                "@type": "Brand",
                "name": "INGCO"
              },
              {
                "@type": "Brand",
                "name": "Dewalt"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "320"
            }
          })
        }}
      />

      <div className="relative min-h-screen bg-white">

        <HeroSlider onOpenCatalog={handleOpenCatalog} />

        {/* Trust Bar */}
        <TrustBar />

        {/* Category Grid (Tubrica Style) */}
        <CategoryGrid />

        {/* Product Grid Section */}
        <section id="catalogo" className="bg-zinc-50 pt-12 lg:pt-24 pb-12 lg:pb-16 border-y border-gray-200/60">
          <header className="max-w-7xl mx-auto px-4 md:px-8 mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              🔥 Nuestros Productos Más Vendidos
            </h2>
          </header>

          <ProductGrid products={SAMPLE_PRODUCTS} activeFilter={null} />
        </section>

        {/* ── NEW: Soluciones de Marketing Directo ── */}
        {/* <SpecificSolutions /> */}


        {/* ── NEW: Combos by project ── */}
        {/* <CombosSection /> */}

        {/* ── NEW: WhatsApp photo advisor ── */}
        {/*<WhatsAppAdvisorSection />*/}

        {/* ── NEW: Inventory gallery ── */}
        {/*<InventoryGallerySection />*/}

        {/* ── NEW: SEO Bomb ── */}
        {/* <SeoBomb /> */}

        {/* ── NEW: Contact and Map ── */}
        <ContactMapSection />

        {/* ── NEW: Pre-Footer Cashea Bar ── */}
        {/* <CasheaAlertBar /> */}

      </div></>
  )
}
