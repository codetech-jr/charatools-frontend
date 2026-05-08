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
/* import { MembresiaBanner_Home_CTA } from '@/components/sections/MembresiaBanner_Home_CTA' 
import { SeoBomb } from '@/components/seo/SeoBomb' */
import { CatalogProduct } from '@/lib/catalog.types'

// Sample products
const SAMPLE_PRODUCTS: CatalogProduct[] = [
  {
    id: '1',
    slug: 'bomba-de-agua-periferica-1-2-hp',
    name: 'Bomba de Agua Periférica 1/2 HP',
    shortDescription: 'Bomba potente para riego y abastecimiento de agua',
    category: 'plomeria',
    categoryLabel: 'Plomería',
    brand: 'INGCO',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
    status: 'high-demand',
    isCasheaEligible: true,
    price: 35.00,
  },
  {
    id: '2',
    slug: 'press-control-automatico',
    name: 'Press Control Automático',
    shortDescription: 'Regulador automático de presión de agua para sistemas residenciales',
    category: 'plomeria',
    categoryLabel: 'Plomería',
    brand: 'INGCO',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1585526881453-899142f58fd0?w=400&q=80',
    status: 'high-demand',
    isCasheaEligible: true,
    price: 25.00,
  },
  {
    id: '3',
    slug: 'tuberia-ppr-1-2-para-aguas-blancas',
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
    slug: 'llave-de-paso-ppr',
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
    slug: 'bombilla-led-9w-calida',
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
    slug: 'panel-led-rectangular-60w',
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
    slug: 'cable-electrico-2-100m',
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
    slug: 'breaker-termomagnetico-30a',
    name: 'Breaker Termomagnético 30A',
    shortDescription: 'Disyuntor de seguridad para protección de circuitos eléctricos',
    category: 'electricidad',
    categoryLabel: 'Electricidad',
    brand: 'Schneider Electric',
    unit: 'und',
    image: 'https://images.unsplash.com/photo-1581092162562-40038f72742b?w=400&q=80',
    status: 'new-batch',
    isCasheaEligible: true,
    price: 12.00,
  },
]

export default function Home() {
  const handleOpenCatalog = () => {
    const element = document.getElementById('catalogo')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Schema FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Cómo funciona pedir por WhatsApp? ¿Es seguro?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Es el método más rápido. Solo envía la lista de repuestos, un humano verifica el stock, coordinas retiro o delivery. Sin formularios tediosos ni tarjetas en webs de terceros."
                }
              },
              {
                "@type": "Question",
                "name": "¿Los equipos INGCO tienen garantía real? ¿Qué cubre?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí. Al ser distribuidores autorizados INGCO y Truper, tienes garantía directa por defectos de fábrica. Sin terceros. Reemplazo real bajo verificación técnica."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuáles son los métodos de pago?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Aceptamos pago al instante mediante Pago Móvil, Transferencias nacionales y Efectivo."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cómo sé que los productos son originales y no copias?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Todos los equipos InGCO, Truper y Stanley incluyen caja original, serial verificable, factura y hologramas. Cero imitaciones."
                }
              }
            ]
          })
        }}
      />

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
                "name": "Truper"
              },
              {
                "@type": "Brand",
                "name": "Dewalt"
              },
              {
                "@type": "Brand",
                "name": "Schneider"
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
            <p className="mt-4 text-sm md:text-base text-gray-600 max-w-2xl mx-auto text-balance">
              Equipamiento industrial y herramientas de alta resistencia seleccionadas específicamente para garantizar durabilidad en el trabajo pesado.
            </p>
          </header>

          <ProductGrid products={SAMPLE_PRODUCTS} activeFilter={null} />
        </section>

        {/* ── VIP Membership Section ── */}
       {/* <MembresiaBanner_Home_CTA /> */}

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
        <CasheaAlertBar />

      </div></>
  )
}
