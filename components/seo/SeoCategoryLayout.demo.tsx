'use client'

/**
 * @file components/seo/SeoCategoryLayout.demo.tsx
 * @description Demo de integración: muestra cómo SeoCategoryHero y SeoCategoryFooter
 * envuelven el grid de productos de una categoría real.
 *
 * USO REAL en tu CatalogResultsPanel o en la página de categoría:
 *
 *   <SeoCategoryHero title={category.seoTitle} description={category.seoDescription} />
 *   <ProductGrid products={filteredProducts} />
 *   <SeoCategoryFooter blocks={category.seoBlocks} ctaSection={category.ctaSection} />
 *
 * Este archivo es solo para desarrollo/testing.
 * Borra o ignora en producción.
 */

import React from 'react'
import { SeoCategoryHero } from './SeoCategoryHero'
import { SeoCategoryFooter, type SeoBlock, type CtaSection } from './SeoCategoryFooter'

// ── Mock Data: Categoría "Plantas Eléctricas" ─────────────────────────────────

const HERO_DATA = {
  title: 'Plantas Eléctricas en Charallave: Tu Solución ante los Cortes de Luz en el Tuy',
  description:
    'Sabemos lo que se siente: el bajón de luz llega sin avisar y se lleva la nevera, el negocio y la tranquilidad. En CharaTools tenemos la planta que necesitas — desde uso residencial hasta industrial — con disponibilidad inmediata en Charallave y envíos rápidos a todo el Tuy.',
}

const SEO_BLOCKS: SeoBlock[] = [
  {
    subtitle: '¿Qué planta de luz necesito para mi casa o negocio?',
    text:
      'Todo depende de tu carga eléctrica. Para una casa promedio (nevera, 2 aires AA split 12.000 BTU, luces y TV), necesitas al menos una planta de 5.000W – 7.500W.\n' +
      'Si tienes un negocio con equipos industriales, bombas de agua trifásicas o cámaras de refrigeración, debes calcular la carga total y añadir un 25% de margen de seguridad. Nuestro equipo te ayuda a hacer ese cálculo gratis por WhatsApp.\n' +
      'En CharaTools manejamos marcas como Generac, Kipor, Hyundai y Lutian en potencias desde 2.200W hasta 22.000W. Todos con arranque eléctrico y opciones a gasolina o diesel.',
  },
  {
    subtitle: 'Alternativa sin ruido: Inversores y Sistemas de Energía Solar',
    text:
      'Si el ruido de la planta es un problema o buscas una solución 100% silenciosa para uso nocturno, los inversores con banco de baterías son tu mejor aliado.\n' +
      'Un sistema inversor de 3.000VA con 4 baterías de gel de 150Ah puede sostener una nevera + luces LED + router por 6 a 8 horas continuas, sin generar decibelios ni humo.\n' +
      'También trabajamos con paneles solares monocristalinos de 450W para complementar el sistema y reducir tu dependencia del combustible. Pregúntanos por los paquetes solares todo-incluido con instalación.',
  },
  {
    subtitle: 'Mantenimiento y repuestos: Protege tu inversión',
    text:
      'Una planta sin mantenimiento es un gasto, no una inversión. En CharaTools encontrarás todo lo que necesitas: filtros de aceite, bujías, correas de alternador, AVR (reguladores de voltaje automáticos) y aceites para motor de 4 tiempos.\n' +
      'Recomendamos cambio de aceite cada 50 horas de uso o cada 3 meses, lo que ocurra primero. Manejamos repuestos originales y equivalentes certificados para las marcas más comunes del mercado venezolano.',
  },
]

const CTA_DATA: CtaSection = {
  closingText:
    '¿Todavía tienes dudas sobre qué equipo es el ideal para ti? Nuestros asesores técnicos en Charallave están disponibles ahora mismo. Cuéntanos tu situación y te damos una recomendación sin compromiso.',
  ctaLabel: '💬 Asesoría gratuita por WhatsApp',
  ctaHref:
    'https://api.whatsapp.com/send?phone=584241234567&text=' +
    encodeURIComponent(
      '¡Hola! Estoy buscando una planta eléctrica. ¿Pueden ayudarme a elegir la correcta?'
    ),
}

// ── Mock de Grid de Productos (Ficticio) ─────────────────────────────────────

const MOCK_PRODUCTS = [
  { id: 1, name: 'Planta Generac 7.500W - Arranque Eléctrico', price: '$480', stock: 'Disponible' },
  { id: 2, name: 'Planta Kipor 5.500W - Silenciosa', price: '$320', stock: 'Disponible' },
  { id: 3, name: 'Inversor Luminux 3.000VA + 4 Baterías', price: '$650', stock: 'Últimas 2' },
  { id: 4, name: 'Planta Hyundai 9.000W Diesel', price: '$890', stock: 'Disponible' },
  { id: 5, name: 'Panel Solar 450W Monocristalino', price: '$145', stock: 'Disponible' },
  { id: 6, name: 'AVR Automático 5.000VA Forza', price: '$75', stock: 'Disponible' },
]

function MockProductGrid() {
  return (
    <div
      role="main"
      aria-label="Grid de productos"
      className="bg-gray-50 py-6 px-4 sm:px-6"
    >
      <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-4">
        {MOCK_PRODUCTS.length} productos encontrados
      </p>
      <ul
        role="list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        aria-label="Lista de productos"
      >
        {MOCK_PRODUCTS.map(product => (
          <li
            key={product.id}
            className="
              bg-white border border-gray-200 rounded-lg p-4
              flex items-center gap-4
              hover:border-yellow-400 hover:shadow-md
              transition-all duration-200
            "
          >
            {/* Placeholder imagen */}
            <div
              className="w-16 h-16 bg-zinc-100 rounded-lg flex-shrink-0 flex items-center justify-center"
              aria-hidden="true"
            >
              <svg className="w-8 h-8 text-zinc-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.72L13 18v4h4l-1.22-1.22C18.91 19.07 21 15.76 21 12c0-5.18-3.95-9.45-9-9.95M11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h4v-4l-2.28 1.65C5.81 18 4 15.21 4 12c0-4.08 3.05-7.44 7-7.93V2.05z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-900 leading-tight truncate">
                {product.name}
              </p>
              <p className="text-yellow-600 font-bold text-base mt-1">{product.price}</p>
              <p className={`text-xs mt-1 font-medium ${product.stock === 'Disponible' ? 'text-green-600' : 'text-orange-500'}`}>
                {product.stock}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Layout de Integración ────────────────────────────────────────────────────

export function SeoCategoryLayoutDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/*
       * ① Hero SEO — Encima del grid
       *    Google lo indexa como H1 de la página.
       *    El usuario lo ve al entrar a la categoría.
       */}
      <SeoCategoryHero
        title={HERO_DATA.title}
        description={HERO_DATA.description}
      />

      {/*
       * ② Grid de Productos — Contenido principal
       *    En producción: <CatalogResultsPanel /> o tu grid real.
       *    Aquí: MockProductGrid() de demostración.
       */}
      <MockProductGrid />

      {/*
       * ③ Footer SEO — Debajo del grid
       *    Texto denso colapsado por defecto en mobile.
       *    100% indexable por Googlebot (siempre en DOM).
       */}
      <SeoCategoryFooter
        blocks={SEO_BLOCKS}
        ctaSection={CTA_DATA}
      />
    </div>
  )
}
