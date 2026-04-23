'use client'

import React, { useState } from 'react'

const WHATSAPP_NUMBER = '584220148405'
const WHATSAPP_INVENTORY_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hola CharaTools! 📦 Quisiera consultar si tienen en inventario un artículo específico.'
)}`

interface GalleryImage {
  src: string
  alt: string
  featured?: boolean
}

/*
 * NOTA AL DESARROLLADOR:
 * Reemplaza las fotos de placeholder con imágenes reales del almacén de CharaTools.
 * Las fotos deben ir en /public/gallery/ y se recomiendan al menos 6-8 fotos.
 * Temas sugeridos: fachada del local, estanterías principales, sección eléctrica,
 * repuestos organizados, caja/mostrador, productos INGCO en exhibición.
 * Resolución mínima recomendada: 800×600px.
 */
const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    alt: 'Almacén principal de herramientas CharaTools Charallave',
    featured: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    alt: 'Estantería de tornillos y sujetadores CharaTools',
  },
  {
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    alt: 'Herramientas eléctricas INGCO en exhibición',
  },
  {
    src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80',
    alt: 'Materiales eléctricos y cableado en almacén',
  },
  {
    src: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80',
    alt: 'Accesorios de plomería y tuberías PPR CharaTools',
  },
  {
    src: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80',
    alt: 'Rodillos y materiales de pintura disponibles en local',
  },
]

function GalleryItem({ image, index }: { image: GalleryImage; index: number }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`relative overflow-hidden rounded-2xl group
        ${image.featured ? 'col-span-2 md:col-span-1 row-span-2 aspect-[4/5]' : 'aspect-square'}`}
    >
      {/* Skeleton while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" aria-hidden="true" />
      )}

      <img
        src={image.src}
        alt={image.alt}
        loading={index < 2 ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-transform duration-500
                    group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300"
        aria-hidden="true"
      />

      {/* Caption on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0
                   transition-transform duration-300"
        aria-hidden="true"
      >
        <p className="text-white text-xs font-semibold drop-shadow-lg line-clamp-2">
          {image.alt}
        </p>
      </div>
    </div>
  )
}

export function InventoryGallerySection() {
  return (
    <section
      id="inventario"
      aria-labelledby="inventario-heading"
      className="w-full py-16 md:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section header — centered */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
            Inventario físico en Charallave
          </p>
          <h2
            id="inventario-heading"
            className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4"
          >
            No somos un catálogo virtual.{' '}
            <br className="hidden md:block" />
            <span className="text-yellow-500">Este es nuestro stock real.</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-base leading-relaxed">
            Fotos de nuestro local en Charallave. Lo que ves aquí lo tienes disponible
            para retiro inmediato o entrega en la zona.
          </p>
        </div>

        {/* Gallery grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          role="list"
          aria-label="Galería del inventario físico de CharaTools"
        >
          {GALLERY_IMAGES.map((image, index) => (
            <div key={image.src} role="listitem">
              <GalleryItem image={image} index={index} />
            </div>
          ))}
        </div>

        {/* Footer nudge + CTA */}
        <div className="mt-12 text-center">
          {/* Trust indicators row */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6">
            {[
              { icon: '📍', text: 'Local en Charallave' },
              { icon: '🗓️', text: 'Inventario actualizado semanal' },
              { icon: '🚀', text: 'Retiro el mismo día' },
            ].map(({ icon, text }) => (
              <span key={text} className="flex items-center gap-1.5 text-sm text-gray-500">
                <span aria-hidden="true">{icon}</span>
                {text}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-500 mb-5">
            ¿Buscas algo que no ves en la galería?{' '}
            <strong className="text-gray-700">Pregúntanos.</strong>
          </p>

          <a
            href={WHATSAPP_INVENTORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar inventario completo por WhatsApp"
            className="inline-flex items-center gap-2 border-2 border-gray-900
                       hover:bg-gray-900 hover:text-white text-gray-900 font-bold
                       px-7 py-3.5 rounded-xl text-sm transition-all duration-200"
          >
            Consultar inventario completo →
          </a>
        </div>

      </div>
    </section>
  )
}
