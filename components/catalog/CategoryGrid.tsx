'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Category {
  id: string
  slug: string
  title: string
  subtitle: string
  bgColor: string
  image: string
}

const categories: Category[] = [
  {
    id: '1',
    slug: 'herramientas-electricas',
    title: 'Herramientas Profesionales',
    subtitle: 'Eléctricas, manuales y accesorios InGco.',
    bgColor: 'bg-neutral-800',
    image: '/herramientas.webp'
  },
  {
    id: '3',
    slug: 'iluminacion',
    title: 'Iluminación & LED',
    subtitle: 'Paneles, bombillos y reflectores.',
    bgColor: 'bg-neutral-900',
    image: '/iluminacion.webp'
  },
  {
    id: '2',
    slug: 'plomeria',
    title: 'Tuberías y Conexiones',
    subtitle: 'PPR, PVC y grifería de alta calidad.',
    bgColor: 'bg-blue-900',
    image: '/pvc.webp'
  },
  {
    id: '5',
    slug: 'impermeabilizacion',
    title: 'Impermeabilización',
    subtitle: 'Mantos, primers y selladores.',
    bgColor: 'bg-zinc-800',
    image: '/impermeabilizacion.webp'
  },
]

export function CategoryGrid() {
  return (
    <section className="w-full bg-white px-4 md:px-8 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-2 uppercase">
              Explora por Departamentos
            </h2>
            <p className="text-neutral-600 text-lg">
              Soluciones integrales para cada etapa de tu proyecto.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/catalogo/${category.slug}`}
              className={`group relative overflow-hidden rounded-2xl border border-neutral-200 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-1 text-left ${
                index === 0 ? 'lg:col-span-2 aspect-[2/1]' : 'aspect-square sm:aspect-[4/3] lg:aspect-[3/4]'
              }`}
            >
              {/* Category Image */}
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay color con transparencia para mezclar con la imagen */}
                <div className={`absolute inset-0 ${category.bgColor} mix-blend-multiply opacity-40`} />
              </div>
              
              {/* Overlay Gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />


              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white leading-tight uppercase mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base max-w-[250px] font-medium leading-snug">
                    {category.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                  Consultar catálogo
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
