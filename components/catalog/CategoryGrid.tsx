'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'

interface Category {
  id: string
  slug: 'herramientas' | 'plomeria' | 'iluminacion' | 'electricidad' | 'impermeabilizacion'
  title: string
  subtitle: string
  bgColor: string
  imagePlaceholder?: string
}

const categories: Category[] = [
  {
    id: '1',
    slug: 'herramientas',
    title: 'Herramientas Profesionales',
    subtitle: 'Eléctricas, manuales y accesorios InGco.',
    bgColor: 'bg-neutral-800',
  },
  {
    id: '4',
    slug: 'electricidad',
    title: 'Electricidad Industrial',
    subtitle: 'Conductores, tableros y protección.',
    bgColor: 'bg-yellow-600',
  },
  {
    id: '3',
    slug: 'iluminacion',
    title: 'Iluminación & LED',
    subtitle: 'Paneles, bombillos y reflectores.',
    bgColor: 'bg-neutral-900',
  },
  {
    id: '2',
    slug: 'plomeria',
    title: 'Tuberías y Conexiones',
    subtitle: 'PPR, PVC y grifería de alta calidad.',
    bgColor: 'bg-blue-900',
  },
  {
    id: '5',
    slug: 'impermeabilizacion',
    title: 'Impermeabilización',
    subtitle: 'Mantos, primers y selladores.',
    bgColor: 'bg-zinc-800',
  },
]

interface CategoryGridProps {
  activeFilter: string | null
  onFilterChange: (slug: string | null) => void
}

export function CategoryGrid({ activeFilter, onFilterChange }: CategoryGridProps) {
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
          {activeFilter && (
            <button 
              onClick={() => onFilterChange(null)}
              className="text-yellow-600 font-bold hover:underline flex items-center gap-1"
            >
              Ver todas las categorías
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => onFilterChange(activeFilter === category.slug ? null : category.slug)}
              className={`group relative overflow-hidden rounded-2xl border border-neutral-200 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-1 text-left ${
                index === 0 ? 'lg:col-span-2 aspect-[2/1]' : 'aspect-square sm:aspect-[4/3] lg:aspect-[3/4]'
              } ${activeFilter === category.slug ? 'ring-4 ring-yellow-400 border-transparent' : ''}`}
            >
              {/* Background Color/Pattern Placeholder */}
              <div className={`absolute inset-0 ${category.bgColor} opacity-90 transition-transform duration-500 group-hover:scale-105`} />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Placeholder for future collage image */}
              <div className="absolute inset-0 flex items-center justify-center text-white/5 font-black text-6xl uppercase pointer-events-none select-none tracking-tighter">
                {category.slug}
              </div>

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

              {/* Active Indicator */}
              {activeFilter === category.slug && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Seleccionado
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
